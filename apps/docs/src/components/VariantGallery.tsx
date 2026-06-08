import { Accordion } from "@diamond/registry/accordion/accordion";
import { Alert } from "@diamond/registry/alert/alert";
import { AudioPlayer } from "@diamond/registry/audio-player/audio-player";
import { Avatar } from "@diamond/registry/avatar/avatar";
import { AvatarGroup } from "@diamond/registry/avatar-group/avatar-group";
import { Badge } from "@diamond/registry/badge/badge";
import { Button } from "@diamond/registry/button/button";
import { Calendar } from "@diamond/registry/calendar/calendar";
import { Card as DiamondCard } from "@diamond/registry/card/card";
import { Carousel } from "@diamond/registry/carousel/carousel";
import { ChatBubble, ChatBubbleGroup } from "@diamond/registry/chat-bubble/chat-bubble";
import { Chip } from "@diamond/registry/chip/chip";
import { CodeBlock } from "@diamond/registry/code-block/code-block";
import { DataGrid } from "@diamond/registry/data-grid/data-grid";
import { EmptyState } from "@diamond/registry/empty-state/empty-state";
import { ErrorState } from "@diamond/registry/error-state/error-state";
import { Image } from "@diamond/registry/image/image";
import { Kanban } from "@diamond/registry/kanban/kanban";
import { Kbd } from "@diamond/registry/kbd/kbd";
import { List } from "@diamond/registry/list/list";
import { ListItem } from "@diamond/registry/list-item/list-item";
import { NotificationCenter } from "@diamond/registry/notification-center/notification-center";
import { NotificationDot } from "@diamond/registry/notification-dot/notification-dot";
import { OfflineIndicator } from "@diamond/registry/offline-indicator/offline-indicator";
import { Popover } from "@diamond/registry/popover/popover";
import { Pricing } from "@diamond/registry/pricing/pricing";
import { Progress } from "@diamond/registry/progress/progress";
import { Skeleton } from "@diamond/registry/skeleton/skeleton";
import { Spinner } from "@diamond/registry/spinner/spinner";
import { Statistic } from "@diamond/registry/statistic/statistic";
import { Table } from "@diamond/registry/table/table";
import { Tag } from "@diamond/registry/tag/tag";
import { Timeline } from "@diamond/registry/timeline/timeline";
import { Toast, ToastProvider, useToast } from "@diamond/registry/toast/toast";
import { Tooltip, TooltipProvider } from "@diamond/registry/tooltip/tooltip";
import { VideoPlayer } from "@diamond/registry/video-player/video-player";
import type * as React from "react";

import type { ComponentDocs, VariantSample } from "@/lib/registry";

interface Props {
    componentId: string;
    documentation: ComponentDocs;
}

export default function VariantGallery({ componentId, documentation }: Props) {
    const { groups, samples } = documentation;
    const groupNames = Object.keys(groups);

    return (
        <ToastProvider position="bottom-right">
            <TooltipProvider delayDuration={150}>
                <div className="space-y-12">
                    {groupNames.map((group, gi) => {
                const variants = groups[group];
                if (!variants || variants.length === 0) return null;

                return (
                    <section key={group}>
                        <header className="mb-5 flex items-baseline gap-3 border-[var(--diamond-border)] border-b border-dashed pb-3">
                            <span className="font-mono text-[10px] text-[var(--diamond-muted)] uppercase tracking-[0.16em]">
                                §{String(gi + 1).padStart(2, "0")}
                            </span>
                            <h2 className="font-semibold text-lg tracking-tight">{group}</h2>
                            <span className="ml-auto font-mono text-[10px] text-[var(--diamond-muted)] uppercase tracking-[0.12em]">
                                {variants.length} variant{variants.length === 1 ? "" : "s"}
                            </span>
                        </header>

                        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[var(--diamond-border)] bg-[var(--diamond-border)] sm:grid-cols-2 lg:grid-cols-3">
                            {variants.map((variant) => (
                                <Card
                                    key={variant}
                                    componentId={componentId}
                                    variant={variant}
                                    defaultLabel={samples.default}
                                    sample={samples.perVariant[variant]}
                                />
                            ))}
                        </div>
                    </section>
                );
            })}
                </div>
            </TooltipProvider>
        </ToastProvider>
    );
}

interface CardProps {
    componentId: string;
    variant: string;
    defaultLabel: string;
    sample: VariantSample | undefined;
}

function Card({ componentId, variant, defaultLabel, sample }: CardProps) {
    const label = sample?.label ?? defaultLabel;
    const extraProps = sample?.props ?? {};

    return (
        <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 bg-[var(--diamond-surface)] p-8 transition-colors hover:bg-[var(--diamond-surface-alt)]">
            <div className="flex w-full flex-1 items-center justify-center overflow-auto">
                <Live componentId={componentId} variant={variant} label={label} extraProps={extraProps} />
            </div>
            <code className="font-mono text-[10px] text-[var(--diamond-muted)] uppercase tracking-[0.14em]">
                {variant}
            </code>
        </div>
    );
}

interface LiveProps {
    componentId: string;
    variant: string;
    label: string;
    extraProps: Record<string, string | number | boolean>;
}

const GRADIENTS: Array<[string, string]> = [
    ["#c4948a", "#a9b8c0"],
    ["#8b7355", "#c4a57b"],
    ["#5a7d8c", "#2d4a5c"],
    ["#d4a574", "#8b5a3c"],
    ["#6b7a8f", "#3d4f66"],
    ["#a8906d", "#6b5338"],
];
const Grad = ({ i = 0 }: { i?: number }) => (
    <div
        className="size-full"
        style={{
            background: `linear-gradient(135deg, ${GRADIENTS[i % GRADIENTS.length][0]}, ${GRADIENTS[i % GRADIENTS.length][1]})`,
        }}
    />
);

