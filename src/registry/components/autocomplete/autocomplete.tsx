"use client";

import { Clock, MagnifyingGlass } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Autocomplete — typeahead input with a filtered suggestion list.
 * Six variants: basic, hints, recents, @ mentions, slash commands, inline
 * ghost hint. Wraps a real <input>. */

export type AutocompleteVariant =
    | "basic"
    | "hints"
    | "recents"
    | "mentions"
    | "slash"
    | "ghost";

const wrapperVariants = cva("relative inline-block w-full max-w-[300px]", {
    variants: {
        variant: {
            basic: "",
            hints: "",
            recents: "",
            mentions: "",
            slash: "",
            ghost: "",
        },
    },
    defaultVariants: { variant: "basic" },
});

const inputCls =
    "w-full rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-2.5 text-(--diamond-ink,#1a1917) text-[14px] outline-none transition-[border-color,box-shadow] placeholder:text-(--diamond-muted,#9a968e) focus-visible:border-(--diamond-accent,#2b7fff) focus-visible:ring-3 focus-visible:ring-(--diamond-accent,#2b7fff)/20";

export interface AutocompleteItem {
    value: string;
    label?: React.ReactNode;
    description?: React.ReactNode;
    /** Icon / glyph for slash and mention variants. */
    leading?: React.ReactNode;
    /** Keyboard hint badge displayed at the right. */
    hint?: React.ReactNode;
}

export interface AutocompleteProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "value">,
        VariantProps<typeof wrapperVariants> {
    items: AutocompleteItem[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (next: string) => void;
    /** Called when an item is picked. Defaults to onValueChange(item.value). */
    onSelect?: (item: AutocompleteItem) => void;
    /** Override the filter — defaults to startsWith(case-insensitive). */
    filter?: (input: string, item: AutocompleteItem) => boolean;
    /** Recents variant — shown when input is empty. */
    recents?: AutocompleteItem[];
    /** Mentions/slash variants — the trigger character to listen for. */
    triggerChar?: string;
    accent?: string;
}

export const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
    function Autocomplete(
        {
            className,
            variant = "basic",
            items,
            value: valueProp,
            defaultValue,
            onValueChange,
            onSelect,
            filter,
            recents = [],
            triggerChar,
            placeholder,
            accent,
            style,
            ...rest
        },
        ref,
    ) {
        const v = variant ?? "basic";
        const [internal, setInternal] = React.useState(defaultValue ?? "");
        const isControlled = valueProp !== undefined;
        const value = (isControlled ? valueProp : internal) ?? "";
        const setValue = (next: string) => {
            if (!isControlled) setInternal(next);
            onValueChange?.(next);
        };
        const inlineStyle: React.CSSProperties = { ...style };
        if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

        const trigger = triggerChar ?? (v === "mentions" ? "@" : v === "slash" ? "/" : undefined);
        const showAfterTrigger = !!trigger && value.includes(trigger);
        const query = (() => {
            if (!trigger || !showAfterTrigger) return value;
            const idx = value.lastIndexOf(trigger);
            return value.slice(idx + 1);
        })();
        const isEmpty = value.trim() === "";
        const f = filter ?? ((input, item) => item.value.toLowerCase().startsWith(input.toLowerCase()));
        const filtered = isEmpty && v === "recents" ? recents : items.filter((i) => f(query, i));

        const [open, setOpen] = React.useState(false);
        const [activeIdx, setActiveIdx] = React.useState(0);

        const pick = (it: AutocompleteItem) => {
            if (trigger && showAfterTrigger) {
                const idx = value.lastIndexOf(trigger);
                setValue(`${value.slice(0, idx)}${trigger}${it.value} `);
            } else {
                setValue(it.value);
            }
            onSelect?.(it);
            setOpen(false);
        };

        const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!open || !filtered.length) return;
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIdx((p) => (p + 1) % filtered.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIdx((p) => (p - 1 + filtered.length) % filtered.length);
            } else if (e.key === "Enter") {
                e.preventDefault();
                pick(filtered[activeIdx]);
            } else if (e.key === "Escape") {
                setOpen(false);
            } else if (e.key === "Tab" && v === "ghost" && filtered[0]) {
                e.preventDefault();
                pick(filtered[0]);
            }
        };

        const ghostSuggestion =
            v === "ghost" && value && filtered[0]?.value && filtered[0].value.toLowerCase().startsWith(value.toLowerCase())
                ? filtered[0].value.slice(value.length)
                : "";

        return (
            <div
                className={cn(wrapperVariants({ variant: v }), className)}
                style={inlineStyle}
            >
                <div className="relative">
                    <input
                        ref={ref}
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            setOpen(true);
                            setActiveIdx(0);
                        }}
                        onFocus={() => setOpen(true)}
                        onBlur={() => setTimeout(() => setOpen(false), 120)}
                        onKeyDown={onKey}
                        placeholder={placeholder ?? "Start typing…"}
                        className={inputCls}
                        {...rest}
                    />
                    {v === "ghost" && ghostSuggestion ? (
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute top-2.5 left-3.5 select-none text-(--diamond-muted,#9a968e) text-[14px]"
                        >
                            <span className="invisible">{value}</span>
                            {ghostSuggestion}
                        </span>
                    ) : null}
                </div>

                {open && filtered.length > 0 ? (
                    <ul
                        role="listbox"
                        className="absolute top-[calc(100%+6px)] right-0 left-0 z-30 max-h-60 list-none overflow-y-auto rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-1 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]"
                    >
                        {v === "recents" && isEmpty ? (
                            <li className="px-2.5 py-1.5 font-mono text-[10px] text-(--diamond-muted,#9a968e) uppercase tracking-[0.14em]">
                                Recent
                            </li>
                        ) : null}
                        {filtered.map((it, i) => (
                            <li key={`${it.value}-${i}`}>
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={i === activeIdx}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => pick(it)}
                                    className={cn(
                                        "flex w-full cursor-pointer items-center gap-2.5 rounded px-2.5 py-2 text-left text-[13px]",
                                        i === activeIdx ? "bg-(--diamond-surface-alt,#ebe8e1)" : "",
                                        "hover:bg-(--diamond-surface-alt,#ebe8e1)",
                                    )}
                                >
                                    {v === "mentions" || v === "slash" ? (
                                        <span
                                            aria-hidden="true"
                                            className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-(--diamond-surface-alt,#ebe8e1) font-mono text-[11px]"
                                        >
                                            {it.leading ?? (v === "mentions" ? "@" : "/")}
                                        </span>
                                    ) : v === "recents" && isEmpty ? (
                                        <Clock size={12} className="text-(--diamond-muted,#9a968e)" />
                                    ) : (
                                        <MagnifyingGlass size={12} className="text-(--diamond-muted,#9a968e)" />
                                    )}
                                    <span className="flex flex-1 flex-col">
                                        <span>{it.label ?? it.value}</span>
                                        {v === "hints" || v === "slash" ? (
                                            <span className="text-(--diamond-muted,#6b6862) text-[11px]">
                                                {it.description}
                                            </span>
                                        ) : null}
                                    </span>
                                    {it.hint ? (
                                        <kbd className="inline-flex h-5 items-center rounded border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface-alt,#ebe8e1) px-1.5 font-mono text-[10px] text-(--diamond-muted,#6b6862)">
                                            {it.hint}
                                        </kbd>
                                    ) : null}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        );
    },
);

Autocomplete.displayName = "Diamond.Autocomplete";

export { wrapperVariants as autocompleteVariants };
