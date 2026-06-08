"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Table — data-driven OR composition (raw <thead>/<tbody>). */

export type TableVariant = "basic" | "invoice" | "zebra" | "log" | "dotted" | "bicolor";

const tableVariants = cva("w-full text-left text-(--diamond-ink,#1a1917) text-[13px]", {
    variants: {
        variant: {
            basic: "[&_td]:border-(--diamond-border,#d9d5cc) [&_td]:border-b [&_td]:px-3 [&_td]:py-2 [&_th]:border-(--diamond-border,#d9d5cc) [&_th]:border-b [&_th]:px-3 [&_th]:py-2 [&_th]:font-semibold [&_th]:text-(--diamond-muted,#6b6862) [&_th]:text-[11px] [&_th]:uppercase [&_th]:tracking-[0.08em]",
            invoice:
                "[&_tbody_tr]:border-(--diamond-border,#d9d5cc) [&_tbody_tr]:border-b [&_td]:px-3 [&_td]:py-2 [&_th]:px-3 [&_th]:py-2 [&_th]:font-semibold [&_th]:text-[11px] [&_thead_th:first-child]:rounded-l [&_thead_th:last-child]:rounded-r [&_thead_tr]:bg-(--diamond-surface-alt,#ebe8e1)",
            zebra: "[&_tbody_tr:nth-child(odd)]:bg-(--diamond-surface-alt,#ebe8e1) [&_td]:px-3 [&_td]:py-2 [&_th]:px-3 [&_th]:py-2 [&_th]:font-semibold [&_th]:text-(--diamond-muted,#6b6862) [&_th]:text-[11px] [&_th]:uppercase [&_th]:tracking-[0.08em]",
            log: "font-mono text-[11px] [&_td]:border-(--diamond-border,#d9d5cc) [&_td]:border-b [&_td]:px-3 [&_td]:py-1.5 [&_th]:border-(--diamond-border,#d9d5cc) [&_th]:border-b [&_th]:px-3 [&_th]:py-1.5 [&_th]:font-semibold [&_th]:text-[10px] [&_th]:uppercase",
            dotted: "[&_td]:border-(--diamond-border,#d9d5cc) [&_td]:border-b [&_td]:px-3 [&_td]:py-2 [&_th]:border-(--diamond-border,#d9d5cc) [&_th]:border-b [&_th]:border-dashed [&_th]:px-3 [&_th]:py-2 [&_th]:font-semibold [&_th]:text-(--diamond-muted,#6b6862) [&_th]:text-[11px] [&_th]:uppercase [&_th]:tracking-[0.08em]",
            bicolor:
                "[&_tbody_tr]:border-(--diamond-border,#d9d5cc) [&_tbody_tr]:border-b [&_td]:px-3 [&_td]:py-2 [&_th]:px-3 [&_th]:py-2 [&_thead_th]:font-semibold [&_thead_th]:text-(--diamond-surface,#fff) [&_thead_th]:text-[11px] [&_thead_th]:uppercase [&_thead_th]:tracking-[0.12em] [&_thead_tr]:bg-(--diamond-ink,#1a1917)",
        },
    },
    defaultVariants: { variant: "basic" },
});

export interface TableColumn<R> {
    key: keyof R | string;
    header: React.ReactNode;
    /** Custom cell renderer. */
    render?: (row: R, i: number) => React.ReactNode;
    /** Per-column horizontal alignment. */
    align?: "left" | "right" | "center";
    /** Optional CSS class for both header & cells. */
    className?: string;
}

export interface TableProps<R extends Record<string, unknown> = Record<string, unknown>>
    extends Omit<React.HTMLAttributes<HTMLTableElement>, "children">,
        VariantProps<typeof tableVariants> {
    /** Column descriptors. */
    columns?: TableColumn<R>[];
    /** Row data. */
    rows?: R[];
    /** Wraps the table in a rounded border container. */
    bordered?: boolean;
    /** Empty-state element when rows is empty. */
    empty?: React.ReactNode;
    /** Accent override. */
    accent?: string;
    /** Composition mode children — when set, ignores columns/rows. */
    children?: React.ReactNode;
}

export const Table = React.forwardRef(function Table<R extends Record<string, unknown> = Record<string, unknown>>(
    { className, variant = "basic", columns, rows, bordered, empty, accent, style, children, ...rest }: TableProps<R>,
    ref: React.Ref<HTMLTableElement>,
) {
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const hasData = !!columns && !!rows;
    const tableEl = (
        <table ref={ref} className={cn(tableVariants({ variant }), className)} style={inlineStyle} {...rest}>
            {hasData ? (
                <>
                    <thead>
                        <tr>
                            {columns!.map((c) => (
                                <th
                                    key={String(c.key)}
                                    className={cn(c.className)}
                                    style={c.align ? { textAlign: c.align } : undefined}
                                >
                                    {c.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows!.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns!.length}
                                    className="py-6 text-center text-(--diamond-muted,#6b6862)"
                                >
                                    {empty ?? "— empty —"}
                                </td>
                            </tr>
                        ) : (
                            rows!.map((row, ri) => (
                                // biome-ignore lint/suspicious/noArrayIndexKey: generic row type has no guaranteed id field; positional key is the only safe option
                                <tr key={ri}>
                                    {columns!.map((c) => (
                                        <td
                                            key={String(c.key)}
                                            className={cn(c.className)}
                                            style={c.align ? { textAlign: c.align } : undefined}
                                        >
                                            {c.render
                                                ? c.render(row, ri)
                                                : ((row as Record<string, unknown>)[
                                                      c.key as string
                                                  ] as React.ReactNode)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </>
            ) : (
                children
            )}
        </table>
    );

    if (bordered) {
        return (
            <div className="overflow-hidden rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff)">
                {tableEl}
            </div>
        );
    }

    return tableEl;
}) as <R extends Record<string, unknown> = Record<string, unknown>>(
    props: TableProps<R> & { ref?: React.Ref<HTMLTableElement> },
) => React.ReactElement;

(Table as { displayName?: string }).displayName = "Diamond.Table";

export { tableVariants };
