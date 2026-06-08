"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Radio — single radio button **and** radio group in one. Single
 * controls share a `name`; group variants own their `name`. Wraps the real
 * <input type="radio">. */

export type RadioVariant =
    /* Single */ | "dot" | "square" | "bullseye" | "card" | "segmented" | "size-pill"
    /* Group  */ | "vertical" | "plan-cards" | "segmented-bar" | "icon-grid" | "scale" | "stacked-list";

const isGroupVariant = (v: RadioVariant) =>
    v === "vertical" ||
    v === "plan-cards" ||
    v === "segmented-bar" ||
    v === "icon-grid" ||
    v === "scale" ||
    v === "stacked-list";

const dotVariants = cva(
    "relative flex size-4.5 shrink-0 items-center justify-center border-[1.5px] border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) transition-colors",
    {
        variants: {
            variant: {
                dot: "rounded-full peer-checked:border-(--diamond-accent,#2b7fff)",
                square: "rounded peer-checked:border-(--diamond-accent,#2b7fff)",
                bullseye:
                    "size-5 rounded-full peer-checked:border-(--diamond-accent,#2b7fff) peer-checked:shadow-[inset_0_0_0_3px_var(--diamond-surface,#fff),0_0_0_1.5px_var(--diamond-accent,#2b7fff)]",
                card: "rounded-full peer-checked:border-(--diamond-accent,#2b7fff)",
                segmented: "",
                "size-pill": "",
                vertical: "",
                "plan-cards": "",
                "segmented-bar": "",
                "icon-grid": "",
                scale: "",
                "stacked-list": "",
            },
        },
        defaultVariants: { variant: "dot" },
    },
);

export interface RadioItem {
    id: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    trailing?: React.ReactNode;
    /** Icon-grid variant — emoji / glyph / SVG. */
    icon?: React.ReactNode;
    disabled?: boolean;
}

type SingleProps = {
    label?: React.ReactNode;
    children?: React.ReactNode;
    items?: never;
    value?: never;
    onValueChange?: never;
};
type GroupProps = {
    items: RadioItem[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (id: string) => void;
    label?: never;
    children?: never;
};

export type RadioProps =
    & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">
    & VariantProps<typeof dotVariants>
    & (SingleProps | GroupProps)
    & {
        accent?: string;
        checked?: boolean;
        defaultChecked?: boolean;
        onChange?: React.ChangeEventHandler<HTMLInputElement>;
        disabled?: boolean;
        name?: string;
    };

/* ---- Single ---- */

function SingleRadio({
    variant = "dot",
    label,
    children,
    accent,
    checked,
    defaultChecked,
    onChange,
    disabled,
    name,
    className,
    style,
    ...rest
}: Omit<RadioProps, "items">) {
    const v = variant as RadioVariant;
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const inner = (
        <>
            <input
                type="radio"
                checked={checked}
                defaultChecked={defaultChecked}
                onChange={onChange}
                disabled={disabled}
                name={name}
                className="peer sr-only"
            />
            {v === "segmented" || v === "size-pill" ? null : (
                <span className={cn(dotVariants({ variant: v }), "cursor-pointer")}>
                    <span
                        aria-hidden="true"
                        className={cn(
                            "size-2 rounded-full bg-(--diamond-accent,#2b7fff) opacity-0 transition-opacity peer-checked:opacity-100",
                            v === "square" && "rounded-sm",
                        )}
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
                    "inline-flex min-w-[180px] cursor-pointer select-none items-center gap-3 rounded-md border-[1.5px] border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-3 text-[14px] transition-colors has-[input:checked]:border-(--diamond-accent,#2b7fff) has-[input:checked]:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_6%,white)]",
                    disabled && "pointer-events-none opacity-50",
                    className,
                )}
                style={inlineStyle}
                {...(rest as React.LabelHTMLAttributes<HTMLLabelElement>)}
            >
                {inner}
            </label>
        );
    }
    if (v === "segmented" || v === "size-pill") {
        return (
            <label
                className={cn(
                    "inline-flex cursor-pointer select-none items-center gap-2 rounded-full px-4 py-2 font-medium text-[13px] transition-colors",
                    v === "size-pill"
                        ? "border-[1.5px] border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) has-[input:checked]:border-(--diamond-accent,#2b7fff) has-[input:checked]:bg-(--diamond-accent,#2b7fff) has-[input:checked]:text-(--diamond-on-accent,#fff)"
                        : "bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-muted,#6b6862) has-[input:checked]:bg-(--diamond-surface,#fff) has-[input:checked]:text-(--diamond-accent,#2b7fff) has-[input:checked]:shadow-sm",
                    disabled && "pointer-events-none opacity-50",
                    className,
                )}
                style={inlineStyle}
                {...(rest as React.LabelHTMLAttributes<HTMLLabelElement>)}
            >
                {inner}
            </label>
        );
    }
    return (
        <label
            className={cn(
                "inline-flex cursor-pointer select-none items-center gap-2.5 text-[14px]",
                disabled && "pointer-events-none opacity-50",
                className,
            )}
            style={inlineStyle}
            {...(rest as React.LabelHTMLAttributes<HTMLLabelElement>)}
        >
            {inner}
        </label>
    );
}

