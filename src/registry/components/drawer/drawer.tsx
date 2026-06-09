"use client";

import { X } from "@phosphor-icons/react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Drawer — panel sliding from any edge. Built on
 * @radix-ui/react-dialog. Six visual treatments cover nav menu, sidebar,
 * notifications, edit panel, cart and file tree. The `side` prop is the
 * orientation; the `variant` chooses the visual treatment. */

export type DrawerSide = "left" | "right" | "top" | "bottom";

export type DrawerVariant =
    | "right-nav"
    | "left-sidebar"
    | "top-notifications"
    | "right-edit"
    | "right-cart-dark"
    | "left-file-tree";

const DEFAULT_SIDE_BY_VARIANT: Record<DrawerVariant, DrawerSide> = {
    "right-nav": "right",
    "left-sidebar": "left",
    "top-notifications": "top",
    "right-edit": "right",
    "right-cart-dark": "right",
    "left-file-tree": "left",
};

const contentVariants = cva(
    [
        "fixed z-50 flex flex-col gap-3 border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-4",
        "text-(--diamond-ink,#1a1917) shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "duration-200 outline-none",
    ].join(" "),
    {
        variants: {
            side: {
                left: "inset-y-0 left-0 h-full w-[300px] border-r data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
                right: "inset-y-0 right-0 h-full w-[300px] border-l data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
                top: "inset-x-0 top-0 max-h-[80vh] w-full border-b data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
                bottom: "inset-x-0 bottom-0 max-h-[80vh] w-full border-t data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
            },
            variant: {
                "right-nav": "",
                "left-sidebar": "bg-(--diamond-surface-alt,#ebe8e1)",
                "top-notifications": "",
                "right-edit": "",
                "right-cart-dark": "border-l-[#2d2c28] bg-[#0f0f0e] text-[#f5f3ef]",
                "left-file-tree": "bg-[#0a0a08] font-mono text-[#d4d0c8]",
            },
        },
        defaultVariants: { side: "right", variant: "right-nav" },
    },
);

const overlayCls =
    "fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

export interface DrawerProps
    extends Omit<React.ComponentPropsWithoutRef<typeof RadixDialog.Content>, "title">,
        VariantProps<typeof contentVariants> {
    trigger?: React.ReactElement;
    title?: React.ReactNode;
    description?: React.ReactNode;
    /** Override the side derived from `variant`. */
    side?: DrawerSide;
    /** Body slot. */
    children?: React.ReactNode;
    /** Footer pinned to the bottom of the drawer (typically a primary CTA). */
    footer?: React.ReactNode;
    /** Hide the close button. */
    hideClose?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
    inline?: boolean;
    accent?: string;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
    {
        className,
        variant = "right-nav",
        side,
        trigger,
        title,
        description,
        children,
        footer,
        hideClose = false,
        open,
        onOpenChange,
        defaultOpen,
        inline = false,
        accent,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "right-nav";
    const finalSide = side ?? DEFAULT_SIDE_BY_VARIANT[v];
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;
    const dark = v === "right-cart-dark" || v === "left-file-tree";

    const contentNode = (
        <>
            <RadixDialog.Overlay className={overlayCls} />
            <RadixDialog.Content
                ref={ref}
                className={cn(contentVariants({ side: finalSide, variant: v }), className)}
                style={inlineStyle}
                {...rest}
            >
                {(title || description || !hideClose) ? (
                    <div className="flex items-start justify-between gap-2 pb-1">
                        <div className="flex flex-1 flex-col">
                            {title ? (
                                <RadixDialog.Title
                                    className={cn(
                                        "font-semibold tracking-tight",
                                        v === "left-file-tree" ? "text-(--diamond-accent,#2b7fff) text-[12px]" : "text-[15px]",
                                    )}
                                >
                                    {v === "left-file-tree" ? <>$ {title}</> : title}
                                </RadixDialog.Title>
                            ) : null}
                            {description ? (
                                <RadixDialog.Description
                                    className={cn(
                                        "text-[12px]",
                                        dark ? "text-[#a8a49c]" : "text-(--diamond-muted,#6b6862)",
                                    )}
                                >
                                    {description}
                                </RadixDialog.Description>
                            ) : null}
                        </div>
                        {!hideClose ? (
                            <RadixDialog.Close asChild>
                                <button
                                    type="button"
                                    aria-label="Close"
                                    className={cn(
                                        "inline-flex size-7 cursor-pointer items-center justify-center rounded-md transition-colors",
                                        dark
                                            ? "text-[#a8a49c] hover:bg-white/10 hover:text-[#f5f3ef]"
                                            : "text-(--diamond-muted,#6b6862) hover:bg-(--diamond-surface-alt,#ebe8e1) hover:text-(--diamond-ink,#1a1917)",
                                    )}
                                >
                                    <X size={14} weight="bold" />
                                </button>
                            </RadixDialog.Close>
                        ) : null}
                    </div>
                ) : null}
                <div className="flex-1 overflow-y-auto">{children}</div>
                {footer ? <div className="pt-2">{footer}</div> : null}
            </RadixDialog.Content>
        </>
    );

    return (
        <RadixDialog.Root open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
            {trigger ? <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger> : null}
            {inline ? contentNode : <RadixDialog.Portal>{contentNode}</RadixDialog.Portal>}
        </RadixDialog.Root>
    );
});

Drawer.displayName = "Diamond.Drawer";

export { contentVariants as drawerContentVariants };
