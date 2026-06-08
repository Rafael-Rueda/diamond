"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Kbd — keyboard key. */

export type KbdVariant = "inline" | "wide" | "dark" | "cluster" | "shortcut" | "accent";

const kbdVariants = cva(
    ["inline-flex select-none items-center justify-center font-mono", "shrink-0 leading-none"].join(" "),
    {
        variants: {
            variant: {
                inline: "h-6 min-w-6 rounded border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-1.5 text-(--diamond-ink,#1a1917) text-[11px] shadow-[0_1px_0_var(--diamond-border,#d9d5cc)]",
                wide: "h-7 rounded border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 text-(--diamond-ink,#1a1917) text-[11px] shadow-[0_1px_0_var(--diamond-border,#d9d5cc)]",
                dark: "h-7 min-w-7 rounded border border-(--diamond-ink,#1a1917) bg-(--diamond-ink,#1a1917) px-2 text-(--diamond-surface,#fff) text-[11px] shadow-[0_1px_0_var(--diamond-muted,#6b6862)]",
                cluster:
                    "size-9 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) font-bold text-(--diamond-ink,#1a1917) text-[12px] shadow-[0_2px_0_var(--diamond-border,#d9d5cc)]",
                shortcut:
                    "h-6 min-w-6 rounded border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface-alt,#ebe8e1) px-1.5 text-(--diamond-muted,#6b6862) text-[10px]",
                accent: "h-9 rounded-md border-(--diamond-accent,#2b7fff) border-2 bg-(--diamond-surface,#fff) px-4 font-semibold text-(--diamond-accent,#2b7fff) text-[13px] italic [font-family:Fraunces,Georgia,serif]",
            },
        },
        defaultVariants: { variant: "inline" },
    },
);

export interface KbdProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof kbdVariants> {
    accent?: string;
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(function Kbd(
    { className, variant, accent, style, children, ...rest },
    ref,
) {
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;
    return (
        <kbd
            ref={ref as React.Ref<HTMLElement>}
            className={cn(kbdVariants({ variant }), className)}
            style={inlineStyle}
            {...rest}
        >
            {children}
        </kbd>
    );
});

Kbd.displayName = "Diamond.Kbd";

/** Helper: render a chord like ⌘+K with separators. */
export interface KbdChordProps extends React.HTMLAttributes<HTMLSpanElement> {
    keys: string[];
    variant?: KbdVariant;
    separator?: React.ReactNode;
}

export const KbdChord = React.forwardRef<HTMLSpanElement, KbdChordProps>(function KbdChord(
    { keys, variant = "inline", separator = "+", className, ...rest },
    ref,
) {
    return (
        <span ref={ref} className={cn("inline-flex items-center gap-1", className)} {...rest}>
            {keys.map((k, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: chord keys are positional and may repeat (e.g. ⌘+K+K sequences)
                <React.Fragment key={i}>
                    {i > 0 && <span className="text-(--diamond-muted,#6b6862) text-[11px]">{separator}</span>}
                    <Kbd variant={variant}>{k}</Kbd>
                </React.Fragment>
            ))}
        </span>
    );
});

KbdChord.displayName = "Diamond.KbdChord";

export { kbdVariants };
