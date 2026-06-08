"use client";

import { ArrowRight, Check } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Pricing — single tier card or stacked rows with selection + reactive billing toggle. */

export type PricingVariant = "starter" | "featured" | "stacked" | "enterprise" | "toggle" | "discount";

const pricingVariants = cva(
    "flex w-[260px] flex-col gap-3 rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-4 text-(--diamond-ink,#1a1917) transition-all duration-200",
    {
        variants: {
            variant: {
                starter: "",
                featured:
                    "relative border-(--diamond-accent,#2b7fff) shadow-[0_8px_24px_-8px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_30%,transparent)]",
                stacked: "w-full gap-1.5 border-0 bg-transparent p-0",
                enterprise:
                    "border-(--diamond-ink,#1a1917) bg-(--diamond-ink,#1a1917) text-center text-(--diamond-surface,#fff)",
                toggle: "",
                discount: "",
            },
        },
        defaultVariants: { variant: "starter" },
    },
);

export interface PricingTier {
    /** Stable id (required for `stacked` selection + `toggle` reactivity). */
    id?: React.Key;
    name: React.ReactNode;
    /** Base price (when `prices` is not used, or no `toggle` variant). */
    price: React.ReactNode;
    /** Per-billing-period prices: `{ monthly: "$28", yearly: "$224" }` — used on `toggle` variant. */
    prices?: Record<string, React.ReactNode>;
    /** "/mo", "/year", custom suffix. */
    period?: React.ReactNode;
    /** Per-billing-period period labels. */
    periods?: Record<string, React.ReactNode>;
    description?: React.ReactNode;
    features?: React.ReactNode[];
    ctaLabel?: React.ReactNode;
    onCta?: () => void;
    originalPrice?: React.ReactNode;
    /** Discount badge text (`discount`). */
    discount?: React.ReactNode;
    /** Highlight (renders the "POPULAR" pin on cards; soft tint on stacked rows). */
    highlighted?: boolean;
}

export interface PricingBillingPeriod {
    id: string;
    label: React.ReactNode;
    /** Controlled active flag (when not using `defaultBillingId`). */
    active?: boolean;
}

export interface PricingProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onSelect">,
        VariantProps<typeof pricingVariants> {
    /** Single-tier display. */
    tier?: PricingTier;
    /** Stacked-rows display. */
    tiers?: PricingTier[];
    /** Toggle UI for billing period. */
    billingPeriods?: PricingBillingPeriod[];
    /** Controlled active billing id. */
    activeBillingId?: string;
    /** Default active billing id (uncontrolled). */
    defaultBillingId?: string;
    onBillingChange?: (id: string) => void;

    /** Controlled selected tier id (`stacked`). */
    selectedTierId?: React.Key;
    /** Default selected tier id (`stacked`, uncontrolled). */
    defaultSelectedTierId?: React.Key;
    onSelectTier?: (id: React.Key, tier: PricingTier) => void;
    /** CTA label shown below the stacked list when a tier is selected (e.g. "Continue with"). */
    selectionCtaLabel?: React.ReactNode;
    /** Click handler for the selection CTA (`stacked`). */
    onSelectionCta?: (tier: PricingTier) => void;

    /** Whole-card click handler (single-tier variants). Card becomes a button. */
    onSelect?: () => void;
    /** Disables hover/active interactions. */
    disabled?: boolean;
    accent?: string;
}

const KEYFRAMES = `
@keyframes diamond-pricing-fade {
    from { opacity: 0; transform: translateY(2px); }
    to { opacity: 1; transform: translateY(0); }
}
`;

function useKeyframes() {
    React.useInsertionEffect(() => {
        if (typeof document === "undefined") return;
        if (document.querySelector('style[data-diamond="pricing-keyframes"]')) return;
        const style = document.createElement("style");
        style.setAttribute("data-diamond", "pricing-keyframes");
        style.textContent = KEYFRAMES;
        document.head.appendChild(style);
    }, []);
}

function resolvePrice(tier: PricingTier, billingId?: string): React.ReactNode {
    if (billingId && tier.prices && billingId in tier.prices) return tier.prices[billingId];
    return tier.price;
}

function resolvePeriod(tier: PricingTier, billingId?: string): React.ReactNode {
    if (billingId && tier.periods && billingId in tier.periods) return tier.periods[billingId];
    return tier.period;
}

