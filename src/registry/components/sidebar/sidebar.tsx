"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type SidebarVariant = "grouped" | "tinted" | "rail" | "workspace" | "editorial" | "counts";

export interface SidebarItem {
    label: string;
    href?: string;
    active?: boolean;
    count?: string | number;
    group?: string;
}

const sidebarVariants = cva(
    "flex w-full max-w-[220px] flex-col gap-1 border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-2 text-(--diamond-ink,#1a1917) text-sm",
    {
        variants: {
            variant: {
                grouped: "rounded-lg",
                tinted: "rounded-lg border-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_22%,var(--diamond-border,#d9d5cc))] bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_6%,var(--diamond-surface,#fff))]",
                rail: "max-w-[64px] items-center rounded-lg p-2",
                workspace: "rounded-lg",
                editorial: "rounded-none border-r-(--diamond-accent,#2b7fff) border-r-4",
                counts: "gap-0 rounded-lg p-1",
            },
        },
        defaultVariants: { variant: "grouped" },
    },
);

export interface SidebarProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sidebarVariants> {
    brand?: React.ReactNode;
    items?: SidebarItem[];
}

const defaultItems: SidebarItem[] = [
    { label: "Dashboard", href: "#", active: true },
    { label: "Projects", href: "#" },
    { label: "Team", href: "#" },
    { label: "Settings", href: "#", group: "Account" },
    { label: "Billing", href: "#" },
];

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(function Sidebar(
    { className, variant = "grouped", brand = "Diamond", items = defaultItems, children, ...rest },
    ref,
) {
    if (children) {
        return (
            <nav ref={ref} className={cn(sidebarVariants({ variant }), className)} {...rest}>
                {children}
            </nav>
        );
    }

    if (variant === "rail") {
        const railItems = ["D", "H", "M", "S", "?"];
        return (
            <nav ref={ref} aria-label="Sidebar" className={cn(sidebarVariants({ variant }), className)} {...rest}>
                {railItems.map((item, index) => (
                    <a
                        key={item}
                        href="/"
                        aria-current={index === 1 ? "page" : undefined}
                        className={cn(
                            "flex size-9 items-center justify-center rounded-md text-[12px]",
                            index === 1
                                ? "bg-(--diamond-surface-alt,#ebe8e1) font-semibold text-(--diamond-ink,#1a1917)"
                                : "text-(--diamond-muted,#6b6862)",
                        )}
                    >
                        {item}
                    </a>
                ))}
            </nav>
        );
    }

    return (
        <nav ref={ref} aria-label="Sidebar" className={cn(sidebarVariants({ variant }), className)} {...rest}>
            {variant !== "counts" && (
                <div
                    className={cn(
                        "mb-1 border-(--diamond-border,#d9d5cc) border-b px-2 pt-1 pb-3 font-semibold font-serif",
                        variant === "workspace" && "font-mono text-[11px] uppercase tracking-[0.12em]",
                        variant === "editorial" && "font-serif italic",
                    )}
                >
                    {brand}
                </div>
            )}
            {items.map((item) => (
                <React.Fragment key={item.label}>
                    {item.group && (
                        <div className="px-2 pt-2 pb-1 font-mono text-(--diamond-muted,#6b6862) text-[10px] uppercase tracking-[0.12em]">
                            {item.group}
                        </div>
                    )}
                    <a
                        href={item.href ?? "#"}
                        aria-current={item.active ? "page" : undefined}
                        className={cn(
                            "flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] no-underline",
                            item.active
                                ? "bg-(--diamond-surface-alt,#ebe8e1) font-semibold text-(--diamond-ink,#1a1917)"
                                : "text-(--diamond-muted,#6b6862)",
                            item.active &&
                                variant === "tinted" &&
                                "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_14%,var(--diamond-surface,#fff))] text-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_72%,var(--diamond-ink,#1a1917))]",
                            variant === "editorial" &&
                                "rounded-none border-l-2 border-l-transparent aria-[current=page]:border-l-(--diamond-accent,#2b7fff)",
                        )}
                    >
                        {variant === "grouped" && (
                            <span
                                className={cn(
                                    "size-1.5 rounded-full",
                                    item.active ? "bg-(--diamond-accent,#2b7fff)" : "bg-(--diamond-border,#d9d5cc)",
                                )}
                            />
                        )}
                        <span>{item.label}</span>
                        {item.count !== undefined && (
                            <span className="ml-auto rounded-full bg-(--diamond-accent,#2b7fff) px-1.5 py-0.5 font-mono text-[10px] text-white">
                                {item.count}
                            </span>
                        )}
                    </a>
                </React.Fragment>
            ))}
        </nav>
    );
});

Sidebar.displayName = "Diamond.Sidebar";

export { sidebarVariants };
