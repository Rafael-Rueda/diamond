"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Timeline — chronological events; vertical or horizontal. */

export type TimelineVariant = "vertical" | "milestone" | "log" | "horizontal" | "historical" | "activity";

const timelineVariants = cva("w-full", {
    variants: {
        variant: {
            vertical: "relative flex flex-col gap-4 pl-6",
            milestone: "relative flex flex-col gap-4 pl-6",
            log: "relative flex flex-col gap-2 pl-16 font-mono",
            horizontal: "flex flex-row items-start justify-between",
            historical: "relative flex flex-col gap-5 pl-7",
            activity: "flex flex-col gap-3",
        },
    },
    defaultVariants: { variant: "vertical" },
});

export interface TimelineEvent {
    id?: React.Key;
    /** Time / date / month label. */
    time?: React.ReactNode;
    /** Headline. */
    title: React.ReactNode;
    /** Body text. */
    description?: React.ReactNode;
    /** Marker color. */
    color?: string;
    /** Marker is filled (default) or outlined. */
    done?: boolean;
    /** Custom marker element. */
    marker?: React.ReactNode;
}

export interface TimelineProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
        VariantProps<typeof timelineVariants> {
    events: TimelineEvent[];
    accent?: string;
    /** Length of progress (0..1) for `horizontal` variant. */
    progress?: number;
}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(function Timeline(
    { className, variant = "vertical", events, accent, progress = 0.5, style, ...rest },
    ref,
) {
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    if (variant === "horizontal") {
        return (
            <div
                ref={ref}
                className={cn(timelineVariants({ variant }), className, "relative pt-3")}
                style={inlineStyle}
                {...rest}
            >
                <div className="absolute top-3 right-[5%] left-[5%] h-0.5 bg-(--diamond-border,#d9d5cc)">
                    <div
                        className="h-full bg-(--diamond-accent,#2b7fff)"
                        style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
                    />
                </div>
                {events.map((e, i) => {
                    const passed = i / Math.max(1, events.length - 1) <= progress;
                    return (
                        <div key={e.id ?? i} className="relative z-[1] flex flex-col items-center gap-1.5">
                            <span
                                className={cn(
                                    "size-3.5 rounded-full",
                                    passed
                                        ? "bg-(--diamond-accent,#2b7fff)"
                                        : "border-(--diamond-border,#d9d5cc) border-2 bg-(--diamond-surface,#fff)",
                                )}
                            />
                            <span
                                className={cn(
                                    "text-[11px]",
                                    passed
                                        ? "font-semibold text-(--diamond-ink,#1a1917)"
                                        : "text-(--diamond-muted,#6b6862)",
                                )}
                            >
                                {e.title}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    }

    if (variant === "activity") {
        return (
            <div ref={ref} className={cn(timelineVariants({ variant }), className)} style={inlineStyle} {...rest}>
                {events.map((e, i) => (
                    <div key={e.id ?? i} className="flex items-start gap-3">
                        <div className="shrink-0">{e.marker}</div>
                        <div className="min-w-0 flex-1">
                            <div className="text-[12px]">{e.title}</div>
                            {e.time && <div className="text-(--diamond-muted,#6b6862) text-[10px]">{e.time}</div>}
                            {e.description && (
                                <div className="text-(--diamond-muted,#6b6862) text-[11px]">{e.description}</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div ref={ref} className={cn(timelineVariants({ variant }), className)} style={inlineStyle} {...rest}>
            <div
                aria-hidden="true"
                className={cn(
                    "absolute top-1.5 bottom-1.5 w-px bg-(--diamond-border,#d9d5cc)",
                    variant === "log" ? "left-[3.25rem]" : "left-[0.6875rem]",
                )}
            />
            {events.map((e, i) => (
                <div key={e.id ?? i} className="relative">
                    {variant === "log" && (
                        <span className="absolute top-0.5 -left-12 w-10 text-right font-mono text-(--diamond-muted,#6b6862) text-[10px]">
                            {e.time}
                        </span>
                    )}
                    {e.marker ? (
                        <span className="absolute top-0.5 -left-6">{e.marker}</span>
                    ) : (
                        <span
                            className={cn(
                                "absolute top-1 rounded-full",
                                variant === "historical"
                                    ? "-left-7 size-3.5 border-(--diamond-border,#d9d5cc) border-2 bg-(--diamond-surface,#fff)"
                                    : "-left-[1.4rem] size-2.5",
                            )}
                            style={{
                                background:
                                    variant === "historical"
                                        ? "var(--diamond-surface,#fff)"
                                        : (e.color ??
                                          (e.done === false ? "transparent" : "var(--diamond-accent,#2b7fff)")),
                                borderColor: e.done === false ? "var(--diamond-border,#d9d5cc)" : undefined,
                                borderWidth: e.done === false ? 2 : undefined,
                                borderStyle: e.done === false ? "solid" : undefined,
                            }}
                        />
                    )}
                    <div>
                        {e.time && variant !== "log" && (
                            <div className="font-mono text-(--diamond-muted,#6b6862) text-[10px] uppercase tracking-[0.12em]">
                                {e.time}
                            </div>
                        )}
                        <div
                            className={cn(
                                variant === "historical" &&
                                    "font-medium text-[20px] italic leading-tight [font-family:Fraunces,Georgia,serif]",
                                variant === "milestone" && "text-[16px] italic [font-family:Fraunces,Georgia,serif]",
                                variant !== "historical" && variant !== "milestone" && "font-semibold text-[13px]",
                            )}
                        >
                            {e.title}
                        </div>
                        {e.description && (
                            <div className="mt-0.5 text-(--diamond-muted,#6b6862) text-[11px]">{e.description}</div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
});

Timeline.displayName = "Diamond.Timeline";

export { timelineVariants };
