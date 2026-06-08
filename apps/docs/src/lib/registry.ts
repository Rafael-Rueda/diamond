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
