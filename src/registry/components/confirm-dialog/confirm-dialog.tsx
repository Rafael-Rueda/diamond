"use client";

import { Question, Rocket } from "@phosphor-icons/react";
import * as RadixAlert from "@radix-ui/react-alert-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · ConfirmDialog — "are you sure?" prompt built on
 * @radix-ui/react-alert-dialog. Less urgent than AlertDialog; primary action
 * is constructive (Publish, Pay, Deploy). Six visual treatments. */

export type ConfirmDialogVariant =
    | "archive"
    | "icon-subtitle"
    | "purchase"
    | "emoji-deploy"
    | "persist-checkbox"
    | "terminal";

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
                archive:
                    "max-w-[360px] rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)]",
                "icon-subtitle":
                    "max-w-[380px] rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)]",
                purchase:
                    "max-w-[380px] rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)]",
                "emoji-deploy":
                    "max-w-[360px] rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-center text-(--diamond-ink,#1a1917) shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)]",
                "persist-checkbox":
                    "max-w-[400px] rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)]",
                terminal:
                    "max-w-[420px] rounded-md border border-[#2d2c28] bg-[#0a0a08] font-mono text-[#d4d0c8] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.45)]",
            },
        },
        defaultVariants: { variant: "archive" },
    },
);

const overlayCls =
    "fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

export interface ConfirmDialogProps
    extends Omit<React.ComponentPropsWithoutRef<typeof RadixAlert.Content>, "title">,
        VariantProps<typeof contentVariants> {
    trigger?: React.ReactElement;
    title?: React.ReactNode;
    description?: React.ReactNode;
    cancelLabel?: React.ReactNode;
    actionLabel?: React.ReactNode;
    onCancel?: () => void;
    onAction?: () => void;
    /** icon-subtitle variant — leading glyph. */
    icon?: React.ReactNode;
    /** emoji-deploy variant — emoji shown at top. */
    emoji?: React.ReactNode;
    /** purchase variant — summary rows {label, value}. */
    summary?: Array<{ label: React.ReactNode; value: React.ReactNode; total?: boolean }>;
    /** persist-checkbox variant — label for the "don't ask again" toggle. */
    persistLabel?: React.ReactNode;
    onPersistChange?: (value: boolean) => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
    inline?: boolean;
    accent?: string;
}

