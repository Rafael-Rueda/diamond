"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Skeleton — content placeholders. Primitive `<Skeleton />` block
 * plus six pre-composed scaffolds via the `variant` prop. */

const KEYFRAMES = `
@keyframes d-skel { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }
`;
let keyframesInjected = false;
function useSkeletonKeyframes(): void {
    React.useInsertionEffect(() => {
        if (keyframesInjected || typeof document === "undefined") return;
        keyframesInjected = true;
        const el = document.createElement("style");
        el.setAttribute("data-diamond", "keyframes");
        el.textContent = KEYFRAMES;
        document.head.appendChild(el);
    }, []);
}

const blockBase =
    "block bg-[linear-gradient(90deg,var(--diamond-surface-alt,#ebe8e1)_0%,var(--diamond-border,#d9d5cc)_50%,var(--diamond-surface-alt,#ebe8e1)_100%)] bg-[length:200%_100%]";

export interface SkeletonBlockProps extends React.HTMLAttributes<HTMLSpanElement> {
    width?: number | string;
    height?: number | string;
    /** Border radius. */
    radius?: number | string;
    /** Whether the shimmer animation runs. Default true. */
    animated?: boolean;
}

export const SkeletonBlock = React.forwardRef<HTMLSpanElement, SkeletonBlockProps>(function SkeletonBlock(
    { className, width, height = 12, radius = 4, animated = true, style, ...rest },
    ref,
) {
    useSkeletonKeyframes();
    const inlineStyle: React.CSSProperties = {
        width,
        height,
        borderRadius: radius,
        animation: animated ? "d-skel 1.6s ease-in-out infinite" : undefined,
        ...style,
    };
    return (
        <span
            ref={ref}
            aria-hidden="true"
            className={cn(blockBase, className)}
            style={inlineStyle}
            {...rest}
        />
    );
});
SkeletonBlock.displayName = "Diamond.SkeletonBlock";

/* ----- Composed variants --------------------------------------------------- */

export type SkeletonVariant = "image" | "post" | "gallery" | "article" | "form" | "list";

const skeletonVariants = cva("flex w-full flex-col gap-2 rounded-md", {
    variants: {
        variant: {
            image: "",
            post: "",
            gallery: "",
            article: "gap-3",
            form: "p-3 ring-1 ring-(--diamond-border,#d9d5cc) ring-inset",
            list: "gap-2.5",
        },
    },
    defaultVariants: { variant: "image" },
});

export interface SkeletonProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof skeletonVariants> {
    /** Number of repeated rows (list/article body). Defaults to 3. */
    rows?: number;
    /** Disable shimmer. */
    static?: boolean;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
    { className, variant = "image", rows = 3, static: isStatic = false, ...rest },
    ref,
) {
    useSkeletonKeyframes();
    const v = variant ?? "image";
    const animated = !isStatic;

    let body: React.ReactNode;
    if (v === "image") {
        body = (
            <>
                <SkeletonBlock width="100%" height={100} radius={8} animated={animated} />
                <SkeletonBlock width="70%" height={12} animated={animated} />
                <SkeletonBlock width="50%" height={10} animated={animated} />
            </>
        );
    } else if (v === "post") {
        body = (
            <>
                <div className="flex items-center gap-3">
                    <SkeletonBlock width={36} height={36} radius="50%" animated={animated} />
                    <div className="flex flex-1 flex-col gap-1.5">
                        <SkeletonBlock width="60%" height={10} animated={animated} />
                        <SkeletonBlock width="40%" height={8} animated={animated} />
                    </div>
                </div>
                <SkeletonBlock width="100%" height={8} animated={animated} />
                <SkeletonBlock width="85%" height={8} animated={animated} />
            </>
        );
    } else if (v === "gallery") {
        body = (
            <>
                <div className="flex gap-1.5">
                    <SkeletonBlock width={60} height={60} radius={6} animated={animated} />
                    <SkeletonBlock width={60} height={60} radius={6} animated={animated} />
                    <SkeletonBlock width={60} height={60} radius={6} animated={animated} />
                </div>
                <SkeletonBlock width="100%" height={10} animated={animated} />
            </>
        );
    } else if (v === "article") {
        body = (
            <>
                <SkeletonBlock width={120} height={16} radius={4} animated={animated} />
                <div className="flex flex-col gap-1.5">
                    {Array.from({ length: rows }, (_, i) => (
                        <SkeletonBlock
                            // biome-ignore lint/suspicious/noArrayIndexKey: positional placeholder
                            key={i}
                            width={`${100 - i * 6}%`}
                            height={8}
                            animated={animated}
                        />
                    ))}
                    <SkeletonBlock width="60%" height={8} animated={animated} />
                </div>
            </>
        );
    } else if (v === "form") {
        body = (
            <>
                <SkeletonBlock width="50%" height={10} animated={animated} />
                <SkeletonBlock width="100%" height={60} radius={4} animated={animated} />
                <div className="flex gap-1.5">
                    <SkeletonBlock width={60} height={22} radius={11} animated={animated} />
                    <SkeletonBlock width={60} height={22} radius={11} animated={animated} />
                </div>
            </>
        );
    } else {
        body = (
            <>
                {Array.from({ length: rows }, (_, i) => (
                    <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: positional placeholder
                        key={i}
                        className="flex items-center gap-2"
                    >
                        <SkeletonBlock width={20} height={20} radius={4} animated={animated} />
                        <SkeletonBlock width="100%" height={12} animated={animated} />
                    </div>
                ))}
            </>
        );
    }

    return (
        <div
            ref={ref}
            role="status"
            aria-busy="true"
            aria-label="Loading content"
            className={cn(skeletonVariants({ variant: v }), className)}
            {...rest}
        >
            {body}
        </div>
    );
});

Skeleton.displayName = "Diamond.Skeleton";

export { skeletonVariants };
