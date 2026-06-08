"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Tag — categorization with hash, semantic, mono, slab, italic, angled. */

export type TagVariant = "hash" | "semantic" | "mono" | "slab" | "editorial" | "angled";

export type TagTone = "accent" | "success" | "warning" | "danger" | "neutral";

const TONE_COLOR: Record<TagTone, string> = {
    accent: "var(--diamond-accent,#2b7fff)",
    success: "#059669",
    warning: "#d97706",
    danger: "#dc2626",
    neutral: "var(--diamond-muted,#6b6862)",
};

const tagVariants = cva("inline-flex select-none items-center gap-1 whitespace-nowrap", {
    variants: {
        variant: {
            hash: "rounded-full bg-(--diamond-surface-alt,#ebe8e1) px-2 py-0.5 text-(--diamond-muted,#6b6862) text-[12px]",
            semantic: "rounded-md border px-2.5 py-0.5 font-semibold text-[11px]",
            mono: "rounded border border-(--diamond-border,#d9d5cc) px-2 py-0.5 font-mono text-(--diamond-muted,#6b6862) text-[10px]",
            slab: "rounded-sm bg-(--diamond-ink,#1a1917) px-2 py-1 font-bold text-(--diamond-surface,#fff) text-[10px] uppercase tracking-[0.12em]",
            editorial:
                "rounded-full bg-(--diamond-surface-alt,#ebe8e1) px-3 py-0.5 font-medium text-(--diamond-ink,#1a1917) text-[12px] italic [font-family:Fraunces,Georgia,serif]",
            angled: "px-3 py-1 pr-4 font-bold text-[10px] uppercase tracking-[0.14em] [clip-path:polygon(0_0,100%_0,calc(100%-8px)_100%,0_100%)]",
        },
    },
    defaultVariants: { variant: "hash" },
});

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {
    /** Semantic tone — drives the color for `semantic` and `angled` variants. */
    tone?: TagTone;
    /** Custom color (overrides tone). */
    color?: string;
    /** Hide the # prefix on `hash` variant. */
    noHash?: boolean;
    asChild?: boolean;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(function Tag(
    { className, variant = "hash", tone = "accent", color, noHash, asChild = false, style, children, ...rest },
    ref,
) {
    const Comp: React.ElementType = asChild ? Slot : "span";
    const c = color ?? TONE_COLOR[tone];
    const inlineStyle: React.CSSProperties = { ...style };

    if (variant === "semantic") {
        Object.assign(inlineStyle, {
            background: `color-mix(in oklab, ${c} 14%, var(--diamond-surface,#fff))`,
            color: c,
            borderColor: `color-mix(in oklab, ${c} 28%, var(--diamond-surface,#fff))`,
        });
    } else if (variant === "angled") {
        Object.assign(inlineStyle, {
            background: `color-mix(in oklab, ${c} 16%, var(--diamond-surface,#fff))`,
            color: c,
        });
    }

    return (
        <Comp ref={ref} className={cn(tagVariants({ variant }), className)} style={inlineStyle} {...rest}>
            {variant === "hash" && !noHash && <span aria-hidden="true">#</span>}
            {children}
        </Comp>
    );
});

Tag.displayName = "Diamond.Tag";

export { tagVariants };
