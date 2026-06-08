"use client";

import { ArrowUUpLeft, At, CheckCircle, WarningOctagon, X } from "@phosphor-icons/react";
import * as RadixToast from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Toast — temporary notifications built on @radix-ui/react-toast.
 *
 * Wrap your app in <ToastProvider position="bottom-right" />, then call
 * `useToast()` to fire toasts imperatively:
 *
 *   const { toast } = useToast();
 *   toast({ title: "Saved", description: "Draft updated", variant: "success" });
 *
 * Variants map directly to the Feedback gallery (success bottom-right,
 * dark+undo, inline progress, error top-right, minimal centered, actionable
 * mention card). */

export type ToastVariant = "success" | "undo" | "progress" | "error" | "minimal" | "action";

const KEYFRAMES = `
@keyframes d-toast-slide-r { from { transform: translateX(calc(100% + 24px)); opacity: 0 } to { transform: translateX(0); opacity: 1 } }
@keyframes d-toast-slide-l { from { transform: translateX(calc(-100% - 24px)); opacity: 0 } to { transform: translateX(0); opacity: 1 } }
@keyframes d-toast-slide-t { from { transform: translateY(-120%); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
@keyframes d-toast-slide-b { from { transform: translateY(120%); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
@keyframes d-toast-fade-out { to { opacity: 0; transform: scale(0.96) } }
@keyframes d-toast-prog { 0% { width: 0% } 100% { width: 100% } }
`;
let keyframesInjected = false;
function useToastKeyframes(): void {
    React.useInsertionEffect(() => {
        if (keyframesInjected || typeof document === "undefined") return;
        keyframesInjected = true;
        const el = document.createElement("style");
        el.setAttribute("data-diamond", "keyframes");
        el.textContent = KEYFRAMES;
        document.head.appendChild(el);
    }, []);
}

const rootVariants = cva(
    [
        "pointer-events-auto relative flex items-start gap-2.5 rounded-md border p-3 text-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
        "data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x)",
        "data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform",
        "data-[swipe=end]:translate-x-(--radix-toast-swipe-end-x)",
        "data-[state=closed]:animate-[d-toast-fade-out_120ms_ease-out_forwards]",
    ].join(" "),
    {
        variants: {
            variant: {
                success:
                    "border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917)",
                undo: "border-transparent bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#fff)",
                progress:
                    "border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917)",
                error: "border-rose-500/30 bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917)",
                minimal:
                    "items-center justify-center rounded-full border-transparent bg-(--diamond-ink,#1a1917) px-4 py-2 text-(--diamond-surface,#fff)",
                action:
                    "flex-col items-stretch border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917)",
            },
        },
        defaultVariants: { variant: "success" },
    },
);

const ICON_FOR: Record<ToastVariant, React.ReactNode | null> = {
    success: <CheckCircle weight="fill" size={14} />,
    undo: <ArrowUUpLeft weight="bold" size={14} />,
    progress: null,
    error: <WarningOctagon weight="fill" size={14} />,
    minimal: null,
    action: <At weight="bold" size={14} />,
};
const ICON_BG: Record<ToastVariant, string> = {
    success: "bg-emerald-500 text-white",
    undo: "bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff)",
    progress: "bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff)",
    error: "bg-rose-500 text-white",
    minimal: "",
    action: "bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff)",
};

/* ----- Provider + viewport ------------------------------------------------- */

type ToastPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "bottom-center" | "top-center";

const POSITION_CLS: Record<ToastPosition, string> = {
    "top-left": "top-3 left-3",
    "top-right": "top-3 right-3",
    "bottom-left": "bottom-3 left-3",
    "bottom-right": "bottom-3 right-3",
    "bottom-center": "bottom-3 left-1/2 -translate-x-1/2",
    "top-center": "top-3 left-1/2 -translate-x-1/2",
};

