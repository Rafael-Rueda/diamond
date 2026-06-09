"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond TransferList
 * Dual-list mover for assigning people, permissions or records. It manages
 * list state by default, while controlled props and move callbacks let apps
 * own the data flow when needed. */

export type TransferListVariant = "classic" | "drag" | "approval" | "avatars" | "filter" | "scopes-dark";

const transferVariants = cva(
    "grid w-full min-w-0 max-w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-2 rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-3 text-(--diamond-ink,#1a1917)",
    {
        variants: {
            variant: {
                classic: "",
                drag: "",
                approval: "",
                avatars: "",
                filter: "",
                "scopes-dark": "border-[#2d2c28] bg-[#0f0f0e] text-[#d4d0c8]",
            },
        },
        defaultVariants: { variant: "classic" },
    },
);

export interface TransferListItem {
    id: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    avatar?: React.ReactNode;
    status?: React.ReactNode;
    disabled?: boolean;
}

export interface TransferListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">, VariantProps<typeof transferVariants> {
    available?: TransferListItem[];
    selected?: TransferListItem[];
    availableTitle?: React.ReactNode;
    selectedTitle?: React.ReactNode;
    onMove?: (item: TransferListItem, direction: "to-selected" | "to-available") => void;
    accent?: string;
}

const AVAILABLE: TransferListItem[] = [
    { id: "design", label: "Design system", description: "Tokens and components", avatar: "DS" },
    { id: "billing", label: "Billing", description: "Invoices and seats", avatar: "BI" },
    { id: "deploys", label: "Deploys", description: "Production releases", avatar: "DP" },
];

const SELECTED: TransferListItem[] = [
    { id: "reports", label: "Reports", description: "Monthly exports", avatar: "RP", status: "Ready" },
    { id: "members", label: "Members", description: "Team directory", avatar: "MB", status: "Live" },
];

