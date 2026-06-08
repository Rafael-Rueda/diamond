"use client";

import { ArrowLeft, ArrowRight, Check, DotsSixVertical, Lightning, Plus, Warning, X } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Kanban — drag-and-drop column board with hybrid controlled/uncontrolled API. */

export type KanbanVariant = "classic" | "active" | "two-col" | "tasks" | "compact" | "priority";

const kanbanVariants = cva("grid w-full gap-3", {
    variants: {
        variant: {
            classic: "grid-cols-3",
            active: "grid-cols-3",
            "two-col": "grid-cols-2",
            tasks: "grid-cols-3",
            compact: "grid-cols-4",
            priority: "grid-cols-3",
        },
    },
    defaultVariants: { variant: "classic" },
});

export interface KanbanCard {
    id: React.Key;
    /** Card text/content. */
    title: React.ReactNode;
    /** Subtitle/secondary line. */
    description?: React.ReactNode;
    /** Left-border accent color. */
    color?: string;
    /** Done state — strike-through + check on `tasks` variant. */
    done?: boolean;
    /** Urgency flag — pulses on `priority` variant. */
    urgent?: boolean;
    /** Due-time label (e.g. "DUE IN 2H"). */
    due?: React.ReactNode;
    /** Custom right-aligned slot (avatar, due date). */
    trailing?: React.ReactNode;
    /** Custom left-aligned slot. */
    leading?: React.ReactNode;
}

export interface KanbanColumn {
    id: React.Key;
    title: React.ReactNode;
    /** Optional icon prefix for the column title. */
    icon?: React.ReactNode;
    cards: KanbanCard[];
    /** Static highlight (still works; hover-active overrides on `active` variant). */
    active?: boolean;
    /** WIP limit — enforced on `priority` variant. */
    limit?: number;
}

export interface KanbanProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange">,
        VariantProps<typeof kanbanVariants> {
    /** Controlled columns. */
    columns?: KanbanColumn[];
    /** Default columns (uncontrolled). */
    defaultColumns?: KanbanColumn[];
    onColumnsChange?: (cols: KanbanColumn[]) => void;

    /** Custom card renderer overrides default. */
    renderCard?: (card: KanbanCard, columnIndex: number) => React.ReactNode;
    /** Empty placeholder per column. */
    emptyContent?: React.ReactNode;

    /** Enable drag-and-drop (default true; auto-off on `two-col` which uses move buttons). */
    draggable?: boolean;
    /** Enable inline "+ Add card" footer. Default true. */
    allowAdd?: boolean;
    /** Enable click-to-edit + hover-X to remove. Default true. */
    allowEdit?: boolean;
    /** Placeholder shown inside the new-card input. */
    addCardPlaceholder?: string;
    /** Label for the "add" button (default: "Add card"). */
    addCardLabel?: React.ReactNode;

    accent?: string;
}

type DragSrc = { colId: React.Key; cardId: React.Key } | null;

function moveCard(
    cols: KanbanColumn[],
    fromColId: React.Key,
    cardId: React.Key,
    toColId: React.Key,
    toIndex: number,
): KanbanColumn[] {
    const sourceCol = cols.find((c) => c.id === fromColId);
    const card = sourceCol?.cards.find((c) => c.id === cardId);
    if (!card) return cols;

    return cols.map((col) => {
        if (col.id === fromColId && col.id === toColId) {
            const filtered = col.cards.filter((c) => c.id !== cardId);
            const insertAt = Math.min(toIndex, filtered.length);
            const newCards = [...filtered];
            newCards.splice(insertAt, 0, card);
            return { ...col, cards: newCards };
        }
        if (col.id === fromColId) {
            return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
        }
        if (col.id === toColId) {
            const newCards = [...col.cards];
            const insertAt = Math.min(toIndex, newCards.length);
            newCards.splice(insertAt, 0, card);
            return { ...col, cards: newCards };
        }
        return col;
    });
}

function genId(): string {
    return `c_${Math.random().toString(36).slice(2, 10)}`;
}