export const ConfirmDialog = React.forwardRef<HTMLDivElement, ConfirmDialogProps>(function ConfirmDialog(
    {
        className,
        variant = "archive",
        trigger,
        title,
        description,
        cancelLabel = "Cancel",
        actionLabel = "Continue",
        onCancel,
        onAction,
        icon,
        emoji,
        summary,
        persistLabel = "Don't ask again",
        onPersistChange,
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
    const v = variant ?? "archive";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const actionBtnCls =
        v === "terminal"
            ? "inline-flex h-9 cursor-pointer items-center justify-center rounded-sm bg-(--diamond-accent,#2b7fff) px-3 font-mono text-(--diamond-on-accent,#fff) text-[12px] hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_85%,#000)]"
            : "inline-flex h-9 cursor-pointer items-center justify-center rounded-md bg-(--diamond-accent,#2b7fff) px-3 font-medium text-(--diamond-on-accent,#fff) text-[13px] hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_85%,#000)]";
    const cancelBtnCls =
        v === "terminal"
            ? "inline-flex h-9 cursor-pointer items-center justify-center rounded-sm border border-[#2d2c28] bg-transparent px-3 font-mono text-[#d4d0c8] text-[12px] hover:bg-[#1a1a18]"
            : "inline-flex h-9 cursor-pointer items-center justify-center rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 font-medium text-(--diamond-ink,#1a1917) text-[13px] hover:bg-(--diamond-surface-alt,#ebe8e1)";

    const actionsRow = (full?: boolean) => (
        <div className={cn("flex gap-2", full ? "" : "justify-end")}>
            <RadixAlert.Cancel asChild>
                <button type="button" onClick={onCancel} className={cn(cancelBtnCls, full && "flex-1")}>
                    {cancelLabel}
                </button>
            </RadixAlert.Cancel>
            <RadixAlert.Action asChild>
                <button type="button" onClick={onAction} className={cn(actionBtnCls, full && "flex-1")}>
                    {actionLabel}
                </button>
            </RadixAlert.Action>
        </div>
    );

    let body: React.ReactNode;
    if (v === "icon-subtitle") {
        body = (
            <>
                <div className="flex items-start gap-3">
                    <span
                        aria-hidden="true"
                        className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_15%,var(--diamond-surface,#fff))] text-(--diamond-accent,#2b7fff)"
                    >
                        {icon ?? <Question size={16} weight="bold" />}
                    </span>
                    <div className="flex flex-1 flex-col gap-0.5">
                        {title ? (
                            <RadixAlert.Title className="font-semibold text-[14px]">{title}</RadixAlert.Title>
                        ) : null}
                        {description ? (
                            <RadixAlert.Description className="text-[12px] text-(--diamond-muted,#6b6862)">
                                {description}
                            </RadixAlert.Description>
                        ) : null}
                    </div>
                </div>
                {children}
                {actionsRow()}
            </>
        );
    } else if (v === "purchase") {
        body = (
            <>
                {title ? (
                    <RadixAlert.Title className="font-semibold text-[16px] tracking-tight">{title}</RadixAlert.Title>
                ) : null}
                {description ? (
                    <RadixAlert.Description className="text-[13px] text-(--diamond-muted,#6b6862)">
                        {description}
                    </RadixAlert.Description>
                ) : null}
                {summary?.length ? (
                    <div className="flex flex-col gap-1.5 rounded-md bg-(--diamond-surface-alt,#ebe8e1) p-3 text-[12px]">
                        {summary.map((row, i) => (
                            <div
                                // biome-ignore lint/suspicious/noArrayIndexKey: positional summary row
                                key={i}
                                className={cn(
                                    "flex justify-between",
                                    row.total && "border-(--diamond-border,#d9d5cc) border-t pt-1.5 font-semibold",
                                )}
                            >
                                <span>{row.label}</span>
                                <span className="font-mono">{row.value}</span>
                            </div>
                        ))}
                    </div>
                ) : null}
                {children}
                {actionsRow()}
            </>
        );
    } else if (v === "emoji-deploy") {
        body = (
            <>
                <div className="text-3xl">{emoji ?? "🚀"}</div>
                {title ? (
                    <RadixAlert.Title className="font-semibold text-[16px] tracking-tight">{title}</RadixAlert.Title>
                ) : null}
                {description ? (
                    <RadixAlert.Description className="text-[13px] text-(--diamond-muted,#6b6862)">
                        {description}
                    </RadixAlert.Description>
                ) : null}
                {children}
                {actionsRow(true)}
            </>
        );
    } else if (v === "persist-checkbox") {
        body = (
            <>
                {title ? (
                    <RadixAlert.Title className="font-semibold text-[15px] tracking-tight">{title}</RadixAlert.Title>
                ) : null}
                {description ? (
                    <RadixAlert.Description className="text-[13px] text-(--diamond-muted,#6b6862)">
                        {description}
                    </RadixAlert.Description>
                ) : null}
                {children}
                <label className="inline-flex cursor-pointer items-center gap-2 text-[12px]">
                    <input
                        type="checkbox"
                        onChange={(e) => onPersistChange?.(e.target.checked)}
                        className="size-4 accent-(--diamond-accent,#2b7fff)"
                    />
                    {persistLabel}
                </label>
                {actionsRow()}
            </>
        );
    } else if (v === "terminal") {
        body = (
            <>
                {title ? (
                    <RadixAlert.Title className="text-(--diamond-accent,#2b7fff) text-[12px]">
                        $ confirm —{" "}
                        <span className="text-[#d4d0c8]">{title}</span>
                    </RadixAlert.Title>
                ) : null}
                {description ? (
                    <RadixAlert.Description className="text-[#6b6862] text-[11px]">
                        {description}
                    </RadixAlert.Description>
                ) : null}
                {children}
                <div className="flex gap-2 pt-1">
                    <RadixAlert.Cancel asChild>
                        <button type="button" onClick={onCancel} className={cancelBtnCls}>
                            [n] {cancelLabel}
                        </button>
                    </RadixAlert.Cancel>
                    <RadixAlert.Action asChild>
                        <button type="button" onClick={onAction} className={actionBtnCls}>
                            [y] {actionLabel}
                        </button>
                    </RadixAlert.Action>
                </div>
            </>
        );
    } else {
        /* archive */
        body = (
            <>
                {title ? (
                    <RadixAlert.Title className="font-semibold text-[15px] tracking-tight">{title}</RadixAlert.Title>
                ) : null}
                {description ? (
                    <RadixAlert.Description className="text-[13px] text-(--diamond-muted,#6b6862)">
                        {description}
                    </RadixAlert.Description>
                ) : null}
                {children}
                {actionsRow()}
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

ConfirmDialog.displayName = "Diamond.ConfirmDialog";

export { contentVariants as confirmDialogContentVariants };

/* Re-export the rocket as the default emoji for convenience. */
export { Rocket };
