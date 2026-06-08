"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · NotificationDot — unread indicator on any trigger. Wraps a child
 * and floats a dot, counted badge, pulsing live signal, status ring, overflow
 * pill, or a presence legend over it. */

export type NotificationDotVariant = "dot" | "count" | "pulse" | "status" | "overflow" | "legend";

export type NotificationDotTone = "accent" | "success" | "warning" | "danger" | "muted";

const TONE_BG: Record<NotificationDotTone, string> = {
    accent: "bg-(--diamond-accent,#2b7fff)",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-rose-500",
    muted: "bg-(--diamond-muted,#9a968e)",
};

const dotVariants = cva(
    "absolute right-0 top-0 inline-flex items-center justify-center text-(--diamond-on-accent,#fff) shadow-[0_0_0_2px_var(--diamond-surface,#fff)]",
    {
        variants: {
            variant: {
                dot: "size-2 rounded-full",
                count: "h-4 min-w-4 rounded-full px-1 font-semibold text-[9px]",
                pulse: "size-2.5 rounded-full",
                status: "size-2.5 rounded-full",
                overflow: "-right-1 h-5 min-w-7 rounded-full px-1.5 font-semibold text-[10px]",
                legend: "static size-1.5 rounded-full shadow-none",
            },
        },
        defaultVariants: { variant: "dot" },
    },
);

export interface NotificationDotProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof dotVariants> {
    /** Semantic color. */
    tone?: NotificationDotTone;
    /** Number to display (count / overflow variants). */
    count?: number;
    /** Cap before showing "+". Default 99. */
    max?: number;
    /** Accent override. */
    accent?: string;
    asChild?: boolean;
}

export const NotificationDot = React.forwardRef<HTMLSpanElement, NotificationDotProps>(
    function NotificationDot(
        {
            className,
            variant = "dot",
            tone = "accent",
            count,
            max = 99,
            accent,
            asChild = false,
            style,
            children,
            ...rest
        },
        ref,
    ) {
        const Comp: React.ElementType = asChild ? Slot : "span";
        const inlineStyle: React.CSSProperties = { ...style };
        if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

        const v = variant ?? "dot";
        const displayCount =
            v === "overflow" && typeof count === "number" && count > max
                ? `${max}+`
                : typeof count === "number"
                  ? String(count)
                  : children;

        return (
            <Comp
                ref={ref}
                aria-label={typeof count === "number" ? `${count} unread` : "Unread"}
                className={cn(
                    dotVariants({ variant: v }),
                    TONE_BG[tone],
                    v === "pulse" &&
                        'relative before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-current before:opacity-70 before:content-[""]',
                    className,
                )}
                style={inlineStyle}
                {...rest}
            >
                {v === "count" || v === "overflow" ? displayCount : null}
            </Comp>
        );
    },
);

NotificationDot.displayName = "Diamond.NotificationDot";

export { dotVariants };
