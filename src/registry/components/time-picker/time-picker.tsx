"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · TimePicker — six visual treatments. State is a HH:MM string in
 * 24-hour form; the picker renders 12-hour with AM/PM where appropriate.
 * The native variant uses the real <input type="time"> for full keyboard
 * + system picker support. */

export type TimePickerVariant = "hhmm-ampm" | "big-readout" | "split-selects" | "slots" | "analog" | "native";

function pad(n: number, w = 2): string {
    return String(n).padStart(w, "0");
}
function parseTime(t?: string): { h: number; m: number } {
    if (!t) return { h: 9, m: 0 };
    const [h, m] = t.split(":").map(Number);
    return { h: h ?? 9, m: m ?? 0 };
}
function toTime(h: number, m: number): string {
    return `${pad(h)}:${pad(m)}`;
}

const triggerVariants = cva("inline-flex items-center gap-2 outline-none", {
    variants: {
        variant: {
            "hhmm-ampm":
                "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 py-2",
            "big-readout":
                "items-baseline gap-1 font-mono font-semibold text-(--diamond-ink,#1a1917) text-4xl tracking-tight",
            "split-selects": "gap-1.5",
            slots: "flex-wrap gap-1.5",
            analog: "size-36 rounded-full border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff)",
            native:
                "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-2.5 text-[14px] outline-none focus-visible:border-(--diamond-accent,#2b7fff)",
        },
    },
    defaultVariants: { variant: "hhmm-ampm" },
});

export interface TimePickerProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
        VariantProps<typeof triggerVariants> {
    /** HH:MM (24h) string. */
    value?: string;
    defaultValue?: string;
    onValueChange?: (next: string) => void;
    /** slots variant — list of time slots (HH:MM). */
    slots?: string[];
    accent?: string;
    disabled?: boolean;
}

const DEFAULT_SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "13:00", "13:30", "14:00"];

