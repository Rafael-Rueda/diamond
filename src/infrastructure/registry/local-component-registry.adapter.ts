import { existsSync, promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

import type { ComponentRegistryPort } from "../../application/ports/component-registry.port.js";
import {
    Component,
    type ComponentDocs,
    type ComponentFile,
    type ComponentKind,
} from "../../domain/entities/component.entity.js";
import { ComponentId } from "../../domain/value-objects/component-id.vo.js";
import { Dependency } from "../../domain/value-objects/dependency.vo.js";

const FileSchema = z.object({
    source: z.string(),
    target: z.string(),
    alias: z.enum(["ui", "utils", "hooks", "lib"]),
});

const ThemeSchema = z.object({ source: z.string() });

const VariantSampleSchema = z.object({
    label: z.string().optional(),
    props: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
});

const DocumentationSchema = z.object({
    groups: z.record(z.string(), z.array(z.string())),
    samples: z
        .object({
            default: z.string().default("Get started"),
            perVariant: z.record(z.string(), VariantSampleSchema).default({}),
        })
        .default({ default: "Get started", perVariant: {} }),
});

const ManifestSchema = z
    .object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        kind: z.enum(["ui", "hook", "util", "primitive", "theme"]),
        files: z.array(FileSchema).default([]),
        dependencies: z
            .array(
                z.object({
                    name: z.string(),
                    version: z.string().default("latest"),
                    kind: z.enum(["runtime", "dev"]).default("runtime"),
                }),
            )
            .default([]),
        registryDependencies: z.array(z.string()).default([]),
        tags: z.array(z.string()).default([]),
        themes: z.record(z.string(), ThemeSchema).optional(),
        defaultTheme: z.string().optional(),
        documentation: DocumentationSchema.optional(),
    })
    .superRefine((m, ctx) => {
        if (m.kind === "theme") {
            if (!m.themes || Object.keys(m.themes).length === 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Theme component "${m.id}" must declare at least one entry in "themes".`,
                });
            }
            if (m.defaultTheme && m.themes && !(m.defaultTheme in m.themes)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `defaultTheme "${m.defaultTheme}" is not a key of "themes" in "${m.id}".`,
                });
            }
        } else if (m.files.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Component "${m.id}" of kind "${m.kind}" must declare at least one file.`,
            });
        }
    });

type Manifest = z.infer<typeof ManifestSchema>;

/**
 * Reads the bundled registry at `src/registry/components/*\/manifest.json`.
 * One manifest = one component.
 */
export class LocalComponentRegistryAdapter implements ComponentRegistryPort {
    private cache: readonly Component[] | null = null;

    constructor(private readonly registryRoot: string = defaultRegistryRoot()) {}

    async list(): Promise<readonly Component[]> {
        if (this.cache) return this.cache;

        const entries = await fs.readdir(this.registryRoot, { withFileTypes: true });
        const components: Component[] = [];

        for (const entry of entries) {
            if (!entry.isDirectory()) continue;
            const manifestPath = path.join(this.registryRoot, entry.name, "manifest.json");
            try {
                await fs.access(manifestPath);
            } catch {
                continue;
            }
            const raw = JSON.parse(await fs.readFile(manifestPath, "utf8"));
            const manifest = ManifestSchema.parse(raw);
            components.push(this.toEntity(manifest));
        }

        this.cache = components;
        return components;
    }

    async findById(id: ComponentId): Promise<Component | null> {
        const all = await this.list();
        return all.find((c) => c.id.equals(id)) ?? null;
    }

    resolveSourcePath(component: Component, relativeSource: string): string {
        return path.join(this.registryRoot, component.id.value, relativeSource);
    }

    private toEntity(m: Manifest): Component {
        const files: ComponentFile[] = m.files.map((f) => ({
            source: f.source,
            target: f.target,
            alias: f.alias,
        }));
        const deps = m.dependencies.map((d) =>
            d.kind === "dev" ? Dependency.dev(d.name, d.version) : Dependency.runtime(d.name, d.version),
        );
        const themes = new Map<string, { source: string }>();
        if (m.themes) {
            for (const [name, theme] of Object.entries(m.themes)) {
                themes.set(name, { source: theme.source });
            }
        }
        const defaultTheme = m.defaultTheme ?? (themes.size > 0 ? (themes.keys().next().value ?? null) : null);

        const documentation: ComponentDocs | null = m.documentation
            ? {
                  groups: m.documentation.groups,
                  samples: {
                      default: m.documentation.samples.default,
                      perVariant: m.documentation.samples.perVariant,
                  },
              }
            : null;

        return new Component(
            ComponentId.of(m.id),
            m.name,
            m.description,
            m.kind as ComponentKind,
            files,
            deps,
            m.registryDependencies.map((id) => ComponentId.of(id)),
            m.tags,
            themes,
            defaultTheme,
            documentation,
        );
    }
}

function defaultRegistryRoot(): string {
    // The registry is SOURCE that's shipped verbatim - it never gets compiled.
    // So we locate the Diamond package root (nearest package.json walking up
    // from this module) and always point at `<packageRoot>/src/registry/components`,
    // regardless of whether we're running from `src/` (tsx) or `dist/` (built).
    const here = path.dirname(fileURLToPath(import.meta.url));
    let cursor = here;
    // Safety: cap the walk at a reasonable depth to avoid touching drive root.
    for (let i = 0; i < 8; i++) {
        if (existsSync(path.join(cursor, "package.json"))) {
            return path.join(cursor, "src", "registry", "components");
        }
        const parent = path.dirname(cursor);
        if (parent === cursor) break;
        cursor = parent;
    }
    // Fallback: relative from src layout.
    return path.resolve(here, "../../registry/components");
}
