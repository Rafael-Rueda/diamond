"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type ParagraphVariant = "default" | "editorial" | "caption" | "drop-cap" | "mono" | "pull-quote";

const paragraphVariants = cva("m-0 max-w-[65ch] text-(--diamond-ink,#1a1917)", {
    variants: {
        variant: {
            default: "text-sm leading-6",
            editorial: "font-serif text-[15px] leading-7",
            caption: "text-(--diamond-muted,#6b6862) text-xs leading-5",
            "drop-cap":
                "text-sm leading-6 first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-(--diamond-accent,#2b7fff) first-letter:text-4xl first-letter:leading-[0.9]",
            mono: "font-mono text-(--diamond-muted,#6b6862) text-[11px] leading-6",
            "pull-quote":
                "border-l-(--diamond-accent,#2b7fff) border-l-4 pl-4 text-(--diamond-muted,#6b6862) text-sm italic leading-6",
        },
    },
    defaultVariants: { variant: "default" },
});

export type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & VariantProps<typeof paragraphVariants>;

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(function Paragraph(
    { className, variant = "default", ...rest },
    ref,
) {
    return <p ref={ref} className={cn(paragraphVariants({ variant }), className)} {...rest} />;
});

Paragraph.displayName = "Diamond.Paragraph";

export { paragraphVariants };
