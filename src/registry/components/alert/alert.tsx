"use client";

import { CheckCircle, Info, Star, Warning, WarningOctagon, X } from "@phosphor-icons/react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Alert — static important messages with semantic tones. */

export type AlertVariant = "info" | "success" | "warning" | "danger" | "brand" | "notice";

const alertVariants = cva(
    [
        "relative flex w-full items-start gap-3 rounded-md border p-3",
        "text-(--diamond-ink,#1a1917) text-[13px]",
    ].join(" "),
    {
        variants: {
            variant: {
                info: "border-(--diamond-accent,#2b7fff)/35 bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_10%,var(--diamond-surface,#fff))]",
                success:
                    "border-emerald-500/35 bg-[color-mix(in_oklab,#10b981_12%,var(--diamond-surface,#fff))]",
                warning:
                    "border-amber-500/40 bg-[color-mix(in_oklab,#f59e0b_14%,var(--diamond-surface,#fff))]",
                danger: "border-rose-500/40 bg-[color-mix(in_oklab,#e11d48_12%,var(--diamond-surface,#fff))]",
                brand: "border-(--diamond-ink,#1a1917) bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#fff)",
                notice: "border-(--diamond-border-strong,#c4bfb3) border-dashed bg-transparent font-mono text-(--diamond-muted,#6b6862)",
            },
        },
        defaultVariants: { variant: "info" },
    },
);

const ICON_DEFAULT: Record<AlertVariant, React.ComponentType<{ size?: number; weight?: "bold" | "fill" | "regular" }>> = {
    info: Info,
    success: CheckCircle,
    warning: Warning,
    danger: WarningOctagon,
    brand: Star,
    notice: Info,
};

const ICON_WRAP: Record<AlertVariant, string> = {
    info: "bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff)",
    success: "bg-emerald-500 text-white",
    warning: "bg-amber-500 text-white",
    danger: "bg-rose-500 text-white",
    brand: "bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff)",
    notice: "bg-transparent text-(--diamond-accent,#2b7fff)",
};

export interface AlertProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof alertVariants> {
    /** Lead icon — overrides the variant default. Pass `null` to hide. */
    icon?: React.ReactNode;
    /** Bold heading inside the alert. */
    title?: React.ReactNode;
    /** Render a close button. Calls `onDismiss` then unmounts the alert. */
    dismissible?: boolean;
    onDismiss?: () => void;
    /** Accent override (CSS color). */
    accent?: string;
    asChild?: boolean;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    {
        className,
        variant = "info",
        icon,
        title,
        dismissible = false,
        onDismiss,
        accent,
        asChild = false,
        style,
        children,
        ...rest
    },
    ref,
) {
    const [open, setOpen] = React.useState(true);
    const v = variant ?? "info";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    if (!open) return null;
    const Comp: React.ElementType = asChild ? Slot : "div";

    const Icon = ICON_DEFAULT[v];
    const showIcon = icon !== null;
    const noticeKicker = v === "notice";

    return (
        <Comp
            ref={ref}
            role={v === "danger" ? "alert" : "status"}
            aria-live={v === "danger" ? "assertive" : "polite"}
            className={cn(alertVariants({ variant: v }), className)}
            style={inlineStyle}
            {...rest}
        >
            {noticeKicker ? (
                <span className="font-mono font-semibold text-(--diamond-accent,#2b7fff) text-[11px] tracking-[0.14em]">
                    NOTICE
                </span>
            ) : showIcon ? (
                <span
                    aria-hidden="true"
                    className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-full font-bold text-[12px]",
                        ICON_WRAP[v],
                    )}
                >
                    {icon ?? <Icon size={14} weight="bold" />}
                </span>
            ) : null}

            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                {title ? (
                    <strong
                        className={cn(
                            "font-semibold text-[13px] leading-snug",
                            v === "brand" && "text-(--diamond-surface,#fff)",
                        )}
                    >
                        {title}
                    </strong>
                ) : null}
                {children ? (
                    <div
                        className={cn(
                            "text-[12px] leading-snug",
                            v === "brand"
                                ? "text-(--diamond-surface,#fff)/75"
                                : "text-(--diamond-muted,#6b6862)",
                            v === "notice" && "font-mono text-[11px]",
                        )}
                    >
                        {children}
                    </div>
                ) : null}
            </div>

            {dismissible ? (
                <button
                    type="button"
                    aria-label="Dismiss"
                    onClick={() => {
                        setOpen(false);
                        onDismiss?.();
                    }}
                    className={cn(
                        "-mr-1 -mt-1 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--diamond-accent,#2b7fff)",
                        v === "brand"
                            ? "text-(--diamond-surface,#fff)/60 hover:bg-white/10 hover:text-(--diamond-surface,#fff)"
                            : "text-(--diamond-muted,#6b6862) hover:bg-(--diamond-surface-alt,#ebe8e1) hover:text-(--diamond-ink,#1a1917)",
                    )}
                >
                    <X size={14} weight="bold" />
                </button>
            ) : null}
        </Comp>
    );
});

Alert.displayName = "Diamond.Alert";

export { alertVariants };
