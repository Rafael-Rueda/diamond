"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type ScrollspyVariant = "rail" | "pills" | "dots" | "mono" | "badge" | "sliding";

export interface ScrollspySection {
    id: string;
    label: string;
    content?: React.ReactNode;
}

const scrollspyVariants = cva("grid w-full max-w-[360px] grid-cols-[100px_1fr] gap-3 text-sm", {
    variants: {
        variant: {
            rail: "",
            pills: "",
            dots: "grid-cols-[1fr_24px]",
            mono: "font-mono",
            badge: "",
            sliding: "",
        },
    },
    defaultVariants: { variant: "rail" },
});

export interface ScrollspyProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof scrollspyVariants> {
    sections?: ScrollspySection[];
    activeId?: string;
}

const defaultSections: ScrollspySection[] = [
    { id: "intro", label: "Intro", content: "Short description." },
    { id: "start", label: "Getting started", content: "Install the CLI and run init." },
    { id: "api", label: "API", content: "Reference details." },
];

export const Scrollspy = React.forwardRef<HTMLDivElement, ScrollspyProps>(function Scrollspy(
    { className, variant = "rail", sections = defaultSections, activeId = "start", ...rest },
    ref,
) {
    const active = sections.find((section) => section.id === activeId) ?? sections[0];

    if (variant === "dots") {
        return (
            <div ref={ref} className={cn(scrollspyVariants({ variant }), className)} {...rest}>
                <div className="rounded-md bg-(--diamond-surface-alt,#ebe8e1) p-3 text-[12px]">
                    <h4 className="m-0 mb-1 text-(--diamond-ink,#1a1917)">{active.label}</h4>
                    <div className="text-(--diamond-muted,#6b6862)">{active.content}</div>
                </div>
                <nav aria-label="On this page" className="flex flex-col items-center gap-2">
                    {sections.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            aria-current={section.id === active.id ? "location" : undefined}
                            className={cn(
                                "size-2 rounded-full bg-(--diamond-border,#d9d5cc)",
                                section.id === active.id && "bg-(--diamond-accent,#2b7fff)",
                            )}
                        >
                            <span className="sr-only">{section.label}</span>
                        </a>
                    ))}
                </nav>
            </div>
        );
    }

    return (
        <div ref={ref} className={cn(scrollspyVariants({ variant }), className)} {...rest}>
            <nav
                aria-label="On this page"
                className={cn(
                    "relative flex flex-col gap-1 border-(--diamond-border,#d9d5cc) border-l-2 pl-3 text-[11px]",
                    variant === "pills" && "border-l-0 pl-0",
                    variant === "mono" && "font-mono text-[10px] uppercase tracking-[0.08em]",
                )}
            >
                {variant === "sliding" && (
                    <span className="absolute top-[33%] -left-0.5 h-1/3 w-0.5 rounded bg-(--diamond-accent,#2b7fff)" />
                )}
                {sections.map((section) => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        aria-current={section.id === active.id ? "location" : undefined}
                        className={cn(
                            "relative rounded px-1 py-1 text-(--diamond-muted,#6b6862) no-underline",
                            section.id === active.id && "font-semibold text-(--diamond-ink,#1a1917)",
                            section.id === active.id &&
                                variant === "rail" &&
                                "before:absolute before:top-0 before:bottom-0 before:-left-[14px] before:w-0.5 before:bg-(--diamond-accent,#2b7fff)",
                            section.id === active.id &&
                                variant === "pills" &&
                                "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_12%,var(--diamond-surface,#fff))]",
                        )}
                    >
                        {section.label}
                        {variant === "badge" && section.id === active.id && (
                            <span className="ml-1 inline-block size-1.5 rounded-full bg-(--diamond-accent,#2b7fff)" />
                        )}
                    </a>
                ))}
            </nav>
            <div className="rounded-md bg-(--diamond-surface-alt,#ebe8e1) p-3 text-[12px]">
                <h4 className="m-0 mb-1 text-(--diamond-ink,#1a1917)">{active.label}</h4>
                <div className="text-(--diamond-muted,#6b6862)">{active.content}</div>
            </div>
        </div>
    );
});

Scrollspy.displayName = "Diamond.Scrollspy";

export { scrollspyVariants };
