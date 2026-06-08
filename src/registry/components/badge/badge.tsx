"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Badge — count, status, label, dot. */

export type BadgeVariant = "count" | "status" | "overflow" | "dot" | "icon" | "label";

export type BadgeTone = "accent" | "success" | "warning" | "danger" | "neutral" | "inverted";

const TONE_BG: Record<BadgeTone, string> = {
    accent: "bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff)",
    success: "bg-emerald-500 text-white",
    warning: "bg-amber-500 text-white",
    danger: "bg-rose-500 text-white",
    neutral: "bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-ink,#1a1917)",
    inverted: "bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#fff)",
};

const badgeVariants = cva(
    ["inline-flex select-none items-center justify-center whitespace-nowrap font-medium", "shrink-0"].join(" "),
    {
        variants: {
            variant: {
                count: "h-5 min-w-5 rounded-full px-1.5 font-semibold text-[10px]",
                status: "h-5 rounded px-2 font-bold text-[10px] uppercase tracking-[0.08em]",
                overflow: "h-6 min-w-6 rounded-full px-1.5 font-semibold text-[11px]",
                dot: "size-2.5 rounded-full p-0",
                icon: "size-5 rounded-full border-(--diamond-surface,#fff) border-2 font-bold text-[10px]",
                label: "h-[22px] rounded px-2 text-[11px]",
            },
        },
        defaultVariants: { variant: "count" },
    },
);

export interface BadgeProps
    extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
        VariantProps<typeof badgeVariants> {
    /** Color tone — accent, success, warning, danger, neutral, inverted. */
    tone?: BadgeTone;
    /** Override accent color (CSS color string). */
    accent?: string;
    /** When true, the badge floats over its parent (absolute top-right). */
    floating?: boolean;
    /** Outline style instead of solid. */
    outline?: boolean;
    /** Pulse animation (good for live/attention states). */
    pulse?: boolean;
    asChild?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
    {
        className,
        variant = "count",
        tone = "accent",
        accent,
        floating = false,
        outline = false,
        pulse = false,
        asChild = false,
        style,
        children,
        ...rest
    },
    ref,
) {
    const Comp: React.ElementType = asChild ? Slot : "span";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    return (
        <Comp
            ref={ref}
            className={cn(
                badgeVariants({ variant }),
                outline
                    ? cn(
                          "border-[1.5px] bg-transparent",
                          tone === "accent" && "border-(--diamond-accent,#2b7fff) text-(--diamond-accent,#2b7fff)",
                          tone === "success" && "border-emerald-500 text-emerald-600",
                          tone === "warning" && "border-amber-500 text-amber-600",
                          tone === "danger" && "border-rose-500 text-rose-600",
                          tone === "neutral" && "border-(--diamond-border,#d9d5cc) text-(--diamond-muted,#6b6862)",
                          tone === "inverted" && "border-(--diamond-ink,#1a1917) text-(--diamond-ink,#1a1917)",
                      )
                    : TONE_BG[tone],
                floating && "absolute -top-1.5 -right-1.5",
                pulse &&
                    variant === "dot" &&
                    'before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-current before:opacity-60 before:content-[""]',
                pulse && variant === "dot" && "relative",
                className,
            )}
            style={inlineStyle}
            {...rest}
        >
            {variant === "dot" ? null : children}
        </Comp>
    );
});

Badge.displayName = "Diamond.Badge";

export { badgeVariants };
