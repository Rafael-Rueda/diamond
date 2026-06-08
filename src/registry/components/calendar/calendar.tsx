"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Calendar — month / week / agenda / year / range with fully customizable click handlers and render overrides. */

export type CalendarVariant = "month" | "minimal" | "week" | "agenda" | "year" | "range";

const calendarVariants = cva(
    "inline-block rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-3 text-(--diamond-ink,#1a1917)",
    {
        variants: {
            variant: {
                month: "min-w-[260px]",
                minimal: "min-w-[240px]",
                week: "min-w-[260px]",
                agenda: "min-w-[260px] border-0 bg-transparent p-0",
                year: "min-w-[280px]",
                range: "min-w-[260px]",
            },
        },
        defaultVariants: { variant: "month" },
    },
);

export interface CalendarEvent {
    /** ISO date or Date. */
    date: string | Date;
    label?: React.ReactNode;
    /** Override marker color. */
    color?: string;
    /** Arbitrary metadata accessible in renderDay / callbacks. */
    meta?: Record<string, unknown>;
}

export interface CalendarAgendaItem {
    date: Date;
    title: React.ReactNode;
    time?: React.ReactNode;
    /** Arbitrary metadata accessible in onAgendaItemClick / renderAgendaItem. */
    meta?: Record<string, unknown>;
}

export interface DayRenderInfo {
    date: Date;
    /** Day belongs to a different month than the displayed one. */
    muted: boolean;
    isToday: boolean;
    isSelected: boolean;
    inRange: boolean;
    /** Event registered for this date, if any. */
    event?: CalendarEvent;
    /** Default Tailwind class string Diamond would have applied. */
    defaultClassName: string;
    /** Default click handler — fires `onDayClick` + `onSelect` if set. */
    handleClick: () => void;
}

export interface MonthRenderInfo {
    index: number;
    /** Localized short month name. */
    name: string;
    isCurrent: boolean;
    isHighlighted: boolean;
    defaultClassName: string;
    handleClick: () => void;
}

export interface AgendaItemRenderInfo {
    item: CalendarAgendaItem;
    index: number;
    defaultClassName: string;
    handleClick: () => void;
}

