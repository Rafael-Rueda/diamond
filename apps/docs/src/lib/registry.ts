import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Build-time loader for component manifests. Astro's static generator runs
 * this at build, so reading the filesystem here is fine — it doesn't ship
 * to the browser.
 */

const HERE = dirname(fileURLToPath(import.meta.url));
const REGISTRY_ROOT = resolve(HERE, "../../../../src/registry/components");

export interface VariantSample {
    label?: string;
    props?: Record<string, string | number | boolean>;
}

export interface ComponentDocs {
    groups: Record<string, string[]>;
    samples: {
        default: string;
        perVariant: Record<string, VariantSample>;
    };
}

export interface ComponentManifest {
    id: string;
    name: string;
    description: string;
    kind: "ui" | "hook" | "util" | "primitive" | "theme";
    tags?: string[];
    themes?: Record<string, { source: string }>;
    defaultTheme?: string;
    documentation?: ComponentDocs;
    /** Resolved absolute path of the component's directory in the registry. */
    _dir: string;
}

export interface ComponentCategory {
    id: string;
    label: string;
    description: string;
    manifestIds: readonly string[];
}

export interface ComponentCategoryGroup {
    category: ComponentCategory;
    manifests: ComponentManifest[];
}

export const componentCategories: readonly ComponentCategory[] = [
    {
        id: "buttons",
        label: "Buttons",
        description: "Action controls and CTA surfaces.",
        manifestIds: ["button"],
    },
    {
        id: "forms",
        label: "Forms",
        description: "Inputs, choice controls, pickers and form scaffolds.",
        manifestIds: [
            "input",
            "textarea",
            "checkbox",
            "radio",
            "select",
            "multi-select",
            "autocomplete",
            "switch",
            "slider",
            "file-input",
            "dropzone",
            "date-picker",
            "date-range-picker",
            "time-picker",
            "color-picker",
            "rating",
            "otp-input",
            "form",
            "form-field",
            "fieldset",
        ],
    },
    {
        id: "feedback",
        label: "Feedback",
        description: "Status, loading, notifications and messaging states.",
        manifestIds: [
            "alert",
            "toast",
            "notification-center",
            "notification-dot",
            "tooltip",
            "popover",
            "progress",
            "spinner",
            "skeleton",
            "empty-state",
            "error-state",
            "offline-indicator",
        ],
    },
    {
        id: "layout",
        label: "Layout & Foundation",
        description: "Spacing, grids, typography and structural primitives.",
        manifestIds: [
            "box",
            "container",
            "grid",
            "grid-item",
            "flex",
            "stack",
            "center",
            "divider",
            "spacer",
            "aspect-ratio",
            "typography",
            "heading",
            "paragraph",
            "visually-hidden",
            "globals",
        ],
    },
    {
        id: "navigation",
        label: "Navigation",
        description: "Menus, nav rails, wayfinding and page movement.",
        manifestIds: [
            "navbar",
            "sidebar",
            "bottom-navigation",
            "breadcrumbs",
            "pagination",
            "tabs",
            "stepper",
            "link",
            "menu",
            "dropdown-menu",
            "context-menu",
            "mega-menu",
            "tree-view",
            "scrollspy",
            "skip-link",
        ],
    },
    {
        id: "overlays",
        label: "Overlays",
        description: "Dialogs, drawers, sheets, lightboxes and guided surfaces.",
        manifestIds: [
            "dialog",
            "alert-dialog",
            "confirm-dialog",
            "bottom-sheet",
            "drawer",
            "lightbox",
            "popconfirm",
            "tour",
            "cookie-banner",
        ],
    },
    {
        id: "display",
        label: "Display",
        description: "Data, media, content and entity presentation.",
        manifestIds: [
            "card",
            "table",
            "data-grid",
            "list",
            "list-item",
            "accordion",
            "avatar",
            "avatar-group",
            "badge",
            "chip",
            "tag",
            "carousel",
            "timeline",
            "calendar",
            "statistic",
            "image",
            "video-player",
            "audio-player",
            "code-block",
            "kbd",
            "chat-bubble",
            "kanban",
            "pricing",
        ],
    },
    {
        id: "widgets",
        label: "Widgets",
        description: "Composed utilities and richer application widgets.",
        manifestIds: [
            "rich-text-editor",
            "command-palette",
            "map",
            "chart",
            "transfer-list",
            "split-pane",
            "signature-pad",
            "pdf-viewer",
            "qr-code",
            "theme-switcher",
            "language-switcher",
        ],
    },
];

const uncategorizedCategory: ComponentCategory = {
    id: "primitives",
    label: "Primitives & Utilities",
    description: "Lower-level helpers and uncategorized registry entries.",
    manifestIds: [],
};

let cached: ComponentManifest[] | null = null;

export function loadAllManifests(): ComponentManifest[] {
    if (cached) return cached;

    const out: ComponentManifest[] = [];
    for (const entry of readdirSync(REGISTRY_ROOT)) {
        const dir = join(REGISTRY_ROOT, entry);
        if (!statSync(dir).isDirectory()) continue;
        const manifestPath = join(dir, "manifest.json");
        try {
            const raw = readFileSync(manifestPath, "utf8");
            const manifest = JSON.parse(raw) as Omit<ComponentManifest, "_dir">;
            out.push({ ...manifest, _dir: dir });
        } catch {
            /* skip dirs without a manifest */
        }
    }

    cached = out.sort((a, b) => a.id.localeCompare(b.id));
    return cached;
}

export function findManifest(id: string): ComponentManifest | null {
    return loadAllManifests().find((m) => m.id === id) ?? null;
}

export function groupManifestsByCategory(manifests: ComponentManifest[]): ComponentCategoryGroup[] {
    const byId = new Map(manifests.map((manifest) => [manifest.id, manifest]));
    const seen = new Set<string>();

    const groups = componentCategories
        .map((category) => {
            const matched = category.manifestIds.flatMap((id) => {
                const manifest = byId.get(id);
                if (!manifest) return [];
                seen.add(id);
                return [manifest];
            });

            return { category, manifests: matched };
        })
        .filter((group) => group.manifests.length > 0);

    const uncategorized = manifests.filter((manifest) => !seen.has(manifest.id));
    if (uncategorized.length > 0) {
        groups.push({ category: uncategorizedCategory, manifests: uncategorized });
    }

    return groups;
}

/** Returns the CSS contents of a theme file, e.g. "themes/kepler.css". */
export function readThemeCss(manifest: ComponentManifest, themeId: string): string {
    const theme = manifest.themes?.[themeId];
    if (!theme) throw new Error(`Theme "${themeId}" not found on "${manifest.id}".`);
    return readFileSync(join(manifest._dir, theme.source), "utf8");
}

/** Returns all CSS files of all themes for a manifest, keyed by theme id. */
export function readAllThemes(manifest: ComponentManifest): Record<string, string> {
    if (!manifest.themes) return {};
    const out: Record<string, string> = {};
    for (const themeId of Object.keys(manifest.themes)) {
        out[themeId] = readThemeCss(manifest, themeId);
    }
    return out;
}
