"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond QRCode
 * Matrix renderer for QR-style codes. Pass a real QR matrix from your encoder
 * for production payloads; the default matrix is a deterministic demo shape. */

export type QRCodeVariant = "classic" | "branded" | "inverted" | "wifi" | "export" | "error-level";

const qrVariants = cva(
    "inline-flex min-w-[180px] flex-col items-center gap-3 rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-4 text-(--diamond-ink,#1a1917)",
    {
        variants: {
            variant: {
                classic: "",
                branded: "",
                inverted: "bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#fff)",
                wifi: "min-w-[260px] flex-row justify-center",
                export: "",
                "error-level": "",
            },
        },
        defaultVariants: { variant: "classic" },
    },
);

export interface QRCodeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof qrVariants> {
    value?: string;
    matrix?: number[][];
    size?: number;
    caption?: React.ReactNode;
    logo?: React.ReactNode;
    errorLevel?: "L" | "M" | "Q" | "H";
    accent?: string;
}

const DEFAULT_MATRIX: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
];

export const QRCode = React.forwardRef<HTMLDivElement, QRCodeProps>(function QRCode(
    {
        className,
        variant = "classic",
        value = "diamond.co/v3",
        matrix = DEFAULT_MATRIX,
        size = 124,
        caption,
        logo,
        errorLevel = "H",
        accent,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "classic";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;
    const dark = v === "inverted";
    const color = dark ? "var(--diamond-surface,#fff)" : v === "branded" ? "var(--diamond-accent,#2b7fff)" : "var(--diamond-ink,#1a1917)";

    const code = (
        <div className={cn("relative rounded-md bg-white p-2", dark && "bg-(--diamond-ink,#1a1917)", v === "export" && "bg-[linear-gradient(135deg,color-mix(in_oklab,var(--diamond-accent,#2b7fff)_18%,white),white)]")}>
            <svg viewBox={`0 0 ${matrix.length} ${matrix.length}`} style={{ width: size, height: size }} aria-label={`QR code for ${value}`}>
                {matrix.flatMap((row, y) =>
                    row.map((cell, x) =>
                        cell ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" rx="0.08" fill={color} /> : null,
                    ),
                )}
            </svg>
            {v === "branded" ? (
                <div className="absolute inset-[40%] flex items-center justify-center rounded border-2 border-(--diamond-accent,#2b7fff) bg-white font-bold text-(--diamond-accent,#2b7fff)">
                    {logo ?? "D"}
                </div>
            ) : null}
        </div>
    );

    return (
        <div ref={ref} className={cn(qrVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
            {code}
            <div className="text-center">
                <div className={cn("font-mono text-[10px] uppercase tracking-[0.12em]", dark ? "text-[#d4d0c8]" : "text-(--diamond-muted,#6b6862)")}>
                    {caption ?? (v === "wifi" ? "Wi-Fi: Diamond_Guest" : value)}
                </div>
                {v === "wifi" ? <div className="text-(--diamond-muted,#6b6862) text-[11px]">WPA2 auto-join</div> : null}
                {v === "error-level" ? <div className="mt-1 font-mono text-(--diamond-muted,#6b6862) text-[10px]">Error correction {errorLevel}</div> : null}
                {v === "export" ? (
                    <div className="mt-2 flex justify-center gap-1.5">
                        <button type="button" className="h-7 cursor-pointer rounded border border-(--diamond-border,#d9d5cc) px-2 text-[11px]">PNG</button>
                        <button type="button" className="h-7 cursor-pointer rounded border border-(--diamond-border,#d9d5cc) px-2 text-[11px]">SVG</button>
                    </div>
                ) : null}
            </div>
        </div>
    );
});

QRCode.displayName = "Diamond.QRCode";

export { qrVariants as qrCodeVariants };
