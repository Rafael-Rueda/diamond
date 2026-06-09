"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type BottomNavigationVariant = "labeled" | "icons" | "fab" | "active-pill" | "top-indicator" | "active-chip";

export interface BottomNavigationItem {
    label: string;
    icon?: React.ReactNode;
    href?: string;
    active?: boolean;
}

const bottomNavigationVariants = cva(
    "relative flex w-full max-w-[280px] items-center justify-around border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-1 text-sm",
    {
        variants: {
            variant: {
                labeled: "rounded-xl",
                icons: "rounded-xl bg-(--diamond-surface-alt,#ebe8e1)",
                fab: "rounded-xl pt-2",
                "active-pill": "rounded-full",
                "top-indicator": "rounded-none border-x-0 p-0",
                "active-chip": "rounded-lg",
            },
        },
        defaultVariants: { variant: "labeled" },
    },
);

export interface BottomNavigationProps
    extends React.HTMLAttributes<HTMLElement>,
        VariantProps<typeof bottomNavigationVariants> {
    items?: BottomNavigationItem[];
    fabLabel?: string;
}

const defaultItems: BottomNavigationItem[] = [
    { label: "Home", icon: "H", href: "#", active: true },
    { label: "Search", icon: "S", href: "#" },
    { label: "Inbox", icon: "I", href: "#" },
    { label: "Me", icon: "M", href: "#" },
];

export const BottomNavigation = React.forwardRef<HTMLElement, BottomNavigationProps>(function BottomNavigation(
    { className, variant = "labeled", items = defaultItems, fabLabel = "Create", ...rest },
    ref,
) {
    const visibleItems =
        variant === "fab"
            ? [items[0], items[1], { label: fabLabel, icon: "+", active: false }, items[2], items[3]].filter(Boolean)
            : items;

    return (
        <nav
            ref={ref}
            aria-label="Bottom navigation"
            className={cn(bottomNavigationVariants({ variant }), className)}
            {...rest}
        >
            {visibleItems.map((item) => {
                const isFab = variant === "fab" && item?.label === fabLabel;
                return (
                    <a
                        key={item.label}
                        href={item.href ?? "#"}
                        aria-label={item.label}
                        aria-current={item.active ? "page" : undefined}
                        className={cn(
                            "relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-md px-2 py-1.5 text-[10px] no-underline",
                            item.active ? "text-(--diamond-accent,#2b7fff)" : "text-(--diamond-muted,#6b6862)",
                            variant === "active-pill" && "flex-row gap-1 rounded-full px-3",
                            variant === "active-pill" &&
                                item.active &&
                                "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_12%,var(--diamond-surface,#fff))] font-semibold",
                            variant === "active-chip" &&
                                item.active &&
                                "flex-row gap-1 bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#fff)",
                            variant === "top-indicator" && "rounded-none py-2",
                            isFab &&
                                "mx-1 -mt-7 size-11 flex-none rounded-full bg-(--diamond-accent,#2b7fff) text-lg text-white shadow-[0_8px_16px_-8px_rgba(0,0,0,0.3)]",
                        )}
                    >
                        {variant === "top-indicator" && item.active && (
                            <span className="absolute top-0 left-1/2 h-1 w-7 -translate-x-1/2 rounded-b bg-(--diamond-accent,#2b7fff)" />
                        )}
                        <span className="flex size-5 items-center justify-center text-[14px]" aria-hidden="true">
                            {item.icon ?? item.label.slice(0, 1)}
                        </span>
                        {variant !== "icons" && !isFab && <span>{item.label}</span>}
                    </a>
                );
            })}
        </nav>
    );
});

BottomNavigation.displayName = "Diamond.BottomNavigation";

export { bottomNavigationVariants };
