"use client";

import { CaretDown, CaretRight } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · DataGrid — table + toolbar + pagination + optional inline bars. */

export type DataGridVariant = "toolbar" | "filter" | "terminal" | "bulk" | "grouped" | "barchart";

const gridVariants = cva(
    "flex min-w-[280px] flex-col gap-0 overflow-hidden rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) text-[13px]",
    {
        variants: {
            variant: {
                toolbar: "",
                filter: "",
                terminal: "font-mono text-[11px]",
                bulk: "",
                grouped: "",
                barchart: "",
            },
        },
        defaultVariants: { variant: "toolbar" },
    },
);

export interface DataGridColumn<R> {
    key: keyof R | string;
    header: React.ReactNode;
    render?: (row: R, i: number) => React.ReactNode;
    align?: "left" | "right" | "center";
    /** Render row value as a horizontal bar (use with `barValue` returning 0..100). */
    bar?: (row: R) => number | undefined;
    className?: string;
}

export interface DataGridGroup<R> {
    label: React.ReactNode;
    rows: R[];
    collapsed?: boolean;
}

export interface DataGridProps<R extends Record<string, unknown> = Record<string, unknown>>
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
        VariantProps<typeof gridVariants> {
    columns: DataGridColumn<R>[];
    /** Flat row list (for non-grouped variants). */
    rows?: R[];
    /** Grouped rows (for `grouped` variant). */
    groups?: DataGridGroup<R>[];
    /** Toolbar slot — replaces default toolbar. */
    toolbar?: React.ReactNode;
    /** Pagination slot. */
    pagination?: React.ReactNode;
    /** Selection: ids of selected rows. */
    selectedIds?: Set<string | number>;
    /** Row id getter (for selection). */
    rowId?: (row: R, i: number) => string | number;
    /** Selection change handler. */
    onSelectionChange?: (ids: Set<string | number>) => void;
    /** Accent override. */
    accent?: string;
}

export function DataGrid<R extends Record<string, unknown> = Record<string, unknown>>({
    className,
    variant = "toolbar",
    columns,
    rows = [],
    groups,
    toolbar,
    pagination,
    selectedIds,
    rowId,
    onSelectionChange,
    accent,
    style,
    ...rest
}: DataGridProps<R>) {
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const renderRow = (row: R, ri: number, key: React.Key) => {
        const id = rowId ? rowId(row, ri) : ri;
        const checked = selectedIds?.has(id) ?? false;
        return (
            <tr
                key={key}
                className={cn(
                    "border-(--diamond-border,#d9d5cc) border-b last:border-b-0",
                    checked && "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_8%,var(--diamond-surface,#fff))]",
                )}
            >
                {selectedIds && (
                    <td className="w-8 px-3 py-2">
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                                if (!onSelectionChange) return;
                                const next = new Set(selectedIds);
                                if (e.target.checked) next.add(id);
                                else next.delete(id);
                                onSelectionChange(next);
                            }}
                            className="cursor-pointer accent-(--diamond-accent,#2b7fff)"
                        />
                    </td>
                )}
                {columns.map((c) => {
                    const value = c.render
                        ? c.render(row, ri)
                        : ((row as Record<string, unknown>)[c.key as string] as React.ReactNode);
                    const bar = c.bar?.(row);
                    return (
                        <td
                            key={String(c.key)}
                            className={cn("relative px-3 py-2", c.className)}
                            style={c.align ? { textAlign: c.align } : undefined}
                        >
                            {bar !== undefined && (
                                <div
                                    className="absolute inset-y-1 left-2 -z-0 rounded-sm bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_22%,var(--diamond-surface,#fff))]"
                                    style={{ width: `${Math.max(0, Math.min(100, bar))}%` }}
                                />
                            )}
                            <span className="relative">{value}</span>
                        </td>
                    );
                })}
            </tr>
        );
    };

    return (
        <div ref={undefined} className={cn(gridVariants({ variant }), className)} style={inlineStyle} {...rest}>
            {toolbar !== undefined
                ? toolbar && (
                      <div
                          className={cn(
                              "flex items-center gap-2 border-(--diamond-border,#d9d5cc) border-b px-3 py-2",
                              variant === "terminal" && "bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#fff)",
                          )}
                      >
                          {toolbar}
                      </div>
                  )
                : null}

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-(--diamond-border,#d9d5cc) border-b">
                            {selectedIds && <th className="w-8 px-3 py-2" />}
                            {columns.map((c) => (
                                <th
                                    key={String(c.key)}
                                    className={cn(
                                        "px-3 py-2 font-semibold text-(--diamond-muted,#6b6862) text-[11px] uppercase tracking-[0.08em]",
                                        c.className,
                                    )}
                                    style={c.align ? { textAlign: c.align } : undefined}
                                >
                                    {c.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {groups
                            ? groups.map((g, gi) => (
                                  // biome-ignore lint/suspicious/noArrayIndexKey: groups are positional; DataGridGroup.label is ReactNode and not reliably stringifiable
                                  <React.Fragment key={gi}>
                                      <tr>
                                          <th
                                              colSpan={columns.length + (selectedIds ? 1 : 0)}
                                              className="bg-(--diamond-surface-alt,#ebe8e1) px-3 py-1.5 text-left font-semibold text-(--diamond-muted,#6b6862) text-[10px] uppercase tracking-[0.08em]"
                                          >
                                              <span className="inline-flex items-center gap-1.5">
                                                  {g.collapsed ? (
                                                      <CaretRight weight="fill" size={9} />
                                                  ) : (
                                                      <CaretDown weight="fill" size={9} />
                                                  )}
                                                  {g.label} ({g.rows.length})
                                              </span>
                                          </th>
                                      </tr>
                                      {!g.collapsed && g.rows.map((r, ri) => renderRow(r, ri, `${gi}-${ri}`))}
                                  </React.Fragment>
                              ))
                            : rows.map((r, ri) => renderRow(r, ri, ri))}
                    </tbody>
                </table>
            </div>

            {pagination && (
                <div className="flex items-center justify-between border-(--diamond-border,#d9d5cc) border-t px-3 py-2 text-(--diamond-muted,#6b6862) text-[11px]">
                    {pagination}
                </div>
            )}
        </div>
    );
}

(DataGrid as { displayName?: string }).displayName = "Diamond.DataGrid";

export { gridVariants as dataGridVariants };