const AnimatedCheckbox: React.FC<{
    checked?: boolean;
    onChange?: () => void;
    size?: number;
    "aria-label"?: string;
}> = ({ checked, onChange, size = 18, ...aria }) => (
    // biome-ignore lint/a11y/useSemanticElements: animated SVG check requires a <button>; aria-checked + role="checkbox" gives the same semantics for AT
    <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={(e) => {
            e.stopPropagation();
            onChange?.();
        }}
        className={cn(
            "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border-2 transition-all duration-150",
            "focus-visible:outline-none focus-visible:ring-(--diamond-accent,#2b7fff) focus-visible:ring-2",
            checked
                ? "scale-100 border-(--diamond-accent,#2b7fff) bg-(--diamond-accent,#2b7fff)"
                : "border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) hover:scale-110 hover:border-(--diamond-accent,#2b7fff)",
        )}
        style={{ width: size, height: size }}
        {...aria}
    >
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
                "transition-all duration-300 ease-out",
                checked ? "scale-100 text-(--diamond-on-accent,#fff) opacity-100" : "scale-50 opacity-0",
            )}
            style={{ width: size * 0.6, height: size * 0.6 }}
            aria-hidden="true"
        >
            <title>{checked ? "Done" : "Pending"}</title>
            <path
                d="M5 12 L10 17 L19 7"
                style={{
                    strokeDasharray: 30,
                    strokeDashoffset: checked ? 0 : 30,
                    transition: "stroke-dashoffset 250ms ease-out",
                }}
            />
        </svg>
    </button>
);

const ColumnHeader: React.FC<{
    column: KanbanColumn;
    variant: KanbanVariant;
    compact: boolean;
    doneCount?: number;
    isOverLimit?: boolean;
    isAtLimit?: boolean;
}> = ({ column, variant, compact, doneCount, isOverLimit, isAtLimit }) => {
    const limit = column.limit;
    return (
        <div
            className={cn(
                "flex items-center justify-between px-0.5 font-semibold text-(--diamond-muted,#6b6862)",
                compact ? "text-[9px] uppercase tracking-[0.1em]" : "text-[10px] uppercase tracking-[0.1em]",
            )}
        >
            <span className="flex items-center gap-1.5">
                {column.icon}
                {column.title}
            </span>
            {variant === "tasks" && typeof doneCount === "number" ? (
                <span className="font-mono text-[10px] normal-case tracking-normal">
                    {doneCount}/{column.cards.length}
                </span>
            ) : variant === "priority" && typeof limit === "number" ? (
                <span
                    className={cn(
                        "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em]",
                        isOverLimit
                            ? "bg-rose-500 text-white"
                            : isAtLimit
                              ? "bg-amber-400/90 text-amber-950"
                              : "bg-emerald-500/15 text-emerald-700",
                    )}
                >
                    {isOverLimit && <Warning weight="fill" size={9} />}
                    {column.cards.length}/{limit}
                </span>
            ) : (
                <span>{column.cards.length}</span>
            )}
        </div>
    );
};

interface CardItemProps {
    card: KanbanCard;
    columnIndex: number;
    column: KanbanColumn;
    variant: KanbanVariant;
    compact: boolean;
    dndEnabled: boolean;
    allowEdit: boolean;
    isDragging: boolean;
    canGoPrev: boolean;
    canGoNext: boolean;
    onDragStart: (e: React.DragEvent) => void;
    onDragEnd: () => void;
    onDragOverCard: (e: React.DragEvent) => void;
    onDropOnCard: (e: React.DragEvent) => void;
    onRemove: () => void;
    onEdit: (next: string) => void;
    onToggleDone: () => void;
    onMovePrev: () => void;
    onMoveNext: () => void;
}

