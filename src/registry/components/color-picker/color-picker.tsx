"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · ColorPicker — six visual treatments for picking a single color
 * value. State is a CSS color string. */

export type ColorPickerVariant = "swatches" | "hex" | "wheel" | "hsl" | "strip" | "shades";

const DEFAULT_SWATCHES = [
    "#2b7fff",
    "#e11d48",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#1a1917",
];

/* ---- HEX <-> HSL helpers (no external deps) ---- */
function hexToRgb(hex: string): [number, number, number] {
    const h = hex.replace("#", "");
    const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    return [Number.parseInt(v.slice(0, 2), 16), Number.parseInt(v.slice(2, 4), 16), Number.parseInt(v.slice(4, 6), 16)];
}
function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (n: number) => Math.round(n).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    h /= 360;
    s /= 100;
    l /= 100;
    const f = (n: number) => {
        const k = (n + h * 12) % 12;
        const a = s * Math.min(l, 1 - l);
        return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    };
    return [f(0) * 255, f(8) * 255, f(4) * 255];
}
function hslToHex(h: number, s: number, l: number): string {
    const [r, g, b] = hslToRgb(h, s, l);
    return rgbToHex(r, g, b);
}
function hexToHsl(hex: string): [number, number, number] {
    const [r, g, b] = hexToRgb(hex);
    return rgbToHsl(r, g, b);
}

const wrapperVariants = cva("inline-flex w-fit", {
    variants: {
        variant: {
            swatches: "",
            hex: "items-center gap-2 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2 py-1.5",
            wheel: "",
            hsl: "flex-col gap-2",
            strip: "flex-col gap-2",
            shades: "flex-col gap-2",
        },
    },
    defaultVariants: { variant: "swatches" },
});

export interface ColorPickerProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
        VariantProps<typeof wrapperVariants> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (next: string) => void;
    swatches?: string[];
    accent?: string;
    disabled?: boolean;
}

