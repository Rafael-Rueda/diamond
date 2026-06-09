"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type MegaMenuVariant = "saas" | "commerce" | "docs" | "solutions" | "editorial" | "icons";

export interface MegaMenuColumn {
    title: string;
    items: Array<{ label: string; description?: string; href?: string }>;
}

const megaMenuVariants = cva("w-full max-w-[520px] text-sm", {
    variants: {
        variant: {
            saas: "",
            commerce: "",
            docs: "",
            solutions: "",
            editorial: "font-serif",
            icons: "",
        },
    },
    defaultVariants: { variant: "saas" },
});

export interface MegaMenuProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof megaMenuVariants> {
    columns?: MegaMenuColumn[];
}

const defaultColumns: MegaMenuColumn[] = [
    {
        title: "Products",
        items: [
            { label: "Analytics", description: "Dashboards" },
            { label: "Automation", description: "Workflows" },
        ],
    },
    { title: "Resources", items: [{ label: "Docs" }, { label: "API" }, { label: "Guides" }] },
    { title: "Company", items: [{ label: "About" }, { label: "Pricing" }, { label: "Contact" }] },
];

export const MegaMenu = React.forwardRef<HTMLElement, MegaMenuProps>(function MegaMenu(
    { className, variant = "saas", columns = defaultColumns, ...rest },
    ref,
) {
    const visibleColumns =
        variant === "icons"
            ? [
                  {
                      title: "Explore",
                      items: ["Fast", "Charts", "Secure", "Design", "Navigate", "Chat"].map((label) => ({ label })),
                  },
              ]
            : columns;

    return (
        <nav ref={ref} aria-label="Mega menu" className={cn(megaMenuVariants({ variant }), className)} {...rest}>
            <div
                className={cn(
                    "flex gap-4 rounded-t-lg border border-(--diamond-border,#d9d5cc) border-b-0 bg-(--diamond-surface,#fff) px-4 py-2 text-[12px]",
                    variant === "editorial" && "italic",
                )}
            >
                <a href="/components" className="font-semibold text-(--diamond-ink,#1a1917) no-underline">
                    Menu
                </a>
                <a href="/components" className="text-(--diamond-muted,#6b6862) no-underline">
                    New
                </a>
            </div>
            <div
                className={cn(
                    "grid grid-cols-3 gap-4 rounded-b-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-4",
                    variant === "commerce" && "grid-cols-[1.2fr_1fr_1fr]",
                    variant === "icons" && "grid-cols-6 gap-2",
                )}
            >
                {visibleColumns.flatMap((column) =>
                    column.items.map((item) => (
                        <div
                            key={`${column.title}-${item.label}`}
                            className={cn("min-w-0", variant !== "icons" && "space-y-1")}
                        >
                            {variant !== "icons" && (
                                <div className="font-mono text-(--diamond-muted,#6b6862) text-[10px] uppercase tracking-[0.14em]">
                                    {column.title}
                                </div>
                            )}
                            <a
                                href={item.href ?? "#"}
                                className={cn(
                                    "block text-(--diamond-ink,#1a1917) text-[12px] no-underline hover:text-(--diamond-accent,#2b7fff)",
                                    variant === "icons" &&
                                        "rounded-md bg-(--diamond-surface-alt,#ebe8e1) p-2 text-center",
                                )}
                            >
                                {item.label}
                                {item.description && (
                                    <span className="block text-(--diamond-muted,#6b6862) text-[10px]">
                                        {item.description}
                                    </span>
                                )}
                            </a>
                        </div>
                    )),
                )}
            </div>
        </nav>
    );
});

MegaMenu.displayName = "Diamond.MegaMenu";

export { megaMenuVariants };
