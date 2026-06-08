import path from "node:path";

import type { Component, ComponentFile } from "../../domain/entities/component.entity.js";
import type { DiamondAliases, DiamondConfig } from "../../domain/entities/diamond-config.entity.js";
import { InstallationPlan, type PlannedFile } from "../../domain/entities/installation-plan.entity.js";
import {
    ComponentNotFoundError,
    ConfigNotFoundError,
    FileAlreadyExistsError,
} from "../../domain/errors/domain.error.js";
import { ComponentId } from "../../domain/value-objects/component-id.vo.js";
import type { Dependency } from "../../domain/value-objects/dependency.vo.js";
import type { ComponentRegistryPort } from "../ports/component-registry.port.js";
import type { ConfigRepositoryPort } from "../ports/config-repository.port.js";
import type { FileSystemPort } from "../ports/file-system.port.js";
import type { LoggerPort } from "../ports/logger.port.js";
import type { PackageManagerPort } from "../ports/package-manager.port.js";
import type { TsPathResolverPort } from "../ports/ts-path-resolver.port.js";

export interface AddComponentInput {
    componentIds: readonly string[];
    overwrite: boolean;
    dryRun: boolean;
    skipDeps: boolean;
    /** Theme variant for kind=theme components (e.g. "kepler"). */
    theme?: string;
}

const THEME_BLOCK_START_RE = /\/\*\s*@diamond:globals:start[^*]*\*\/[\s\S]*?\/\*\s*@diamond:globals:end\s*\*\//;

const TAILWIND_DIRECTIVES = `@import "tailwindcss";\n@tailwind utilities;\n`;

/**
 * Orchestrates adding one or more components to the consumer project:
 *   1. Resolve requested components + transitive dependencies.
 *   2. For each component, dispatch to the right install strategy:
 *        kind=theme  → upsert a delimited block in `config.tailwind.css`.
 *        otherwise   → copy registry files into the resolved alias paths.
 *   3. Install npm dependencies aggregated from all touched components.
 *
 * Adapters know nothing about domain rules. This is the only place
 * cross-component orchestration lives.
 */
export class AddComponentUseCase {
    constructor(
        private readonly registry: ComponentRegistryPort,
        private readonly configRepo: ConfigRepositoryPort,
        private readonly fs: FileSystemPort,
        private readonly pm: PackageManagerPort,
        private readonly logger: LoggerPort,
        private readonly pathResolver: TsPathResolverPort,
    ) {}

