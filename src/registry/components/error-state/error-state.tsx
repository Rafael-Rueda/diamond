"use client";

import { ArrowClockwise, ArrowsCounterClockwise, House, WarningCircle, WifiSlash } from "@phosphor-icons/react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · ErrorState — system failure containers. Composable: pass children
 * for fully custom artwork (e.g. an illustration). */

export type ErrorStateVariant = "not-found" | "server" | "broken" | "connection" | "terminal" | "friendly";

const stateVariants = cva(
    "flex w-full flex-col items-center gap-1.5 rounded-md p-6 text-center text-(--diamond-ink,#1a1917)",
    {
        variants: {
            variant: {
                "not-found": "",
                server: "",
                broken: "",
                connection: "",
                terminal: "items-stretch rounded-md bg-(--diamond-ink,#1a1917) p-4 text-left font-mono text-(--diamond-surface,#fff)",
                friendly: "",
            },
        },
        defaultVariants: { variant: "not-found" },
    },
);

const DEFAULT_CODE: Record<ErrorStateVariant, React.ReactNode> = {
    "not-found": "404",
    server: "500",
    broken: null,
    connection: null,
    terminal: null,
    friendly: ":(",
};

const DEFAULT_CTA: Record<ErrorStateVariant, { label: string; icon: React.ReactNode }> = {
    "not-found": { label: "Go home", icon: <House size={14} weight="bold" /> },
    server: { label: "Try again", icon: <ArrowClockwise size={14} weight="bold" /> },
    broken: { label: "Refresh", icon: <ArrowClockwise size={14} weight="bold" /> },
    connection: { label: "Retry", icon: <ArrowsCounterClockwise size={14} weight="bold" /> },
    terminal: { label: "retry →", icon: null },
    friendly: { label: "Report issue", icon: null },
};

export interface ErrorStateProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof stateVariants> {
    /** Big code at top, e.g. "404", "500", ":(". `null` to hide. */
    code?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    /** Custom artwork — overrides code. Pass `null` to hide both code and art. */
    art?: React.ReactNode;
    /** CTA label — defaults from variant. Pass `""` to hide. */
    ctaLabel?: string;
    /** Custom CTA node — overrides ctaLabel/CTA defaults. */
    cta?: React.ReactNode;
    onCta?: (e: React.MouseEvent) => void;
    /** Terminal variant only — the underlying error label, e.g. "ERR_CONN_REFUSED". */
    errorTag?: React.ReactNode;
    /** Terminal variant only — the failing command, e.g. "ping api.app.co". */
    command?: React.ReactNode;
    /** Friendly variant only — the error code chip, e.g. "E_4301". */
    errorCode?: React.ReactNode;
    accent?: string;
    asChild?: boolean;
}

export const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(function ErrorState(
    {
        className,
        variant = "not-found",
        code,
        title,
        description,
        art,
        ctaLabel,
        cta,
        onCta,
        errorTag = "ERR_CONN_REFUSED",
        command = "ping api.app.co",
        errorCode = "E_4301",
        accent,
        asChild = false,
        style,
        children,
        ...rest
    },
    ref,
) {
    const Comp: React.ElementType = asChild ? Slot : "div";
    const v = variant ?? "not-found";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const renderCode = code === null ? null : (code ?? DEFAULT_CODE[v]);
    const ctaDefault = DEFAULT_CTA[v];
    const finalCtaLabel = ctaLabel === undefined ? ctaDefault.label : ctaLabel;
    const ctaIcon = ctaDefault.icon;

    if (v === "terminal") {
        return (
            <Comp
                ref={ref}
                role="alert"
                className={cn(stateVariants({ variant: v }), className)}
                style={inlineStyle}
                {...rest}
            >
                {errorTag ? (
                    <div className="text-rose-400 text-[11px]">{errorTag}</div>
                ) : null}
                {command ? <div className="mt-1.5 text-[11px]">{">"} {command}</div> : null}
                {description ? (
                    <div className="mt-0.5 text-(--diamond-muted,#6b6862) text-[11px]">{description}</div>
                ) : null}
                {children}
                {cta ??
                    (finalCtaLabel ? (
                        <button
                            type="button"
                            onClick={onCta}
                            className="mt-3 inline-flex h-7 w-fit cursor-pointer items-center justify-center rounded-sm bg-(--diamond-accent,#2b7fff) px-2.5 font-mono text-(--diamond-on-accent,#fff) text-[11px] hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_85%,black)]"
                        >
                            {finalCtaLabel}
                        </button>
                    ) : null)}
            </Comp>
        );
    }

    return (
        <Comp
            ref={ref}
            role="alert"
            className={cn(stateVariants({ variant: v }), className)}
            style={inlineStyle}
            {...rest}
        >
            {art ??
                (v === "broken" ? (
                    <WarningCircle
                        size={48}
                        weight="duotone"
                        className="mb-1 text-(--diamond-accent,#2b7fff)"
                    />
                ) : v === "connection" ? (
                    <span
                        aria-hidden="true"
                        className="mb-1 flex size-14 items-center justify-center rounded-full bg-[color-mix(in_oklab,#e11d48_15%,var(--diamond-surface,#fff))] text-rose-500"
                    >
                        <WifiSlash size={28} weight="bold" />
                    </span>
                ) : renderCode !== null ? (
                    <div
                        className={cn(
                            "font-mono font-bold text-(--diamond-accent,#2b7fff) text-5xl leading-none tracking-tight",
                            v === "friendly" && "text-(--diamond-ink,#1a1917)",
                        )}
                    >
                        {renderCode}
                    </div>
                ) : null)}

            {title ? (
                <h4 className="mt-2 font-semibold text-[15px] tracking-tight">{title}</h4>
            ) : null}
            {description ? (
                <p className="max-w-[280px] text-[12px] text-(--diamond-muted,#6b6862) leading-relaxed">
                    {description}
                </p>
            ) : null}

            {v === "friendly" && errorCode !== null ? (
                <p className="mt-0.5 text-[12px] text-(--diamond-muted,#6b6862)">
                    Error code:{" "}
                    <code className="rounded bg-(--diamond-surface-alt,#ebe8e1) px-1 py-0.5 font-mono text-[10px]">
                        {errorCode}
                    </code>
                </p>
            ) : null}

            {children}

            {cta ??
                (finalCtaLabel ? (
                    <button
                        type="button"
                        onClick={onCta}
                        className="mt-3 inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-(--diamond-accent,#2b7fff) px-3 font-medium text-(--diamond-on-accent,#fff) text-[12px] transition-colors hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_85%,black)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--diamond-accent,#2b7fff)"
                    >
                        {ctaIcon}
                        {finalCtaLabel}
                    </button>
                ) : null)}
        </Comp>
    );
});

ErrorState.displayName = "Diamond.ErrorState";

export { stateVariants };
