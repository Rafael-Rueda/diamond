"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type CenterVariant = "flex" | "crosshair" | "column" | "grid" | "absolute" | "margin";

const centerVariants = cva("relative min-h-32 w-full rounded-md bg-(--diamond-surface-alt,#ebe8e1)", {
    variants: {
        variant: {
            flex: "flex items-center justify-center",
            crosshair:
                "flex items-center justify-center before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-[repeating-linear-gradient(to_right,var(--diamond-border,#d9d5cc),var(--diamond-border,#d9d5cc)_3px,transparent_3px,transparent_6px)] after:absolute after:inset-y-0 after:left-1/2 after:w-px after:bg-[repeating-linear-gradient(to_bottom,var(--diamond-border,#d9d5cc),var(--diamond-border,#d9d5cc)_3px,transparent_3px,transparent_6px)]",
            column: "flex flex-col items-center justify-center gap-2",
            grid: "grid place-items-center",
            absolute: "[&>*]:absolute [&>*]:top-1/2 [&>*]:left-1/2 [&>*]:-translate-x-1/2 [&>*]:-translate-y-1/2",
            margin: "flex [&>*]:m-auto",
        },
    },
    defaultVariants: { variant: "flex" },
});

export type CenterProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof centerVariants>;

export const Center = React.forwardRef<HTMLDivElement, CenterProps>(function Center(
    { className, variant = "flex", ...rest },
    ref,
) {
    return <div ref={ref} className={cn(centerVariants({ variant }), className)} {...rest} />;
});

Center.displayName = "Diamond.Center";

export { centerVariants };
