"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond Map
 * Lightweight geo visualization shell for markers, routes and density maps.
 * It renders SVG scaffolding by default; replace the children slot with your
 * Mapbox/Leaflet canvas when you need real tiles. */

export type MapVariant = "pin" | "clusters" | "dark" | "route" | "heatmap" | "place-card";

const mapVariants = cva(
    "relative h-[220px] w-full min-w-[280px] max-w-[520px] overflow-hidden rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-ink,#1a1917)",
    {
        variants: {
            variant: {
                pin: "",
                clusters: "",
                dark: "border-[#2d2c28] bg-[#1a1917] text-[#d4d0c8]",
                route: "",
                heatmap: "",
                "place-card": "",
            },
        },
        defaultVariants: { variant: "pin" },
    },
);

export interface MapMarker {
    id: string;
    x: number;
    y: number;
    label?: React.ReactNode;
    tone?: string;
}

export interface MapRoutePoint {
    x: number;
    y: number;
}

export interface MapProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, VariantProps<typeof mapVariants> {
    markers?: MapMarker[];
    route?: MapRoutePoint[];
    title?: React.ReactNode;
    description?: React.ReactNode;
    metric?: React.ReactNode;
    children?: React.ReactNode;
    accent?: string;
}

const DEFAULT_MARKERS: MapMarker[] = [
    { id: "a", x: 42, y: 48, label: "A" },
    { id: "b", x: 62, y: 34, label: "B" },
    { id: "c", x: 30, y: 68, label: "C" },
    { id: "d", x: 72, y: 68, label: "D" },
];

const DEFAULT_ROUTE: MapRoutePoint[] = [
    { x: 14, y: 76 },
    { x: 26, y: 68 },
    { x: 38, y: 45 },
    { x: 56, y: 38 },
    { x: 76, y: 22 },
];

function BaseMap({ dark, heatmap }: { dark?: boolean; heatmap?: boolean }) {
    const rawId = React.useId();
    const gradientId = `diamond-map-${rawId.replace(/:/g, "")}`;
    return (
        <svg viewBox="0 0 240 160" className="absolute inset-0 size-full" aria-hidden="true">
            <defs>
                <radialGradient id={gradientId}>
                    <stop offset="0%" stopColor="var(--diamond-accent,#2b7fff)" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="var(--diamond-accent,#2b7fff)" stopOpacity="0" />
                </radialGradient>
            </defs>
            <rect width="240" height="160" fill={dark ? "#1a1917" : "#e8e3d8"} />
            <path d="M0 112 Q45 101 88 111 T178 106 L240 111 L240 160 L0 160 Z" fill={dark ? "#24231f" : "#c8d4c0"} />
            <path d="M0 86 Q54 72 112 80 T240 72" fill="none" stroke={dark ? "#3d3c38" : "#b5c2a8"} strokeWidth="1" />
            <path d="M20 0 L34 54 L92 66 L118 42 L168 56 L190 30 L215 0" fill="none" stroke={dark ? "#3d3c38" : "#d0c4a8"} strokeWidth="2" />
            <path d="M0 132 L70 122 L116 134 L190 126 L240 136" fill="none" stroke="var(--diamond-accent,#2b7fff)" strokeWidth="2" opacity={dark ? 0.8 : 0.75} />
            {heatmap ? (
                <>
                    <circle cx="76" cy="56" r="34" fill={`url(#${gradientId})`} />
                    <circle cx="152" cy="78" r="46" fill={`url(#${gradientId})`} />
                    <circle cx="118" cy="112" r="30" fill={`url(#${gradientId})`} />
                </>
            ) : null}
        </svg>
    );
}

function Marker({ marker, pin = false }: { marker: MapMarker; pin?: boolean }) {
    if (pin) {
        return (
            <span
                className="absolute size-6 -translate-x-1/2 -translate-y-full rotate-45 rounded-[50%_50%_50%_0] border-2 border-white bg-(--diamond-accent,#2b7fff) shadow-[0_4px_10px_rgba(0,0,0,0.24)]"
                style={{ left: `${marker.x}%`, top: `${marker.y}%`, background: marker.tone }}
            />
        );
    }
    return (
        <span
            className="absolute inline-flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-(--diamond-accent,#2b7fff) font-bold text-white text-[11px] shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
            style={{ left: `${marker.x}%`, top: `${marker.y}%`, background: marker.tone }}
        >
            {marker.label}
        </span>
    );
}

function routePath(points: MapRoutePoint[]) {
    if (points.length === 0) return "";
    return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
}

export const Map = React.forwardRef<HTMLDivElement, MapProps>(function Map(
    {
        className,
        variant = "pin",
        markers,
        route = DEFAULT_ROUTE,
        title,
        description,
        metric,
        children,
        accent,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "pin";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;
    const finalMarkers = markers ?? (v === "pin" ? [DEFAULT_MARKERS[0] ?? { id: "pin", x: 48, y: 48 }] : DEFAULT_MARKERS);

    return (
        <div ref={ref} className={cn(mapVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
            {children ?? <BaseMap dark={v === "dark"} heatmap={v === "heatmap"} />}

            {v === "route" ? (
                <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
                    <path
                        d={routePath(route)}
                        fill="none"
                        stroke="var(--diamond-accent,#2b7fff)"
                        strokeDasharray="4 3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                </svg>
            ) : null}

            {v !== "heatmap"
                ? finalMarkers.map((marker, index) => (
                      <Marker key={marker.id} marker={marker} pin={v === "pin" || (v === "route" && index === 0)} />
                  ))
                : null}

            <div
                className={cn(
                    "absolute rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff)/95 px-3 py-2 text-[12px] shadow-[0_8px_20px_rgba(0,0,0,0.12)] backdrop-blur",
                    v === "dark" && "border-[#2d2c28] bg-[#0f0f0e]/95 text-[#d4d0c8]",
                    v === "place-card" ? "right-3 bottom-3 w-[210px]" : "top-3 left-3",
                )}
            >
                <div className="font-semibold">{title ?? (v === "heatmap" ? "Density" : v === "route" ? "Route" : "San Francisco")}</div>
                <div className={cn("text-[11px]", v === "dark" ? "text-[#8a867d]" : "text-(--diamond-muted,#6b6862)")}>
                    {description ?? (v === "heatmap" ? "Orders - 24h" : v === "route" ? "A to B" : "37.7749 N")}
                </div>
                {metric ? <div className="mt-2 font-mono text-(--diamond-accent,#2b7fff) text-[11px]">{metric}</div> : null}
            </div>
        </div>
    );
});

Map.displayName = "Diamond.Map";

export { mapVariants };
