"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Textarea — wraps a real <textarea>. Six visual variants plus
 * optional features: auto-grow, character counter, toolbar of formatting
 * buttons (passed in as children), and ghost underline. */

export type TextareaVariant = "classic" | "auto" | "counter" | "toolbar" | "markdown" | "ghost";

const baseInput =
    "w-full font-sans text-(--diamond-ink,#1a1917) text-[14px] outline-none transition-[border-color,box-shadow] placeholder:text-(--diamond-muted,#9a968e)";

const textareaVariants = cva(baseInput, {
    variants: {
        variant: {
            classic:
                "min-h-[90px] resize-y rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-2.5 focus-visible:border-(--diamond-accent,#2b7fff) focus-visible:ring-3 focus-visible:ring-(--diamond-accent,#2b7fff)/20",
            auto: "min-h-[40px] resize-none overflow-hidden rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-2.5 focus-visible:border-(--diamond-accent,#2b7fff)",
            counter:
                "min-h-[90px] resize-none rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 pt-2.5 pb-7 focus-visible:border-(--diamond-accent,#2b7fff)",
            toolbar:
                "min-h-[70px] resize-none rounded-none border-0 bg-(--diamond-surface,#fff) px-3.5 py-2.5 focus-visible:ring-0",
            markdown:
                "min-h-[120px] resize-y rounded-md border border-[#2d2c28] bg-[#0a0a08] px-3.5 py-2.5 font-mono text-[#d4d0c8] text-[13px]",
            ghost:
                "min-h-[60px] resize-none rounded-none border-0 border-b-[1.5px] border-(--diamond-border,#d9d5cc) border-dashed bg-transparent px-0 py-2 focus-visible:border-(--diamond-accent,#2b7fff) focus-visible:border-solid",
        },
        invalid: {
            true: "border-rose-500 focus-visible:border-rose-500 focus-visible:ring-rose-500/20",
            false: "",
        },
    },
    defaultVariants: { variant: "classic", invalid: false },
});

export interface TextareaProps
    extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
        VariantProps<typeof textareaVariants> {
    /** Counter variant — soft cap for the counter display. */
    maxLength?: number;
    /** Toolbar variant — formatting buttons. Pass `<button />` elements. */
    toolbar?: React.ReactNode;
    accent?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
    {
        className,
        variant = "classic",
        invalid,
        maxLength,
        toolbar,
        accent,
        value: valueProp,
        defaultValue,
        onChange,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "classic";
    const [internal, setInternal] = React.useState(defaultValue ?? "");
    const isControlled = valueProp !== undefined;
    const value = (isControlled ? valueProp : internal) ?? "";
    const innerRef = React.useRef<HTMLTextAreaElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement);

    React.useEffect(() => {
        if (v !== "auto") return;
        const el = innerRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    }, [value, v]);

    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const handle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!isControlled) setInternal(e.target.value);
        onChange?.(e);
    };

    if (v === "toolbar") {
        return (
            <div
                className={cn(
                    "w-full max-w-[320px] overflow-hidden rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) focus-within:border-(--diamond-accent,#2b7fff) focus-within:ring-3 focus-within:ring-(--diamond-accent,#2b7fff)/20",
                    invalid && "border-rose-500",
                    className,
                )}
                style={inlineStyle}
            >
                <div className="flex gap-0.5 border-(--diamond-border,#d9d5cc) border-b bg-(--diamond-surface-alt,#ebe8e1) p-1.5">
                    {toolbar ?? (
                        <>
                            {(["B", "I", "U", "·", "❝", "</>", "🔗"] as const).map((label) => (
                                <button
                                    key={label}
                                    type="button"
                                    className="inline-flex size-7 cursor-pointer items-center justify-center rounded text-(--diamond-muted,#6b6862) text-[12px] hover:bg-(--diamond-surface,#fff) hover:text-(--diamond-accent,#2b7fff)"
                                >
                                    {label}
                                </button>
                            ))}
                        </>
                    )}
                </div>
                <textarea
                    ref={innerRef}
                    value={value as string}
                    onChange={handle}
                    className={cn(textareaVariants({ variant: v, invalid }))}
                    {...rest}
                />
            </div>
        );
    }

    if (v === "counter") {
        const len = String(value).length;
        const cap = maxLength ?? 280;
        const over = len > cap;
        return (
            <div className={cn("relative w-full max-w-[320px]", className)} style={inlineStyle}>
                <textarea
                    ref={innerRef}
                    value={value as string}
                    onChange={handle}
                    maxLength={maxLength}
                    className={cn(textareaVariants({ variant: v, invalid: invalid ?? over }))}
                    {...rest}
                />
                <span
                    className={cn(
                        "absolute right-3 bottom-2 font-mono text-[10px] tracking-[0.08em]",
                        over ? "text-rose-500" : "text-(--diamond-muted,#9a968e)",
                    )}
                >
                    {len} / {cap}
                </span>
            </div>
        );
    }

    return (
        <textarea
            ref={innerRef}
            value={value as string}
            onChange={handle}
            className={cn(textareaVariants({ variant: v, invalid }), "max-w-[320px]", className)}
            style={inlineStyle}
            {...rest}
        />
    );
});

Textarea.displayName = "Diamond.Textarea";

export { textareaVariants };
