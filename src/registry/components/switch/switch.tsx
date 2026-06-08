"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Switch — boolean toggle wrapping <input type="checkbox" role="switch">.
 * Six visual treatments. Keyboard-accessible (Space/Enter via native input). */

export type SwitchVariant = "classic" | "square" | "with-label" | "ios" | "bi-state" | "industrial";

const switchVariants = cva(
    "relative inline-flex shrink-0 cursor-pointer items-center transition-colors focus-within:ring-2 focus-within:ring-(--diamond-accent,#2b7fff)/40 focus-within:ring-offset-2",
    {
        variants: {
            variant: {
                classic:
                    "h-6 w-11 rounded-full bg-(--diamond-border,#d9d5cc) has-[input:checked]:bg-(--diamond-accent,#2b7fff)",
                square:
                    "h-6 w-11 rounded-sm bg-(--diamond-border,#d9d5cc) has-[input:checked]:bg-(--diamond-accent,#2b7fff)",
                "with-label": "",
                ios: "h-7 w-12 rounded-full bg-(--diamond-border,#d9d5cc) shadow-inner has-[input:checked]:bg-emerald-500",
                "bi-state":
                    "h-7 w-[68px] rounded-full bg-(--diamond-surface-alt,#ebe8e1) p-0.5",
                industrial:
                    "h-7 w-11 rounded-sm border-[1.5px] border-(--diamond-ink,#1a1917) bg-(--diamond-surface-alt,#ebe8e1) has-[input:checked]:bg-(--diamond-accent,#2b7fff)",
            },
            size: {
                sm: "scale-75",
                md: "",
                lg: "scale-110",
            },
        },
        defaultVariants: { variant: "classic", size: "md" },
    },
);

export interface SwitchProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
        VariantProps<typeof switchVariants> {
    /** with-label variant — text rendered alongside the toggle. */
    label?: React.ReactNode;
    /** bi-state variant — left and right labels. */
    labels?: [React.ReactNode, React.ReactNode];
    accent?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
    {
        className,
        variant = "classic",
        size,
        label,
        labels = ["Off", "On"],
        accent,
        checked,
        defaultChecked,
        onChange,
        disabled,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "classic";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const inner = (
        <>
            <input
                ref={ref}
                type="checkbox"
                role="switch"
                checked={checked}
                defaultChecked={defaultChecked}
                onChange={onChange}
                disabled={disabled}
                className="peer absolute inset-0 cursor-pointer appearance-none opacity-0"
                {...rest}
            />
            {v === "bi-state" ? (
                <>
                    <span
                        aria-hidden="true"
                        className="absolute top-0.5 left-0.5 z-0 h-6 w-[calc(50%-2px)] rounded-full bg-(--diamond-surface,#fff) shadow-sm transition-transform peer-checked:translate-x-full"
                    />
                    <span className="relative z-10 flex flex-1 items-center justify-center font-mono text-[11px] uppercase tracking-[0.06em] peer-checked:text-(--diamond-muted,#9a968e)">
                        {labels[0]}
                    </span>
                    <span className="relative z-10 flex flex-1 items-center justify-center font-mono text-(--diamond-muted,#9a968e) text-[11px] uppercase tracking-[0.06em] peer-checked:text-(--diamond-ink,#1a1917)">
                        {labels[1]}
                    </span>
                </>
            ) : (
                <span
                    aria-hidden="true"
                    className={cn(
                        "pointer-events-none absolute top-0.5 left-0.5 transition-transform",
                        v === "square"
                            ? "size-5 rounded-sm bg-(--diamond-surface,#fff) peer-checked:translate-x-5"
                            : v === "ios"
                              ? "size-6 rounded-full bg-(--diamond-surface,#fff) shadow-md peer-checked:translate-x-5"
                              : v === "industrial"
                                ? "h-5 w-2.5 rounded-sm bg-(--diamond-ink,#1a1917) peer-checked:translate-x-6"
                                : "size-5 rounded-full bg-(--diamond-surface,#fff) shadow-sm peer-checked:translate-x-5",
                    )}
                />
            )}
        </>
    );

    if (v === "with-label") {
        return (
            <label
                className={cn(
                    "inline-flex cursor-pointer select-none items-center justify-between gap-3 text-(--diamond-muted,#6b6862) text-[13px]",
                    disabled && "pointer-events-none opacity-50",
                    className,
                )}
                style={inlineStyle}
            >
                <span>{label ?? "Notifications"}</span>
                <span className={cn(switchVariants({ variant: "classic", size }))}>{inner}</span>
            </label>
        );
    }

    return (
        <label
            className={cn(
                switchVariants({ variant: v, size }),
                disabled && "pointer-events-none opacity-50",
                className,
            )}
            style={inlineStyle}
        >
            {inner}
        </label>
    );
});

Switch.displayName = "Diamond.Switch";

export { switchVariants };