interface ToastInput {
    id?: string;
    variant?: ToastVariant;
    title?: React.ReactNode;
    description?: React.ReactNode;
    /** Auto-dismiss in ms. Pass `null` to require manual dismissal. Default 4000. */
    duration?: number | null;
    /** Per-instance icon override. Pass `null` to hide. */
    icon?: React.ReactNode;
    /** Override accent color. */
    accent?: string;
    /** Per-instance position override. */
    position?: ToastPosition;
    /** Render an action button — clicking dispatches its `onAction`. */
    action?: {
        label: React.ReactNode;
        onAction?: () => void;
    };
    /** Progress variant — 0..100 (or omit for indeterminate). */
    progress?: number;
}

interface ToastInstance extends ToastInput {
    id: string;
    open: boolean;
}

interface ToastContextValue {
    toast: (input: ToastInput) => string;
    dismiss: (id: string) => void;
    update: (id: string, patch: Partial<ToastInput>) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
    const ctx = React.useContext(ToastContext);
    if (!ctx) throw new Error("Diamond.useToast must be called inside <ToastProvider>.");
    return ctx;
}

export interface ToastProviderProps {
    children: React.ReactNode;
    /** Default position for all toasts. Default "bottom-right". */
    position?: ToastPosition;
    /** Default auto-dismiss in ms. Default 4000. */
    defaultDuration?: number;
    /** Swipe direction. Default derives from `position`. */
    swipeDirection?: "right" | "left" | "up" | "down";
    /** Max simultaneous toasts. Default 5. */
    limit?: number;
}

export function ToastProvider({
    children,
    position = "bottom-right",
    defaultDuration = 4000,
    swipeDirection,
    limit = 5,
}: ToastProviderProps) {
    useToastKeyframes();
    const [toasts, setToasts] = React.useState<ToastInstance[]>([]);
    const idRef = React.useRef(0);

    const dispatch = React.useCallback(
        (input: ToastInput): string => {
            const id = input.id ?? `t${idRef.current++}`;
            setToasts((prev) => {
                const next: ToastInstance = {
                    duration: defaultDuration,
                    variant: "success",
                    ...input,
                    id,
                    open: true,
                };
                const without = prev.filter((t) => t.id !== id);
                const trimmed = without.length >= limit ? without.slice(-(limit - 1)) : without;
                return [...trimmed, next];
            });
            return id;
        },
        [defaultDuration, limit],
    );

    const dismiss = React.useCallback(
        (id: string) => setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, open: false } : t))),
        [],
    );
    const update = React.useCallback(
        (id: string, patch: Partial<ToastInput>) =>
            setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t))),
        [],
    );

    const value = React.useMemo<ToastContextValue>(
        () => ({ toast: dispatch, dismiss, update }),
        [dispatch, dismiss, update],
    );

    const swipe = swipeDirection ?? deriveSwipe(position);

    const groups: Record<ToastPosition, ToastInstance[]> = {
        "top-left": [],
        "top-right": [],
        "bottom-left": [],
        "bottom-right": [],
        "bottom-center": [],
        "top-center": [],
    };
    for (const t of toasts) groups[t.position ?? position].push(t);

    return (
        <ToastContext.Provider value={value}>
            <RadixToast.Provider swipeDirection={swipe} duration={defaultDuration}>
                {children}
                {toasts.map((t) => (
                    <ToastRoot
                        key={t.id}
                        toast={t}
                        onOpenChange={(open) =>
                            setToasts((prev) =>
                                open
                                    ? prev.map((it) => (it.id === t.id ? { ...it, open } : it))
                                    : prev.filter((it) => it.id !== t.id),
                            )
                        }
                    />
                ))}
                {(Object.keys(groups) as ToastPosition[]).map((p) =>
                    groups[p].length > 0 ? (
                        <RadixToast.Viewport
                            key={p}
                            className={cn(
                                "pointer-events-none fixed z-[100] m-0 flex w-[360px] max-w-[calc(100vw-24px)] list-none flex-col gap-2 outline-none",
                                p.startsWith("bottom") ? "flex-col-reverse" : "",
                                POSITION_CLS[p],
                            )}
                        />
                    ) : null,
                )}
            </RadixToast.Provider>
        </ToastContext.Provider>
    );
}

