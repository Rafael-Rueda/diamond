"use client";

import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Tooltip — Radix Tooltip wrapper with six visual styles.
 *
 * Wrap your app once in <TooltipProvider /> (delayDuration controls hover
 * latency), then use the <Tooltip /> component which composes Root, Trigger,
 * Portal, Content and Arrow. */

export type TooltipVariant = "label" | "shortcut" | "rich" | "accent" | "light" | "status";

const contentVariants = cva(
    [
        "z-50 select-none",
        "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=delayed-open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1",
        "data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1",
    ].join(" "),
    {
        variants: {
            variant: {
                label:
                    "rounded-md bg-(--diamond-ink,#1a1917) px-2 py-1 font-medium text-(--diamond-surface,#fff) text-[11px] shadow-lg",
                shortcut:
                    "flex items-center gap-1.5 rounded-md bg-(--diamond-ink,#1a1917) px-2 py-1 font-medium text-(--diamond-surface,#fff) text-[11px] shadow-lg",
                rich:
                    "max-w-[220px] rounded-md bg-(--diamond-ink,#1a1917) px-3 py-2 text-(--diamond-surface,#fff) text-[11px] leading-snug shadow-lg",
                accent:
                    "rounded-md bg-(--diamond-accent,#2b7fff) px-2 py-1 font-medium text-(--diamond-on-accent,#fff) text-[11px] shadow-lg",
                light:
                    "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2 py-1 font-medium text-(--diamond-ink,#1a1917) text-[11px] shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
                status:
                    "flex items-center gap-1.5 rounded-md bg-(--diamond-ink,#1a1917) px-2 py-1 font-medium text-(--diamond-surface,#fff) text-[11px] shadow-lg",
            },
        },
        defaultVariants: { variant: "label" },
    },
);

const arrowFill: Record<TooltipVariant, string> = {
    label: "fill-(--diamond-ink,#1a1917)",
    shortcut: "fill-(--diamond-ink,#1a1917)",
    rich: "fill-(--diamond-ink,#1a1917)",
    accent: "fill-(--diamond-accent,#2b7fff)",
    light: "fill-(--diamond-surface,#fff)",
    status: "fill-(--diamond-ink,#1a1917)",
};

/* ----- Provider re-export (apps must wrap once) ---------------------------- */

export type TooltipProviderProps = React.ComponentPropsWithoutRef<typeof RadixTooltip.Provider>;

export const TooltipProvider = React.forwardRef<HTMLDivElement, TooltipProviderProps>(
    function TooltipProvider({ delayDuration = 200, skipDelayDuration = 300, ...rest }, _ref) {
        return (
            <RadixTooltip.Provider
                delayDuration={delayDuration}
                skipDelayDuration={skipDelayDuration}
                {...rest}
            />
        );
    },
);
TooltipProvider.displayName = "Diamond.TooltipProvider";

/* ----- Tooltip ------------------------------------------------------------- */

export interface TooltipProps
    extends Omit<React.ComponentPropsWithoutRef<typeof RadixTooltip.Content>, "content">,
        VariantProps<typeof contentVariants> {
    /** Trigger node. Wraps it via Radix asChild. */
    children: React.ReactElement;
    /** Tooltip body. */
    content: React.ReactNode;
    /** `rich` variant kicker (e.g. "PRO TIP"). */
    kicker?: React.ReactNode;
    /** `status` variant dot color. */
    statusColor?: string;
    /** `shortcut` variant key — appears right of the label (e.g. "⌘C"). */
    shortcut?: React.ReactNode;
    /** Hide the arrow. */
    hideArrow?: boolean;
    /** Override accent color (CSS color). */
    accent?: string;
    /** Controlled open state. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
    /** Hover delay for this instance (ms). */
    delayDuration?: number;
    /** Disables the tooltip without unmounting its content. */
    disabled?: boolean;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
    {
        children,
        content,
        variant = "label",
        kicker,
        statusColor,
        shortcut,
        hideArrow = false,
        accent,
        open,
        onOpenChange,
        defaultOpen,
        delayDuration,
        disabled,
        className,
        side = "top",
        sideOffset = 6,
        align = "center",
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "label";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    if (disabled) return children;

    return (
        <RadixTooltip.Root
            open={open}
            onOpenChange={onOpenChange}
            defaultOpen={defaultOpen}
            delayDuration={delayDuration}
        >
            <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
            <RadixTooltip.Portal>
                <RadixTooltip.Content
                    ref={ref}
                    side={side}
                    sideOffset={sideOffset}
                    align={align}
                    className={cn(contentVariants({ variant: v }), className)}
                    style={inlineStyle}
                    {...rest}
                >
                    {v === "rich" && kicker !== undefined ? (
                        <div className="mb-0.5 font-mono font-bold text-(--diamond-accent,#2b7fff) text-[9px] uppercase tracking-[0.14em]">
                            {kicker}
                        </div>
                    ) : null}
                    {v === "status" ? (
                        <span
                            aria-hidden="true"
                            className="size-1.5 shrink-0 rounded-full"
                            style={{ background: statusColor ?? "var(--diamond-accent,#2b7fff)" }}
                        />
                    ) : null}
                    <span>{content}</span>
                    {v === "shortcut" && shortcut ? (
                        <kbd className="ml-1 rounded bg-white/10 px-1 py-0.5 font-mono text-[9px]">{shortcut}</kbd>
                    ) : null}
                    {!hideArrow ? (
                        <RadixTooltip.Arrow
                            width={9}
                            height={5}
                            className={arrowFill[v]}
                        />
                    ) : null}
                </RadixTooltip.Content>
            </RadixTooltip.Portal>
        </RadixTooltip.Root>
    );
});

Tooltip.displayName = "Diamond.Tooltip";

export { contentVariants };
