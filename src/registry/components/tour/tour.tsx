"use client";

import { CaretLeft, CaretRight, Sparkle, X } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

/* Diamond · Tour — multi-step product tour with spotlight + step card.
 *
 * ═══════════════════════════════════════════════════════════════════════
 *  QUICK START
 * ═══════════════════════════════════════════════════════════════════════
 *
 *   const [open, setOpen] = React.useState(false);
 *
 *   return (
 *     <>
 *       <Button onClick={() => setOpen(true)}>Take the tour</Button>
 *
 *       <Tour
 *         open={open}
 *         onOpenChange={setOpen}
 *         steps={[
 *           { target: "#sidebar",
 *             title: "Your workspace",
 *             description: "Switch projects, search, view notifications.",
 *             placement: "right" },
 *
 *           { target: "#new-button",
 *             title: "Create anything",
 *             description: "Press ⌘N anywhere to make a new project.",
 *             placement: "bottom" },
 *
 *           { // last step has no target → centered welcome card
 *             title: "You're all set!",
 *             description: "Have fun building.",
 *             variant: "accent-final" },
 *         ]}
 *         onComplete={() => analytics.track("tour_completed")}
 *       />
 *     </>
 *   );
 *
 * ═══════════════════════════════════════════════════════════════════════
 *  STEP TARGETING — point at ANY component or element
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Each step's `target` can be one of:
 *
 *   • CSS selector string  →  `"#main-nav"`, `"[data-tour='cta']"`
 *   • React ref            →  `myRef`  (React.RefObject<HTMLElement>)
 *   • Callback             →  `() => document.querySelector(".node")`
 *   • null / undefined     →  center-screen card, no spotlight
 *
 * The element is re-resolved when the step changes and remeasured on every
 * scroll / resize. If the target isn't in the DOM yet, the spotlight is
 * skipped for that step — the card still renders centered.
 *
 * ═══════════════════════════════════════════════════════════════════════
 *  PER-STEP CUSTOMIZATION
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Each step accepts:
 *
 *   target            : where to spotlight (see above)
 *   title             : heading inside the card
 *   description       : body text under the title
 *   placement         : "top" | "right" | "bottom" | "left" | "center" | "auto"
 *   variant           : "step" | "import" | "dark-tip" | "accent-final" | "new-feature"
 *   spotlightPadding  : px around the target (default 8)
 *   spotlightRadius   : border radius of the cutout (default 8)
 *   primaryLabel      : override CTA text for this step
 *   badge             : `new-feature` variant — small kicker text
 *   body              : arbitrary JSX rendered inside the card body
 *   onEnter           : called with the resolved target element
 *   onNext            : called when the user advances past this step
 *
 * ═══════════════════════════════════════════════════════════════════════
 *  TOUR-WIDE PROPS
 * ═══════════════════════════════════════════════════════════════════════
 *
 *   steps             : TourStep[]                  (required)
 *   open              : boolean                     (required, controlled)
 *   onOpenChange      : (open: boolean) => void     (required)
 *
 *   currentStep       : number   — controlled step index
 *   defaultStep       : number   — initial step  (default 0)
 *   onStepChange      : (n: number) => void
 *   onComplete        : called after the last step's Next
 *   onSkip            : called on Skip / Esc / backdrop click
 *
 *   variant           : default step-card variant
 *   placement         : default placement when step.placement is unset
 *
 *   backdrop          : show dimmed backdrop      (default true)
 *   backdropOpacity   : 0..1                      (default 0.5)
 *   accent            : CSS color override for `--diamond-accent`
 *
 *   spotlightPadding  : px around targets globally (default 8)
 *   spotlightRadius   : px corner radius          (default 8)
 *
 *   scrollIntoView    : auto-scroll target into view (default true)
 *   scrollBehavior    : "smooth" | "auto"         (default "smooth")
 *
 *   closeOnBackdrop   : skip the tour when backdrop is clicked (default false)
 *   closeOnEscape     : skip the tour on Esc       (default true)
 *
 *   showPrev          : render the Back button     (default true)
 *   showCounter       : render the "Step N / M"    (default true)
 *
 *   nextLabel / prevLabel / skipLabel / finishLabel : button labels
 *
 * ═══════════════════════════════════════════════════════════════════════
 *  KEYBOARD
 * ═══════════════════════════════════════════════════════════════════════
 *
 *   ArrowRight / Enter   → next step
 *   ArrowLeft           → previous step
 *   Esc                  → skip the tour
 *
 * ═══════════════════════════════════════════════════════════════════════
 *  STANDALONE STEP CARD
 * ═══════════════════════════════════════════════════════════════════════
 *
 * For a one-off callout (e.g. a "What's new" pill on the page), use
 * `<TourCard>` directly — no orchestrator, no spotlight:
 *
 *   <TourCard
 *     variant="new-feature"
 *     title="Realtime collaboration"
 *     description="See cursors instantly."
 *     badge="NEW"
 *     primaryLabel="Try it"
 *     onPrimary={openFeature}
 *   />
 *
 * ───────────────────────────────────────────────────────────────────────
 */

