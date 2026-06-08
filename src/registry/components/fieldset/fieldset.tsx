"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Fieldset — semantic grouping of related controls. Wraps real
 * <fieldset> and <legend>. Six visual treatments. */

export type FieldsetVariant = "classic" | "card-accent" | "rule" | "section" | "numbered" | "editorial";

const fieldsetVariants = cva("flex flex-col gap-3 text-(--diamond-ink,#1a1917)", {
    variants: {
        variant: {
            classic: "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-4",
            "card-accent":
                "rounded-md border border-(--diamond-border,#d9d5cc) border-l-4 border-l-(--diamond-accent,#2b7fff) bg-(--diamond-surface,#fff) p-4",
            rule: "border-(--diamond-border,#d9d5cc) border-t pt-4",
            section: "",
            numbered: "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-4",
            editorial: "border-(--diamond-ink,#1a1917) border-t-2 pt-4",
        },
    },
    defaultVariants: { variant: "classic" },
});

const legendVariants = cva("inline-flex items-center gap-2", {
    variants: {
        variant: {
            classic: "px-1.5 font-semibold text-[13px]",
            "card-accent": "px-1.5 font-semibold text-[13px]",
            rule: "font-mono text-[11px] text-(--diamond-muted,#6b6862) uppercase tracking-[0.14em]",
            section: "block w-full border-(--diamond-border,#d9d5cc) border-b pb-2 font-semibold text-[14px]",
            numbered: "px-1.5 font-semibold text-[13px]",
            editorial: "font-medium text-2xl [font-family:Fraunces,Georgia,serif] italic",
        },
    },
    defaultVariants: { variant: "classic" },
});

export interface FieldsetProps
    extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, "form">,
        VariantProps<typeof fieldsetVariants> {
    legend?: React.ReactNode;
    /** Numbered variant — the step number. */
    step?: React.ReactNode;
    /** Helper line below the legend. */
    description?: React.ReactNode;
    accent?: string;
}

export const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(function Fieldset(
    {
        className,
        variant = "classic",
        legend,
        step,
        description,
        accent,
        style,
        children,
        ...rest
    },
    ref,
) {
    const v = variant ?? "classic";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    return (
        <fieldset
            ref={ref}
            className={cn(fieldsetVariants({ variant: v }), className)}
            style={inlineStyle}
            {...rest}
        >
            {legend ? (
                <legend className={legendVariants({ variant: v })}>
                    {v === "numbered" && step !== undefined ? (
                        <span
                            aria-hidden="true"
                            className="inline-flex size-5 items-center justify-center rounded-full bg-(--diamond-accent,#2b7fff) font-mono text-(--diamond-on-accent,#fff) text-[10px]"
                        >
                            {step}
                        </span>
                    ) : null}
                    {legend}
                </legend>
            ) : null}
            {description ? (
                <p className="text-(--diamond-muted,#6b6862) text-[11px]">{description}</p>
            ) : null}
            {children}
        </fieldset>
    );
});

Fieldset.displayName = "Diamond.Fieldset";

export { fieldsetVariants };
