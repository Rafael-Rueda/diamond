import path from "node:path";
import { cosmiconfig } from "cosmiconfig";
import { TypeScriptLoader } from "cosmiconfig-typescript-loader";

import { renderDiamondConfigTemplate } from "./diamond-config.template.js";
import type { ConfigRepositoryPort } from "../../application/ports/config-repository.port.js";
import type { FileSystemPort } from "../../application/ports/file-system.port.js";
import { DiamondConfig, type PackageManager, type Style } from "../../domain/entities/diamond-config.entity.js";
import { InvalidConfigError } from "../../domain/errors/domain.error.js";
import { PathAlias } from "../../domain/value-objects/path-alias.vo.js";

/**
 * Adapter that loads diamond.config.{ts,js,mjs,cjs,json} via cosmiconfig
 * and writes new configs through a typed template.
 */
export class TsConfigRepositoryAdapter implements ConfigRepositoryPort {
    private readonly configFileName = "diamond.config.ts";

    constructor(private readonly fs: FileSystemPort) {}

    async exists(): Promise<boolean> {
        return this.fs.exists(this.absolutePath());
    }

    async load(): Promise<DiamondConfig | null> {
        const explorer = cosmiconfig("diamond", {
            searchPlaces: [
                "diamond.config.ts",
                "diamond.config.mts",
                "diamond.config.js",
                "diamond.config.mjs",
                "diamond.config.cjs",
                "diamond.config.json",
            ],
            loaders: { ".ts": TypeScriptLoader(), ".mts": TypeScriptLoader() },
        });

        const result = await explorer.search(this.fs.projectRoot());
        if (!result || result.isEmpty) return null;

        return this.hydrate(result.config);
    }

    async save(config: DiamondConfig, options: { overwrite: boolean }): Promise<void> {
        const target = this.absolutePath();
        if (!options.overwrite && (await this.fs.exists(target))) {
            throw new InvalidConfigError(`diamond.config.ts already exists at ${target} (pass overwrite=true).`);
        }
        await this.fs.writeFile(target, renderDiamondConfigTemplate(config));
    }

    private absolutePath(): string {
        return path.join(this.fs.projectRoot(), this.configFileName);
    }

    /** Maps a plain object (from the consumer's config file) into the domain entity. */
    private hydrate(raw: unknown): DiamondConfig {
        if (!raw || typeof raw !== "object") {
            throw new InvalidConfigError("export default must be an object.");
        }
        const obj = raw as Record<string, unknown>;

        const aliases = obj.aliases as Record<string, string> | undefined;
        if (!aliases || typeof aliases !== "object") {
            throw new InvalidConfigError('"aliases" block is required.');
        }
        if (!aliases.ui) {
            throw new InvalidConfigError('"aliases.ui" is required.');
        }

        const tailwind = obj.tailwind as Record<string, unknown> | undefined;
        if (!tailwind) throw new InvalidConfigError('"tailwind" block is required.');

        return new DiamondConfig(
            (obj.style as Style) ?? "default",
            {
                config: String(tailwind.config ?? "tailwind.config.ts"),
                css: String(tailwind.css ?? "src/styles/globals.css"),
                baseColor: (tailwind.baseColor as "neutral") ?? "neutral",
                cssVariables: tailwind.cssVariables !== false,
                ...(tailwind.prefix ? { prefix: String(tailwind.prefix) } : {}),
            },
            {
                components: PathAlias.of(aliases.components ?? "@/components"),
                ui: PathAlias.of(aliases.ui),
                utils: PathAlias.of(aliases.utils ?? "@/lib/utils"),
                hooks: PathAlias.of(aliases.hooks ?? "@/hooks"),
                lib: PathAlias.of(aliases.lib ?? "@/lib"),
            },
            obj.rsc !== false,
            obj.typescript !== false,
            (obj.packageManager as PackageManager) ?? "npm",
        );
    }
}
