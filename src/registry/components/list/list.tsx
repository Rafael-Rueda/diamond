"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · List — vertical grouping; data-driven OR composition. */

export type ListVariant = "default" | "numbered" | "rich" | "terminal" | "editorial" | "toggles";

const listVariants = cva("flex w-full flex-col text-[13px]", {
    variants: {
        variant: {
            default:
                "divide-y divide-(--diamond-border,#d9d5cc) rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff)",
            numbered: "gap-1.5",
            rich: "divide-y divide-(--diamond-border,#d9d5cc) rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff)",
            terminal:
                "divide-y divide-[#2d2c28] rounded-md border border-[#2d2c28] bg-[#0f0f0e] font-mono text-[#d4d0c8] text-[11px]",
            editorial: "gap-0 [&>*]:border-(--diamond-border,#d9d5cc) [&>*]:border-b [&>*]:py-2.5",
            toggles:
                "divide-y divide-(--diamond-border,#d9d5cc) rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff)",
        },
    },
    defaultVariants: { variant: "default" },
});

export interface ListEntry {
    /** Stable key for React. */
    id?: React.Key;
    /** Primary text. */
    label: React.ReactNode;
    /** Secondary text. */
    description?: React.ReactNode;
    /** Leading slot (icon, avatar, dot). */
    leading?: React.ReactNode;
    /** Trailing slot (count, chevron, switch). */
    trailing?: React.ReactNode;
    /** Click handler. */
    onSelect?: () => void;
    /** Disabled. */
    disabled?: boolean;
}

export interface ListProps
    extends Omit<React.HTMLAttributes<HTMLUListElement>, "children">,
        VariantProps<typeof listVariants> {
    items?: ListEntry[];
    /** Custom item renderer (overrides built-in). */
    renderItem?: (item: ListEntry, index: number) => React.ReactNode;
    /** Compose your own children instead of items. */
    children?: React.ReactNode;
    accent?: string;
}

export const List = React.forwardRef<HTMLUListElement, ListProps>(function List(
    { className, variant = "default", items, renderItem, accent, style, children, ...rest },
    ref,
) {
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    if (!items) {
        return (
            <ul ref={ref} className={cn(listVariants({ variant }), className)} style={inlineStyle} {...rest}>
                {children}
            </ul>
        );
    }

    return (
        <ul ref={ref} className={cn(listVariants({ variant }), className)} style={inlineStyle} {...rest}>
            {items.map((item, i) => {
                if (renderItem) return <li key={item.id ?? i}>{renderItem(item, i)}</li>;

                if (variant === "numbered") {
                    return (
                        <li key={item.id ?? i} className="flex items-center gap-3">
                            <span className="w-6 shrink-0 font-mono text-(--diamond-accent,#2b7fff) text-[10px] tracking-[0.08em]">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>{item.label}</span>
                        </li>
                    );
                }

                if (variant === "editorial") {
                    return (
                        <li key={item.id ?? i}>
                            <div className="text-[15px] italic [font-family:Fraunces,Georgia,serif]">{item.label}</div>
                            {item.description && (
                                <div className="mt-1 text-(--diamond-muted,#6b6862) text-[10px] uppercase tracking-[0.12em]">
                                    {item.description}
                                </div>
                            )}
                        </li>
                    );
                }

                return (
                    <li key={item.id ?? i}>
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onSelect}
                            className={cn(
                                "flex w-full items-center gap-3 px-3 py-2.5 text-left",
                                "transition-colors",
                                variant === "terminal"
                                    ? "hover:bg-[#1a1815] disabled:opacity-50"
                                    : "hover:bg-(--diamond-surface-alt,#ebe8e1) disabled:opacity-50",
                                item.onSelect ? "cursor-pointer" : "cursor-default hover:bg-transparent",
                                "disabled:cursor-not-allowed",
                            )}
                        >
                            {item.leading && <span className="shrink-0">{item.leading}</span>}
                            <span className="min-w-0 flex-1">
                                <span className="block truncate">{item.label}</span>
                                {item.description && (
                                    <span
                                        className={cn(
                                            "block truncate text-[11px]",
                                            variant === "terminal"
                                                ? "text-[#6b6862]"
                                                : "text-(--diamond-muted,#6b6862)",
                                        )}
                                    >
                                        {item.description}
                                    </span>
                                )}
                            </span>
                            {item.trailing && <span className="shrink-0">{item.trailing}</span>}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
});

List.displayName = "Diamond.List";

export { listVariants };
