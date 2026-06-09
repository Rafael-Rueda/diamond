"use client";

import { CheckCircle, X } from "@phosphor-icons/react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Dialog — modal window built on @radix-ui/react-dialog. Backdrop,
 * focus trap, ESC dismiss, scroll lock — all handled by Radix. Six visual
 * treatments. Compose freely with `title`, `description`, `actions` slots,
 * or pass children for a fully custom body. */

export type DialogVariant = "standard" | "success" | "dark" | "header-footer" | "editorial" | "brutalist";

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
                standard:
                    "max-w-[420px] rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)]",
                success:
                    "max-w-[340px] rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-6 text-center text-(--diamond-ink,#1a1917) shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)]",
                dark: "max-w-[420px] rounded-lg border border-[#2d2c28] bg-[#0f0f0e] text-[#f5f3ef] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.45)]",
                "header-footer":
                    "max-w-[440px] overflow-hidden rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-0 text-(--diamond-ink,#1a1917) shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)]",
                editorial:
                    "max-w-[420px] rounded-r-lg border border-(--diamond-border,#d9d5cc) border-l-4 border-l-(--diamond-accent,#2b7fff) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)]",
                brutalist:
                    "max-w-[420px] rounded-none border-2 border-(--diamond-ink,#1a1917) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) shadow-[6px_6px_0_0_var(--diamond-ink,#1a1917)]",
            },
        },
        defaultVariants: { variant: "standard" },
    },
);

const overlayVariants = cva(
    "fixed inset-0 z-50 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    {
        variants: {
            variant: {
                standard: "bg-black/40",
                success: "bg-black/40",
                dark: "bg-black/60",
                "header-footer": "bg-black/40",
                editorial: "bg-black/40",
                brutalist: "bg-(--diamond-ink,#1a1917)/30",
            },
        },
        defaultVariants: { variant: "standard" },
    },
);

/* ----- Re-exports ---------------------------------------------------------- */

export const DialogRoot = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogPortal = RadixDialog.Portal;
export const DialogClose = RadixDialog.Close;
export const DialogTitle = RadixDialog.Title;
export const DialogDescription = RadixDialog.Description;

