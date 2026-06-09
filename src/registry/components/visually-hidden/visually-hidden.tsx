"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type VisuallyHiddenVariant =
    | "icon-label"
    | "field-label"
    | "skip-link"
    | "status"
    | "list-bound"
    | "live-status";

export const visuallyHiddenClassName =
    "absolute size-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)] [clip-path:inset(50%)]";

const visuallyHiddenVariants = cva(visuallyHiddenClassName, {
    variants: {
        variant: {
            "icon-label": "",
            "field-label": "",
            "skip-link":
                "focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:h-auto focus:w-auto focus:overflow-visible focus:rounded-md focus:bg-(--diamond-ink,#1a1917) focus:px-3 focus:py-2 focus:text-(--diamond-surface,#fff) focus:[clip-path:none] focus:[clip:auto]",
            status: "",
            "list-bound": "",
            "live-status": "",
        },
    },
    defaultVariants: { variant: "icon-label" },
});

export interface VisuallyHiddenProps
    extends React.HTMLAttributes<HTMLElement>,
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        React.LabelHTMLAttributes<HTMLLabelElement>,
        VariantProps<typeof visuallyHiddenVariants> {
    as?: keyof React.JSX.IntrinsicElements;
}

export const VisuallyHidden = React.forwardRef<HTMLElement, VisuallyHiddenProps>(function VisuallyHidden(
    { as: Element = "span", className, variant = "icon-label", ...rest },
    ref,
) {
    return React.createElement(Element, {
        ref,
        className: cn(visuallyHiddenVariants({ variant }), className),
        ...rest,
    });
});

VisuallyHidden.displayName = "Diamond.VisuallyHidden";

export { visuallyHiddenVariants };
