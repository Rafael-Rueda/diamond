"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · ColorPicker — six visual treatments for picking a single color
 * value. State is a CSS color string. */

export type ColorPickerVariant = "swatches" | "hex" | "wheel" | "hsl" | "strip" | "shades";

const DEFAULT_SWATCHES = ["#2b7fff", "#e11d48", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#1a1917"];

const FALLBACK_COLOR = "#2b7fff";

/* ---- HEX <-> HSL helpers (no external deps) ---- */
function clamp(n: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, n));
}

function normalizeHex(hex?: string, fallback = FALLBACK_COLOR): string {
    const raw = (hex ?? "").trim().replace(/^#/, "");
    if (/^[0-9a-f]{3}$/i.test(raw)) {
        return `#${raw
            .split("")
            .map((c) => c + c)
            .join("")
            .toLowerCase()}`;
    }
    if (/^[0-9a-f]{6}$/i.test(raw)) return `#${raw.toLowerCase()}`;
    return fallback;
}

function hexToRgb(hex: string): [number, number, number] {
    const v = normalizeHex(hex).replace("#", "");
    return [Number.parseInt(v.slice(0, 2), 16), Number.parseInt(v.slice(2, 4), 16), Number.parseInt(v.slice(4, 6), 16)];
}
function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
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
    h = (((h % 360) + 360) % 360) / 360;
    s = clamp(s, 0, 100) / 100;
    l = clamp(l, 0, 100) / 100;
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

const wrapperVariants = cva("inline-flex max-w-full", {
    variants: {
        variant: {
            swatches: "",
            hex: "items-center gap-2 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2 py-1.5",
            wheel: "",
            hsl: "w-full max-w-[320px] flex-col gap-2",
            strip: "w-full max-w-[320px] flex-col gap-2",
            shades: "w-full max-w-[320px] flex-col gap-2",
        },
    },
    defaultVariants: { variant: "swatches" },
});

const colorSliderInputCls =
    "pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent opacity-0 outline-none";

const colorSliderThumbCls =
    "pointer-events-none absolute top-1/2 z-10 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-md ring-(--diamond-border,#d9d5cc) ring-1 transition-[box-shadow,transform]";

const hueGradient = "linear-gradient(to right, red, orange, yellow, green, cyan, blue, magenta, red)";

interface ColorSliderProps {
    value: number;
    min: number;
    max: number;
    label: string;
    ariaValueText?: string;
    disabled?: boolean;
    className?: string;
    trackClassName?: string;
    trackStyle?: React.CSSProperties;
    onValueChange: (next: number) => void;
}

function ColorSlider({
    value,
    min,
    max,
    label,
    ariaValueText,
    disabled,
    className,
    trackClassName,
    trackStyle,
    onValueChange,
}: ColorSliderProps) {
    const trackRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const cleanupDragRef = React.useRef<(() => void) | null>(null);
    const [focused, setFocused] = React.useState(false);
    const pct = max === min ? 0 : clamp(((value - min) / (max - min)) * 100, 0, 100);
    React.useEffect(() => () => cleanupDragRef.current?.(), []);

    const readClientX = (clientX: number) => {
        const rect = trackRef.current?.getBoundingClientRect();
        if (!rect || rect.width === 0) return value;
        const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
        return Math.round(min + ratio * (max - min));
    };
    const readPointer = (event: React.PointerEvent<HTMLDivElement>) => readClientX(event.clientX);
    const updateFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
        onValueChange(readPointer(event));
    };
    const updateFromClientX = (clientX: number) => {
        onValueChange(readClientX(clientX));
    };

    return (
        <div
            ref={trackRef}
            className={cn(
                "relative h-8 w-full min-w-0 cursor-pointer touch-none py-2",
                disabled && "cursor-not-allowed opacity-60",
                className,
            )}
            onPointerDown={(event) => {
                if (disabled || event.button !== 0) return;
                cleanupDragRef.current?.();
                updateFromPointer(event);
                const target = event.currentTarget;
                const pointerId = event.pointerId;
                function move(pointerEvent: PointerEvent) {
                    if (pointerEvent.pointerId !== pointerId) return;
                    updateFromClientX(pointerEvent.clientX);
                    pointerEvent.preventDefault();
                }
                function end(pointerEvent: PointerEvent) {
                    if (pointerEvent.pointerId !== pointerId) return;
                    cleanup();
                }
                function cleanup() {
                    document.removeEventListener("pointermove", move);
                    document.removeEventListener("pointerup", end);
                    document.removeEventListener("pointercancel", end);
                    cleanupDragRef.current = null;
                    if (target.hasPointerCapture(pointerId)) {
                        target.releasePointerCapture(pointerId);
                    }
                }
                document.addEventListener("pointermove", move, { passive: false });
                document.addEventListener("pointerup", end);
                document.addEventListener("pointercancel", end);
                cleanupDragRef.current = cleanup;
                target.setPointerCapture(pointerId);
                inputRef.current?.focus();
                event.preventDefault();
            }}
            onPointerMove={(event) => {
                if (disabled || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
                updateFromPointer(event);
            }}
            onPointerUp={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                    event.currentTarget.releasePointerCapture(event.pointerId);
                }
            }}
            onPointerCancel={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                    event.currentTarget.releasePointerCapture(event.pointerId);
                }
            }}
        >
            <div
                aria-hidden="true"
                className={cn(
                    "absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 rounded-full ring-(--diamond-border,#d9d5cc) ring-1",
                    trackClassName,
                )}
                style={trackStyle}
            />
            <span
                aria-hidden="true"
                className={cn(
                    colorSliderThumbCls,
                    focused &&
                        "ring-(--diamond-accent,#2b7fff)/25 ring-4 ring-offset-(--diamond-surface,#fff) ring-offset-1",
                )}
                style={{ left: `${pct}%` }}
            />
            <input
                ref={inputRef}
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(event) => onValueChange(Number(event.target.value))}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                aria-label={label}
                aria-valuetext={ariaValueText}
                disabled={disabled}
                className={colorSliderInputCls}
            />
        </div>
    );
}

