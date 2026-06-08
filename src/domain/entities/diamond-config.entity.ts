import { PathAlias } from "../value-objects/path-alias.vo.js";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";
export type Style = "default" | "new-york";
export type BaseColor = "neutral" | "stone" | "zinc" | "gray" | "slate" | "diamond";

export interface DiamondTailwindConfig {
    config: string; // e.g. "tailwind.config.ts"
    css: string; // e.g. "src/styles/globals.css"
    baseColor: BaseColor;
    cssVariables: boolean;
    prefix?: string;
}

export interface DiamondAliases {
    components: PathAlias;
    ui: PathAlias; // where installed components land (e.g. @/components/ui)
    utils: PathAlias;
    hooks: PathAlias;
    lib: PathAlias;
}

/**
 * Aggregate representing the consumer project's Diamond configuration.
 * Built from diamond.config.ts by the ConfigRepository port.
 */
export class DiamondConfig {
    constructor(
        public readonly style: Style,
        public readonly tailwind: DiamondTailwindConfig,
        public readonly aliases: DiamondAliases,
        public readonly rsc: boolean,
        public readonly typescript: boolean,
        public readonly packageManager: PackageManager,
    ) {}

    /** Default config emitted by `diamond init` when the user skips prompts. */
    static default(): DiamondConfig {
        return new DiamondConfig(
            "default",
            {
                config: "tailwind.config.ts",
                css: "src/styles/globals.css",
                baseColor: "neutral",
                cssVariables: true,
            },
            {
                components: PathAlias.of("@/components"),
                ui: PathAlias.of("@/components/ui"),
                utils: PathAlias.of("@/lib/utils"),
                hooks: PathAlias.of("@/hooks"),
                lib: PathAlias.of("@/lib"),
            },
            true,
            true,
            "npm",
        );
    }
}