export type TourCardVariant = "step" | "import" | "dark-tip" | "accent-final" | "new-feature";

export type TourPlacement = "top" | "right" | "bottom" | "left" | "center" | "auto";

export type TourTarget =
    | string
    | React.RefObject<HTMLElement | null>
    | (() => HTMLElement | null)
    | null
    | undefined;

export interface TourStep {
    target?: TourTarget;
    title?: React.ReactNode;
    description?: React.ReactNode;
    placement?: TourPlacement;
    variant?: TourCardVariant;
    spotlightPadding?: number;
    spotlightRadius?: number;
    primaryLabel?: React.ReactNode;
    badge?: React.ReactNode;
    body?: React.ReactNode;
    onEnter?: (target: HTMLElement | null) => void;
    onNext?: () => void;
}

/* ----- Keyframes (spotlight pulse) ---------------------------------------- */

const KEYFRAMES = `
@keyframes d-tour-ping { 0% { transform: scale(1); opacity: 0.7 } 100% { transform: scale(2.4); opacity: 0 } }
@keyframes d-tour-pulse { 0%,100% { box-shadow: 0 0 0 0 var(--d-tour-ring, color-mix(in oklab, var(--diamond-accent,#2b7fff) 60%, transparent)) } 50% { box-shadow: 0 0 0 12px transparent } }
`;
let keyframesInjected = false;
function useTourKeyframes(): void {
    React.useInsertionEffect(() => {
        if (keyframesInjected || typeof document === "undefined") return;
        keyframesInjected = true;
        const el = document.createElement("style");
        el.setAttribute("data-diamond", "keyframes");
        el.textContent = KEYFRAMES;
        document.head.appendChild(el);
    }, []);
}

/* ----- TourCard — pure visual step card ---------------------------------- */

const cardVariants = cva(
    "relative flex w-full flex-col gap-2 rounded-lg p-4 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)]",
    {
        variants: {
            variant: {
                step: "border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917)",
                import:
                    "border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917)",
                "dark-tip": "border border-[#2d2c28] bg-[#1a1917] text-[#f5f3ef]",
                "accent-final":
                    "border border-(--diamond-accent,#2b7fff) bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff)",
                "new-feature":
                    "border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917)",
            },
        },
        defaultVariants: { variant: "step" },
    },
);

export interface TourCardProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
        VariantProps<typeof cardVariants> {
    title?: React.ReactNode;
    description?: React.ReactNode;
    step?: number;
    total?: number;
    primaryLabel?: React.ReactNode;
    skipLabel?: React.ReactNode;
    prevLabel?: React.ReactNode;
    onPrimary?: () => void;
    onSkip?: () => void;
    onPrev?: () => void;
    onClose?: () => void;
    badge?: React.ReactNode;
    accent?: string;
    arrow?: "top" | "right" | "bottom" | "left" | "none";
}

