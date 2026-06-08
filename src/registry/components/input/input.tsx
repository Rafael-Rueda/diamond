"use client";

import { Eye, EyeSlash, MagnifyingGlass } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Input — single text-field wrapper consolidating Text, Password,
 * Number, Search and masked inputs into one component. Uses a real <input>
 * underneath; visual variants live in `variant`, semantic type in `type`. */

export type InputVariant =
    /* Text          */ | "classic" | "underline" | "filled" | "floating" | "terminal" | "search-pill"
    /* Password      */ | "reveal" | "strength" | "underline-reveal" | "digits" | "terminal-password" | "criteria"
    /* Number        */ | "stepper" | "vertical-stepper" | "slider" | "currency" | "pick-one-to-nine" | "terminal-number"
    /* Search/Mask   */ | "search-cmd" | "search-soft" | "search-floaty" | "search-grep" | "search-scoped"
    /* Masked        */ | "mask";

const inputBase =
    "w-full font-sans text-(--diamond-ink,#1a1917) text-[14px] outline-none transition-[border-color,box-shadow] placeholder:text-(--diamond-muted,#9a968e)";

const inputVariants = cva(inputBase, {
    variants: {
        variant: {
            classic:
                "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-2.5 focus-visible:border-(--diamond-accent,#2b7fff) focus-visible:ring-3 focus-visible:ring-(--diamond-accent,#2b7fff)/20",
            underline:
                "rounded-none border-0 border-b-[1.5px] border-(--diamond-border,#d9d5cc) bg-transparent px-0 py-2 focus-visible:border-(--diamond-accent,#2b7fff)",
            filled:
                "rounded-md border border-transparent bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_8%,white)] px-3.5 py-2.5 focus-visible:bg-(--diamond-surface,#fff) focus-visible:border-(--diamond-accent,#2b7fff)",
            floating: "", /* drawn by wrapper */
            terminal:
                "rounded-sm border border-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_40%,#0a0a08)] bg-[#0a0a08] px-3 py-2.5 font-mono text-(--diamond-accent,#2b7fff) text-[13px] placeholder:text-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_50%,#0a0a08)]",
            "search-pill":
                "rounded-full border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) py-2.5 pr-3.5 pl-10 focus-visible:border-(--diamond-accent,#2b7fff) focus-visible:ring-3 focus-visible:ring-(--diamond-accent,#2b7fff)/20",
            reveal:
                "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) py-2.5 pr-10 pl-3.5 focus-visible:border-(--diamond-accent,#2b7fff)",
            strength:
                "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) py-2.5 pr-10 pl-3.5 focus-visible:border-(--diamond-accent,#2b7fff)",
            "underline-reveal":
                "rounded-none border-0 border-b-[1.5px] border-(--diamond-border,#d9d5cc) bg-transparent py-2 pr-10 pl-0 focus-visible:border-(--diamond-accent,#2b7fff)",
            digits: "", /* drawn by wrapper */
            "terminal-password":
                "rounded-sm border border-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_40%,#0a0a08)] bg-[#0a0a08] py-2.5 pr-10 pl-3 font-mono text-(--diamond-accent,#2b7fff) text-[13px] tracking-[0.4em]",
            criteria:
                "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) py-2.5 pr-10 pl-3.5 focus-visible:border-(--diamond-accent,#2b7fff)",
            stepper: "", /* wrapper */
            "vertical-stepper": "", /* wrapper */
            slider: "", /* wrapper */
            currency: "", /* wrapper */
            "pick-one-to-nine": "", /* wrapper */
            "terminal-number":
                "rounded-sm border border-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_40%,#0a0a08)] bg-[#0a0a08] px-3 py-2.5 font-mono text-(--diamond-accent,#2b7fff) text-[13px]",
            "search-cmd":
                "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) py-2.5 pr-16 pl-10",
            "search-soft":
                "rounded-full border border-transparent bg-(--diamond-surface-alt,#ebe8e1) py-2.5 pr-3.5 pl-10 focus-visible:border-(--diamond-accent,#2b7fff)",
            "search-floaty":
                "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) py-2.5 pr-3.5 pl-10 shadow-[0_4px_16px_rgba(0,0,0,0.06)]",
            "search-grep":
                "rounded-sm border border-[#2d2c28] bg-[#0a0a08] py-2.5 pr-3 pl-10 font-mono text-[#d4d0c8] text-[13px]",
            "search-scoped":
                "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) py-2.5 pr-3.5 pl-[88px]",
            mask: "rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-2.5 font-mono",
        },
        size: {
            sm: "text-[12px]",
            md: "",
            lg: "py-3 text-[15px]",
        },
        invalid: {
            true: "border-rose-500 focus-visible:border-rose-500 focus-visible:ring-rose-500/20",
            false: "",
        },
    },
    defaultVariants: { variant: "classic", size: "md", invalid: false },
});