export interface DialogProps
    extends Omit<React.ComponentPropsWithoutRef<typeof RadixDialog.Content>, "title">,
        VariantProps<typeof contentVariants> {
    /** Trigger element — wrapped via asChild. Omit when controlled. */
    trigger?: React.ReactElement;
    /** Title rendered as DialogTitle. */
    title?: React.ReactNode;
    /** Description rendered as DialogDescription. */
    description?: React.ReactNode;
    /** Action buttons row. Place primary CTA last. */
    actions?: React.ReactNode;
    /** Editorial variant — kicker above the title (e.g. "DIALOG · 01"). */
    kicker?: React.ReactNode;
    /** Success variant — custom icon. Defaults to a green check. */
    successIcon?: React.ReactNode;
    /** Header-footer variant — heading bar content. */
    header?: React.ReactNode;
    /** Header-footer variant — footer bar content (overrides actions). */
    footer?: React.ReactNode;
    /** Hide the close button (top-right X). */
    hideClose?: boolean;
    /** Controlled open state. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
    /** Mounted in-place inside the cell when previewing (skip Radix Portal). */
    inline?: boolean;
    /** Override accent color. */
    accent?: string;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(function Dialog(
    {
        className,
        variant = "standard",
        trigger,
        title,
        description,
        actions,
        kicker,
        successIcon,
        header,
        footer,
        hideClose = false,
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
    const v = variant ?? "standard";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const dark = v === "dark";
    const titleColor = dark ? "text-[#f5f3ef]" : "text-(--diamond-ink,#1a1917)";
    const descColor = dark ? "text-[#a8a49c]" : "text-(--diamond-muted,#6b6862)";

    const body =
        v === "success" ? (
            <>
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[color-mix(in_oklab,#10b981_18%,var(--diamond-surface,#fff))] text-emerald-600">
                    {successIcon ?? <CheckCircle size={26} weight="fill" />}
                </div>
                {title ? (
                    <RadixDialog.Title className="mt-2 font-semibold text-[16px] tracking-tight">
                        {title}
                    </RadixDialog.Title>
                ) : null}
                {description ? (
                    <RadixDialog.Description className={cn("text-[13px] leading-relaxed", descColor)}>
                        {description}
                    </RadixDialog.Description>
                ) : null}
                {children}
                {actions ? <div className="mt-1 flex flex-col gap-2">{actions}</div> : null}
            </>
        ) : v === "header-footer" ? (
            <>
                <div className="flex items-center justify-between border-(--diamond-border,#d9d5cc) border-b bg-(--diamond-surface-alt,#ebe8e1) px-4 py-3">
                    {header ?? (title ? (
                        <RadixDialog.Title className="font-semibold text-[14px] tracking-tight">
                            {title}
                        </RadixDialog.Title>
                    ) : null)}
                    {!hideClose ? (
                        <RadixDialog.Close asChild>
                            <button
                                type="button"
                                aria-label="Close"
                                className="inline-flex size-6 cursor-pointer items-center justify-center rounded text-(--diamond-muted,#6b6862) hover:bg-(--diamond-surface,#fff) hover:text-(--diamond-ink,#1a1917)"
                            >
                                <X size={14} weight="bold" />
                            </button>
                        </RadixDialog.Close>
                    ) : null}
                </div>
                <div className="max-h-[60vh] overflow-y-auto px-4 py-3 text-(--diamond-muted,#6b6862) text-[13px]">
                    {description ? (
                        <RadixDialog.Description className="mb-2">{description}</RadixDialog.Description>
                    ) : null}
                    {children}
                </div>
                {(footer ?? actions) ? (
                    <div className="flex justify-end gap-2 border-(--diamond-border,#d9d5cc) border-t px-4 py-3">
                        {footer ?? actions}
                    </div>
                ) : null}
            </>
        ) : (
            <>
                {v === "editorial" && (kicker ?? true) ? (
                    <span className="font-mono text-[10px] text-(--diamond-accent,#2b7fff) uppercase tracking-[0.16em]">
                        {kicker ?? "DIALOG · 01"}
                    </span>
                ) : null}
                {title ? (
                    <RadixDialog.Title className={cn("font-semibold text-[16px] tracking-tight", titleColor)}>
                        {title}
                    </RadixDialog.Title>
                ) : null}
                {description ? (
                    <RadixDialog.Description className={cn("text-[13px] leading-relaxed", descColor)}>
                        {description}
                    </RadixDialog.Description>
                ) : null}
                {children}
                {actions ? (
                    <div className={cn("mt-1 flex justify-end gap-2", v === "brutalist" && "[&>button]:rounded-none")}>
                        {actions}
                    </div>
                ) : null}
                {!hideClose && v !== "success" ? (
                    <RadixDialog.Close asChild>
                        <button
                            type="button"
                            aria-label="Close"
                            className={cn(
                                "absolute top-3 right-3 inline-flex size-7 cursor-pointer items-center justify-center rounded transition-colors",
                                dark
                                    ? "text-[#a8a49c] hover:bg-white/10 hover:text-[#f5f3ef]"
                                    : "text-(--diamond-muted,#6b6862) hover:bg-(--diamond-surface-alt,#ebe8e1) hover:text-(--diamond-ink,#1a1917)",
                            )}
                        >
                            <X size={14} weight="bold" />
                        </button>
                    </RadixDialog.Close>
                ) : null}
            </>
        );

    const content = (
        <>
            <RadixDialog.Overlay className={overlayVariants({ variant: v })} />
            <RadixDialog.Content
                ref={ref}
                className={cn(contentVariants({ variant: v }), className)}
                style={inlineStyle}
                {...rest}
            >
                {body}
            </RadixDialog.Content>
        </>
    );

    return (
        <RadixDialog.Root open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
            {trigger ? <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger> : null}
            {inline ? content : <RadixDialog.Portal>{content}</RadixDialog.Portal>}
        </RadixDialog.Root>
    );
});

Dialog.displayName = "Diamond.Dialog";

export { contentVariants as dialogContentVariants };
