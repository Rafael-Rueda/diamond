"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Card — entity summary container; data-driven OR child composition. */

export type CardVariant = "hero" | "horizontal" | "social" | "editorial" | "feature" | "metric";

const cardVariants = cva(
    [
        "relative overflow-hidden text-left",
        "border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff)",
        "text-(--diamond-ink,#1a1917)",
    ].join(" "),
    {
        variants: {
            variant: {
                hero: "flex w-[260px] flex-col rounded-lg",
                horizontal: "flex w-[280px] flex-row rounded-md",
                social: "flex w-[260px] flex-col gap-2 rounded-2xl border-0 bg-(--diamond-surface-alt,#ebe8e1) p-3",
                editorial: "flex w-[260px] flex-col gap-1 rounded-md p-4",
                feature:
                    "flex w-[260px] flex-col rounded-lg border-(--diamond-ink,#1a1917) bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#fff)",
                metric: "flex w-[240px] flex-col rounded-md p-3",
            },
            interactive: {
                true: "cursor-pointer transition-shadow hover:shadow-[0_8px_24px_-8px_color-mix(in_oklab,var(--diamond-ink,#1a1917)_25%,transparent)] focus-visible:outline-none focus-visible:ring-(--diamond-accent,#2b7fff) focus-visible:ring-2",
                false: "",
            },
        },
        defaultVariants: { variant: "hero", interactive: false },
    },
);

export interface CardProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
        VariantProps<typeof cardVariants> {
    /** Header media element (image, gradient div, video). */
    media?: React.ReactNode;
    /** Title text. */
    title?: React.ReactNode;
    /** Meta label above/below title (e.g. "ISSUE 04 · SPRING"). */
    meta?: React.ReactNode;
    /** Description body. */
    description?: React.ReactNode;
    /** Footer / action area. */
    footer?: React.ReactNode;
    /** Accent override. */
    accent?: string;
    /** Interactive — adds hover affordance. */
    interactive?: boolean;
    asChild?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
    {
        className,
        variant = "hero",
        interactive,
        media,
        meta,
        title,
        description,
        footer,
        accent,
        asChild = false,
        style,
        children,
        ...rest
    },
    ref,
) {
    const Comp: React.ElementType = asChild ? Slot : "div";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const useChildrenOnly = !title && !meta && !description && !media && !footer;

    if (variant === "horizontal") {
        return (
            <Comp
                ref={ref as never}
                className={cn(cardVariants({ variant, interactive }), className)}
                style={inlineStyle}
                {...rest}
            >
                {media && <div className="w-[88px] shrink-0 bg-(--diamond-surface-alt,#ebe8e1)">{media}</div>}
                <div className="min-w-0 flex-1 p-3">
                    {meta && (
                        <div className="font-medium text-(--diamond-muted,#6b6862) text-[10px] uppercase tracking-[0.12em]">
                            {meta}
                        </div>
                    )}
                    {title && <div className="mt-0.5 truncate font-semibold text-[14px]">{title}</div>}
                    {description && (
                        <div className="mt-1 line-clamp-2 text-(--diamond-muted,#6b6862) text-[11px]">
                            {description}
                        </div>
                    )}
                    {footer && <div className="mt-2">{footer}</div>}
                    {useChildrenOnly && children}
                </div>
            </Comp>
        );
    }

    return (
        <Comp
            ref={ref as never}
            className={cn(cardVariants({ variant, interactive }), className)}
            style={inlineStyle}
            {...rest}
        >
            {media && <div className="aspect-[4/3] overflow-hidden bg-(--diamond-surface-alt,#ebe8e1)">{media}</div>}
            <div className={cn(variant === "social" || variant === "editorial" ? "p-0" : "p-3.5")}>
                {variant === "editorial" ? (
                    <>
                        {meta && (
                            <div className="font-mono text-(--diamond-muted,#6b6862) text-[10px] uppercase tracking-[0.14em]">
                                {meta}
                            </div>
                        )}
                        {title && (
                            <div className="mt-1 font-medium text-[20px] italic leading-tight tracking-tight [font-family:Fraunces,Georgia,serif]">
                                {title}
                            </div>
                        )}
                        {description && (
                            <div className="mt-1.5 text-(--diamond-muted,#6b6862) text-[12px]">{description}</div>
                        )}
                        {footer && (
                            <div className="mt-3 flex justify-between text-(--diamond-muted,#6b6862) text-[10px]">
                                {footer}
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {meta && (
                            <div
                                className={cn(
                                    "font-medium text-[10px] uppercase tracking-[0.12em]",
                                    variant === "feature"
                                        ? "text-(--diamond-accent,#2b7fff)"
                                        : "text-(--diamond-muted,#6b6862)",
                                )}
                            >
                                {meta}
                            </div>
                        )}
                        {title && <div className="mt-0.5 font-semibold text-[15px]">{title}</div>}
                        {description && (
                            <div
                                className={cn(
                                    "mt-1 text-[12px]",
                                    variant === "feature"
                                        ? "text-[color-mix(in_oklab,var(--diamond-surface,#fff)_70%,var(--diamond-ink,#1a1917))]"
                                        : "text-(--diamond-muted,#6b6862)",
                                )}
                            >
                                {description}
                            </div>
                        )}
                        {footer && <div className="mt-3">{footer}</div>}
                        {useChildrenOnly && children}
                    </>
                )}
            </div>
        </Comp>
    );
});

Card.displayName = "Diamond.Card";

export { cardVariants };
