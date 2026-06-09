"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond LanguageSwitcher
 * Controlled or uncontrolled locale picker. It renders compact switchers and
 * menus; the selected locale id is emitted through onValueChange. */

export type LanguageSwitcherVariant = "dropdown" | "code" | "menu" | "segmented" | "searchable" | "regional-dark";

const languageVariants = cva("inline-flex text-(--diamond-ink,#1a1917)", {
    variants: {
        variant: {
            dropdown: "items-center gap-2 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 py-2 text-[13px]",
            code: "items-center gap-2 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2 py-1.5 font-mono text-[12px]",
            menu: "w-[240px] flex-col rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-1 shadow-[0_10px_28px_rgba(0,0,0,0.12)]",
            segmented: "rounded-md bg-(--diamond-surface-alt,#ebe8e1) p-1 font-mono text-[11px]",
            searchable: "w-[250px] flex-col rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-2 shadow-[0_10px_28px_rgba(0,0,0,0.12)]",
            "regional-dark": "w-[240px] flex-col rounded-lg border border-[#2d2c28] bg-[#0f0f0e] p-1 text-[#d4d0c8] shadow-[0_10px_28px_rgba(0,0,0,0.22)]",
        },
    },
    defaultVariants: { variant: "dropdown" },
});

export interface LanguageOption {
    id: string;
    label: React.ReactNode;
    nativeName?: React.ReactNode;
    code: string;
    region?: React.ReactNode;
    speakers?: React.ReactNode;
}

export interface LanguageSwitcherProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">, VariantProps<typeof languageVariants> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    options?: LanguageOption[];
    placeholder?: string;
    accent?: string;
}

const DEFAULT_LANGUAGES: LanguageOption[] = [
    { id: "en", label: "English", code: "EN", region: "US", speakers: "1.5B" },
    { id: "fr", label: "Francais", code: "FR", region: "FR", speakers: "321M" },
    { id: "es", label: "Espanol", code: "ES", region: "ES", speakers: "559M" },
    { id: "pt", label: "Portugues", code: "PT", region: "BR", speakers: "260M" },
    { id: "ja", label: "Japanese", nativeName: "Nihongo", code: "JA", region: "JP", speakers: "125M" },
];