function Live({ componentId, variant, label, extraProps }: LiveProps) {
    switch (componentId) {
        case "button":
            return (
                <Button variant={variant as never} {...(extraProps as React.HTMLAttributes<HTMLButtonElement>)}>
                    {label}
                </Button>
            );

        case "avatar": {
            const v = variant as "solid" | "colored" | "square" | "status" | "ring" | "image";
            return (
                <Avatar variant={v} size="lg" {...(extraProps as object)}>
                    {label || "AR"}
                </Avatar>
            );
        }

        case "avatar-group": {
            const items = [
                { label: "AC", bg: "#c4948a" },
                { label: "LR", bg: "#8b7355" },
                { label: "MT", bg: "#5a7d8c" },
                { label: "JM", bg: "#d4a574" },
            ];
            return <AvatarGroup variant={variant as never} items={items} max={3} total={8} size="md" />;
        }

        case "badge": {
            const v = variant as "count" | "status" | "overflow" | "dot" | "icon" | "label";
            return (
                <div className="relative inline-block">
                    {v === "overflow" || v === "count" ? <span className="text-3xl">📥</span> : null}
                    <Badge variant={v} floating={v === "count" || v === "overflow"} {...(extraProps as object)}>
                        {label ||
                            (v === "count"
                                ? "8"
                                : v === "overflow"
                                  ? "99+"
                                  : v === "status"
                                    ? "NEW"
                                    : v === "icon"
                                      ? "3"
                                      : v === "label"
                                        ? "v3.2"
                                        : "")}
                    </Badge>
                </div>
            );
        }

        case "chip":
            return (
                <Chip variant={variant as never} {...(extraProps as object)}>
                    {label || "Tag"}
                </Chip>
            );

        case "tag":
            return (
                <Tag variant={variant as never} {...(extraProps as object)}>
                    {label}
                </Tag>
            );

        case "kbd": {
            if (variant === "cluster") {
                return (
                    <div className="grid w-[120px] grid-cols-3 gap-1.5">
                        {["Q", "W", "E", "A", "S", "D"].map((k) => (
                            <Kbd key={k} variant="cluster">
                                {k}
                            </Kbd>
                        ))}
                    </div>
                );
            }
            if (variant === "shortcut") {
                return (
                    <div className="flex gap-1">
                        <Kbd variant="shortcut">⌘</Kbd>
                        <Kbd variant="shortcut">K</Kbd>
                    </div>
                );
            }
            return <Kbd variant={variant as never}>{label || "K"}</Kbd>;
        }

        case "image": {
            const grad = (
                <div
                    className="size-full"
                    style={{ background: `linear-gradient(135deg, ${GRADIENTS[0][0]}, ${GRADIENTS[0][1]})` }}
                />
            );
            const v = variant as "basic" | "caption" | "pair" | "circular" | "overlay" | "framed";
            if (v === "pair") {
                return (
                    <div className="flex gap-1">
                        <Image variant="basic" ratio="square" width={80} placeholder={grad} />
                        <Image
                            variant="basic"
                            ratio="square"
                            width={80}
                            placeholder={
                                <div
                                    className="size-full"
                                    style={{
                                        background: `linear-gradient(135deg, ${GRADIENTS[1][0]}, ${GRADIENTS[1][1]})`,
                                    }}
                                />
                            }
                        />
                    </div>
                );
            }
            const overlayCaption =
                v === "overlay" ? (
                    <div>
                        <div className="text-[10px] tracking-[0.1em] opacity-70">EP 03</div>
                        <div className="text-[14px] italic [font-family:Fraunces,Georgia,serif]">Quiet shipping</div>
                    </div>
                ) : v === "caption" ? (
                    "Atlas Mug"
                ) : undefined;
            return (
                <Image
                    variant={v}
                    width={v === "circular" ? 110 : 160}
                    ratio={v === "circular" ? "square" : "wide"}
                    placeholder={grad}
                    caption={overlayCaption}
                    badge={v === "framed" ? undefined : v === "caption" ? null : undefined}
                    filter={v === "framed" ? "grayscale(1) contrast(1.1)" : undefined}
                />
            );
        }

        case "list-item": {
            const v = variant as "basic" | "person" | "product" | "task" | "event" | "drag";
            const common = { className: "w-[260px]" };
            if (v === "person")
                return (
                    <ListItem
                        variant={v}
                        {...common}
                        leading={<Avatar size="sm">JM</Avatar>}
                        title="James M."
                        description="Product designer · SF"
                        trailing={
                            <Chip variant="basic" size="sm">
                                Follow
                            </Chip>
                        }
                    />
                );
            if (v === "product")
                return (
                    <ListItem
                        variant={v}
                        {...common}
                        leading={
                            <div className="size-10 overflow-hidden rounded-md">
                                <Grad i={2} />
                            </div>
                        }
                        title="Autumn jacket"
                        description="Size M · Earth"
                        trailing={<span className="font-mono text-[12px]">$148</span>}
                    />
                );
            if (v === "task")
                return (
                    <ListItem
                        variant={v}
                        {...common}
                        done
                        leading={
                            <span className="flex size-4 items-center justify-center rounded bg-[color-mix(in_oklab,var(--diamond-accent)_20%,white)] text-[10px] text-[var(--diamond-accent)]">
                                ✓
                            </span>
                        }
                        title="Prepare brief"
                        trailing={<span className="text-[10px] text-[var(--diamond-muted)]">Apr 22</span>}
                    />
                );
            if (v === "event")
                return (
                    <ListItem
                        variant={v}
                        {...common}
                        title={
                            <>
                                <span className="mr-2 font-mono text-[9px] text-[var(--diamond-muted)] tracking-[0.1em]">
                                    APR 24
                                </span>
                                Design review
                            </>
                        }
                        description="2:00 — 3:00 PM · Room 4B"
                    />
                );
            if (v === "drag")
                return (
                    <ListItem
                        variant={v}
                        {...common}
                        title="Drag to reorder"
                        trailing={<span className="font-mono text-[10px] text-[var(--diamond-muted)]">01 / 08</span>}
                    />
                );
            return <ListItem variant={v} {...common} title={label || "List item"} description="Click to select" />;
        }

        case "statistic": {
            const v = variant as "kpi" | "paired" | "dark" | "large" | "progress" | "grid";
            if (v === "kpi")
                return (
                    <Statistic variant={v} label="Total Revenue" value="$48.2k" delta={{ dir: "up", text: "12.4%" }} />
                );
            if (v === "paired")
                return (
                    <Statistic
                        variant={v}
                        entries={[
                            { label: "Users", value: "2,480" },
                            { label: "Sessions", value: "18.4k" },
                        ]}
                    />
                );
            if (v === "dark")
                return <Statistic variant={v} label="Active Now" value="142" sparkline={[3, 5, 4, 7, 6, 9, 8, 11]} />;
            if (v === "large") return <Statistic variant={v} label="uptime, this month" value="99.8%" />;
            if (v === "progress")
                return (
                    <Statistic
                        variant={v}
                        label="Conversion"
                        value="4.8%"
                        progress={68}
                        status="ON TRACK"
                        goal="68% to goal of 7%"
                    />
                );
            return (
                <Statistic
                    variant={v}
                    entries={[
                        { label: "Projects", value: "12" },
                        { label: "Tasks", value: "248" },
                        { label: "Team", value: "14" },
                    ]}
                />
            );
        }

        case "chat-bubble": {
            const v = variant as "basic" | "avatar" | "typing" | "media" | "imessage" | "terminal";
            if (v === "avatar") {
                return (
                    <ChatBubbleGroup>
                        <ChatBubble variant="avatar" sender="Aria" time="10:42" avatar={<Avatar size="sm">AR</Avatar>}>
                            Can you review the spec?
                        </ChatBubble>
                        <ChatBubble side="me">Sure, starting now.</ChatBubble>
                    </ChatBubbleGroup>
                );
            }
            if (v === "typing") {
                return (
                    <ChatBubbleGroup>
                        <ChatBubble>Morning!</ChatBubble>
                        <ChatBubble variant="typing" />
                    </ChatBubbleGroup>
                );
            }
            if (v === "media") {
                return (
                    <ChatBubbleGroup>
                        <ChatBubble
                            variant="media"
                            media={
                                <div className="aspect-[4/3] w-[180px]">
                                    <Grad i={0} />
                                </div>
                            }
                            mediaCaption="atlas-moodboard.jpg"
                        />
                        <ChatBubble side="me">Love the tones.</ChatBubble>
                    </ChatBubbleGroup>
                );
            }
            if (v === "imessage") {
                return (
                    <ChatBubbleGroup>
                        <ChatBubble>SMS-style neutral.</ChatBubble>
                        <ChatBubble side="me" style={{ background: "#34c759" }}>
                            iMessage green
                        </ChatBubble>
                    </ChatBubbleGroup>
                );
            }
            if (v === "terminal") {
                return (
                    <ChatBubbleGroup>
                        <ChatBubble variant="terminal" style={{ background: "#0f0f0e", color: "#d4d0c8" }}>
                            <span style={{ color: "var(--diamond-accent)" }}>aria:</span> → build pass
                        </ChatBubble>
                        <ChatBubble variant="terminal" side="me" style={{ background: "#10b981", color: "#fff" }}>
                            &lt;leo:&gt; lgtm, merged
                        </ChatBubble>
                    </ChatBubbleGroup>
                );
            }
            return (
                <ChatBubbleGroup>
                    <ChatBubble>Morning! Have you seen v3.2?</ChatBubble>
                    <ChatBubble side="me">Just about to deploy.</ChatBubble>
                    <ChatBubble>Let me know when it's live.</ChatBubble>
                </ChatBubbleGroup>
            );
        }

        case "card": {
            const v = variant as "hero" | "horizontal" | "social" | "editorial" | "feature" | "metric";
            const grad = <Grad i={0} />;
            if (v === "hero")
                return (
                    <DiamondCard
                        variant={v}
                        media={grad}
                        meta="ISSUE 04 · SPRING"
                        title="Atlas Journal"
                        description="Seasonal reflections on craft and culture."
                    />
                );
            if (v === "horizontal")
                return (
                    <DiamondCard
                        variant={v}
                        media={
                            <div className="size-full">
                                <Grad i={1} />
                            </div>
                        }
                        title="Horizon Mug"
                        meta="$ 28.00 · CERAMIC"
                        description="⋆⋆⋆⋆⋆ 124 reviews"
                    />
                );
            if (v === "social")
                return (
                    <DiamondCard variant={v}>
                        <div className="flex items-center gap-2">
                            <Avatar size="sm">AR</Avatar>
                            <div className="text-[12px]">
                                <div className="font-semibold">Aria Chen</div>
                                <div className="text-[10px] text-[var(--diamond-muted)]">2h ago</div>
                            </div>
                        </div>
                        <div className="text-[13px]">
                            Just shipped <b>v3.2</b> with faster builds.
                        </div>
                        <div className="flex gap-3 text-[10px] text-[var(--diamond-muted)]">
                            <span>♡ 42</span>
                            <span>↺ 8</span>
                            <span>💬 12</span>
                        </div>
                    </DiamondCard>
                );
            if (v === "editorial")
                return (
                    <DiamondCard
                        variant={v}
                        meta="REPORT / 01"
                        title="On the quiet discipline of shipping."
                        description="An essay on cadence, craft, and care."
                        footer={
                            <>
                                <span>8 MIN READ</span>
                                <span>L. REYES</span>
                            </>
                        }
                    />
                );
            if (v === "feature")
                return (
                    <DiamondCard
                        variant={v}
                        meta="NEW FEATURE"
                        title="Realtime collaboration"
                        description="See cursors, edits, and comments instantly."
                    />
                );
            return <DiamondCard variant={v} meta="Revenue" title="$48.2k" description="▲ 12.4% vs. last month" />;
        }

        case "table": {
            const v = variant as "basic" | "invoice" | "zebra" | "log" | "dotted" | "bicolor";
            const cols = [
                { key: "name", header: "Name" },
                { key: "role", header: "Role" },
                { key: "status", header: "Status" },
            ];
            const rows = [
                { name: "Aria Chen", role: "Design", status: "Active" },
                { name: "Leo Reyes", role: "Eng", status: "Active" },
                { name: "Mei Tan", role: "Ops", status: "Away" },
            ];
            return (
                <div className="w-full max-w-[320px]">
                    <Table variant={v} columns={cols as never} rows={rows as never} />
                </div>
            );
        }

        case "data-grid": {
            const v = variant as "toolbar" | "filter" | "terminal" | "bulk" | "grouped" | "barchart";
            const cols = [
                { key: "order", header: "Order" },
                { key: "customer", header: "Customer" },
                { key: "total", header: "Total", align: "right" as const },
            ];
            const rows = [
                { order: "#1042", customer: "A. Chen", total: "$184" },
                { order: "#1041", customer: "M. Tan", total: "$96" },
                { order: "#1040", customer: "L. Reyes", total: "$312" },
            ];
            const toolbar =
                v === "toolbar" ? (
                    <>
                        <input
                            placeholder="Search orders…"
                            className="flex-1 rounded bg-[var(--diamond-surface-alt)] px-2 py-1 text-[11px] outline-none"
                        />
                        <Chip size="sm">All 48</Chip>
                    </>
                ) : v === "filter" ? (
                    <>
                        <Chip variant="filter" size="sm" active>
                            Active
                        </Chip>
                        <Chip variant="filter" size="sm">
                            Archived
                        </Chip>
                    </>
                ) : v === "bulk" ? (
                    <>
                        <strong className="text-[10px]">3 selected</strong>
                        <span className="cursor-pointer text-[11px] text-[var(--diamond-accent)]">Archive</span>
                    </>
                ) : v === "terminal" ? (
                    <span className="text-[10px]">$ grep --filter status=ok</span>
                ) : v === "grouped" ? (
                    <span className="text-[11px]">
                        Group by:{" "}
                        <Chip size="sm" variant="dismissible">
                            Category
                        </Chip>
                    </span>
                ) : null;
            const pagination =
                v === "toolbar" ? (
                    <>
                        <span>1–3 of 48</span>
                        <span>‹ 1 2 3 ›</span>
                    </>
                ) : null;
            const barCols = [
                { key: "name", header: "Name" },
                { key: "score", header: "Score", bar: (r: { score: number }) => r.score * 0.8 } as const,
            ];
            const barRows = [
                { name: "Alpha", score: 94 },
                { name: "Beta", score: 78 },
            ];
            return (
                <div className="w-full max-w-[320px]">
                    <DataGrid
                        variant={v}
                        columns={(v === "barchart" ? barCols : cols) as never}
                        rows={(v === "barchart" ? barRows : rows) as never}
                        toolbar={toolbar}
                        pagination={pagination}
                    />
                </div>
            );
        }

        case "list": {
            const v = variant as "default" | "numbered" | "rich" | "terminal" | "editorial" | "toggles";
            if (v === "numbered") {
                return (
                    <List
                        variant={v}
                        items={[{ label: "Discover" }, { label: "Connect" }, { label: "Build" }, { label: "Ship" }]}
                    />
                );
            }
            if (v === "rich") {
                return (
                    <List
                        variant={v}
                        className="w-[260px]"
                        items={[
                            {
                                label: "Design tokens",
                                description: "42 tokens",
                                leading: (
                                    <Avatar size="sm" bg="#f59e0b">
                                        D
                                    </Avatar>
                                ),
                                trailing: <span className="text-[var(--diamond-muted)]">›</span>,
                            },
                            {
                                label: "Components",
                                description: "86 components",
                                leading: (
                                    <Avatar size="sm" bg="#10b981">
                                        C
                                    </Avatar>
                                ),
                                trailing: <span className="text-[var(--diamond-muted)]">›</span>,
                            },
                        ]}
                    />
                );
            }
            if (v === "terminal") {
                return (
                    <List
                        variant={v}
                        className="w-[220px]"
                        items={[
                            {
                                label: "init",
                                leading: <span className="text-[#6b6862]">$</span>,
                                trailing: <span className="text-emerald-500">✓</span>,
                            },
                            {
                                label: "bootstrap",
                                leading: <span className="text-[#6b6862]">$</span>,
                                trailing: <span className="text-emerald-500">✓</span>,
                            },
                            {
                                label: "deploy",
                                leading: <span className="text-[#6b6862]">$</span>,
                                trailing: <span className="text-emerald-500">✓</span>,
                            },
                        ]}
                    />
                );
            }
            if (v === "editorial") {
                return (
                    <List
                        variant={v}
                        items={[
                            { label: "Essay I", description: "Mar 2026" },
                            { label: "Essay II", description: "Apr 2026" },
                            { label: "Essay III", description: "May 2026" },
                        ]}
                    />
                );
            }
            if (v === "toggles") {
                return (
                    <List
                        variant={v}
                        className="w-[260px]"
                        items={[
                            {
                                label: "Music",
                                description: "842 items",
                                trailing: (
                                    <input type="checkbox" defaultChecked className="accent-[var(--diamond-accent)]" />
                                ),
                            },
                            {
                                label: "Photos",
                                description: "1250 items",
                                trailing: (
                                    <input type="checkbox" defaultChecked className="accent-[var(--diamond-accent)]" />
                                ),
                            },
                            {
                                label: "Videos",
                                description: "48 items",
                                trailing: <input type="checkbox" className="accent-[var(--diamond-accent)]" />,
                            },
                        ]}
                    />
                );
            }
            return (
                <List
                    variant={v}
                    className="w-[220px]"
                    items={[
                        {
                            label: "Inbox",
                            leading: "📥",
                            trailing: <span className="text-[10px] text-[var(--diamond-muted)]">12</span>,
                        },
                        {
                            label: "Starred",
                            leading: "★",
                            trailing: <span className="text-[10px] text-[var(--diamond-muted)]">3</span>,
                        },
                        { label: "Sent", leading: "✉" },
                    ]}
                />
            );
        }

        case "accordion": {
            const v = variant as "faq" | "separated" | "terminal" | "editorial" | "team" | "inset";
            const baseItems = [
                {
                    id: "1",
                    title: "What is Diamond?",
                    content: "A systematic design toolkit for makers.",
                    defaultOpen: true,
                },
                { id: "2", title: "How does it work?", content: "Install, import, customize." },
                { id: "3", title: "Is it free?", content: "Free for personal, paid for teams." },
            ];
            return (
                <div className="w-[260px]">
                    <Accordion variant={v} items={baseItems} />
                </div>
            );
        }

        case "timeline": {
            const v = variant as "vertical" | "milestone" | "log" | "horizontal" | "historical" | "activity";
            if (v === "horizontal") {
                return (
                    <div className="w-[260px]">
                        <Timeline
                            variant={v}
                            progress={0.55}
                            events={[{ title: "Q1" }, { title: "Q2" }, { title: "Q3" }, { title: "Q4" }]}
                        />
                    </div>
                );
            }
            if (v === "log") {
                return (
                    <div className="w-[260px]">
                        <Timeline
                            variant={v}
                            events={[
                                { time: "14:02", title: "deploy started" },
                                { time: "14:05", title: "tests passed" },
                                { time: "14:07", title: "live" },
                            ]}
                        />
                    </div>
                );
            }
            if (v === "milestone") {
                return (
                    <div className="w-[220px]">
                        <Timeline
                            variant={v}
                            events={[
                                { time: "Apr", title: "Discovery" },
                                { time: "May", title: "Design" },
                                { time: "Jun", title: "Build", done: false },
                            ]}
                        />
                    </div>
                );
            }
            if (v === "historical") {
                return (
                    <div className="w-[260px]">
                        <Timeline
                            variant={v}
                            events={[
                                { title: "1847", description: "Atlas Co. est." },
                                { title: "1920", description: "Opens 3 branches" },
                                { title: "2026", description: "Diamond debut" },
                            ]}
                        />
                    </div>
                );
            }
            if (v === "activity") {
                return (
                    <div className="w-[260px]">
                        <Timeline
                            variant={v}
                            events={[
                                {
                                    title: (
                                        <>
                                            <b>A. Chen</b> commented
                                        </>
                                    ),
                                    time: "2h ago",
                                    marker: <Avatar size="sm">AC</Avatar>,
                                },
                                {
                                    title: (
                                        <>
                                            <b>L. Reyes</b> merged PR
                                        </>
                                    ),
                                    time: "4h ago",
                                    marker: (
                                        <Avatar size="sm" bg="#8b7355">
                                            LR
                                        </Avatar>
                                    ),
                                },
                            ]}
                        />
                    </div>
                );
            }
            return (
                <div className="w-[260px]">
                    <Timeline
                        variant={v}
                        events={[
                            { time: "9:00", title: "Kickoff", description: "Team sync" },
                            { time: "11:00", title: "Design review", description: "Round 2" },
                            { time: "14:00", title: "Ship", description: "v3.2 live" },
                        ]}
                    />
                </div>
            );
        }

        case "calendar": {
            const v = variant as "month" | "minimal" | "week" | "agenda" | "year" | "range";
            const m = new Date(2026, 3, 1);
            if (v === "agenda") {
                return (
                    <div className="w-[260px]">
                        <Calendar
                            variant={v}
                            agenda={[
                                { date: new Date(2026, 3, 15), title: "Design review", time: "2:00 PM" },
                                { date: new Date(2026, 3, 18), title: "Ship v3.2", time: "All day" },
                                { date: new Date(2026, 3, 20), title: "Team dinner", time: "7:00 PM" },
                            ]}
                        />
                    </div>
                );
            }
            if (v === "year") {
                return (
                    <div className="w-[280px]">
                        <Calendar variant={v} currentMonth={3} highlightedMonths={[0, 1, 2]} />
                    </div>
                );
            }
            if (v === "range") {
                return (
                    <Calendar
                        variant={v}
                        month={m}
                        range={{ start: new Date(2026, 3, 10), end: new Date(2026, 3, 13) }}
                    />
                );
            }
            const events = [
                { date: new Date(2026, 3, 8) },
                { date: new Date(2026, 3, 15) },
                { date: new Date(2026, 3, 22) },
            ];
            return <Calendar variant={v} month={m} events={events} weekStartsOn={v === "minimal" ? 1 : 0} />;
        }

        case "carousel": {
            const v = variant as "dots" | "arrows" | "thumbs" | "cards" | "circular" | "progress";
            const slides = GRADIENTS.slice(0, 5).map((g, i) => ({
                id: i,
                content: (
                    <div
                        className="flex size-full items-center justify-center font-mono text-[10px] text-white tracking-[0.16em]"
                        style={{ background: `linear-gradient(135deg, ${g[0]}, ${g[1]})` }}
                    >
                        {String(i + 1).padStart(2, "0")} / 05
                    </div>
                ),
                thumb: (
                    <div className="size-full" style={{ background: `linear-gradient(135deg, ${g[0]}, ${g[1]})` }} />
                ),
            }));
            if (v === "cards") {
                const cards = [
                    "It shipped the way we hoped.",
                    "A calm, considered toolkit.",
                    "Finally, something that fits.",
                    "Built for makers, not committees.",
                    "Quiet, considered, alive.",
                ].map((q, i) => ({
                    id: i,
                    content: (
                        <div className="flex h-[120px] items-center rounded-md bg-[var(--diamond-surface-alt)] p-3 text-[12px] italic [font-family:Fraunces,Georgia,serif]">
                            {q}
                        </div>
                    ),
                }));
                return (
                    <div className="w-[260px]">
                        <Carousel variant={v} slides={cards} slidesPerView={1.6} gap={8} />
                    </div>
                );
            }
            if (v === "progress") {
                return (
                    <div className="w-[260px]">
                        <Carousel variant={v} slides={slides} autoplay={3000} defaultIndex={0} />
                    </div>
                );
            }
            return (
                <div className="w-[260px]">
                    <Carousel variant={v} slides={slides} defaultIndex={1} />
                </div>
            );
        }

        case "kanban": {
            const v = variant as "classic" | "active" | "two-col" | "tasks" | "compact" | "priority";

            if (v === "classic") {
                return (
                    <div className="w-[320px]">
                        <Kanban
                            variant={v}
                            defaultColumns={[
                                {
                                    id: "todo",
                                    title: "To do",
                                    cards: [
                                        { id: "c1", title: "Review v3.2", color: "var(--diamond-accent)" },
                                        { id: "c2", title: "Prep launch deck", color: "var(--diamond-accent)" },
                                    ],
                                },
                                {
                                    id: "doing",
                                    title: "In progress",
                                    cards: [{ id: "c3", title: "Design review", color: "#f59e0b" }],
                                },
                                {
                                    id: "done",
                                    title: "Done",
                                    cards: [{ id: "c4", title: "Ship release", color: "#10b981" }],
                                },
                            ]}
                        />
                    </div>
                );
            }

            if (v === "active") {
                return (
                    <div className="w-[320px]">
                        <Kanban
                            variant={v}
                            defaultColumns={[
                                {
                                    id: "backlog",
                                    title: "Backlog",
                                    cards: [{ id: "b1", title: "Triage tickets" }],
                                },
                                {
                                    id: "active",
                                    title: "Active",
                                    cards: [{ id: "a1", title: "Hover me — focus follows" }],
                                },
                                {
                                    id: "shipped",
                                    title: "Shipped",
                                    cards: [{ id: "s1", title: "Refactor router" }],
                                },
                            ]}
                            allowAdd={false}
                            allowEdit={false}
                        />
                    </div>
                );
            }

            if (v === "two-col") {
                return (
                    <div className="w-[280px]">
                        <Kanban
                            variant={v}
                            defaultColumns={[
                                {
                                    id: "review",
                                    title: "In review",
                                    cards: [
                                        { id: "r1", title: "Pricing page copy" },
                                        { id: "r2", title: "Onboarding video" },
                                    ],
                                },
                                {
                                    id: "approved",
                                    title: "Approved",
                                    cards: [{ id: "a1", title: "Brand guide" }],
                                },
                            ]}
                        />
                    </div>
                );
            }

            if (v === "tasks") {
                return (
                    <div className="w-[320px]">
                        <Kanban
                            variant={v}
                            defaultColumns={[
                                {
                                    id: "today",
                                    title: "Today",
                                    cards: [
                                        { id: "t1", title: "Write blog post", done: false },
                                        { id: "t2", title: "Review PRs" },
                                    ],
                                },
                                {
                                    id: "week",
                                    title: "This week",
                                    cards: [
                                        { id: "t3", title: "Update changelog" },
                                        { id: "t4", title: "Plan sprint", done: true },
                                    ],
                                },
                                {
                                    id: "later",
                                    title: "Later",
                                    cards: [{ id: "t5", title: "Refactor data layer" }],
                                },
                            ]}
                        />
                    </div>
                );
            }

            if (v === "compact") {
                return (
                    <div className="w-[340px]">
                        <Kanban
                            variant={v}
                            defaultColumns={[
                                { id: "ib", title: "Inbox", cards: [{ id: "i1", title: "Item A" }] },
                                { id: "dn", title: "Doing", cards: [{ id: "d1", title: "Item B" }] },
                                { id: "rv", title: "Review", cards: [{ id: "v1", title: "Item C" }] },
                                { id: "dx", title: "Done", cards: [{ id: "x1", title: "Item D" }] },
                            ]}
                        />
                    </div>
                );
            }

            // priority
            return (
                <div className="w-[320px]">
                    <Kanban
                        variant={v}
                        defaultColumns={[
                            { id: "inbox", title: "Inbox", limit: 3, cards: [] },
                            {
                                id: "today",
                                title: "Today",
                                limit: 3,
                                cards: [
                                    {
                                        id: "p1",
                                        title: "Ship review",
                                        urgent: true,
                                        due: "Due in 2h",
                                    },
                                    { id: "p2", title: "Call partner" },
                                ],
                            },
                            { id: "later", title: "Later", limit: 5, cards: [] },
                        ]}
                        emptyContent="— empty —"
                    />
                </div>
            );
        }

        case "pricing": {
            const v = variant as "starter" | "featured" | "stacked" | "enterprise" | "toggle" | "discount";
            if (v === "stacked") {
                return (
                    <div className="w-[260px]">
                        <Pricing
                            variant={v}
                            defaultSelectedTierId="pro"
                            onSelectionCta={(t) => alert(`Continue with ${String(t.name)}`)}
                            tiers={[
                                { id: "free", name: "Free", price: "$0", description: "1 user" },
                                {
                                    id: "pro",
                                    name: "Pro",
                                    price: "$28",
                                    description: "5 users",
                                    highlighted: true,
                                },
                                { id: "team", name: "Team", price: "$96", description: "Unlimited" },
                            ]}
                        />
                    </div>
                );
            }
            if (v === "enterprise") {
                return (
                    <Pricing
                        variant={v}
                        tier={{
                            name: "Enterprise",
                            price: "Let's talk",
                            description: "Custom SLAs, dedicated support, on-premise.",
                            ctaLabel: "Contact sales",
                            onCta: () => alert("Sales team notified"),
                        }}
                    />
                );
            }
            if (v === "toggle") {
                return (
                    <Pricing
                        variant={v}
                        defaultBillingId="m"
                        billingPeriods={[
                            { id: "m", label: "Monthly" },
                            { id: "y", label: "Yearly −20%" },
                        ]}
                        tier={{
                            name: "Pro",
                            price: "$28",
                            prices: { m: "$28", y: "$269" },
                            periods: { m: "/mo", y: "/year" },
                            features: ["Everything in Starter", "Unlimited projects"],
                            ctaLabel: "Start free trial",
                            onCta: () => alert("Trial started"),
                        }}
                    />
                );
            }
            if (v === "discount") {
                return (
                    <Pricing
                        variant={v}
                        tier={{
                            name: "Pro",
                            price: "$224",
                            period: "per year",
                            originalPrice: "$280",
                            discount: "−20%",
                            ctaLabel: "Save 20%",
                            onCta: () => alert("Discount applied"),
                        }}
                    />
                );
            }
            if (v === "featured") {
                return (
                    <Pricing
                        variant={v}
                        tier={{
                            name: "Pro",
                            price: "$28",
                            period: "/mo",
                            description: "For growing teams",
                            features: ["Unlimited projects", "Priority support", "Analytics"],
                            ctaLabel: "Choose Pro →",
                            onCta: () => alert("Welcome to Pro"),
                        }}
                    />
                );
            }
            return (
                <Pricing
                    variant={v}
                    tier={{
                        name: "Starter",
                        price: "$9",
                        period: "/mo",
                        description: "For solo makers",
                        features: ["Up to 3 projects", "Basic support"],
                        ctaLabel: "Choose Starter",
                        onCta: () => alert("Welcome to Starter"),
                    }}
                />
            );
        }

        case "code-block": {
            const v = variant as "dark" | "terminal" | "numbered" | "diff" | "output" | "quote";
            const code = `import { Button } from '@diamond/ui';\n\nexport default function App() {\n  return <Button>Click</Button>;\n}`;
            if (v === "terminal")
                return (
                    <div className="w-[260px]">
                        <CodeBlock
                            variant={v}
                            filename="terminal"
                            meta="bash"
                            code={`$ npm i @diamond/ui\n✓ installed 42 packages\n$ diamond init`}
                        />
                    </div>
                );
            if (v === "numbered")
                return (
                    <div className="w-[260px]">
                        <CodeBlock variant={v} code={`const app = {\n  name: 'diamond',\n  version: '3.2.1',\n}`} />
                    </div>
                );
            if (v === "diff")
                return (
                    <div className="w-[260px]">
                        <CodeBlock
                            variant={v}
                            filename="diff · atlas.ts"
                            diff={[
                                { kind: "remove", content: "version: '3.1.0'" },
                                { kind: "add", content: "version: '3.2.0'" },
                            ]}
                        />
                    </div>
                );
            if (v === "output")
                return (
                    <div className="w-[260px]">
                        <CodeBlock
                            variant={v}
                            filename="◉ Output"
                            meta="2.3 KB · GZIP"
                            code="◆ Diamond build complete\n  → dist/bundle.js (2.3 KB)\n⚡ ready in 428ms"
                        />
                    </div>
                );
            if (v === "quote")
                return (
                    <div className="w-[280px]">
                        <CodeBlock variant={v} attribution="SAINT-EXUPÉRY">
                            {
                                '"Perfection is achieved, not when there is\nnothing more to add, but when there is\nnothing left to take away."'
                            }
                        </CodeBlock>
                    </div>
                );
            return (
                <div className="w-[260px]">
                    <CodeBlock variant={v} filename="app.tsx" copyable code={code} />
                </div>
            );
        }

        case "video-player": {
            const v = variant as "standard" | "live" | "portrait" | "rec" | "editorial" | "accent";
            const SAMPLE_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
            if (v === "live")
                return (
                    <div className="w-[260px]">
                        <VideoPlayer
                            variant={v}
                            src={SAMPLE_VIDEO}
                            muted
                            autoPlay
                            loop
                            liveCount="2.4k watching"
                            controls={false}
                        />
                    </div>
                );
            if (v === "portrait")
                return (
                    <VideoPlayer
                        variant={v}
                        src={SAMPLE_VIDEO}
                        muted
                        loop
                        sideActions={[
                            { id: "1", icon: "♡", label: "Like" },
                            { id: "2", icon: "💬", label: "Comment" },
                            { id: "3", icon: "↗", label: "Share" },
                        ]}
                    />
                );
            if (v === "rec")
                return (
                    <div className="w-[260px]">
                        <VideoPlayer
                            variant={v}
                            src={SAMPLE_VIDEO}
                            muted
                            autoPlay
                            loop
                            recording
                            tag="4K · 60FPS"
                            controls={false}
                        />
                    </div>
                );
            if (v === "editorial")
                return (
                    <div className="w-[260px]">
                        <VideoPlayer
                            variant={v}
                            src={SAMPLE_VIDEO}
                            muted
                            subtitle="EP 03 · 12 MIN"
                            title="The quiet discipline of shipping"
                        />
                    </div>
                );
            if (v === "accent")
                return (
                    <div className="w-[260px]">
                        <VideoPlayer
                            variant={v}
                            src={SAMPLE_VIDEO}
                            muted
                            defaultSpeedId="1"
                            speeds={[
                                { id: "0.5", label: "0.5×", rate: 0.5 },
                                { id: "1", label: "1×", rate: 1 },
                                { id: "2", label: "2×", rate: 2 },
                            ]}
                        />
                    </div>
                );
            return (
                <div className="w-[260px]">
                    <VideoPlayer variant={v} src={SAMPLE_VIDEO} muted />
                </div>
            );
        }

        case "audio-player": {
            const v = variant as "minimal" | "podcast" | "waveform" | "radio" | "playlist" | "pill";
            const SAMPLE_AUDIO = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
            if (v === "podcast")
                return (
                    <div className="w-[280px]">
                        <AudioPlayer
                            variant={v}
                            src={SAMPLE_AUDIO}
                            title="On the discipline of shipping"
                            subtitle="EP 03 · 12 MIN"
                            cover={<Grad i={1} />}
                            showSkip
                        />
                    </div>
                );
            if (v === "waveform")
                return (
                    <div className="w-[280px]">
                        <AudioPlayer variant={v} src={SAMPLE_AUDIO} />
                    </div>
                );
            if (v === "radio")
                return (
                    <div className="w-[260px]">
                        <AudioPlayer variant={v} src={SAMPLE_AUDIO} title="Now playing" subtitle="Diamond FM · Radio" />
                    </div>
                );
            if (v === "playlist")
                return (
                    <div className="w-[260px]">
                        <AudioPlayer
                            variant={v}
                            defaultActiveTrackId={1}
                            tracks={[
                                {
                                    id: 1,
                                    title: "Track 1",
                                    duration: "6:11",
                                    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                                },
                                {
                                    id: 2,
                                    title: "Track 2",
                                    duration: "6:43",
                                    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
                                },
                                {
                                    id: 3,
                                    title: "Track 3",
                                    duration: "7:00",
                                    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                                },
                            ]}
                        />
                    </div>
                );
            if (v === "pill")
                return (
                    <div className="w-[220px]">
                        <AudioPlayer variant={v} src={SAMPLE_AUDIO} />
                    </div>
                );
            return (
                <div className="w-[260px]">
                    <AudioPlayer variant={v} src={SAMPLE_AUDIO} />
                </div>
            );
        }

        case "alert": {
            const v = variant as "info" | "success" | "warning" | "danger" | "brand" | "notice";
            const copy: Record<typeof v, { title: string; body: string }> = {
                info: { title: label || "New update available", body: "Version 2.4.0 is ready to install." },
                success: { title: "Payment received", body: "Invoice #2401 has been marked as paid." },
                warning: { title: "Storage almost full", body: "You've used 92% of your 10GB plan." },
                danger: { title: "Action failed", body: "We couldn't save your changes. Try again." },
                brand: { title: "Pro tip", body: "Press ⌘K anywhere to open the command palette." },
                notice: { title: "", body: "Scheduled maintenance · Sun 02:00 UTC · ~30 min." },
            };
            return (
                <div className="w-[300px]">
                    <Alert
                        variant={v}
                        title={copy[v].title || undefined}
                        dismissible={v !== "warning" && v !== "brand" && v !== "notice"}
                    >
                        {copy[v].body}
                    </Alert>
                </div>
            );
        }

        case "notification-dot": {
            const v = variant as "dot" | "count" | "pulse" | "status" | "overflow" | "legend";
            if (v === "legend") {
                return (
                    <div className="flex flex-col gap-1.5 text-[12px]">
                        <span className="flex items-center gap-2">
                            <NotificationDot variant="legend" tone="success" />
                            Online
                        </span>
                        <span className="flex items-center gap-2">
                            <NotificationDot variant="legend" tone="warning" />
                            Away
                        </span>
                        <span className="flex items-center gap-2">
                            <NotificationDot variant="legend" tone="muted" />
                            Offline
                        </span>
                    </div>
                );
            }
            if (v === "status") {
                return (
                    <div className="flex gap-3">
                        <span className="relative inline-flex size-9 items-center justify-center rounded-full bg-[var(--diamond-surface-alt)] font-semibold text-[12px]">
                            A
                            <NotificationDot variant="status" tone="success" />
                        </span>
                        <span className="relative inline-flex size-9 items-center justify-center rounded-full bg-[var(--diamond-surface-alt)] font-semibold text-[12px]">
                            B
                            <NotificationDot variant="status" tone="warning" />
                        </span>
                    </div>
                );
            }
            return (
                <span className="relative inline-flex h-7 items-center rounded-md border border-[var(--diamond-border)] bg-[var(--diamond-surface)] px-3 text-[12px]">
                    {label || "Inbox"}
                    <NotificationDot
                        variant={v}
                        tone={v === "pulse" ? "accent" : "danger"}
                        count={v === "count" ? 3 : v === "overflow" ? 142 : undefined}
                    />
                </span>
            );
        }

        case "progress": {
            const v = variant as "default" | "thick" | "stepped" | "striped" | "indeterminate" | "terminal";
            const VALUES: Record<typeof v, number> = {
                default: 64,
                thick: 35,
                stepped: 60,
                striped: 72,
                indeterminate: 0,
                terminal: 48,
            };
            return (
                <div className="w-[260px]">
                    <Progress variant={v} value={VALUES[v]} step={3} steps={5} label={label || undefined} />
                </div>
            );
        }

        case "spinner": {
            const v = variant as "ring" | "dual" | "dots" | "bars" | "ring-progress" | "pulse";
            return (
                <div className="flex flex-col items-center gap-2">
                    <Spinner variant={v} size="lg" value={65} />
                    {v === "ring" ? (
                        <span className="text-[var(--diamond-muted)] text-[11px]">Loading…</span>
                    ) : null}
                </div>
            );
        }

        case "skeleton": {
            const v = variant as "image" | "post" | "gallery" | "article" | "form" | "list";
            return (
                <div className="w-[220px]">
                    <Skeleton variant={v} />
                </div>
            );
        }

        case "empty-state": {
            const v = variant as
                | "inbox"
                | "cta"
                | "no-results"
                | "dropzone"
                | "editorial"
                | "caught-up";
            const COPY: Record<typeof v, { title: string; desc: string; cta?: string }> = {
                inbox: {
                    title: "No messages yet",
                    desc: "When you receive messages, they'll appear here.",
                    cta: "Compose",
                },
                cta: {
                    title: "Create your first project",
                    desc: "Projects help organize your work across teams.",
                    cta: "New project",
                },
                "no-results": {
                    title: "No results found",
                    desc: "Try adjusting your search or filters.",
                    cta: "Clear filters",
                },
                dropzone: {
                    title: "Folder is empty",
                    desc: "Drop files here or click to upload.",
                },
                editorial: { title: "Nothing here yet", desc: "Start by adding your first entry.", cta: "Add entry" },
                "caught-up": { title: "All caught up!", desc: "No new items. You've read everything." },
            };
            return (
                <div className="w-[260px]">
                    <EmptyState
                        variant={v}
                        title={COPY[v].title}
                        description={COPY[v].desc}
                        ctaLabel={COPY[v].cta}
                        kicker={v === "editorial" ? "404 · NO DATA" : undefined}
                        dropzone={v === "dropzone" ? "Drag & drop files" : undefined}
                    />
                </div>
            );
        }

        case "error-state": {
            const v = variant as
                | "not-found"
                | "server"
                | "broken"
                | "connection"
                | "terminal"
                | "friendly";
            const COPY: Record<typeof v, { title: string; desc: string }> = {
                "not-found": { title: "Page not found", desc: "The page you're looking for doesn't exist." },
                server: { title: "Server error", desc: "Something went wrong. Our team has been notified." },
                broken: { title: "Something broke", desc: "We're on it. Refresh or come back later." },
                connection: { title: "Connection lost", desc: "We couldn't reach the server. Check your network." },
                terminal: { title: "", desc: "Request timed out." },
                friendly: { title: "Unexpected error", desc: "" },
            };
            return (
                <div className="w-[260px]">
                    <ErrorState
                        variant={v}
                        title={COPY[v].title || undefined}
                        description={COPY[v].desc || undefined}
                    />
                </div>
            );
        }

        case "offline-indicator": {
            const v = variant as "top-bar" | "pill" | "chip" | "reconnecting" | "blocker" | "retry";
            return (
                <div className="relative h-[140px] w-[260px] overflow-hidden rounded-lg border border-[var(--diamond-border)] bg-[var(--diamond-surface-alt)] p-3">
                    <div className="flex flex-col gap-1.5 opacity-40">
                        <div className="h-1.5 w-3/5 rounded-full bg-[var(--diamond-border)]" />
                        <div className="h-1.5 w-4/5 rounded-full bg-[var(--diamond-border)]" />
                        <div className="h-1.5 w-2/5 rounded-full bg-[var(--diamond-border)]" />
                    </div>
                    <OfflineIndicator
                        variant={v}
                        visible
                        className="absolute"
                    />
                </div>
            );
        }

        case "notification-center": {
            const v = variant as
                | "classic"
                | "tabbed"
                | "grouped"
                | "dark"
                | "calendar"
                | "banner";
            const baseItems = [
                {
                    id: "n1",
                    title: (
                        <>
                            <b>Aria</b> commented on your draft
                        </>
                    ),
                    time: "2m ago",
                    avatar: "A",
                    unread: true,
                },
                {
                    id: "n2",
                    title: (
                        <>
                            <b>Build #241</b> completed
                        </>
                    ),
                    time: "15m ago",
                    avatar: "B",
                    unread: true,
                },
                {
                    id: "n3",
                    title: "Monthly report ready",
                    time: "2h ago",
                    avatar: "M",
                    unread: false,
                },
            ];
            if (v === "tabbed") {
                return (
                    <NotificationCenter
                        variant={v}
                        title="Inbox"
                        items={baseItems.map((i, idx) => ({
                            ...i,
                            group: idx === 0 ? "mentions" : idx === 1 ? "alerts" : "all",
                        }))}
                        tabs={[
                            { id: "all", label: "All", filter: () => true },
                            { id: "mentions", label: "Mentions" },
                            { id: "alerts", label: "Alerts" },
                        ]}
                        defaultTab="all"
                    />
                );
            }
            if (v === "grouped") {
                return (
                    <NotificationCenter
                        variant={v}
                        title="Today"
                        items={[
                            {
                                id: "g1",
                                title: <b>Deploy successful</b>,
                                description: "Production · v2.4.0",
                                time: "10m ago",
                                avatar: "✓",
                                avatarBg:
                                    "color-mix(in oklab, #10b981 20%, white)",
                                avatarColor: "#10b981",
                            },
                            {
                                id: "g2",
                                title: <b>Billing reminder</b>,
                                description: "Invoice due in 3 days",
                                time: "1h ago",
                                avatar: "!",
                                avatarBg:
                                    "color-mix(in oklab, #f59e0b 20%, white)",
                                avatarColor: "#f59e0b",
                            },
                        ]}
                    />
                );
            }
            if (v === "dark") {
                return (
                    <NotificationCenter
                        variant={v}
                        title="Activity"
                        items={[
                            {
                                id: "d1",
                                title: (
                                    <>
                                        <b>Leo</b> invited you
                                    </>
                                ),
                                time: "5m ago",
                                avatar: "L",
                                unread: true,
                            },
                            {
                                id: "d2",
                                title: (
                                    <>
                                        <b>Sync</b> complete
                                    </>
                                ),
                                time: "30m ago",
                                avatar: "S",
                            },
                        ]}
                    />
                );
            }
            if (v === "calendar") {
                return (
                    <NotificationCenter
                        variant={v}
                        dateLabel="TODAY · MON, JAN 18"
                        items={[
                            {
                                id: "c1",
                                title: <b>3 new replies</b>,
                                description: 'in "Q4 roadmap"',
                                avatar: "↪",
                                avatarBg: "var(--diamond-accent)",
                                avatarColor: "white",
                            },
                            {
                                id: "c2",
                                title: <b>Shared a file</b>,
                                description: "brief.pdf · Jay",
                                avatar: "📎",
                            },
                        ]}
                    />
                );
            }
            if (v === "banner") {
                return (
                    <NotificationCenter
                        variant={v}
                        title="3 New"
                        items={[
                            {
                                id: "b1",
                                title: <b>You were added to "Alpha"</b>,
                                time: "just now",
                                avatar: "★",
                                avatarBg: "var(--diamond-accent)",
                                avatarColor: "white",
                            },
                            {
                                id: "b2",
                                title: <b>Your article hit 1k views</b>,
                                time: "1h ago",
                                avatar: "✨",
                            },
                        ]}
                    />
                );
            }
            return <NotificationCenter variant={v} items={baseItems} />;
        }

        case "tooltip": {
            const v = variant as
                | "label"
                | "shortcut"
                | "rich"
                | "accent"
                | "light"
                | "status";
            const triggers: Record<typeof v, React.ReactNode> = {
                label: "Hover me",
                shortcut: "⌘",
                rich: "Help",
                accent: "★",
                light: "?",
                status: "Status",
            };
            const content: Record<typeof v, React.ReactNode> = {
                label: "Save changes",
                shortcut: "Copy",
                rich: "You can drag items to reorder them.",
                accent: "Add to favorites",
                light: "Requires admin role",
                status: "All systems operational",
            };
            return (
                <Tooltip
                    variant={v}
                    content={content[v]}
                    kicker={v === "rich" ? "PRO TIP" : undefined}
                    shortcut={v === "shortcut" ? "⌘C" : undefined}
                    statusColor={v === "status" ? "#10b981" : undefined}
                    defaultOpen
                    side="top"
                    hideArrow={false}
                >
                    <button
                        type="button"
                        className="inline-flex h-8 cursor-pointer items-center justify-center rounded-md border border-[var(--diamond-border)] bg-[var(--diamond-surface)] px-3 text-[12px] hover:bg-[var(--diamond-surface-alt)]"
                    >
                        {triggers[v] || label || "Hover me"}
                    </button>
                </Tooltip>
            );
        }

        case "popover": {
            const v = variant as
                | "panel"
                | "filter"
                | "share"
                | "picker"
                | "menu"
                | "mentions";
            const triggers: Record<typeof v, string> = {
                panel: "Profile ▾",
                filter: "Filters ▾",
                share: "Share ↗",
                picker: "🎨",
                menu: "⋯",
                mentions: "@mentions",
            };
            let body: React.ReactNode = null;
            if (v === "panel") {
                body = (
                    <>
                        <h5 className="font-semibold text-[12px]">Aria Chen</h5>
                        <p className="mb-2 text-[11px] text-[var(--diamond-muted)]">aria@team.co · Admin</p>
                        <div className="flex gap-1.5 border-t border-[var(--diamond-border)] pt-2">
                            <button
                                type="button"
                                className="flex-1 rounded bg-[var(--diamond-surface-alt)] py-1 text-[11px]"
                            >
                                View
                            </button>
                            <button
                                type="button"
                                className="flex-1 rounded bg-[var(--diamond-accent)] py-1 text-[11px] text-[var(--diamond-on-accent,white)]"
                            >
                                Message
                            </button>
                        </div>
                    </>
                );
            } else if (v === "filter") {
                body = (
                    <>
                        <h5 className="mb-1.5 font-semibold text-[12px]">Filters</h5>
                        <label className="mb-1 flex items-center gap-1.5 text-[11px]">
                            <input type="checkbox" defaultChecked /> Active
                        </label>
                        <label className="mb-1 flex items-center gap-1.5 text-[11px]">
                            <input type="checkbox" /> Archived
                        </label>
                        <label className="mb-2 flex items-center gap-1.5 text-[11px]">
                            <input type="checkbox" /> Shared
                        </label>
                        <button
                            type="button"
                            className="w-full rounded bg-[var(--diamond-accent)] py-1 text-[11px] text-[var(--diamond-on-accent,white)]"
                        >
                            Apply
                        </button>
                    </>
                );
            } else if (v === "share") {
                body = (
                    <>
                        <h5 className="mb-1.5 font-semibold text-[12px]">Share link</h5>
                        <div className="mb-2 flex gap-1">
                            <div className="flex-1 rounded bg-[var(--diamond-surface-alt)] px-1.5 py-1 font-mono text-[10px] text-[var(--diamond-muted)]">
                                app.co/abc123
                            </div>
                            <button
                                type="button"
                                className="rounded bg-[var(--diamond-ink)] px-2 py-1 text-[10px] text-[var(--diamond-surface)]"
                            >
                                Copy
                            </button>
                        </div>
                        <p className="text-[10px] text-[var(--diamond-muted)]">Anyone with the link can view.</p>
                    </>
                );
            } else if (v === "picker") {
                body = (
                    <>
                        <h5 className="mb-1.5 font-semibold text-[12px]">Color</h5>
                        <div className="grid grid-cols-4 gap-1">
                            {["#2b7fff", "#e11d48", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#1a1917"].map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    aria-label={c}
                                    className="aspect-square rounded"
                                    style={{ background: c }}
                                />
                            ))}
                        </div>
                    </>
                );
            } else if (v === "menu") {
                body = (
                    <>
                        <button type="button" className="block w-full rounded px-2 py-1.5 text-left text-[11px] hover:bg-[var(--diamond-surface-alt)]">
                            ✏ Edit
                        </button>
                        <button type="button" className="block w-full rounded px-2 py-1.5 text-left text-[11px] hover:bg-[var(--diamond-surface-alt)]">
                            ⎘ Duplicate
                        </button>
                        <button type="button" className="block w-full rounded px-2 py-1.5 text-left text-[11px] hover:bg-[var(--diamond-surface-alt)]">
                            📎 Archive
                        </button>
                        <button
                            type="button"
                            className="mt-1 block w-full rounded border-t border-[var(--diamond-border)] px-2 py-1.5 text-left text-[11px] text-rose-600 hover:bg-[var(--diamond-surface-alt)]"
                        >
                            🗑 Delete
                        </button>
                    </>
                );
            } else {
                body = (
                    <>
                        <h5 className="mb-1.5 font-semibold text-[12px]">Mentioned you</h5>
                        <div className="flex gap-1.5 py-1.5 text-[11px]">
                            <div className="flex size-5 items-center justify-center rounded-full bg-[var(--diamond-surface-alt)] text-[10px]">J</div>
                            <div>
                                <b>Jay</b> · 2h
                                <div className="text-[10px] text-[var(--diamond-muted)]">"check this out"</div>
                            </div>
                        </div>
                        <div className="flex gap-1.5 border-t border-[var(--diamond-border)] py-1.5 text-[11px]">
                            <div className="flex size-5 items-center justify-center rounded-full bg-[var(--diamond-surface-alt)] text-[10px]">L</div>
                            <div>
                                <b>Leo</b> · 1d
                                <div className="text-[10px] text-[var(--diamond-muted)]">"ship it?"</div>
                            </div>
                        </div>
                    </>
                );
            }
            return (
                <Popover
                    variant={v}
                    defaultOpen
                    trigger={
                        <button
                            type="button"
                            className="inline-flex h-8 cursor-pointer items-center justify-center rounded-md border border-[var(--diamond-border)] bg-[var(--diamond-surface)] px-3 text-[12px] hover:bg-[var(--diamond-surface-alt)]"
                        >
                            {triggers[v]}
                        </button>
                    }
                >
                    {body}
                </Popover>
            );
        }

        case "toast": {
            const v = variant as
                | "success"
                | "undo"
                | "progress"
                | "error"
                | "minimal"
                | "action";
            return <ToastDemo variant={v} label={label} />;
        }
    }
    return <span className="text-[var(--diamond-muted)] italic">No preview yet for {componentId}</span>;
}

