"use client";

import { Info, Lightbulb, WarningCircle } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · FormField — composes label + control + helper text + error. The
 * `label` variant set styles the heading, the `helper` set styles the hint,
 * and the `error` set styles the validation message. Pick one per slot or
 * mix per-prop using the dedicated `<FormLabel />`, `<FormHelper />` and
 * `<FormError />` sub-components. */

export type FormLabelVariant = "classic" | "required" | "mono" | "badge" | "tags" | "accent";
export type FormHelperVariant = "subtle" | "info" | "comment" | "counter" | "box" | "tip";
export type FormErrorVariant = "icon" | "x-mark" | "banner" | "badge" | "ticked" | "code";

/* ----- FormLabel ---------------------------------------------------------- */

const labelVariants = cva("inline-flex items-center gap-1.5 text-(--diamond-ink,#1a1917)", {
    variants: {
        variant: {
            classic: "font-medium text-[13px]",
            required: "font-medium text-[13px]",
            mono: "font-mono text-[11px] text-(--diamond-muted,#6b6862) uppercase tracking-[0.12em]",
            badge: "font-medium text-[13px]",
            tags: "font-medium text-[13px]",
            accent: "border-(--diamond-accent,#2b7fff) border-l-2 pl-2 font-medium text-[13px]",
        },
    },
    defaultVariants: { variant: "classic" },
});