function deriveSwipe(position: ToastPosition): "right" | "left" | "up" | "down" {
    if (position.endsWith("right")) return "right";
    if (position.endsWith("left")) return "left";
    if (position.startsWith("top")) return "up";
    return "down";
}

/* ----- ToastRoot ----------------------------------------------------------- */

interface ToastRootProps {
    toast: ToastInstance;
    onOpenChange: (open: boolean) => void;
}

function ToastRoot({ toast, onOpenChange }: ToastRootProps) {
    const v = toast.variant ?? "success";
    const icon = toast.icon === null ? null : (toast.icon ?? ICON_FOR[v]);
    const style: React.CSSProperties = {};
    if (toast.accent) (style as Record<string, string>)["--diamond-accent"] = toast.accent;

    const duration = toast.duration === null ? Number.POSITIVE_INFINITY : (toast.duration ?? 4000);

    return (
        <RadixToast.Root
            open={toast.open}
            onOpenChange={onOpenChange}
            duration={duration}
            className={cn(rootVariants({ variant: v }), "data-[state=open]:animate-[d-toast-slide-r_180ms_ease-out]")}
            style={style}
        >
            {icon ? (
                <span
                    aria-hidden="true"
                    className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-full font-bold text-[11px]",
                        ICON_BG[v],
                    )}
                >
                    {icon}
                </span>
            ) : null}

            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                {toast.title ? (
                    <RadixToast.Title
                        className={cn(
                            "font-semibold leading-snug",
                            v === "minimal" && "font-normal text-[12px]",
                        )}
                    >
                        {toast.title}
                    </RadixToast.Title>
                ) : null}
                {toast.description ? (
                    <RadixToast.Description
                        className={cn(
                            "text-[11px] leading-snug",
                            v === "undo"
                                ? "text-(--diamond-surface,#fff)/70"
                                : "text-(--diamond-muted,#6b6862)",
                        )}
                    >
                        {toast.description}
                    </RadixToast.Description>
                ) : null}

                {v === "progress" ? (
                    <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-(--diamond-surface-alt,#ebe8e1)">
                        <span
                            className="block h-full rounded-full bg-(--diamond-accent,#2b7fff) transition-[width] duration-300"
                            style={
                                typeof toast.progress === "number"
                                    ? { width: `${Math.max(0, Math.min(100, toast.progress))}%` }
                                    : { animation: "d-toast-prog 1.4s ease-in-out infinite" }
                            }
                        />
                    </div>
                ) : null}

                {v === "action" && toast.action ? (
                    <div className="mt-2 flex gap-1.5">
                        <RadixToast.Close asChild>
                            <button
                                type="button"
                                className="flex-1 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) py-1 text-[11px] hover:bg-(--diamond-surface-alt,#ebe8e1)"
                            >
                                Later
                            </button>
                        </RadixToast.Close>
                        <RadixToast.Action
                            asChild
                            altText={typeof toast.action.label === "string" ? toast.action.label : "Open"}
                        >
                            <button
                                type="button"
                                onClick={toast.action.onAction}
                                className="flex-1 rounded-md bg-(--diamond-accent,#2b7fff) py-1 font-medium text-(--diamond-on-accent,#fff) text-[11px] hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_85%,black)]"
                            >
                                {toast.action.label}
                            </button>
                        </RadixToast.Action>
                    </div>
                ) : null}
            </div>

            {v === "undo" && toast.action ? (
                <RadixToast.Action
                    asChild
                    altText={typeof toast.action.label === "string" ? toast.action.label : "Undo"}
                >
                    <button
                        type="button"
                        onClick={toast.action.onAction}
                        className="cursor-pointer self-center font-semibold text-(--diamond-accent,#2b7fff) text-[11px] uppercase tracking-[0.06em] hover:underline"
                    >
                        {toast.action.label}
                    </button>
                </RadixToast.Action>
            ) : null}

            {v !== "minimal" && v !== "action" ? (
                <RadixToast.Close asChild>
                    <button
                        type="button"
                        aria-label="Dismiss"
                        className={cn(
                            "ml-1 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors",
                            v === "undo"
                                ? "text-(--diamond-surface,#fff)/60 hover:bg-white/10 hover:text-(--diamond-surface,#fff)"
                                : "text-(--diamond-muted,#6b6862) hover:bg-(--diamond-surface-alt,#ebe8e1) hover:text-(--diamond-ink,#1a1917)",
                        )}
                    >
                        <X size={12} weight="bold" />
                    </button>
                </RadixToast.Close>
            ) : null}
        </RadixToast.Root>
    );
}

