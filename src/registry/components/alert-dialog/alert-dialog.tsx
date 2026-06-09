"use client";

import { Warning, WarningOctagon } from "@phosphor-icons/react";
import * as RadixAlert from "@radix-ui/react-alert-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · AlertDialog — urgent interruption built on
 * @radix-ui/react-alert-dialog. Forces an explicit user decision (no
 * outside-click dismiss; ESC closes only when explicitly cancelable).
 * Six visual treatments tailored to destructive / warning contexts. */

export type AlertDialogVariant =
    | "destructive"
    | "unsaved"
    | "left-rail"
    | "dark-critical"
    | "mono-error"
    | "floating-icon";

const contentVariants = cva(
    [
        "fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-3 p-5",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "duration-150 outline-none",
    ].join(" "),
    {
        variants: {
            variant: {
                destructive:
                    "max-w-[400px] rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)]",
                unsaved:
                    "max-w-[360px] rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-center text-(--diamond-ink,#1a1917) shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)]",
                "left-rail":
                    "max-w-[420px] rounded-r-lg border border-(--diamond-border,#d9d5cc) border-l-4 border-l-rose-500 bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)]",
                "dark-critical":
                    "max-w-[400px] rounded-lg border border-[#2d2c28] bg-[#0f0f0e] text-[#f5f3ef] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.45)]",
                "mono-error":
                    "max-w-[420px] rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) font-mono text-(--diamond-ink,#1a1917) shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)]",
                "floating-icon":
                    "mt-7 max-w-[360px] rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) pt-10 text-center text-(--diamond-ink,#1a1917) shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)]",
            },
        },
        defaultVariants: { variant: "destructive" },
    },
);

const overlayCls =
    "fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

export const AlertDialogRoot = RadixAlert.Root;
export const AlertDialogTrigger = RadixAlert.Trigger;
export const AlertDialogPortal = RadixAlert.Portal;
export const AlertDialogCancel = RadixAlert.Cancel;
export const AlertDialogAction = RadixAlert.Action;

export interface AlertDialogProps
    extends Omit<React.ComponentPropsWithoutRef<typeof RadixAlert.Content>, "title">,
        VariantProps<typeof contentVariants> {
    trigger?: React.ReactElement;
    title?: React.ReactNode;
    description?: React.ReactNode;
    /** Cancel button label. */
    cancelLabel?: React.ReactNode;
    /** Action (destructive) button label. */
    actionLabel?: React.ReactNode;
    /** Called on Cancel. */
    onCancel?: () => void;
    /** Called on the destructive action. */
    onAction?: () => void;
    /** mono-error variant — the error code shown above title. */
    errorCode?: React.ReactNode;
    /** Icon override — pass `null` to hide. */
    icon?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
    inline?: boolean;
    accent?: string;
}