export interface FormLabelProps
    extends React.LabelHTMLAttributes<HTMLLabelElement>,
        VariantProps<typeof labelVariants> {
    required?: boolean;
    badge?: React.ReactNode;
    tags?: React.ReactNode[];
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(function FormLabel(
    { className, variant = "classic", required, badge, tags, children, ...rest },
    ref,
) {
    const v = variant ?? "classic";
    return (
        <label ref={ref} className={cn(labelVariants({ variant: v }), className)} {...rest}>
            <span>{children}</span>
            {(required || v === "required") && (
                <span aria-hidden="true" className="text-rose-500">
                    *
                </span>
            )}
            {(badge || v === "badge") && (
                <span className="inline-flex items-center rounded bg-(--diamond-accent,#2b7fff) px-1.5 font-mono text-[9px] text-(--diamond-on-accent,#fff) uppercase tracking-[0.12em]">
                    {badge ?? "PRO"}
                </span>
            )}
            {(tags?.length || v === "tags") && (tags ?? ["v3", "beta"]).map((t, i) => (
                <span
                    // biome-ignore lint/suspicious/noArrayIndexKey: positional badge tags
                    key={i}
                    className="inline-flex items-center rounded-full bg-(--diamond-surface-alt,#ebe8e1) px-1.5 font-mono text-[9px] text-(--diamond-muted,#6b6862) uppercase tracking-[0.12em]"
                >
                    {t}
                </span>
            ))}
        </label>
    );
});
FormLabel.displayName = "Diamond.FormLabel";

/* ----- FormHelper -------------------------------------------------------- */

const helperVariants = cva("inline-flex items-start gap-1.5", {
    variants: {
        variant: {
            subtle: "text-[11px] text-(--diamond-muted,#6b6862)",
            info: "text-[11px] text-(--diamond-muted,#6b6862)",
            comment: "font-mono text-[11px] text-(--diamond-muted,#6b6862) before:content-['//']",
            counter: "font-mono text-[10px] text-(--diamond-muted,#9a968e)",
            box: "rounded-md bg-(--diamond-surface-alt,#ebe8e1) px-2 py-1.5 text-[11px] text-(--diamond-muted,#6b6862)",
            tip: "rounded-md border border-amber-300/50 bg-amber-50 px-2 py-1.5 text-amber-800 text-[11px]",
        },
    },
    defaultVariants: { variant: "subtle" },
});

export interface FormHelperProps
    extends React.HTMLAttributes<HTMLParagraphElement>,
        VariantProps<typeof helperVariants> {
    /** Counter variant — current/max e.g. {current: 24, max: 280}. */
    counter?: { current: number; max: number };
}

export const FormHelper = React.forwardRef<HTMLParagraphElement, FormHelperProps>(function FormHelper(
    { className, variant = "subtle", counter, children, ...rest },
    ref,
) {
    const v = variant ?? "subtle";
    return (
        <p ref={ref} className={cn(helperVariants({ variant: v }), className)} {...rest}>
            {v === "info" ? <Info size={12} className="mt-px shrink-0 text-(--diamond-accent,#2b7fff)" /> : null}
            {v === "tip" ? <Lightbulb size={12} weight="fill" className="mt-px shrink-0 text-amber-500" /> : null}
            <span>
                {children}
                {counter ? ` ${counter.current}/${counter.max}` : null}
            </span>
        </p>
    );
});
FormHelper.displayName = "Diamond.FormHelper";

/* ----- FormError --------------------------------------------------------- */

const errorVariants = cva("inline-flex items-start gap-1.5 font-medium", {
    variants: {
        variant: {
            icon: "text-[11px] text-rose-600",
            "x-mark": "text-[11px] text-rose-600",
            banner: "rounded-md bg-rose-50 px-2 py-1.5 text-[11px] text-rose-700",
            badge: "rounded bg-rose-500 px-1.5 py-0.5 text-[10px] text-white uppercase tracking-[0.06em]",
            ticked: "text-[11px] text-rose-600",
            code: "font-mono text-[11px] text-rose-600",
        },
    },
    defaultVariants: { variant: "icon" },
});

export interface FormErrorProps
    extends React.HTMLAttributes<HTMLParagraphElement>,
        VariantProps<typeof errorVariants> {
    /** Code variant — the underlying error code (e.g. "ERR_REQUIRED"). */
    code?: React.ReactNode;
    /** Ticked variant — a related secondary line. */
    detail?: React.ReactNode;
}

export const FormError = React.forwardRef<HTMLParagraphElement, FormErrorProps>(function FormError(
    { className, variant = "icon", code, detail, children, ...rest },
    ref,
) {
    const v = variant ?? "icon";
    return (
        <p ref={ref} role="alert" className={cn(errorVariants({ variant: v }), className)} {...rest}>
            {v === "icon" ? <WarningCircle size={12} weight="fill" className="mt-px shrink-0" /> : null}
            {v === "x-mark" ? <span aria-hidden="true">✕</span> : null}
            <span className="flex flex-col">
                <span>{children}</span>
                {v === "ticked" && detail ? (
                    <span className="text-(--diamond-muted,#9a968e)">{detail}</span>
                ) : null}
                {v === "code" && code ? (
                    <span className="font-mono text-(--diamond-muted,#9a968e) text-[10px] uppercase tracking-[0.1em]">
                        {code}
                    </span>
                ) : null}
            </span>
        </p>
    );
});
FormError.displayName = "Diamond.FormError";

/* ----- FormField — composed wrapper ------------------------------------- */

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Label text (string). For richer JSX use `label`. */
    title?: React.ReactNode;
    /** Replace the default <FormLabel> with custom JSX. */
    label?: React.ReactNode;
    labelVariant?: FormLabelVariant;
    /** The input itself. */
    children: React.ReactNode;
    /** Helper string. For JSX use `helper`. */
    helperText?: React.ReactNode;
    helper?: React.ReactNode;
    helperVariant?: FormHelperVariant;
    /** Error string. Renders only when truthy. */
    errorText?: React.ReactNode;
    error?: React.ReactNode;
    errorVariant?: FormErrorVariant;
    required?: boolean;
    /** Bind label htmlFor + child id automatically. */
    htmlFor?: string;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
    {
        className,
        title,
        label,
        labelVariant,
        helperText,
        helper,
        helperVariant,
        errorText,
        error,
        errorVariant,
        required,
        htmlFor,
        children,
        ...rest
    },
    ref,
) {
    return (
        <div ref={ref} className={cn("flex w-full max-w-[300px] flex-col gap-1.5", className)} {...rest}>
            {label ?? (title ? (
                <FormLabel variant={labelVariant} required={required} htmlFor={htmlFor}>
                    {title}
                </FormLabel>
            ) : null)}
            {children}
            {errorText || error ? (
                error ?? <FormError variant={errorVariant}>{errorText}</FormError>
            ) : helperText || helper ? (
                helper ?? <FormHelper variant={helperVariant}>{helperText}</FormHelper>
            ) : null}
        </div>
    );
});
FormField.displayName = "Diamond.FormField";

export { labelVariants, helperVariants, errorVariants };
