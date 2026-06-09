"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type SpacerVariant = "fill" | "push-end" | "vertical-fill" | "scale" | "nav" | "between";

const spacerVariants = cva("shrink-0", {
    variants: {
        variant: {
            fill: "min-w-4 flex-1",
            "push-end": "ml-auto min-w-4",
            "vertical-fill": "min-h-4 flex-1",
            scale: "h-[var(--diamond-spacer,1rem)] w-[var(--diamond-spacer,1rem)]",
            nav: "min-w-4 flex-1 border border-(--diamond-accent,#2b7fff) border-dashed bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,color-mix(in_oklab,var(--diamond-accent,#2b7fff)_20%,transparent)_3px,color-mix(in_oklab,var(--diamond-accent,#2b7fff)_20%,transparent)_4px)]",
            between: "min-w-4 flex-1",
        },
    },
    defaultVariants: { variant: "fill" },
});

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spacerVariants> {
    size?: number | string;
}

export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(function Spacer(
    { className, variant = "fill", size, style, ...rest },
    ref,
) {
    const inlineStyle: React.CSSProperties = { ...style };
    if (size !== undefined) {
        (inlineStyle as Record<string, string>)["--diamond-spacer"] = typeof size === "number" ? `${size}px` : size;
    }
    return (
        <div
            ref={ref}
            aria-hidden="true"
            className={cn(spacerVariants({ variant }), className)}
            style={inlineStyle}
            {...rest}
        />
    );
});

Spacer.displayName = "Diamond.Spacer";

export { spacerVariants };