export interface CalendarProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onSelect">,
        VariantProps<typeof calendarVariants> {
    /** First day of the displayed month. Defaults to today. */
    month?: Date;
    /** Events to dot/highlight. */
    events?: CalendarEvent[];
    /** Selected single date (controlled-style highlight; component never sets state on its own). */
    selected?: Date | null;
    /** Range selection highlight. */
    range?: { start: Date; end: Date } | null;
    /** Week-day header labels (defaults Sun-Sat). */
    weekdays?: string[];
    /** First day of week (0=Sun, 1=Mon). */
    weekStartsOn?: 0 | 1;
    /** Year grid: month indices to highlight (0..11). */
    highlightedMonths?: number[];
    /** Year grid: month index considered "current". */
    currentMonth?: number;
    /** Agenda variant items. */
    agenda?: CalendarAgendaItem[];

    /** Generic day click — fires for every cell. Default does nothing. */
    onDayClick?: (date: Date, event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Convenience alias for `onDayClick`. */
    onSelect?: (date: Date) => void;
    /** Month cell click (`year` variant). Default does nothing. */
    onMonthClick?: (monthIndex: number, event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Agenda item click (`agenda` variant). Default does nothing. */
    onAgendaItemClick?: (item: CalendarAgendaItem, index: number, event: React.MouseEvent<HTMLButtonElement>) => void;

    /** Full override of a day cell. Receive defaults + helpers; return any JSX. */
    renderDay?: (info: DayRenderInfo) => React.ReactNode;
    /** Full override of a year-grid month cell. */
    renderMonth?: (info: MonthRenderInfo) => React.ReactNode;
    /** Full override of an agenda row. */
    renderAgendaItem?: (info: AgendaItemRenderInfo) => React.ReactNode;

    accent?: string;
    onPrevMonth?: () => void;
    onNextMonth?: () => void;
}

const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const inRange = (d: Date, r: { start: Date; end: Date }) => {
    const t = d.getTime();
    return t >= r.start.getTime() && t <= r.end.getTime();
};

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
    {
        className,
        variant = "month",
        month,
        events = [],
        selected,
        onDayClick,
        onSelect,
        onMonthClick,
        onAgendaItemClick,
        renderDay,
        renderMonth,
        renderAgendaItem,
        range,
        weekdays,
        weekStartsOn = 0,
        highlightedMonths = [],
        currentMonth,
        agenda,
        accent,
        style,
        onPrevMonth,
        onNextMonth,
        ...rest
    },
    ref,
) {
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;
    const today = new Date();
    const m = month ?? new Date(today.getFullYear(), today.getMonth(), 1);

    const dows =
        weekdays ?? (weekStartsOn === 1 ? ["M", "T", "W", "T", "F", "S", "S"] : ["S", "M", "T", "W", "T", "F", "S"]);

    const eventDates = React.useMemo(() => {
        const map = new Map<string, CalendarEvent>();
        for (const e of events) {
            const d = typeof e.date === "string" ? new Date(e.date) : e.date;
            const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
            map.set(key, e);
        }
        return map;
    }, [events]);

    const buildDays = () => {
        const first = new Date(m.getFullYear(), m.getMonth(), 1);
        const offset = (first.getDay() - weekStartsOn + 7) % 7;
        const days: { date: Date; muted: boolean }[] = [];
        const start = new Date(first);
        start.setDate(first.getDate() - offset);
        for (let i = 0; i < 42; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            days.push({ date: d, muted: d.getMonth() !== m.getMonth() });
        }
        return days;
    };

    if (variant === "agenda" && agenda) {
        return (
            <div ref={ref} className={cn(calendarVariants({ variant }), className)} style={inlineStyle} {...rest}>
                <div className="flex flex-col gap-2">
                    {agenda.map((it, i) => {
                        const defaultClassName =
                            "flex w-full text-left gap-3 rounded-md bg-(--diamond-surface-alt,#ebe8e1) p-2 transition-colors hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_6%,var(--diamond-surface-alt,#ebe8e1))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--diamond-accent,#2b7fff)";
                        const handleClick = () => {};
                        if (renderAgendaItem) {
                            return (
                                <React.Fragment
                                    // biome-ignore lint/suspicious/noArrayIndexKey: agenda items are positional; CalendarAgendaItem has no stable id field
                                    key={i}
                                >
                                    {renderAgendaItem({ item: it, index: i, defaultClassName, handleClick })}
                                </React.Fragment>
                            );
                        }
                        return (
                            <button
                                // biome-ignore lint/suspicious/noArrayIndexKey: agenda items are positional; CalendarAgendaItem has no stable id field
                                key={i}
                                type="button"
                                onClick={(e) => onAgendaItemClick?.(it, i, e)}
                                className={cn(defaultClassName, !onAgendaItemClick && "cursor-default")}
                            >
                                <div className="w-10 shrink-0 text-center">
                                    <div className="font-bold text-(--diamond-accent,#2b7fff) text-[9px] uppercase tracking-[0.12em]">
                                        {MONTHS_SHORT[it.date.getMonth()]}
                                    </div>
                                    <div className="font-semibold text-[18px] leading-none [font-family:Fraunces,Georgia,serif]">
                                        {it.date.getDate()}
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="truncate font-semibold text-[12px]">{it.title}</div>
                                    {it.time && (
                                        <div className="text-(--diamond-muted,#6b6862) text-[10px]">{it.time}</div>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (variant === "year") {
        return (
            <div ref={ref} className={cn(calendarVariants({ variant }), className)} style={inlineStyle} {...rest}>
                <div className="grid grid-cols-4 gap-1.5">
                    {MONTHS_SHORT.map((mo, i) => {
                        const isCurrent = i === currentMonth;
                        const isHi = highlightedMonths.includes(i);
                        const defaultClassName = cn(
                            "rounded-md p-2 text-center text-[11px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--diamond-accent,#2b7fff)",
                            isCurrent
                                ? "bg-(--diamond-accent,#2b7fff) font-semibold text-(--diamond-on-accent,#fff)"
                                : "bg-(--diamond-surface-alt,#ebe8e1) hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_8%,var(--diamond-surface-alt,#ebe8e1))]",
                        );
                        const handleClick = () => {};
                        if (renderMonth) {
                            return (
                                <React.Fragment key={mo}>
                                    {renderMonth({
                                        index: i,
                                        name: mo,
                                        isCurrent,
                                        isHighlighted: isHi,
                                        defaultClassName,
                                        handleClick,
                                    })}
                                </React.Fragment>
                            );
                        }
                        return (
                            <button
                                key={mo}
                                type="button"
                                onClick={(e) => onMonthClick?.(i, e)}
                                className={cn(defaultClassName, !onMonthClick && "cursor-default")}
                            >
                                {mo}
                                <div
                                    className={cn(
                                        "mt-1 flex h-1.5 items-center justify-center gap-0.5",
                                        isCurrent ? "text-white/80" : "text-(--diamond-muted,#6b6862)",
                                    )}
                                    aria-hidden="true"
                                >
                                    {isCurrent ? (
                                        <>
                                            <span className="block size-0.75 rounded-full bg-current" />
                                            <span className="block size-0.75 rounded-full bg-current" />
                                            <span className="block size-0.75 rounded-full bg-current" />
                                        </>
                                    ) : isHi ? (
                                        <span className="block size-0.75 rounded-full bg-current" />
                                    ) : (
                                        <span className="block size-0.75 rounded-full border border-current/50" />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    const days = buildDays();

    return (
        <div ref={ref} className={cn(calendarVariants({ variant }), className)} style={inlineStyle} {...rest}>
            <div className="mb-2 flex items-center justify-between">
                {onPrevMonth ? (
                    <button
                        type="button"
                        onClick={onPrevMonth}
                        aria-label="Previous month"
                        className="inline-flex cursor-pointer items-center text-(--diamond-muted,#6b6862) hover:text-(--diamond-ink,#1a1917)"
                    >
                        <CaretLeft weight="bold" size={14} />
                    </button>
                ) : (
                    <span />
                )}
                <div
                    className={cn(
                        "font-medium",
                        variant === "minimal" && "text-[16px] italic [font-family:Fraunces,Georgia,serif]",
                    )}
                >
                    {m.toLocaleString(undefined, { month: "long", year: "numeric" })}
                </div>
                {onNextMonth ? (
                    <button
                        type="button"
                        onClick={onNextMonth}
                        aria-label="Next month"
                        className="inline-flex cursor-pointer items-center text-(--diamond-muted,#6b6862) hover:text-(--diamond-ink,#1a1917)"
                    >
                        <CaretRight weight="bold" size={14} />
                    </button>
                ) : (
                    <span />
                )}
            </div>
            <div
                className={cn(
                    "mb-1 grid grid-cols-7 gap-0.5 text-(--diamond-muted,#6b6862) text-[10px] uppercase tracking-[0.08em]",
                    variant === "minimal" && "font-mono",
                )}
            >
                {dows.map((d, i) => (
                    <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: weekday labels can repeat (T, S); position is the only stable identifier
                        key={i}
                        className="py-1 text-center"
                    >
                        {d}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-0.5">
                {days.map(({ date, muted }) => {
                    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                    const ev = eventDates.get(key);
                    const isToday = sameDay(date, today);
                    const isSelected = !!(selected && sameDay(date, selected));
                    const inRng = !!(range && inRange(date, range));
                    const hasAnyClickHandler = !!(onDayClick || onSelect);
                    const defaultClassName = cn(
                        "flex aspect-square items-center justify-center rounded text-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--diamond-accent,#2b7fff)",
                        muted && "text-(--diamond-muted,#6b6862) opacity-60",
                        isToday &&
                            !isSelected &&
                            "bg-(--diamond-ink,#1a1917) font-semibold text-(--diamond-surface,#fff)",
                        isSelected &&
                            "bg-(--diamond-accent,#2b7fff) font-semibold text-(--diamond-on-accent,#fff)",
                        inRng &&
                            !isSelected &&
                            "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_22%,var(--diamond-surface,#fff))] text-(--diamond-accent,#2b7fff)",
                        ev &&
                            !isToday &&
                            !isSelected &&
                            !inRng &&
                            "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_18%,var(--diamond-surface,#fff))] font-semibold text-(--diamond-accent,#2b7fff)",
                        !muted && !isToday && !isSelected && "hover:bg-(--diamond-surface-alt,#ebe8e1)",
                        hasAnyClickHandler ? "cursor-pointer" : "cursor-default",
                    );
                    const handleClick = () => {};
                    if (renderDay) {
                        return (
                            <React.Fragment key={key}>
                                {renderDay({
                                    date,
                                    muted,
                                    isToday,
                                    isSelected,
                                    inRange: inRng,
                                    event: ev,
                                    defaultClassName,
                                    handleClick,
                                })}
                            </React.Fragment>
                        );
                    }
                    return (
                        <button
                            type="button"
                            key={key}
                            onClick={(e) => {
                                onDayClick?.(date, e);
                                onSelect?.(date);
                            }}
                            className={defaultClassName}
                            style={
                                ev?.color
                                    ? {
                                          background: `color-mix(in oklab, ${ev.color} 22%, var(--diamond-surface,#fff))`,
                                          color: ev.color,
                                      }
                                    : undefined
                            }
                        >
                            {date.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
});

Calendar.displayName = "Diamond.Calendar";

export { calendarVariants };
