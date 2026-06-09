"use client";

import { Cookie, X } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · CookieBanner — privacy consent. Six visual treatments: classic
 * bottom bar, inverted slim, granular preferences (per-category toggles),
 * corner chip, terminal prompt, editorial note. Renders a `<div role="region"
 * aria-label="Cookie consent">` positioned fixed; consumer controls
 * visibility via the `open` prop. */

export type CookieBannerVariant =
    | "classic"
    | "inverted"
    | "granular"
    | "corner-chip"
    | "terminal"
    | "editorial";

const wrapperVariants = cva(
    "fixed z-40 flex border-(--diamond-border,#d9d5cc) shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.18)]",
    {
        variants: {
            variant: {
                classic:
                    "inset-x-0 bottom-0 items-center gap-3 border-t bg-(--diamond-surface,#fff) p-4 text-(--diamond-ink,#1a1917)",
                inverted:
                    "inset-x-0 bottom-0 items-center gap-3 border-0 bg-(--diamond-ink,#1a1917) p-3 text-(--diamond-surface,#fff)",
                granular:
                    "inset-x-3 bottom-3 max-w-[420px] flex-col gap-3 rounded-lg border bg-(--diamond-surface,#fff) p-4 text-(--diamond-ink,#1a1917)",
                "corner-chip":
                    "right-3 bottom-3 max-w-[280px] flex-col gap-2 rounded-md border bg-(--diamond-surface,#fff) p-3 text-(--diamond-ink,#1a1917)",
                terminal:
                    "right-3 bottom-3 max-w-[320px] flex-col gap-1.5 rounded-sm border border-[#2d2c28] bg-[#0a0a08] p-3 font-mono text-[#d4d0c8]",
                editorial:
                    "right-3 bottom-3 max-w-[300px] flex-col gap-1.5 rounded-md border bg-(--diamond-surface,#fff) p-3.5 text-(--diamond-ink,#1a1917) [font-family:Fraunces,Georgia,serif] italic",
            },
        },
        defaultVariants: { variant: "classic" },
    },
);

export interface CookieCategory {
    id: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    /** True = always on (essential), can't be disabled. */
    essential?: boolean;
    defaultChecked?: boolean;
}

export interface CookieBannerProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof wrapperVariants> {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Heading or short message. */
    title?: React.ReactNode;
    /** Longer body / policy summary. */
    description?: React.ReactNode;
    /** Granular variant — per-category toggles. */
    categories?: CookieCategory[];
    /** Called when "Accept all" is clicked, with all category ids enabled. */
    onAcceptAll?: (ids: string[]) => void;
    /** Called when "Reject all" is clicked, with only essential ids enabled. */
    onRejectAll?: (ids: string[]) => void;
    /** Granular variant — called with the explicit user selection. */
    onSavePreferences?: (ids: string[]) => void;
    /** Render a close (X) button. */
    dismissible?: boolean;
    accent?: string;
}