    async execute(input: AddComponentInput): Promise<InstallationPlan> {
        const config = await this.configRepo.load();
        if (!config) throw new ConfigNotFoundError();

        /* IDs the user typed on the command line. Transitive deps (e.g. `utils`
       pulled in by `card`) are NOT in this set. We use it to decide what
       behavior to apply when a target file already exists:
         - directly-requested + exists + !overwrite  → throw (user expected to
           install this; refuse to clobber without explicit consent).
         - transitive + exists                       → skip silently (the dep
           is already there from a prior install — that's the expected case). */
        const requestedIds = new Set(input.componentIds.map((id) => ComponentId.of(id).value));

        const components = await this.resolveComponentsWithDeps(input.componentIds);
        const fileComps = components.filter((c) => c.kind !== "theme");
        const themeComps = components.filter((c) => c.kind === "theme");

        const plan = await this.buildPlan(fileComps, components, config);

        this.printPlan(plan, themeComps, input.theme);

        if (input.dryRun) {
            this.logger.info("Dry-run: no files written.");
            return plan;
        }

        /* Block only when a DIRECTLY-requested file would be clobbered. */
        if (!input.overwrite) {
            const blocking = plan.conflictingFiles.find((f) => requestedIds.has(f.componentId));
            if (blocking) {
                throw new FileAlreadyExistsError(blocking.absoluteTarget);
            }
        }

        /* ---- 1. file-copy components ---- */
        const transform = buildImportTransform(config);
        for (const file of plan.files) {
            const isTransitive = !requestedIds.has(file.componentId);
            const rel = path.relative(this.fs.projectRoot(), file.absoluteTarget);
            if (file.exists && isTransitive && !input.overwrite) {
                this.logger.step(`= ${rel} (already present)`);
                continue;
            }
            await this.fs.ensureDir(path.dirname(file.absoluteTarget));
            if (isTextSource(file.absoluteSource)) {
                await this.fs.copyFileWithTransform(file.absoluteSource, file.absoluteTarget, transform);
            } else {
                await this.fs.copyFile(file.absoluteSource, file.absoluteTarget);
            }
            this.logger.step(`${file.exists ? "~" : "+"} ${rel}`);
        }

        /* ---- 2. theme components (patch globals.css) ---- */
        for (const component of themeComps) {
            await this.installTheme(component, input.theme, config);
        }

        /* ---- 3. npm deps ---- */
        if (!input.skipDeps && plan.dependencies.length > 0) {
            this.logger.info(`Installing ${plan.dependencies.length} dependency(ies)...`);
            await this.pm.install(plan.dependencies, config.packageManager);
        }

        if (plan.files.length === 0 && themeComps.length === 0) {
            this.logger.warn("Nothing to install.");
        } else {
            this.logger.success(
                `Installed ${components.length} component(s), ${plan.files.length} file(s)` +
                    (themeComps.length > 0 ? `, ${themeComps.length} theme patch(es).` : "."),
            );
        }
        return plan;
    }

    private async resolveComponentsWithDeps(ids: readonly string[]): Promise<readonly Component[]> {
        const visited = new Map<string, Component>();

        const visit = async (rawId: string): Promise<void> => {
            const id = ComponentId.of(rawId);
            if (visited.has(id.value)) return;

            const component = await this.registry.findById(id);
            if (!component) throw new ComponentNotFoundError(id.value);

            visited.set(id.value, component);
            for (const dep of component.internalDependencies) {
                await visit(dep.value);
            }
        };

        for (const id of ids) await visit(id);
        return Array.from(visited.values());
    }

    /**
     * Plan only covers file-based components. Theme components are executed
     * separately and surface in the printed summary, not in `plan.files`.
     * `allComponents` provides the full dep set for npm aggregation.
     */
    private async buildPlan(
        fileComponents: readonly Component[],
        allComponents: readonly Component[],
        config: DiamondConfig,
    ): Promise<InstallationPlan> {
        const files: PlannedFile[] = [];
        const depsByName = new Map<string, Dependency>();

        for (const component of fileComponents) {
            for (const file of component.files) {
                const absoluteSource = this.registry.resolveSourcePath(component, file.source);
                const absoluteTarget = await this.resolveTarget(config.aliases, file);
                const exists = await this.fs.exists(absoluteTarget);
                files.push({
                    componentId: component.id.value,
                    absoluteSource,
                    absoluteTarget,
                    exists,
                });
            }
        }

        for (const component of allComponents) {
            for (const dep of component.npmDependencies) {
                if (!depsByName.has(dep.name)) depsByName.set(dep.name, dep);
            }
        }

        return new InstallationPlan(allComponents, files, Array.from(depsByName.values()));
    }

    private async resolveTarget(aliases: DiamondAliases, file: ComponentFile): Promise<string> {
        const aliasPath = aliases[file.alias].toString();
        const resolvedDir = await this.pathResolver.resolveAlias(aliasPath);

        if (file.alias === "utils") {
            return file.target ? path.join(path.dirname(resolvedDir), file.target) : `${resolvedDir}.ts`;
        }
        return path.join(resolvedDir, file.target);
    }

