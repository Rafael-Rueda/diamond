"use client";

import { DotsSixVertical } from "@phosphor-icons/react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · ListItem — versatile row with leading/trailing slots. */

export type ListItemVariant = "basic" | "person" | "product" | "task" | "event" | "drag";

const listItemVariants = cva(
    ["relative flex select-none items-center gap-3 transition-colors", "text-(--diamond-ink,#1a1917)"].join(" "),
    {
        variants: {
            variant: {
                basic: "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 py-2 hover:bg-(--diamond-surface-alt,#ebe8e1)",
                person: "rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 py-2.5",
                product: "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 py-2",
                task: "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 py-2",
                event: "flex-col items-start gap-1 rounded-r-md border-(--diamond-accent,#2b7fff) border-l-[3px] bg-(--diamond-surface-alt,#ebe8e1) px-3 py-2",
                drag: "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 py-2",
            },
            selected: {
                true: "border-(--diamond-accent,#2b7fff) bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_10%,var(--diamond-surface,#fff))]",
                false: "",
            },
            done: {
                true: "[&_[data-li-title]]:text-(--diamond-muted,#6b6862) [&_[data-li-title]]:line-through",
                false: "",
            },
        },
        defaultVariants: { variant: "basic", selected: false, done: false },
    },
);

export interface ListItemProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
        VariantProps<typeof listItemVariants> {
    /** Leading content — icon, avatar, drag handle. */
    leading?: React.ReactNode;
    /** Primary line. */
    title?: React.ReactNode;
    /** Secondary line. */
    description?: React.ReactNode;
    /** Trailing content — badge, button, price, chevron. */
    trailing?: React.ReactNode;
    /** Click handler. Makes the whole row interactive. */
    onSelect?: () => void;
    /** Accent override. */
    accent?: string;
    asChild?: boolean;
}

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(function ListItem(
    {
        className,
        variant,
        selected,
        done,
        leading,
        title,
        description,
        trailing,
        onSelect,
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

    return (
        <Comp
            ref={ref as never}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            onClick={onSelect}
            onKeyDown={(e: React.KeyboardEvent) => {
                if (onSelect && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onSelect();
                }
            }}
            className={cn(listItemVariants({ variant, selected, done }), onSelect && "cursor-pointer", className)}
            style={inlineStyle}
            {...rest}
        >
            {variant === "drag" && (
                <DotsSixVertical
                    weight="bold"
                    size={16}
                    aria-hidden="true"
                    className="shrink-0 cursor-grab text-(--diamond-muted,#6b6862)"
                />
            )}
            {leading && <span className="inline-flex shrink-0 items-center justify-center">{leading}</span>}
            {title || description ? (
                <div className="min-w-0 flex-1">
                    {title && (
                        <div data-li-title className="truncate font-semibold text-[13px]">
                            {title}
                        </div>
                    )}
                    {description && (
                        <div className="truncate text-(--diamond-muted,#6b6862) text-[11px]">{description}</div>
                    )}
                </div>
            ) : (
                <div className="min-w-0 flex-1">{children}</div>
            )}
            {trailing && <span className="inline-flex shrink-0 items-center justify-center">{trailing}</span>}
        </Comp>
    );
});

ListItem.displayName = "Diamond.ListItem";

export { listItemVariants };
