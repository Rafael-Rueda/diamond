"use client";

import { Bell } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · NotificationCenter — grouped notifications panel. Handles
 * read/unread state, optional tab filters, "mark all read" and group headers.
 * Six layouts share one data model. */

export type NotificationCenterVariant = "classic" | "tabbed" | "grouped" | "dark" | "calendar" | "banner";

export interface NotificationItem {
    id: string;
    /** Optional tab/group key — used by `tabbed` and `grouped` variants. */
    group?: string;
    /** Title or body. JSX welcome. */
    title: React.ReactNode;
    /** Secondary line. */
    description?: React.ReactNode;
    /** Relative time string. */
    time?: React.ReactNode;
    /** Avatar — leading bubble. Text initials, emoji, or arbitrary JSX. */
    avatar?: React.ReactNode;
    /** Avatar background — string or CSS color. */
    avatarBg?: string;
    /** Avatar text color. */
    avatarColor?: string;
    /** True until user marks read. */
    unread?: boolean;
}

export interface NotificationCenterTab {
    id: string;
    label: string;
    /** Filter predicate. If omitted, items with `group === id` show up. */
    filter?: (item: NotificationItem) => boolean;
}

const centerVariants = cva(
    "flex w-[300px] flex-col overflow-hidden rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917)",
    {
        variants: {
            variant: {
                classic: "",
                tabbed: "",
                grouped: "",
                dark: "border-[#2d2c28] bg-[#0f0f0e] text-[#f5f3ef]",
                calendar: "",
                banner: "",
            },
        },
        defaultVariants: { variant: "classic" },
    },
);

export interface NotificationCenterProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof centerVariants> {
    items: NotificationItem[];
    /** Panel heading. */
    title?: React.ReactNode;
    /** Right-aligned action in the header (e.g. "Mark all read"). */
    headerAction?: React.ReactNode;
    /** When set, the right action becomes a "Mark all read" button. */
    onMarkAllRead?: () => void;
    /** Click handler for an item. */
    onItemClick?: (item: NotificationItem) => void;
    /** `tabbed` variant only. */
    tabs?: NotificationCenterTab[];
    defaultTab?: string;
    /** Calendar variant only — kicker above the list (e.g. "TODAY · MON, JAN 18"). */
    dateLabel?: React.ReactNode;
    accent?: string;
}