    /**
     * Upserts a delimited block inside `config.tailwind.css` containing the
     * selected theme. Markers are stable so reinstalling a different theme
     * replaces the whole block in-place.
     */
    private async installTheme(
        component: Component,
        requestedTheme: string | undefined,
        config: DiamondConfig,
    ): Promise<void> {
        const themeName = requestedTheme ?? component.defaultTheme;
        if (!themeName || !component.themes.has(themeName)) {
            const available = [...component.themes.keys()].join(", ");
            throw new Error(
                `Theme "${requestedTheme ?? "default"}" not found for component "${component.id.value}". ` +
                    `Available: ${available}.`,
            );
        }

        const theme = component.themes.get(themeName)!;
        const sourcePath = this.registry.resolveSourcePath(component, theme.source);
        const themeCss = (await this.fs.readFile(sourcePath)).trim();

        const targetCss = path.resolve(this.fs.projectRoot(), config.tailwind.css);
        const exists = await this.fs.exists(targetCss);
        const original = exists ? await this.fs.readFile(targetCss) : TAILWIND_DIRECTIVES;

        const block = renderThemeBlock(component.id.value, themeName, themeCss);
        const updated = upsertThemeBlock(original, block);

        await this.fs.writeFile(targetCss, updated);
        const rel = path.relative(this.fs.projectRoot(), targetCss);
        this.logger.step(`~ ${rel} ${exists ? "(updated)" : "(created)"} - theme "${themeName}"`);
    }

    private printPlan(
        plan: InstallationPlan,
        themeComponents: readonly Component[],
        requestedTheme: string | undefined,
    ): void {
        const themeCount = themeComponents.length;
        this.logger.info(
            `Plan: ${plan.files.length} file(s), ${themeCount} theme patch(es), ` +
                `${plan.dependencies.length} npm dep(s).`,
        );
        for (const file of plan.conflictingFiles) {
            this.logger.warn(`  ~ ${path.relative(this.fs.projectRoot(), file.absoluteTarget)} (exists)`);
        }
        for (const c of themeComponents) {
            const theme = requestedTheme ?? c.defaultTheme ?? "default";
            this.logger.info(`  • ${c.id.value} → theme "${theme}"`);
        }
    }
}

/* ----------------------------------------------------------------------- */
/* Helpers                                                                 */
/* ----------------------------------------------------------------------- */

function isTextSource(absolutePath: string): boolean {
    return /\.(tsx?|jsx?|mjs|cjs|css|json|md)$/i.test(absolutePath);
}

/**
 * Rewrites Diamond's source-level aliases to the aliases declared in the
 * consumer's diamond.config.ts. Source files in the registry always use the
 * DEFAULT aliases (`@/lib/utils`, `@/components/ui`, …).
 */
function buildImportTransform(config: DiamondConfig): (contents: string) => string {
    const replacements: Array<[RegExp, string]> = [
        [/@\/lib\/utils\b/g, config.aliases.utils.toString()],
        [/@\/components\/ui\b/g, config.aliases.ui.toString()],
        [/@\/hooks\b/g, config.aliases.hooks.toString()],
        [/@\/components\b/g, config.aliases.components.toString()],
        [/@\/lib\b/g, config.aliases.lib.toString()],
    ];
    return (contents) => replacements.reduce((acc, [re, val]) => acc.replace(re, val), contents);
}

function renderThemeBlock(componentId: string, themeName: string, css: string): string {
    return [`/* @diamond:${componentId}:start [theme=${themeName}] */`, css, `/* @diamond:${componentId}:end */`].join(
        "\n",
    );
}

/**
 * Replaces an existing diamond block in `original`, or appends one at the end.
 * The marker regex is permissive — any prior theme name is overwritten.
 */
function upsertThemeBlock(original: string, block: string): string {
    if (THEME_BLOCK_START_RE.test(original)) {
        return original.replace(THEME_BLOCK_START_RE, block);
    }
    const trimmed = original.replace(/\s+$/, "");
    return `${trimmed}\n\n${block}\n`;
}