export const TourCard = React.forwardRef<HTMLDivElement, TourCardProps>(function TourCard(
    {
        className,
        variant = "step",
        title,
        description,
        step,
        total,
        primaryLabel,
        skipLabel,
        prevLabel,
        onPrimary,
        onSkip,
        onPrev,
        onClose,
        badge,
        accent,
        arrow = "none",
        style,
        children,
        ...rest
    },
    ref,
) {
    const v = variant ?? "step";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    if (v === "new-feature") {
        return (
            <div
                ref={ref}
                className={cn(cardVariants({ variant: v }), "flex-row items-center gap-2.5", className)}
                style={inlineStyle}
                {...rest}
            >
                <span
                    aria-hidden="true"
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_15%,var(--diamond-surface,#fff))] text-(--diamond-accent,#2b7fff)"
                >
                    <Sparkle size={16} weight="fill" />
                </span>
                <div className="flex flex-1 flex-col">
                    {badge ? (
                        <span className="font-mono text-[9px] text-(--diamond-accent,#2b7fff) uppercase tracking-[0.14em]">
                            {badge}
                        </span>
                    ) : null}
                    {title ? <strong className="font-semibold text-[13px]">{title}</strong> : null}
                    {description ? (
                        <span className="text-(--diamond-muted,#6b6862) text-[11px]">{description}</span>
                    ) : null}
                </div>
                {primaryLabel ? (
                    <button
                        type="button"
                        onClick={onPrimary}
                        className="inline-flex h-7 cursor-pointer items-center rounded-md bg-(--diamond-accent,#2b7fff) px-2.5 font-medium text-(--diamond-on-accent,#fff) text-[11px] hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_85%,#000)]"
                    >
                        {primaryLabel}
                    </button>
                ) : null}
            </div>
        );
    }

    const accentBg = v === "accent-final";
    const dark = v === "dark-tip" || accentBg;

    return (
        <div ref={ref} className={cn(cardVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
            {step !== undefined ? (
                <div className="flex items-center justify-between">
                    <span
                        className={cn(
                            "font-mono text-[10px] uppercase tracking-[0.14em]",
                            accentBg ? "text-white/80" : dark ? "text-[#a8a49c]" : "text-(--diamond-muted,#6b6862)",
                        )}
                    >
                        Step {step}
                        {total ? ` of ${total}` : ""}
                    </span>
                    {onClose ? (
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className={cn(
                                "inline-flex size-6 cursor-pointer items-center justify-center rounded transition-colors",
                                accentBg
                                    ? "text-white/70 hover:bg-white/10 hover:text-white"
                                    : dark
                                      ? "text-[#a8a49c] hover:bg-white/10 hover:text-[#f5f3ef]"
                                      : "text-(--diamond-muted,#6b6862) hover:bg-(--diamond-surface-alt,#ebe8e1) hover:text-(--diamond-ink,#1a1917)",
                            )}
                        >
                            <X size={12} weight="bold" />
                        </button>
                    ) : null}
                </div>
            ) : null}
            {title ? <strong className="font-semibold text-[14px] tracking-tight">{title}</strong> : null}
            {description ? (
                <p
                    className={cn(
                        "text-[12px] leading-relaxed",
                        accentBg ? "text-white/90" : dark ? "text-[#a8a49c]" : "text-(--diamond-muted,#6b6862)",
                    )}
                >
                    {description}
                </p>
            ) : null}
            {children}
            {(primaryLabel || skipLabel || prevLabel) ? (
                <div className="mt-1 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        {prevLabel ? (
                            <button
                                type="button"
                                onClick={onPrev}
                                className={cn(
                                    "inline-flex h-7 cursor-pointer items-center gap-1 rounded-md border px-2.5 font-medium text-[12px]",
                                    accentBg
                                        ? "border-white/20 text-white/80 hover:bg-white/10"
                                        : dark
                                          ? "border-[#2d2c28] text-[#a8a49c] hover:bg-white/5"
                                          : "border-(--diamond-border,#d9d5cc) text-(--diamond-muted,#6b6862) hover:bg-(--diamond-surface-alt,#ebe8e1)",
                                )}
                            >
                                <CaretLeft size={10} weight="bold" />
                                {prevLabel}
                            </button>
                        ) : null}
                        {skipLabel ? (
                            <button
                                type="button"
                                onClick={onSkip}
                                className={cn(
                                    "cursor-pointer text-[11px] underline-offset-2 hover:underline",
                                    accentBg ? "text-white/80" : dark ? "text-[#a8a49c]" : "text-(--diamond-muted,#6b6862)",
                                )}
                            >
                                {skipLabel}
                            </button>
                        ) : null}
                    </div>
                    {primaryLabel ? (
                        <button
                            type="button"
                            onClick={onPrimary}
                            className={cn(
                                "inline-flex h-7 cursor-pointer items-center gap-1 rounded-md px-3 font-medium text-[12px]",
                                accentBg
                                    ? "bg-white text-(--diamond-accent,#2b7fff) hover:bg-white/90"
                                    : "bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff) hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_85%,#000)]",
                            )}
                        >
                            {primaryLabel}
                            <CaretRight size={10} weight="bold" />
                        </button>
                    ) : null}
                </div>
            ) : null}

            {arrow !== "none" ? (
                <span
                    aria-hidden="true"
                    className={cn(
                        "absolute size-2.5 rotate-45",
                        accentBg ? "bg-(--diamond-accent,#2b7fff)" : dark ? "bg-[#1a1917]" : "bg-(--diamond-surface,#fff)",
                        arrow === "top" && "-top-1.5 left-1/2 -translate-x-1/2 border-t border-l border-(--diamond-border,#d9d5cc)",
                        arrow === "bottom" && "-bottom-1.5 left-1/2 -translate-x-1/2 border-b border-r border-(--diamond-border,#d9d5cc)",
                        arrow === "left" && "-left-1.5 top-1/2 -translate-y-1/2 border-b border-l border-(--diamond-border,#d9d5cc)",
                        arrow === "right" && "-right-1.5 top-1/2 -translate-y-1/2 border-t border-r border-(--diamond-border,#d9d5cc)",
                    )}
                />
            ) : null}
        </div>
    );
});

TourCard.displayName = "Diamond.TourCard";

/* ----- Spotlight ping — purely decorative pulse circle ------------------- */

export interface TourSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number;
    accent?: string;
}