export const TransferList = React.forwardRef<HTMLDivElement, TransferListProps>(function TransferList(
    {
        className,
        variant = "classic",
        available: availableProp,
        selected: selectedProp,
        availableTitle,
        selectedTitle,
        onMove,
        accent,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "classic";
    const [filter, setFilter] = React.useState("");
    const [internalAvailable, setInternalAvailable] = React.useState(availableProp ?? AVAILABLE);
    const [internalSelected, setInternalSelected] = React.useState(selectedProp ?? SELECTED);
    const [activeAvailableId, setActiveAvailableId] = React.useState<string | null>(null);
    const [activeSelectedId, setActiveSelectedId] = React.useState<string | null>(null);
    const dragItem = React.useRef<{ item: TransferListItem; direction: "to-selected" | "to-available" } | null>(null);
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;
    const dark = v === "scopes-dark";
    const available = availableProp ?? internalAvailable;
    const selected = selectedProp ?? internalSelected;
    const left = filter
        ? available.filter((item) => String(item.label).toLowerCase().includes(filter.toLowerCase()))
        : available;

    const move = (item: TransferListItem | undefined, direction: "to-selected" | "to-available") => {
        if (!item || item.disabled) return;

        if (direction === "to-selected") {
            if (availableProp === undefined) {
                setInternalAvailable((items) => items.filter((current) => current.id !== item.id));
            }
            if (selectedProp === undefined) {
                setInternalSelected((items) => (items.some((current) => current.id === item.id) ? items : [...items, item]));
            }
            setActiveAvailableId(null);
            setActiveSelectedId(item.id);
        } else {
            if (selectedProp === undefined) {
                setInternalSelected((items) => items.filter((current) => current.id !== item.id));
            }
            if (availableProp === undefined) {
                setInternalAvailable((items) => (items.some((current) => current.id === item.id) ? items : [...items, item]));
            }
            setActiveSelectedId(null);
            setActiveAvailableId(item.id);
        }

        onMove?.(item, direction);
    };

    const moveActive = (direction: "to-selected" | "to-available") => {
        const source = direction === "to-selected" ? left : selected;
        const activeId = direction === "to-selected" ? activeAvailableId : activeSelectedId;
        move(source.find((item) => item.id === activeId) ?? source.find((item) => !item.disabled), direction);
    };

    const onDrop = (direction: "to-selected" | "to-available") => {
        if (!dragItem.current || dragItem.current.direction !== direction) return;
        move(dragItem.current.item, direction);
        dragItem.current = null;
    };

    return (
        <div ref={ref} className={cn(transferVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
            <TransferColumn
                title={availableTitle ?? (v === "approval" ? "Pending" : v === "scopes-dark" ? "Available scopes" : "Available")}
                items={left}
                variant={v}
                dark={dark}
                filter={v === "filter" ? filter : undefined}
                onFilterChange={v === "filter" ? setFilter : undefined}
                activeId={activeAvailableId}
                onActivate={setActiveAvailableId}
                onMove={(item) => move(item, "to-selected")}
                onDragStart={(item) => {
                    dragItem.current = { item, direction: "to-selected" };
                }}
                onDrop={v === "drag" ? () => onDrop("to-available") : undefined}
            />
            <div className="flex flex-col items-center justify-center gap-2">
                <button
                    type="button"
                    onClick={() => moveActive("to-selected")}
                    disabled={!left.some((item) => !item.disabled)}
                    className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-(--diamond-accent,#2b7fff) font-bold text-(--diamond-on-accent,#fff) disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Move selected right"
                >
                    &gt;
                </button>
                <button
                    type="button"
                    onClick={() => moveActive("to-available")}
                    disabled={!selected.some((item) => !item.disabled)}
                    className={cn(
                        "inline-flex size-9 cursor-pointer items-center justify-center rounded-full border font-bold disabled:cursor-not-allowed disabled:opacity-40",
                        dark
                            ? "border-[#2d2c28] text-[#8a867d] hover:text-[#d4d0c8]"
                            : "border-(--diamond-border,#d9d5cc) text-(--diamond-muted,#6b6862) hover:text-(--diamond-ink,#1a1917)",
                    )}
                    aria-label="Move selected left"
                >
                    &lt;
                </button>
            </div>
            <TransferColumn
                title={selectedTitle ?? (v === "approval" ? "Approved" : v === "drag" ? "Plan" : "Selected")}
                items={selected}
                variant={v}
                dark={dark}
                selected
                activeId={activeSelectedId}
                onActivate={setActiveSelectedId}
                onMove={(item) => move(item, "to-available")}
                onDragStart={(item) => {
                    dragItem.current = { item, direction: "to-available" };
                }}
                onDrop={v === "drag" ? () => onDrop("to-selected") : undefined}
            />
        </div>
    );
});

function TransferColumn({
    title,
    items,
    variant,
    dark,
    selected,
    filter,
    onFilterChange,
    onMove,
    activeId,
    onActivate,
    onDragStart,
    onDrop,
}: {
    title: React.ReactNode;
    items: TransferListItem[];
    variant: TransferListVariant;
    dark?: boolean;
    selected?: boolean;
    filter?: string;
    onFilterChange?: (value: string) => void;
    onMove?: (item: TransferListItem) => void;
    activeId?: string | null;
    onActivate?: (id: string | null) => void;
    onDragStart?: (item: TransferListItem) => void;
    onDrop?: () => void;
}) {
    const showAvatar = variant === "avatars" || variant === "scopes-dark";

    return (
        <div
            onDragOver={onDrop ? (event) => event.preventDefault() : undefined}
            onDrop={onDrop}
            className={cn("min-w-0 rounded-md border", dark ? "border-[#2d2c28] bg-[#151411]" : "border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff)")}
        >
            <div className={cn("border-b px-3 py-2", dark ? "border-[#2d2c28]" : "border-(--diamond-border,#d9d5cc)")}>
                <div className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-(--diamond-muted,#6b6862)">{title}</div>
                {onFilterChange ? (
                    <input
                        value={filter}
                        onChange={(event) => onFilterChange(event.target.value)}
                        placeholder="Filter..."
                        className="mt-2 w-full rounded border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2 py-1 text-[12px] outline-none focus:border-(--diamond-accent,#2b7fff)"
                    />
                ) : null}
            </div>
            <div className="grid max-h-[220px] gap-1 overflow-x-hidden overflow-y-auto p-2">
                {items.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        disabled={item.disabled}
                        draggable={variant === "drag"}
                        onFocus={() => onActivate?.(item.id)}
                        onDragStart={(event) => {
                            onDragStart?.(item);
                            event.dataTransfer.effectAllowed = "move";
                            event.dataTransfer.setData("text/plain", item.id);
                        }}
                        onClick={() => onMove?.(item)}
                        className={cn(
                            "flex min-h-12 w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2.5 py-2 text-left text-[12px] transition-colors disabled:pointer-events-none disabled:opacity-50",
                            dark
                                ? "hover:bg-white/5"
                                : selected
                                  ? "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_8%,var(--diamond-surface,#fff))] hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_14%,var(--diamond-surface,#fff))]"
                                  : "hover:bg-(--diamond-surface-alt,#ebe8e1)",
                            activeId === item.id && "ring-2 ring-(--diamond-accent,#2b7fff)/35",
                        )}
                    >
                        {showAvatar ? (
                            <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-(--diamond-accent,#2b7fff) font-semibold text-white text-[10px]">
                                {item.avatar ?? String(item.label).slice(0, 2)}
                            </span>
                        ) : variant === "approval" ? (
                            <span className={cn("font-bold", selected ? "text-emerald-600" : "text-rose-500")}>{selected ? "OK" : "NO"}</span>
                        ) : null}
                        <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium">{item.label}</span>
                            {item.description ? <span className="block truncate text-(--diamond-muted,#6b6862) text-[11px]">{item.description}</span> : null}
                        </span>
                        {item.status ? (
                            <span
                                title={String(item.status)}
                                className="size-1.5 shrink-0 rounded-full bg-(--diamond-accent,#2b7fff)"
                            />
                        ) : null}
                    </button>
                ))}
            </div>
        </div>
    );
}

TransferList.displayName = "Diamond.TransferList";

export { transferVariants as transferListVariants };
