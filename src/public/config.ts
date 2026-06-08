/**
 * Public type surface imported by the consumer's `diamond.config.ts`.
 *
 * This type is hand-written (not re-exported from the domain entity) so that
 * consumers get an idiomatic object-shape config instead of a class, and so
 * that changes to the internal DiamondConfig class don't break existing
 * user-space config files.
 */
export type Style = "default" | "new-york";
export type BaseColor = "neutral" | "stone" | "zinc" | "gray" | "slate" | "diamond";
export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export interface DiamondConfig {
    style: Style;

    tailwind: {
        config: string;
        css: string;
        baseColor: BaseColor;
        cssVariables: boolean;
        prefix?: string;
    };

    aliases: {
        components: string;
        /** Destination of every installed Diamond component. */
        ui: string;
        utils: string;
        hooks: string;
        lib: string;
    };

    rsc: boolean;
    typescript: boolean;
    packageManager: PackageManager;
}
