"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond SplitPane
 * Responsive pane compositions with visible dividers. Use the slots for your
 * own editor, preview, sidebar or console content; the component keeps the
 * layout and Diamond styling consistent. */

export type SplitPaneVariant = "sidebar" | "console" | "triple" | "preview" | "nav-content" | "decorative";

const splitPaneVariants = cva(
    "w-full min-w-0 max-w-full overflow-hidden rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917)",
    {
        variants: {
            variant: {
                sidebar: "flex h-[260px]",
                console: "flex h-[280px] flex-col",
                triple: "flex h-[260px]",
                preview: "flex h-[280px]",
                "nav-content": "flex h-[260px]",
                decorative: "flex h-[260px]",
            },
        },
        defaultVariants: { variant: "sidebar" },
    },
);

export interface SplitPaneProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof splitPaneVariants> {
    primary?: React.ReactNode;
    secondary?: React.ReactNode;
    tertiary?: React.ReactNode;
    navigation?: React.ReactNode;
    footer?: React.ReactNode;
    accent?: string;
}

export const SplitPane = React.forwardRef<HTMLDivElement, SplitPaneProps>(function SplitPane(
    { className, variant = "sidebar", primary, secondary, tertiary, navigation, footer, accent, style, ...rest },
    ref,
) {
    const v = variant ?? "sidebar";
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const [sizes, setSizes] = React.useState({
        sidebar: 38,
        console: 68,
        tripleLeft: 30,
        tripleRight: 26,
        preview: 50,
        navContent: 34,
        decorative: 50,
    });
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const setRootRef = React.useCallback(
        (node: HTMLDivElement | null) => {
            rootRef.current = node;
            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        },
        [ref],
    );

    const resize = React.useCallback((key: keyof typeof sizes, next: number) => {
        setSizes((current) => {
            if (key === "tripleLeft") {
                const nextLeft = Math.min(52, Math.max(18, next), 74 - current.tripleRight);
                return { ...current, tripleLeft: nextLeft };
            }

            if (key === "tripleRight") {
                const nextRight = Math.min(52, Math.max(18, next), 74 - current.tripleLeft);
                return { ...current, tripleRight: nextRight };
            }

            return { ...current, [key]: Math.min(78, Math.max(22, next)) };
        });
    }, []);

    const beginResize = React.useCallback(
        (key: keyof typeof sizes, orientation: "vertical" | "horizontal", side: "start" | "end" = "start") =>
            (event: React.PointerEvent<HTMLDivElement>) => {
                const root = rootRef.current;
                if (!root) return;
                event.preventDefault();
                const rect = root.getBoundingClientRect();
                const startSize = sizes[key];
                const startX = event.clientX;
                const startY = event.clientY;
                const previousCursor = document.body.style.cursor;
                const previousSelect = document.body.style.userSelect;

                const update = (clientX: number, clientY: number) => {
                    const delta =
                        orientation === "vertical"
                            ? ((clientX - startX) / rect.width) * 100
                            : ((clientY - startY) / rect.height) * 100;
                    resize(key, startSize + (side === "end" ? -delta : delta));
                };

                const onPointerMove = (moveEvent: PointerEvent) => update(moveEvent.clientX, moveEvent.clientY);
                const onPointerUp = () => {
                    document.removeEventListener("pointermove", onPointerMove);
                    document.removeEventListener("pointerup", onPointerUp);
                    document.body.style.cursor = previousCursor;
                    document.body.style.userSelect = previousSelect;
                };

                document.body.style.cursor = orientation === "vertical" ? "col-resize" : "row-resize";
                document.body.style.userSelect = "none";
                document.addEventListener("pointermove", onPointerMove);
                document.addEventListener("pointerup", onPointerUp, { once: true });
            },
        [resize, sizes],
    );

    const stepResize = React.useCallback(
        (key: keyof typeof sizes, delta: number, side: "start" | "end" = "start") => {
            const signedDelta = side === "end" ? -delta : delta;
            resize(key, sizes[key] + signedDelta);
        },
        [resize, sizes],
    );

    return (
        <div ref={setRootRef} className={cn(splitPaneVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
            {v === "sidebar" ? (
                <>
                    <Pane tone="muted" title="Files" style={{ flexBasis: `${sizes.sidebar}%` }}>
                        {secondary ?? <FileList />}
                    </Pane>
                    <Divider orientation="vertical" onPointerDown={beginResize("sidebar", "vertical")} onStep={(delta) => stepResize("sidebar", delta)} />
                    <Pane title="Editor">{primary ?? <EditorBlock />}</Pane>
                </>
            ) : null}

            {v === "console" ? (
                <>
                    <Pane title="Workspace" style={{ flexBasis: `${sizes.console}%` }}>{primary ?? <EditorBlock />}</Pane>
                    <Divider orientation="horizontal" onPointerDown={beginResize("console", "horizontal")} onStep={(delta) => stepResize("console", delta)} />
                    <Pane tone="dark" title="Console">
                        {footer ?? <ConsoleLines />}
                    </Pane>
                </>
            ) : null}

            {v === "triple" ? (
                <>
                    <Pane tone="muted" title="Nav" style={{ flexBasis: `${sizes.tripleLeft}%` }}>
                        {navigation ?? <FileList compact />}
                    </Pane>
                    <Divider orientation="vertical" onPointerDown={beginResize("tripleLeft", "vertical")} onStep={(delta) => stepResize("tripleLeft", delta)} />
                    <Pane title="Document">{primary ?? <EditorBlock />}</Pane>
                    <Divider orientation="vertical" onPointerDown={beginResize("tripleRight", "vertical", "end")} onStep={(delta) => stepResize("tripleRight", delta, "end")} />
                    <Pane tone="muted" title="Inspector" style={{ flexBasis: `${sizes.tripleRight}%` }}>
                        {tertiary ?? <Inspector />}
                    </Pane>
                </>
            ) : null}

            {v === "preview" ? (
                <>
                    <Pane title="Markdown" style={{ flexBasis: `${sizes.preview}%` }}>{primary ?? <MarkdownBlock />}</Pane>
                    <Divider orientation="vertical" onPointerDown={beginResize("preview", "vertical")} onStep={(delta) => stepResize("preview", delta)} />
                    <Pane tone="paper" title="Preview">
                        {secondary ?? <PreviewBlock />}
                    </Pane>
                </>
            ) : null}

            {v === "nav-content" ? (
                <>
                    <Pane tone="accent" title="Menu" style={{ flexBasis: `${sizes.navContent}%` }}>
                        {navigation ?? <NavList />}
                    </Pane>
                    <Divider orientation="vertical" onPointerDown={beginResize("navContent", "vertical")} onStep={(delta) => stepResize("navContent", delta)} />
                    <Pane title="Content">{primary ?? <PreviewBlock />}</Pane>
                </>
            ) : null}

            {v === "decorative" ? (
                <>
                    <Pane tone="paper" title="Draft" style={{ flexBasis: `${sizes.decorative}%` }}>
                        {primary ?? <PreviewBlock />}
                    </Pane>
                    <Divider orientation="vertical" onPointerDown={beginResize("decorative", "vertical")} onStep={(delta) => stepResize("decorative", delta)} />
                    <Pane tone="accent" title="Notes">
                        {secondary ?? <Inspector />}
                    </Pane>
                </>
            ) : null}
        </div>
    );
});

function Divider({
    orientation,
    onPointerDown,
    onStep,
}: {
    orientation: "vertical" | "horizontal";
    onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
    onStep: (delta: number) => void;
}) {
    return (
        <div
            role="separator"
            aria-orientation={orientation}
            tabIndex={0}
            onPointerDown={onPointerDown}
            onKeyDown={(event) => {
                if (orientation === "vertical" && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
                    event.preventDefault();
                    onStep(event.key === "ArrowRight" ? 8 : -8);
                }
                if (orientation === "horizontal" && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
                    event.preventDefault();
                    onStep(event.key === "ArrowDown" ? 8 : -8);
                }
            }}
            className={cn(
                "z-10 flex shrink-0 touch-none items-center justify-center bg-(--diamond-border,#d9d5cc) outline-none transition-colors hover:bg-(--diamond-accent,#2b7fff) focus:bg-(--diamond-accent,#2b7fff)",
                orientation === "vertical" ? "w-2 cursor-col-resize" : "h-2 cursor-row-resize",
            )}
        >
            <span className={cn("rounded-full bg-(--diamond-muted,#6b6862)/50", orientation === "vertical" ? "h-8 w-1" : "h-1 w-8")} />
        </div>
    );
}

function Pane({
    title,
    tone,
    children,
    style,
}: {
    title: React.ReactNode;
    tone?: "muted" | "dark" | "paper" | "accent";
    children: React.ReactNode;
    style?: React.CSSProperties;
}) {
    return (
        <section
            className={cn(
                "min-h-0 min-w-0 flex-1 overflow-hidden p-3",
                tone === "muted" && "bg-(--diamond-surface-alt,#ebe8e1)",
                tone === "dark" && "bg-[#0f0f0e] text-[#d4d0c8]",
                tone === "paper" && "bg-[#faf8f2]",
                tone === "accent" && "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_10%,var(--diamond-surface,#fff))]",
            )}
            style={style}
        >
            <div className="mb-3 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-(--diamond-muted,#6b6862)">{title}</div>
            <div className="h-[calc(100%-28px)] overflow-hidden">{children}</div>
        </section>
    );
}

function FileList({ compact }: { compact?: boolean }) {
    return (
        <ul className="m-0 grid list-none gap-1 p-0 text-[12px]">
            {(compact ? ["Home", "Docs", "API", "Team"] : ["src/", "components/", "split-pane.tsx", "manifest.json", "README.md"]).map((item, index) => (
                <li
                    key={item}
                    className={cn(
                        "truncate rounded px-2 py-1",
                        index === 1 && "bg-(--diamond-surface,#fff) text-(--diamond-accent,#2b7fff)",
                    )}
                >
                    {item}
                </li>
            ))}
        </ul>
    );
}

function EditorBlock() {
    return (
        <div className="grid gap-2 font-mono text-[11px]">
            <Line width="72%" />
            <Line width="86%" accent />
            <Line width="62%" />
            <Line width="78%" />
            <Line width="46%" accent />
        </div>
    );
}

function MarkdownBlock() {
    return (
        <div className="grid gap-2 font-mono text-[11px] text-(--diamond-muted,#6b6862)">
            <div># Diamond</div>
            <div>A compact split pane for docs.</div>
            <div>- Sidebar</div>
            <div>- Preview</div>
        </div>
    );
}

function PreviewBlock() {
    return (
        <div className="space-y-2">
            <div className="font-serif text-[18px] italic">Quiet craft.</div>
            <Line width="88%" />
            <Line width="76%" />
            <Line width="52%" />
        </div>
    );
}

function Inspector() {
    return (
        <div className="grid gap-2 text-[11px]">
            {["Width 320", "Gap 12", "Theme Default", "State Ready"].map((item) => (
                <div key={item} className="flex justify-between rounded border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2 py-1.5">
                    <span>{item.split(" ")[0]}</span>
                    <span className="font-mono text-(--diamond-muted,#6b6862)">{item.split(" ").slice(1).join(" ")}</span>
                </div>
            ))}
        </div>
    );
}

function NavList() {
    return (
        <div className="grid gap-1 text-[12px]">
            {["Overview", "Activity", "Billing", "Settings"].map((item, index) => (
                <div key={item} className={cn("rounded px-2 py-1.5", index === 0 && "bg-(--diamond-accent,#2b7fff) text-white")}>
                    {item}
                </div>
            ))}
        </div>
    );
}

function ConsoleLines() {
    return (
        <div className="grid gap-1 font-mono text-[11px] text-[#8a867d]">
            <div><span className="text-(--diamond-accent,#2b7fff)">$</span> npm run docs</div>
            <div>ready in 420ms</div>
            <div>local: http://localhost:4321</div>
        </div>
    );
}

function Line({ width, accent }: { width: string; accent?: boolean }) {
    return (
        <span
            className={cn("block h-2 rounded-full", accent ? "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_42%,var(--diamond-surface,#fff))]" : "bg-(--diamond-border,#d9d5cc)")}
            style={{ width }}
        />
    );
}

SplitPane.displayName = "Diamond.SplitPane";

export { splitPaneVariants };