/* ----- Static <Toast /> (manual mount, e.g. for examples) ------------------ */

export interface ToastProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof rootVariants> {
    title?: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    accent?: string;
    /** Action label — when set, render the variant-appropriate action slot. */
    actionLabel?: React.ReactNode;
    onAction?: () => void;
    onDismiss?: () => void;
    /** Progress variant 0..100. */
    progress?: number;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(function Toast(
    {
        className,
        variant = "success",
        title,
        description,
        icon,
        accent,
        actionLabel,
        onAction,
        onDismiss,
        progress,
        style,
        ...rest
    },
    ref,
) {
    useToastKeyframes();
    const v = variant ?? "success";
    const ico = icon === null ? null : (icon ?? ICON_FOR[v]);
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    return (
        <div ref={ref} role="status" className={cn(rootVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
            {ico ? (
                <span
                    aria-hidden="true"
                    className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-full font-bold text-[11px]",
                        ICON_BG[v],
                    )}
                >
                    {ico}
                </span>
            ) : null}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                {title ? <strong className="font-semibold leading-snug">{title}</strong> : null}
                {description ? (
                    <span
                        className={cn(
                            "text-[11px] leading-snug",
                            v === "undo" ? "text-(--diamond-surface,#fff)/70" : "text-(--diamond-muted,#6b6862)",
                        )}
                    >
                        {description}
                    </span>
                ) : null}
                {v === "progress" ? (
                    <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-(--diamond-surface-alt,#ebe8e1)">
                        <span
                            className="block h-full rounded-full bg-(--diamond-accent,#2b7fff)"
                            style={
                                typeof progress === "number"
                                    ? { width: `${Math.max(0, Math.min(100, progress))}%` }
                                    : { animation: "d-toast-prog 1.4s ease-in-out infinite", width: "40%" }
                            }
                        />
                    </div>
                ) : null}
                {v === "action" && actionLabel ? (
                    <div className="mt-2 flex gap-1.5">
                        <button
                            type="button"
                            onClick={onDismiss}
                            className="flex-1 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) py-1 text-[11px] hover:bg-(--diamond-surface-alt,#ebe8e1)"
                        >
                            Later
                        </button>
                        <button
                            type="button"
                            onClick={onAction}
                            className="flex-1 rounded-md bg-(--diamond-accent,#2b7fff) py-1 font-medium text-(--diamond-on-accent,#fff) text-[11px] hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_85%,black)]"
                        >
                            {actionLabel}
                        </button>
                    </div>
                ) : null}
            </div>
            {v === "undo" && actionLabel ? (
                <button
                    type="button"
                    onClick={onAction}
                    className="cursor-pointer self-center font-semibold text-(--diamond-accent,#2b7fff) text-[11px] uppercase tracking-[0.06em] hover:underline"
                >
                    {actionLabel}
                </button>
            ) : null}
            {v !== "minimal" && v !== "action" && onDismiss ? (
                <button
                    type="button"
                    aria-label="Dismiss"
                    onClick={onDismiss}
                    className={cn(
                        "ml-1 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors",
                        v === "undo"
                            ? "text-(--diamond-surface,#fff)/60 hover:bg-white/10 hover:text-(--diamond-surface,#fff)"
                            : "text-(--diamond-muted,#6b6862) hover:bg-(--diamond-surface-alt,#ebe8e1) hover:text-(--diamond-ink,#1a1917)",
                    )}
                >
                    <X size={12} weight="bold" />
                </button>
            ) : null}
        </div>
    );
});

Toast.displayName = "Diamond.Toast";

export { rootVariants };
