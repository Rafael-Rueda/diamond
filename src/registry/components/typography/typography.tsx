"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type TypographyVariant = "scale" | "code" | "weights" | "decorations" | "quote" | "eyebrow";

const typographyVariants = cva("flex max-w-[260px] flex-col text-(--diamond-ink,#1a1917)", {
    variants: {
        variant: {
            scale: "gap-1",
            code: "gap-1 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-ink,#1a1917) p-3 font-mono text-[#d4d0c8] text-[12px]",
            weights: "gap-1",
            decorations: "gap-2",
            quote: "gap-1 border-l-(--diamond-accent,#2b7fff) border-l-2 pl-3",
            eyebrow: "gap-1",
        },
    },
    defaultVariants: { variant: "scale" },
});

export type TypographyProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof typographyVariants>;

export const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(function Typography(
    { className, variant = "scale", children, ...rest },
    ref,
) {
    return (
        <div ref={ref} className={cn(typographyVariants({ variant }), className)} {...rest}>
            {children ?? <TypographySample variant={variant ?? "scale"} />}
        </div>
    );
});

function TypographySample({ variant }: { variant: TypographyVariant }) {
    if (variant === "code") {
        return (
            <>
                <span className="text-(--diamond-accent,#2b7fff)">const x = 42;</span>
                <span className="text-[#8f8981]">{"// comment"}</span>
                <span>return true;</span>
            </>
        );
    }

    if (variant === "weights") {
        return (
            <>
                <span className="font-normal text-sm">Regular 400</span>
                <span className="font-medium text-sm">Medium 500</span>
                <span className="font-semibold text-sm">Semi 600</span>
                <span className="font-bold text-sm">Bold 700</span>
                <span className="font-extrabold text-sm">Black 800</span>
            </>
        );
    }

    if (variant === "decorations") {
        return (
            <>
                <span className="font-semibold text-(--diamond-accent,#2b7fff) underline underline-offset-4">
                    Link primary
                </span>
                <span className="text-(--diamond-muted,#6b6862) italic">Italic muted</span>
                <span className="font-bold text-[11px] uppercase tracking-[0.12em]">Overline</span>
            </>
        );
    }

    if (variant === "quote") {
        return (
            <>
                <span className="font-serif text-lg italic">Editorial.</span>
                <span className="text-(--diamond-muted,#6b6862) text-xs">A quiet remark.</span>
            </>
        );
    }

    if (variant === "eyebrow") {
        return (
            <>
                <span className="font-mono text-(--diamond-muted,#6b6862) text-[11px] uppercase tracking-[0.14em]">
                    Label / Eyebrow
                </span>
                <span className="font-semibold text-lg">Primary statement</span>
                <span className="text-(--diamond-muted,#6b6862) text-xs">Supporting description.</span>
            </>
        );
    }

    return (
        <>
            <span className="font-serif text-2xl">Display</span>
            <span className="text-sm">Body default</span>
            <span className="text-(--diamond-muted,#6b6862) text-[11px]">Caption</span>
        </>
    );
}

Typography.displayName = "Diamond.Typography";

export { typographyVariants };
