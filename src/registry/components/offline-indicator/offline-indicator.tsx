"use client";

import { ArrowsClockwise, CellSignalSlash, WifiSlash } from "@phosphor-icons/react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · OfflineIndicator — network loss banners. By default subscribes to
 * the browser `online`/`offline` events and renders only while the user is
 * disconnected. Pass `online={true}` to override the detection (controlled
 * mode). */

export type OfflineIndicatorVariant =
    | "top-bar"
    | "pill"
    | "chip"
    | "reconnecting"
    | "blocker"
    | "retry";

const offlineVariants = cva(
    "fixed z-50 flex items-center gap-2 text-(--diamond-ink,#1a1917) text-[12px]",
    {
        variants: {
            variant: {
                "top-bar":
                    "top-0 left-0 right-0 bg-amber-500 px-4 py-2 font-semibold text-white",
                pill: "bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-(--diamond-ink,#1a1917) px-3 py-1.5 text-(--diamond-surface,#fff)",
                chip: "top-2 right-2 rounded-full border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2.5 py-1 text-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
                reconnecting:
                    "top-0 left-0 right-0 border-b border-amber-500/30 bg-[color-mix(in_oklab,#f59e0b_18%,var(--diamond-surface,#fff))] px-4 py-2 text-amber-700",
                blocker:
                    "inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm",
                retry: "bottom-3 left-3 right-3 rounded-md border border-(--diamond-border,#d9d5cc) border-l-4 border-l-amber-500 bg-(--diamond-surface,#fff) px-3 py-2 shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
            },
        },
        defaultVariants: { variant: "top-bar" },
    },
);

const KEYFRAMES = `@keyframes d-spin-360 { to { transform: rotate(360deg) } }`;
let keyframesInjected = false;
function useOfflineKeyframes(): void {
    React.useInsertionEffect(() => {
        if (keyframesInjected || typeof document === "undefined") return;
        keyframesInjected = true;
        const el = document.createElement("style");
        el.setAttribute("data-diamond", "keyframes");
        el.textContent = KEYFRAMES;
        document.head.appendChild(el);
    }, []);
}

function useOnline(initial: boolean | undefined): boolean {
    const [online, setOnline] = React.useState(() => {
        if (typeof initial === "boolean") return initial;
        if (typeof navigator === "undefined") return true;
        return navigator.onLine;
    });
    React.useEffect(() => {
        if (typeof initial === "boolean" || typeof window === "undefined") return;
        const handleOn = () => setOnline(true);
        const handleOff = () => setOnline(false);
        window.addEventListener("online", handleOn);
        window.addEventListener("offline", handleOff);
        return () => {
            window.removeEventListener("online", handleOn);
            window.removeEventListener("offline", handleOff);
        };
    }, [initial]);
    return online;
}

export interface OfflineIndicatorProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof offlineVariants> {
    /** Controlled online state. When omitted, subscribes to `navigator.onLine`. */
    online?: boolean;
    /** Override message — defaults vary per variant. */
    message?: React.ReactNode;
    /** Retry variant — handler called when the Retry button is clicked. */
    onRetry?: () => void;
    /** Custom retry label, e.g. "Try again". */
    retryLabel?: string;
    /** Force visible regardless of online state. Useful for previews. */
    visible?: boolean;
    /** Render inline instead of fixed. */
    inline?: boolean;
    accent?: string;
    asChild?: boolean;
}

export const OfflineIndicator = React.forwardRef<HTMLDivElement, OfflineIndicatorProps>(
    function OfflineIndicator(
        {
            className,
            variant = "top-bar",
            online: onlineProp,
            message,
            onRetry,
            retryLabel = "Retry",
            visible,
            inline = false,
            accent,
            asChild = false,
            style,
            children,
            ...rest
        },
        ref,
    ) {
        useOfflineKeyframes();
        const online = useOnline(onlineProp);
        const shouldShow = visible ?? !online;
        if (!shouldShow) return null;

        const v = variant ?? "top-bar";
        const Comp: React.ElementType = asChild ? Slot : "div";
        const inlineStyle: React.CSSProperties = { ...style };
        if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

        const positionCls = inline ? "static" : "";

        if (v === "blocker") {
            return (
                <Comp
                    ref={ref}
                    role="alert"
                    className={cn(offlineVariants({ variant: v }), positionCls, className)}
                    style={inlineStyle}
                    {...rest}
                >
                    <div className="flex flex-col items-center rounded-lg bg-(--diamond-surface,#fff) p-4 text-center shadow-2xl">
                        <CellSignalSlash size={28} weight="duotone" className="mb-1 text-(--diamond-muted,#6b6862)" />
                        <strong className="text-[13px]">{message ?? "You're offline"}</strong>
                        <span className="mt-0.5 text-[11px] text-(--diamond-muted,#6b6862)">Check your network</span>
                        {children}
                    </div>
                </Comp>
            );
        }

        return (
            <Comp
                ref={ref}
                role="status"
                aria-live="polite"
                className={cn(offlineVariants({ variant: v }), positionCls, className)}
                style={inlineStyle}
                {...rest}
            >
                {v === "top-bar" ? (
                    <>
                        <WifiSlash size={14} weight="bold" />
                        <span>{message ?? "No internet connection. Working offline."}</span>
                    </>
                ) : v === "pill" ? (
                    <>
                        <span className="size-1.5 rounded-full bg-rose-400" />
                        <span>{message ?? "You're offline"}</span>
                    </>
                ) : v === "chip" ? (
                    <>
                        <span className="size-1.5 rounded-full bg-rose-500" />
                        <span>{message ?? "Offline"}</span>
                    </>
                ) : v === "reconnecting" ? (
                    <>
                        <CellSignalSlash size={14} weight="bold" />
                        <span className="flex-1">{message ?? "Reconnecting…"}</span>
                        <ArrowsClockwise
                            size={14}
                            weight="bold"
                            style={{ animation: "d-spin-360 1s linear infinite" }}
                        />
                    </>
                ) : v === "retry" ? (
                    <>
                        <strong className="flex-1">{message ?? "Connection lost."}</strong>
                        <button
                            type="button"
                            onClick={onRetry}
                            className="inline-flex h-6 cursor-pointer items-center rounded-sm bg-(--diamond-ink,#1a1917) px-2 font-medium text-(--diamond-surface,#fff) text-[10px] hover:bg-[color-mix(in_oklab,var(--diamond-ink,#1a1917)_85%,var(--diamond-surface,#fff))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--diamond-accent,#2b7fff)"
                        >
                            {retryLabel}
                        </button>
                    </>
                ) : null}
                {children}
            </Comp>
        );
    },
);

OfflineIndicator.displayName = "Diamond.OfflineIndicator";

export { offlineVariants };
