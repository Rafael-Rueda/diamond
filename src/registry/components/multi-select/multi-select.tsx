"use client";

import { CaretDown, Check, X } from "@phosphor-icons/react";
import * as RadixPopover from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · MultiSelect — multi-choice control. `tag-pills` and `chip-dark`
 * accept free input; `checklist`, `filter-chips`, `segmented` and `dropdown`
 * show fixed option sets. */

export type MultiSelectVariant =
    | "tag-pills"
    | "chip-dark"
    | "checklist"
    | "filter-chips"
    | "segmented"
    | "dropdown";

const wrapperVariants = cva("inline-flex w-full max-w-[320px] flex-wrap items-center", {
    variants: {
        variant: {
            "tag-pills": "min-h-[44px] gap-1.5 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2.5 py-2 focus-within:border-(--diamond-accent,#2b7fff) focus-within:ring-3 focus-within:ring-(--diamond-accent,#2b7fff)/20",
            "chip-dark": "min-h-[44px] gap-1.5 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2.5 py-2",
            checklist: "min-w-[220px] flex-col gap-2 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-3",
            "filter-chips": "gap-1.5",
            segmented: "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-0.5",
            dropdown: "",
        },
    },
    defaultVariants: { variant: "tag-pills" },
});

export interface MultiSelectOption {
    value: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    disabled?: boolean;
}

