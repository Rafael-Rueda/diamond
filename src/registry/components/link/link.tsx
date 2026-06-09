"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type LinkVariant = "default" | "icon" | "decorative" | "numbered" | "pill" | "editorial";

const linkVariants = cva(
    "inline-flex items-center gap-1 text-sm outline-none focus-visible:ring-(--diamond-accent,#2b7fff) focus-visible:ring-2",
    {
        variants: {
            variant: {
                default: "font-medium text-(--diamond-accent,#2b7fff) underline-offset-4 hover:underline",
                icon: "font-medium text-(--diamond-accent,#2b7fff)",
                decorative:
                    "bg-[linear-gradient(var(--diamond-accent,#2b7fff),var(--diamond-accent,#2b7fff))_0_100%/100%_2px_no-repeat] pb-1 text-(--diamond-ink,#1a1917)",
                numbered:
                    "font-mono text-(--diamond-ink,#1a1917) text-[12px] uppercase tracking-[0.1em] before:text-(--diamond-accent,#2b7fff) before:content-[attr(data-index)]",
                pill: "rounded-full border border-(--diamond-border,#d9d5cc) px-3 py-1 text-(--diamond-ink,#1a1917) hover:border-(--diamond-accent,#2b7fff)",
                editorial:
                    "font-serif text-(--diamond-ink,#1a1917) text-base italic underline decoration-(--diamond-accent,#2b7fff) underline-offset-4",
            },
        },
        defaultVariants: { variant: "default" },
    },
);

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {
    icon?: React.ReactNode;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
    { className, variant = "default", icon, children, href = "#", ...rest },
    ref,
) {
    return (
        <a ref={ref} href={href} className={cn(linkVariants({ variant }), className)} {...rest}>
            {children}
            {(variant === "icon" || icon) && <span aria-hidden="true">{icon ?? "->"}</span>}
        </a>
    );
});

Link.displayName = "Diamond.Link";

export { linkVariants };
