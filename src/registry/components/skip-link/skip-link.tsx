"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type SkipLinkVariant = "standard" | "centered" | "banner" | "outlined" | "multiple" | "annotation";

const skipLinkVariants = cva(
    "absolute z-50 rounded-md bg-(--diamond-ink,#1a1917) px-3 py-2 font-mono text-(--diamond-surface,#fff) text-[11px] uppercase tracking-[0.08em] no-underline shadow-[0_0_0_3px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_40%,transparent)]",
    {
        variants: {
            variant: {
                standard: "top-2 left-2",
                centered: "top-2 left-1/2 -translate-x-1/2 bg-(--diamond-accent,#2b7fff)",
                banner: "static block w-full rounded-none text-center",
                outlined:
                    "top-2 left-2 border-(--diamond-accent,#2b7fff) border-2 bg-(--diamond-surface,#fff) font-bold font-sans text-(--diamond-ink,#1a1917)",
                multiple: "static",
                annotation: "top-8 left-2",
            },
        },
        defaultVariants: { variant: "standard" },
    },
);

export interface SkipLinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
        VariantProps<typeof skipLinkVariants> {
    targets?: Array<{ label: string; href: string }>;
}

export const SkipLink = React.forwardRef<HTMLAnchorElement, SkipLinkProps>(function SkipLink(
    { className, variant = "standard", href = "#main", targets, children = "Skip to main content", ...rest },
    ref,
) {
    if (variant === "multiple" && targets?.length) {
        return (
            <div className="absolute top-2 left-2 z-50 flex gap-2">
                {targets.map((target, index) => (
                    <a
                        key={target.href}
                        ref={index === 0 ? ref : undefined}
                        href={target.href}
                        className={cn(
                            skipLinkVariants({ variant }),
                            index > 0 &&
                                "border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917)",
                            className,
                        )}
                        {...rest}
                    >
                        {target.label}
                    </a>
                ))}
            </div>
        );
    }

    return (
        <a ref={ref} href={href} className={cn(skipLinkVariants({ variant }), className)} {...rest}>
            {children}
        </a>
    );
});

SkipLink.displayName = "Diamond.SkipLink";

export { skipLinkVariants };