export interface MultiSelectProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
        VariantProps<typeof wrapperVariants> {
    options: MultiSelectOption[];
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (next: string[]) => void;
    placeholder?: string;
    /** tag-pills + chip-dark — allow typing to add free values (kept as plain strings). */
    creatable?: boolean;
    accent?: string;
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(function MultiSelect(
    {
        className,
        variant = "tag-pills",
        options,
        value: valueProp,
        defaultValue,
        onValueChange,
        placeholder = "Add…",
        creatable = false,
        accent,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "tag-pills";
    const [internal, setInternal] = React.useState<string[]>(defaultValue ?? []);
    const isControlled = valueProp !== undefined;
    const selected = isControlled ? valueProp : internal;
    const set = (next: string[]) => {
        if (!isControlled) setInternal(next);
        onValueChange?.(next);
    };
    const toggle = (val: string) => set(selected.includes(val) ? selected.filter((x) => x !== val) : [...selected, val]);
    const remove = (val: string) => set(selected.filter((x) => x !== val));
    const [draft, setDraft] = React.useState("");
    const commit = () => {
        const v2 = draft.trim();
        if (!v2) return;
        if (!selected.includes(v2)) set([...selected, v2]);
        setDraft("");
    };
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const labelFor = (val: string) => options.find((o) => o.value === val)?.label ?? val;

    if (v === "tag-pills" || v === "chip-dark") {
        const dark = v === "chip-dark";
        return (
            <div ref={ref} className={cn(wrapperVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
                {selected.map((val) => (
                    <span
                        key={val}
                        className={cn(
                            "inline-flex items-center gap-1 rounded-md py-1 pr-1 pl-2.5 text-[13px]",
                            dark
                                ? "rounded-full bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#fff)"
                                : "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_12%,white)] text-(--diamond-accent,#2b7fff)",
                        )}
                    >
                        {labelFor(val)}
                        <button
                            type="button"
                            aria-label={`Remove ${val}`}
                            onClick={() => remove(val)}
                            className="ml-0.5 inline-flex size-4 cursor-pointer items-center justify-center rounded-full opacity-70 hover:opacity-100"
                        >
                            <X size={10} weight="bold" />
                        </button>
                    </span>
                ))}
                <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && creatable) {
                            e.preventDefault();
                            commit();
                        } else if (e.key === "Backspace" && !draft && selected.length) {
                            remove(selected[selected.length - 1]);
                        }
                    }}
                    placeholder={selected.length ? "" : placeholder}
                    className="min-w-[80px] flex-1 border-0 bg-transparent px-1 py-1 text-[14px] outline-none placeholder:text-(--diamond-muted,#9a968e)"
                />
            </div>
        );
    }

    if (v === "checklist") {
        return (
            <div ref={ref} className={cn(wrapperVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
                {options.map((o) => {
                    const on = selected.includes(o.value);
                    return (
                        <label
                            key={o.value}
                            className={cn(
                                "flex cursor-pointer items-center gap-2.5 text-[14px]",
                                o.disabled && "pointer-events-none opacity-50",
                            )}
                        >
                            <input
                                type="checkbox"
                                checked={on}
                                onChange={() => toggle(o.value)}
                                disabled={o.disabled}
                                className="peer sr-only"
                            />
                            <span className="flex size-4.5 shrink-0 items-center justify-center rounded border-[1.5px] border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) peer-checked:border-(--diamond-accent,#2b7fff) peer-checked:bg-(--diamond-accent,#2b7fff)">
                                <Check size={12} weight="bold" className="text-white opacity-0 peer-checked:opacity-100" />
                            </span>
                            <span className="flex flex-col">
                                <span>{o.label}</span>
                                {o.description ? (
                                    <span className="text-(--diamond-muted,#6b6862) text-[11px]">{o.description}</span>
                                ) : null}
                            </span>
                        </label>
                    );
                })}
            </div>
        );
    }

    if (v === "filter-chips") {
        return (
            <div ref={ref} className={cn(wrapperVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
                {options.map((o) => {
                    const on = selected.includes(o.value);
                    return (
                        <button
                            key={o.value}
                            type="button"
                            aria-pressed={on}
                            disabled={o.disabled}
                            onClick={() => toggle(o.value)}
                            className={cn(
                                "inline-flex h-8 cursor-pointer items-center gap-1 rounded-full border px-3 text-[13px] transition-colors",
                                on
                                    ? "border-(--diamond-accent,#2b7fff) bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff)"
                                    : "border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) hover:border-(--diamond-accent,#2b7fff)",
                                o.disabled && "pointer-events-none opacity-50",
                            )}
                        >
                            {on ? <Check size={10} weight="bold" /> : null}
                            {o.label}
                        </button>
                    );
                })}
            </div>
        );
    }

    if (v === "segmented") {
        return (
            <div ref={ref} className={cn(wrapperVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
                {options.map((o) => {
                    const on = selected.includes(o.value);
                    return (
                        <button
                            key={o.value}
                            type="button"
                            aria-pressed={on}
                            disabled={o.disabled}
                            onClick={() => toggle(o.value)}
                            className={cn(
                                "h-8 cursor-pointer rounded-md px-3 font-medium text-[12px] transition-colors",
                                on
                                    ? "bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#fff)"
                                    : "text-(--diamond-muted,#6b6862) hover:bg-(--diamond-surface-alt,#ebe8e1)",
                                o.disabled && "pointer-events-none opacity-50",
                            )}
                        >
                            {o.label}
                        </button>
                    );
                })}
            </div>
        );
    }

    /* dropdown */
    return (
        <div ref={ref} className={cn("inline-block w-full max-w-[260px]", className)} style={inlineStyle} {...rest}>
            <RadixPopover.Root>
                <RadixPopover.Trigger asChild>
                    <button
                        type="button"
                        className="inline-flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-2.5 text-[14px] data-[state=open]:border-(--diamond-accent,#2b7fff)"
                    >
                        <span className="truncate">
                            {selected.length === 0
                                ? placeholder
                                : selected.length === 1
                                  ? labelFor(selected[0])
                                  : `${selected.length} selected`}
                        </span>
                        <CaretDown size={12} className="text-(--diamond-muted,#6b6862)" />
                    </button>
                </RadixPopover.Trigger>
                <RadixPopover.Portal>
                    <RadixPopover.Content
                        align="start"
                        sideOffset={6}
                        className="z-50 max-h-60 w-[var(--radix-popover-trigger-width)] overflow-y-auto rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-1 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]"
                    >
                        {options.map((o) => {
                            const on = selected.includes(o.value);
                            return (
                                <button
                                    key={o.value}
                                    type="button"
                                    disabled={o.disabled}
                                    onClick={() => toggle(o.value)}
                                    className={cn(
                                        "flex w-full cursor-pointer items-center gap-2 rounded px-2.5 py-2 text-left text-[13px]",
                                        on
                                            ? "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_10%,white)]"
                                            : "hover:bg-(--diamond-surface-alt,#ebe8e1)",
                                        o.disabled && "pointer-events-none opacity-50",
                                    )}
                                >
                                    <span className="flex size-4 items-center justify-center rounded border border-(--diamond-border,#d9d5cc)">
                                        {on ? <Check size={10} weight="bold" className="text-(--diamond-accent,#2b7fff)" /> : null}
                                    </span>
                                    <span>{o.label}</span>
                                </button>
                            );
                        })}
                    </RadixPopover.Content>
                </RadixPopover.Portal>
            </RadixPopover.Root>
        </div>
    );
});

MultiSelect.displayName = "Diamond.MultiSelect";

export { wrapperVariants as multiSelectWrapperVariants };
