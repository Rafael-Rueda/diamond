"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond Chart
 * Small SVG chart primitives for dashboards and cards. For advanced axes,
 * tooltips or streaming data, keep this shell and connect it to your charting
 * engine of choice. */

export type ChartVariant = "area-line" | "bars" | "donut" | "scatter" | "target-bars" | "radar";

const chartVariants = cva(
    "w-full min-w-[280px] max-w-[520px] overflow-hidden rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-4 text-(--diamond-ink,#1a1917)",
    {
        variants: {
            variant: {
                "area-line": "",
                bars: "",
                donut: "",
                scatter: "",
                "target-bars": "",
                radar: "",
            },
        },
        defaultVariants: { variant: "area-line" },
    },
);

export interface ChartDatum {
    label: string;
    value: number;
    value2?: number;
    target?: number;
    x?: number;
    y?: number;
}

export interface ChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, VariantProps<typeof chartVariants> {
    data?: ChartDatum[];
    title?: React.ReactNode;
    description?: React.ReactNode;
    valueFormatter?: (value: number) => React.ReactNode;
    accent?: string;
}

const DEFAULT_DATA: ChartDatum[] = [
    { label: "Jan", value: 28, value2: 18, target: 42, x: 12, y: 28 },
    { label: "Feb", value: 44, value2: 22, target: 48, x: 28, y: 52 },
    { label: "Mar", value: 38, value2: 30, target: 46, x: 45, y: 36 },
    { label: "Apr", value: 62, value2: 42, target: 60, x: 58, y: 68 },
    { label: "May", value: 56, value2: 50, target: 64, x: 76, y: 44 },
    { label: "Jun", value: 78, value2: 58, target: 72, x: 88, y: 78 },
];

function clamp(value: number, min = 0, max = 100) {
    return Math.max(min, Math.min(max, value));
}

function maxValue(data: ChartDatum[]) {
    return Math.max(1, ...data.flatMap((datum) => [datum.value, datum.value2 ?? 0, datum.target ?? 0]));
}

function points(data: ChartDatum[], width: number, height: number, max: number) {
    const step = data.length > 1 ? width / (data.length - 1) : width;
    return data.map((datum, index) => {
        const x = data.length > 1 ? index * step : width / 2;
        const y = height - (clamp(datum.value / max, 0, 1) * height);
        return { x, y };
    });
}

function polygon(pointsValue: Array<{ x: number; y: number }>) {
    return pointsValue.map((point) => `${point.x},${point.y}`).join(" ");
}

