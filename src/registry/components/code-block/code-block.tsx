"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · CodeBlock — formatted code with optional filename, line numbers, copy. */

export type CodeBlockVariant = "dark" | "terminal" | "numbered" | "diff" | "output" | "quote";

const codeBlockVariants = cva("overflow-hidden rounded-md border text-[12px] leading-relaxed", {
    variants: {
        variant: {
            dark: "border-[#2d2c28] bg-[#0f0f0e] font-mono text-[#d4d0c8]",
            terminal:
                "border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) font-mono text-(--diamond-ink,#1a1917)",
            numbered: "border-[#2d2c28] bg-[#0f0f0e] font-mono text-[#d4d0c8]",
            diff: "border-[#2d2c28] bg-[#0f0f0e] font-mono text-[#d4d0c8]",
            output: "border-[#2d2c28] bg-[#0f0f0e] font-mono text-[#d4d0c8]",
            quote: "border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) text-[14px] italic [font-family:Fraunces,Georgia,serif]",
        },
    },
    defaultVariants: { variant: "dark" },
});

export interface DiffLine {
    kind: "add" | "remove" | "context";
    content: React.ReactNode;
}

export interface CodeBlockProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
        VariantProps<typeof codeBlockVariants> {
    /** Filename or terminal label (header). */
    filename?: React.ReactNode;
    /** Right-side header content (size, language, hint). */
    meta?: React.ReactNode;
    /** Plain-text code (single string). */
    code?: string;
    /** Custom rendered content (highlighted JSX, etc). Wins over `code`. */
    children?: React.ReactNode;
    /** Show copy button in header. */
    copyable?: boolean;
    /** Diff lines for `diff` variant. */
    diff?: DiffLine[];
    /** Author / attribution for `quote` variant. */
    attribution?: React.ReactNode;
    accent?: string;
    /** Click handler for the copy button. Defaults to navigator.clipboard. */
    onCopy?: () => void;
}

export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(function CodeBlock(
    {
        className,
        variant = "dark",
        filename,
        meta,
        code,
        children,
        copyable,
        diff,
        attribution,
        accent,
        onCopy,
        style,
        ...rest
    },
    ref,
) {
    const [copied, setCopied] = React.useState(false);
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const handleCopy = () => {
        if (onCopy) {
            onCopy();
        } else if (code && typeof navigator !== "undefined") {
            navigator.clipboard?.writeText(code);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const headerCls =
        variant === "terminal" || variant === "quote"
            ? "bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-muted,#6b6862) border-(--diamond-border,#d9d5cc)"
            : "bg-[#1a1817] text-[#9b9892] border-[#2d2c28]";

    const showHeader = filename || meta || copyable;

    return (
        <div ref={ref} className={cn(codeBlockVariants({ variant }), className)} style={inlineStyle} {...rest}>
            {showHeader && (
                <div
                    className={cn(
                        "flex items-center justify-between border-b px-3 py-2 font-mono text-[11px] uppercase tracking-[0.06em]",
                        headerCls,
                    )}
                >
                    <span>{filename}</span>
                    <span className="flex items-center gap-3">
                        {meta}
                        {copyable && (
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="inline-flex cursor-pointer items-center gap-1 transition-colors hover:text-(--diamond-accent,#2b7fff)"
                            >
                                {copied ? (
                                    <>
                                        <Check weight="bold" size={11} />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy weight="bold" size={11} />
                                        Copy
                                    </>
                                )}
                            </button>
                        )}
                    </span>
                </div>
            )}
            <div className={cn("overflow-x-auto whitespace-pre", variant === "quote" ? "p-4" : "p-3")}>
                {variant === "numbered" && code
                    ? code.split("\n").map((line, i) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: code lines are positional and may repeat content (e.g. blank lines, closing braces)
                          <div key={i}>
                              <span className="mr-3 inline-block w-6 select-none text-right text-[#6b6862]">
                                  {String(i + 1).padStart(2, "0")}
                              </span>
                              {line}
                          </div>
                      ))
                    : variant === "diff" && diff
                      ? diff.map((d, i) => (
                            <div
                                // biome-ignore lint/suspicious/noArrayIndexKey: diff lines are positional; content may repeat across hunks
                                key={i}
                                className={cn(
                                    "-mx-3 px-3",
                                    d.kind === "add" && "bg-emerald-500/15",
                                    d.kind === "remove" && "bg-rose-500/15",
                                )}
                            >
                                <span
                                    className={cn(
                                        "mr-2 inline-block w-3 select-none",
                                        d.kind === "add" && "text-emerald-500",
                                        d.kind === "remove" && "text-rose-500",
                                    )}
                                >
                                    {d.kind === "add" ? "+" : d.kind === "remove" ? "-" : " "}
                                </span>
                                {d.content}
                            </div>
                        ))
                      : (children ?? code)}
            </div>
            {variant === "quote" && attribution && (
                <div className="px-4 pb-3 text-(--diamond-muted,#6b6862) text-[10px] uppercase not-italic tracking-[0.16em] [font-family:Inter,sans-serif]">
                    — {attribution}
                </div>
            )}
        </div>
    );
});

CodeBlock.displayName = "Diamond.CodeBlock";

export { codeBlockVariants };
