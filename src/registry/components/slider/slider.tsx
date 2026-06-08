"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Slider — single-thumb **and** two-thumb (range) slider. Wraps
 * real <input type="range"> for accessibility. Range mode uses two stacked
 * inputs with conflict resolution. */

export type SliderVariant =
    /* Single */ | "classic" | "thick" | "floating" | "stepped" | "gradient" | "mono"
    /* Range  */ | "range" | "range-thick" | "range-bubbles" | "range-fields" | "range-histogram" | "range-mono";

const isRange = (v: SliderVariant) => v.startsWith("range");

const trackCls = "absolute inset-y-1/2 left-0 right-0 -translate-y-1/2 h-1 rounded-full bg-(--diamond-border,#d9d5cc)";

const sliderVariants = cva("relative w-full max-w-[280px] select-none", {
    variants: {
        variant: {
            classic: "",
            thick: "",
            floating: "pt-7",
            stepped: "",
            gradient: "",
            mono: "font-mono",
            range: "",
            "range-thick": "",
            "range-bubbles": "pt-7",
            "range-fields": "",
            "range-histogram": "pt-12",
            "range-mono": "font-mono",
        },
    },
    defaultVariants: { variant: "classic" },
});

const inputCls =
    "absolute inset-y-0 left-0 right-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent outline-none focus-visible:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-(--diamond-accent,#2b7fff) [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-(--diamond-accent,#2b7fff)";

