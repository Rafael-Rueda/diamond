"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Form — wraps a real <form> with one of six opinionated layouts:
 * login-card, minimal-stack, stepped, terminal, subscribe-cta, profile.
 *
 * The Form is a thin presentational shell — pass FormField/Fieldset/Input
 * children inside. Submission is delegated to the real form element. */

export type FormVariant =
    | "login-card"
    | "minimal-stack"
    | "stepped"
    | "terminal"
    | "subscribe-cta"
    | "profile";

const formVariants = cva("flex w-full flex-col text-(--diamond-ink,#1a1917)", {
    variants: {
        variant: {
            "login-card":
                "max-w-[320px] gap-4 rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
            "minimal-stack": "max-w-[300px] gap-3",
            stepped:
                "max-w-[340px] gap-4 rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-6",
            terminal:
                "max-w-[320px] gap-3 rounded-md border border-[#2d2c28] bg-[#0a0a08] p-4 font-mono text-[#d4d0c8]",
            "subscribe-cta":
                "max-w-[320px] flex-row items-center gap-2",
            profile: "max-w-[340px] gap-3 rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-5",
        },
    },
    defaultVariants: { variant: "login-card" },
});

export interface FormProps
    extends React.FormHTMLAttributes<HTMLFormElement>,
        VariantProps<typeof formVariants> {
    /** Title slot — rendered above the children. */
    title?: React.ReactNode;
    /** Description slot, below the title. */
    description?: React.ReactNode;
    /** Stepped variant — current step (1-based). */
    step?: number;
    /** Stepped variant — total steps. */
    steps?: number;
    /** Optional footer (links, alternative CTAs). */
    footer?: React.ReactNode;
    accent?: string;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(function Form(
    {
        className,
        variant = "login-card",
        title,
        description,
        step = 1,
        steps = 3,
        footer,
        accent,
        style,
        children,
        ...rest
    },
    ref,
) {
    const v = variant ?? "login-card";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    return (
        <form
            ref={ref}
            className={cn(formVariants({ variant: v }), className)}
            style={inlineStyle}
            {...rest}
        >
            {v === "stepped" ? (
                <div className="flex flex-col gap-1.5">
                    <div className="flex gap-1">
                        {Array.from({ length: steps }, (_, i) => (
                            <span
                                // biome-ignore lint/suspicious/noArrayIndexKey: positional pill
                                key={i}
                                className={cn(
                                    "h-1.5 flex-1 rounded-full transition-colors",
                                    i < step
                                        ? "bg-(--diamond-accent,#2b7fff)"
                                        : "bg-(--diamond-surface-alt,#ebe8e1)",
                                )}
                            />
                        ))}
                    </div>
                    <span className="font-mono text-[10px] text-(--diamond-muted,#6b6862) uppercase tracking-[0.14em]">
                        Step {step} of {steps}
                    </span>
                </div>
            ) : null}

            {title ? (
                <div className="flex flex-col gap-1">
                    {v === "terminal" ? (
                        <span className="text-(--diamond-accent,#2b7fff) text-[12px]">
                            $ {title}
                        </span>
                    ) : (
                        <h2
                            className={cn(
                                "font-semibold tracking-tight",
                                v === "profile" ? "text-[15px]" : "text-[18px]",
                            )}
                        >
                            {title}
                        </h2>
                    )}
                    {description ? (
                        <p
                            className={cn(
                                "text-[12px]",
                                v === "terminal" ? "text-[#6b6862]" : "text-(--diamond-muted,#6b6862)",
                            )}
                        >
                            {description}
                        </p>
                    ) : null}
                </div>
            ) : null}

            {children}

            {footer ? (
                <div
                    className={cn(
                        "mt-1 flex items-center justify-between gap-2 text-[11px]",
                        v === "terminal" ? "text-[#6b6862]" : "text-(--diamond-muted,#6b6862)",
                    )}
                >
                    {footer}
                </div>
            ) : null}
        </form>
    );
});

Form.displayName = "Diamond.Form";

export { formVariants };
