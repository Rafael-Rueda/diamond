"use client";

import { Check, X } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Checkbox — single checkbox **and** checkbox group in one. Pass
 * `label`/`children` for a single control; pass `items` for a group. Wraps
 * the real <input type="checkbox">. */

export type CheckboxVariant =
    /* Single */ | "square" | "round" | "switch" | "card" | "x-mark" | "ascii"
    /* Group  */ | "stacked" | "card-grid" | "pills" | "select-all" | "days" | "priced-rows";

const isGroupVariant = (v: CheckboxVariant) =>
    v === "stacked" ||
    v === "card-grid" ||
    v === "pills" ||
    v === "select-all" ||
    v === "days" ||
    v === "priced-rows";

const boxVariants = cva(
    "relative flex shrink-0 items-center justify-center border-[1.5px] border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) transition-colors",
    {
        variants: {
            variant: {
                square: "size-4.5 rounded peer-checked:border-(--diamond-accent,#2b7fff) peer-checked:bg-(--diamond-accent,#2b7fff)",
                round: "size-4.5 rounded-full peer-checked:border-(--diamond-accent,#2b7fff) peer-checked:bg-(--diamond-accent,#2b7fff)",
                switch: "h-5 w-9 rounded-full p-0.5 peer-checked:bg-(--diamond-accent,#2b7fff)",
                card: "size-4.5 rounded peer-checked:border-(--diamond-accent,#2b7fff) peer-checked:bg-(--diamond-accent,#2b7fff)",
                "x-mark": "size-4.5 rounded-sm peer-checked:border-(--diamond-accent,#2b7fff)",
                ascii: "size-5 rounded-none border-(--diamond-ink,#1a1917) font-mono text-[14px]",
                stacked: "",
                "card-grid": "",
                pills: "",
                "select-all": "",
                days: "",
                "priced-rows": "",
            },
        },
        defaultVariants: { variant: "square" },
    },
);

export interface CheckboxItem {
    id: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    /** Trailing slot — price, hint, count, etc. */
    trailing?: React.ReactNode;
    disabled?: boolean;
}

type SingleProps = {
    /** Single label. Mutually exclusive with `items`. */
    label?: React.ReactNode;
    children?: React.ReactNode;
    items?: never;
    value?: never;
    onValueChange?: never;
    /** Show a "select all" toggle (group variants only). */
    selectAll?: never;
};
type GroupProps = {
    items: CheckboxItem[];
    /** Controlled selected ids. */
    value?: string[];
    /** Default selected ids (uncontrolled). */
    defaultValue?: string[];
    onValueChange?: (next: string[]) => void;
    label?: never;
    children?: never;
    /** Show a "select all" toggle. */
    selectAll?: React.ReactNode;
};

export type CheckboxProps =
    & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">
    & VariantProps<typeof boxVariants>
    & (SingleProps | GroupProps)
    & {
        accent?: string;
        /** Single mode forward props. */
        checked?: boolean;
        defaultChecked?: boolean;
        onChange?: React.ChangeEventHandler<HTMLInputElement>;
        disabled?: boolean;
        name?: string;
        /** Make the single control indeterminate. */
        indeterminate?: boolean;
    };

/* ---- Single ---- */

