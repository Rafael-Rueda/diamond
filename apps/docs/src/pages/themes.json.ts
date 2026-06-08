import type { APIRoute } from "astro";

import { findManifest, readAllThemes } from "@/lib/registry";

/**
 * Static endpoint generated at build time. Returns a map of
 * { themeId: rawCss } for the `globals` component. The ThemePicker
 * fetches this once and swaps a <style> element to apply.
 */
export const GET: APIRoute = () => {
    const globals = findManifest("globals");
    const themes = globals ? readAllThemes(globals) : {};
    return new Response(JSON.stringify(themes), {
        status: 200,
        headers: { "content-type": "application/json" },
    });
};