export const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(function TimePicker(
    {
        className,
        variant = "hhmm-ampm",
        value: valueProp,
        defaultValue,
        onValueChange,
        slots = DEFAULT_SLOTS,
        accent,
        disabled,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "hhmm-ampm";
    const [internal, setInternal] = React.useState<string | undefined>(defaultValue);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internal;
    const set = (next: string) => {
        if (!isControlled) setInternal(next);
        onValueChange?.(next);
    };
    const { h, m } = parseTime(value);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = ((h + 11) % 12) + 1;

    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    if (v === "native") {
        return (
            <input
                ref={ref as never}
                type="time"
                value={value ?? ""}
                onChange={(e) => set(e.target.value)}
                disabled={disabled}
                className={cn(triggerVariants({ variant: v }), className)}
                style={inlineStyle}
            />
        );
    }

    if (v === "split-selects") {
        return (
            <div ref={ref} className={cn("inline-flex items-center gap-1.5", className)} style={inlineStyle} {...rest}>
                <select
                    value={h12}
                    onChange={(e) => {
                        const nh = Number(e.target.value);
                        const next = ampm === "PM" ? (nh === 12 ? 12 : nh + 12) : nh === 12 ? 0 : nh;
                        set(toTime(next, m));
                    }}
                    disabled={disabled}
                    className="appearance-none rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2 py-1.5 text-[14px] outline-none"
                >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>
                <span className="font-mono text-(--diamond-muted,#6b6862)">:</span>
                <select
                    value={m}
                    onChange={(e) => set(toTime(h, Number(e.target.value)))}
                    disabled={disabled}
                    className="appearance-none rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2 py-1.5 text-[14px] outline-none"
                >
                    {Array.from({ length: 60 }, (_, i) => i).map((n) => (
                        <option key={n} value={n}>
                            {pad(n)}
                        </option>
                    ))}
                </select>
                <select
                    value={ampm}
                    onChange={(e) => {
                        const next = e.target.value === "PM" ? (h % 12) + 12 : h % 12;
                        set(toTime(next, m));
                    }}
                    disabled={disabled}
                    className="appearance-none rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2 py-1.5 font-mono text-[12px] uppercase outline-none"
                >
                    <option>AM</option>
                    <option>PM</option>
                </select>
            </div>
        );
    }

    if (v === "slots") {
        return (
            <div ref={ref} className={cn("flex max-w-[260px] flex-wrap gap-1.5", className)} style={inlineStyle} {...rest}>
                {slots.map((s) => {
                    const on = s === value;
                    return (
                        <button
                            key={s}
                            type="button"
                            disabled={disabled}
                            onClick={() => set(s)}
                            className={cn(
                                "inline-flex h-8 cursor-pointer items-center rounded-md border px-3 font-mono text-[12px] transition-colors",
                                on
                                    ? "border-(--diamond-accent,#2b7fff) bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff)"
                                    : "border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) hover:border-(--diamond-accent,#2b7fff)",
                            )}
                        >
                            {s}
                        </button>
                    );
                })}
            </div>
        );
    }

    if (v === "big-readout") {
        return (
            <div ref={ref} className={cn(triggerVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
                <span>{pad(h12)}</span>
                <span className="text-(--diamond-muted,#9a968e)">:</span>
                <span>{pad(m)}</span>
                <span className="ml-2 text-(--diamond-muted,#6b6862) text-[14px]">{ampm}</span>
            </div>
        );
    }

    if (v === "analog") {
        const minuteAngle = (m / 60) * 360 - 90;
        const hourAngle = ((h % 12) / 12) * 360 + (m / 60) * 30 - 90;
        return (
            <div ref={ref} className={cn("relative", triggerVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
                <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-1.5 rounded-full bg-(--diamond-ink,#1a1917)" />
                {[12, 3, 6, 9].map((n) => {
                    const angle = ((n / 12) * 360 - 90) * (Math.PI / 180);
                    const r = 50;
                    return (
                        <span
                            key={n}
                            className="-translate-x-1/2 -translate-y-1/2 absolute font-mono text-[10px] text-(--diamond-muted,#6b6862)"
                            style={{
                                top: `calc(50% + ${Math.sin(angle) * r}px)`,
                                left: `calc(50% + ${Math.cos(angle) * r}px)`,
                            }}
                        >
                            {n}
                        </span>
                    );
                })}
                <span
                    aria-hidden="true"
                    className="-translate-x-1/2 absolute top-1/2 left-1/2 h-9 w-[2px] origin-top rounded bg-(--diamond-ink,#1a1917)"
                    style={{ transform: `translateX(-50%) rotate(${hourAngle + 90}deg)`, transformOrigin: "top center" }}
                />
                <span
                    aria-hidden="true"
                    className="-translate-x-1/2 absolute top-1/2 left-1/2 h-12 w-px origin-top rounded bg-(--diamond-accent,#2b7fff)"
                    style={{ transform: `translateX(-50%) rotate(${minuteAngle + 90}deg)`, transformOrigin: "top center" }}
                />
            </div>
        );
    }

    /* hhmm-ampm — three inline inputs */
    return (
        <div ref={ref} className={cn(triggerVariants({ variant: v }), "font-mono text-[14px]", className)} style={inlineStyle} {...rest}>
            <input
                type="number"
                min={1}
                max={12}
                value={h12}
                onChange={(e) => {
                    const nh = Math.max(1, Math.min(12, Number(e.target.value) || 1));
                    const next = ampm === "PM" ? (nh === 12 ? 12 : nh + 12) : nh === 12 ? 0 : nh;
                    set(toTime(next, m));
                }}
                disabled={disabled}
                className="w-8 border-0 bg-transparent text-center outline-none"
            />
            <span className="text-(--diamond-muted,#9a968e)">:</span>
            <input
                type="number"
                min={0}
                max={59}
                value={pad(m)}
                onChange={(e) => set(toTime(h, Math.max(0, Math.min(59, Number(e.target.value) || 0))))}
                disabled={disabled}
                className="w-9 border-0 bg-transparent text-center outline-none"
            />
            <button
                type="button"
                onClick={() => {
                    const next = ampm === "PM" ? h - 12 : h + 12;
                    set(toTime((next + 24) % 24, m));
                }}
                disabled={disabled}
                className="cursor-pointer rounded bg-(--diamond-surface-alt,#ebe8e1) px-1.5 py-0.5 text-[11px]"
            >
                {ampm}
            </button>
        </div>
    );
});

TimePicker.displayName = "Diamond.TimePicker";

export { triggerVariants as timePickerVariants };
