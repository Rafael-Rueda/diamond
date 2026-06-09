"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type TabsVariant = "underline" | "segmented" | "vertical" | "browser" | "pills" | "mono";

export interface TabItem {
    id: string;
    label: string;
    content: React.ReactNode;
}

const tabsVariants = cva("w-full max-w-[320px] text-sm", {
    variants: {
        variant: {
            underline: "",
            segmented: "",
            vertical: "grid grid-cols-[110px_1fr] gap-3",
            browser: "",
            pills: "",
            mono: "font-mono",
        },
    },
    defaultVariants: { variant: "underline" },
});

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabsVariants> {
    items?: TabItem[];
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
}

const defaultTabs: TabItem[] = [
    { id: "overview", label: "Overview", content: "Dashboard overview with key metrics." },
    { id: "activity", label: "Activity", content: "Recent activity appears here." },
    { id: "settings", label: "Settings", content: "Preference controls." },
];

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs(
    { className, variant = "underline", items = defaultTabs, defaultValue, value, onValueChange, ...rest },
    ref,
) {
    const autoId = React.useId();
    const [localValue, setLocalValue] = React.useState(defaultValue ?? items[0]?.id);
    const activeValue = value ?? localValue;
    const activeIndex = Math.max(
        0,
        items.findIndex((item) => item.id === activeValue),
    );
    const activeItem = items[activeIndex] ?? items[0];

    const setActive = (next: string) => {
        setLocalValue(next);
        onValueChange?.(next);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const last = items.length - 1;
        const nextIndex =
            event.key === "Home"
                ? 0
                : event.key === "End"
                  ? last
                  : event.key === "ArrowRight" || event.key === "ArrowDown"
                    ? activeIndex === last
                        ? 0
                        : activeIndex + 1
                    : activeIndex === 0
                      ? last
                      : activeIndex - 1;
        setActive(items[nextIndex].id);
    };

    const tabListClass = cn(
        "flex gap-1 border-(--diamond-border,#d9d5cc) border-b",
        variant === "segmented" && "rounded-lg border-0 bg-(--diamond-surface-alt,#ebe8e1) p-1",
        variant === "vertical" && "flex-col border-0 border-r",
        variant === "browser" && "gap-0",
        variant === "pills" && "border-0 gap-2",
        variant === "mono" && "border-b-2",
    );

    return (
        <div ref={ref} className={cn(tabsVariants({ variant }), className)} {...rest}>
            <div
                role="tablist"
                aria-orientation={variant === "vertical" ? "vertical" : "horizontal"}
                className={tabListClass}
                onKeyDown={onKeyDown}
            >
                {items.map((item) => {
                    const active = item.id === activeItem.id;
                    return (
                        <button
                            key={item.id}
                            id={`${autoId}-${item.id}-tab`}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            aria-controls={`${autoId}-${item.id}-panel`}
                            tabIndex={active ? 0 : -1}
                            onClick={() => setActive(item.id)}
                            className={cn(
                                "px-3 py-2 text-(--diamond-muted,#6b6862) text-[12px]",
                                active && "font-semibold text-(--diamond-ink,#1a1917)",
                                variant === "underline" && active && "border-(--diamond-accent,#2b7fff) border-b-2",
                                variant === "segmented" && "flex-1 rounded-md border-0 py-1.5",
                                variant === "segmented" && active && "bg-(--diamond-surface,#fff) shadow-sm",
                                variant === "vertical" && "text-left",
                                variant === "vertical" && active && "border-(--diamond-accent,#2b7fff) border-r-2",
                                variant === "browser" &&
                                    "rounded-t-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface-alt,#ebe8e1)",
                                variant === "browser" && active && "bg-(--diamond-surface,#fff)",
                                variant === "pills" && "rounded-full",
                                variant === "pills" &&
                                    active &&
                                    "bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#fff)",
                                variant === "mono" && "font-mono text-[11px] uppercase tracking-[0.08em]",
                            )}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </div>
            <div
                id={`${autoId}-${activeItem.id}-panel`}
                role="tabpanel"
                aria-labelledby={`${autoId}-${activeItem.id}-tab`}
                className={cn(
                    "min-h-11 px-1 py-3 text-(--diamond-muted,#6b6862) text-[12px]",
                    variant === "browser" && "border border-(--diamond-border,#d9d5cc) border-t-0 p-3",
                )}
            >
                {activeItem.content}
            </div>
        </div>
    );
});

Tabs.displayName = "Diamond.Tabs";

export { tabsVariants };
