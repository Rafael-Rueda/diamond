"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond CommandPalette
 * Searchable command list. Provide grouped items and connect onItemSelect to
 * your router, command bus or launcher. */

export type CommandPaletteVariant = "project" | "suggested" | "terminal" | "jump" | "people" | "ask";

const paletteVariants = cva(
    "w-full min-w-[280px] max-w-[420px] overflow-hidden rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) shadow-[0_14px_42px_rgba(0,0,0,0.12)]",
    {
        variants: {
            variant: {
                project: "",
                suggested: "",
                terminal: "border-[#2d2c28] bg-[#0f0f0e] font-mono text-[#d4d0c8]",
                jump: "",
                people: "",
                ask: "rounded-2xl",
            },
        },
        defaultVariants: { variant: "project" },
    },
);

export interface CommandPaletteItem {
    id: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    shortcut?: React.ReactNode;
    group?: string;
    leading?: React.ReactNode;
    selected?: boolean;
    disabled?: boolean;
}

export interface CommandPaletteProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onSelect">,
        VariantProps<typeof paletteVariants> {
    query?: string;
    defaultQuery?: string;
    onQueryChange?: (query: string) => void;
    items?: CommandPaletteItem[];
    placeholder?: string;
    shortcut?: React.ReactNode;
    promptLabel?: React.ReactNode;
    suggestions?: string[];
    onItemSelect?: (item: CommandPaletteItem) => void;
    accent?: string;
}

const DEFAULT_ITEMS: Record<CommandPaletteVariant, CommandPaletteItem[]> = {
    project: [
        { id: "diamond", label: "Open Diamond v3.2", group: "Projects", leading: "D", selected: true, shortcut: "Enter" },
        { id: "atlas", label: "Open Atlas", group: "Projects", leading: "A", shortcut: "Cmd 1" },
        { id: "new", label: "New project", group: "Actions", leading: "+", shortcut: "Cmd N" },
    ],
    suggested: [
        { id: "doc", label: "Create document", group: "Suggested", leading: "Doc", selected: true },
        { id: "invite", label: "Invite team", group: "Suggested", leading: "Team" },
        { id: "settings", label: "Open settings", group: "Suggested", leading: "Set" },
    ],
    terminal: [
        { id: "commit", label: "git commit", leading: "$", selected: true, shortcut: "run" },
        { id: "checkout", label: "git checkout", leading: "$" },
        { id: "push", label: "git push", leading: "$" },
        { id: "pull", label: "git pull", leading: "$" },
    ],
    jump: [
        { id: "dash", label: "Dashboard", group: "Jump to", shortcut: "Cmd 1" },
        { id: "projects", label: "Projects", group: "Jump to", selected: true, shortcut: "Cmd 2" },
        { id: "team", label: "Team", group: "Jump to", shortcut: "Cmd 3" },
        { id: "billing", label: "Billing", group: "Jump to", shortcut: "Cmd 4" },
    ],
    people: [
        { id: "aria", label: "Aria Chen", description: "Design", group: "People", leading: "AC", selected: true },
        { id: "alex", label: "Alex Lee", description: "Engineering", group: "People", leading: "AL" },
        { id: "mira", label: "Mira Patel", description: "Product", group: "People", leading: "MP" },
    ],
    ask: [],
};

