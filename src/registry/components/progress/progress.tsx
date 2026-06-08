"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Progress — linear progress with %, steps, stripes, indeterminate
 * and terminal styles. Renders ARIA progressbar semantics. */

export type ProgressVariant = "default" | "thick" | "stepped" | "striped" | "indeterminate" | "terminal";

const progressVariants = cva("flex w-full flex-col gap-1.5 font-mono text-(--diamond-ink,#1a1917)", {
    variants: {
        variant: {
            default: "[font-family:inherit]",
            thick: "[font-family:inherit]",
            stepped: "[font-family:inherit]",
            striped: "[font-family:inherit]",
            indeterminate: "[font-family:inherit]",
            terminal: "",
        },
    },
    defaultVariants: { variant: "default" },
});

const KEYFRAMES = `
@keyframes d-progress-stripe { 0% { background-position: 0 0 } 100% { background-position: 28px 0 } }
@keyframes d-progress-indet { 0% { transform: translateX(-100%) } 100% { transform: translateX(200%) } }
`;
let keyframesInjected = false;
function useProgressKeyframes(): void {
    React.useInsertionEffect(() => {
        if (keyframesInjected || typeof document === "undefined") return;
        keyframesInjected = true;
        const el = document.createElement("style");
        el.setAttribute("data-diamond", "keyframes");
        el.textContent = KEYFRAMES;
        document.head.appendChild(el);
    }, []);
}

export interface ProgressProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof progressVariants> {
    /** 0–100. Ignored in `stepped` (use `step`/`steps`) and `indeterminate`. */
    value?: number;
    /** Stepped variant: current step (1-based). */
    step?: number;
    /** Stepped variant: total step count. Defaults to 5. */
    steps?: number;
    /** Left meta label (e.g. "Uploading", "Installing"). */
    label?: React.ReactNode;
    /** Hide the meta footer. */
    hideMeta?: boolean;
    /** Override the right meta value (e.g. "3 / 5", "—"). */
    valueText?: React.ReactNode;
    /** Accent override. */
    accent?: string;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(function Progress(
    {
        className,
        variant = "default",
        value,
        step,
        steps = 5,
        label,
        hideMeta = false,
        valueText,
        accent,
        style,
        ...rest
    },
    ref,
) {
    useProgressKeyframes();
    const v = variant ?? "default";

    const clamped = typeof value === "number" ? Math.max(0, Math.min(100, value)) : 0;
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const trackBase =
        "relative w-full overflow-hidden rounded-full bg-(--diamond-surface-alt,#ebe8e1)";
    const fillBase =
        "block h-full rounded-full bg-(--diamond-accent,#2b7fff) transition-[width] duration-300 ease-out";

    const heightCls =
        v === "thick" ? "h-2.5" : v === "terminal" ? "h-0.5 rounded-none" : "h-1.5";

    let trackContent: React.ReactNode = null;

    if (v === "stepped") {
        const filled = Math.max(0, Math.min(steps, step ?? 0));
        trackContent = (
            <div className="flex w-full gap-1">
                {Array.from({ length: steps }, (_, i) => (
                    <span
                        // biome-ignore lint/suspicious/noArrayIndexKey: stepped segments are positional
                        key={i}
                        className={cn(
                            "block h-1.5 flex-1 rounded-full transition-colors",
                            i < filled
                                ? "bg-(--diamond-accent,#2b7fff)"
                                : "bg-(--diamond-surface-alt,#ebe8e1)",
                        )}
                    />
                ))}
            </div>
        );
    } else if (v === "indeterminate") {
        trackContent = (
            <div className={cn(trackBase, heightCls)}>
                <span
                    aria-hidden="true"
                    className={cn(
                        fillBase,
                        "absolute inset-y-0 w-1/3",
                    )}
                    style={{ animation: "d-progress-indet 1.4s ease-in-out infinite" }}
                />
            </div>
        );
    } else if (v === "striped") {
        trackContent = (
            <div className={cn(trackBase, heightCls)}>
                <span
                    className={fillBase}
                    style={{
                        width: `${clamped}%`,
                        backgroundImage:
                            "linear-gradient(45deg, rgba(255,255,255,0.25) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.25) 75%, transparent 75%, transparent)",
                        backgroundSize: "14px 14px",
                        animation: "d-progress-stripe 0.8s linear infinite",
                    }}
                />
            </div>
        );
    } else if (v === "terminal") {
        const filledBlocks = Math.round((clamped / 100) * 10);
        const ascii = `[${"=".repeat(filledBlocks)}${" ".repeat(10 - filledBlocks)}] ${clamped}%`;
        trackContent = (
            <>
                <div className="flex justify-between font-mono text-[11px]">
                    <span>{label ?? "build"}</span>
                    <span className="text-(--diamond-accent,#2b7fff)">{valueText ?? ascii}</span>
                </div>
                <div className={cn(trackBase, heightCls, "rounded-none")}>
                    <span
                        className={cn(fillBase, "rounded-none")}
                        style={{ width: `${clamped}%` }}
                    />
                </div>
            </>
        );
    } else {
        trackContent = (
            <div className={cn(trackBase, heightCls)}>
                <span className={fillBase} style={{ width: `${clamped}%` }} />
            </div>
        );
    }

    const showFooter =
        !hideMeta && v !== "terminal" && (label !== undefined || valueText !== undefined || true);

    const footerRight =
        valueText ??
        (v === "stepped"
            ? `${Math.max(0, Math.min(steps, step ?? 0))} / ${steps}`
            : v === "indeterminate"
              ? "—"
              : `${clamped}%`);

    return (
        <div
            ref={ref}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={v === "stepped" ? steps : 100}
            aria-valuenow={v === "indeterminate" ? undefined : v === "stepped" ? step : clamped}
            aria-label={typeof label === "string" ? label : undefined}
            className={cn(progressVariants({ variant: v }), className)}
            style={inlineStyle}
            {...rest}
        >
            {trackContent}
            {showFooter ? (
                <div className="flex justify-between text-(--diamond-muted,#6b6862) text-[11px]">
                    <span>{label ?? (v === "indeterminate" ? "Syncing…" : "Progress")}</span>
                    <span>{footerRight}</span>
                </div>
            ) : null}
        </div>
    );
});

Progress.displayName = "Diamond.Progress";

export { progressVariants };
