"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type ContainerVariant = "small" | "medium" | "fluid" | "stepped" | "prose" | "ruled";

const containerVariants = cva("mx-auto w-full", {
    variants: {
        variant: {
            small: "max-w-[640px] px-4 sm:px-6",
            medium: "max-w-[768px] px-4 sm:px-6",
            fluid: "max-w-none px-4 sm:px-6",
            stepped: "max-w-[640px] px-4 sm:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1200px]",
            prose: "max-w-[65ch] px-4 sm:px-6",
            ruled: "relative max-w-[1200px] px-4 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-[repeating-linear-gradient(to_bottom,var(--diamond-border,#d9d5cc),var(--diamond-border,#d9d5cc)_3px,transparent_3px,transparent_6px)] after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-[repeating-linear-gradient(to_bottom,var(--diamond-border,#d9d5cc),var(--diamond-border,#d9d5cc)_3px,transparent_3px,transparent_6px)] sm:px-6",
        },
    },
    defaultVariants: { variant: "medium" },
});

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof containerVariants>;

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(function Container(
    { className, variant = "medium", ...rest },
    ref,
) {
    return <div ref={ref} className={cn(containerVariants({ variant }), className)} {...rest} />;
});

Container.displayName = "Diamond.Container";

export { containerVariants };
