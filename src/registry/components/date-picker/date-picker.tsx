"use client";

import { CaretLeft, CaretRight, Calendar as CalendarIcon } from "@phosphor-icons/react";
import * as RadixPopover from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · DatePicker — single-date picker with six visual treatments.
 * `native` renders a real <input type="date">; the others wrap a custom
 * calendar grid in a Radix Popover. State is the ISO date string yyyy-mm-dd. */

export type DatePickerVariant =
    | "calendar"
    | "native"
    | "inline-pill"
    | "big-date"
    | "terminal"
    | "presets";

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

function parseISO(d?: string): Date | null {
    if (!d) return null;
    const [y, m, day] = d.split("-").map(Number);
    if (!y || !m || !day) return null;
    return new Date(y, m - 1, day);
}
function toISO(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}
function formatDisplay(d?: string): string {
    const dt = parseISO(d);
    if (!dt) return "";
    return dt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

const triggerVariants = cva(
    "inline-flex cursor-pointer items-center gap-2 outline-none transition-[border-color,box-shadow]",
    {
        variants: {
            variant: {
                calendar:
                    "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-2.5 text-[14px] data-[state=open]:border-(--diamond-accent,#2b7fff)",
                native: "",
                "inline-pill":
                    "rounded-full bg-(--diamond-surface-alt,#ebe8e1) px-3 py-1.5 font-medium text-(--diamond-ink,#1a1917) text-[12px] hover:bg-(--diamond-border,#d9d5cc)",
                "big-date":
                    "flex-col items-center gap-0 rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-4 py-2.5",
                terminal:
                    "rounded-sm border border-[#2d2c28] bg-[#0a0a08] px-3 py-2.5 font-mono text-[#d4d0c8] text-[13px] before:mr-2 before:text-(--diamond-accent,#2b7fff) before:content-['📅']",
                presets:
                    "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-2.5 text-[14px]",
            },
        },
        defaultVariants: { variant: "calendar" },
    },
);

export interface DatePickerProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
        VariantProps<typeof triggerVariants> {
    /** ISO date string yyyy-mm-dd. */
    value?: string;
    defaultValue?: string;
    onValueChange?: (next: string) => void;
    placeholder?: string;
    disabled?: boolean;
    /** Presets variant — labelled quick-picks (relative to today). */
    presets?: Array<{ id: string; label: string; offsetDays: number }>;
    accent?: string;
    /** Hint label for the native variant. */
    label?: React.ReactNode;
}

const DEFAULT_PRESETS = [
    { id: "today", label: "Today", offsetDays: 0 },
    { id: "tmr", label: "Tomorrow", offsetDays: 1 },
    { id: "wk", label: "+1 week", offsetDays: 7 },
    { id: "mo", label: "+1 month", offsetDays: 30 },
];

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(function DatePicker(
    {
        className,
        variant = "calendar",
        value: valueProp,
        defaultValue,
        onValueChange,
        placeholder = "Pick a date",
        disabled,
        presets = DEFAULT_PRESETS,
        accent,
        label,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "calendar";
    const [internal, setInternal] = React.useState<string | undefined>(defaultValue);
    const isControlled = valueProp !== undefined;
    const selected = isControlled ? valueProp : internal;
    const select = (next: string) => {
        if (!isControlled) setInternal(next);
        onValueChange?.(next);
    };
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const selectedDate = parseISO(selected);
    const [viewMonth, setViewMonth] = React.useState<Date>(() => selectedDate ?? new Date());
    React.useEffect(() => {
        if (selectedDate) setViewMonth(selectedDate);
    }, [selectedDate]);

    if (v === "native") {
        return (
            <div ref={ref} className={cn("inline-flex flex-col gap-1", className)} style={inlineStyle} {...rest}>
                {label ? <span className="font-mono text-[10px] text-(--diamond-muted,#6b6862) uppercase tracking-[0.1em]">{label}</span> : null}
                <input
                    type="date"
                    value={selected ?? ""}
                    onChange={(e) => select(e.target.value)}
                    disabled={disabled}
                    className="w-full max-w-[200px] rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-2.5 text-[14px] outline-none focus-visible:border-(--diamond-accent,#2b7fff) focus-visible:ring-3 focus-visible:ring-(--diamond-accent,#2b7fff)/20"
                />
            </div>
        );
    }

    const grid = (() => {
        const first = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
        const start = new Date(first);
        start.setDate(1 - first.getDay());
        const cells: Date[] = [];
        for (let i = 0; i < 42; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            cells.push(d);
        }
        return cells;
    })();

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
                {grid.map((d) => {
                    const iso = toISO(d);
                    const isCurMonth = d.getMonth() === viewMonth.getMonth();
                    const isSelected = iso === selected;
                    const isToday = iso === toISO(new Date());
                    return (
                        <button
                            key={iso}
                            type="button"
                            onClick={() => select(iso)}
                            className={cn(
                                "inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[12px] transition-colors",
                                !isCurMonth && "text-(--diamond-muted,#9a968e)",
                                isSelected
                                    ? "bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff)"
                                    : isToday
                                      ? "border border-(--diamond-accent,#2b7fff)"
                                      : "hover:bg-(--diamond-surface-alt,#ebe8e1)",
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
                                const d = new Date();
                                d.setDate(d.getDate() + p.offsetDays);
                                select(toISO(d));
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

    const triggerLabel = v === "terminal"
        ? selected ?? "yyyy-mm-dd"
        : selected
          ? formatDisplay(selected)
          : placeholder;

    let triggerNode: React.ReactNode;
    if (v === "big-date" && selectedDate) {
        triggerNode = (
            <>
                <span className="font-mono text-[10px] text-(--diamond-muted,#6b6862) uppercase tracking-[0.1em]">
                    {selectedDate.toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                </span>
                <span className="font-semibold text-3xl leading-none">{selectedDate.getDate()}</span>
                <span className="text-(--diamond-muted,#6b6862) text-[11px]">
                    {selectedDate.toLocaleDateString(undefined, { weekday: "long" })}
                </span>
            </>
        );
    } else {
        triggerNode = (
            <>
                <CalendarIcon size={14} className="text-(--diamond-muted,#6b6862)" />
                <span>{triggerLabel}</span>
            </>
        );
    }

    return (
        <div ref={ref} className={cn("inline-block", className)} style={inlineStyle} {...rest}>
            <RadixPopover.Root>
                <RadixPopover.Trigger asChild disabled={disabled}>
                    <button type="button" className={triggerVariants({ variant: v })}>
                        {triggerNode}
                    </button>
                </RadixPopover.Trigger>
                <RadixPopover.Portal>
                    <RadixPopover.Content
                        align="start"
                        sideOffset={6}
                        className="z-50 outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0"
                    >
                        {calendar}
                    </RadixPopover.Content>
                </RadixPopover.Portal>
            </RadixPopover.Root>
        </div>
    );
});

DatePicker.displayName = "Diamond.DatePicker";

export { triggerVariants as datePickerTriggerVariants, parseISO, toISO };
