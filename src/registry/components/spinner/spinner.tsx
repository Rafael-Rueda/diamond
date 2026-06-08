"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Spinner — loading indicators in six styles. */

export type SpinnerVariant = "ring" | "dual" | "dots" | "bars" | "ring-progress" | "pulse";

const spinnerVariants = cva("inline-flex shrink-0 items-center justify-center text-(--diamond-accent,#2b7fff)", {
    variants: {
        size: {
            sm: "size-4",
            md: "size-6",
            lg: "size-10",
        },
    },
    defaultVariants: { size: "md" },
});

const KEYFRAMES = `
@keyframes d-spin-bars { 0%,100% { transform: scaleY(0.4) } 50% { transform: scaleY(1) } }
@keyframes d-spin-dot  { 0%,80%,100% { transform: scale(0.5); opacity: 0.35 } 40% { transform: scale(1); opacity: 1 } }
@keyframes d-spin-pulse { 0%,80%,100% { transform: scale(0); opacity: 0 } 40% { transform: scale(1); opacity: 1 } }
@keyframes d-spin-ring-prog { 0% { stroke-dashoffset: 100 } 50% { stroke-dashoffset: 25 } 100% { stroke-dashoffset: 100 } }
@keyframes d-spin-ring-rot { 100% { transform: rotate(360deg) } }
`;
let keyframesInjected = false;
function useSpinnerKeyframes(): void {
    React.useInsertionEffect(() => {
        if (keyframesInjected || typeof document === "undefined") return;
        keyframesInjected = true;
        const el = document.createElement("style");
        el.setAttribute("data-diamond", "keyframes");
        el.textContent = KEYFRAMES;
        document.head.appendChild(el);
    }, []);
}

export interface SpinnerProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof spinnerVariants> {
    variant?: SpinnerVariant;
    /** Accessible label (defaults to "Loading"). Use "" to skip the live region. */
    label?: string;
    /** ring-progress variant only — 0..100. */
    value?: number;
    /** Accent override. */
    accent?: string;
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
    {
        className,
        variant = "ring",
        size = "md",
        label = "Loading",
        value = 65,
        accent,
        style,
        ...rest
    },
    ref,
) {
    useSpinnerKeyframes();
    const v = variant;
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    let body: React.ReactNode = null;

    if (v === "ring") {
        body = (
            <span
                aria-hidden="true"
                className="block size-full animate-spin rounded-full border-2 border-(--diamond-border,#d9d5cc) border-t-(--diamond-accent,#2b7fff)"
            />
        );
    } else if (v === "dual") {
        body = (
            <span aria-hidden="true" className="relative block size-full">
                <span className="absolute inset-0 animate-spin rounded-full border-2 border-(--diamond-border,#d9d5cc) border-t-(--diamond-accent,#2b7fff)" />
                <span
                    className="absolute inset-1.5 rounded-full border-2 border-(--diamond-border,#d9d5cc) border-b-(--diamond-accent,#2b7fff)"
                    style={{ animation: "d-spin-ring-rot 1.4s linear infinite reverse" }}
                />
            </span>
        );
    } else if (v === "dots") {
        body = (
            <span aria-hidden="true" className="flex items-center gap-1">
                {[0, 0.16, 0.32].map((delay, i) => (
                    <span
                        // biome-ignore lint/suspicious/noArrayIndexKey: positional indicator
                        key={i}
                        className="size-2 rounded-full bg-(--diamond-accent,#2b7fff)"
                        style={{ animation: `d-spin-dot 1.2s ${delay}s ease-in-out infinite` }}
                    />
                ))}
            </span>
        );
    } else if (v === "bars") {
        body = (
            <span aria-hidden="true" className="flex h-full items-end gap-0.5">
                {[0, 0.1, 0.2, 0.3, 0.4].map((delay, i) => (
                    <span
                        // biome-ignore lint/suspicious/noArrayIndexKey: positional indicator
                        key={i}
                        className="block w-0.5 origin-bottom bg-(--diamond-accent,#2b7fff)"
                        style={{
                            height: "100%",
                            animation: `d-spin-bars 1s ${delay}s ease-in-out infinite`,
                        }}
                    />
                ))}
            </span>
        );
    } else if (v === "ring-progress") {
        const clamped = Math.max(0, Math.min(100, value));
        body = (
            <span aria-hidden="true" className="relative block size-full">
                <svg viewBox="0 0 36 36" className="size-full -rotate-90">
                    <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        strokeWidth="2.5"
                        className="stroke-(--diamond-border,#d9d5cc)"
                    />
                    <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        strokeWidth="2.5"
                        pathLength="100"
                        strokeLinecap="round"
                        strokeDasharray="100"
                        strokeDashoffset={100 - clamped}
                        className="stroke-(--diamond-accent,#2b7fff) transition-[stroke-dashoffset] duration-300"
                    />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-semibold text-(--diamond-ink,#1a1917) text-[10px]">
                    {clamped}%
                </span>
            </span>
        );
    } else {
        body = (
            <span aria-hidden="true" className="flex items-center gap-1.5">
                {[0, 0.3, 0.6].map((delay, i) => (
                    <span
                        // biome-ignore lint/suspicious/noArrayIndexKey: positional indicator
                        key={i}
                        className="block size-3 rounded-full bg-(--diamond-accent,#2b7fff)"
                        style={{ animation: `d-spin-pulse 1.4s ${delay}s ease-in-out infinite` }}
                    />
                ))}
            </span>
        );
    }

    return (
        <span
            ref={ref}
            role={label ? "status" : "presentation"}
            aria-live={label ? "polite" : undefined}
            className={cn(spinnerVariants({ size }), className)}
            style={inlineStyle}
            {...rest}
        >
            {body}
            {label ? <span className="sr-only">{label}</span> : null}
        </span>
    );
});

Spinner.displayName = "Diamond.Spinner";

export { spinnerVariants };
