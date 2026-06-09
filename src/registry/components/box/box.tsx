"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type BoxVariant = "card" | "inverted" | "accent-rail" | "elevated" | "terminal" | "brutalist";

const boxVariants = cva("w-full max-w-[280px] text-left text-(--diamond-ink,#1a1917)", {
    variants: {
        variant: {
            card: "rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-4",
            inverted:
                "rounded-lg border border-(--diamond-ink,#1a1917) bg-(--diamond-ink,#1a1917) p-4 text-(--diamond-surface,#fff)",
            "accent-rail":
                "rounded-r-md border-l-(--diamond-accent,#2b7fff) border-l-4 bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_12%,var(--diamond-surface,#fff))] p-4",
            elevated:
                "rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-4 shadow-[0_8px_16px_-8px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.05)]",
            terminal: "rounded border border-[#2d2c28] bg-[#0a0a08] p-4 font-mono text-[#d4d0c8] text-[12px]",
            brutalist:
                "rounded-none border-(--diamond-ink,#1a1917) border-2 bg-(--diamond-surface,#fff) p-4 shadow-[4px_4px_0_var(--diamond-ink,#1a1917)]",
        },
    },
    defaultVariants: { variant: "card" },
});

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof boxVariants> {
    accent?: string;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(function Box(
    { className, variant = "card", accent, style, ...rest },
    ref,
) {
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    return <div ref={ref} className={cn(boxVariants({ variant }), className)} style={inlineStyle} {...rest} />;
});

Box.displayName = "Diamond.Box";

export { boxVariants };