const CardItem: React.FC<CardItemProps> = ({
    card,
    columnIndex,
    variant,
    compact,
    dndEnabled,
    allowEdit,
    isDragging,
    canGoPrev,
    canGoNext,
    onDragStart,
    onDragEnd,
    onDragOverCard,
    onDropOnCard,
    onRemove,
    onEdit,
    onToggleDone,
    onMovePrev,
    onMoveNext,
}) => {
    const [editing, setEditing] = React.useState(false);
    const [draft, setDraft] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [editing]);

    const startEdit = (e: React.MouseEvent) => {
        if (!allowEdit) return;
        if (typeof card.title !== "string") return;
        e.stopPropagation();
        setDraft(card.title);
        setEditing(true);
    };

    const commitEdit = () => {
        if (draft.trim()) onEdit(draft.trim());
        setEditing(false);
    };

    const isTasks = variant === "tasks";
    const isTwoCol = variant === "two-col";
    const isPriority = variant === "priority";

    return (
        // biome-ignore lint/a11y/noStaticElementInteractions: HTML5 native drag-and-drop requires a non-interactive container with draggable + drag events
        <div
            draggable={dndEnabled && !editing}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOverCard}
            onDrop={onDropOnCard}
            className={cn(
                "group relative flex items-start gap-2 rounded-lg border bg-(--diamond-surface,#fff) shadow-sm transition-all duration-150",
                compact ? "px-2 py-1.5 text-[10px]" : "px-2.5 py-2 text-[12px]",
                dndEnabled && !editing && "cursor-grab active:cursor-grabbing",
                isDragging && "rotate-1 scale-105 opacity-50 shadow-xl",
                !isDragging && "hover:-translate-y-0.5 hover:shadow-md",
                isPriority && card.urgent
                    ? "border-rose-400 [animation:diamond-kanban-pulse_1.8s_ease-in-out_infinite]"
                    : "border-(--diamond-border,#d9d5cc)",
                card.done && "opacity-75",
            )}
            style={card.color ? { borderLeftColor: card.color, borderLeftWidth: 3 } : undefined}
        >
            {dndEnabled && !editing && (
                <span
                    aria-hidden="true"
                    className="absolute top-1/2 left-0.5 -translate-y-1/2 text-(--diamond-muted,#6b6862) opacity-0 transition-opacity group-hover:opacity-50"
                >
                    <DotsSixVertical size={10} weight="bold" />
                </span>
            )}

            {isTasks ? (
                <AnimatedCheckbox
                    checked={card.done}
                    onChange={onToggleDone}
                    size={compact ? 16 : 18}
                    aria-label={card.done ? "Mark not done" : "Mark done"}
                />
            ) : (
                card.leading && <span className="mt-0.5 shrink-0">{card.leading}</span>
            )}

            <div className="min-w-0 flex-1">
                {editing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onBlur={commitEdit}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") commitEdit();
                            if (e.key === "Escape") setEditing(false);
                        }}
                        className="w-full rounded border border-(--diamond-accent,#2b7fff) bg-(--diamond-surface,#fff) px-1 py-0.5 font-semibold text-[12px] outline-none"
                    />
                ) : (
                    <button
                        type="button"
                        onClick={startEdit}
                        className={cn(
                            "block w-full cursor-text text-left font-semibold",
                            allowEdit ? "cursor-text" : "cursor-default",
                            card.done && "text-(--diamond-muted,#6b6862) line-through decoration-2",
                        )}
                    >
                        {card.title}
                    </button>
                )}

                {card.description && (
                    <div className="mt-0.5 text-(--diamond-muted,#6b6862) text-[10px]">{card.description}</div>
                )}

                {isPriority && card.due && (
                    <div className="mt-1 inline-flex items-center gap-1 rounded bg-rose-500/10 px-1.5 py-0.5 font-mono text-[9px] text-rose-700 uppercase tracking-[0.08em]">
                        <Lightning weight="fill" size={9} />
                        {card.due}
                    </div>
                )}

                {isTwoCol && (canGoPrev || canGoNext) && (
                    <div className="mt-1.5 flex items-center gap-1">
                        {canGoPrev && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onMovePrev();
                                }}
                                className="inline-flex cursor-pointer items-center gap-0.5 rounded border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-1.5 py-0.5 font-mono text-(--diamond-muted,#6b6862) text-[9px] uppercase tracking-[0.08em] hover:bg-(--diamond-surface-alt,#ebe8e1) hover:text-(--diamond-ink,#1a1917)"
                            >
                                <ArrowLeft weight="bold" size={9} />
                                Back
                            </button>
                        )}
                        {canGoNext && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onMoveNext();
                                }}
                                className="ml-auto inline-flex cursor-pointer items-center gap-0.5 rounded bg-(--diamond-accent,#2b7fff) px-1.5 py-0.5 font-mono text-(--diamond-on-accent,#fff) text-[9px] uppercase tracking-[0.08em] hover:brightness-110"
                            >
                                {columnIndex === 0 ? "Finish" : "Next"}
                                <ArrowRight weight="bold" size={9} />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {card.trailing && <span className="mt-0.5 shrink-0">{card.trailing}</span>}

            {allowEdit && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    aria-label="Remove card"
                    className="absolute top-1 right-1 inline-flex size-4 cursor-pointer items-center justify-center rounded-full bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-muted,#6b6862) opacity-0 transition-opacity hover:bg-rose-500 hover:text-white group-hover:opacity-100"
                >
                    <X weight="bold" size={9} />
                </button>
            )}
        </div>
    );
};

