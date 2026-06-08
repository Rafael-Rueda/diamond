import * as React from "react";

const STORAGE_KEY = "diamond.darkMode";

/**
 * Minimal dark-mode toggle. Adds/removes `class="dark"` on <html>.
 * Persists in localStorage; first-render reads from a synchronous head
 * script (DocsLayout) so there's no flash of light content.
 *
 * To be replaced with a Diamond UI Toggle component once that exists.
 */
export default function DarkModeToggle() {
    const [dark, setDark] = React.useState<boolean>(false);

    React.useEffect(() => {
        setDark(document.documentElement.classList.contains("dark"));
    }, []);

    const toggle = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        try {
            localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
        } catch {
            /* storage may be disabled */
        }
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Light mode" : "Dark mode"}
            className="inline-flex size-8 items-center justify-center rounded-md border border-[var(--diamond-border)] bg-[var(--diamond-surface-alt)] text-[var(--diamond-ink)] text-base leading-none transition-colors hover:border-[var(--diamond-accent)] hover:bg-[var(--diamond-accent-soft)]"
        >
            <span aria-hidden="true">{dark ? "☀" : "☾"}</span>
        </button>
    );
}
