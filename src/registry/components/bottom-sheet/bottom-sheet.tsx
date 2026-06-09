"use client";

import { X } from "@phosphor-icons/react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · BottomSheet — panel anchored to the bottom of the viewport.
 * Mobile-first overlay built on @radix-ui/react-dialog with vertical
 * slide-in. Snap-point switching is a presentational choice — pass `snap`
 * to size the sheet. */

export type BottomSheetVariant =
    | "share"
    | "sort"
    | "settings"
    | "quick-contact"
    | "scrollable"
    | "media";

const contentVariants = cva(
    [
        "fixed inset-x-0 bottom-0 z-50 flex flex-col gap-3 rounded-t-2xl border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff)",
        "p-4 pt-3 text-(--diamond-ink,#1a1917) shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.18)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        "duration-200 outline-none",
    ].join(" "),
    {
        variants: {
            variant: {
                share: "max-h-[60vh]",
                sort: "max-h-[60vh]",
                settings: "max-h-[70vh]",
                "quick-contact": "max-h-[60vh] text-center",
                scrollable: "max-h-[80vh]",
                media: "max-h-[40vh] rounded-t-3xl border-0 bg-[#0f0f0e] text-[#f5f3ef]",
            },
            snap: {
                sm: "[--bs-h:38vh]",
                md: "[--bs-h:55vh]",
                lg: "[--bs-h:80vh]",
            },
        },
        defaultVariants: { variant: "share", snap: "md" },
    },
);

const overlayCls =
    "fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

export interface BottomSheetItem {
    id: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    /** Leading slot — icon, avatar, etc. */
    leading?: React.ReactNode;
    /** Trailing slot — shortcut, value, etc. */
    trailing?: React.ReactNode;
    disabled?: boolean;
    onSelect?: () => void;
}

export interface BottomSheetProps
    extends Omit<React.ComponentPropsWithoutRef<typeof RadixDialog.Content>, "title">,
        VariantProps<typeof contentVariants> {
    trigger?: React.ReactElement;
    title?: React.ReactNode;
    description?: React.ReactNode;
    /** Item list rendered as the sheet body (most variants). */
    items?: BottomSheetItem[];
    /** Sort variant — id of the currently selected option. */
    selectedId?: string;
    onSelect?: (id: string) => void;
    /** Hide the drag handle bar at the top. */
    hideHandle?: boolean;
    /** Footer — bottom action row (typically a primary CTA). */
    footer?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
    inline?: boolean;
    accent?: string;
}