const KEYFRAMES = `
@keyframes diamond-kanban-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.4); }
    50% { box-shadow: 0 0 0 4px rgba(244, 63, 94, 0); }
}
@keyframes diamond-kanban-shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
}
`;

function useKeyframes() {
    React.useInsertionEffect(() => {
        if (typeof document === "undefined") return;
        if (document.querySelector('style[data-diamond="kanban-keyframes"]')) return;
        const style = document.createElement("style");
        style.setAttribute("data-diamond", "kanban-keyframes");
        style.textContent = KEYFRAMES;
        document.head.appendChild(style);
    }, []);
}

export const Kanban = React.forwardRef<HTMLDivElement, KanbanProps>(function Kanban(
    {
        className,
        variant: variantProp,
        columns: controlledColumns,
        defaultColumns,
        onColumnsChange,
        renderCard,
        emptyContent,
        draggable: draggableProp,
        allowAdd = true,
        allowEdit = true,
        addCardPlaceholder = "Add a card…",
        addCardLabel = "Add card",
        accent,
        style,
        ...rest
    },
    ref,
) {
    useKeyframes();

    const isControlled = controlledColumns !== undefined;
    const [internal, setInternal] = React.useState<KanbanColumn[]>(() => defaultColumns ?? controlledColumns ?? []);
    const columns = controlledColumns ?? internal;
    const setColumns = React.useCallback(
        (next: KanbanColumn[]) => {
            if (!isControlled) setInternal(next);
            onColumnsChange?.(next);
        },
        [isControlled, onColumnsChange],
    );

    const variant: KanbanVariant = variantProp ?? "classic";
    const dndEnabled = (draggableProp ?? variant !== "two-col") && !renderCard;

    const dragRef = React.useRef<DragSrc>(null);
    const [dragging, setDragging] = React.useState<DragSrc>(null);
    const [dragOverCol, setDragOverCol] = React.useState<React.Key | null>(null);
    const [limitWarnCol, setLimitWarnCol] = React.useState<React.Key | null>(null);
    const [addingTo, setAddingTo] = React.useState<React.Key | null>(null);
    const [draftCard, setDraftCard] = React.useState("");
    const addInputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        if (addingTo !== null) addInputRef.current?.focus();
    }, [addingTo]);

    const handleDragStart = (colId: React.Key, cardId: React.Key) => (e: React.DragEvent) => {
        const src = { colId, cardId };
        dragRef.current = src;
        setDragging(src);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", String(cardId));
    };

    const handleDragEnd = () => {
        dragRef.current = null;
        setDragging(null);
        setDragOverCol(null);
    };

    const wouldExceedLimit = (toColId: React.Key, src: DragSrc): boolean => {
        if (variant !== "priority" || !src) return false;
        if (src.colId === toColId) return false;
        const target = columns.find((c) => c.id === toColId);
        if (!target?.limit) return false;
        return target.cards.length >= target.limit;
    };

    const handleDragOverCol = (colId: React.Key) => (e: React.DragEvent) => {
        if (!dragRef.current) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = wouldExceedLimit(colId, dragRef.current) ? "none" : "move";
        setDragOverCol(colId);
    };

    const handleDropOnCol = (colId: React.Key) => (e: React.DragEvent) => {
        e.preventDefault();
        const src = dragRef.current;
        if (!src) return;

        if (wouldExceedLimit(colId, src)) {
            setLimitWarnCol(colId);
            setTimeout(() => setLimitWarnCol((v) => (v === colId ? null : v)), 1500);
            handleDragEnd();
            return;
        }

        const target = columns.find((c) => c.id === colId);
        const insertAt = target?.cards.length ?? 0;
        setColumns(moveCard(columns, src.colId, src.cardId, colId, insertAt));
        handleDragEnd();
    };

    const handleDropOnCard = (colId: React.Key, beforeIndex: number) => (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const src = dragRef.current;
        if (!src) return;

        if (wouldExceedLimit(colId, src)) {
            setLimitWarnCol(colId);
            setTimeout(() => setLimitWarnCol((v) => (v === colId ? null : v)), 1500);
            handleDragEnd();
            return;
        }

        setColumns(moveCard(columns, src.colId, src.cardId, colId, beforeIndex));
        handleDragEnd();
    };

    const handleAddCard = (colId: React.Key) => {
        const title = draftCard.trim();
        if (!title) {
            setAddingTo(null);
            setDraftCard("");
            return;
        }
        const newCard: KanbanCard = { id: genId(), title };
        setColumns(columns.map((c) => (c.id === colId ? { ...c, cards: [...c.cards, newCard] } : c)));
        setDraftCard("");
        setAddingTo(null);
    };

    const handleEditCard = (colId: React.Key, cardId: React.Key, nextTitle: string) => {
        setColumns(
            columns.map((c) =>
                c.id === colId
                    ? {
                          ...c,
                          cards: c.cards.map((card) => (card.id === cardId ? { ...card, title: nextTitle } : card)),
                      }
                    : c,
            ),
        );
    };

    const handleRemoveCard = (colId: React.Key, cardId: React.Key) => {
        setColumns(
            columns.map((c) => (c.id === colId ? { ...c, cards: c.cards.filter((card) => card.id !== cardId) } : c)),
        );
    };

    const handleToggleDone = (colId: React.Key, cardId: React.Key) => {
        setColumns(
            columns.map((c) =>
                c.id === colId
                    ? {
                          ...c,
                          cards: c.cards.map((card) => (card.id === cardId ? { ...card, done: !card.done } : card)),
                      }
                    : c,
            ),
        );
    };

    const handleMoveByDirection = (colId: React.Key, cardId: React.Key, dir: "prev" | "next") => {
        const colIdx = columns.findIndex((c) => c.id === colId);
        if (colIdx === -1) return;
        const targetIdx = dir === "prev" ? colIdx - 1 : colIdx + 1;
        if (targetIdx < 0 || targetIdx >= columns.length) return;
        const targetCol = columns[targetIdx];
        if (!targetCol) return;
        setColumns(moveCard(columns, colId, cardId, targetCol.id, targetCol.cards.length));
    };

    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;
    const compact = variant === "compact";

    const defaultActiveIndex = variant === "active" ? columns.findIndex((c) => c.cards.length > 0) : -1;

    return (
        <div ref={ref} className={cn(kanbanVariants({ variant }), className)} style={inlineStyle} {...rest}>
            {columns.map((col, ci) => {
                const isActive = col.active || (variant === "active" && ci === defaultActiveIndex);
                const doneCount = variant === "tasks" ? col.cards.filter((c) => c.done).length : undefined;
                const isOverLimit = variant === "priority" && col.limit != null && col.cards.length > col.limit;
                const isAtLimit = variant === "priority" && col.limit != null && col.cards.length === col.limit;
                const isDropTarget = dragOverCol === col.id && dragging !== null;
                const isWarning = limitWarnCol === col.id;
                const progressPct =
                    variant === "tasks" && col.cards.length > 0
                        ? Math.round(((doneCount ?? 0) / col.cards.length) * 100)
                        : 0;

                return (
                    // biome-ignore lint/a11y/noStaticElementInteractions: column container needs drag-over/drop handlers for HTML5 native DnD
                    <div
                        key={col.id}
                        onDragOver={handleDragOverCol(col.id)}
                        onDragLeave={(e) => {
                            if (e.currentTarget.contains(e.relatedTarget as Node)) return;
                            setDragOverCol((v) => (v === col.id ? null : v));
                        }}
                        onDrop={handleDropOnCol(col.id)}
                        className={cn(
                            "flex min-h-[120px] flex-col rounded-lg transition-all duration-200",
                            compact ? "gap-1 p-1.5" : "gap-2 p-2.5",
                            isActive
                                ? "scale-[1.01] border border-(--diamond-accent,#2b7fff) border-dashed bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_8%,var(--diamond-surface,#fff))] shadow-md"
                                : "border border-transparent bg-(--diamond-surface-alt,#ebe8e1)",
                            isDropTarget && !isWarning && "ring-(--diamond-accent,#2b7fff)/60 ring-2 ring-offset-1",
                            isWarning &&
                                "bg-rose-500/10 ring-2 ring-rose-500 [animation:diamond-kanban-shake_300ms_ease-in-out]",
                            isOverLimit && !isWarning && "border-rose-400",
                        )}
                    >
                        <ColumnHeader
                            column={col}
                            variant={variant}
                            compact={compact}
                            doneCount={doneCount}
                            isOverLimit={isOverLimit}
                            isAtLimit={isAtLimit}
                        />

                        {variant === "tasks" && col.cards.length > 0 && (
                            <div className="h-0.5 overflow-hidden rounded-full bg-(--diamond-border,#d9d5cc)">
                                <div
                                    className="h-full bg-(--diamond-accent,#2b7fff) transition-all duration-300"
                                    style={{ width: `${progressPct}%` }}
                                />
                            </div>
                        )}

                        {col.cards.length === 0 && emptyContent && addingTo !== col.id && (
                            <div className="flex flex-1 items-center justify-center px-1 py-3 text-(--diamond-muted,#6b6862) text-[10px] italic opacity-70">
                                {emptyContent}
                            </div>
                        )}

                        {col.cards.map((card, cardIdx) => {
                            if (renderCard)
                                return <React.Fragment key={card.id}>{renderCard(card, ci)}</React.Fragment>;
                            const isCardDragging = dragging?.colId === col.id && dragging?.cardId === card.id;
                            return (
                                <CardItem
                                    key={card.id}
                                    card={card}
                                    column={col}
                                    columnIndex={ci}
                                    variant={variant}
                                    compact={compact}
                                    dndEnabled={dndEnabled}
                                    allowEdit={allowEdit}
                                    isDragging={isCardDragging}
                                    canGoPrev={ci > 0}
                                    canGoNext={ci < columns.length - 1}
                                    onDragStart={handleDragStart(col.id, card.id)}
                                    onDragEnd={handleDragEnd}
                                    onDragOverCard={handleDragOverCol(col.id)}
                                    onDropOnCard={handleDropOnCard(col.id, cardIdx)}
                                    onRemove={() => handleRemoveCard(col.id, card.id)}
                                    onEdit={(t) => handleEditCard(col.id, card.id, t)}
                                    onToggleDone={() => handleToggleDone(col.id, card.id)}
                                    onMovePrev={() => handleMoveByDirection(col.id, card.id, "prev")}
                                    onMoveNext={() => handleMoveByDirection(col.id, card.id, "next")}
                                />
                            );
                        })}

                        {allowAdd && !renderCard && (
                            <>
                                {addingTo === col.id ? (
                                    <div className="flex items-center gap-1 rounded-lg border border-(--diamond-accent,#2b7fff) bg-(--diamond-surface,#fff) px-2 py-1.5">
                                        <input
                                            ref={addInputRef}
                                            type="text"
                                            value={draftCard}
                                            onChange={(e) => setDraftCard(e.target.value)}
                                            onBlur={() => handleAddCard(col.id)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") handleAddCard(col.id);
                                                if (e.key === "Escape") {
                                                    setAddingTo(null);
                                                    setDraftCard("");
                                                }
                                            }}
                                            placeholder={addCardPlaceholder}
                                            className="w-full bg-transparent text-[12px] outline-none placeholder:text-(--diamond-muted,#6b6862)"
                                        />
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAddingTo(col.id);
                                            setDraftCard("");
                                        }}
                                        className={cn(
                                            "inline-flex cursor-pointer items-center gap-1 self-start rounded-md px-1.5 py-1 text-(--diamond-muted,#6b6862) transition-colors hover:bg-(--diamond-surface,#fff) hover:text-(--diamond-accent,#2b7fff)",
                                            compact ? "text-[10px]" : "text-[11px]",
                                        )}
                                    >
                                        <Plus weight="bold" size={11} />
                                        {addCardLabel}
                                    </button>
                                )}
                            </>
                        )}

                        {variant === "tasks" && doneCount === col.cards.length && col.cards.length > 0 && (
                            <div className="flex items-center justify-center gap-1 text-[10px] text-emerald-600">
                                <Check weight="bold" size={10} />
                                All done
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
});

Kanban.displayName = "Diamond.Kanban";

export { kanbanVariants };
