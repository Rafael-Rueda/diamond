"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type MenuVariant = "shortcut" | "grouped" | "accent" | "toggles" | "terminal" | "user";

export interface MenuItem {
    label: string;
    icon?: React.ReactNode;
    shortcut?: string;
    danger?: boolean;
    group?: string;
    checked?: boolean;
}

const menuVariants = cva(
    "w-[200px] rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-1 text-(--diamond-ink,#1a1917) text-sm shadow-[0_12px_28px_-16px_rgba(0,0,0,0.22)]",
    {
        variants: {
            variant: {
                shortcut: "",
                grouped: "",
                accent: "border-l-(--diamond-accent,#2b7fff) border-l-4",
                toggles: "",
                terminal: "rounded-md border-[#2d2c28] bg-[#0a0a08] font-mono text-[#d4d0c8]",
                user: "",
            },
        },
        defaultVariants: { variant: "shortcut" },
    },
);

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof menuVariants> {
    items?: MenuItem[];
    header?: React.ReactNode;
}

const defaultItems: MenuItem[] = [
    { label: "Open", icon: "O", shortcut: "Enter" },
    { label: "Rename", icon: "R", shortcut: "F2" },
    { label: "Duplicate", icon: "D", shortcut: "Ctrl D" },
    { label: "Delete", icon: "X", danger: true },
];

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(function Menu(
    { className, variant = "shortcut", items = defaultItems, header, ...rest },
    ref,
) {
    return (
        <div ref={ref} className={cn(menuVariants({ variant }), className)} {...rest}>
            {header && <div className="border-(--diamond-border,#d9d5cc) border-b px-2 py-2 text-[12px]">{header}</div>}
            {items.map((item) => (
                <React.Fragment key={item.label}>
                    {item.group && (
                        <div className="px-2 pt-2 pb-1 font-mono text-(--diamond-muted,#6b6862) text-[10px] uppercase tracking-[0.12em]">
                            {item.group}
                        </div>
                    )}
                    <button
                        type="button"
                        aria-pressed={variant === "toggles" ? Boolean(item.checked) : undefined}
                        className={cn(
                            "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12px] hover:bg-(--diamond-surface-alt,#ebe8e1)",
                            item.danger && "text-red-600",
                            variant === "terminal" && "font-mono text-[#d4d0c8] hover:bg-[#1d1b18]",
                        )}
                    >
                        <span className="w-4 text-(--diamond-muted,#6b6862) text-[11px]" aria-hidden="true">
                            {variant === "toggles" ? (item.checked ? "on" : "off") : (item.icon ?? "")}
                        </span>
                        <span>{item.label}</span>
                        {item.shortcut && (
                            <span className="ml-auto font-mono text-(--diamond-muted,#6b6862) text-[10px]">
                                {item.shortcut}
                            </span>
                        )}
                    </button>
                </React.Fragment>
            ))}
        </div>
    );
});

Menu.displayName = "Diamond.Menu";

export { menuVariants };
