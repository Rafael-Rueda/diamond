"use client";

import { CheckCircle, FolderOpen, MagnifyingGlass, Plus, Tray } from "@phosphor-icons/react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · EmptyState — “no data to show” containers with a heading, copy,
 * an artwork slot, and a CTA. Composable: pass children for fully custom
 * artwork (e.g. an SVG or a dropzone). */

export type EmptyStateVariant = "inbox" | "cta" | "no-results" | "dropzone" | "editorial" | "caught-up";

const stateVariants = cva(
    "flex w-full flex-col items-center gap-1.5 rounded-md p-6 text-center text-(--diamond-ink,#1a1917)",
    {
        variants: {
            variant: {
                inbox: "",
                cta: "",
                "no-results": "",
                dropzone: "",
                editorial: "font-mono",
                "caught-up": "",
            },
        },
        defaultVariants: { variant: "inbox" },
    },
);

const ART_DEFAULT: Record<EmptyStateVariant, React.ReactNode> = {
    inbox: <Tray size={28} weight="duotone" />,
    cta: <Plus size={28} weight="bold" />,
    "no-results": <MagnifyingGlass size={28} weight="duotone" />,
    dropzone: <FolderOpen size={28} weight="duotone" />,
    editorial: null,
    "caught-up": <CheckCircle size={28} weight="duotone" />,
};

const ART_WRAP: Record<EmptyStateVariant, string> = {
    inbox: "bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-muted,#6b6862)",
    cta: "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_15%,var(--diamond-surface,#fff))] text-(--diamond-accent,#2b7fff)",
    "no-results": "bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-muted,#6b6862)",
    dropzone: "bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-muted,#6b6862)",
    editorial: "hidden",
    "caught-up": "bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#fff)",
};

export interface EmptyStateProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof stateVariants> {
    /** Heading. */
    title?: React.ReactNode;
    /** Supporting copy. */
    description?: React.ReactNode;
    /** Custom artwork — replaces the variant default. Pass `null` to hide. */
    art?: React.ReactNode;
    /** Optional CTA label. Mutually exclusive with `cta`. */
    ctaLabel?: string;
    /** Custom CTA node — overrides ctaLabel. */
    cta?: React.ReactNode;
    onCta?: (e: React.MouseEvent) => void;
    /** Show a dashed dropzone box below the CTA (used by `dropzone`). */
    dropzone?: React.ReactNode;
    /** Editorial kicker label, e.g. "404 · NO DATA". */
    kicker?: React.ReactNode;
    accent?: string;
    asChild?: boolean;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
    {
        className,
        variant = "inbox",
        title,
        description,
        art,
        ctaLabel,
        cta,
        onCta,
        dropzone,
        kicker,
        accent,
        asChild = false,
        style,
        children,
        ...rest
    },
    ref,
) {
    const Comp: React.ElementType = asChild ? Slot : "div";
    const v = variant ?? "inbox";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const artNode = art === null ? null : (art ?? ART_DEFAULT[v]);
    const artWrap = ART_WRAP[v];

    return (
        <Comp
            ref={ref}
            role="region"
            aria-label={typeof title === "string" ? title : undefined}
            className={cn(stateVariants({ variant: v }), className)}
            style={inlineStyle}
            {...rest}
        >
            {v === "editorial" && kicker !== undefined ? (
                <span className="mb-1 text-[10px] text-(--diamond-muted,#6b6862) uppercase tracking-[0.18em]">
                    {kicker ?? "404 · NO DATA"}
                </span>
            ) : null}

            {artNode ? (
                <span
                    aria-hidden="true"
                    className={cn(
                        "mb-2 flex size-14 items-center justify-center rounded-xl",
                        artWrap,
                    )}
                >
                    {artNode}
                </span>
            ) : null}

            {title ? (
                <h4 className="font-semibold text-[15px] tracking-tight [font-family:var(--diamond-font-display,inherit)]">
                    {title}
                </h4>
            ) : null}
            {description ? (
                <p className="max-w-[280px] text-[12px] text-(--diamond-muted,#6b6862) leading-relaxed">
                    {description}
                </p>
            ) : null}

            {children}

            {cta ??
                (ctaLabel ? (
                    <button
                        type="button"
                        onClick={onCta}
                        className={cn(
                            "mt-3 inline-flex h-8 cursor-pointer items-center justify-center rounded-md px-3 font-medium text-[12px] transition-colors",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--diamond-accent,#2b7fff)",
                            v === "no-results"
                                ? "bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-ink,#1a1917) hover:bg-(--diamond-border,#d9d5cc)"
                                : "bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff) hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_85%,black)]",
                        )}
                    >
                        {ctaLabel}
                    </button>
                ) : null)}

            {dropzone ? (
                <div className="mt-2 rounded-md border-2 border-(--diamond-border-strong,#c4bfb3) border-dashed px-4 py-3 text-[11px] text-(--diamond-muted,#6b6862)">
                    {dropzone}
                </div>
            ) : null}
        </Comp>
    );
});

EmptyState.displayName = "Diamond.EmptyState";

export { stateVariants };
