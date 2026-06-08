"use client";

import * as RadixPopover from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Popover — click-triggered floating panel built on
 * @radix-ui/react-popover. Handles outside-click dismiss, ESC, focus
 * trapping and ARIA wiring out of the box. */

export type PopoverVariant = "panel" | "filter" | "share" | "picker" | "menu" | "mentions";

const contentVariants = cva(
    [
        "z-50 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff)",
        "text-(--diamond-ink,#1a1917) shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
        "outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1",
        "data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1",
    ].join(" "),
    {
        variants: {
            variant: {
                panel: "w-[220px] p-3 text-[12px]",
                filter: "w-[200px] p-3 text-[12px]",
                share: "w-[260px] p-3 text-[12px]",
                picker: "w-[160px] p-2",
                menu: "w-[180px] p-1",
                mentions: "w-[240px] p-3 text-[12px]",
            },
        },
        defaultVariants: { variant: "panel" },
    },
);

/* ----- Re-exports for advanced composition --------------------------------- */

export const PopoverRoot = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverPortal = RadixPopover.Portal;
export const PopoverArrow = RadixPopover.Arrow;
export const PopoverClose = RadixPopover.Close;
export const PopoverAnchor = RadixPopover.Anchor;

/* ----- PopoverContent — variants ------------------------------------------- */

export interface PopoverContentProps
    extends Omit<React.ComponentPropsWithoutRef<typeof RadixPopover.Content>, "asChild">,
        VariantProps<typeof contentVariants> {
    /** Override accent color (CSS color). */
    accent?: string;
    /** Hide the directional arrow. */
    hideArrow?: boolean;
}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
    function PopoverContent(
        { className, variant = "panel", accent, hideArrow = true, side = "bottom", sideOffset = 8, align = "center", style, children, ...rest },
        ref,
    ) {
        const inlineStyle: React.CSSProperties = { ...style };
        if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;
        return (
            <RadixPopover.Portal>
                <RadixPopover.Content
                    ref={ref}
                    side={side}
                    sideOffset={sideOffset}
                    align={align}
                    className={cn(contentVariants({ variant }), className)}
                    style={inlineStyle}
                    {...rest}
                >
                    {children}
                    {!hideArrow ? (
                        <RadixPopover.Arrow
                            width={10}
                            height={5}
                            className="fill-(--diamond-surface,#fff) stroke-(--diamond-border,#d9d5cc)"
                        />
                    ) : null}
                </RadixPopover.Content>
            </RadixPopover.Portal>
        );
    },
);
PopoverContent.displayName = "Diamond.PopoverContent";

/* ----- Popover wrapper — single-component API ------------------------------ */

export interface PopoverProps
    extends Omit<PopoverContentProps, "children"> {
    /** Trigger node (any clickable element). */
    trigger: React.ReactElement;
    /** Body content. */
    children: React.ReactNode;
    /** Optional heading rendered above the body. */
    title?: React.ReactNode;
    /** Controlled open state. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
    /** Disable modal-style focus trap. Default false (modal). */
    modal?: boolean;
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(function Popover(
    { trigger, children, title, open, onOpenChange, defaultOpen, modal = false, variant = "panel", ...rest },
    ref,
) {
    return (
        <RadixPopover.Root
            open={open}
            onOpenChange={onOpenChange}
            defaultOpen={defaultOpen}
            modal={modal}
        >
            <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
            <PopoverContent ref={ref} variant={variant} {...rest}>
                {title ? (
                    <h5 className="mb-1.5 font-semibold text-[12px] tracking-tight">{title}</h5>
                ) : null}
                {children}
            </PopoverContent>
        </RadixPopover.Root>
    );
});

Popover.displayName = "Diamond.Popover";

export { contentVariants };
