"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Accordion — collapsible stack with single or multi expand. */

export type AccordionVariant = "faq" | "separated" | "terminal" | "editorial" | "team" | "inset";

const accordionVariants = cva("flex w-full flex-col text-(--diamond-ink,#1a1917)", {
    variants: {
        variant: {
            faq: "divide-y divide-(--diamond-border,#d9d5cc) rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff)",
            separated: "gap-2",
            terminal:
                "divide-y divide-(--diamond-border,#d9d5cc) rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) font-mono",
            editorial: "gap-0 [&>*]:border-(--diamond-border,#d9d5cc) [&>*]:border-b",
            team: "divide-y divide-(--diamond-border,#d9d5cc) rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff)",
            inset: "gap-1 rounded-md bg-(--diamond-surface-alt,#ebe8e1) p-1.5",
        },
    },
    defaultVariants: { variant: "faq" },
});

export interface AccordionItem {
    id: string;
    /** Trigger label. */
    title: React.ReactNode;
    /** Body content. */
    content: React.ReactNode;
    /** Trailing slot inside the trigger (count, color dot, etc). */
    trailing?: React.ReactNode;
    /** Leading slot inside the trigger. */
    leading?: React.ReactNode;
    /** Initial open state. */
    defaultOpen?: boolean;
    disabled?: boolean;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof accordionVariants> {
    items: AccordionItem[];
    /** Allow multiple items open at once. */
    multiple?: boolean;
    /** Controlled open ids. */
    value?: string[];
    onValueChange?: (ids: string[]) => void;
    /** Initial open ids (uncontrolled). */
    defaultValue?: string[];
    accent?: string;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
    { className, variant = "faq", items, multiple, value, onValueChange, defaultValue, accent, style, ...rest },
    ref,
) {
    const [internal, setInternal] = React.useState<string[]>(
        defaultValue ?? items.filter((i) => i.defaultOpen).map((i) => i.id),
    );
    const open = value ?? internal;
    const setOpen = (next: string[]) => {
        if (!value) setInternal(next);
        onValueChange?.(next);
    };
    const toggle = (id: string) => {
        const isOpen = open.includes(id);
        const next = multiple ? (isOpen ? open.filter((x) => x !== id) : [...open, id]) : isOpen ? [] : [id];
        setOpen(next);
    };

    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const triggerCls = (v: AccordionVariant | null | undefined) => {
        const base = "flex items-center justify-between w-full text-left cursor-pointer";
        if (v === "editorial") return `${base} py-3 [font-family:Fraunces,Georgia,serif] italic text-[16px]`;
        if (v === "terminal") return `${base} px-3 py-2.5 text-[11px] tracking-[0.04em]`;
        return `${base} px-3 py-2.5 text-[13px] font-medium hover:bg-(--diamond-surface-alt,#ebe8e1)/50 transition-colors`;
    };

    const contentCls = (v: AccordionVariant | null | undefined) => {
        if (v === "editorial") return "pb-3 italic text-(--diamond-muted,#6b6862) text-[13px]";
        if (v === "terminal")
            return "px-3 pb-2.5 font-mono text-[11px] bg-[#0f0f0e] text-[#d4d0c8] mx-2 mb-2 rounded p-2.5";
        return "px-3 pb-2.5 text-[12px] text-(--diamond-muted,#6b6862)";
    };

    return (
        <div ref={ref} className={cn(accordionVariants({ variant }), className)} style={inlineStyle} {...rest}>
            {items.map((it) => {
                const isOpen = open.includes(it.id);
                const wrap =
                    variant === "separated"
                        ? cn(
                              "rounded-md border bg-(--diamond-surface,#fff) overflow-hidden",
                              isOpen ? "border-(--diamond-accent,#2b7fff)" : "border-(--diamond-border,#d9d5cc)",
                          )
                        : variant === "inset"
                          ? cn("rounded bg-transparent", isOpen && "bg-(--diamond-surface,#fff)")
                          : "";
                return (
                    <div key={it.id} className={wrap}>
                        <button
                            type="button"
                            aria-expanded={isOpen}
                            disabled={it.disabled}
                            onClick={() => toggle(it.id)}
                            className={cn(triggerCls(variant), it.disabled && "cursor-not-allowed opacity-50")}
                        >
                            <span className="flex items-center gap-2">
                                {it.leading}
                                <span>{it.title}</span>
                            </span>
                            <span className="flex items-center gap-2">
                                {it.trailing}
                                <span
                                    aria-hidden="true"
                                    className={cn(
                                        "inline-block text-(--diamond-muted,#6b6862) transition-transform duration-200",
                                        isOpen && "rotate-90 text-(--diamond-accent,#2b7fff)",
                                    )}
                                >
                                    ›
                                </span>
                            </span>
                        </button>
                        {isOpen && <div className={contentCls(variant)}>{it.content}</div>}
                    </div>
                );
            })}
        </div>
    );
});

Accordion.displayName = "Diamond.Accordion";

export { accordionVariants };