export const Chart = React.forwardRef<HTMLDivElement, ChartProps>(function Chart(
    {
        className,
        variant = "area-line",
        data = DEFAULT_DATA,
        title,
        description,
        valueFormatter = (value) => value,
        accent,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "area-line";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;
    const max = maxValue(data);

    return (
        <div ref={ref} className={cn(chartVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
            <div className="mb-3 flex items-end justify-between gap-3">
                <div>
                    <div className="font-semibold text-[14px]">{title ?? "Revenue"}</div>
                    <div className="text-(--diamond-muted,#6b6862) text-[11px]">{description ?? "Last six months"}</div>
                </div>
                <div className="font-mono text-(--diamond-accent,#2b7fff) text-[12px]">
                    {valueFormatter(data[data.length - 1]?.value ?? 0)}
                </div>
            </div>
            {v === "area-line" ? <AreaLineChart data={data} max={max} /> : null}
            {v === "bars" ? <BarChart data={data} max={max} /> : null}
            {v === "donut" ? <DonutChart data={data} max={max} /> : null}
            {v === "scatter" ? <ScatterChart data={data} /> : null}
            {v === "target-bars" ? <TargetBars data={data} max={max} /> : null}
            {v === "radar" ? <RadarChart data={data} max={max} /> : null}
        </div>
    );
});

function AreaLineChart({ data, max }: { data: ChartDatum[]; max: number }) {
    const pts = points(data, 220, 96, max);
    const line = polygon(pts);
    const area = `0,96 ${line} 220,96`;
    return (
        <svg viewBox="0 0 220 110" className="h-[150px] w-full" aria-hidden="true">
            <polyline points="0,96 220,96" fill="none" stroke="var(--diamond-border,#d9d5cc)" />
            <polygon points={area} fill="var(--diamond-accent,#2b7fff)" opacity="0.14" />
            <polyline points={line} fill="none" stroke="var(--diamond-accent,#2b7fff)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
            {pts.map((point, index) => (
                <circle key={`${data[index]?.label ?? index}-dot`} cx={point.x} cy={point.y} r="3.5" fill="var(--diamond-surface,#fff)" stroke="var(--diamond-accent,#2b7fff)" strokeWidth="2" />
            ))}
        </svg>
    );
}

function BarChart({ data, max }: { data: ChartDatum[]; max: number }) {
    return (
        <div className="flex h-[150px] items-end gap-2 border-(--diamond-border,#d9d5cc) border-b px-1">
            {data.map((datum) => (
                <div key={datum.label} className="flex flex-1 flex-col items-center gap-1">
                    <div
                        className="w-full rounded-t bg-(--diamond-accent,#2b7fff)"
                        style={{ height: `${Math.max(8, (datum.value / max) * 130)}px` }}
                    />
                    <span className="font-mono text-[9px] text-(--diamond-muted,#6b6862)">{datum.label}</span>
                </div>
            ))}
        </div>
    );
}

function DonutChart({ data, max }: { data: ChartDatum[]; max: number }) {
    const total = data.reduce((sum, datum) => sum + datum.value, 0) || max;
    const top = data.slice(0, 4);
    let offset = 25;
    return (
        <div className="flex items-center gap-5">
            <svg viewBox="0 0 80 80" className="size-[150px]" aria-hidden="true">
                <circle cx="40" cy="40" r="28" fill="none" stroke="var(--diamond-border,#d9d5cc)" strokeWidth="12" />
                {top.map((datum, index) => {
                    const dash = (datum.value / total) * 176;
                    const segment = (
                        <circle
                            key={datum.label}
                            cx="40"
                            cy="40"
                            r="28"
                            fill="none"
                            stroke={index === 0 ? "var(--diamond-accent,#2b7fff)" : `color-mix(in oklab, var(--diamond-accent,#2b7fff) ${70 - index * 14}%, var(--diamond-surface,#fff))`}
                            strokeDasharray={`${dash} 176`}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            strokeWidth="12"
                            transform="rotate(-90 40 40)"
                        />
                    );
                    offset -= dash;
                    return segment;
                })}
                <text x="40" y="43" textAnchor="middle" className="fill-(--diamond-ink,#1a1917) font-mono text-[10px]">
                    {total}
                </text>
            </svg>
            <div className="grid gap-2">
                {top.map((datum, index) => (
                    <div key={datum.label} className="flex items-center gap-2 text-[12px]">
                        <span className="size-2 rounded-full" style={{ background: index === 0 ? "var(--diamond-accent,#2b7fff)" : `color-mix(in oklab, var(--diamond-accent,#2b7fff) ${70 - index * 14}%, var(--diamond-surface,#fff))` }} />
                        <span>{datum.label}</span>
                        <span className="ml-auto font-mono text-(--diamond-muted,#6b6862)">{datum.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ScatterChart({ data }: { data: ChartDatum[] }) {
    return (
        <svg viewBox="0 0 220 120" className="h-[150px] w-full" aria-hidden="true">
            <path d="M20 8 V104 H212" fill="none" stroke="var(--diamond-border,#d9d5cc)" />
            {data.map((datum) => (
                <circle
                    key={datum.label}
                    cx={20 + clamp(datum.x ?? datum.value, 0, 100) * 1.85}
                    cy={104 - clamp(datum.y ?? datum.value2 ?? datum.value, 0, 100) * 0.9}
                    r="5"
                    fill="var(--diamond-accent,#2b7fff)"
                    opacity="0.78"
                />
            ))}
        </svg>
    );
}

function TargetBars({ data, max }: { data: ChartDatum[]; max: number }) {
    return (
        <div className="grid gap-2">
            {data.slice(0, 5).map((datum) => (
                <div key={datum.label} className="grid grid-cols-[44px_1fr_40px] items-center gap-2 text-[11px]">
                    <span className="font-mono text-(--diamond-muted,#6b6862)">{datum.label}</span>
                    <div className="relative h-3 rounded-full bg-(--diamond-surface-alt,#ebe8e1)">
                        <span className="absolute inset-y-0 left-0 rounded-full bg-(--diamond-accent,#2b7fff)" style={{ width: `${(datum.value / max) * 100}%` }} />
                        <span className="absolute top-[-3px] bottom-[-3px] w-px bg-(--diamond-ink,#1a1917)" style={{ left: `${((datum.target ?? max) / max) * 100}%` }} />
                    </div>
                    <span className="text-right font-mono">{datum.value}</span>
                </div>
            ))}
        </div>
    );
}

function RadarChart({ data, max }: { data: ChartDatum[]; max: number }) {
    const cx = 75;
    const cy = 75;
    const radius = 58;
    const pts = data.slice(0, 6).map((datum, index, arr) => {
        const angle = -Math.PI / 2 + (index / arr.length) * Math.PI * 2;
        const r = (datum.value / max) * radius;
        return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, label: datum.label, angle };
    });
    const outer = pts.map((point) => ({ x: cx + Math.cos(point.angle) * radius, y: cy + Math.sin(point.angle) * radius }));
    return (
        <svg viewBox="0 0 150 150" className="mx-auto size-[150px]" aria-hidden="true">
            <polygon points={polygon(outer)} fill="none" stroke="var(--diamond-border,#d9d5cc)" />
            <polygon points={polygon(pts)} fill="var(--diamond-accent,#2b7fff)" opacity="0.18" stroke="var(--diamond-accent,#2b7fff)" strokeWidth="2" />
            {pts.map((point) => (
                <circle key={point.label} cx={point.x} cy={point.y} r="3" fill="var(--diamond-accent,#2b7fff)" />
            ))}
        </svg>
    );
}

Chart.displayName = "Diamond.Chart";

export { chartVariants };