function ToastDemo({ variant, label }: { variant: "success" | "undo" | "progress" | "error" | "minimal" | "action"; label: string }) {
    const { toast } = useToast();
    const fire = () => {
        if (variant === "success") {
            toast({ variant, title: label || "Saved", description: "Draft updated" });
        } else if (variant === "undo") {
            toast({
                variant,
                title: label || "Message sent",
                action: { label: "Undo", onAction: () => {} },
            });
        } else if (variant === "progress") {
            toast({ variant, title: label || "Uploading", progress: 45 });
        } else if (variant === "error") {
            toast({
                variant,
                title: label || "Failed to connect",
                description: "Check your network",
            });
        } else if (variant === "minimal") {
            toast({ variant, title: label || "Copied to clipboard", position: "bottom-center" });
        } else {
            toast({
                variant,
                title: label || "Aria mentioned you",
                description: '"can you review this?"',
                action: { label: "Open", onAction: () => {} },
                position: "top-right",
            });
        }
    };
    return (
        <div className="flex flex-col items-center gap-3">
            <div className="w-[200px]">
                <Toast
                    variant={variant}
                    title={label || undefined}
                    description={variant === "success" ? "Draft updated" : variant === "error" ? "Check your network" : variant === "action" ? '"can you review this?"' : undefined}
                    progress={variant === "progress" ? 45 : undefined}
                    actionLabel={variant === "undo" ? "UNDO" : variant === "action" ? "Open" : undefined}
                />
            </div>
            <button
                type="button"
                onClick={fire}
                className="inline-flex h-7 cursor-pointer items-center justify-center rounded-md border border-[var(--diamond-border)] bg-[var(--diamond-surface)] px-2.5 font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-[var(--diamond-surface-alt)]"
            >
                Fire live ↗
            </button>
        </div>
    );
}
