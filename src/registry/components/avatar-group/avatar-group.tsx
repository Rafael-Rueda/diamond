"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · AvatarGroup — stacked avatars with overflow indicator. */

export type AvatarGroupVariant = "default" | "mini" | "named" | "vertical" | "square" | "pill";

const groupVariants = cva("inline-flex items-center", {
    variants: {
        variant: {
            default: "flex-row",
            mini: "flex-row",
            named: "flex-row gap-2",
            vertical: "flex-col",
            square: "flex-row",
            pill: "flex-row gap-2 rounded-full bg-(--diamond-surface-alt,#ebe8e1) px-3 py-1.5",
        },
    },
    defaultVariants: { variant: "default" },
});

export interface AvatarGroupItem {
    /** Initials, name, or any short label rendered as fallback. */
    label: string;
    /** Optional image src. */
    src?: string;
    /** Per-item background color. */
    bg?: string;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof groupVariants> {
    /** Avatar entries. If omitted, you can pass <Avatar/> children manually. */
    items?: AvatarGroupItem[];
    /** Maximum visible avatars before showing the "+N" overflow chip. */
    max?: number;
    /** Total count (if larger than items.length) used for overflow text. */
    total?: number;
    /** Avatar size. */
    size?: "xs" | "sm" | "md" | "lg";
    /** Overlap distance in px. Negative = more overlap. */
    overlap?: number;
    /** Accent color override. */
    accent?: string;
    /** Optional trailing summary text. */
    summary?: React.ReactNode;
}

const SIZE_PX: Record<NonNullable<AvatarGroupProps["size"]>, number> = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
};

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
    {
        className,
        variant = "default",
        items = [],
        max = 4,
        total,
        size = "md",
        overlap,
        accent,
        summary,
        style,
        children,
        ...rest
    },
    ref,
) {
    const sz = variant === "mini" ? "sm" : variant === "square" ? "sm" : size;
    const px = SIZE_PX[sz];
    const isVertical = variant === "vertical";
    const radius = variant === "square" ? 6 : px / 2;
    const ov = overlap ?? -Math.round(px * 0.28);

    const visible = items.slice(0, max);
    const hidden = (total ?? items.length) - visible.length;

    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const baseChip: React.CSSProperties = {
        width: px,
        height: px,
        borderRadius: radius,
        fontSize: Math.max(10, Math.round(px * 0.34)),
    };

    return (
        <div ref={ref} className={cn(groupVariants({ variant }), className)} style={inlineStyle} {...rest}>
            {items.length > 0 ? (
                <div className={cn("flex", isVertical ? "flex-col" : "flex-row")}>
                    {visible.map((it, i) => (
                        <div
                            // biome-ignore lint/suspicious/noArrayIndexKey: avatars are positional and AvatarGroupItem has no stable id field
                            key={i}
                            className={cn(
                                "inline-flex shrink-0 items-center justify-center overflow-hidden font-medium",
                                "border-(--diamond-surface,#fff) border-2",
                                "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_20%,var(--diamond-surface,#fff))]",
                                "text-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_75%,var(--diamond-ink,#1a1917))]",
                            )}
                            style={{
                                ...baseChip,
                                background: it.bg,
                                color: it.bg ? "white" : undefined,
                                ...(isVertical ? { marginTop: i === 0 ? 0 : ov } : { marginLeft: i === 0 ? 0 : ov }),
                            }}
                            title={it.label}
                        >
                            {it.src ? (
                                <img src={it.src} alt={it.label} className="size-full object-cover" />
                            ) : (
                                it.label.slice(0, 2).toUpperCase()
                            )}
                        </div>
                    ))}
                    {hidden > 0 && (
                        <div
                            className={cn(
                                "inline-flex shrink-0 items-center justify-center font-semibold",
                                "border-(--diamond-surface,#fff) border-2",
                                "bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#fff)",
                            )}
                            style={{
                                ...baseChip,
                                ...(isVertical ? { marginTop: ov } : { marginLeft: ov }),
                            }}
                        >
                            +{hidden}
                        </div>
                    )}
                </div>
            ) : (
                children
            )}
            {(summary || (variant === "named" && items.length > 0)) && (
                <span className="ml-1 text-(--diamond-muted,#6b6862) text-xs">
                    {summary ??
                        items
                            .slice(0, 2)
                            .map((i) => i.label.split(" ")[0])
                            .join(", ")}
                    {!summary && hidden > 0 && ` + ${hidden} others`}
                </span>
            )}
        </div>
    );
});

AvatarGroup.displayName = "Diamond.AvatarGroup";

export { groupVariants as avatarGroupVariants };
