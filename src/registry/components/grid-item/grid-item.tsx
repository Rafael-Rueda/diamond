"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type GridItemVariant = "column-span" | "row-span" | "bento" | "explicit" | "area" | "featured";

const gridItemVariants = cva(
    "flex min-h-8 items-center justify-center rounded bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_14%,var(--diamond-surface,#fff))] px-2 py-1 font-mono text-[11px] text-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_70%,var(--diamond-ink,#1a1917))]",
    {
        variants: {
            variant: {
                "column-span": "col-span-2",
                "row-span": "row-span-2",
                bento: "col-span-2 row-span-2 min-h-16",
                explicit: "col-start-2 col-end-4",
                area: "",
                featured: "col-span-2 bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff)",
            },
        },
        defaultVariants: { variant: "column-span" },
    },
);

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridItemVariants> {
    area?: string;
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(function GridItem(
    { className, variant = "column-span", area, style, ...rest },
    ref,
) {
    const inlineStyle: React.CSSProperties = { ...style };
    if (area) inlineStyle.gridArea = area;

    return <div ref={ref} className={cn(gridItemVariants({ variant }), className)} style={inlineStyle} {...rest} />;
});

GridItem.displayName = "Diamond.GridItem";

export { gridItemVariants };
