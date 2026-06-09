"use client";

import { Warning } from "@phosphor-icons/react";
import * as RadixPopover from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Popconfirm — inline confirm tooltip anchored to its trigger.
 * Six visual treatments: quick yes/no, accent, titled detailed, dark mini,
 * emoji delete, terminal. Built on @radix-ui/react-popover for positioning
 * + outside-click dismiss. */

export type PopconfirmVariant = "quick" | "accent" | "titled" | "dark-mini" | "emoji" | "terminal";

const contentVariants = cva(
    [
        "z-50 rounded-md border shadow-[0_8px_24px_rgba(0,0,0,0.10)] outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    ].join(" "),
    {
        variants: {
            variant: {
                quick:
                    "w-[220px] border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-3 text-(--diamond-ink,#1a1917)",
                accent:
                    "w-[220px] border-(--diamond-accent,#2b7fff) bg-(--diamond-surface,#fff) p-3 text-(--diamond-ink,#1a1917)",
                titled:
                    "w-[260px] border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-3.5 text-(--diamond-ink,#1a1917)",
                "dark-mini":
                    "w-[200px] border-[#2d2c28] bg-[#1a1917] p-3 text-[#f5f3ef]",
                emoji:
                    "w-[220px] border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-3 text-center text-(--diamond-ink,#1a1917)",
                terminal:
                    "w-[260px] rounded-sm border-[#2d2c28] bg-[#0a0a08] p-3 font-mono text-[#d4d0c8]",
            },
        },
        defaultVariants: { variant: "quick" },
    },
);

export interface PopconfirmProps
    extends Omit<React.ComponentPropsWithoutRef<typeof RadixPopover.Content>, "title">,
        VariantProps<typeof contentVariants> {
    /** Trigger node — wrapped via asChild. */
    children: React.ReactElement;
    title?: React.ReactNode;
    description?: React.ReactNode;
    cancelLabel?: React.ReactNode;
    actionLabel?: React.ReactNode;
    onCancel?: () => void;
    onConfirm?: () => void;
    /** Emoji shown for `emoji` variant. */
    emoji?: React.ReactNode;
    /** Quick / accent variants — show a warning icon next to the title. */
    showWarning?: boolean;
    /** Dark-mini variant — danger action color. Default true (rose). */
    danger?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
    accent?: string;
}

export const Popconfirm = React.forwardRef<HTMLDivElement, PopconfirmProps>(function Popconfirm(
    {
        className,
        variant = "quick",
        children,
        title,
        description,
        cancelLabel = "No",
        actionLabel = "Yes",
        onCancel,
        onConfirm,
        emoji = "🗑",
        showWarning = false,
        danger = true,
        open,
        onOpenChange,
        defaultOpen,
        side = "top",
        sideOffset = 6,
        align = "center",
        accent,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "quick";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;
    const dark = v === "dark-mini" || v === "terminal";

    const handleCancel = () => {
        onCancel?.();
        onOpenChange?.(false);
    };
    const handleConfirm = () => {
        onConfirm?.();
        onOpenChange?.(false);
    };

    const actionBtnCls =
        v === "terminal"
            ? "inline-flex h-7 cursor-pointer items-center justify-center rounded-sm bg-(--diamond-accent,#2b7fff) px-2 font-mono text-(--diamond-on-accent,#fff) text-[11px]"
            : danger
              ? "inline-flex h-7 cursor-pointer items-center justify-center rounded-md bg-rose-500 px-3 font-medium text-white text-[12px] hover:bg-rose-600"
              : "inline-flex h-7 cursor-pointer items-center justify-center rounded-md bg-(--diamond-accent,#2b7fff) px-3 font-medium text-(--diamond-on-accent,#fff) text-[12px] hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_85%,#000)]";
    const cancelBtnCls =
        v === "terminal"
            ? "inline-flex h-7 cursor-pointer items-center justify-center rounded-sm border border-[#2d2c28] bg-transparent px-2 font-mono text-[#d4d0c8] text-[11px] hover:bg-[#1a1a18]"
            : dark
              ? "inline-flex h-7 cursor-pointer items-center justify-center rounded-md border border-[#2d2c28] bg-transparent px-3 font-medium text-[#d4d0c8] text-[12px] hover:bg-white/5"
              : "inline-flex h-7 cursor-pointer items-center justify-center rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 font-medium text-(--diamond-ink,#1a1917) text-[12px] hover:bg-(--diamond-surface-alt,#ebe8e1)";

    return (
        <RadixPopover.Root open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
            <RadixPopover.Trigger asChild>{children}</RadixPopover.Trigger>
            <RadixPopover.Portal>
                <RadixPopover.Content
                    ref={ref}
                    side={side}
                    sideOffset={sideOffset}
                    align={align}
                    className={cn(contentVariants({ variant: v }), className)}
                    style={inlineStyle}
                    {...rest}
                >
                    {v === "terminal" ? (
                        <>
                            <p className="text-(--diamond-accent,#2b7fff) text-[11px]">$ {title ?? "confirm"}</p>
                            {description ? (
                                <p className="mt-1 text-[#6b6862] text-[11px]">{description}</p>
                            ) : null}
                            <div className="mt-2 flex justify-end gap-1.5">
                                <button type="button" onClick={handleCancel} className={cancelBtnCls}>
                                    [n] {cancelLabel}
                                </button>
                                <button type="button" onClick={handleConfirm} className={actionBtnCls}>
                                    [y] {actionLabel}
                                </button>
                            </div>
                        </>
                    ) : v === "emoji" ? (
                        <>
                            <div className="mb-1 text-2xl">{emoji}</div>
                            {title ? <p className="font-semibold text-[13px]">{title}</p> : null}
                            {description ? (
                                <p className="text-[11px] text-(--diamond-muted,#6b6862)">{description}</p>
                            ) : null}
                            <div className="mt-2 flex gap-1.5">
                                <button type="button" onClick={handleCancel} className={cn(cancelBtnCls, "flex-1")}>
                                    {cancelLabel}
                                </button>
                                <button type="button" onClick={handleConfirm} className={cn(actionBtnCls, "flex-1")}>
                                    {actionLabel}
                                </button>
                            </div>
                        </>
                    ) : v === "titled" ? (
                        <>
                            <div className="flex items-start gap-2">
                                {showWarning ? (
                                    <Warning size={16} weight="fill" className="mt-0.5 shrink-0 text-amber-500" />
                                ) : null}
                                <div className="flex flex-1 flex-col gap-0.5">
                                    {title ? <p className="font-semibold text-[13px]">{title}</p> : null}
                                    {description ? (
                                        <p className="text-[11px] text-(--diamond-muted,#6b6862)">{description}</p>
                                    ) : null}
                                </div>
                            </div>
                            <div className="mt-2.5 flex justify-end gap-1.5">
                                <button type="button" onClick={handleCancel} className={cancelBtnCls}>
                                    {cancelLabel}
                                </button>
                                <button type="button" onClick={handleConfirm} className={actionBtnCls}>
                                    {actionLabel}
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-start gap-1.5">
                                {(v === "quick" || v === "accent") && showWarning ? (
                                    <Warning
                                        size={14}
                                        weight="fill"
                                        className={cn(
                                            "mt-0.5 shrink-0",
                                            v === "accent" ? "text-(--diamond-accent,#2b7fff)" : "text-amber-500",
                                        )}
                                    />
                                ) : null}
                                <p className={cn("font-medium text-[12px] leading-snug", dark && "text-[#f5f3ef]")}>
                                    {title ?? "Are you sure?"}
                                </p>
                            </div>
                            <div className="mt-2 flex justify-end gap-1.5">
                                <button type="button" onClick={handleCancel} className={cancelBtnCls}>
                                    {cancelLabel}
                                </button>
                                <button type="button" onClick={handleConfirm} className={actionBtnCls}>
                                    {actionLabel}
                                </button>
                            </div>
                        </>
                    )}
                    <RadixPopover.Arrow
                        width={10}
                        height={5}
                        className={cn(
                            v === "dark-mini" || v === "terminal"
                                ? "fill-[#1a1917]"
                                : "fill-(--diamond-surface,#fff)",
                        )}
                    />
                </RadixPopover.Content>
            </RadixPopover.Portal>
        </RadixPopover.Root>
    );
});

Popconfirm.displayName = "Diamond.Popconfirm";

export { contentVariants as popconfirmContentVariants };