function SingleCheckbox({
    variant = "square",
    label,
    children,
    accent,
    indeterminate,
    checked,
    defaultChecked,
    onChange,
    disabled,
    name,
    className,
    style,
    ...rest
}: Omit<CheckboxProps, "items">) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (inputRef.current) inputRef.current.indeterminate = !!indeterminate;
    }, [indeterminate]);
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;
    const v = variant as CheckboxVariant;

    const innerLabel = (
        <>
            <input
                ref={inputRef}
                type="checkbox"
                checked={checked}
                defaultChecked={defaultChecked}
                onChange={onChange}
                disabled={disabled}
                name={name}
                className="peer sr-only"
            />
            {v === "switch" ? (
                <span
                    className={cn(
                        boxVariants({ variant: v }),
                        "cursor-pointer",
                        "before:size-3.5 before:rounded-full before:bg-(--diamond-border,#d9d5cc) before:transition-transform before:content-['']",
                        "peer-checked:before:translate-x-4 peer-checked:before:bg-white",
                    )}
                />
            ) : v === "ascii" ? (
                <span
                    className={cn(
                        boxVariants({ variant: v }),
                        "cursor-pointer text-(--diamond-ink,#1a1917)",
                        "before:content-[''] peer-checked:before:content-['×']",
                    )}
                />
            ) : v === "x-mark" ? (
                <span className={cn(boxVariants({ variant: v }), "cursor-pointer")}>
                    <X
                        size={12}
                        weight="bold"
                        className="text-(--diamond-accent,#2b7fff) opacity-0 transition-opacity group-has-[input:checked]:opacity-100"
                    />
                </span>
            ) : (
                <span className={cn(boxVariants({ variant: v }), "cursor-pointer")}>
                    <Check
                        size={12}
                        weight="bold"
                        className="text-(--diamond-on-accent,#fff) opacity-0 transition-opacity group-has-[input:checked]:opacity-100"
                    />
                </span>
            )}
            {(label ?? children) ? <span>{label ?? children}</span> : null}
        </>
    );

    if (v === "card") {
        return (
            <label
                className={cn(
                    "group inline-flex min-w-[180px] cursor-pointer select-none items-center gap-3 rounded-md border-[1.5px] border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-3 text-(--diamond-ink,#1a1917) text-[14px] transition-colors has-[input:checked]:border-(--diamond-accent,#2b7fff) has-[input:checked]:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_8%,var(--diamond-surface,#fff))]",
                    disabled && "pointer-events-none opacity-50",
                    className,
                )}
                style={inlineStyle}
                {...(rest as React.LabelHTMLAttributes<HTMLLabelElement>)}
            >
                {innerLabel}
            </label>
        );
    }
    return (
        <label
            className={cn(
                "group inline-flex cursor-pointer select-none items-center gap-2.5 text-(--diamond-ink,#1a1917) text-[14px]",
                disabled && "pointer-events-none opacity-50",
                className,
            )}
            style={inlineStyle}
            {...(rest as React.LabelHTMLAttributes<HTMLLabelElement>)}
        >
            {innerLabel}
        </label>
    );
}

/* ---- Group ---- */

