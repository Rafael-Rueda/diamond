import type { ComponentId } from "../value-objects/component-id.vo.js";
import type { Dependency } from "../value-objects/dependency.vo.js";

export type ComponentKind = "ui" | "hook" | "util" | "primitive" | "theme";

export interface ComponentFile {
    /** Path inside the registry, relative to `src/registry/components/<id>/`. */
    source: string;
    /** Destination subpath inside the target alias (usually same as source). */
    target: string;
    /** Which alias in diamond.config.ts this file goes under. */
    alias: "ui" | "utils" | "hooks" | "lib";
}

/**
 * Theme-style components don't copy files — they patch a single CSS file
 * (typically `config.tailwind.css`) with one of N theme variants. Each
 * entry maps a theme id to a registry-relative source CSS file.
 */
export interface ComponentTheme {
    /** Path inside the registry, relative to `src/registry/components/<id>/`. */
    source: string;
}

/** Per-variant overrides for the docs site (label + extra DOM props). */
export interface ComponentVariantSample {
    label?: string;
    props?: Record<string, string | number | boolean>;
}

/**
 * Documentation metadata read by the docs site only. The component itself
 * is unaware of categories — they exist purely for organizing the gallery.
 */
export interface ComponentDocs {
    /** Map of category label → ordered list of variant ids in that category. */
    groups: Record<string, readonly string[]>;
    samples: {
        default: string;
        perVariant: Record<string, ComponentVariantSample>;
    };
}

/**
 * Aggregate describing a single component shipped by Diamond.
 * Pure — no I/O. The LocalRegistryAdapter hydrates this from a manifest file.
 */
export class Component {
    constructor(
        public readonly id: ComponentId,
        public readonly name: string,
        public readonly description: string,
        public readonly kind: ComponentKind,
        public readonly files: readonly ComponentFile[],
        public readonly npmDependencies: readonly Dependency[],
        /** Other Diamond components this one depends on (installed transitively). */
        public readonly internalDependencies: readonly ComponentId[],
        public readonly tags: readonly string[] = [],
        /** Available themes (only for kind === 'theme'). */
        public readonly themes: ReadonlyMap<string, ComponentTheme> = new Map(),
        /** Theme picked when the user runs `add` without --theme. */
        public readonly defaultTheme: string | null = null,
        /** Optional metadata used exclusively by the docs site. */
        public readonly documentation: ComponentDocs | null = null,
    ) {}

    isTheme(): this is ThemedComponent {
        return this.kind === "theme" && this.themes.size > 0;
    }
}

export interface ThemedComponent extends Component {
    readonly themes: ReadonlyMap<string, ComponentTheme>;
    readonly defaultTheme: string;
}