export const BottomSheet = React.forwardRef<HTMLDivElement, BottomSheetProps>(function BottomSheet(
    {
        className,
        variant = "share",
        snap,
        trigger,
        title,
        description,
        items = [],
        selectedId,
        onSelect,
        hideHandle = false,
        footer,
        open,
        onOpenChange,
        defaultOpen,
        inline = false,
        accent,
        style,
        children,
        ...rest
    },
    ref,
) {
    const v = variant ?? "share";
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;
    const dark = v === "media";

    const itemRow = (it: BottomSheetItem) => {
        const on = selectedId === it.id;
        return (
            <button
                key={it.id}
                type="button"
                aria-pressed={v === "sort" ? on : undefined}
                disabled={it.disabled}
                onClick={() => {
                    onSelect?.(it.id);
                    it.onSelect?.();
                }}
                className={cn(
                    "flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-left text-[13px] transition-colors",
                    dark
                        ? "text-[#d4d0c8] hover:bg-white/5"
                        : "text-(--diamond-ink,#1a1917) hover:bg-(--diamond-surface-alt,#ebe8e1)",
                    on && (dark ? "bg-white/5" : "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_10%,var(--diamond-surface,#fff))]"),
                    it.disabled && "pointer-events-none opacity-50",
                )}
            >
                {it.leading ? (
                    <span aria-hidden="true" className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-ink,#1a1917)">
                        {it.leading}
                    </span>
                ) : null}
                <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-medium">{it.label}</span>
                    {it.description ? (
                        <span className={cn("truncate text-[11px]", dark ? "text-[#a8a49c]" : "text-(--diamond-muted,#6b6862)")}>
                            {it.description}
                        </span>
                    ) : null}
                </span>
                {v === "sort" && on ? (
                    <span aria-hidden="true" className="text-(--diamond-accent,#2b7fff)">
                        ✓
                    </span>
                ) : (it.trailing ?? null)}
            </button>
        );
    };

    const grid = (
        <div className="grid grid-cols-4 gap-3 py-2">
            {items.map((it) => (
                <button
                    key={it.id}
                    type="button"
                    disabled={it.disabled}
                    onClick={() => {
                        onSelect?.(it.id);
                        it.onSelect?.();
                    }}
                    className="flex cursor-pointer flex-col items-center gap-1.5 rounded-md p-2 text-[11px] hover:bg-(--diamond-surface-alt,#ebe8e1)"
                >
                    <span aria-hidden="true" className="inline-flex size-11 items-center justify-center rounded-full bg-(--diamond-surface-alt,#ebe8e1)">
                        {it.leading}
                    </span>
                    {it.label}
                </button>
            ))}
        </div>
    );

    let body: React.ReactNode;
    if (v === "share") {
        body = grid;
    } else if (v === "quick-contact") {
        body = (
            <>
                <div className="flex flex-col items-center gap-1.5 pt-1">
                    <span aria-hidden="true" className="inline-flex size-14 items-center justify-center rounded-full bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-ink,#1a1917)">
                        {items[0]?.leading ?? "?"}
                    </span>
                    <RadixDialog.Title className="font-semibold text-[14px]">
                        {title ?? items[0]?.label ?? "Contact"}
                    </RadixDialog.Title>
                    {description ? (
                        <RadixDialog.Description className="text-[11px] text-(--diamond-muted,#6b6862)">
                            {description}
                        </RadixDialog.Description>
                    ) : null}
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                    {items.slice(1).map((it) => (
                        <button
                            key={it.id}
                            type="button"
                            disabled={it.disabled}
                            onClick={it.onSelect}
                            className="flex cursor-pointer flex-col items-center gap-1 rounded-md py-2 text-[11px] hover:bg-(--diamond-surface-alt,#ebe8e1)"
                        >
                            <span aria-hidden="true" className="inline-flex size-10 items-center justify-center rounded-full bg-(--diamond-surface-alt,#ebe8e1)">
                                {it.leading}
                            </span>
                            {it.label}
                        </button>
                    ))}
                </div>
            </>
        );
    } else if (v === "media") {
        const track = items[0];
        body = (
            <div className="flex items-center gap-3">
                <span
                    aria-hidden="true"
                    className="size-14 shrink-0 rounded-md bg-[linear-gradient(135deg,#5a7d8c,#2d4a5c)]"
                />
                <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-semibold text-[13px]">{title ?? track?.label}</span>
                    {description ? (
                        <span className="truncate text-[#a8a49c] text-[11px]">{description}</span>
                    ) : null}
                    <div className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-white/15">
                        <span className="block h-full w-1/3 rounded-full bg-(--diamond-accent,#2b7fff)" />
                    </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                    {(items.length ? items : [{ id: "play", label: "▶", onSelect: undefined } as BottomSheetItem]).map((it) => (
                        <button
                            key={it.id}
                            type="button"
                            onClick={it.onSelect}
                            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-[14px] hover:bg-white/20"
                        >
                            {it.leading ?? it.label}
                        </button>
                    ))}
                </div>
            </div>
        );
    } else if (v === "settings") {
        const groups: Record<string, BottomSheetItem[]> = {};
        for (const it of items) {
            const key = (it as { group?: string }).group ?? "Settings";
            (groups[key] ??= []).push(it);
        }
        body = (
            <div className="flex flex-col gap-3">
                {Object.entries(groups).map(([g, list]) => (
                    <div key={g} className="flex flex-col gap-0.5">
                        <span className="px-3 font-mono text-[10px] text-(--diamond-muted,#9a968e) uppercase tracking-[0.14em]">
                            {g}
                        </span>
                        <div className="flex flex-col">{list.map(itemRow)}</div>
                    </div>
                ))}
            </div>
        );
    } else {
        body = <div className="flex flex-col">{items.map(itemRow)}</div>;
    }

    const contentNode = (
        <>
            <RadixDialog.Overlay className={overlayCls} />
            <RadixDialog.Content
                ref={ref}
                className={cn(contentVariants({ variant: v, snap }), className)}
                style={inlineStyle}
                {...rest}
            >
                {!hideHandle ? (
                    <span
                        aria-hidden="true"
                        className={cn(
                            "mx-auto h-1 w-10 rounded-full",
                            dark ? "bg-white/30" : "bg-(--diamond-border,#d9d5cc)",
                        )}
                    />
                ) : null}
                {(title || description) && v !== "quick-contact" && v !== "media" ? (
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-1 flex-col">
                            {title ? (
                                <RadixDialog.Title className="font-semibold text-[15px] tracking-tight">
                                    {title}
                                </RadixDialog.Title>
                            ) : null}
                            {description ? (
                                <RadixDialog.Description className="text-[12px] text-(--diamond-muted,#6b6862)">
                                    {description}
                                </RadixDialog.Description>
                            ) : null}
                        </div>
                        <RadixDialog.Close asChild>
                            <button
                                type="button"
                                aria-label="Close"
                                className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-(--diamond-muted,#6b6862) hover:bg-(--diamond-surface-alt,#ebe8e1) hover:text-(--diamond-ink,#1a1917)"
                            >
                                <X size={14} weight="bold" />
                            </button>
                        </RadixDialog.Close>
                    </div>
                ) : null}
                <div className={cn(v === "scrollable" && "overflow-y-auto")}>{body}</div>
                {children}
                {footer ? <div className="mt-1">{footer}</div> : null}
            </RadixDialog.Content>
        </>
    );

    return (
        <RadixDialog.Root open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
            {trigger ? <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger> : null}
            {inline ? contentNode : <RadixDialog.Portal>{contentNode}</RadixDialog.Portal>}
        </RadixDialog.Root>
    );
});

BottomSheet.displayName = "Diamond.BottomSheet";

export { contentVariants as bottomSheetContentVariants };