/* Strength meter helper. */
function passwordStrength(value: string): number {
    let s = 0;
    if (value.length >= 6) s++;
    if (value.length >= 10) s++;
    if (/[A-Z]/.test(value)) s++;
    if (/[0-9]/.test(value)) s++;
    if (/[^A-Za-z0-9]/.test(value)) s++;
    return Math.min(s, 5);
}

const CRITERIA: Array<{ id: string; label: string; test: (v: string) => boolean }> = [
    { id: "len", label: "8+ characters", test: (v) => v.length >= 8 },
    { id: "upper", label: "1 uppercase", test: (v) => /[A-Z]/.test(v) },
    { id: "num", label: "1 number", test: (v) => /[0-9]/.test(v) },
    { id: "sym", label: "1 symbol", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

function applyMask(raw: string, mask: string): string {
    let out = "";
    let i = 0;
    for (const ch of mask) {
        if (i >= raw.length) break;
        if (ch === "#") {
            const c = raw[i++];
            if (/[0-9]/.test(c)) out += c;
            else i--;
        } else if (ch === "A") {
            const c = raw[i++];
            if (/[A-Za-z]/.test(c)) out += c;
            else i--;
        } else {
            out += ch;
            if (raw[i] === ch) i++;
        }
    }
    return out;
}

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "prefix">,
        VariantProps<typeof inputVariants> {
    /** HTML type. Defaults inferred from variant. */
    type?: React.HTMLInputTypeAttribute;
    /** Floating-label / pick-one-to-nine helper / digits helper. */
    label?: React.ReactNode;
    /** Prefix node (icon, currency symbol, …). */
    leading?: React.ReactNode;
    /** Suffix node (kbd hint, unit, …). */
    trailing?: React.ReactNode;
    /** Mask pattern (e.g. "(###) ###-####" or "##/##/####"). Used by `mask` variant. */
    mask?: string;
    /** Currency variant — symbol + unit (e.g. "$" + "USD"). */
    currencySymbol?: string;
    currencyUnit?: string;
    /** Min / max / step — passed to number variants. */
    min?: number;
    max?: number;
    step?: number;
    /** Search-scoped variant — left chip label. */
    scope?: React.ReactNode;
    /** Search-cmd variant — right hint, e.g. "⌘K". */
    cmdHint?: React.ReactNode;
    /** Digits variant — number of cells. */
    digits?: number;
    /** Override the accent color. */
    accent?: string;
    /** Strength variant — control strength externally. */
    strength?: number;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
    const {
        className,
        variant = "classic",
        size,
        invalid,
        type: typeProp,
        label,
        leading,
        trailing,
        mask,
        currencySymbol = "$",
        currencyUnit = "USD",
        min = 0,
        max = 100,
        step = 1,
        scope = "All",
        cmdHint = "⌘K",
        digits = 4,
        accent,
        strength: strengthProp,
        value: valueProp,
        defaultValue,
        onChange,
        style,
        placeholder,
        ...rest
    } = props;

    const v = variant ?? "classic";
    const isPassword = [
        "reveal",
        "strength",
        "underline-reveal",
        "terminal-password",
        "criteria",
        "digits",
    ].includes(v);
    const isNumber = [
        "stepper",
        "vertical-stepper",
        "slider",
        "currency",
        "pick-one-to-nine",
        "terminal-number",
    ].includes(v);
    const isSearch = v.startsWith("search-");
    const inferredType: React.HTMLInputTypeAttribute = isPassword
        ? "password"
        : isNumber
          ? "number"
          : isSearch
            ? "search"
            : "text";
    const inputType = typeProp ?? inferredType;
    const [reveal, setReveal] = React.useState(false);
    const [internal, setInternal] = React.useState(defaultValue ?? "");
    const isControlled = valueProp !== undefined;
    const value = (isControlled ? valueProp : internal) ?? "";

    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const onValue = (next: string) => {
        if (!isControlled) setInternal(next);
        onChange?.({ target: { value: next } } as never);
    };

    /* -- Stepper number variants ----------------------------------------- */
    if (v === "stepper" || v === "vertical-stepper") {
        const numVal = Number(value || min);
        const inc = (delta: number) => {
            const next = Math.max(min, Math.min(max, numVal + delta));
            onValue(String(next));
        };
        if (v === "stepper") {
            return (
                <div
                    className={cn(
                        "inline-flex overflow-hidden rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff)",
                        invalid && "border-rose-500",
                        className,
                    )}
                    style={inlineStyle}
                >
                    <button
                        type="button"
                        onClick={() => inc(-step)}
                        className="w-9 cursor-pointer bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-muted,#6b6862) hover:text-(--diamond-accent,#2b7fff)"
                        aria-label="Decrement"
                    >
                        −
                    </button>
                    <input
                        ref={ref}
                        type="number"
                        value={value as string}
                        onChange={(e) => onValue(e.target.value)}
                        min={min}
                        max={max}
                        step={step}
                        className="w-20 border-0 bg-transparent text-center text-(--diamond-ink,#1a1917) text-[14px] outline-none"
                        {...rest}
                    />
                    <button
                        type="button"
                        onClick={() => inc(step)}
                        className="w-9 cursor-pointer bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-muted,#6b6862) hover:text-(--diamond-accent,#2b7fff)"
                        aria-label="Increment"
                    >
                        +
                    </button>
                </div>
            );
        }
        return (
            <div
                className={cn(
                    "relative inline-flex items-center rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) pr-6",
                    invalid && "border-rose-500",
                    className,
                )}
                style={inlineStyle}
            >
                <input
                    ref={ref}
                    type="number"
                    value={value as string}
                    onChange={(e) => onValue(e.target.value)}
                    min={min}
                    max={max}
                    step={step}
                    className="w-20 border-0 bg-transparent px-3 py-2.5 text-[14px] outline-none"
                    {...rest}
                />
                <div className="absolute inset-y-0 right-0 flex w-5 flex-col border-(--diamond-border,#d9d5cc) border-l">
                    <button
                        type="button"
                        onClick={() => inc(step)}
                        aria-label="Increment"
                        className="flex-1 cursor-pointer text-[9px] text-(--diamond-muted,#6b6862) hover:bg-(--diamond-surface-alt,#ebe8e1) hover:text-(--diamond-accent,#2b7fff)"
                    >
                        ▲
                    </button>
                    <button
                        type="button"
                        onClick={() => inc(-step)}
                        aria-label="Decrement"
                        className="flex-1 cursor-pointer text-[9px] text-(--diamond-muted,#6b6862) hover:bg-(--diamond-surface-alt,#ebe8e1) hover:text-(--diamond-accent,#2b7fff)"
                    >
                        ▼
                    </button>
                </div>
            </div>
        );
    }

    if (v === "slider") {
        const numVal = Number(value || min);
        return (
            <div className={cn("flex w-[280px] items-center gap-3", className)} style={inlineStyle}>
                <input
                    ref={ref}
                    type="range"
                    value={numVal}
                    onChange={(e) => onValue(e.target.value)}
                    min={min}
                    max={max}
                    step={step}
                    className="h-1 flex-1 cursor-pointer appearance-none rounded-sm bg-(--diamond-border,#d9d5cc) accent-(--diamond-accent,#2b7fff)"
                    {...rest}
                />
                <span className="min-w-[60px] rounded-md bg-(--diamond-ink,#1a1917) px-2.5 py-1.5 text-center font-mono text-(--diamond-surface,#fff) text-[13px]">
                    {numVal}
                </span>
            </div>
        );
    }

    if (v === "currency") {
        return (
            <div className={cn("relative w-[200px]", className)} style={inlineStyle}>
                <span className="-translate-y-1/2 absolute top-1/2 left-3.5 font-mono text-(--diamond-muted,#6b6862) text-[14px]">
                    {currencySymbol}
                </span>
                <input
                    ref={ref}
                    type="number"
                    value={value as string}
                    onChange={(e) => onValue(e.target.value)}
                    min={min}
                    step={step}
                    placeholder={placeholder ?? "0.00"}
                    className="w-full rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) py-2.5 pr-14 pl-8 text-[14px] outline-none focus-visible:border-(--diamond-accent,#2b7fff)"
                    {...rest}
                />
                <span className="-translate-y-1/2 absolute top-1/2 right-3.5 font-mono text-[11px] text-(--diamond-muted,#9a968e) uppercase tracking-[0.1em]">
                    {currencyUnit}
                </span>
            </div>
        );
    }

    if (v === "pick-one-to-nine") {
        const numVal = Number(value || 0);
        return (
            <div className={cn("flex gap-1", className)} style={inlineStyle}>
                {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                    <button
                        key={n}
                        type="button"
                        onClick={() => onValue(String(n))}
                        className={cn(
                            "flex size-8 cursor-pointer items-center justify-center rounded-md border font-mono text-[13px] transition-colors",
                            numVal === n
                                ? "border-(--diamond-accent,#2b7fff) bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff)"
                                : "border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) hover:border-(--diamond-accent,#2b7fff) hover:text-(--diamond-accent,#2b7fff)",
                        )}
                    >
                        {n}
                    </button>
                ))}
            </div>
        );
    }

    if (v === "digits") {
        const arr = (value as string).split("").slice(0, digits);
        while (arr.length < digits) arr.push("");
        const refs = React.useRef<HTMLInputElement[]>([]);
        const upd = (i: number, ch: string) => {
            const next = [...arr];
            next[i] = ch.slice(0, 1);
            onValue(next.join(""));
            if (ch && refs.current[i + 1]) refs.current[i + 1]?.focus();
        };
        return (
            <div className={cn("flex gap-1.5", className)} style={inlineStyle}>
                {arr.map((d, i) => (
                    <input
                        // biome-ignore lint/suspicious/noArrayIndexKey: positional inputs
                        key={i}
                        ref={(el) => {
                            if (el) refs.current[i] = el;
                        }}
                        type="password"
                        inputMode="numeric"
                        maxLength={1}
                        value={d}
                        onChange={(e) => upd(i, e.target.value)}
                        className="h-10 w-8 rounded-md border-[1.5px] border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-center font-mono text-[16px] outline-none focus-visible:border-(--diamond-accent,#2b7fff)"
                    />
                ))}
            </div>
        );
    }

    /* -- Floating label --------------------------------------------------- */
    if (v === "floating") {
        const id = React.useId();
        return (
            <div className={cn("relative w-full max-w-[280px]", className)} style={inlineStyle}>
                <input
                    ref={ref}
                    id={id}
                    type={inputType}
                    value={value as string}
                    onChange={(e) => onValue(e.target.value)}
                    placeholder=" "
                    className="peer w-full rounded-md border-[1.5px] border-(--diamond-border,#d9d5cc) bg-transparent px-3.5 pt-4 pb-1.5 text-[14px] outline-none focus-visible:border-(--diamond-accent,#2b7fff)"
                    {...rest}
                />
                <label
                    htmlFor={id}
                    className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 bg-(--diamond-bg,var(--diamond-surface,#fff)) px-1 text-(--diamond-muted,#9a968e) text-[13px] transition-all peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:font-mono peer-not-placeholder-shown:text-(--diamond-accent,#2b7fff) peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-[0.1em] peer-focus:top-0 peer-focus:font-mono peer-focus:text-(--diamond-accent,#2b7fff) peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.1em]"
                >
                    {label ?? placeholder ?? "Label"}
                </label>
            </div>
        );
    }

    /* -- Mask ------------------------------------------------------------- */
    if (v === "mask") {
        const display = mask ? applyMask(String(value), mask) : (value as string);
        return (
            <input
                ref={ref}
                type={inputType}
                value={display}
                onChange={(e) => onValue(mask ? applyMask(e.target.value, mask) : e.target.value)}
                placeholder={placeholder ?? mask?.replace(/[#A]/g, "_")}
                className={cn(inputVariants({ variant: v, size, invalid }), className)}
                style={inlineStyle}
                {...rest}
            />
        );
    }

    /* -- Strength / Criteria --------------------------------------------- */
    if (v === "strength" || v === "criteria") {
        const strength = strengthProp ?? passwordStrength(String(value));
        return (
            <div className={cn("w-full max-w-[280px]", className)} style={inlineStyle}>
                <div className="relative">
                    <input
                        ref={ref}
                        type={reveal ? "text" : inputType}
                        value={value as string}
                        onChange={(e) => onValue(e.target.value)}
                        placeholder={placeholder ?? "Password"}
                        className={inputVariants({ variant: v, size, invalid })}
                        {...rest}
                    />
                    <button
                        type="button"
                        onClick={() => setReveal((p) => !p)}
                        aria-label={reveal ? "Hide password" : "Show password"}
                        className="-translate-y-1/2 absolute top-1/2 right-2.5 inline-flex size-7 cursor-pointer items-center justify-center text-(--diamond-muted,#6b6862) hover:text-(--diamond-ink,#1a1917)"
                    >
                        {reveal ? <EyeSlash size={16} /> : <Eye size={16} />}
                    </button>
                </div>

                {v === "strength" ? (
                    <div className="mt-2 flex gap-1">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <span
                                key={i}
                                className={cn(
                                    "h-[3px] flex-1 rounded-sm transition-colors",
                                    i < strength ? "bg-(--diamond-accent,#2b7fff)" : "bg-(--diamond-border,#d9d5cc)",
                                )}
                            />
                        ))}
                    </div>
                ) : null}

                {v === "criteria" ? (
                    <ul className="mt-2 grid gap-1 text-[11px]">
                        {CRITERIA.map((c) => {
                            const ok = c.test(String(value));
                            return (
                                <li
                                    key={c.id}
                                    className={cn(
                                        "flex items-center gap-1.5",
                                        ok ? "text-emerald-600" : "text-(--diamond-muted,#9a968e)",
                                    )}
                                >
                                    <span aria-hidden="true">{ok ? "✓" : "○"}</span>
                                    {c.label}
                                </li>
                            );
                        })}
                    </ul>
                ) : null}
            </div>
        );
    }

    /* -- Reveal (basic password with toggle) ------------------------------ */
    if (v === "reveal" || v === "underline-reveal" || v === "terminal-password") {
        return (
            <div className={cn("relative w-full max-w-[280px]", className)} style={inlineStyle}>
                <input
                    ref={ref}
                    type={reveal ? "text" : inputType}
                    value={value as string}
                    onChange={(e) => onValue(e.target.value)}
                    placeholder={placeholder ?? "••••••••"}
                    className={inputVariants({ variant: v, size, invalid })}
                    {...rest}
                />
                <button
                    type="button"
                    onClick={() => setReveal((p) => !p)}
                    aria-label={reveal ? "Hide password" : "Show password"}
                    className={cn(
                        "-translate-y-1/2 absolute top-1/2 right-2.5 inline-flex size-7 cursor-pointer items-center justify-center",
                        v === "terminal-password"
                            ? "text-(--diamond-accent,#2b7fff)"
                            : "text-(--diamond-muted,#6b6862) hover:text-(--diamond-ink,#1a1917)",
                    )}
                >
                    {reveal ? <EyeSlash size={16} /> : <Eye size={16} />}
                </button>
            </div>
        );
    }

    /* -- Search variants -------------------------------------------------- */
    if (isSearch || v === "search-pill") {
        return (
            <div className={cn("relative w-full max-w-[300px]", className)} style={inlineStyle}>
                {v === "search-scoped" ? (
                    <span className="-translate-y-1/2 absolute top-1/2 left-1.5 inline-flex h-6 items-center rounded bg-(--diamond-surface-alt,#ebe8e1) px-2 font-mono text-[10px] text-(--diamond-muted,#6b6862) uppercase tracking-[0.1em]">
                        {scope}
                    </span>
                ) : (
                    <span
                        className={cn(
                            "-translate-y-1/2 absolute top-1/2 left-3.5",
                            v === "search-grep" ? "text-(--diamond-accent,#2b7fff)" : "text-(--diamond-muted,#9a968e)",
                        )}
                    >
                        {leading ?? <MagnifyingGlass size={16} />}
                    </span>
                )}
                <input
                    ref={ref}
                    type={inputType}
                    value={value as string}
                    onChange={(e) => onValue(e.target.value)}
                    placeholder={placeholder ?? (v === "search-grep" ? "grep -r 'pattern'" : "Search…")}
                    className={inputVariants({ variant: v, size, invalid })}
                    {...rest}
                />
                {v === "search-cmd" ? (
                    <kbd className="-translate-y-1/2 absolute top-1/2 right-3 inline-flex h-5 items-center rounded border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface-alt,#ebe8e1) px-1.5 font-mono text-[10px] text-(--diamond-muted,#6b6862)">
                        {cmdHint}
                    </kbd>
                ) : trailing ? (
                    <span className="-translate-y-1/2 absolute top-1/2 right-3.5">{trailing}</span>
                ) : null}
            </div>
        );
    }

    /* -- Classic / Underline / Filled / Terminal ------------------------- */
    const hasLeading = !!leading;
    const hasTrailing = !!trailing;
    if (hasLeading || hasTrailing) {
        return (
            <div className={cn("relative w-full max-w-[280px]", className)} style={inlineStyle}>
                {hasLeading ? (
                    <span className="-translate-y-1/2 absolute top-1/2 left-3.5 text-(--diamond-muted,#9a968e)">{leading}</span>
                ) : null}
                <input
                    ref={ref}
                    type={inputType}
                    value={value as string}
                    onChange={(e) => onValue(e.target.value)}
                    placeholder={placeholder}
                    className={cn(inputVariants({ variant: v, size, invalid }), hasLeading && "pl-10", hasTrailing && "pr-10")}
                    {...rest}
                />
                {hasTrailing ? (
                    <span className="-translate-y-1/2 absolute top-1/2 right-3.5 text-(--diamond-muted,#9a968e)">{trailing}</span>
                ) : null}
            </div>
        );
    }
    return (
        <input
            ref={ref}
            type={inputType}
            value={value as string}
            onChange={(e) => onValue(e.target.value)}
            placeholder={placeholder}
            className={cn(inputVariants({ variant: v, size, invalid }), "max-w-[280px]", className)}
            style={inlineStyle}
            {...rest}
        />
    );
});

Input.displayName = "Diamond.Input";

export { inputVariants };
