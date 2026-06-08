"use client";

import { Heart, Star } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Rating — six rating styles. Value is a number in [0, max]; for
 * `stars` and `big-stars` it can be fractional (0.5 step). Renders a real
 * radio group under the hood for accessibility. */

export type RatingVariant = "stars" | "big-stars" | "hearts" | "scale-10" | "emoji" | "gradient";

const wrapperVariants = cva("inline-flex items-center select-none", {
    variants: {
        variant: {
            stars: "gap-0.5",
            "big-stars": "gap-1",
            hearts: "gap-0.5",
            "scale-10": "gap-1",
            emoji: "gap-2 text-2xl",
            gradient: "gap-0",
        },
    },
    defaultVariants: { variant: "stars" },
});

const DEFAULT_EMOJIS = ["😡", "😕", "😐", "🙂", "😍"];

export interface RatingProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
        VariantProps<typeof wrapperVariants> {
    value?: number;
    defaultValue?: number;
    onValueChange?: (next: number) => void;
    /** Max count. Defaults to 5 (or 10 for `scale-10`). */
    max?: number;
    /** Half-step. Default false. */
    allowHalf?: boolean;
    /** Emoji variant — custom emoji set. */
    emojis?: string[];
    accent?: string;
    disabled?: boolean;
    name?: string;
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(function Rating(
    {
        className,
        variant = "stars",
        value: valueProp,
        defaultValue = 0,
        onValueChange,
        max,
        allowHalf = false,
        emojis = DEFAULT_EMOJIS,
        accent,
        disabled,
        name,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "stars";
    const finalMax = max ?? (v === "scale-10" ? 10 : v === "emoji" ? emojis.length : 5);
    const [internal, setInternal] = React.useState(defaultValue);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internal;
    const set = (next: number) => {
        if (!isControlled) setInternal(next);
        onValueChange?.(next);
    };
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    if (v === "scale-10") {
        return (
            <div
                ref={ref}
                role="radiogroup"
                aria-label="Rating"
                className={cn(wrapperVariants({ variant: v }), className)}
                style={inlineStyle}
                {...rest}
            >
                {Array.from({ length: finalMax }, (_, i) => i + 1).map((n) => {
                    const on = value >= n;
                    return (
                        <button
                            key={n}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            disabled={disabled}
                            onClick={() => set(n)}
                            className={cn(
                                "inline-flex size-7 cursor-pointer items-center justify-center rounded border font-mono text-[12px] transition-colors",
                                on
                                    ? "border-(--diamond-accent,#2b7fff) bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff)"
                                    : "border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-muted,#6b6862) hover:border-(--diamond-accent,#2b7fff)",
                            )}
                        >
                            {n}
                        </button>
                    );
                })}
            </div>
        );
    }

    if (v === "emoji") {
        return (
            <div
                ref={ref}
                role="radiogroup"
                aria-label="Rating"
                className={cn(wrapperVariants({ variant: v }), className)}
                style={inlineStyle}
                {...rest}
            >
                {emojis.map((e, i) => {
                    const idx = i + 1;
                    const on = value === idx;
                    return (
                        <button
                            key={e}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            aria-label={`Rate ${idx}`}
                            disabled={disabled}
                            onClick={() => set(idx)}
                            className={cn(
                                "cursor-pointer transition-transform",
                                on ? "scale-125" : "grayscale hover:scale-110 hover:grayscale-0",
                            )}
                        >
                            {e}
                        </button>
                    );
                })}
            </div>
        );
    }

    if (v === "gradient") {
        const pct = Math.min(100, Math.max(0, (value / finalMax) * 100));
        return (
            <div
                ref={ref}
                className={cn("inline-flex w-[180px] flex-col gap-1", className)}
                style={inlineStyle}
                {...rest}
            >
                <div className="relative h-2.5 rounded-full bg-[linear-gradient(to_right,#10b981,#f59e0b,#e11d48)]">
                    <span
                        aria-hidden="true"
                        className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 size-3.5 rounded-full bg-(--diamond-surface,#fff) ring-2 ring-(--diamond-ink,#1a1917) transition-[left]"
                        style={{ left: `${pct}%` }}
                    />
                    <input
                        type="range"
                        aria-label="Rating"
                        min={0}
                        max={finalMax}
                        step={allowHalf ? 0.5 : 1}
                        value={value}
                        onChange={(e) => set(Number(e.target.value))}
                        disabled={disabled}
                        className="absolute inset-0 size-full cursor-pointer appearance-none bg-transparent outline-none [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-transparent"
                    />
                </div>
                <div className="flex justify-between font-mono text-[10px] text-(--diamond-muted,#6b6862) uppercase tracking-[0.1em]">
                    <span>Low</span>
                    <span>{value}/{finalMax}</span>
                    <span>High</span>
                </div>
            </div>
        );
    }

    /* stars / big-stars / hearts */
    const Icon = v === "hearts" ? Heart : Star;
    const iconSize = v === "big-stars" ? 28 : 16;
    return (
        <div
            ref={ref}
            role="radiogroup"
            aria-label="Rating"
            className={cn(wrapperVariants({ variant: v }), className)}
            style={inlineStyle}
            {...rest}
        >
            {Array.from({ length: finalMax }, (_, i) => i + 1).map((n) => {
                const filledFull = value >= n;
                const filledHalf = allowHalf && value >= n - 0.5 && value < n;
                return (
                    <button
                        key={n}
                        type="button"
                        role="radio"
                        aria-checked={filledFull}
                        aria-label={`${n} ${v === "hearts" ? "heart" : "star"}${n > 1 ? "s" : ""}`}
                        name={name}
                        disabled={disabled}
                        onClick={() => set(filledFull && value === n ? 0 : n)}
                        className={cn(
                            "relative cursor-pointer text-(--diamond-border,#d9d5cc) transition-transform hover:scale-110",
                            (filledFull || filledHalf) &&
                                (v === "hearts" ? "text-rose-500" : "text-amber-500"),
                        )}
                    >
                        <Icon size={iconSize} weight={filledFull || filledHalf ? "fill" : "regular"} />
                        {filledHalf ? (
                            <span aria-hidden="true" className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                                <Icon
                                    size={iconSize}
                                    weight="fill"
                                    className={v === "hearts" ? "text-rose-500" : "text-amber-500"}
                                />
                            </span>
                        ) : null}
                    </button>
                );
            })}
        </div>
    );
});

Rating.displayName = "Diamond.Rating";

export { wrapperVariants as ratingVariants };