export const TourSpotlight = React.forwardRef<HTMLDivElement, TourSpotlightProps>(function TourSpotlight(
    { className, size = 64, accent, style, children, ...rest },
    ref,
) {
    useTourKeyframes();
    const inlineStyle: React.CSSProperties = { width: size, height: size, ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;
    return (
        <div
            ref={ref}
            className={cn("relative inline-flex items-center justify-center", className)}
            style={inlineStyle}
            {...rest}
        >
            <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border-2 border-(--diamond-accent,#2b7fff)"
                style={{ animation: "d-tour-pulse 1.6s ease-in-out infinite" }}
            />
            <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-(--diamond-accent,#2b7fff)/30"
                style={{ animation: "d-tour-ping 1.8s cubic-bezier(0,0,0.2,1) infinite" }}
            />
            <span className="relative flex size-3 rounded-full bg-(--diamond-accent,#2b7fff)" />
            {children}
        </div>
    );
});

TourSpotlight.displayName = "Diamond.TourSpotlight";

/* ----- Tour — orchestrator with spotlight + step navigation -------------- */

export interface TourProps {
    steps: TourStep[];
    open: boolean;
    onOpenChange: (open: boolean) => void;

    currentStep?: number;
    defaultStep?: number;
    onStepChange?: (step: number) => void;

    onComplete?: () => void;
    onSkip?: () => void;

    variant?: TourCardVariant;
    placement?: TourPlacement;

    backdrop?: boolean;
    backdropOpacity?: number;
    accent?: string;

    spotlightPadding?: number;
    spotlightRadius?: number;

    scrollIntoView?: boolean;
    scrollBehavior?: ScrollBehavior;

    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;

    showPrev?: boolean;
    showCounter?: boolean;

    nextLabel?: React.ReactNode;
    prevLabel?: React.ReactNode;
    skipLabel?: React.ReactNode;
    finishLabel?: React.ReactNode;

    /** Width of the step card in px. Default 320. */
    cardWidth?: number;

    /** Container to portal into. Default document.body. */
    container?: HTMLElement | null;

    className?: string;
}

function resolveTarget(target: TourTarget | undefined): HTMLElement | null {
    if (!target || typeof window === "undefined") return null;
    if (typeof target === "string") return document.querySelector<HTMLElement>(target);
    if (typeof target === "function") return target();
    return target.current ?? null;
}

function placeCard(
    rect: DOMRect | null,
    placement: TourPlacement,
    cardW: number,
    cardH: number,
    gap = 12,
    margin = 16,
): { top: number; left: number; arrow: TourCardProps["arrow"] } {
    if (typeof window === "undefined") return { top: 0, left: 0, arrow: "none" };
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (!rect || placement === "center") {
        return {
            top: vh / 2 - cardH / 2,
            left: vw / 2 - cardW / 2,
            arrow: "none",
        };
    }

    let p = placement;
    if (p === "auto") {
        const space = { top: rect.top, right: vw - rect.right, bottom: vh - rect.bottom, left: rect.left };
        const best = (Object.entries(space) as Array<[Exclude<TourPlacement, "auto" | "center">, number]>)
            .sort((a, b) => b[1] - a[1])[0][0];
        p = best;
    }

    let top = 0;
    let left = 0;
    let arrow: TourCardProps["arrow"] = "none";

    if (p === "top") {
        top = rect.top - cardH - gap;
        left = rect.left + rect.width / 2 - cardW / 2;
        arrow = "bottom";
    } else if (p === "bottom") {
        top = rect.bottom + gap;
        left = rect.left + rect.width / 2 - cardW / 2;
        arrow = "top";
    } else if (p === "left") {
        top = rect.top + rect.height / 2 - cardH / 2;
        left = rect.left - cardW - gap;
        arrow = "right";
    } else if (p === "right") {
        top = rect.top + rect.height / 2 - cardH / 2;
        left = rect.right + gap;
        arrow = "left";
    }

    top = Math.max(margin, Math.min(vh - cardH - margin, top));
    left = Math.max(margin, Math.min(vw - cardW - margin, left));

    return { top, left, arrow };
}

export const Tour: React.FC<TourProps> = (props) => {
    const {
        steps,
        open,
        onOpenChange,
        currentStep: stepProp,
        defaultStep = 0,
        onStepChange,
        onComplete,
        onSkip,
        variant: defaultVariant = "step",
        placement: defaultPlacement = "auto",
        backdrop = true,
        backdropOpacity = 0.5,
        accent,
        spotlightPadding = 8,
        spotlightRadius = 8,
        scrollIntoView = true,
        scrollBehavior = "smooth",
        closeOnBackdrop = false,
        closeOnEscape = true,
        showPrev = true,
        showCounter = true,
        nextLabel = "Next",
        prevLabel = "Back",
        skipLabel = "Skip tour",
        finishLabel = "Finish",
        cardWidth = 320,
        container,
        className,
    } = props;

    const [internalStep, setInternalStep] = React.useState(defaultStep);
    const isStepControlled = stepProp !== undefined;
    const step = isStepControlled ? stepProp : internalStep;
    const setStep = React.useCallback(
        (next: number) => {
            const clamped = Math.max(0, Math.min(steps.length - 1, next));
            if (!isStepControlled) setInternalStep(clamped);
            onStepChange?.(clamped);
        },
        [isStepControlled, onStepChange, steps.length],
    );

    const [rect, setRect] = React.useState<DOMRect | null>(null);
    const [cardHeight, setCardHeight] = React.useState(200);
    const cardRef = React.useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    const currentStep = steps[step];
    const placement = currentStep?.placement ?? defaultPlacement;
    const stepSpotlightPad = currentStep?.spotlightPadding ?? spotlightPadding;
    const stepSpotlightRadius = currentStep?.spotlightRadius ?? spotlightRadius;

    /* Measure target on step change + on scroll/resize. */
    React.useEffect(() => {
        if (!open || !currentStep) return;

        let raf = 0;
        const measure = () => {
            const el = resolveTarget(currentStep.target);
            if (el) {
                if (scrollIntoView) {
                    el.scrollIntoView({ behavior: scrollBehavior, block: "center", inline: "center" });
                }
                cancelAnimationFrame(raf);
                raf = requestAnimationFrame(() => {
                    setRect(el.getBoundingClientRect());
                });
                currentStep.onEnter?.(el);
            } else {
                setRect(null);
                currentStep.onEnter?.(null);
            }
        };

        measure();
        window.addEventListener("resize", measure);
        window.addEventListener("scroll", measure, true);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", measure);
            window.removeEventListener("scroll", measure, true);
        };
    }, [open, currentStep, scrollIntoView, scrollBehavior]);

    /* Measure card height to position correctly. */
    useIsomorphicLayoutEffect(() => {
        if (!open || !cardRef.current) return;
        const r = cardRef.current.getBoundingClientRect();
        setCardHeight(r.height);
    }, [open]);
    useIsomorphicLayoutEffect(() => {
        if (!cardRef.current) return;
        const ro = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) setCardHeight(entry.contentRect.height);
        });
        ro.observe(cardRef.current);
        return () => ro.disconnect();
    }, []);

    const handleNext = React.useCallback(() => {
        currentStep?.onNext?.();
        if (step >= steps.length - 1) {
            onComplete?.();
            onOpenChange(false);
        } else {
            setStep(step + 1);
        }
    }, [currentStep, onComplete, onOpenChange, setStep, step, steps.length]);

    const handlePrev = React.useCallback(() => {
        if (step > 0) setStep(step - 1);
    }, [setStep, step]);

    const handleSkip = React.useCallback(() => {
        onSkip?.();
        onOpenChange(false);
    }, [onOpenChange, onSkip]);

    /* Keyboard. */
    React.useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && closeOnEscape) {
                e.preventDefault();
                handleSkip();
            } else if (e.key === "ArrowRight" || e.key === "Enter") {
                e.preventDefault();
                handleNext();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                handlePrev();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, closeOnEscape, handleNext, handlePrev, handleSkip]);

    if (!mounted || !open || !currentStep) return null;
    const portalTarget = container ?? (typeof document !== "undefined" ? document.body : null);
    if (!portalTarget) return null;

    const isLast = step === steps.length - 1;
    const cardVariant = currentStep.variant ?? defaultVariant;
    const pos = placeCard(rect, placement, cardWidth, cardHeight);

    return createPortal(
        <div
            className={cn("fixed inset-0 z-50", className)}
            role="dialog"
            aria-modal="true"
            aria-label="Product tour"
        >
            {backdrop ? (
                <svg
                    className="pointer-events-none fixed inset-0 size-full"
                    aria-hidden="true"
                    style={{ pointerEvents: closeOnBackdrop ? "auto" : "none" }}
                    onClick={closeOnBackdrop ? handleSkip : undefined}
                >
                    <defs>
                        <mask id="diamond-tour-mask">
                            <rect width="100%" height="100%" fill="white" />
                            {rect ? (
                                <rect
                                    x={rect.x - stepSpotlightPad}
                                    y={rect.y - stepSpotlightPad}
                                    width={rect.width + 2 * stepSpotlightPad}
                                    height={rect.height + 2 * stepSpotlightPad}
                                    rx={stepSpotlightRadius}
                                    fill="black"
                                />
                            ) : null}
                        </mask>
                    </defs>
                    <rect
                        width="100%"
                        height="100%"
                        fill={`rgba(0,0,0,${backdropOpacity})`}
                        mask="url(#diamond-tour-mask)"
                    />
                </svg>
            ) : null}

            <div
                className="pointer-events-auto absolute"
                style={{ top: pos.top, left: pos.left, width: cardWidth }}
            >
                <TourCard
                    ref={cardRef}
                    variant={cardVariant}
                    title={currentStep.title}
                    description={currentStep.description}
                    step={showCounter ? step + 1 : undefined}
                    total={showCounter ? steps.length : undefined}
                    primaryLabel={currentStep.primaryLabel ?? (isLast ? finishLabel : nextLabel)}
                    skipLabel={!isLast ? skipLabel : undefined}
                    prevLabel={showPrev && step > 0 ? prevLabel : undefined}
                    onPrimary={handleNext}
                    onSkip={handleSkip}
                    onPrev={handlePrev}
                    onClose={handleSkip}
                    badge={currentStep.badge}
                    accent={accent}
                    arrow={pos.arrow}
                >
                    {currentStep.body}
                </TourCard>
            </div>
        </div>,
        portalTarget,
    );
};

export { cardVariants as tourCardVariants };
