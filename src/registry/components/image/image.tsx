"use client";

import { ImageSquare } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Image — variant-driven image wrapper. */

export type ImageVariant = "basic" | "caption" | "pair" | "circular" | "overlay" | "framed";

const imageVariants = cva("relative inline-block overflow-hidden bg-(--diamond-surface-alt,#ebe8e1)", {
    variants: {
        variant: {
            basic: "rounded-md",
            caption: "rounded-md",
            pair: "rounded-md",
            circular: "rounded-full",
            overlay: "rounded-md",
            framed: "rounded-none border-(--diamond-ink,#1a1917) border-4",
        },
        ratio: {
            square: "aspect-square",
            portrait: "aspect-[3/4]",
            video: "aspect-video",
            wide: "aspect-[4/3]",
            free: "",
        },
    },
    defaultVariants: { variant: "basic", ratio: "wide" },
});

export interface ImageProps
    extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "placeholder">,
        VariantProps<typeof imageVariants> {
    src?: string;
    alt?: string;
    /** Caption text shown over the bottom (caption variant) or below the image. */
    caption?: React.ReactNode;
    /** Floating badge (top-right corner). */
    badge?: React.ReactNode;
    /** Placeholder content when no src is set. */
    placeholder?: React.ReactNode;
    /** Apply a CSS filter (e.g. grayscale(1)). */
    filter?: string;
    /** Width override (CSS value). */
    width?: number | string;
    /** Object-fit. */
    fit?: "cover" | "contain";
    className?: string;
    /** className applied to the wrapping container (when present). */
    wrapperClassName?: string;
}

export const Image = React.forwardRef<HTMLDivElement, ImageProps>(function Image(
    {
        className,
        wrapperClassName,
        variant,
        ratio,
        src,
        alt,
        caption,
        badge,
        placeholder,
        filter,
        width,
        fit = "cover",
        style,
        ...rest
    },
    ref,
) {
    const wrapperStyle: React.CSSProperties = { width, ...style };
    const imgStyle: React.CSSProperties = filter ? { filter } : {};

    return (
        <div ref={ref} className={cn("inline-block", wrapperClassName)} style={wrapperStyle}>
            <div className={cn(imageVariants({ variant, ratio }), className)}>
                {src ? (
                    <img
                        src={src}
                        alt={alt ?? ""}
                        className={cn(
                            "absolute inset-0 size-full",
                            fit === "cover" ? "object-cover" : "object-contain",
                        )}
                        style={imgStyle}
                        {...rest}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-(--diamond-muted,#6b6862) text-xs uppercase tracking-[0.16em]">
                        {placeholder ?? <ImageSquare weight="regular" size={28} className="opacity-50" />}
                    </div>
                )}
                {variant === "overlay" && caption && (
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent_55%)]" />
                )}
                {variant === "caption" && caption && (
                    <div className="absolute right-1.5 bottom-1.5 left-1.5 rounded bg-black/55 px-2 py-1 text-[11px] text-white">
                        {caption}
                    </div>
                )}
                {variant === "overlay" && caption && (
                    <div className="absolute right-2 bottom-2 left-2 text-white">{caption}</div>
                )}
                {badge && (
                    <div className="absolute top-1.5 right-1.5 rounded bg-white/90 px-2 py-0.5 font-bold text-(--diamond-ink,#1a1917) text-[10px]">
                        {badge}
                    </div>
                )}
            </div>
            {variant !== "caption" && variant !== "overlay" && caption && (
                <p className="mt-1.5 text-(--diamond-muted,#6b6862) text-xs italic">{caption}</p>
            )}
        </div>
    );
});

Image.displayName = "Diamond.Image";

export { imageVariants };