interface HslSliderRowProps {
    label: string;
    name: string;
    value: number;
    min: number;
    max: number;
    trackStyle?: React.CSSProperties;
    disabled?: boolean;
    onValueChange: (next: number) => void;
}

function HslSliderRow({ label, name, value, min, max, trackStyle, disabled, onValueChange }: HslSliderRowProps) {
    return (
        <div className="grid w-full min-w-0 grid-cols-[1.5rem_minmax(0,1fr)_3rem] items-center gap-2 text-[12px]">
            <span className="w-6 font-mono text-(--diamond-muted,#6b6862) uppercase">{label}</span>
            <ColorSlider
                label={name}
                min={min}
                max={max}
                value={value}
                onValueChange={onValueChange}
                ariaValueText={label === "H" ? `${value} degrees` : `${value}%`}
                disabled={disabled}
                trackStyle={trackStyle}
            />
            <span className="w-10 text-right font-mono text-(--diamond-muted,#6b6862)">{value}</span>
        </div>
    );
}

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
    const fallbackColor = normalizeHex(defaultValue);
    const safeValue = normalizeHex(value, fallbackColor);
    const [hexDraft, setHexDraft] = React.useState(() => safeValue.replace("#", "").toUpperCase());
    const [hslDraft, setHslDraft] = React.useState<[number, number, number]>(() => hexToHsl(safeValue));
    const set = (next: string) => {
        if (!isControlled) setInternal(next);
        onValueChange?.(next);
    };
    React.useEffect(() => {
        const next = normalizeHex(value, fallbackColor);
        setHexDraft(next.replace("#", "").toUpperCase());
        setHslDraft(hexToHsl(next));
    }, [value, fallbackColor]);
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
                            "size-8 cursor-pointer rounded-md outline-none transition-transform hover:scale-105 focus-visible:ring-(--diamond-accent,#2b7fff) focus-visible:ring-2 focus-visible:ring-offset-2",
                            safeValue === normalizeHex(c) && "ring-(--diamond-ink,#1a1917) ring-2 ring-offset-2",
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
                <span
                    aria-hidden="true"
                    className="size-6 rounded-md ring-(--diamond-border,#d9d5cc) ring-1 ring-inset"
                    style={{ background: safeValue }}
                />
                <span className="text-(--diamond-muted,#6b6862) text-[13px]">#</span>
                <input
                    type="text"
                    value={hexDraft}
                    onChange={(e) => {
                        const next = e.target.value
                            .replace(/[^0-9a-f]/gi, "")
                            .slice(0, 6)
                            .toUpperCase();
                        setHexDraft(next);
                        if (next.length === 3 || next.length === 6) set(normalizeHex(next));
                    }}
                    onBlur={() => setHexDraft(safeValue.replace("#", "").toUpperCase())}
                    aria-label="Hex color"
                    inputMode="text"
                    spellCheck={false}
                    disabled={disabled}
                    className="w-20 border-0 bg-transparent font-mono text-[13px] uppercase outline-none"
                />
            </div>
        );
    }

    if (v === "wheel") {
        const [h, s, l] = hexToHsl(safeValue);
        return (
            <div
                ref={ref}
                className={cn("flex w-full max-w-[240px] flex-col items-center gap-2", className)}
                style={inlineStyle}
                {...rest}
            >
                <div
                    className="size-28 rounded-full ring-(--diamond-border,#d9d5cc) ring-1 ring-inset"
                    style={{
                        background: "conic-gradient(red, orange, yellow, green, cyan, blue, magenta, red)",
                    }}
                />
                <ColorSlider
                    label="Hue"
                    min={0}
                    max={360}
                    value={h}
                    onValueChange={(next) => set(hslToHex(next, s > 0 ? s : 70, l > 0 && l < 100 ? l : 50))}
                    ariaValueText={`${h} degrees`}
                    disabled={disabled}
                    trackStyle={{ background: hueGradient }}
                />
                <span className="font-mono text-(--diamond-muted,#6b6862) text-[11px]">H {h}°</span>
            </div>
        );
    }

    if (v === "hsl") {
        const [h, s, l] = hslDraft;
        const setHsl = (next: [number, number, number]) => {
            const normalized: [number, number, number] = [
                clamp(next[0], 0, 360),
                clamp(next[1], 0, 100),
                clamp(next[2], 0, 100),
            ];
            setHslDraft(normalized);
            set(hslToHex(normalized[0], normalized[1], normalized[2]));
        };
        return (
            <div ref={ref} className={cn(wrapperVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
                <div
                    aria-hidden="true"
                    className="h-10 w-full rounded-md ring-(--diamond-border,#d9d5cc) ring-1 ring-inset"
                    style={{ background: `hsl(${h} ${s}% ${l}%)` }}
                />
                <HslSliderRow
                    label="H"
                    name="Hue"
                    value={h}
                    min={0}
                    max={360}
                    trackStyle={{ background: hueGradient }}
                    disabled={disabled}
                    onValueChange={(n) => setHsl([n, s, l])}
                />
                <HslSliderRow
                    label="S"
                    name="Saturation"
                    value={s}
                    min={0}
                    max={100}
                    trackStyle={{ background: `linear-gradient(to right, hsl(${h} 0% ${l}%), hsl(${h} 100% ${l}%))` }}
                    disabled={disabled}
                    onValueChange={(n) => setHsl([h, n, l])}
                />
                <HslSliderRow
                    label="L"
                    name="Lightness"
                    value={l}
                    min={0}
                    max={100}
                    trackStyle={{
                        background: `linear-gradient(to right, hsl(${h} ${s}% 0%), hsl(${h} ${s}% 50%), hsl(${h} ${s}% 100%))`,
                    }}
                    disabled={disabled}
                    onValueChange={(n) => setHsl([h, s, n])}
                />
            </div>
        );
    }

    if (v === "strip") {
        const [h, s, l] = hexToHsl(safeValue);
        return (
            <div ref={ref} className={cn(wrapperVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
                <span
                    aria-hidden="true"
                    className="h-8 w-full rounded-md ring-(--diamond-border,#d9d5cc) ring-1 ring-inset"
                    style={{ background: safeValue }}
                />
                <ColorSlider
                    label="Hue"
                    min={0}
                    max={360}
                    value={h}
                    onValueChange={(next) => set(hslToHex(next, s > 0 ? s : 70, l > 0 && l < 100 ? l : 50))}
                    ariaValueText={`${h} degrees`}
                    disabled={disabled}
                    trackStyle={{ background: hueGradient }}
                />
            </div>
        );
    }

    /* shades */
    const [h, s] = hexToHsl(safeValue);
    const shades = [10, 25, 40, 55, 70, 85];
    return (
        <div ref={ref} className={cn(wrapperVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
            <span
                aria-hidden="true"
                className="h-6 w-full rounded-md ring-(--diamond-border,#d9d5cc) ring-1 ring-inset"
                style={{ background: safeValue }}
            />
            <div className="grid w-full grid-cols-6 gap-0">
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
                                safeValue === c && "ring-(--diamond-ink,#1a1917) ring-2 ring-offset-1",
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
