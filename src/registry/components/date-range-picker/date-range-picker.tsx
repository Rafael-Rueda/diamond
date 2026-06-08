"use client";

import { Calendar as CalendarIcon, CaretLeft, CaretRight } from "@phosphor-icons/react";
import * as RadixPopover from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · DateRangePicker — pick a start + end ISO date. Six layouts.
 * State is `{ start?: string; end?: string }`. */

export type DateRangeVariant =
    | "pill-span"
    | "calendar-range"
    | "presets"
    | "twin-native"
    | "stacked-cards"
    | "duration-bar";

const MONTH_LABELS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export interface DateRangeValue {
    start?: string;
    end?: string;
}

function parseISO(d?: string): Date | null {
    if (!d) return null;
    const [y, m, day] = d.split("-").map(Number);
    if (!y || !m || !day) return null;
    return new Date(y, m - 1, day);
}
function toISO(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function formatShort(d?: string): string {
    const dt = parseISO(d);
    if (!dt) return "—";
    return dt.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
function daysBetween(s?: string, e?: string): number {
    const a = parseISO(s);
    const b = parseISO(e);
    if (!a || !b) return 0;
    return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

const triggerVariants = cva("inline-flex cursor-pointer items-center outline-none", {
    variants: {
        variant: {
            "pill-span":
                "gap-1.5 rounded-full bg-(--diamond-surface-alt,#ebe8e1) px-3 py-1.5 font-medium text-(--diamond-ink,#1a1917) text-[12px] hover:bg-(--diamond-border,#d9d5cc)",
            "calendar-range":
                "gap-2 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-2.5 text-[14px]",
            presets:
                "gap-2 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-2.5 text-[14px]",
            "twin-native": "",
            "stacked-cards": "",
            "duration-bar": "",
        },
    },
    defaultVariants: { variant: "calendar-range" },
});

export interface DateRangePickerProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
        VariantProps<typeof triggerVariants> {
    value?: DateRangeValue;
    defaultValue?: DateRangeValue;
    onValueChange?: (next: DateRangeValue) => void;
    presets?: Array<{ id: string; label: string; days: number }>;
    accent?: string;
    disabled?: boolean;
}

const DEFAULT_PRESETS = [
    { id: "7", label: "Last 7 days", days: 7 },
    { id: "30", label: "Last 30 days", days: 30 },
    { id: "90", label: "Last 90 days", days: 90 },
];

export const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(function DateRangePicker(
    {
        className,
        variant = "calendar-range",
        value: valueProp,
        defaultValue = {},
        onValueChange,
        presets = DEFAULT_PRESETS,
        accent,
        disabled,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "calendar-range";
    const [internal, setInternal] = React.useState<DateRangeValue>(defaultValue);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internal;
    const set = (next: DateRangeValue) => {
        if (!isControlled) setInternal(next);
        onValueChange?.(next);
    };
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const [viewMonth, setViewMonth] = React.useState<Date>(() => parseISO(value.start) ?? new Date());

    const cells = (() => {
        const first = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
        const start = new Date(first);
        start.setDate(1 - first.getDay());
        return Array.from({ length: 42 }, (_, i) => {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            return d;
        });
    })();

    const onDayClick = (iso: string) => {
        if (!value.start || (value.start && value.end)) {
            set({ start: iso });
        } else if (iso < value.start) {
            set({ start: iso });
        } else {
            set({ start: value.start, end: iso });
        }
    };

    const calendar = (
        <div className="w-[260px] rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]">
            <div className="flex items-center justify-between pb-2">
                <button
                    type="button"
                    onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1))}
                    aria-label="Previous month"
                    className="inline-flex size-7 cursor-pointer items-center justify-center rounded text-(--diamond-muted,#6b6862) hover:bg-(--diamond-surface-alt,#ebe8e1)"
                >
                    <CaretLeft size={14} weight="bold" />
                </button>
                <span className="font-semibold text-[13px]">
                    {MONTH_LABELS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
                </span>
                <button
                    type="button"
                    onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1))}
                    aria-label="Next month"
                    className="inline-flex size-7 cursor-pointer items-center justify-center rounded text-(--diamond-muted,#6b6862) hover:bg-(--diamond-surface-alt,#ebe8e1)"
                >
                    <CaretRight size={14} weight="bold" />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-0.5 pb-1 text-center font-mono text-[10px] text-(--diamond-muted,#9a968e) uppercase tracking-[0.1em]">
                {WEEKDAYS.map((d, i) => (
                    <span
                        // biome-ignore lint/suspicious/noArrayIndexKey: positional weekday header
                        key={i}
                    >
                        {d}
                    </span>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-0.5">
                {cells.map((d) => {
                    const iso = toISO(d);
                    const inMonth = d.getMonth() === viewMonth.getMonth();
                    const isStart = iso === value.start;
                    const isEnd = iso === value.end;
                    const inRange = !!value.start && !!value.end && iso > value.start && iso < value.end;
                    return (
                        <button
                            key={iso}
                            type="button"
                            onClick={() => onDayClick(iso)}
                            className={cn(
                                "inline-flex h-8 w-8 cursor-pointer items-center justify-center text-[12px] transition-colors",
                                !inMonth && "text-(--diamond-muted,#9a968e)",
                                isStart || isEnd
                                    ? "rounded-full bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff)"
                                    : inRange
                                      ? "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_15%,white)] text-(--diamond-accent,#2b7fff)"
                                      : "rounded-full hover:bg-(--diamond-surface-alt,#ebe8e1)",
                            )}
                        >
                            {d.getDate()}
                        </button>
                    );
                })}
            </div>
            {v === "presets" ? (
                <div className="mt-2 flex flex-wrap gap-1.5 border-(--diamond-border,#d9d5cc) border-t pt-2">
                    {presets.map((p) => (
                        <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                                const end = new Date();
                                const start = new Date();
                                start.setDate(end.getDate() - p.days + 1);
                                set({ start: toISO(start), end: toISO(end) });
                            }}
                            className="inline-flex h-7 cursor-pointer items-center rounded-full bg-(--diamond-surface-alt,#ebe8e1) px-2.5 font-medium text-(--diamond-ink,#1a1917) text-[11px] hover:bg-(--diamond-border,#d9d5cc)"
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            ) : null}
        </div>
    );

    if (v === "twin-native") {
        return (
            <div ref={ref} className={cn("inline-flex items-center gap-2", className)} style={inlineStyle} {...rest}>
                <input
                    type="date"
                    value={value.start ?? ""}
                    onChange={(e) => set({ ...value, start: e.target.value })}
                    disabled={disabled}
                    className="w-[140px] rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 py-2 text-[13px] outline-none focus-visible:border-(--diamond-accent,#2b7fff)"
                />
                <span className="text-(--diamond-muted,#9a968e)">→</span>
                <input
                    type="date"
                    value={value.end ?? ""}
                    onChange={(e) => set({ ...value, end: e.target.value })}
                    disabled={disabled}
                    className="w-[140px] rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 py-2 text-[13px] outline-none focus-visible:border-(--diamond-accent,#2b7fff)"
                />
            </div>
        );
    }

    if (v === "stacked-cards") {
        return (
            <div ref={ref} className={cn("flex flex-col gap-1.5", className)} style={inlineStyle} {...rest}>
                <div className="flex w-[200px] flex-col rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 py-2">
                    <span className="font-mono text-[10px] text-(--diamond-muted,#6b6862) uppercase tracking-[0.1em]">From</span>
                    <input
                        type="date"
                        value={value.start ?? ""}
                        onChange={(e) => set({ ...value, start: e.target.value })}
                        disabled={disabled}
                        className="border-0 bg-transparent p-0 text-[14px] outline-none"
                    />
                </div>
                <div className="flex w-[200px] flex-col rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 py-2">
                    <span className="font-mono text-[10px] text-(--diamond-muted,#6b6862) uppercase tracking-[0.1em]">To</span>
                    <input
                        type="date"
                        value={value.end ?? ""}
                        onChange={(e) => set({ ...value, end: e.target.value })}
                        disabled={disabled}
                        className="border-0 bg-transparent p-0 text-[14px] outline-none"
                    />
                </div>
            </div>
        );
    }

    if (v === "duration-bar") {
        const total = daysBetween(value.start, value.end);
        return (
            <div ref={ref} className={cn("w-[260px] rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-3", className)} style={inlineStyle} {...rest}>
                <div className="mb-2 flex items-center justify-between text-[12px]">
                    <span className="font-mono text-(--diamond-muted,#6b6862) text-[10px] uppercase tracking-[0.1em]">
                        Duration
                    </span>
                    <span className="font-semibold">{total} {total === 1 ? "day" : "days"}</span>
                </div>
                <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-(--diamond-surface-alt,#ebe8e1)">
                    <span
                        className="block h-full rounded-full bg-(--diamond-accent,#2b7fff)"
                        style={{ width: `${Math.min(100, (total / 90) * 100)}%` }}
                    />
                </div>
                <div className="flex justify-between text-(--diamond-muted,#6b6862) text-[11px]">
                    <span>{formatShort(value.start)}</span>
                    <span>{formatShort(value.end)}</span>
                </div>
            </div>
        );
    }

    return (
        <div ref={ref} className={cn("inline-block", className)} style={inlineStyle} {...rest}>
            <RadixPopover.Root>
                <RadixPopover.Trigger asChild disabled={disabled}>
                    <button type="button" className={triggerVariants({ variant: v })}>
                        <CalendarIcon size={14} className="text-(--diamond-muted,#6b6862)" />
                        <span>
                            {formatShort(value.start)} – {formatShort(value.end)}
                        </span>
                    </button>
                </RadixPopover.Trigger>
                <RadixPopover.Portal>
                    <RadixPopover.Content align="start" sideOffset={6} className="z-50 outline-none">
                        {calendar}
                    </RadixPopover.Content>
                </RadixPopover.Portal>
            </RadixPopover.Root>
        </div>
    );
});

DateRangePicker.displayName = "Diamond.DateRangePicker";

export { triggerVariants as dateRangePickerVariants };