export const CookieBanner = React.forwardRef<HTMLDivElement, CookieBannerProps>(function CookieBanner(
    {
        className,
        variant = "classic",
        open = true,
        onOpenChange,
        title,
        description,
        categories = [],
        onAcceptAll,
        onRejectAll,
        onSavePreferences,
        dismissible = false,
        accent,
        style,
        children,
        ...rest
    },
    ref,
) {
    const v = variant ?? "classic";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;
    const allIds = categories.map((c) => c.id);
    const essentialIds = categories.filter((c) => c.essential).map((c) => c.id);
    const [selected, setSelected] = React.useState<string[]>(() =>
        categories.filter((c) => c.essential || c.defaultChecked).map((c) => c.id),
    );

    if (!open) return null;
    const close = () => onOpenChange?.(false);

    const dark = v === "inverted" || v === "terminal";

    const primaryBtnCls = cn(
        "inline-flex h-8 cursor-pointer items-center justify-center rounded-md px-3 font-medium text-[12px] transition-colors",
        v === "terminal"
            ? "rounded-sm bg-(--diamond-accent,#2b7fff) font-mono text-(--diamond-on-accent,#fff)"
            : "bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff) hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_85%,#000)]",
    );
    const secondaryBtnCls = cn(
        "inline-flex h-8 cursor-pointer items-center justify-center rounded-md px-3 font-medium text-[12px] transition-colors",
        v === "terminal"
            ? "rounded-sm border border-[#2d2c28] bg-transparent font-mono text-[#d4d0c8] hover:bg-[#1a1a18]"
            : v === "inverted"
              ? "bg-white/10 text-(--diamond-surface,#fff) hover:bg-white/20"
              : "border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) hover:bg-(--diamond-surface-alt,#ebe8e1)",
    );

    const handleAccept = () => {
        onAcceptAll?.(allIds.length ? allIds : []);
        close();
    };
    const handleReject = () => {
        onRejectAll?.(essentialIds);
        close();
    };
    const handleSave = () => {
        onSavePreferences?.(selected);
        close();
    };
    const toggle = (id: string) => {
        setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
    };

    let body: React.ReactNode;
    if (v === "granular") {
        body = (
            <>
                <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-1 flex-col gap-1">
                        <strong className="font-semibold text-[14px]">{title ?? "Cookie preferences"}</strong>
                        {description ? (
                            <p className="text-[11px] text-(--diamond-muted,#6b6862)">{description}</p>
                        ) : null}
                    </div>
                    {dismissible ? (
                        <button
                            type="button"
                            aria-label="Close"
                            onClick={close}
                            className="inline-flex size-6 cursor-pointer items-center justify-center rounded text-(--diamond-muted,#6b6862) hover:bg-(--diamond-surface-alt,#ebe8e1) hover:text-(--diamond-ink,#1a1917)"
                        >
                            <X size={12} weight="bold" />
                        </button>
                    ) : null}
                </div>

                <div className="flex flex-col gap-1.5">
                    {categories.map((c) => {
                        const on = c.essential || selected.includes(c.id);
                        return (
                            <label
                                key={c.id}
                                className={cn(
                                    "flex cursor-pointer items-start justify-between gap-2 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 py-2",
                                    c.essential && "opacity-70",
                                )}
                            >
                                <span className="flex flex-1 flex-col">
                                    <span className="font-medium text-[12px]">
                                        {c.label}
                                        {c.essential ? (
                                            <span className="ml-1 font-mono text-(--diamond-muted,#6b6862) text-[9px] uppercase tracking-[0.1em]">
                                                Essential
                                            </span>
                                        ) : null}
                                    </span>
                                    {c.description ? (
                                        <span className="text-[10px] text-(--diamond-muted,#6b6862)">{c.description}</span>
                                    ) : null}
                                </span>
                                <input
                                    type="checkbox"
                                    checked={on}
                                    disabled={c.essential}
                                    onChange={() => !c.essential && toggle(c.id)}
                                    className="mt-0.5 size-4 accent-(--diamond-accent,#2b7fff)"
                                />
                            </label>
                        );
                    })}
                </div>

                <div className="flex flex-wrap justify-end gap-2">
                    <button type="button" onClick={handleReject} className={secondaryBtnCls}>
                        Reject non-essential
                    </button>
                    <button type="button" onClick={handleSave} className={secondaryBtnCls}>
                        Save preferences
                    </button>
                    <button type="button" onClick={handleAccept} className={primaryBtnCls}>
                        Accept all
                    </button>
                </div>
            </>
        );
    } else if (v === "corner-chip") {
        body = (
            <>
                <div className="flex items-start gap-2">
                    <Cookie size={16} weight="duotone" className="mt-0.5 shrink-0 text-(--diamond-accent,#2b7fff)" />
                    <div className="flex flex-1 flex-col gap-0.5">
                        <strong className="font-semibold text-[12px]">{title ?? "We use cookies"}</strong>
                        {description ? (
                            <span className="text-[11px] text-(--diamond-muted,#6b6862)">{description}</span>
                        ) : null}
                    </div>
                </div>
                <div className="flex gap-1.5">
                    <button type="button" onClick={handleReject} className={cn(secondaryBtnCls, "flex-1")}>
                        Reject
                    </button>
                    <button type="button" onClick={handleAccept} className={cn(primaryBtnCls, "flex-1")}>
                        Accept
                    </button>
                </div>
            </>
        );
    } else if (v === "terminal") {
        body = (
            <>
                <p className="text-(--diamond-accent,#2b7fff) text-[11px]">$ cookies --consent</p>
                <p className="text-[11px]">{title ?? "Allow cookies?"}</p>
                {description ? <p className="text-[#6b6862] text-[10px]">{description}</p> : null}
                <div className="mt-1 flex gap-1.5">
                    <button type="button" onClick={handleReject} className={secondaryBtnCls}>
                        [n] reject
                    </button>
                    <button type="button" onClick={handleAccept} className={primaryBtnCls}>
                        [y] accept
                    </button>
                </div>
            </>
        );
    } else if (v === "editorial") {
        body = (
            <>
                <strong className="font-medium text-[14px]">{title ?? "A note on cookies."}</strong>
                {description ? (
                    <p className="text-[12px] text-(--diamond-muted,#6b6862) [font-family:var(--diamond-font,inherit)] not-italic">
                        {description}
                    </p>
                ) : null}
                <div className="mt-1 flex gap-2 [font-family:var(--diamond-font,inherit)] not-italic">
                    <button type="button" onClick={handleReject} className={secondaryBtnCls}>
                        Decline
                    </button>
                    <button type="button" onClick={handleAccept} className={primaryBtnCls}>
                        Allow
                    </button>
                </div>
            </>
        );
    } else if (v === "inverted") {
        body = (
            <>
                <Cookie size={18} weight="duotone" className="shrink-0 text-(--diamond-accent,#2b7fff)" />
                <span className="flex-1 text-[12px]">
                    <strong className="font-semibold">{title ?? "We use cookies"}</strong>
                    {description ? <span className="ml-1 text-(--diamond-surface,#fff)/70">{description}</span> : null}
                </span>
                <button type="button" onClick={handleReject} className={secondaryBtnCls}>
                    Reject
                </button>
                <button type="button" onClick={handleAccept} className={primaryBtnCls}>
                    Accept
                </button>
            </>
        );
    } else {
        /* classic */
        body = (
            <>
                <Cookie size={20} weight="duotone" className="shrink-0 text-(--diamond-accent,#2b7fff)" />
                <div className="flex flex-1 flex-col">
                    <strong className="font-semibold text-[13px]">{title ?? "We use cookies"}</strong>
                    {description ? (
                        <span className="text-[12px] text-(--diamond-muted,#6b6862)">{description}</span>
                    ) : null}
                </div>
                <button type="button" onClick={handleReject} className={secondaryBtnCls}>
                    Reject
                </button>
                <button type="button" onClick={handleAccept} className={primaryBtnCls}>
                    Accept all
                </button>
                {dismissible ? (
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={close}
                        className={cn(
                            "ml-1 inline-flex size-7 cursor-pointer items-center justify-center rounded-md",
                            dark
                                ? "text-(--diamond-surface,#fff)/60 hover:bg-white/10"
                                : "text-(--diamond-muted,#6b6862) hover:bg-(--diamond-surface-alt,#ebe8e1)",
                        )}
                    >
                        <X size={14} weight="bold" />
                    </button>
                ) : null}
            </>
        );
    }

    return (
        <div
            ref={ref}
            role="region"
            aria-label="Cookie consent"
            className={cn(wrapperVariants({ variant: v }), className)}
            style={inlineStyle}
            {...rest}
        >
            {body}
            {children}
        </div>
    );
});

CookieBanner.displayName = "Diamond.CookieBanner";

export { wrapperVariants as cookieBannerVariants };
