"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type DropdownMenuVariant = "sort" | "retro" | "searchable" | "pill" | "bulk" | "terminal";

export interface DropdownMenuItem {
    label: string;
    value?: string;
    active?: boolean;
}

const dropdownMenuVariants = cva("relative inline-block text-sm", {
    variants: {
        variant: {
            sort: "",
            retro: "",
            searchable: "",
            pill: "",
            bulk: "",
            terminal: "font-mono",
        },
    },
    defaultVariants: { variant: "sort" },
});

export interface DropdownMenuProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof dropdownMenuVariants> {
    items?: DropdownMenuItem[];
    label?: string;
    defaultOpen?: boolean;
}

const defaultItems: DropdownMenuItem[] = [{ label: "Newest", active: true }, { label: "Popular" }, { label: "A-Z" }];

export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(function DropdownMenu(
    { className, variant = "sort", items = defaultItems, label = "Sort", defaultOpen = false, ...rest },
    ref,
) {
    const id = React.useId();
    const [open, setOpen] = React.useState(defaultOpen);
    const [query, setQuery] = React.useState("");
    const filtered =
        variant === "searchable"
            ? items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
            : items;

    return (
        <div ref={ref} className={cn(dropdownMenuVariants({ variant }), className)} {...rest}>
            <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls={id}
                onClick={() => setOpen((value) => !value)}
                className={cn(
                    "inline-flex items-center gap-2 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 py-1.5 text-(--diamond-ink,#1a1917) text-[12px]",
                    variant === "retro" &&
                        "rounded-none border-(--diamond-ink,#1a1917) border-2 shadow-[3px_3px_0_var(--diamond-ink,#1a1917)]",
                    variant === "pill" && "rounded-full",
                    variant === "terminal" && "border-[#2d2c28] bg-[#0a0a08] font-mono text-[#d4d0c8]",
                )}
            >
                {label}
                <span aria-hidden="true">v</span>
            </button>
            {open && (
                <div
                    id={id}
                    role="menu"
                    className={cn(
                        "absolute top-[calc(100%+6px)] left-0 z-10 w-[190px] rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-1 shadow-[0_14px_28px_-12px_rgba(0,0,0,0.25)]",
                        variant === "terminal" && "border-[#2d2c28] bg-[#0a0a08]",
                    )}
                >
                    {variant === "searchable" && (
                        <input
                            className="mb-1 h-8 w-full rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2 text-[12px]"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search"
                        />
                    )}
                    {filtered.map((item) => (
                        <button
                            key={item.label}
                            type="button"
                            role="menuitem"
                            className={cn(
                                "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[12px] hover:bg-(--diamond-surface-alt,#ebe8e1)",
                                item.active && "font-semibold text-(--diamond-accent,#2b7fff)",
                                variant === "terminal" && "font-mono text-[#d4d0c8] hover:bg-[#1d1b18]",
                            )}
                            onClick={() => setOpen(false)}
                        >
                            {item.label}
                            {item.active && <span aria-hidden="true">OK</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
});

DropdownMenu.displayName = "Diamond.DropdownMenu";

export { dropdownMenuVariants };
