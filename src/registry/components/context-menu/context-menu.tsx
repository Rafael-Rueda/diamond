"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type ContextMenuVariant = "standard" | "file" | "tinted" | "compact" | "share" | "git";

export interface ContextMenuItem {
    label: string;
    shortcut?: string;
    danger?: boolean;
}

const contextMenuVariants = cva(
    "relative flex min-h-[160px] w-full max-w-[320px] items-start justify-center overflow-hidden rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface-alt,#ebe8e1) p-3 text-sm",
    {
        variants: {
            variant: {
                standard: "",
                file: "",
                tinted: "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_8%,var(--diamond-surface,#fff))]",
                compact: "",
                share: "",
                git: "font-mono",
            },
        },
        defaultVariants: { variant: "standard" },
    },
);

export interface ContextMenuProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof contextMenuVariants> {
    items?: ContextMenuItem[];
    defaultOpen?: boolean;
}

const defaultItems: ContextMenuItem[] = [
    { label: "Copy", shortcut: "Ctrl C" },
    { label: "Paste", shortcut: "Ctrl V" },
    { label: "Rename" },
    { label: "Delete", danger: true },
];

export const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(function ContextMenu(
    { className, variant = "standard", items = defaultItems, defaultOpen = false, children, ...rest },
    ref,
) {
    const [open, setOpen] = React.useState(defaultOpen);
    const [point, setPoint] = React.useState({ x: 88, y: 44 });

    const onContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const rect = event.currentTarget.getBoundingClientRect();
        setPoint({ x: event.clientX - rect.left, y: event.clientY - rect.top });
        setOpen(true);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        setPoint({ x: 88, y: 44 });
        setOpen(true);
    };

    return (
        <div ref={ref} className={cn(contextMenuVariants({ variant }), className)} {...rest}>
            <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                className="absolute inset-0 flex cursor-context-menu items-start justify-center bg-transparent p-0 text-left"
                onContextMenu={onContextMenu}
                onClick={() => setOpen((value) => !value)}
                onKeyDown={onKeyDown}
            >
                <span className="absolute top-2 left-3 font-mono text-(--diamond-muted,#6b6862) text-[10px] uppercase tracking-[0.12em]">
                    Right-click area
                </span>
                <span className="mt-10 rounded-md border border-(--diamond-border,#d9d5cc) border-dashed bg-(--diamond-surface,#fff) px-4 py-3 text-(--diamond-muted,#6b6862) text-[12px]">
                    {children ?? "Open context actions"}
                </span>
            </button>
            {open && (
                <div
                    role="menu"
                    className={cn(
                        "absolute z-10 w-[180px] rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-1 text-[12px] shadow-[0_14px_28px_-12px_rgba(0,0,0,0.25)]",
                        variant === "compact" && "w-[140px]",
                        variant === "git" && "font-mono",
                    )}
                    style={{ left: point.x, top: point.y }}
                >
                    {items.map((item) => (
                        <button
                            key={item.label}
                            type="button"
                            role="menuitem"
                            className={cn(
                                "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left hover:bg-(--diamond-surface-alt,#ebe8e1)",
                                item.danger && "text-red-600",
                            )}
                        >
                            {item.label}
                            {item.shortcut && (
                                <span className="font-mono text-(--diamond-muted,#6b6862) text-[10px]">
                                    {item.shortcut}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
});

ContextMenu.displayName = "Diamond.ContextMenu";

export { contextMenuVariants };
