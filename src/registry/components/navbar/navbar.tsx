"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type NavbarVariant = "classic" | "tinted" | "search" | "commerce" | "pill" | "terminal";

export interface NavbarItem {
    label: string;
    href?: string;
    active?: boolean;
}

const navbarVariants = cva(
    "flex w-full max-w-[680px] items-center gap-3 border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-4 py-2 text-(--diamond-ink,#1a1917) text-sm",
    {
        variants: {
            variant: {
                classic: "rounded-lg",
                tinted: "rounded-lg border-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_25%,var(--diamond-border,#d9d5cc))] bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_8%,var(--diamond-surface,#fff))]",
                search: "rounded-lg",
                commerce: "flex-col items-stretch gap-0 overflow-hidden rounded-lg p-0",
                pill: "rounded-full border-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_25%,var(--diamond-border,#d9d5cc))] bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_8%,var(--diamond-surface,#fff))] py-1.5 pr-2",
                terminal: "rounded-md border-[#2d2c28] bg-[#0a0a08] font-mono text-[#d4d0c8]",
            },
        },
        defaultVariants: { variant: "classic" },
    },
);

export interface NavbarProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof navbarVariants> {
    brand?: React.ReactNode;
    items?: NavbarItem[];
    action?: React.ReactNode;
    searchLabel?: string;
}

const defaultItems: NavbarItem[] = [
    { label: "Home", href: "#", active: true },
    { label: "Docs", href: "#" },
    { label: "Pricing", href: "#" },
];

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(function Navbar(
    {
        className,
        variant = "classic",
        brand = "Diamond",
        items = defaultItems,
        action = "Sign in",
        searchLabel = "Search docs",
        children,
        ...rest
    },
    ref,
) {
    if (children) {
        return (
            <nav ref={ref} className={cn(navbarVariants({ variant }), className)} {...rest}>
                {children}
            </nav>
        );
    }

    if (variant === "commerce") {
        return (
            <nav ref={ref} className={cn(navbarVariants({ variant }), className)} aria-label="Primary" {...rest}>
                <div className="flex items-center border-(--diamond-border,#d9d5cc) border-b px-4 py-1.5 font-mono text-(--diamond-muted,#6b6862) text-[10px] uppercase tracking-[0.1em]">
                    V. 3.2 <span className="ml-auto">EN / USD</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2">
                    <span className="font-semibold font-serif text-[15px]">{brand}</span>
                    {items.slice(0, 2).map((item) => (
                        <a
                            key={item.label}
                            href={item.href ?? "#"}
                            aria-current={item.active ? "page" : undefined}
                            className={cn(
                                "text-[12px]",
                                item.active
                                    ? "font-semibold text-(--diamond-ink,#1a1917)"
                                    : "text-(--diamond-muted,#6b6862)",
                            )}
                        >
                            {item.label}
                        </a>
                    ))}
                    <span className="ml-auto text-[12px]">{action}</span>
                </div>
            </nav>
        );
    }

    return (
        <nav ref={ref} className={cn(navbarVariants({ variant }), className)} aria-label="Primary" {...rest}>
            <span
                className={cn(
                    "shrink-0 font-semibold font-serif text-[15px]",
                    variant === "terminal" && "font-mono text-(--diamond-accent,#2b7fff)",
                )}
            >
                {brand}
            </span>
            {variant === "search" ? (
                <>
                    <div className="min-w-0 flex-1 rounded-md bg-(--diamond-surface-alt,#ebe8e1) px-3 py-1.5 text-(--diamond-muted,#6b6862) text-[11px]">
                        {searchLabel}
                    </div>
                    <span
                        className="size-6 rounded-full bg-[linear-gradient(135deg,var(--diamond-accent,#2b7fff),#8b5cf6)]"
                        aria-hidden="true"
                    />
                </>
            ) : (
                <>
                    <div className="flex items-center gap-3">
                        {items.map((item) => (
                            <a
                                key={item.label}
                                href={item.href ?? "#"}
                                aria-current={item.active ? "page" : undefined}
                                className={cn(
                                    "text-[12px] no-underline",
                                    item.active
                                        ? "font-semibold text-(--diamond-ink,#1a1917)"
                                        : "text-(--diamond-muted,#6b6862)",
                                    variant === "terminal" &&
                                        (item.active ? "text-(--diamond-accent,#2b7fff)" : "text-[#8f8981]"),
                                )}
                            >
                                {variant === "terminal" ? `[${item.label.toLowerCase()}]` : item.label}
                            </a>
                        ))}
                    </div>
                    <span className="ml-auto" />
                    <button
                        type="button"
                        className={cn(
                            "rounded-full bg-(--diamond-ink,#1a1917) px-3 py-1 font-medium text-(--diamond-surface,#fff) text-[11px]",
                            (variant === "tinted" || variant === "pill") && "bg-(--diamond-accent,#2b7fff)",
                            variant === "terminal" && "bg-transparent px-0 font-mono text-[#8f8981]",
                        )}
                    >
                        {variant === "terminal" ? "ready" : action}
                    </button>
                </>
            )}
        </nav>
    );
});

Navbar.displayName = "Diamond.Navbar";

export { navbarVariants };
