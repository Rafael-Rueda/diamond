"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type AspectRatioVariant = "video" | "square" | "portrait" | "cinematic" | "photo" | "social";

const ratios: Record<AspectRatioVariant, string> = {
    video: "16 / 9",
    square: "1 / 1",
    portrait: "3 / 4",
    cinematic: "21 / 9",
    photo: "3 / 2",
    social: "4 / 5",
};

const aspectRatioVariants = cva("relative w-full overflow-hidden rounded-md bg-(--diamond-surface-alt,#ebe8e1)", {
    variants: {
        variant: {
            video: "",
            square: "",
            portrait: "",
            cinematic: "",
            photo: "",
            social: "",
        },
    },
    defaultVariants: { variant: "video" },
});

export interface AspectRatioProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof aspectRatioVariants> {
    ratio?: string;
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(function AspectRatio(
    { className, variant = "video", ratio, style, ...rest },
    ref,
) {
    return (
        <div
            ref={ref}
            className={cn(aspectRatioVariants({ variant }), className)}
            style={{ aspectRatio: ratio ?? ratios[variant ?? "video"], ...style }}
            {...rest}
        />
    );
});

AspectRatio.displayName = "Diamond.AspectRatio";

export { aspectRatioVariants };