export const Pricing = React.forwardRef<HTMLDivElement, PricingProps>(function Pricing(
    {
        className,
        variant = "starter",
        tier,
        tiers,
        billingPeriods,
        activeBillingId,
        defaultBillingId,
        onBillingChange,
        selectedTierId: controlledSelectedId,
        defaultSelectedTierId,
        onSelectTier,
        selectionCtaLabel = "Continue with",
        onSelectionCta,
        onSelect,
        disabled,
        accent,
        style,
        ...rest
    },
    ref,
) {
    useKeyframes();
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    /* Billing period state (toggle variant) — hybrid controlled/uncontrolled. */
    const isBillingControlled = activeBillingId !== undefined;
    const [internalBilling, setInternalBilling] = React.useState<string | undefined>(
        defaultBillingId ?? billingPeriods?.find((p) => p.active)?.id ?? billingPeriods?.[0]?.id,
    );
    const currentBillingId = activeBillingId ?? internalBilling;
    const handleBilling = (id: string) => {
        if (!isBillingControlled) setInternalBilling(id);
        onBillingChange?.(id);
    };

    /* Stacked selection state — hybrid controlled/uncontrolled. */
    const isSelectionControlled = controlledSelectedId !== undefined;
    const [internalSelectedId, setInternalSelectedId] = React.useState<React.Key | undefined>(
        defaultSelectedTierId ?? tiers?.find((t) => t.highlighted)?.id ?? tiers?.[0]?.id,
    );
    const currentSelectedId = controlledSelectedId ?? internalSelectedId;
    const handleSelectTier = (t: PricingTier) => {
        if (t.id === undefined) return;
        if (!isSelectionControlled) setInternalSelectedId(t.id);
        onSelectTier?.(t.id, t);
    };

    if (variant === "stacked" && tiers) {
        const selectedTier = tiers.find((t) => t.id !== undefined && t.id === currentSelectedId);

        return (
            <div ref={ref} className={cn(pricingVariants({ variant }), className)} style={inlineStyle} {...rest}>
                {tiers.map((t, i) => {
                    const isSelected = t.id !== undefined && t.id === currentSelectedId;
                    const isHighlighted = t.highlighted;
                    const isClickable = onSelectTier !== undefined || !isSelectionControlled;
                    const key = t.id ?? i;
                    return (
                        <button
                            type="button"
                            key={key}
                            onClick={() => handleSelectTier(t)}
                            disabled={!isClickable || disabled}
                            aria-pressed={isSelected}
                            className={cn(
                                "group flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-left transition-all duration-150",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--diamond-accent,#2b7fff) focus-visible:ring-offset-1",
                                "disabled:cursor-not-allowed disabled:opacity-60",
                                isSelected
                                    ? "border border-(--diamond-accent,#2b7fff) bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_12%,var(--diamond-surface,#fff))] shadow-[0_4px_12px_-4px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_30%,transparent)]"
                                    : isHighlighted
                                      ? "border border-(--diamond-accent,#2b7fff)/40 bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_5%,var(--diamond-surface,#fff))] hover:border-(--diamond-accent,#2b7fff) hover:-translate-y-px"
                                      : "border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) hover:border-(--diamond-accent,#2b7fff)/50 hover:-translate-y-px",
                            )}
                        >
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "inline-flex size-4 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
                                    isSelected
                                        ? "scale-100 border-(--diamond-accent,#2b7fff) bg-(--diamond-accent,#2b7fff)"
                                        : "border-(--diamond-border,#d9d5cc) group-hover:border-(--diamond-accent,#2b7fff)",
                                )}
                            >
                                <Check
                                    weight="bold"
                                    size={9}
                                    className={cn(
                                        "text-(--diamond-on-accent,#fff) transition-all duration-150",
                                        isSelected ? "scale-100 opacity-100" : "scale-50 opacity-0",
                                    )}
                                />
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block font-semibold text-[13px]">{t.name}</span>
                                {t.description && (
                                    <span className="block text-(--diamond-muted,#6b6862) text-[10px]">
                                        {t.description}
                                    </span>
                                )}
                            </span>
                            <span className="font-medium text-[18px] tracking-tight [font-family:Fraunces,Georgia,serif]">
                                {resolvePrice(t, currentBillingId)}
                            </span>
                        </button>
                    );
                })}

                {selectedTier && onSelectionCta && (
                    <button
                        type="button"
                        onClick={() => onSelectionCta(selectedTier)}
                        className="mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-(--diamond-accent,#2b7fff) px-4 py-2 font-medium text-(--diamond-on-accent,#fff) text-[13px] transition-all duration-150 hover:brightness-110 active:scale-[0.98]"
                    >
                        <span>
                            {selectionCtaLabel} <strong>{selectedTier.name}</strong>
                        </span>
                        <ArrowRight weight="bold" size={13} />
                    </button>
                )}
            </div>
        );
    }

    if (!tier) return null;

    /* Single-tier branches — featured / starter / enterprise / discount / toggle. */

    const cardClickable = onSelect !== undefined && !disabled;
    const cardCommonProps = {
        ref,
        className: cn(
            pricingVariants({ variant }),
            cardClickable && "cursor-pointer hover:-translate-y-1 hover:shadow-lg",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--diamond-accent,#2b7fff) focus-visible:ring-offset-2",
            disabled && "cursor-not-allowed opacity-60",
            className,
        ),
        style: inlineStyle,
        onClick: cardClickable ? onSelect : undefined,
        tabIndex: cardClickable ? 0 : undefined,
        onKeyDown: cardClickable
            ? (e: React.KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect?.();
                  }
              }
            : undefined,
        role: cardClickable ? "button" : undefined,
        ...rest,
    };

    if (variant === "enterprise") {
        return (
            <div {...cardCommonProps}>
                <div className="text-(--diamond-accent,#2b7fff) text-[10px] uppercase tracking-[0.16em]">
                    {tier.name}
                </div>
                <div className="font-medium text-[28px] italic leading-tight [font-family:Fraunces,Georgia,serif]">
                    {tier.price}
                </div>
                {tier.description && <div className="text-[#a8a49c] text-[12px]">{tier.description}</div>}
                {tier.ctaLabel && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            tier.onCta?.();
                        }}
                        className="mx-auto mt-2 inline-flex cursor-pointer items-center justify-center rounded-md bg-(--diamond-accent,#2b7fff) px-5 py-2 font-medium text-(--diamond-on-accent,#fff) text-[13px] transition-all duration-150 hover:brightness-110 active:scale-[0.97]"
                    >
                        {tier.ctaLabel}
                    </button>
                )}
            </div>
        );
    }

    const resolvedPrice = resolvePrice(tier, currentBillingId);
    const resolvedPeriod = resolvePeriod(tier, currentBillingId);

    return (
        <div {...cardCommonProps}>
            {variant === "featured" && (
                <span className="-top-2.5 absolute right-3 rounded-full bg-(--diamond-accent,#2b7fff) px-2 py-0.5 font-bold text-(--diamond-on-accent,#fff) text-[9px] uppercase tracking-[0.14em]">
                    Popular
                </span>
            )}
            {variant === "toggle" && billingPeriods && (
                <div
                    className="flex gap-1 rounded-md bg-(--diamond-surface-alt,#ebe8e1) p-1 text-[11px]"
                    role="tablist"
                    aria-label="Billing period"
                >
                    {billingPeriods.map((p) => {
                        const isActive = currentBillingId === p.id;
                        return (
                            <button
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                key={p.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleBilling(p.id);
                                }}
                                className={cn(
                                    "flex-1 cursor-pointer rounded px-2 py-1 transition-all duration-150",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--diamond-accent,#2b7fff)",
                                    isActive
                                        ? "bg-(--diamond-surface,#fff) font-semibold shadow-sm"
                                        : "text-(--diamond-muted,#6b6862) hover:text-(--diamond-ink,#1a1917)",
                                )}
                            >
                                {p.label}
                            </button>
                        );
                    })}
                </div>
            )}
            <div>
                <div className="flex items-center justify-between">
                    <div className="font-semibold text-[14px]">{tier.name}</div>
                    {variant === "discount" && tier.discount && (
                        <span className="rounded bg-emerald-500 px-1.5 py-0.5 font-mono text-[10px] text-white tracking-[0.08em]">
                            {tier.discount}
                        </span>
                    )}
                </div>
                {tier.description && (
                    <div className="mt-0.5 text-(--diamond-muted,#6b6862) text-[11px]">{tier.description}</div>
                )}
            </div>
            <div className="flex items-baseline gap-2">
                <span
                    key={String(resolvedPrice)}
                    className="font-medium text-[28px] leading-none [font-family:Fraunces,Georgia,serif] [animation:diamond-pricing-fade_200ms_ease-out]"
                >
                    {resolvedPrice}
                </span>
                {resolvedPeriod && (
                    <span className="text-(--diamond-muted,#6b6862) text-[12px]">{resolvedPeriod}</span>
                )}
                {tier.originalPrice && (
                    <span className="text-(--diamond-muted,#6b6862) text-[12px] line-through">
                        {tier.originalPrice}
                    </span>
                )}
            </div>
            {tier.features && (
                <ul className="flex flex-col gap-1.5 text-(--diamond-ink,#1a1917) text-[12px]">
                    {tier.features.map((f, i) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: feature strings are positional and may repeat
                        <li key={i} className="flex items-start gap-2">
                            <Check
                                weight="bold"
                                size={12}
                                aria-hidden="true"
                                className="mt-1 shrink-0 text-(--diamond-accent,#2b7fff)"
                            />
                            <span>{f}</span>
                        </li>
                    ))}
                </ul>
            )}
            {tier.ctaLabel && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        tier.onCta?.();
                    }}
                    className={cn(
                        "mt-1 w-full cursor-pointer rounded-md px-4 py-2 font-medium text-[13px] transition-all duration-150",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--diamond-accent,#2b7fff) focus-visible:ring-offset-1",
                        "active:scale-[0.98]",
                        variant === "featured"
                            ? "bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff) hover:brightness-110"
                            : "bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#fff) hover:bg-(--diamond-accent,#2b7fff) hover:text-(--diamond-on-accent,#fff)",
                    )}
                >
                    {tier.ctaLabel}
                </button>
            )}
        </div>
    );
});

Pricing.displayName = "Diamond.Pricing";

export { pricingVariants };