export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(function AlertDialog(
    {
        className,
        variant = "destructive",
        trigger,
        title,
        description,
        cancelLabel = "Cancel",
        actionLabel = "Continue",
        onCancel,
        onAction,
        errorCode = "ERR_409 · CONFLICT",
        icon,
        open,
        onOpenChange,
        defaultOpen,
        inline = false,
        accent,
        style,
        children,
        ...rest
    },
    ref,
) {
    const v = variant ?? "destructive";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const dark = v === "dark-critical";
    const mono = v === "mono-error";
    const titleColor = dark ? "text-[#f5f3ef]" : "text-(--diamond-ink,#1a1917)";
    const descColor = dark ? "text-[#a8a49c]" : "text-(--diamond-muted,#6b6862)";

    const defaultIcon =
        v === "unsaved" ? (
            <Warning size={18} weight="bold" />
        ) : (
            <WarningOctagon size={18} weight="bold" />
        );

    const iconBubble = icon === null ? null : (
        <span
            aria-hidden="true"
            className={cn(
                "inline-flex shrink-0 items-center justify-center rounded-full",
                v === "unsaved"
                    ? "mx-auto size-12 bg-[color-mix(in_oklab,#f59e0b_18%,var(--diamond-surface,#fff))] text-amber-600"
                    : v === "left-rail"
                      ? "size-8 bg-[color-mix(in_oklab,#e11d48_18%,var(--diamond-surface,#fff))] text-rose-600"
                      : v === "dark-critical"
                        ? "size-10 bg-rose-500/20 text-rose-400"
                        : v === "floating-icon"
                          ? "absolute -top-7 left-1/2 size-14 -translate-x-1/2 bg-rose-500 text-white shadow-[0_8px_24px_-8px_rgba(225,29,72,0.5)]"
                          : "size-10 bg-[color-mix(in_oklab,#e11d48_18%,var(--diamond-surface,#fff))] text-rose-600",
            )}
        >
            {icon ?? defaultIcon}
        </span>
    );

    const actionsRow = (
        <div className="mt-1 flex flex-wrap justify-end gap-2">
            <RadixAlert.Cancel asChild>
                <button
                    type="button"
                    onClick={onCancel}
                    className={cn(
                        "inline-flex h-9 cursor-pointer items-center justify-center rounded-md border px-3 font-medium text-[13px] transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--diamond-accent,#2b7fff)/40",
                        dark
                            ? "border-[#2d2c28] bg-[#1a1a18] text-[#d4d0c8] hover:bg-[#2d2c28]"
                            : "border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) hover:bg-(--diamond-surface-alt,#ebe8e1)",
                    )}
                >
                    {cancelLabel}
                </button>
            </RadixAlert.Cancel>
            <RadixAlert.Action asChild>
                <button
                    type="button"
                    onClick={onAction}
                    className={cn(
                        "inline-flex h-9 cursor-pointer items-center justify-center rounded-md px-3 font-medium text-white text-[13px] transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40",
                        v === "unsaved" ? "bg-amber-500 hover:bg-amber-600" : "bg-rose-500 hover:bg-rose-600",
                    )}
                >
                    {actionLabel}
                </button>
            </RadixAlert.Action>
        </div>
    );

    let body: React.ReactNode;
    if (v === "left-rail") {
        body = (
            <>
                <div className="flex items-start gap-3">
                    {iconBubble}
                    <div className="flex flex-1 flex-col gap-0.5">
                        {title ? (
                            <RadixAlert.Title className={cn("font-semibold text-[15px] tracking-tight", titleColor)}>
                                {title}
                            </RadixAlert.Title>
                        ) : null}
                        {description ? (
                            <RadixAlert.Description className={cn("text-[13px] leading-relaxed", descColor)}>
                                {description}
                            </RadixAlert.Description>
                        ) : null}
                    </div>
                </div>
                {children}
                {actionsRow}
            </>
        );
    } else if (v === "mono-error") {
        body = (
            <>
                <span className="font-mono text-[10px] text-rose-600 uppercase tracking-[0.18em]">
                    {errorCode}
                </span>
                {title ? (
                    <RadixAlert.Title className={cn("font-semibold text-[15px] tracking-tight", titleColor)}>
                        {title}
                    </RadixAlert.Title>
                ) : null}
                {description ? (
                    <RadixAlert.Description className={cn("text-[13px] leading-relaxed", descColor)}>
                        {description}
                    </RadixAlert.Description>
                ) : null}
                {children}
                {actionsRow}
            </>
        );
    } else if (v === "unsaved" || v === "floating-icon") {
        body = (
            <>
                {iconBubble}
                {title ? (
                    <RadixAlert.Title className={cn("mt-2 font-semibold text-[16px] tracking-tight", titleColor)}>
                        {title}
                    </RadixAlert.Title>
                ) : null}
                {description ? (
                    <RadixAlert.Description className={cn("text-[13px] leading-relaxed", descColor)}>
                        {description}
                    </RadixAlert.Description>
                ) : null}
                {children}
                <div className="mt-2 flex justify-center gap-2">
                    <RadixAlert.Cancel asChild>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="inline-flex h-9 flex-1 cursor-pointer items-center justify-center rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 font-medium text-(--diamond-ink,#1a1917) text-[13px] hover:bg-(--diamond-surface-alt,#ebe8e1)"
                        >
                            {cancelLabel}
                        </button>
                    </RadixAlert.Cancel>
                    <RadixAlert.Action asChild>
                        <button
                            type="button"
                            onClick={onAction}
                            className={cn(
                                "inline-flex h-9 flex-1 cursor-pointer items-center justify-center rounded-md px-3 font-medium text-white text-[13px]",
                                v === "unsaved" ? "bg-amber-500 hover:bg-amber-600" : "bg-rose-500 hover:bg-rose-600",
                            )}
                        >
                            {actionLabel}
                        </button>
                    </RadixAlert.Action>
                </div>
            </>
        );
    } else {
        /* destructive + dark-critical */
        body = (
            <>
                {iconBubble}
                {title ? (
                    <RadixAlert.Title className={cn("font-semibold text-[16px] tracking-tight", titleColor)}>
                        {title}
                    </RadixAlert.Title>
                ) : null}
                {description ? (
                    <RadixAlert.Description className={cn("text-[13px] leading-relaxed", mono && "font-mono", descColor)}>
                        {description}
                    </RadixAlert.Description>
                ) : null}
                {children}
                {actionsRow}
            </>
        );
    }

    const contentNode = (
        <>
            <RadixAlert.Overlay className={overlayCls} />
            <RadixAlert.Content
                ref={ref}
                className={cn(contentVariants({ variant: v }), className)}
                style={inlineStyle}
                {...rest}
            >
                {body}
            </RadixAlert.Content>
        </>
    );

    return (
        <RadixAlert.Root open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
            {trigger ? <RadixAlert.Trigger asChild>{trigger}</RadixAlert.Trigger> : null}
            {inline ? contentNode : <RadixAlert.Portal>{contentNode}</RadixAlert.Portal>}
        </RadixAlert.Root>
    );
});

AlertDialog.displayName = "Diamond.AlertDialog";

export { contentVariants as alertDialogContentVariants };