function GroupCheckbox({
    variant = "stacked",
    items,
    value: valueProp,
    defaultValue,
    onValueChange,
    selectAll,
    accent,
    className,
    style,
    ...rest
}: Omit<CheckboxProps, "label" | "children">) {
    const v = variant as CheckboxVariant;
    const [internal, setInternal] = React.useState<string[]>(defaultValue ?? []);
    const isControlled = valueProp !== undefined;
    const selected = isControlled ? valueProp : internal;
    const set = (next: string[]) => {
        if (!isControlled) setInternal(next);
        onValueChange?.(next);
    };
    const toggle = (id: string) => set(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
    const allIds = (items ?? []).map((i) => i.id);
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    if (v === "pills" || v === "days") {
        return (
            <div
                role="group"
                className={cn("inline-flex flex-wrap gap-1.5", v === "days" && "gap-1", className)}
                style={inlineStyle}
                {...(rest as React.HTMLAttributes<HTMLDivElement>)}
            >
                {(items ?? []).map((i) => {
                    const on = selected.includes(i.id);
                    return (
                        <button
                            key={i.id}
                            type="button"
                            aria-pressed={on}
                            disabled={i.disabled}
                            onClick={() => toggle(i.id)}
                            className={cn(
                                v === "days"
                                    ? "inline-flex size-9 items-center justify-center rounded-full border border-(--diamond-border,#d9d5cc) font-mono font-semibold text-[11px]"
                                    : "inline-flex h-8 cursor-pointer items-center justify-center rounded-full border px-3 text-[13px] transition-colors",
                                on
                                    ? "border-(--diamond-accent,#2b7fff) bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff)"
                                    : "border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) hover:border-(--diamond-accent,#2b7fff) hover:text-(--diamond-accent,#2b7fff)",
                                i.disabled && "pointer-events-none opacity-50",
                            )}
                        >
                            {i.label}
                        </button>
                    );
                })}
            </div>
        );
    }

    const wrapperCls =
        v === "card-grid"
            ? "grid grid-cols-2 gap-2"
            : v === "select-all"
              ? "flex flex-col gap-2 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-3"
              : v === "priced-rows"
                ? "flex min-w-[240px] flex-col gap-1.5"
                : "flex flex-col gap-2.5";

    return (
        <div
            role="group"
            className={cn(wrapperCls, className)}
            style={inlineStyle}
            {...(rest as React.HTMLAttributes<HTMLDivElement>)}
        >
            {v === "select-all" ? (
                <label className="group flex cursor-pointer select-none items-center gap-2.5 border-(--diamond-border,#d9d5cc) border-b pb-2 font-semibold text-(--diamond-ink,#1a1917) text-[14px]">
                    <input
                        type="checkbox"
                        checked={selected.length === allIds.length && allIds.length > 0}
                        ref={(el) => {
                            if (el) el.indeterminate = selected.length > 0 && selected.length < allIds.length;
                        }}
                        onChange={() => set(selected.length === allIds.length ? [] : allIds)}
                        className="peer sr-only"
                    />
                    <span className={cn(boxVariants({ variant: "square" }), "cursor-pointer")}>
                        <Check
                            size={12}
                            weight="bold"
                            className="text-(--diamond-on-accent,#fff) opacity-0 group-has-[input:checked]:opacity-100"
                        />
                    </span>
                    {selectAll ?? "Select all"}
                </label>
            ) : null}

            {(items ?? []).map((i) => {
                const on = selected.includes(i.id);
                const inner = (
                    <>
                        <input
                            type="checkbox"
                            checked={on}
                            onChange={() => toggle(i.id)}
                            disabled={i.disabled}
                            className="peer sr-only"
                        />
                        <span className={cn(boxVariants({ variant: "square" }), "cursor-pointer")}>
                            <Check
                                size={12}
                                weight="bold"
                                className="text-(--diamond-on-accent,#fff) opacity-0 group-has-[input:checked]:opacity-100"
                            />
                        </span>
                    </>
                );
                if (v === "card-grid") {
                    return (
                        <label
                            key={i.id}
                            className={cn(
                                "group inline-flex min-w-[130px] cursor-pointer select-none items-center gap-3 rounded-md border-[1.5px] border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-3 text-(--diamond-ink,#1a1917) text-[14px] transition-colors has-[input:checked]:border-(--diamond-accent,#2b7fff) has-[input:checked]:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_8%,var(--diamond-surface,#fff))]",
                                i.disabled && "pointer-events-none opacity-50",
                            )}
                        >
                            {inner}
                            <span>{i.label}</span>
                        </label>
                    );
                }
                if (v === "priced-rows") {
                    return (
                        <label
                            key={i.id}
                            className={cn(
                                "group flex cursor-pointer select-none items-center justify-between rounded-md border bg-(--diamond-surface,#fff) px-3 py-2.5 text-(--diamond-ink,#1a1917)",
                                on ? "border-(--diamond-accent,#2b7fff)" : "border-(--diamond-border,#d9d5cc)",
                                i.disabled && "pointer-events-none opacity-50",
                            )}
                        >
                            <span className="inline-flex items-center gap-2.5 text-[14px]">
                                {inner}
                                {i.label}
                            </span>
                            <span className="font-mono text-(--diamond-muted,#6b6862) text-[12px]">{i.trailing}</span>
                        </label>
                    );
                }
                return (
                    <label
                        key={i.id}
                        className={cn(
                            "group inline-flex cursor-pointer select-none items-center gap-2.5 text-(--diamond-ink,#1a1917) text-[14px]",
                            i.disabled && "pointer-events-none opacity-50",
                        )}
                    >
                        {inner}
                        <span className="flex flex-col">
                            <span>{i.label}</span>
                            {i.description ? <span className="text-(--diamond-muted,#6b6862) text-[11px]">{i.description}</span> : null}
                        </span>
                    </label>
                );
            })}
        </div>
    );
}

export const Checkbox = React.forwardRef<HTMLDivElement | HTMLLabelElement, CheckboxProps>(
    function Checkbox(props, _ref) {
        const v = (props.variant ?? "square") as CheckboxVariant;
        if (isGroupVariant(v) || "items" in props) {
            return <GroupCheckbox {...(props as Parameters<typeof GroupCheckbox>[0])} />;
        }
        return <SingleCheckbox {...(props as Parameters<typeof SingleCheckbox>[0])} />;
    },
);

Checkbox.displayName = "Diamond.Checkbox";

export { boxVariants as checkboxBoxVariants };