export interface SliderProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
        VariantProps<typeof sliderVariants> {
    min?: number;
    max?: number;
    step?: number;
    /** Single mode: a number; range mode: a [low, high] tuple. */
    value?: number | [number, number];
    defaultValue?: number | [number, number];
    onValueChange?: (next: number | [number, number]) => void;
    /** Stepped variant — count of tick marks. */
    steps?: number;
    /** Histogram variant — bar heights (0..1). */
    histogram?: number[];
    /** Optional formatter for displayed values. */
    format?: (n: number) => string;
    accent?: string;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(function Slider(
    {
        className,
        variant = "classic",
        min = 0,
        max = 100,
        step = 1,
        value: valueProp,
        defaultValue,
        onValueChange,
        steps,
        histogram = [0.3, 0.5, 0.7, 0.9, 0.8, 0.6, 0.4, 0.7, 0.5, 0.3],
        format = (n) => String(n),
        accent,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "classic";
    const range = isRange(v);
    const [internal, setInternal] = React.useState<number | [number, number]>(
        defaultValue ?? (range ? [25, 75] : 50),
    );
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internal;
    const set = (next: number | [number, number]) => {
        if (!isControlled) setInternal(next);
        onValueChange?.(next);
    };

    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const trackHeight =
        v === "thick" || v === "range-thick" ? "h-2.5" : v === "mono" || v === "range-mono" ? "h-px" : "h-1";

    const pct = (n: number) => ((n - min) / (max - min)) * 100;

    if (range) {
        const [lo, hi] = value as [number, number];
        const setLo = (n: number) => set([Math.min(n, hi), hi]);
        const setHi = (n: number) => set([lo, Math.max(n, lo)]);

        return (
            <div ref={ref} className={cn(sliderVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
                {v === "range-bubbles" ? (
                    <>
                        <span
                            className="-translate-x-1/2 absolute top-0 z-20 rounded-md bg-(--diamond-ink,#1a1917) px-1.5 py-0.5 font-mono text-(--diamond-surface,#fff) text-[10px]"
                            style={{ left: `${pct(lo)}%` }}
                        >
                            {format(lo)}
                        </span>
                        <span
                            className="-translate-x-1/2 absolute top-0 z-20 rounded-md bg-(--diamond-ink,#1a1917) px-1.5 py-0.5 font-mono text-(--diamond-surface,#fff) text-[10px]"
                            style={{ left: `${pct(hi)}%` }}
                        >
                            {format(hi)}
                        </span>
                    </>
                ) : null}

                {v === "range-histogram" ? (
                    <div className="absolute inset-x-0 top-0 flex h-10 items-end gap-px">
                        {histogram.map((h, i) => {
                            const at = (i / (histogram.length - 1)) * 100;
                            const within = at >= pct(lo) && at <= pct(hi);
                            return (
                                <span
                                    // biome-ignore lint/suspicious/noArrayIndexKey: histogram bins positional
                                    key={i}
                                    className={cn(
                                        "flex-1 rounded-t",
                                        within ? "bg-(--diamond-accent,#2b7fff)" : "bg-(--diamond-border,#d9d5cc)",
                                    )}
                                    style={{ height: `${Math.round(h * 100)}%` }}
                                />
                            );
                        })}
                    </div>
                ) : null}

                <div className="relative h-6">
                    <span className={cn(trackCls, trackHeight)} />
                    <span
                        className={cn(
                            "-translate-y-1/2 absolute inset-y-1/2 rounded-full bg-(--diamond-accent,#2b7fff)",
                            trackHeight,
                            v === "range-mono" && "rounded-none",
                        )}
                        style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={lo}
                        onChange={(e) => setLo(Number(e.target.value))}
                        className={inputCls}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={hi}
                        onChange={(e) => setHi(Number(e.target.value))}
                        className={inputCls}
                    />
                </div>

                {v === "range-fields" ? (
                    <div className="mt-2 flex items-center gap-2 text-[12px]">
                        <input
                            type="number"
                            min={min}
                            max={hi}
                            value={lo}
                            onChange={(e) => setLo(Number(e.target.value))}
                            className="w-20 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2 py-1 outline-none"
                        />
                        <span className="text-(--diamond-muted,#9a968e)">—</span>
                        <input
                            type="number"
                            min={lo}
                            max={max}
                            value={hi}
                            onChange={(e) => setHi(Number(e.target.value))}
                            className="w-20 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2 py-1 outline-none"
                        />
                    </div>
                ) : v === "range-mono" ? (
                    <div className="mt-1 flex justify-between font-mono text-[10px] text-(--diamond-muted,#6b6862) uppercase tracking-[0.1em]">
                        <span>min {format(lo)}</span>
                        <span>max {format(hi)}</span>
                    </div>
                ) : v === "range" || v === "range-thick" ? (
                    <div className="mt-1 flex justify-between text-(--diamond-muted,#6b6862) text-[11px]">
                        <span>{format(lo)}</span>
                        <span>{format(hi)}</span>
                    </div>
                ) : null}
            </div>
        );
    }

    /* ---- single ---- */
    const single = value as number;
    return (
        <div ref={ref} className={cn(sliderVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
            {v === "floating" ? (
                <span
                    className="-translate-x-1/2 absolute top-0 z-20 rounded-md bg-(--diamond-ink,#1a1917) px-1.5 py-0.5 font-mono text-(--diamond-surface,#fff) text-[10px]"
                    style={{ left: `${pct(single)}%` }}
                >
                    {format(single)}
                </span>
            ) : null}

            <div className="relative h-6">
                <span className={cn(trackCls, trackHeight)} />
                <span
                    className={cn(
                        "-translate-y-1/2 absolute inset-y-1/2 left-0 rounded-full",
                        trackHeight,
                        v === "gradient"
                            ? "bg-[linear-gradient(to_right,#10b981,var(--diamond-accent,#2b7fff),#e11d48)]"
                            : "bg-(--diamond-accent,#2b7fff)",
                        v === "mono" && "rounded-none",
                    )}
                    style={{ width: `${pct(single)}%` }}
                />
                {v === "stepped" ? (
                    <div className="-translate-y-1/2 absolute inset-x-1 top-1/2 flex justify-between">
                        {Array.from({ length: steps ?? 6 }, (_, i) => (
                            <span
                                // biome-ignore lint/suspicious/noArrayIndexKey: positional tick
                                key={i}
                                className="size-1.5 rounded-full bg-(--diamond-muted,#9a968e)"
                            />
                        ))}
                    </div>
                ) : null}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={single}
                    onChange={(e) => set(Number(e.target.value))}
                    className={inputCls}
                />
            </div>

            {v === "mono" ? (
                <div className="mt-1 flex justify-between font-mono text-[10px] text-(--diamond-muted,#6b6862) uppercase tracking-[0.1em]">
                    <span>{format(min)}</span>
                    <span>{format(single)}</span>
                    <span>{format(max)}</span>
                </div>
            ) : v !== "floating" ? (
                <div className="mt-1 text-right text-(--diamond-muted,#6b6862) text-[11px]">{format(single)}</div>
            ) : null}
        </div>
    );
});

Slider.displayName = "Diamond.Slider";

export { sliderVariants };
