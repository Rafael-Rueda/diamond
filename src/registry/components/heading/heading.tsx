"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type HeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const headingVariants = cva("m-0 text-(--diamond-ink,#1a1917)", {
    variants: {
        variant: {
            h1: "font-semibold font-serif text-4xl leading-tight",
            h2: "font-semibold font-serif text-3xl leading-tight",
            h3: "font-semibold text-2xl leading-snug",
            h4: "font-semibold text-xl leading-snug",
            h5: "font-semibold text-base leading-snug",
            h6: "font-mono font-semibold text-[11px] uppercase leading-normal tracking-[0.14em]",
        },
    },
    defaultVariants: { variant: "h2" },
});

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
    as?: HeadingVariant;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
    { as, className, variant = "h2", children, ...rest },
    ref,
) {
    const resolvedVariant = variant ?? "h2";
    const Component: HeadingVariant = as ?? resolvedVariant;

    return (
        <Component ref={ref} className={cn(headingVariants({ variant: resolvedVariant }), className)} {...rest}>
            {children}
        </Component>
    );
});

Heading.displayName = "Diamond.Heading";

export { headingVariants };