export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(function ColorPicker(
    {
        className,
        variant = "swatches",
        value: valueProp,
        defaultValue = "#2b7fff",
        onValueChange,
        swatches = DEFAULT_SWATCHES,
        accent,
        disabled,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "swatches";
    const [internal, setInternal] = React.useState(defaultValue);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internal;
    const set = (next: string) => {
        if (!isControlled) setInternal(next);
        onValueChange?.(next);
    };
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    if (v === "swatches") {
        return (
            <div ref={ref} className={cn("grid grid-cols-4 gap-1.5", className)} style={inlineStyle} {...rest}>
                {swatches.map((c) => (
                    <button
                        key={c}
                        type="button"
                        aria-label={c}
                        disabled={disabled}
                        onClick={() => set(c)}
                        className={cn(
                            "size-8 cursor-pointer rounded-md outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-(--diamond-accent,#2b7fff) focus-visible:ring-offset-2",
                            value === c && "ring-2 ring-(--diamond-ink,#1a1917) ring-offset-2",
                        )}
                        style={{ background: c }}
                    />
                ))}
            </div>
        );
    }

    if (v === "hex") {
        return (
            <div ref={ref} className={cn(wrapperVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
                <span aria-hidden="true" className="size-6 rounded-md ring-1 ring-(--diamond-border,#d9d5cc) ring-inset" style={{ background: value }} />
                <span className="text-(--diamond-muted,#6b6862) text-[13px]">#</span>
                <input
                    type="text"
                    value={value.replace("#", "")}
                    onChange={(e) => {
                        const next = `#${e.target.value.slice(0, 6)}`;
                        if (/^#[0-9a-f]{0,6}$/i.test(next)) set(next);
                    }}
                    disabled={disabled}
                    className="w-20 border-0 bg-transparent font-mono text-[13px] uppercase outline-none"
                />
            </div>
        );
    }

    if (v === "wheel") {
        const [h, s, l] = hexToHsl(value);
        return (
            <div ref={ref} className={cn("flex flex-col items-center gap-2", className)} style={inlineStyle} {...rest}>
                <div
                    className="size-28 rounded-full ring-1 ring-(--diamond-border,#d9d5cc) ring-inset"
                    style={{
                        background:
                            "conic-gradient(red, orange, yellow, green, cyan, blue, magenta, red)",
                    }}
                />
                <input
                    type="range"
                    min={0}
                    max={360}
                    value={h}
                    onChange={(e) => set(hslToHex(Number(e.target.value), s || 70, l || 50))}
                    disabled={disabled}
                    className="w-32 accent-(--diamond-accent,#2b7fff)"
                />
                <span className="font-mono text-(--diamond-muted,#6b6862) text-[11px]">H {h}°</span>
            </div>
        );
    }

    if (v === "hsl") {
        const [h, s, l] = hexToHsl(value);
        const SliderRow = ({ label, val, min, max, onCh }: { label: string; val: number; min: number; max: number; onCh: (n: number) => void }) => (
            <div className="flex items-center gap-2 text-[12px]">
                <span className="w-6 font-mono text-(--diamond-muted,#6b6862) uppercase">{label}</span>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={val}
                    onChange={(e) => onCh(Number(e.target.value))}
                    disabled={disabled}
                    className="w-32 accent-(--diamond-accent,#2b7fff)"
                />
                <span className="w-10 text-right font-mono text-(--diamond-muted,#6b6862)">{val}</span>
            </div>
        );
        return (
            <div ref={ref} className={cn(wrapperVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
                <div
                    aria-hidden="true"
                    className="h-10 w-full rounded-md ring-1 ring-(--diamond-border,#d9d5cc) ring-inset"
                    style={{ background: value }}
                />
                <SliderRow label="H" val={h} min={0} max={360} onCh={(n) => set(hslToHex(n, s, l))} />
                <SliderRow label="S" val={s} min={0} max={100} onCh={(n) => set(hslToHex(h, n, l))} />
                <SliderRow label="L" val={l} min={0} max={100} onCh={(n) => set(hslToHex(h, s, n))} />
            </div>
        );
    }

    if (v === "strip") {
        const [h] = hexToHsl(value);
        return (
            <div ref={ref} className={cn(wrapperVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
                <span aria-hidden="true" className="h-8 w-32 rounded-md ring-1 ring-(--diamond-border,#d9d5cc) ring-inset" style={{ background: value }} />
                <div className="relative h-2 w-32 rounded-full" style={{ background: "linear-gradient(to right, red, orange, yellow, green, cyan, blue, magenta, red)" }}>
                    <input
                        type="range"
                        min={0}
                        max={360}
                        value={h}
                        onChange={(e) => set(hslToHex(Number(e.target.value), 70, 50))}
                        disabled={disabled}
                        className="absolute inset-0 size-full cursor-pointer appearance-none bg-transparent outline-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:ring-1 [&::-webkit-slider-thumb]:ring-(--diamond-border,#d9d5cc)"
                    />
                </div>
            </div>
        );
    }

    /* shades */
    const [h, s] = hexToHsl(value);
    const shades = [10, 25, 40, 55, 70, 85];
    return (
        <div ref={ref} className={cn(wrapperVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
            <span aria-hidden="true" className="h-6 w-40 rounded-md ring-1 ring-(--diamond-border,#d9d5cc) ring-inset" style={{ background: value }} />
            <div className="grid grid-cols-6 gap-0">
                {shades.map((lShade) => {
                    const c = hslToHex(h || 220, Math.max(20, s), lShade);
                    return (
                        <button
                            key={lShade}
                            type="button"
                            aria-label={c}
                            disabled={disabled}
                            onClick={() => set(c)}
                            className={cn(
                                "h-6 cursor-pointer outline-none transition-transform first:rounded-l-md last:rounded-r-md hover:scale-y-110",
                                value === c && "ring-2 ring-(--diamond-ink,#1a1917) ring-offset-1",
                            )}
                            style={{ background: c }}
                        />
                    );
                })}
            </div>
        </div>
    );
});

ColorPicker.displayName = "Diamond.ColorPicker";

export { wrapperVariants as colorPickerVariants };
