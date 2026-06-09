import * as React from "react";

import type { ComponentManifest } from "@/lib/registry";

interface Props {
    manifests: ComponentManifest[];
}

const STYLE_ID = "d-active-theme";
const STORAGE_KEY = "diamond.theme";

/**
 * Header dropdown that swaps the active Diamond theme. The CSS contents come
 * from the build-time-loaded `globals` manifest themes, embedded as JSON in
 * the page. At runtime we replace a `<style id="d-active-theme">` element.
 */
export default function ThemePicker({ manifests }: Props) {
    const globals = manifests.find((m) => m.id === "globals");
    const themeIds = globals?.themes ? Object.keys(globals.themes) : [];

    // Themes are read at build time and embedded into the bundle via fetching
    // each CSS file through Vite's ?raw imports. We do that lazily here instead
    // — we keep the CSS strings in a registry-like map fetched from /themes.json.
    const [active, setActive] = React.useState<string>("default");
    const [themes, setThemes] = React.useState<Record<string, string>>({});

    React.useEffect(() => {
        const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
        if (stored) setActive(stored);
        fetch(`${import.meta.env.BASE_URL}themes.json`)
            .then((r) => r.json())
            .then((data: Record<string, string>) => setThemes(data))
            .catch(() => undefined);
    }, []);

    React.useEffect(() => {
        if (!themes[active]) return;
        let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
        if (!el) {
            el = document.createElement("style");
            el.id = STYLE_ID;
            document.head.appendChild(el);
        }
        el.textContent = themes[active];
        if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, active);
    }, [active, themes]);

    if (themeIds.length === 0) return null;

    return (
        <label className="inline-flex items-center gap-2 text-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em]">theme</span>
            <select
                value={active}
                onChange={(e) => setActive(e.target.value)}
                className="rounded-md border border-[var(--diamond-border)] bg-[var(--diamond-surface-alt)] px-2 py-1 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[var(--diamond-accent)]"
            >
                {themeIds.map((id) => (
                    <option key={id} value={id}>
                        {id}
                    </option>
                ))}
            </select>
        </label>
    );
}
