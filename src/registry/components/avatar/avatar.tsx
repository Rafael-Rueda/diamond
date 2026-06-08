"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Avatar — single file, Tailwind only. */

export type AvatarVariant = "solid" | "colored" | "square" | "status" | "ring" | "image";

const avatarVariants = cva(
    [
        "relative inline-flex shrink-0 select-none items-center justify-center",
        "overflow-hidden font-medium",
        "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_18%,var(--diamond-surface,#fff))]",
        "text-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_75%,var(--diamond-ink,#1a1917))]",
    ].join(" "),
    {
        variants: {
            size: {
                xs: "size-6 text-[10px]",
                sm: "size-8 text-[11px]",
                md: "size-10 text-[13px]",
                lg: "size-14 text-[16px]",
                xl: "size-20 text-[20px]",
            },
            variant: {
                solid: "rounded-full",
                colored: "rounded-full text-(--diamond-on-accent,#fff)",
                square: "rounded-md",
                status: "rounded-full",
                ring: "rounded-full ring-(--diamond-accent,#2b7fff) ring-2 ring-offset-(--diamond-surface,#fff) ring-offset-2",
                image: "rounded-full",
            },
        },
        defaultVariants: { variant: "solid", size: "md" },
    },
);

const STATUS_COLOR: Record<NonNullable<AvatarProps["status"]>, string> = {
    online: "bg-emerald-500",
    away: "bg-amber-500",
    busy: "bg-rose-500",
    offline: "bg-(--diamond-border,#d9d5cc)",
};

export interface AvatarProps
    extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
        VariantProps<typeof avatarVariants> {
    /** Image URL. If omitted or fails, falls back to children/initials. */
    src?: string;
    /** Alt text for the image. */
    alt?: string;
    /** Accent color override for this instance. */
    accent?: string;
    /** Background color override (used by `colored` variant). */
    bg?: string;
    /** Optional status indicator (renders a corner dot). */
    status?: "online" | "away" | "busy" | "offline";
    /** Custom status color. */
    statusColor?: string;
    /** Render onto an arbitrary child element. */
    asChild?: boolean;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
    { className, variant, size, src, alt, accent, bg, status, statusColor, asChild = false, style, children, ...rest },
    ref,
) {
    const [errored, setErrored] = React.useState(false);
    const Comp: React.ElementType = asChild ? Slot : "span";

    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;
    if (bg) inlineStyle.background = bg;

    return (
        <Comp ref={ref} className={cn(avatarVariants({ variant, size }), className)} style={inlineStyle} {...rest}>
            {src && !errored ? (
                <img
                    src={src}
                    alt={alt ?? ""}
                    onError={() => setErrored(true)}
                    className="absolute inset-0 size-full object-cover"
                />
            ) : (
                children
            )}
            {status && (
                <span
                    aria-hidden="true"
                    className={cn(
                        "absolute right-0 bottom-0 size-[28%] min-h-2 min-w-2 rounded-full",
                        "border-(--diamond-surface,#fff) border-2",
                        !statusColor && STATUS_COLOR[status],
                    )}
                    style={statusColor ? { background: statusColor } : undefined}
                />
            )}
        </Comp>
    );
});

Avatar.displayName = "Diamond.Avatar";

export { avatarVariants };
