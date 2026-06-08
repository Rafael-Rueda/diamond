"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · OTPInput — one-time-passcode field. Six visual treatments. State
 * is a string of digits (or alphanumeric chars), one slot per character.
 * Handles paste, backspace navigation and arrow keys. */

export type OTPInputVariant = "classic" | "underlined" | "big-xl" | "dashed" | "terminal" | "readonly";

const cellVariants = cva(
    "flex items-center justify-center bg-(--diamond-surface,#fff) text-center font-mono text-(--diamond-ink,#1a1917) outline-none transition-[border-color,box-shadow] focus-visible:border-(--diamond-accent,#2b7fff)",
    {
        variants: {
            variant: {
                classic: "size-10 rounded-md border-[1.5px] border-(--diamond-border,#d9d5cc) text-[18px]",
                underlined:
                    "size-10 rounded-none border-0 border-b-[1.5px] border-(--diamond-border,#d9d5cc) text-[18px]",
                "big-xl": "h-16 w-12 rounded-md border-[1.5px] border-(--diamond-border,#d9d5cc) text-[28px]",
                dashed:
                    "size-10 rounded-md border-[1.5px] border-(--diamond-border,#d9d5cc) border-dashed text-[18px]",
                terminal:
                    "size-9 rounded-sm border border-[#2d2c28] bg-[#0a0a08] text-(--diamond-accent,#2b7fff) text-[16px]",
                readonly:
                    "size-10 rounded-md bg-(--diamond-surface-alt,#ebe8e1) text-[18px] border-0",
            },
        },
        defaultVariants: { variant: "classic" },
    },
);

export interface OTPInputProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
        VariantProps<typeof cellVariants> {
    /** Number of slots. */
    length?: number;
    /** Insert a separator after the N-th slot. */
    splitAfter?: number;
    /** Restrict to digits only (default true). */
    numeric?: boolean;
    value?: string;
    defaultValue?: string;
    onValueChange?: (next: string) => void;
    onComplete?: (next: string) => void;
    autoFocus?: boolean;
    accent?: string;
    disabled?: boolean;
}

export const OTPInput = React.forwardRef<HTMLDivElement, OTPInputProps>(function OTPInput(
    {
        className,
        variant = "classic",
        length = 6,
        splitAfter,
        numeric = true,
        value: valueProp,
        defaultValue,
        onValueChange,
        onComplete,
        autoFocus,
        accent,
        disabled,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "classic";
    const [internal, setInternal] = React.useState(defaultValue ?? "");
    const isControlled = valueProp !== undefined;
    const value = (isControlled ? valueProp : internal) ?? "";
    const set = (next: string) => {
        const filtered = numeric ? next.replace(/\D/g, "") : next;
        const trimmed = filtered.slice(0, length);
        if (!isControlled) setInternal(trimmed);
        onValueChange?.(trimmed);
        if (trimmed.length === length) onComplete?.(trimmed);
    };
    const refs = React.useRef<HTMLInputElement[]>([]);
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    React.useEffect(() => {
        if (autoFocus) refs.current[0]?.focus();
    }, [autoFocus]);

    const handleCell = (i: number, ch: string) => {
        if (v === "readonly") return;
        const arr = value.split("");
        while (arr.length < length) arr.push("");
        const c = ch.slice(-1);
        arr[i] = c;
        const next = arr.join("");
        set(next);
        if (c && refs.current[i + 1]) refs.current[i + 1]?.focus();
    };

    const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !value[i] && refs.current[i - 1]) {
            refs.current[i - 1]?.focus();
        } else if (e.key === "ArrowLeft" && refs.current[i - 1]) {
            e.preventDefault();
            refs.current[i - 1]?.focus();
        } else if (e.key === "ArrowRight" && refs.current[i + 1]) {
            e.preventDefault();
            refs.current[i + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        set(e.clipboardData.getData("text"));
        refs.current[Math.min(length - 1, value.length + e.clipboardData.getData("text").length - 1)]?.focus();
    };

    return (
        <div
            ref={ref}
            className={cn("inline-flex items-center gap-1.5", className)}
            style={inlineStyle}
            {...rest}
        >
            {Array.from({ length }, (_, i) => (
                <React.Fragment key={i}>
                    {splitAfter && i === splitAfter ? (
                        <span aria-hidden="true" className="px-1 text-(--diamond-muted,#9a968e) text-lg">
                            –
                        </span>
                    ) : null}
                    <input
                        ref={(el) => {
                            if (el) refs.current[i] = el;
                        }}
                        type="text"
                        inputMode={numeric ? "numeric" : "text"}
                        maxLength={1}
                        value={value[i] ?? ""}
                        disabled={disabled || v === "readonly"}
                        readOnly={v === "readonly"}
                        autoComplete="one-time-code"
                        onChange={(e) => handleCell(i, e.target.value)}
                        onKeyDown={(e) => handleKey(i, e)}
                        onPaste={handlePaste}
                        className={cn(cellVariants({ variant: v }))}
                    />
                </React.Fragment>
            ))}
        </div>
    );
});

OTPInput.displayName = "Diamond.OTPInput";

export { cellVariants as otpInputCellVariants };