/* ---- Group ---- */

function GroupRadio({
    variant = "vertical",
    items,
    value: valueProp,
    defaultValue,
    onValueChange,
    accent,
    name,
    className,
    style,
    ...rest
}: Omit<RadioProps, "label" | "children">) {
    const v = variant as RadioVariant;
    const generatedName = React.useId();
    const groupName = name ?? generatedName;
    const [internal, setInternal] = React.useState<string | undefined>(defaultValue);
    const isControlled = valueProp !== undefined;
    const selected = isControlled ? valueProp : internal;
    const select = (id: string) => {
        if (!isControlled) setInternal(id);
        onValueChange?.(id);
    };

    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    if (v === "segmented-bar") {
        return (
            <div
                role="radiogroup"
                className={cn("inline-flex rounded-full bg-(--diamond-surface-alt,#ebe8e1) p-0.5", className)}
                style={inlineStyle}
                {...(rest as React.HTMLAttributes<HTMLDivElement>)}
            >
                {(items ?? []).map((i) => {
                    const on = selected === i.id;
                    return (
                        <label
                            key={i.id}
                            className={cn(
                                "cursor-pointer rounded-full px-4 py-1.5 text-center font-medium text-[13px] transition-colors",
                                on
                                    ? "bg-(--diamond-surface,#fff) text-(--diamond-accent,#2b7fff) shadow-sm"
                                    : "text-(--diamond-muted,#6b6862) hover:text-(--diamond-ink,#1a1917)",
                                i.disabled && "pointer-events-none opacity-50",
                            )}
                        >
                            <input
                                type="radio"
                                name={groupName}
                                checked={on}
                                onChange={() => select(i.id)}
                                disabled={i.disabled}
                                className="sr-only"
                            />
                            {i.label}
                        </label>
                    );
                })}
            </div>
        );
    }

    if (v === "scale") {
        return (
            <div
                role="radiogroup"
                className={cn("inline-flex gap-1", className)}
                style={inlineStyle}
                {...(rest as React.HTMLAttributes<HTMLDivElement>)}
            >
                {(items ?? []).map((i) => {
                    const on = selected === i.id;
                    return (
                        <button
                            key={i.id}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            disabled={i.disabled}
                            onClick={() => select(i.id)}
                            className={cn(
                                "inline-flex size-9 cursor-pointer items-center justify-center rounded-md border font-mono text-[13px] transition-colors",
                                on
                                    ? "border-(--diamond-ink,#1a1917) bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#fff)"
                                    : "border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-muted,#6b6862) hover:border-(--diamond-accent,#2b7fff)",
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

    if (v === "icon-grid") {
        return (
            <div
                role="radiogroup"
                className={cn("grid grid-cols-3 gap-1.5", className)}
                style={inlineStyle}
                {...(rest as React.HTMLAttributes<HTMLDivElement>)}
            >
                {(items ?? []).map((i) => {
                    const on = selected === i.id;
                    return (
                        <label
                            key={i.id}
                            className={cn(
                                "flex aspect-square cursor-pointer items-center justify-center rounded-md border-[1.5px] bg-(--diamond-surface,#fff) text-2xl transition-colors",
                                on
                                    ? "border-(--diamond-accent,#2b7fff) bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_8%,white)]"
                                    : "border-(--diamond-border,#d9d5cc) hover:border-(--diamond-accent,#2b7fff)",
                                i.disabled && "pointer-events-none opacity-50",
                            )}
                        >
                            <input
                                type="radio"
                                name={groupName}
                                checked={on}
                                onChange={() => select(i.id)}
                                disabled={i.disabled}
                                className="sr-only"
                            />
                            {i.icon ?? i.label}
                        </label>
                    );
                })}
            </div>
        );
    }

    if (v === "plan-cards") {
        return (
            <div
                role="radiogroup"
                className={cn("flex min-w-[220px] flex-col gap-2", className)}
                style={inlineStyle}
                {...(rest as React.HTMLAttributes<HTMLDivElement>)}
            >
                {(items ?? []).map((i) => {
                    const on = selected === i.id;
                    return (
                        <label
                            key={i.id}
                            className={cn(
                                "flex cursor-pointer items-center gap-3 rounded-md border-[1.5px] bg-(--diamond-surface,#fff) px-3.5 py-3 text-[14px] transition-colors",
                                on
                                    ? "border-(--diamond-accent,#2b7fff) bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_6%,white)]"
                                    : "border-(--diamond-border,#d9d5cc) hover:border-(--diamond-accent,#2b7fff)",
                                i.disabled && "pointer-events-none opacity-50",
                            )}
                        >
                            <input
                                type="radio"
                                name={groupName}
                                checked={on}
                                onChange={() => select(i.id)}
                                disabled={i.disabled}
                                className="peer sr-only"
                            />
                            <span className={cn(dotVariants({ variant: "dot" }), "cursor-pointer")}>
                                <span
                                    aria-hidden="true"
                                    className="size-2 rounded-full bg-(--diamond-accent,#2b7fff) opacity-0 peer-checked:opacity-100"
                                />
                            </span>
                            <span className="flex flex-1 flex-col">
                                <span className="font-semibold">{i.label}</span>
                                {i.description ? <span className="text-(--diamond-muted,#6b6862) text-[11px]">{i.description}</span> : null}
                            </span>
                            {i.trailing ? <span className="font-mono text-[13px]">{i.trailing}</span> : null}
                        </label>
                    );
                })}
            </div>
        );
    }

    if (v === "stacked-list") {
        return (
            <ul
                role="radiogroup"
                className={cn(
                    "m-0 min-w-[220px] list-none divide-y divide-(--diamond-border,#d9d5cc) rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-0",
                    className,
                )}
                style={inlineStyle}
                {...(rest as React.HTMLAttributes<HTMLUListElement>)}
            >
                {(items ?? []).map((i) => {
                    const on = selected === i.id;
                    return (
                        <li key={i.id}>
                            <label className="flex cursor-pointer items-center justify-between gap-2.5 px-3.5 py-2.5 text-[14px]">
                                <span>{i.label}</span>
                                <span className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name={groupName}
                                        checked={on}
                                        onChange={() => select(i.id)}
                                        disabled={i.disabled}
                                        className="peer sr-only"
                                    />
                                    <span className={cn(dotVariants({ variant: "dot" }), "cursor-pointer")}>
                                        <span
                                            aria-hidden="true"
                                            className="size-2 rounded-full bg-(--diamond-accent,#2b7fff) opacity-0 peer-checked:opacity-100"
                                        />
                                    </span>
                                </span>
                            </label>
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <div
            role="radiogroup"
            className={cn("flex flex-col gap-2.5", className)}
            style={inlineStyle}
            {...(rest as React.HTMLAttributes<HTMLDivElement>)}
        >
            {(items ?? []).map((i) => (
                <label
                    key={i.id}
                    className={cn(
                        "inline-flex cursor-pointer items-center gap-2.5 text-[14px]",
                        i.disabled && "pointer-events-none opacity-50",
                    )}
                >
                    <input
                        type="radio"
                        name={groupName}
                        checked={selected === i.id}
                        onChange={() => select(i.id)}
                        disabled={i.disabled}
                        className="peer sr-only"
                    />
                    <span className={cn(dotVariants({ variant: "dot" }), "cursor-pointer")}>
                        <span
                            aria-hidden="true"
                            className="size-2 rounded-full bg-(--diamond-accent,#2b7fff) opacity-0 peer-checked:opacity-100"
                        />
                    </span>
                    <span>{i.label}</span>
                </label>
            ))}
        </div>
    );
}

export const Radio = React.forwardRef<HTMLDivElement | HTMLLabelElement, RadioProps>(function Radio(
    props,
    _ref,
) {
    const v = (props.variant ?? "dot") as RadioVariant;
    if (isGroupVariant(v) || "items" in props) {
        return <GroupRadio {...(props as Parameters<typeof GroupRadio>[0])} />;
    }
    return <SingleRadio {...(props as Parameters<typeof SingleRadio>[0])} />;
});

Radio.displayName = "Diamond.Radio";

export { dotVariants as radioDotVariants };