export const NotificationCenter = React.forwardRef<HTMLDivElement, NotificationCenterProps>(
    function NotificationCenter(
        {
            className,
            variant = "classic",
            items,
            title,
            headerAction,
            onMarkAllRead,
            onItemClick,
            tabs,
            defaultTab,
            dateLabel,
            accent,
            style,
            ...rest
        },
        ref,
    ) {
        const v = variant ?? "classic";
        const [activeTab, setActiveTab] = React.useState(defaultTab ?? tabs?.[0]?.id ?? "");
        const [localItems, setLocalItems] = React.useState(items);
        React.useEffect(() => setLocalItems(items), [items]);

        const inlineStyle: React.CSSProperties = { ...style };
        if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

        const unreadCount = localItems.filter((i) => i.unread).length;
        const markRead = (id: string) =>
            setLocalItems((p) => p.map((it) => (it.id === id ? { ...it, unread: false } : it)));
        const markAll = () => {
            setLocalItems((p) => p.map((it) => ({ ...it, unread: false })));
            onMarkAllRead?.();
        };

        const filtered = (() => {
            if (v !== "tabbed" || !tabs || !activeTab) return localItems;
            const tab = tabs.find((t) => t.id === activeTab);
            if (!tab) return localItems;
            return tab.filter ? localItems.filter(tab.filter) : localItems.filter((it) => it.group === tab.id);
        })();

        const isDark = v === "dark";

        const header = (() => {
            if (v === "banner") {
                return (
                    <div className="flex items-center justify-between border-b border-(--diamond-ink,#1a1917) bg-(--diamond-ink,#1a1917) px-3 py-2.5">
                        <strong className="flex items-center gap-1.5 text-(--diamond-surface,#fff) text-[12px]">
                            <Bell size={12} weight="fill" />
                            {title ?? `${unreadCount} New`}
                        </strong>
                        {headerAction ?? (
                            <button
                                type="button"
                                onClick={markAll}
                                className="cursor-pointer text-(--diamond-accent,#2b7fff) text-[11px] hover:underline"
                            >
                                See all
                            </button>
                        )}
                    </div>
                );
            }
            if (v === "calendar") {
                return (
                    <div className="px-3 pt-3 pb-2 font-mono text-[10px] text-(--diamond-muted,#6b6862) uppercase tracking-[0.14em]">
                        {dateLabel ?? "TODAY"}
                    </div>
                );
            }
            return (
                <div
                    className={cn(
                        "flex items-center justify-between border-b px-3 py-2.5 text-[12px]",
                        isDark
                            ? "border-[#2d2c28] text-[#f5f3ef]"
                            : "border-(--diamond-border,#d9d5cc) text-(--diamond-ink,#1a1917)",
                    )}
                >
                    <strong>{title ?? "Notifications"}</strong>
                    {headerAction ??
                        (onMarkAllRead || v === "classic" || v === "dark" || v === "grouped" ? (
                            <button
                                type="button"
                                onClick={markAll}
                                className="cursor-pointer text-(--diamond-accent,#2b7fff) text-[11px] hover:underline"
                            >
                                {isDark ? "Clear" : "Mark all read"}
                            </button>
                        ) : (
                            <span className="text-(--diamond-muted,#6b6862) text-[10px]">
                                {unreadCount} unread
                            </span>
                        ))}
                </div>
            );
        })();

        const tabBar =
            v === "tabbed" && tabs?.length ? (
                <div className="flex border-b border-(--diamond-border,#d9d5cc) px-2 text-[11px]">
                    {tabs.map((t) => (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => setActiveTab(t.id)}
                            className={cn(
                                "border-b-2 px-2.5 py-1.5 transition-colors",
                                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--diamond-accent,#2b7fff)",
                                activeTab === t.id
                                    ? "border-(--diamond-ink,#1a1917) text-(--diamond-ink,#1a1917) font-medium"
                                    : "border-transparent text-(--diamond-muted,#6b6862) hover:text-(--diamond-ink,#1a1917)",
                            )}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            ) : null;

        return (
            <div
                ref={ref}
                role="region"
                aria-label={typeof title === "string" ? title : "Notifications"}
                className={cn(centerVariants({ variant: v }), className)}
                style={inlineStyle}
                {...rest}
            >
                {header}
                {tabBar}

                <div className="flex flex-col">
                    {filtered.length === 0 ? (
                        <div className="px-3 py-6 text-center text-(--diamond-muted,#6b6862) text-[11px]">
                            No notifications.
                        </div>
                    ) : (
                        filtered.map((it) => (
                            <button
                                key={it.id}
                                type="button"
                                onClick={() => {
                                    markRead(it.id);
                                    onItemClick?.(it);
                                }}
                                className={cn(
                                    "relative flex w-full cursor-pointer items-start gap-2.5 px-3 py-2.5 text-left text-[12px] transition-colors",
                                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--diamond-accent,#2b7fff)",
                                    isDark
                                        ? "border-[#2d2c28] border-t hover:bg-white/5"
                                        : "border-(--diamond-border,#d9d5cc) border-t first:border-t-0 hover:bg-(--diamond-surface-alt,#ebe8e1)",
                                    it.unread &&
                                        (isDark
                                            ? "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_10%,#0f0f0e)]"
                                            : "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_8%,var(--diamond-surface,#fff))]"),
                                )}
                            >
                                {it.unread ? (
                                    <span
                                        aria-hidden="true"
                                        className="absolute top-3 left-1 size-1.5 rounded-full bg-(--diamond-accent,#2b7fff)"
                                    />
                                ) : null}
                                <span
                                    aria-hidden="true"
                                    className="flex size-7 shrink-0 items-center justify-center rounded-full font-semibold text-[10px]"
                                    style={{
                                        background:
                                            it.avatarBg ?? (isDark ? "#2d2c28" : "var(--diamond-surface-alt,#ebe8e1)"),
                                        color:
                                            it.avatarColor ?? (isDark ? "#d4d0c8" : "var(--diamond-ink,#1a1917)"),
                                    }}
                                >
                                    {it.avatar}
                                </span>
                                <div className="flex min-w-0 flex-1 flex-col">
                                    <span
                                        className={cn(
                                            "leading-snug",
                                            isDark && "text-[#a8a49c]",
                                        )}
                                    >
                                        {it.title}
                                    </span>
                                    {it.description ? (
                                        <span
                                            className={cn(
                                                "mt-0.5 text-[10px]",
                                                isDark ? "text-[#6b6862]" : "text-(--diamond-muted,#6b6862)",
                                            )}
                                        >
                                            {it.description}
                                        </span>
                                    ) : null}
                                    {it.time ? (
                                        <span
                                            className={cn(
                                                "mt-0.5 text-[10px]",
                                                isDark ? "text-[#6b6862]" : "text-(--diamond-muted,#9a968e)",
                                            )}
                                        >
                                            {it.time}
                                        </span>
                                    ) : null}
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>
        );
    },
);

NotificationCenter.displayName = "Diamond.NotificationCenter";

export { centerVariants };