export const LanguageSwitcher = React.forwardRef<HTMLDivElement, LanguageSwitcherProps>(function LanguageSwitcher(
    {
        className,
        variant = "dropdown",
        value,
        defaultValue = "en",
        onValueChange,
        options = DEFAULT_LANGUAGES,
        placeholder = "Search language...",
        accent,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "dropdown";
    const listboxId = React.useId();
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const [internal, setInternal] = React.useState(defaultValue);
    const [query, setQuery] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const selected = value ?? internal;
    const active = options.find((option) => option.id === selected) ?? options[0];
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const setRootRef = React.useCallback(
        (node: HTMLDivElement | null) => {
            rootRef.current = node;
            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        },
        [ref],
    );

    React.useEffect(() => {
        if (!open) return;

        const onPointerDown = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    const select = (id: string) => {
        if (value === undefined) setInternal(id);
        setOpen(false);
        onValueChange?.(id);
    };

    const filtered = query
        ? options.filter((option) => `${option.label} ${option.nativeName ?? ""} ${option.code}`.toLowerCase().includes(query.toLowerCase()))
        : options;

    if (v === "dropdown" || v === "code") {
        return (
            <div ref={setRootRef} className={cn("relative inline-flex min-w-0", className)} style={inlineStyle} {...rest}>
                <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="listbox"
                    aria-controls={listboxId}
                    onClick={() => setOpen((current) => !current)}
                    className={cn(languageVariants({ variant: v }), "min-w-0 cursor-pointer transition-colors hover:border-(--diamond-accent,#2b7fff) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--diamond-accent,#2b7fff)/30")}
                >
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded bg-(--diamond-surface-alt,#ebe8e1) font-mono text-[10px]">
                        {active?.region ?? active?.code}
                    </span>
                    <span className="min-w-0 truncate">{v === "code" ? active?.code : active?.label}</span>
                    <span className={cn("text-(--diamond-muted,#6b6862) transition-transform", open && "rotate-180")}>v</span>
                </button>

                {open ? (
                    <div
                        id={listboxId}
                        role="listbox"
                        aria-label="Select language"
                        className="absolute top-[calc(100%+6px)] left-0 z-30 grid w-[220px] gap-1 rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-1 text-(--diamond-ink,#1a1917) shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
                    >
                        {options.map((option) => {
                            const isActive = selected === option.id;
                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    role="option"
                                    aria-selected={isActive}
                                    onClick={() => select(option.id)}
                                    className={cn(
                                        "flex cursor-pointer items-center gap-2 rounded px-2 py-2 text-left text-[13px] transition-colors",
                                        isActive
                                            ? "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_10%,var(--diamond-surface,#fff))] text-(--diamond-accent,#2b7fff)"
                                            : "hover:bg-(--diamond-surface-alt,#ebe8e1)",
                                    )}
                                >
                                    <span className="inline-flex size-7 shrink-0 items-center justify-center rounded bg-(--diamond-surface-alt,#ebe8e1) font-mono text-[10px] text-(--diamond-muted,#6b6862)">
                                        {option.region ?? option.code}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate">{option.label}</span>
                                        {option.nativeName ? <span className="block truncate text-(--diamond-muted,#6b6862) text-[11px]">{option.nativeName}</span> : null}
                                    </span>
                                    <span className="font-mono text-[10px] text-(--diamond-muted,#6b6862)">{option.code}</span>
                                </button>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        );
    }

    return (
        <div ref={ref} className={cn(languageVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
            {v === "searchable" ? (
                <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={placeholder}
                    className="mb-2 w-full rounded border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2 py-1.5 text-[12px] outline-none focus:border-(--diamond-accent,#2b7fff)"
                />
            ) : v === "menu" || v === "regional-dark" ? (
                <div className={cn("px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em]", v === "regional-dark" ? "text-[#8a867d]" : "text-(--diamond-muted,#6b6862)")}>
                    {v === "regional-dark" ? "Region" : "Language"}
                </div>
            ) : null}

            <div className={cn(v === "segmented" ? "flex gap-1" : "grid gap-1")}>
                {filtered.map((option) => {
                    const isActive = selected === option.id;
                    if (v === "segmented") {
                        return (
                            <button
                                key={option.id}
                                type="button"
                                aria-pressed={isActive}
                                onClick={() => select(option.id)}
                                className={cn("h-7 cursor-pointer rounded px-2.5 transition-colors", isActive ? "bg-(--diamond-surface,#fff) text-(--diamond-accent,#2b7fff) shadow-sm" : "text-(--diamond-muted,#6b6862) hover:text-(--diamond-ink,#1a1917)")}
                            >
                                {option.code}
                            </button>
                        );
                    }

                    return (
                        <button
                            key={option.id}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => select(option.id)}
                            className={cn(
                                "flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-left text-[13px] transition-colors",
                                v === "regional-dark"
                                    ? isActive
                                        ? "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_18%,transparent)] text-(--diamond-accent,#2b7fff)"
                                        : "text-[#d4d0c8] hover:bg-white/5"
                                    : isActive
                                      ? "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_10%,var(--diamond-surface,#fff))] text-(--diamond-accent,#2b7fff)"
                                      : "hover:bg-(--diamond-surface-alt,#ebe8e1)",
                            )}
                        >
                            <span className="inline-flex size-7 shrink-0 items-center justify-center rounded bg-(--diamond-surface-alt,#ebe8e1) font-mono text-[10px] text-(--diamond-muted,#6b6862)">
                                {option.region ?? option.code}
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block truncate">{option.label}</span>
                                {option.nativeName ? <span className="block truncate text-(--diamond-muted,#6b6862) text-[11px]">{option.nativeName}</span> : null}
                            </span>
                            <span className="font-mono text-[10px] text-(--diamond-muted,#6b6862)">{v === "searchable" ? option.speakers : option.code}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
});

LanguageSwitcher.displayName = "Diamond.LanguageSwitcher";

export { languageVariants as languageSwitcherVariants };
