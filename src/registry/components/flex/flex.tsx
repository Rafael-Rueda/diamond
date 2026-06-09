"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type FlexVariant = "row" | "space-between" | "column" | "wrap" | "center" | "baseline";

const flexVariants = cva("flex w-full gap-2", {
    variants: {
        variant: {
            row: "flex-row items-center",
            "space-between": "items-center justify-between",
            column: "min-h-24 flex-col",
            wrap: "flex-wrap items-center",
            center: "min-h-24 items-center justify-center",
            baseline: "min-h-24 items-end",
        },
    },
    defaultVariants: { variant: "row" },
});

export type FlexProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof flexVariants>;

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(function Flex(
    { className, variant = "row", ...rest },
    ref,
) {
    return <div ref={ref} className={cn(flexVariants({ variant }), className)} {...rest} />;
});

Flex.displayName = "Diamond.Flex";

export { flexVariants };
