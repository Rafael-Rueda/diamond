"use client";

import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Statistic — KPI metric with delta, sparkline, progress. */

export type StatisticVariant = "kpi" | "paired" | "dark" | "large" | "progress" | "grid";

const statVariants = cva("inline-flex select-none flex-col gap-1.5 rounded-lg p-3", {
    variants: {
        variant: {
            kpi: "min-w-[160px] border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff)",
            paired: "min-w-[200px] flex-row gap-6 border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff)",
            dark: "min-w-[180px] bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#fff)",
            large: "min-w-[200px] border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-center",
            progress: "min-w-[200px] border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff)",
            grid: "grid min-w-[260px] grid-cols-3 gap-2 border-0 bg-transparent p-0",
        },
    },
    defaultVariants: { variant: "kpi" },
});

export interface StatisticEntry {
    label: React.ReactNode;
    value: React.ReactNode;
    delta?: { dir: "up" | "down"; text: React.ReactNode };
}

export interface StatisticProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statVariants> {
    /** Primary label (`kpi`, `dark`, `large`, `progress`). */
    label?: React.ReactNode;
    /** Primary value. */
    value?: React.ReactNode;
    /** Delta indicator. */
    delta?: { dir: "up" | "down"; text: React.ReactNode };
    /** Sparkline data — array of numbers, normalized 0..1 within the viewBox. */
    sparkline?: number[];
    /** Progress (0..100) for `progress` variant. */
    progress?: number;
    /** Goal text for `progress` variant. */
    goal?: React.ReactNode;
    /** Status pill text for `progress` variant. */
    status?: React.ReactNode;
    /** Entries for `paired` (use 2 entries) or `grid` (use 3) variants. */
    entries?: StatisticEntry[];
    /** Accent color override. */
    accent?: string;
}

function Spark({ data, color }: { data: number[]; color: string }) {
    if (data.length < 2) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${20 - ((v - min) / range) * 18}`).join(" ");
    return (
        <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="h-5 w-full" role="img" aria-label="Sparkline">
            <title>Sparkline</title>
            <polyline fill="none" stroke={color} strokeWidth="1.5" points={points} />
        </svg>
    );
}

export const Statistic = React.forwardRef<HTMLDivElement, StatisticProps>(function Statistic(
    {
        className,
        variant = "kpi",
        label,
        value,
        delta,
        sparkline,
        progress,
        goal,
        status,
        entries,
        accent,
        style,
        ...rest
    },
    ref,
) {
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const labelClasses = "text-[10px] uppercase tracking-[0.12em] text-(--diamond-muted,#6b6862)";
    const valueClasses = "text-[28px] font-semibold tracking-tight leading-none [font-family:Fraunces,Georgia,serif]";

    if (variant === "paired" && entries) {
        return (
            <div ref={ref} className={cn(statVariants({ variant }), className)} style={inlineStyle} {...rest}>
                {entries.slice(0, 2).map((e, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: entries are positional; StatisticEntry.label is ReactNode and not reliably stringifiable
                    <div key={i} className="flex flex-col gap-1.5">
                        <div className={labelClasses}>{e.label}</div>
                        <div className={valueClasses}>{e.value}</div>
                    </div>
                ))}
            </div>
        );
    }

    if (variant === "grid" && entries) {
        return (
            <div ref={ref} className={cn(statVariants({ variant }), className)} style={inlineStyle} {...rest}>
                {entries.map((e, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: entries are positional; StatisticEntry.label is ReactNode and not reliably stringifiable
                    <div key={i} className="rounded-md bg-(--diamond-surface-alt,#ebe8e1) p-3 text-center">
                        <div className={cn(valueClasses, "text-[24px]")}>{e.value}</div>
                        <div className={cn(labelClasses, "mt-1")}>{e.label}</div>
                    </div>
                ))}
            </div>
        );
    }

    if (variant === "large") {
        return (
            <div ref={ref} className={cn(statVariants({ variant }), className)} style={inlineStyle} {...rest}>
                <div className={cn(valueClasses, "text-[56px]")}>{value}</div>
                <div className="text-(--diamond-muted,#6b6862) text-[12px] italic [font-family:Fraunces,Georgia,serif]">
                    {label}
                </div>
            </div>
        );
    }

    if (variant === "dark") {
        return (
            <div ref={ref} className={cn(statVariants({ variant }), className)} style={inlineStyle} {...rest}>
                <div className="text-(--diamond-accent,#2b7fff) text-[10px] uppercase tracking-[0.12em]">{label}</div>
                <div className={valueClasses}>{value}</div>
                {sparkline && <Spark data={sparkline} color="var(--diamond-accent,#2b7fff)" />}
            </div>
        );
    }

    if (variant === "progress") {
        const pct = Math.max(0, Math.min(100, progress ?? 0));
        return (
            <div ref={ref} className={cn(statVariants({ variant }), className)} style={inlineStyle} {...rest}>
                <div className="flex items-start justify-between">
                    <div className={labelClasses}>{label}</div>
                    {status && (
                        <span className="rounded bg-[color-mix(in_oklab,#10b981_15%,var(--diamond-surface,#fff))] px-1.5 py-0.5 font-bold text-[9px] text-emerald-600">
                            {status}
                        </span>
                    )}
                </div>
                <div className={valueClasses}>{value}</div>
                <div className="h-1 overflow-hidden rounded-full bg-(--diamond-surface-alt,#ebe8e1)">
                    <div className="h-full bg-(--diamond-accent,#2b7fff)" style={{ width: `${pct}%` }} />
                </div>
                {goal && <div className="text-(--diamond-muted,#6b6862) text-[10px]">{goal}</div>}
            </div>
        );
    }

    return (
        <div ref={ref} className={cn(statVariants({ variant }), className)} style={inlineStyle} {...rest}>
            <div className="flex items-start justify-between">
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <div className={labelClasses}>{label}</div>
                    <div className={valueClasses}>{value}</div>
                </div>
                {delta && (
                    <div
                        className={cn(
                            "flex shrink-0 items-center gap-0.5 font-mono text-[10px]",
                            delta.dir === "up" ? "text-emerald-600" : "text-rose-600",
                        )}
                    >
                        {delta.dir === "up" ? <CaretUp weight="fill" size={9} /> : <CaretDown weight="fill" size={9} />}
                        <span>{delta.text}</span>
                    </div>
                )}
            </div>
            {sparkline && <Spark data={sparkline} color="var(--diamond-accent,#2b7fff)" />}
        </div>
    );
});

Statistic.displayName = "Diamond.Statistic";

export { statVariants as statisticVariants };
