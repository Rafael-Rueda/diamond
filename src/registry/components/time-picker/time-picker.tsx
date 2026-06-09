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
function clamp(n: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, n));
}
function parseTime(t?: string): { h: number; m: number } {
    if (!t) return { h: 9, m: 0 };
    const match = /^(\d{1,2}):(\d{1,2})$/.exec(t);
    if (!match) return { h: 9, m: 0 };
    return { h: clamp(Number(match[1]), 0, 23), m: clamp(Number(match[2]), 0, 59) };
}
function toTime(h: number, m: number): string {
    return `${pad(clamp(Math.round(h), 0, 23))}:${pad(clamp(Math.round(m), 0, 59))}`;
}

function to24Hour(h12: number, period: "AM" | "PM"): number {
    const hour = clamp(Math.round(h12), 1, 12);
    if (period === "PM") return hour === 12 ? 12 : hour + 12;
    return hour === 12 ? 0 : hour;
}

function formatTimeLabel(value: string): string {
    const { h, m } = parseTime(value);
    const period = h >= 12 ? "PM" : "AM";
    const hour = ((h + 11) % 12) + 1;
    return `${pad(hour)}:${pad(m)} ${period}`;
}

const triggerVariants = cva("inline-flex items-center gap-2 outline-none", {
    variants: {
        variant: {
            "hhmm-ampm": "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 py-2",
            "big-readout":
                "items-baseline gap-1 font-mono font-semibold text-(--diamond-ink,#1a1917) text-4xl tracking-tight",
            "split-selects": "gap-1.5",
            slots: "flex-wrap gap-1.5",
            analog: "size-36 rounded-full border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff)",
            native: "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-2.5 text-[14px] outline-none focus-visible:border-(--diamond-accent,#2b7fff)",
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

const selectCls =
    "appearance-none rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2 py-1.5 text-[14px] outline-none transition-[border-color,box-shadow] focus-visible:border-(--diamond-accent,#2b7fff) focus-visible:ring-3 focus-visible:ring-(--diamond-accent,#2b7fff)/20";

const inlineInputCls =
    "border-0 bg-transparent text-center outline-none transition-[box-shadow] focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-(--diamond-accent,#2b7fff)/25";

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
    const timeLabel = `${pad(h12)}:${pad(m)} ${ampm}`;
    const ariaLabel = (rest as { "aria-label"?: string })["aria-label"] ?? "Time picker";
    const [hourDraft, setHourDraft] = React.useState(String(h12));
    const [minuteDraft, setMinuteDraft] = React.useState(pad(m));
    const analogPartRef = React.useRef<"hour" | "minute">("minute");
    const clockRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        setHourDraft(String(h12));
        setMinuteDraft(pad(m));
    }, [h12, m]);

    const setHour12 = (next: number, period: "AM" | "PM" = ampm) => set(toTime(to24Hour(next, period), m));
    const setMinute = (next: number) => set(toTime(h, clamp(next, 0, 59)));
    const setPeriod = (period: "AM" | "PM") => set(toTime(to24Hour(h12, period), m));
    const adjustMinutes = (delta: number) => {
        const total = (h * 60 + m + delta + 1440) % 1440;
        set(toTime(Math.floor(total / 60), total % 60));
    };
    const commitHourDraft = () => {
        if (!hourDraft) {
            setHourDraft(String(h12));
            return;
        }
        setHour12(Number(hourDraft));
    };
    const commitMinuteDraft = () => {
        if (!minuteDraft) {
            setMinuteDraft(pad(m));
            return;
        }
        setMinute(Number(minuteDraft));
    };
    const onHourKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            adjustMinutes(60);
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            adjustMinutes(-60);
        }
    };
    const onMinuteKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            adjustMinutes(1);
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            adjustMinutes(-1);
        } else if (event.key === "PageUp") {
            event.preventDefault();
            adjustMinutes(5);
        } else if (event.key === "PageDown") {
            event.preventDefault();
            adjustMinutes(-5);
        } else if (event.key === "Home") {
            event.preventDefault();
            setMinute(0);
        } else if (event.key === "End") {
            event.preventDefault();
            setMinute(59);
        }
    };

    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    if (v === "native") {
        return (
            <input
                ref={ref as never}
                type="time"
                value={value ?? ""}
                onChange={(e) => set(e.target.value)}
                aria-label={ariaLabel}
                disabled={disabled}
                className={cn(triggerVariants({ variant: v }), className)}
                style={inlineStyle}
            />
        );
    }

    if (v === "split-selects") {
        return (
            // biome-ignore lint/a11y/useSemanticElements: Fieldset would change the public div ref and inline visual treatment.
            <div
                ref={ref}
                role="group"
                aria-label={ariaLabel}
                className={cn("inline-flex items-center gap-1.5", className)}
                style={inlineStyle}
                {...rest}
            >
                <select
                    value={h12}
                    onChange={(e) => setHour12(Number(e.target.value))}
                    aria-label="Hour"
                    disabled={disabled}
                    className={selectCls}
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
                    onChange={(e) => setMinute(Number(e.target.value))}
                    aria-label="Minute"
                    disabled={disabled}
                    className={selectCls}
                >
                    {Array.from({ length: 60 }, (_, i) => i).map((n) => (
                        <option key={n} value={n}>
                            {pad(n)}
                        </option>
                    ))}
                </select>
                <select
                    value={ampm}
                    onChange={(e) => setPeriod(e.target.value as "AM" | "PM")}
                    aria-label="Period"
                    disabled={disabled}
                    className={cn(selectCls, "font-mono text-[12px] uppercase")}
                >
                    <option>AM</option>
                    <option>PM</option>
                </select>
            </div>
        );
    }

    if (v === "slots") {
        return (
            // biome-ignore lint/a11y/useSemanticElements: Fieldset would change the public div ref and inline visual treatment.
            <div
                ref={ref}
                role="group"
                aria-label={ariaLabel}
                className={cn("flex max-w-[260px] flex-wrap gap-1.5", className)}
                style={inlineStyle}
                {...rest}
            >
                {slots.map((s) => {
                    const on = s === value;
                    return (
                        <button
                            key={s}
                            type="button"
                            disabled={disabled}
                            onClick={() => set(s)}
                            aria-pressed={on}
                            aria-label={`Select ${formatTimeLabel(s)}`}
                            className={cn(
                                "inline-flex h-8 cursor-pointer items-center rounded-md border px-3 font-mono text-[12px] transition-colors focus-visible:outline-none focus-visible:ring-(--diamond-accent,#2b7fff)/25 focus-visible:ring-3",
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
            // biome-ignore lint/a11y/useSemanticElements: Fieldset would change the public div ref and inline visual treatment.
            <div
                ref={ref}
                role="group"
                aria-label={ariaLabel}
                className={cn(triggerVariants({ variant: v }), className)}
                style={inlineStyle}
                {...rest}
            >
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={hourDraft}
                    onChange={(e) => {
                        const next = e.target.value.replace(/\D/g, "").slice(0, 2);
                        setHourDraft(next);
                        if (next) setHour12(Number(next));
                    }}
                    onBlur={commitHourDraft}
                    onKeyDown={onHourKeyDown}
                    aria-label="Hour"
                    disabled={disabled}
                    className={cn(inlineInputCls, "w-[2ch] font-[inherit] text-inherit")}
                />
                <span className="text-(--diamond-muted,#9a968e)">:</span>
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={minuteDraft}
                    onChange={(e) => {
                        const next = e.target.value.replace(/\D/g, "").slice(0, 2);
                        setMinuteDraft(next);
                        if (next) setMinute(Number(next));
                    }}
                    onBlur={commitMinuteDraft}
                    onKeyDown={onMinuteKeyDown}
                    aria-label="Minute"
                    disabled={disabled}
                    className={cn(inlineInputCls, "w-[2ch] font-[inherit] text-inherit")}
                />
                <button
                    type="button"
                    onClick={() => setPeriod(ampm === "PM" ? "AM" : "PM")}
                    disabled={disabled}
                    aria-label={`Switch to ${ampm === "PM" ? "AM" : "PM"}`}
                    className="ml-2 cursor-pointer rounded px-1.5 py-0.5 text-(--diamond-muted,#6b6862) text-[14px] outline-none transition-colors hover:bg-(--diamond-surface-alt,#ebe8e1) focus-visible:ring-(--diamond-accent,#2b7fff)/25 focus-visible:ring-3"
                >
                    {ampm}
                </button>
            </div>
        );
    }

    if (v === "analog") {
        const minuteAngle = (m / 60) * 360 - 90;
        const hourAngle = ((h % 12) / 12) * 360 + (m / 60) * 30 - 90;
        const readClockPointer = (event: React.PointerEvent<HTMLButtonElement>, forcedPart?: "hour" | "minute") => {
            const rect = clockRef.current?.getBoundingClientRect();
            if (!rect) return null;
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = event.clientX - cx;
            const dy = event.clientY - cy;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
            const normalizedAngle = (angle + 90 + 360) % 360;
            const part = forcedPart ?? (distance < rect.width * 0.28 ? "hour" : "minute");
            if (part === "hour") {
                const nextHour = Math.round(normalizedAngle / 30) || 12;
                return { part, value: clamp(nextHour, 1, 12) };
            }
            return { part, value: Math.round(normalizedAngle / 6) % 60 };
        };
        const applyClockPointer = (event: React.PointerEvent<HTMLButtonElement>, forcedPart?: "hour" | "minute") => {
            const next = readClockPointer(event, forcedPart);
            if (!next) return;
            analogPartRef.current = next.part;
            if (next.part === "hour") setHour12(next.value);
            else setMinute(next.value);
        };
        const onClockPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
            if (disabled || event.button !== 0) return;
            applyClockPointer(event);
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.focus();
            event.preventDefault();
        };
        const onClockPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
            if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
            applyClockPointer(event, analogPartRef.current);
        };
        const onClockPointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
            }
        };
        return (
            // biome-ignore lint/a11y/useSemanticElements: Fieldset would change the public div ref and inline visual treatment.
            <div
                ref={ref}
                role="group"
                aria-label={ariaLabel}
                className={cn("inline-flex flex-col items-center gap-2", className)}
                style={inlineStyle}
                {...rest}
            >
                <button
                    ref={clockRef}
                    type="button"
                    tabIndex={disabled ? -1 : 0}
                    aria-label={`Clock face, ${timeLabel}`}
                    disabled={disabled}
                    className={cn(
                        "relative touch-none outline-none focus-visible:ring-(--diamond-accent,#2b7fff)/25 focus-visible:ring-3",
                        triggerVariants({ variant: v }),
                    )}
                    onPointerDown={onClockPointerDown}
                    onPointerMove={onClockPointerMove}
                    onPointerUp={onClockPointerUp}
                    onPointerCancel={onClockPointerUp}
                    onKeyDown={(event) => {
                        if (disabled) return;
                        if (event.key === "ArrowUp" || event.key === "ArrowRight") {
                            event.preventDefault();
                            adjustMinutes(1);
                        } else if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
                            event.preventDefault();
                            adjustMinutes(-1);
                        } else if (event.key === "PageUp") {
                            event.preventDefault();
                            adjustMinutes(5);
                        } else if (event.key === "PageDown") {
                            event.preventDefault();
                            adjustMinutes(-5);
                        }
                    }}
                >
                    <div className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--diamond-ink,#1a1917)" />
                    {[12, 3, 6, 9].map((n) => {
                        const angle = ((n / 12) * 360 - 90) * (Math.PI / 180);
                        const r = 50;
                        return (
                            <span
                                key={n}
                                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 font-mono text-(--diamond-muted,#6b6862) text-[10px]"
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
                        className="pointer-events-none absolute top-1/2 left-1/2 h-9 w-[2px] origin-top -translate-x-1/2 rounded bg-(--diamond-ink,#1a1917)"
                        style={{
                            transform: `translateX(-50%) rotate(${hourAngle + 90}deg)`,
                            transformOrigin: "top center",
                        }}
                    />
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 left-1/2 h-12 w-px origin-top -translate-x-1/2 rounded bg-(--diamond-accent,#2b7fff)"
                        style={{
                            transform: `translateX(-50%) rotate(${minuteAngle + 90}deg)`,
                            transformOrigin: "top center",
                        }}
                    />
                </button>
                <input
                    type="time"
                    value={toTime(h, m)}
                    onChange={(event) => set(event.target.value)}
                    aria-label="Time"
                    disabled={disabled}
                    className="w-36 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 py-2 text-center font-mono text-[13px] outline-none focus-visible:border-(--diamond-accent,#2b7fff) focus-visible:ring-(--diamond-accent,#2b7fff)/20 focus-visible:ring-3"
                />
            </div>
        );
    }

    /* hhmm-ampm — three inline inputs */
    return (
        // biome-ignore lint/a11y/useSemanticElements: Fieldset would change the public div ref and inline visual treatment.
        <div
            ref={ref}
            role="group"
            aria-label={ariaLabel}
            className={cn(triggerVariants({ variant: v }), "font-mono text-[14px]", className)}
            style={inlineStyle}
            {...rest}
        >
            <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={hourDraft}
                onChange={(e) => {
                    const next = e.target.value.replace(/\D/g, "").slice(0, 2);
                    setHourDraft(next);
                    if (next) setHour12(Number(next));
                }}
                onBlur={commitHourDraft}
                onKeyDown={onHourKeyDown}
                aria-label="Hour"
                disabled={disabled}
                className={cn(inlineInputCls, "w-8")}
            />
            <span className="text-(--diamond-muted,#9a968e)">:</span>
            <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={minuteDraft}
                onChange={(e) => {
                    const next = e.target.value.replace(/\D/g, "").slice(0, 2);
                    setMinuteDraft(next);
                    if (next) setMinute(Number(next));
                }}
                onBlur={commitMinuteDraft}
                onKeyDown={onMinuteKeyDown}
                aria-label="Minute"
                disabled={disabled}
                className={cn(inlineInputCls, "w-9")}
            />
            <button
                type="button"
                onClick={() => setPeriod(ampm === "PM" ? "AM" : "PM")}
                disabled={disabled}
                aria-label={`Switch to ${ampm === "PM" ? "AM" : "PM"}`}
                className="cursor-pointer rounded bg-(--diamond-surface-alt,#ebe8e1) px-1.5 py-0.5 text-[11px] outline-none transition-colors hover:text-(--diamond-accent,#2b7fff) focus-visible:ring-(--diamond-accent,#2b7fff)/25 focus-visible:ring-3"
            >
                {ampm}
            </button>
        </div>
    );
});

TimePicker.displayName = "Diamond.TimePicker";

export { triggerVariants as timePickerVariants };
