"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type GridVariant = "three-col" | "four-col" | "fractional" | "auto-fit" | "twelve-col" | "masonry";

const gridVariants = cva("grid w-full gap-2", {
    variants: {
        variant: {
            "three-col": "grid-cols-3",
            "four-col": "grid-cols-4",
            fractional: "grid-cols-[2fr_1fr_1fr]",
            "auto-fit": "grid-cols-[repeat(auto-fit,minmax(4rem,1fr))]",
            "twelve-col": "grid-cols-12 gap-1",
            masonry: "auto-rows-[1.5rem] grid-cols-3",
        },
    },
    defaultVariants: { variant: "three-col" },
});

export type GridProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof gridVariants>;

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(function Grid(
    { className, variant = "three-col", ...rest },
    ref,
) {
    return <div ref={ref} className={cn(gridVariants({ variant }), className)} {...rest} />;
});

Grid.displayName = "Diamond.Grid";

export { gridVariants };
