"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type StackVariant = "tight" | "loose" | "horizontal" | "divided" | "indented" | "separated";

const stackVariants = cva("flex w-full", {
    variants: {
        variant: {
            tight: "flex-col gap-1",
            loose: "flex-col gap-3",
            horizontal: "flex-row gap-2",
            divided:
                "flex-col gap-0 overflow-hidden rounded-md border border-(--diamond-border,#d9d5cc) [&>*+*]:border-(--diamond-border,#d9d5cc) [&>*+*]:border-t",
            indented: "flex-col gap-2 [&>*:nth-child(2)]:ml-3 [&>*:nth-child(3)]:ml-6 [&>*:nth-child(4)]:ml-9",
            separated: "flex-col gap-2 [&>*+*]:border-(--diamond-border,#d9d5cc) [&>*+*]:border-t [&>*+*]:pt-2",
        },
    },
    defaultVariants: { variant: "tight" },
});

export type StackProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof stackVariants>;

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(function Stack(
    { className, variant = "tight", ...rest },
    ref,
) {
    return <div ref={ref} className={cn(stackVariants({ variant }), className)} {...rest} />;
});

Stack.displayName = "Diamond.Stack";

export { stackVariants };
