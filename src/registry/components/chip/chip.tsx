"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Chip — interactive labels (filter, dismissible, etc.). */

export type ChipVariant = "basic" | "dismissible" | "filter" | "dot" | "emoji" | "add";

const chipVariants = cva(
    [
        "inline-flex select-none items-center justify-center gap-1.5",
        "whitespace-nowrap font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
        "focus-visible:ring-(--diamond-accent,#2b7fff)",
    ].join(" "),
    {
        variants: {
            variant: {
                basic: "bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-ink,#1a1917) hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_12%,var(--diamond-surface-alt,#ebe8e1))]",
                dismissible:
                    "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_14%,var(--diamond-surface,#fff))] text-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_75%,var(--diamond-ink,#1a1917))]",
                filter: "cursor-pointer border border-(--diamond-border,#d9d5cc) text-(--diamond-muted,#6b6862) hover:border-(--diamond-accent,#2b7fff) hover:text-(--diamond-accent,#2b7fff) data-[active=true]:border-(--diamond-ink,#1a1917) data-[active=true]:bg-(--diamond-ink,#1a1917) data-[active=true]:text-(--diamond-surface,#fff)",
                dot: "bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-ink,#1a1917)",
                emoji: "bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-ink,#1a1917)",
                add: "cursor-pointer border border-(--diamond-accent,#2b7fff) border-dashed bg-transparent text-(--diamond-accent,#2b7fff) hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_10%,transparent)]",
            },
            size: {
                sm: "h-6 rounded-full px-2.5 text-[11px]",
                md: "h-7 rounded-full px-3 text-[12px]",
                lg: "h-8 rounded-full px-4 text-[13px]",
            },
        },
        defaultVariants: { variant: "basic", size: "md" },
    },
);

export interface ChipProps
    extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onClick">,
        VariantProps<typeof chipVariants> {
    accent?: string;
    /** Active state for filter chips. */
    active?: boolean;
    /** Optional dot color (renders a circle before text). */
    dotColor?: string;
    /** Leading content (icon/emoji). */
    leading?: React.ReactNode;
    /** Custom dismiss button. Render dismiss icon when set; calls onDismiss. */
    onDismiss?: (e: React.MouseEvent) => void;
    /** Click handler — also makes the chip act as a button. */
    onClick?: (e: React.MouseEvent) => void;
    asChild?: boolean;
}

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(function Chip(
    {
        className,
        variant = "basic",
        size,
        accent,
        active,
        dotColor,
        leading,
        onDismiss,
        onClick,
        asChild = false,
        style,
        children,
        ...rest
    },
    ref,
) {
    const Comp: React.ElementType = asChild ? Slot : onClick ? "button" : "span";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    return (
        <Comp
            ref={ref as never}
            className={cn(chipVariants({ variant, size }), onClick && "cursor-pointer", className)}
            style={inlineStyle}
            data-active={active || undefined}
            onClick={onClick}
            {...rest}
        >
            {variant === "add" && <span aria-hidden="true">+</span>}
            {(variant === "dot" || dotColor) && (
                <span
                    aria-hidden="true"
                    className="inline-block size-1.5 shrink-0 rounded-full"
                    style={{ background: dotColor ?? "var(--diamond-accent,#2b7fff)" }}
                />
            )}
            {leading}
            <span>{children}</span>
            {(variant === "dismissible" || onDismiss) && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDismiss?.(e);
                    }}
                    aria-label="Dismiss"
                    className="-mr-1 inline-flex size-4 cursor-pointer items-center justify-center rounded-full text-current/70 transition-colors hover:bg-black/10 hover:text-current"
                >
                    <span aria-hidden="true" className="text-[14px] leading-none">
                        ×
                    </span>
                </button>
            )}
        </Comp>
    );
});

Chip.displayName = "Diamond.Chip";

export { chipVariants };
