"use client";

import { CaretDown, Check } from "@phosphor-icons/react";
import * as RadixPopover from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Select — single-choice dropdown. `native` variant renders a real
 * <select>. All other variants are Radix Popover wrappers around a custom
 * trigger and option list, keeping keyboard nav and outside-click dismiss. */

export type SelectVariant = "native" | "custom" | "avatars" | "flat" | "terminal" | "flags";

const triggerVariants = cva(
    "inline-flex w-full max-w-[260px] cursor-pointer items-center justify-between gap-2 font-sans text-(--diamond-ink,#1a1917) text-[14px] outline-none transition-[border-color,box-shadow]",
    {
        variants: {
            variant: {
                native:
                    "appearance-none rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) py-2.5 pr-10 pl-3.5 focus-visible:border-(--diamond-accent,#2b7fff) focus-visible:ring-3 focus-visible:ring-(--diamond-accent,#2b7fff)/20",
                custom:
                    "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-2.5 data-[state=open]:border-(--diamond-accent,#2b7fff) data-[state=open]:ring-3 data-[state=open]:ring-(--diamond-accent,#2b7fff)/20",
                avatars:
                    "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-2.5 data-[state=open]:border-(--diamond-accent,#2b7fff)",
                flat: "rounded-none border-0 border-b-[1.5px] border-(--diamond-border,#d9d5cc) bg-transparent px-0 py-2 data-[state=open]:border-(--diamond-accent,#2b7fff)",
                terminal:
                    "rounded-sm border border-[#2d2c28] bg-[#0a0a08] px-3 py-2.5 font-mono text-[#d4d0c8] text-[13px] before:mr-2 before:text-(--diamond-accent,#2b7fff) before:content-['>'] data-[state=open]:border-(--diamond-accent,#2b7fff)",
                flags:
                    "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-2.5 data-[state=open]:border-(--diamond-accent,#2b7fff)",
            },
        },
        defaultVariants: { variant: "custom" },
    },
);

export interface SelectOption {
    value: string;
    label: React.ReactNode;
    /** Avatars variant — initials, image, etc. */
    leading?: React.ReactNode;
    /** Avatars variant — background color for the leading bubble. */
    leadingColor?: string;
    /** Flags variant — flag emoji or country code. */
    flag?: React.ReactNode;
    /** Right-aligned hint shown in the option (e.g. shortcut). */
    hint?: React.ReactNode;
    disabled?: boolean;
}

export interface SelectProps
    extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
        VariantProps<typeof triggerVariants> {
    options: SelectOption[];
    /** Selected value. */
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    accent?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(function Select(
    {
        className,
        variant = "custom",
        options,
        value: valueProp,
        defaultValue,
        onValueChange,
        placeholder = "Select…",
        accent,
        name,
        disabled,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "custom";
    const [internal, setInternal] = React.useState<string | undefined>(defaultValue);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internal;
    const selected = options.find((o) => o.value === value);
    const select = (next: string) => {
        if (!isControlled) setInternal(next);
        onValueChange?.(next);
    };
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    if (v === "native") {
        return (
            <div
                ref={ref}
                className={cn("relative inline-block w-full max-w-[260px]", className)}
                style={inlineStyle}
            >
                <select
                    name={name}
                    value={value ?? ""}
                    onChange={(e) => select(e.target.value)}
                    disabled={disabled}
                    className={triggerVariants({ variant: v })}
                    {...rest}
                >
                    {placeholder ? <option value="">{placeholder}</option> : null}
                    {options.map((o) => (
                        <option key={o.value} value={o.value} disabled={o.disabled}>
                            {typeof o.label === "string" ? o.label : o.value}
                        </option>
                    ))}
                </select>
                <CaretDown
                    size={12}
                    className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3.5 text-(--diamond-muted,#6b6862)"
                />
            </div>
        );
    }

    return (
        <div ref={ref} className={cn("inline-block w-full max-w-[260px]", className)} style={inlineStyle}>
            <RadixPopover.Root>
                <RadixPopover.Trigger asChild disabled={disabled}>
                    <button type="button" className={triggerVariants({ variant: v })}>
                        <span className="flex items-center gap-2 truncate">
                            {v === "avatars" && selected?.leading ? (
                                <span
                                    aria-hidden="true"
                                    className="flex size-6 shrink-0 items-center justify-center rounded-full font-bold text-[11px]"
                                    style={{
                                        background: selected.leadingColor ?? "color-mix(in oklab, var(--diamond-accent,#2b7fff) 20%, white)",
                                        color: "var(--diamond-accent,#2b7fff)",
                                    }}
                                >
                                    {selected.leading}
                                </span>
                            ) : null}
                            {v === "flags" && selected?.flag ? (
                                <span aria-hidden="true" className="text-[16px]">
                                    {selected.flag}
                                </span>
                            ) : null}
                            <span className="truncate">{selected?.label ?? placeholder}</span>
                        </span>
                        <CaretDown size={12} className="shrink-0 text-(--diamond-muted,#6b6862)" />
                    </button>
                </RadixPopover.Trigger>
                <RadixPopover.Portal>
                    <RadixPopover.Content
                        align="start"
                        sideOffset={6}
                        className={cn(
                            "z-50 w-[var(--radix-popover-trigger-width)] max-h-60 overflow-y-auto rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-1 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] outline-none",
                            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
                            v === "terminal" && "border-[#2d2c28] bg-[#0a0a08] text-[#d4d0c8]",
                        )}
                    >
                        {options.map((o) => {
                            const on = o.value === value;
                            return (
                                <button
                                    key={o.value}
                                    type="button"
                                    role="option"
                                    aria-selected={on}
                                    disabled={o.disabled}
                                    onClick={() => select(o.value)}
                                    className={cn(
                                        "flex w-full cursor-pointer items-center justify-between gap-2.5 rounded px-2.5 py-2 text-left text-[13px] transition-colors",
                                        on
                                            ? "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_12%,var(--diamond-surface,#fff))] text-(--diamond-accent-deep,color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,#000))"
                                            : "text-(--diamond-ink,#1a1917) hover:bg-(--diamond-surface-alt,#ebe8e1)",
                                        o.disabled && "pointer-events-none opacity-50",
                                        v === "terminal" && (on ? "bg-[#1a1a18] text-(--diamond-accent,#2b7fff)" : "text-[#d4d0c8] hover:bg-[#1a1a18]"),
                                    )}
                                >
                                    <span className="flex items-center gap-2 truncate">
                                        {v === "avatars" && o.leading ? (
                                            <span
                                                aria-hidden="true"
                                                className="flex size-6 shrink-0 items-center justify-center rounded-full font-bold text-[11px]"
                                                style={{
                                                    background:
                                                        o.leadingColor ??
                                                        "color-mix(in oklab, var(--diamond-accent,#2b7fff) 20%, white)",
                                                    color: "var(--diamond-accent,#2b7fff)",
                                                }}
                                            >
                                                {o.leading}
                                            </span>
                                        ) : null}
                                        {v === "flags" && o.flag ? <span aria-hidden="true" className="text-[16px]">{o.flag}</span> : null}
                                        <span className="truncate">{o.label}</span>
                                    </span>
                                    {o.hint ?? (on ? <Check size={12} weight="bold" /> : null)}
                                </button>
                            );
                        })}
                    </RadixPopover.Content>
                </RadixPopover.Portal>
            </RadixPopover.Root>
        </div>
    );
});

Select.displayName = "Diamond.Select";

export { triggerVariants as selectTriggerVariants };
