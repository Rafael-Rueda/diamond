"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type BreadcrumbsVariant = "slash" | "chevron" | "slab" | "filesystem" | "ellipsis" | "editorial";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

const breadcrumbsVariants = cva("flex items-center gap-1.5 text-(--diamond-muted,#6b6862) text-[12px]", {
    variants: {
        variant: {
            slash: "",
            chevron: "",
            slab: "gap-0",
            filesystem: "font-mono text-[11px]",
            ellipsis: "",
            editorial: "flex-col items-start gap-1",
        },
    },
    defaultVariants: { variant: "slash" },
});

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof breadcrumbsVariants> {
    items?: BreadcrumbItem[];
}

const defaultItems: BreadcrumbItem[] = [
    { label: "Home", href: "#" },
    { label: "Projects", href: "#" },
    { label: "Diamond", href: "#" },
    { label: "Settings" },
];

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(function Breadcrumbs(
    { className, variant = "slash", items = defaultItems, ...rest },
    ref,
) {
    if (variant === "editorial") {
        const parents = items.slice(0, -1);
        const current = items.at(-1)?.label ?? "";
        return (
            <nav
                ref={ref}
                aria-label="Breadcrumb"
                className={cn(breadcrumbsVariants({ variant }), className)}
                {...rest}
            >
                <ol className="m-0 flex list-none flex-wrap items-center gap-1 p-0 font-mono text-[10px] uppercase tracking-[0.14em]">
                    {parents.map((item, index) => (
                        <li key={item.label} className="flex items-center gap-1">
                            <a
                                href={item.href ?? "#"}
                                className="text-(--diamond-muted,#6b6862) no-underline transition-colors hover:text-(--diamond-ink,#1a1917)"
                            >
                                {item.label}
                            </a>
                            {index < parents.length - 1 ? (
                                <span aria-hidden="true" className="text-(--diamond-muted,#6b6862)">
                                    &gt;
                                </span>
                            ) : null}
                        </li>
                    ))}
                </ol>
                <div aria-current="page" className="font-medium font-serif text-(--diamond-ink,#1a1917) text-xl">
                    {current}
                </div>
            </nav>
        );
    }

    const visibleItems =
        variant === "ellipsis" && items.length > 3
            ? [items[0], { label: "...", href: "#" }, ...items.slice(-2)]
            : items;
    const separator = variant === "chevron" ? ">" : "/";

    return (
        <nav ref={ref} aria-label="Breadcrumb" className={cn(breadcrumbsVariants({ variant }), className)} {...rest}>
            <ol className="flex flex-wrap items-center gap-inherit">
                {visibleItems.map((item, index) => {
                    const current = index === visibleItems.length - 1;
                    return (
                        <li key={item.label} className="flex items-center gap-inherit">
                            {index > 0 && variant !== "slab" && (
                                <span className="text-(--diamond-muted,#6b6862)">{separator}</span>
                            )}
                            {variant === "slab" ? (
                                current ? (
                                    <span
                                        aria-current="page"
                                        className={cn(
                                            "px-3 py-1 text-[11px] [clip-path:polygon(0_0,calc(100%-8px)_0,100%_50%,calc(100%-8px)_100%,0_100%,8px_50%)]",
                                            "bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#fff)",
                                            index > 0 && "-ml-1",
                                        )}
                                    >
                                        {item.label}
                                    </span>
                                ) : (
                                    <a
                                        href={item.href ?? "#"}
                                        className={cn(
                                            "px-3 py-1 text-[11px] no-underline transition-colors [clip-path:polygon(0_0,calc(100%-8px)_0,100%_50%,calc(100%-8px)_100%,0_100%,8px_50%)]",
                                            "bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-muted,#6b6862) hover:bg-(--diamond-border,#d9d5cc) hover:text-(--diamond-ink,#1a1917)",
                                            index > 0 && "-ml-1",
                                        )}
                                    >
                                        {item.label}
                                    </a>
                                )
                            ) : current ? (
                                <span aria-current="page" className="font-semibold text-(--diamond-ink,#1a1917)">
                                    {item.label}
                                </span>
                            ) : (
                                <a
                                    href={item.href ?? "#"}
                                    className="text-(--diamond-muted,#6b6862) no-underline hover:text-(--diamond-ink,#1a1917)"
                                >
                                    {variant === "filesystem" && index === 0 ? "~" : item.label}
                                </a>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
});

Breadcrumbs.displayName = "Diamond.Breadcrumbs";

export { breadcrumbsVariants };
