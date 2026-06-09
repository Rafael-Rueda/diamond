"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond ThemeSwitcher
 * Controlled or uncontrolled appearance selector. It emits the selected theme
 * id; applying classes or data attributes remains in your app shell. */

export type ThemeSwitcherVariant = "segmented" | "circles" | "toggle" | "previews" | "menu" | "swatches";

const themeVariants = cva("inline-flex text-(--diamond-ink,#1a1917)", {
    variants: {
        variant: {
            segmented: "rounded-full bg-(--diamond-surface-alt,#ebe8e1) p-1",
            circles: "gap-2",
            toggle: "items-center",
            previews: "gap-2",
            menu: "w-[220px] flex-col rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-1 shadow-[0_10px_28px_rgba(0,0,0,0.12)]",
            swatches: "gap-2",
        },
    },
    defaultVariants: { variant: "segmented" },
});

export interface ThemeOption {
    id: string;
    label: React.ReactNode;
    background?: string;
    foreground?: string;
    accent?: string;
}

export interface ThemeSwitcherProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">, VariantProps<typeof themeVariants> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    options?: ThemeOption[];
    accent?: string;
}

const DEFAULT_THEMES: ThemeOption[] = [
    { id: "light", label: "Light", background: "#ffffff", foreground: "#1a1917", accent: "#2b7fff" },
    { id: "dark", label: "Dark", background: "#0f0f0e", foreground: "#d4d0c8", accent: "#2b7fff" },
    { id: "system", label: "System", background: "#ebe8e1", foreground: "#1a1917", accent: "#10b981" },
    { id: "contrast", label: "Contrast", background: "#000000", foreground: "#ffffff", accent: "#f59e0b" },
];

export const ThemeSwitcher = React.forwardRef<HTMLDivElement, ThemeSwitcherProps>(function ThemeSwitcher(
    { className, variant = "segmented", value, defaultValue = "light", onValueChange, options = DEFAULT_THEMES, accent, style, ...rest },
    ref,
) {
    const v = variant ?? "segmented";
    const [internal, setInternal] = React.useState(defaultValue);
    const selected = value ?? internal;
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const select = (id: string) => {
        if (value === undefined) setInternal(id);
        onValueChange?.(id);
    };

    if (v === "toggle") {
        const checked = selected === "dark";
        return (
            <div ref={ref} className={cn(themeVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
                <button
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    onClick={() => select(checked ? "light" : "dark")}
                    className={cn(
                        "relative h-8 w-[64px] cursor-pointer rounded-full p-1 transition-colors",
                        checked ? "bg-[#1a1917]" : "bg-[#ebe8e1]",
                    )}
                >
                    <span
                        className={cn(
                            "absolute top-1 left-1 size-6 rounded-full bg-white shadow transition-transform",
                            checked ? "translate-x-8" : "translate-x-0",
                        )}
                    />
                    <span className={cn("absolute top-1/2 left-2 -translate-y-1/2 font-mono text-[10px]", checked ? "text-white/50" : "text-(--diamond-accent,#2b7fff)")}>
                        L
                    </span>
                    <span className={cn("absolute top-1/2 right-2 -translate-y-1/2 font-mono text-[10px]", checked ? "text-white/70" : "text-[#6b6862]")}>
                        D
                    </span>
                </button>
            </div>
        );
    }

    return (
        <div ref={ref} className={cn(themeVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
            {options.map((option) => {
                const active = selected === option.id;
                if (v === "circles") {
                    return (
                        <button
                            key={option.id}
                            type="button"
                            aria-pressed={active}
                            onClick={() => select(option.id)}
                            className={cn("inline-flex size-10 cursor-pointer items-center justify-center rounded-full border bg-(--diamond-surface,#fff) font-mono text-[11px]", active ? "border-(--diamond-accent,#2b7fff) text-(--diamond-accent,#2b7fff) ring-2 ring-(--diamond-accent,#2b7fff)/20" : "border-(--diamond-border,#d9d5cc) text-(--diamond-muted,#6b6862)")}
                        >
                            {String(option.label).slice(0, 1)}
                        </button>
                    );
                }

                if (v === "previews") {
                    return (
                        <button
                            key={option.id}
                            type="button"
                            aria-pressed={active}
                            onClick={() => select(option.id)}
                            className={cn("w-20 cursor-pointer rounded-md border p-1.5 text-left", active ? "border-(--diamond-accent,#2b7fff)" : "border-(--diamond-border,#d9d5cc)")}
                            style={{ background: option.background, color: option.foreground }}
                        >
                            <span className="mb-1 block h-1.5 w-10 rounded-full opacity-70" style={{ background: option.foreground }} />
                            <span className="block h-1 w-8 rounded-full opacity-30" style={{ background: option.foreground }} />
                            <span className="mt-2 block text-center text-[10px]">{option.label}</span>
                        </button>
                    );
                }

                if (v === "menu") {
                    return (
                        <button
                            key={option.id}
                            type="button"
                            aria-pressed={active}
                            onClick={() => select(option.id)}
                            className={cn("flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-left text-[13px] hover:bg-(--diamond-surface-alt,#ebe8e1)", active && "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_10%,var(--diamond-surface,#fff))] text-(--diamond-accent,#2b7fff)")}
                        >
                            <span className="size-3 rounded-full border border-(--diamond-border,#d9d5cc)" style={{ background: option.background }} />
                            <span className="flex-1">{option.label}</span>
                            {active ? <span className="font-mono text-[11px]">OK</span> : null}
                        </button>
                    );
                }

                if (v === "swatches") {
                    return (
                        <button key={option.id} type="button" onClick={() => select(option.id)} className="grid cursor-pointer gap-1 text-center text-[10px]">
                            <span className={cn("size-9 rounded-full border", active ? "border-(--diamond-accent,#2b7fff) ring-2 ring-(--diamond-accent,#2b7fff)/20" : "border-(--diamond-border,#d9d5cc)")} style={{ background: option.background }} />
                            <span className={active ? "text-(--diamond-accent,#2b7fff)" : "text-(--diamond-muted,#6b6862)"}>{option.label}</span>
                        </button>
                    );
                }

                return (
                    <button
                        key={option.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => select(option.id)}
                        className={cn("h-8 cursor-pointer rounded-full px-3 text-[12px] transition-colors", active ? "bg-(--diamond-surface,#fff) text-(--diamond-accent,#2b7fff) shadow-sm" : "text-(--diamond-muted,#6b6862) hover:text-(--diamond-ink,#1a1917)")}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
});

ThemeSwitcher.displayName = "Diamond.ThemeSwitcher";

export { themeVariants as themeSwitcherVariants };