export const CommandPalette = React.forwardRef<HTMLDivElement, CommandPaletteProps>(function CommandPalette(
    {
        className,
        variant = "project",
        query,
        defaultQuery,
        onQueryChange,
        items,
        placeholder,
        shortcut = "Cmd K",
        promptLabel = "Search",
        suggestions = ["Draft a brief", "Find files", "Run a report"],
        onItemSelect,
        accent,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "project";
    const [internalQuery, setInternalQuery] = React.useState(defaultQuery ?? (v === "terminal" ? "git " : ""));
    const isControlled = query !== undefined;
    const currentQuery = isControlled ? query : internalQuery;
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const visibleItems = items ?? DEFAULT_ITEMS[v];
    const grouped = React.useMemo(() => {
        const groups = new Map<string, CommandPaletteItem[]>();
        for (const item of visibleItems) {
            const group = item.group ?? "Commands";
            const bucket = groups.get(group);
            if (bucket) bucket.push(item);
            else groups.set(group, [item]);
        }
        return Array.from(groups.entries());
    }, [visibleItems]);

    const commitQuery = (next: string) => {
        if (!isControlled) setInternalQuery(next);
        onQueryChange?.(next);
    };

    if (v === "ask") {
        return (
            <div ref={ref} className={cn(paletteVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
                <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                    <span className="font-serif text-(--diamond-muted,#6b6862) text-[15px] italic">{promptLabel}</span>
                    <input
                        value={currentQuery}
                        onChange={(event) => commitQuery(event.target.value)}
                        placeholder={placeholder ?? "Summarise this quarter..."}
                        className="min-w-0 flex-1 bg-transparent font-serif text-[15px] italic outline-none placeholder:text-(--diamond-muted,#9a968e)"
                    />
                    <kbd className="rounded border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface-alt,#ebe8e1) px-1.5 py-0.5 font-mono text-[10px] text-(--diamond-muted,#6b6862)">
                        Enter
                    </kbd>
                </div>
                <div className="flex flex-wrap gap-1.5 px-4 pb-4">
                    {suggestions.map((suggestion) => (
                        <button
                            key={suggestion}
                            type="button"
                            onClick={() => commitQuery(suggestion)}
                            className="cursor-pointer rounded-full bg-(--diamond-surface-alt,#ebe8e1) px-3 py-1 text-[11px] text-(--diamond-muted,#6b6862) hover:text-(--diamond-ink,#1a1917)"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div ref={ref} className={cn(paletteVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
            <div
                className={cn(
                    "flex items-center gap-2 border-(--diamond-border,#d9d5cc) border-b px-3 py-3",
                    v === "terminal" && "border-[#2d2c28]",
                )}
            >
                <span className={cn("font-mono text-[12px]", v === "terminal" ? "text-(--diamond-accent,#2b7fff)" : "text-(--diamond-muted,#6b6862)")}>
                    {v === "terminal" ? "$" : "search"}
                </span>
                <input
                    value={currentQuery}
                    onChange={(event) => commitQuery(event.target.value)}
                    placeholder={placeholder ?? (v === "terminal" ? "command" : "Type a command or search...")}
                    className={cn(
                        "min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-(--diamond-muted,#9a968e)",
                        v === "terminal" && "font-mono text-[#d4d0c8]",
                    )}
                />
                <kbd
                    className={cn(
                        "rounded border px-1.5 py-0.5 font-mono text-[10px]",
                        v === "terminal"
                            ? "border-[#2d2c28] text-[#6b6862]"
                            : "border-(--diamond-border,#d9d5cc) bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-muted,#6b6862)",
                    )}
                >
                    {shortcut}
                </kbd>
            </div>

            <div className="max-h-[280px] overflow-y-auto py-2">
                {grouped.map(([group, groupItems]) => (
                    <div key={group}>
                        <div
                            className={cn(
                                "px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em]",
                                v === "terminal" ? "text-[#6b6862]" : "text-(--diamond-muted,#6b6862)",
                            )}
                        >
                            {group}
                        </div>
                        {groupItems.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                disabled={item.disabled}
                                onClick={() => onItemSelect?.(item)}
                                className={cn(
                                    "flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-[13px] transition-colors disabled:pointer-events-none disabled:opacity-50",
                                    item.selected &&
                                        (v === "terminal"
                                            ? "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_16%,transparent)] text-(--diamond-accent,#2b7fff)"
                                            : "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_10%,var(--diamond-surface,#fff))] text-(--diamond-accent,#2b7fff)"),
                                    !item.selected && (v === "terminal" ? "hover:bg-white/5" : "hover:bg-(--diamond-surface-alt,#ebe8e1)"),
                                )}
                            >
                                {item.leading ? (
                                    <span
                                        className={cn(
                                            "inline-flex size-6 shrink-0 items-center justify-center rounded text-[10px] font-semibold",
                                            v === "people"
                                                ? "rounded-full bg-(--diamond-accent,#2b7fff) text-white"
                                                : "bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-muted,#6b6862)",
                                            v === "terminal" && "bg-transparent font-mono text-[#6b6862]",
                                        )}
                                    >
                                        {item.leading}
                                    </span>
                                ) : null}
                                <span className="min-w-0 flex-1 truncate">
                                    {item.label}
                                    {item.description ? (
                                        <span className="ml-2 text-(--diamond-muted,#6b6862) text-[11px]">{item.description}</span>
                                    ) : null}
                                </span>
                                {item.shortcut ? (
                                    <span className="font-mono text-[10px] text-(--diamond-muted,#6b6862)">{item.shortcut}</span>
                                ) : null}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
});

CommandPalette.displayName = "Diamond.CommandPalette";

export { paletteVariants as commandPaletteVariants };
