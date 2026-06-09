"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type DividerVariant = "soft" | "strong" | "dashed" | "labeled" | "ornament" | "vertical";

const dividerVariants = cva("shrink-0", {
    variants: {
        variant: {
            soft: "h-px w-full bg-(--diamond-border,#d9d5cc)",
            strong: "h-px w-full bg-(--diamond-ink,#1a1917)",
            dashed: "h-px w-full bg-[repeating-linear-gradient(to_right,var(--diamond-muted,#6b6862),var(--diamond-muted,#6b6862)_3px,transparent_3px,transparent_6px)]",
            labeled: "flex w-full items-center gap-3 text-(--diamond-muted,#6b6862)",
            ornament: "flex w-full items-center justify-center gap-2 text-(--diamond-accent,#2b7fff)",
            vertical: "h-full min-h-12 w-px bg-(--diamond-border,#d9d5cc)",
        },
    },
    defaultVariants: { variant: "soft" },
});

export interface DividerProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof dividerVariants> {
    label?: React.ReactNode;
}

export const Divider = React.forwardRef<HTMLElement, DividerProps>(function Divider(
    { className, variant = "soft", label = "OR", ...rest },
    ref,
) {
    if (variant === "labeled") {
        return (
            <div
                ref={ref as React.Ref<HTMLDivElement>}
                aria-hidden="true"
                className={cn(dividerVariants({ variant }), className)}
                {...rest}
            >
                <span className="h-px flex-1 bg-(--diamond-border,#d9d5cc)" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em]">{label}</span>
                <span className="h-px flex-1 bg-(--diamond-border,#d9d5cc)" />
            </div>
        );
    }

    if (variant === "ornament") {
        return (
            <div
                ref={ref as React.Ref<HTMLDivElement>}
                aria-hidden="true"
                className={cn(dividerVariants({ variant }), className)}
                {...rest}
            >
                <span className="h-1.5 w-1.5 rotate-45 bg-current" />
                <span className="h-1.5 w-1.5 rotate-45 border border-current" />
                <span className="h-1.5 w-1.5 rotate-45 bg-current" />
            </div>
        );
    }

    return (
        <hr
            ref={ref as React.Ref<HTMLHRElement>}
            aria-orientation={variant === "vertical" ? "vertical" : "horizontal"}
            className={cn(dividerVariants({ variant }), className)}
            {...rest}
        />
    );
});

Divider.displayName = "Diamond.Divider";

export { dividerVariants };
