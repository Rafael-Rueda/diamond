"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond SignaturePad
 * Pointer-enabled canvas signature capture. It exposes a PNG data URL whenever
 * drawing finishes, while the visual variants cover common signing contexts. */

export type SignaturePadVariant = "simple" | "line" | "dark" | "color" | "witness" | "certified";

const signatureVariants = cva(
    "w-full min-w-0 max-w-[520px] overflow-hidden rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917)",
    {
        variants: {
            variant: {
                simple: "",
                line: "",
                dark: "border-[#2d2c28] bg-[#0f0f0e] text-[#d4d0c8]",
                color: "",
                witness: "",
                certified: "",
            },
        },
        defaultVariants: { variant: "simple" },
    },
);

export interface SignaturePadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">, VariantProps<typeof signatureVariants> {
    width?: number;
    height?: number;
    penColor?: string;
    lineWidth?: number;
    signerLabel?: React.ReactNode;
    helperText?: React.ReactNode;
    disabled?: boolean;
    onValueChange?: (dataUrl: string) => void;
    accent?: string;
}

const DEFAULT_COLORS = ["#1a1917", "#2b7fff", "#10b981", "#e11d48"];

export const SignaturePad = React.forwardRef<HTMLDivElement, SignaturePadProps>(function SignaturePad(
    {
        className,
        variant = "simple",
        width = 520,
        height = 190,
        penColor = "#1a1917",
        lineWidth = 2.2,
        signerLabel,
        helperText,
        disabled,
        onValueChange,
        accent,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "simple";
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const drawing = React.useRef(false);
    const [color, setColor] = React.useState(v === "dark" ? "#d4d0c8" : penColor);
    const [hasInk, setHasInk] = React.useState(false);
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        canvas.width = width;
        canvas.height = height;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
    }, [width, height, lineWidth, color]);

    const getPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
        const canvas = event.currentTarget;
        const rect = canvas.getBoundingClientRect();
        return {
            x: ((event.clientX - rect.left) / rect.width) * canvas.width,
            y: ((event.clientY - rect.top) / rect.height) * canvas.height,
        };
    };

    const start = (event: React.PointerEvent<HTMLCanvasElement>) => {
        if (disabled) return;
        const ctx = event.currentTarget.getContext("2d");
        if (!ctx) return;
        const point = getPoint(event);
        drawing.current = true;
        setHasInk(true);
        try {
            event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
            // Synthetic pointer events used in tests may not be capturable.
        }
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
    };

    const move = (event: React.PointerEvent<HTMLCanvasElement>) => {
        if (!drawing.current || disabled) return;
        const ctx = event.currentTarget.getContext("2d");
        if (!ctx) return;
        const point = getPoint(event);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
    };

    const finish = (event: React.PointerEvent<HTMLCanvasElement>) => {
        if (!drawing.current) return;
        drawing.current = false;
        try {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
            }
        } catch {
            // Ignore non-capturable synthetic pointer events.
        }
        onValueChange?.(event.currentTarget.toDataURL("image/png"));
    };

    const clear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasInk(false);
        onValueChange?.("");
    };

    return (
        <div ref={ref} className={cn(signatureVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
            <div className={cn("flex items-center gap-2 border-b px-3 py-2", v === "dark" ? "border-[#2d2c28]" : "border-(--diamond-border,#d9d5cc)")}>
                <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-(--diamond-muted,#6b6862)">
                        {signerLabel ?? (v === "witness" ? "Witness signature" : "Signature")}
                    </div>
                    {helperText ? <div className="text-(--diamond-muted,#6b6862) text-[11px]">{helperText}</div> : null}
                </div>
                {v === "color" ? (
                    <div className="ml-auto flex gap-1">
                        {DEFAULT_COLORS.map((option) => (
                            <button
                                key={option}
                                type="button"
                                aria-label={`Use ${option}`}
                                onClick={() => setColor(option)}
                                className={cn("size-5 cursor-pointer rounded-full border", color === option ? "border-(--diamond-ink,#1a1917) ring-2 ring-(--diamond-accent,#2b7fff)/30" : "border-(--diamond-border,#d9d5cc)")}
                                style={{ background: option }}
                            />
                        ))}
                    </div>
                ) : null}
                <button
                    type="button"
                    onClick={clear}
                    className={cn(
                        "ml-auto inline-flex h-7 cursor-pointer items-center rounded border px-2 font-mono text-[10px] uppercase tracking-[0.08em]",
                        v === "dark" ? "border-[#2d2c28] text-[#8a867d] hover:text-[#d4d0c8]" : "border-(--diamond-border,#d9d5cc) text-(--diamond-muted,#6b6862) hover:text-(--diamond-ink,#1a1917)",
                    )}
                >
                    Clear
                </button>
            </div>

            <div className="relative h-[190px]">
                <svg viewBox="0 0 520 190" className="pointer-events-none absolute inset-0 size-full" aria-hidden="true">
                    {v === "line" || v === "witness" || v === "certified" ? (
                        <line x1="44" y1="140" x2="476" y2="140" stroke="var(--diamond-border,#d9d5cc)" strokeWidth="1.5" />
                    ) : null}
                    {!hasInk ? (
                        <path d="M120 122 C 170 70, 210 162, 252 105 S 334 108, 396 88" fill="none" stroke={v === "dark" ? "#d4d0c8" : "var(--diamond-ink,#1a1917)"} strokeLinecap="round" strokeWidth="2.2" opacity="0.28" />
                    ) : null}
                    {v === "certified" ? (
                        <g transform="translate(410 34)">
                            <circle cx="28" cy="28" r="24" fill="none" stroke="var(--diamond-accent,#2b7fff)" strokeWidth="2" />
                            <path d="M17 30 L25 38 L41 18" fill="none" stroke="var(--diamond-accent,#2b7fff)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                        </g>
                    ) : null}
                </svg>
                <canvas
                    ref={canvasRef}
                    aria-label="Signature pad"
                    onPointerDown={start}
                    onPointerMove={move}
                    onPointerUp={finish}
                    onPointerCancel={finish}
                    className="relative z-10 size-full touch-none cursor-crosshair"
                />
            </div>
            {v === "witness" || v === "certified" ? (
                <div className="flex justify-between border-(--diamond-border,#d9d5cc) border-t px-3 py-2 font-mono text-[10px] text-(--diamond-muted,#6b6862) uppercase tracking-[0.12em]">
                    <span>{v === "certified" ? "Verified" : "Witness"}</span>
                    <span>{new Date().getFullYear()}</span>
                </div>
            ) : null}
        </div>
    );
});

SignaturePad.displayName = "Diamond.SignaturePad";

export { signatureVariants as signaturePadVariants };
