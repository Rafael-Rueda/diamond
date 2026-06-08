import type * as React from "react";

/* Per-component usage guide rendered below the variant gallery. Static SSR. */

interface Props {
    componentId: string;
}

/* ─── Building blocks ─────────────────────────────────────────────────────── */

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mt-12">
        <h2 className="mb-6 border-[var(--diamond-border)] border-b border-dashed pb-3 font-semibold text-lg tracking-tight">
            {title}
        </h2>
        <div className="flex flex-col gap-6 text-[14px] leading-relaxed">{children}</div>
    </section>
);

const Sub: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="mb-2 font-semibold text-[14px] uppercase tracking-[0.08em]">{title}</h3>
        <div className="flex flex-col gap-3">{children}</div>
    </div>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="max-w-prose text-[var(--diamond-ink)]">{children}</p>
);

const C: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <code className="rounded bg-[var(--diamond-surface-alt)] px-1.5 py-0.5 font-mono text-[12px]">{children}</code>
);

const Code: React.FC<{ children: string }> = ({ children }) => (
    <pre className="overflow-x-auto rounded-md border border-[var(--diamond-border)] bg-[#0f0f0e] p-3 font-mono text-[#d4d0c8] text-[12px] leading-relaxed">
        <code>{children}</code>
    </pre>
);

const PropTable: React.FC<{ rows: Array<{ prop: string; type: string; desc: React.ReactNode }> }> = ({ rows }) => (
    <div className="overflow-x-auto rounded-md border border-[var(--diamond-border)]">
        <table className="w-full text-left text-[13px]">
            <thead className="bg-[var(--diamond-surface-alt)]">
                <tr>
                    <th className="px-3 py-2 font-semibold text-[11px] uppercase tracking-[0.08em]">Prop</th>
                    <th className="px-3 py-2 font-semibold text-[11px] uppercase tracking-[0.08em]">Type</th>
                    <th className="px-3 py-2 font-semibold text-[11px] uppercase tracking-[0.08em]">Description</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((r) => (
                    <tr key={r.prop} className="border-[var(--diamond-border)] border-t">
                        <td className="px-3 py-2 align-top">
                            <code className="font-mono text-[12px]">{r.prop}</code>
                        </td>
                        <td className="px-3 py-2 align-top">
                            <code className="font-mono text-[11px] text-[var(--diamond-muted)]">{r.type}</code>
                        </td>
                        <td className="px-3 py-2 align-top text-[13px]">{r.desc}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const Bullets: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
    <ul className="ml-4 flex list-disc flex-col gap-1.5 text-[14px]">
        {items.map((it, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static bullet list
            <li key={i}>{it}</li>
        ))}
    </ul>
);

/* ─── Universal note shown on every component ─────────────────────────────── */

const UniversalNote: React.FC = () => (
    <Section title="Universal patterns">
        <P>
            Every Diamond component shares the same prop conventions, so once you learn one you can predict the others.
        </P>
        <Bullets
            items={[
                <>
                    <C>variant</C> — discriminated union of every visual option. Categories shown above are docs-only
                    metadata; the prop is a flat string union.
                </>,
                <>
                    <C>accent</C> — any CSS color string. Overrides <C>--diamond-accent</C> just for that instance via
                    inline <C>style</C>. Cascades into hover, ring, and selection states.
                </>,
                <>
                    <C>asChild</C> (when present) — renders the underlying primitive via <C>@radix-ui/react-slot</C>,
                    letting you compose with <C>{"<Link>"}</C>, <C>{"motion.button"}</C>, etc.
                </>,
                <>
                    <C>className</C> — merged with internal Tailwind classes via <C>cn()</C>. Use it to override layout,
                    spacing, or colors.
                </>,
                <>
                    Native HTML attributes (<C>onClick</C>, <C>aria-*</C>, <C>data-*</C>, <C>ref</C>, etc.) flow through
                    to the root element without any whitelist.
                </>,
                <>
                    Diamond is the <strong>skin</strong>: zero domain state, zero fetch, zero providers. You wire data
                    and reactions in your app code; the components just render and emit events.
                </>,
            ]}
        />
    </Section>
);

/* ─── Per-component guides ────────────────────────────────────────────────── */

function CalendarGuide() {
    return (
        <>
            <Section title="Click handlers">
                <P>
                    By default, every cell is rendered as a real <C>{"<button>"}</C> but nothing happens on click.
                    Pass any of these to react:
                </P>
                <PropTable
                    rows={[
                        {
                            prop: "onDayClick",
                            type: "(date, event) => void",
                            desc: "Fires on every day cell click. Receives the JS Date and the React mouse event.",
                        },
                        {
                            prop: "onSelect",
                            type: "(date) => void",
                            desc: (
                                <>
                                    Convenience alias that also fires on day click. Use whichever reads better in your
                                    code. Both fire together if both are provided.
                                </>
                            ),
                        },
                        {
                            prop: "onMonthClick",
                            type: "(monthIndex, event) => void",
                            desc: <>Fires when a month tile is clicked in the <C>year</C> variant.</>,
                        },
                        {
                            prop: "onAgendaItemClick",
                            type: "(item, index, event) => void",
                            desc: <>Fires when an agenda row is clicked in the <C>agenda</C> variant.</>,
                        },
                        {
                            prop: "onPrevMonth / onNextMonth",
                            type: "() => void",
                            desc: "Header chevrons only render when these are provided. The component never mutates `month` on its own.",
                        },
                    ]}
                />
                <Sub title="Open a modal on day click">
                    <Code>{`<Calendar
  variant="month"
  events={events}
  onDayClick={(date) => {
    setModalDate(date);
    setModalOpen(true);
  }}
/>`}</Code>
                </Sub>
            </Section>

            <Section title="Custom rendering">
                <P>
                    For total control of what each cell looks like, pass a render override. You still get the default
                    classes and click handler — combine them with whatever extra UI you want.
                </P>
                <PropTable
                    rows={[
                        {
                            prop: "renderDay",
                            type: "(info) => ReactNode",
                            desc: (
                                <>
                                    <C>info</C> has <C>date</C>, <C>muted</C>, <C>isToday</C>, <C>isSelected</C>,{" "}
                                    <C>inRange</C>, <C>event</C>, <C>defaultClassName</C>, and{" "}
                                    <C>handleClick</C>.
                                </>
                            ),
                        },
                        {
                            prop: "renderMonth",
                            type: "(info) => ReactNode",
                            desc: (
                                <>
                                    For the <C>year</C> grid. Receives <C>index</C>, <C>name</C>, <C>isCurrent</C>,{" "}
                                    <C>isHighlighted</C>, <C>defaultClassName</C>.
                                </>
                            ),
                        },
                        {
                            prop: "renderAgendaItem",
                            type: "(info) => ReactNode",
                            desc: <>For agenda rows. Receives <C>item</C>, <C>index</C>, <C>defaultClassName</C>.</>,
                        },
                    ]}
                />
                <Code>{`<Calendar
  variant="month"
  renderDay={({ date, defaultClassName, event }) => (
    <button
      type="button"
      className={defaultClassName + " relative"}
      onClick={() => openDetails(date)}
    >
      {date.getDate()}
      {event && (
        <span className="absolute bottom-1 size-1 rounded-full bg-rose-500" />
      )}
    </button>
  )}
/>`}</Code>
            </Section>

            <Section title="Events and ranges">
                <Bullets
                    items={[
                        <>
                            <C>events</C> accepts an array of <C>{"{ date, label?, color?, meta? }"}</C>. Days with an
                            event get a tinted background; <C>color</C> overrides the accent for that day.
                        </>,
                        <>
                            <C>range</C> is purely visual highlight: <C>{"{ start, end }"}</C>. You manage range
                            selection in your own state.
                        </>,
                        <>
                            <C>selected</C> highlights one cell. The component never sets state itself — keep your own
                            <C>useState</C> and update it from <C>onDayClick</C>.
                        </>,
                        <>
                            <C>weekStartsOn</C> (0=Sun, 1=Mon) and <C>weekdays</C> (custom 7-string array) control the
                            header row.
                        </>,
                    ]}
                />
            </Section>
        </>
    );
}

function AudioPlayerGuide() {
    return (
        <>
            <Section title="Two ways to drive playback">
                <Bullets
                    items={[
                        <>
                            <strong>Autonomous</strong> — pass <C>src</C> and the component renders a hidden{" "}
                            <C>{"<audio>"}</C>, tracks time via native events, and lets you seek by clicking the progress
                            bar / waveform.
                        </>,
                        <>
                            <strong>Controlled</strong> — pass <C>playing</C>, <C>progress</C>, <C>currentTime</C>,{" "}
                            <C>duration</C> and handle <C>onPlayPauseToggle</C>, <C>onSeek</C>. Useful for demos with no
                            real audio, or when you orchestrate playback from a global store.
                        </>,
                        <>
                            <strong>Hybrid</strong> — pass <C>src</C> and selectively override any display prop. The
                            override wins.
                        </>,
                    ]}
                />
            </Section>

            <Section title="Playback API">
                <PropTable
                    rows={[
                        { prop: "src", type: "string", desc: "Audio URL. When set, renders a real <audio> and manages playback." },
                        { prop: "loop", type: "boolean", desc: "Loop natively." },
                        { prop: "autoPlay", type: "boolean", desc: "Try to autoplay on mount (subject to browser policy)." },
                        { prop: "volume", type: "number (0..1)", desc: "Clamped and applied to the underlying element." },
                        { prop: "muted", type: "boolean", desc: "Mute natively." },
                        { prop: "preload", type: '"none" | "metadata" | "auto"', desc: "Default 'metadata'." },
                        { prop: "onEnded / onTimeUpdate / onPlayingChange", type: "callbacks", desc: "Native lifecycle, surfaced." },
                    ]}
                />
            </Section>

            <Section title="Playlist variant">
                <P>
                    <C>tracks</C> accepts <C>{"{ id, title, duration?, src? }"}</C>. Selecting a track swaps the source
                    automatically. <C>defaultActiveTrackId</C> = uncontrolled, <C>activeTrackId</C> = controlled.
                </P>
                <Code>{`<AudioPlayer
  variant="playlist"
  defaultActiveTrackId={1}
  tracks={[
    { id: 1, title: "Intro", src: "/audio/01.mp3", duration: "0:42" },
    { id: 2, title: "Body", src: "/audio/02.mp3", duration: "3:18" },
  ]}
  onSelectTrack={(id) => analytics.track("track-changed", { id })}
/>`}</Code>
            </Section>
        </>
    );
}

function VideoPlayerGuide() {
    return (
        <>
            <Section title="Playback API">
                <P>
                    Mirrors the audio player. Pass <C>src</C> for autonomous mode, or feed{" "}
                    <C>playing</C>/<C>progress</C>/<C>currentTime</C>/<C>duration</C> + callbacks for controlled mode.
                </P>
                <PropTable
                    rows={[
                        { prop: "src", type: "string", desc: "Video URL. Drives a real <video>." },
                        { prop: "poster", type: "string | ReactNode", desc: "Fallback shown only when no `src` is provided." },
                        { prop: "controls", type: "boolean", desc: "Show Diamond's built-in chrome (overlay play + bottom bar). Default true." },
                        { prop: "objectFit", type: '"cover" | "contain"', desc: "Default 'cover'." },
                        { prop: "playsInline", type: "boolean", desc: "Inline playback on iOS Safari. Default true." },
                        { prop: "muted / volume / loop / autoPlay / preload", type: "—", desc: "All mapped onto the native element." },
                    ]}
                />
            </Section>

            <Section title="Variant-specific props">
                <Bullets
                    items={[
                        <><strong>live</strong> — <C>liveCount</C> shows e.g. "2.4k watching" in the corner.</>,
                        <>
                            <strong>rec</strong> — <C>recording</C> toggles the REC pulse, <C>tag</C> renders top-right
                            metadata (e.g. "4K · 60FPS").
                        </>,
                        <>
                            <strong>editorial</strong> — pair <C>title</C> + <C>subtitle</C> over a gradient mask.
                        </>,
                        <>
                            <strong>portrait</strong> — pass <C>sideActions</C>{" "}
                            (<C>{"{ id, icon, onClick?, label? }[]"}</C>) for vertical react / comment / share buttons.
                        </>,
                        <>
                            <strong>accent</strong> — <C>speeds</C> drives the speed switcher; each entry can have a{" "}
                            <C>rate</C> (multiplier applied to <C>playbackRate</C>). Use{" "}
                            <C>defaultSpeedId</C> or <C>activeSpeedId</C> + <C>onSpeedChange</C>.
                        </>,
                    ]}
                />
            </Section>

            <Section title="Fullscreen">
                <P>
                    Clicking the corner expander uses <C>document.requestFullscreen</C> on the carousel root — you don't
                    need to wire anything. Works on desktop browsers; iOS Safari falls back to native video chrome.
                </P>
            </Section>
        </>
    );
}

function KanbanGuide() {
    return (
        <>
            <Section title="State management">
                <P>
                    Hybrid controlled/uncontrolled. Pass <C>defaultColumns</C> for a self-managed board, or{" "}
                    <C>columns</C> + <C>onColumnsChange</C> when you want to persist to a backend.
                </P>
                <Code>{`const [columns, setColumns] = useState<KanbanColumn[]>(initial);

<Kanban
  variant="classic"
  columns={columns}
  onColumnsChange={(next) => {
    setColumns(next);
    fetch("/api/board", { method: "PUT", body: JSON.stringify(next) });
  }}
/>`}</Code>
            </Section>

            <Section title="Built-in interactions">
                <Bullets
                    items={[
                        <>HTML5 native drag-and-drop between and within columns. Drop on a card inserts before it; drop on empty zone goes to the end.</>,
                        <>Inline <C>+ Add card</C> at the bottom of each column. Disable with <C>allowAdd=false</C>.</>,
                        <>Click a card title to edit inline (Enter saves, Escape cancels). Hover shows an X to remove. Disable with <C>allowEdit=false</C>.</>,
                        <>Drag disabled per-variant: <C>two-col</C> uses quick-move buttons instead.</>,
                    ]}
                />
            </Section>

            <Section title="Variant behaviors">
                <PropTable
                    rows={[
                        { prop: "classic / compact", type: "—", desc: "Generic DnD board. Compact = denser visuals, 4 columns." },
                        { prop: "active", type: "—", desc: "Highlights the first non-empty column statically. Override per column with `column.active=true`." },
                        { prop: "two-col", type: "—", desc: "DnD off; each card has ← Back / Next → buttons in the footer. First column's Next renders as 'Finish'." },
                        { prop: "tasks", type: "—", desc: "Animated checkbox + per-column 'n/N' progress bar. Toggle done with the checkbox." },
                        { prop: "priority", type: "—", desc: "Per-column WIP `limit`. Badge turns yellow at limit, red over. Drop past limit shakes and blocks. Cards can have `urgent` (pulsing border) and `due` (badge)." },
                    ]}
                />
            </Section>

            <Section title="Card shape">
                <Code>{`interface KanbanCard {
  id: React.Key;
  title: React.ReactNode;
  description?: React.ReactNode;
  color?: string;         // left-border accent
  done?: boolean;         // tasks variant
  urgent?: boolean;       // priority variant
  due?: ReactNode;        // priority variant
  leading?: ReactNode;    // custom left slot
  trailing?: ReactNode;   // custom right slot
}`}</Code>
            </Section>
        </>
    );
}

function PricingGuide() {
    return (
        <>
            <Section title="Single vs stacked">
                <P>
                    <C>tier</C> renders one card; <C>tiers</C> renders a stacked list. Most variants use{" "}
                    <C>tier</C>; only <C>stacked</C> uses <C>tiers</C>.
                </P>
            </Section>

            <Section title="Click handlers">
                <Bullets
                    items={[
                        <>
                            <C>tier.onCta</C> — fires when the in-card CTA button is clicked.
                        </>,
                        <>
                            <C>onSelect</C> — fires when the entire card is clicked (single-tier variants). Adds focus
                            ring, hover lift, and keyboard activation.
                        </>,
                        <>
                            <C>onSelectTier</C> (<C>stacked</C>) — fires when a row is clicked. Combine with{" "}
                            <C>defaultSelectedTierId</C> or <C>selectedTierId</C>.
                        </>,
                        <>
                            <C>onSelectionCta</C> (<C>stacked</C>) — when set, a Continue-with-<em>plan</em> button
                            appears below the list. Receives the chosen tier.
                        </>,
                        <>
                            <C>onBillingChange</C> (<C>toggle</C>) — fires when the period switch changes.
                        </>,
                    ]}
                />
            </Section>

            <Section title="Reactive billing toggle">
                <P>
                    For the <C>toggle</C> variant, give each tier a <C>prices</C> and (optionally) <C>periods</C> map
                    keyed by billing id. The displayed price cross-fades when the user switches.
                </P>
                <Code>{`<Pricing
  variant="toggle"
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
    features: ["Unlimited projects", "Priority support"],
    ctaLabel: "Start trial",
    onCta: () => router.push("/signup"),
  }}
/>`}</Code>
            </Section>
        </>
    );
}

function CarouselGuide() {
    return (
        <>
            <Section title="Navigation">
                <Bullets
                    items={[
                        <>
                            Click <strong>arrows</strong> (variant <C>arrows</C>), <strong>dots</strong> (variants{" "}
                            <C>dots</C> / <C>cards</C>), or <strong>thumbnails</strong> / <strong>circular swatches</strong>{" "}
                            to jump to any slide.
                        </>,
                        <>
                            <strong>Drag / swipe</strong> works on mouse and touch on all transform-based variants.
                            Disable with <C>draggable={"{false}"}</C>; tweak the commit distance with{" "}
                            <C>dragThreshold</C>.
                        </>,
                        <>
                            <strong>Keyboard</strong> — left/right arrow keys when the carousel root has focus. Disable
                            with <C>keyboard={"{false}"}</C>.
                        </>,
                    ]}
                />
            </Section>

            <Section title="Autoplay">
                <P>
                    <C>autoplay={"{ms}"}</C> advances every N ms. The interval pauses automatically while the pointer is
                    over the carousel and while the user is dragging. Disable hover-pause with{" "}
                    <C>pauseOnHover={"{false}"}</C>.
                </P>
            </Section>

            <Section title="Layout">
                <PropTable
                    rows={[
                        { prop: "slidesPerView", type: "number", desc: "Default 1 (most variants), 2.4 on cards for a 'peek' of the next slide." },
                        { prop: "loop", type: "boolean", desc: "Default true. When false, the first/last arrows render disabled at the edge." },
                        { prop: "aspect", type: "CSS aspect-ratio", desc: "Default '16 / 9'. Ignored on cards (slides keep their intrinsic height)." },
                        { prop: "gap", type: "number (px)", desc: "Space between slides. Default 8." },
                    ]}
                />
            </Section>

            <Section title="Controlled current slide">
                <Code>{`const [i, setI] = useState(0);

<Carousel
  variant="arrows"
  index={i}
  onIndexChange={setI}
  slides={slides}
/>`}</Code>
            </Section>
        </>
    );
}

function AccordionGuide() {
    return (
        <>
            <Section title="Single vs multi-expand">
                <P>
                    Default behavior: clicking an item collapses the others. Pass <C>multiple</C> to let any number be
                    open at once.
                </P>
            </Section>
            <Section title="State">
                <Bullets
                    items={[
                        <>
                            Uncontrolled: <C>defaultValue=["id-a", "id-b"]</C> or per-item <C>defaultOpen</C>.
                        </>,
                        <>
                            Controlled: <C>value</C> + <C>onValueChange</C> with an array of ids.
                        </>,
                        <>
                            Set <C>disabled</C> on a single item to make it non-interactive.
                        </>,
                    ]}
                />
            </Section>
            <Section title="Item shape">
                <Code>{`interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  leading?: ReactNode;   // trigger left slot
  trailing?: ReactNode;  // trigger right slot
  defaultOpen?: boolean;
  disabled?: boolean;
}`}</Code>
            </Section>
        </>
    );
}

function ButtonGuide() {
    return (
        <>
            <Section title="Slots & states">
                <Bullets
                    items={[
                        <>
                            <C>leftIcon</C> / <C>rightIcon</C> — adornments. Use Phosphor icons sized 14-16px to match
                            text.
                        </>,
                        <>
                            <C>loading</C> — replaces icons with a spinner, sets <C>aria-busy</C>, and forces{" "}
                            <C>disabled</C> visually + interactively.
                        </>,
                        <>
                            <C>asChild</C> — render as another element (e.g. <C>{"<Link>"}</C>) while keeping all the
                            styles.
                        </>,
                        <>
                            Native props (<C>type</C>, <C>name</C>, <C>form</C>, <C>onClick</C>, <C>aria-*</C>) pass
                            straight through.
                        </>,
                    ]}
                />
            </Section>
            <Section title="Composing with Next.js Link">
                <Code>{`<Button asChild variant="solid">
  <Link href="/pricing">See pricing →</Link>
</Button>`}</Code>
            </Section>
        </>
    );
}

function BadgeGuide() {
    return (
        <Section title="Floating badges">
            <P>
                Set <C>floating</C> to overlay the badge on a parent. Wrap your icon in a relative container and place
                the Badge inside.
            </P>
            <Code>{`<div className="relative inline-block">
  <Inbox size={24} />
  <Badge variant="count" floating>8</Badge>
</div>`}</Code>
        </Section>
    );
}

function ChipGuide() {
    return (
        <>
            <Section title="Filter vs dismissible">
                <Bullets
                    items={[
                        <>
                            <strong>filter</strong> — pass <C>active</C> + <C>onClick</C> to toggle.
                        </>,
                        <>
                            <strong>dismissible</strong> — pass <C>onDismiss</C> to render an inline X.
                        </>,
                        <>
                            <C>size</C> accepts <C>"sm" | "md" | "lg"</C>.
                        </>,
                    ]}
                />
            </Section>
        </>
    );
}

function TagGuide() {
    return (
        <Section title="When to use">
            <P>
                Tag is purely visual — for labels on cards, status pills, taxonomies. If you need interactivity (filter,
                dismiss, click), reach for <C>Chip</C> instead.
            </P>
        </Section>
    );
}

function KbdGuide() {
    return (
        <Section title="Shortcuts & clusters">
            <P>
                For multi-key shortcuts, render one Kbd per key inside a flex row:
            </P>
            <Code>{`<div className="flex gap-1">
  <Kbd variant="shortcut">⌘</Kbd>
  <Kbd variant="shortcut">K</Kbd>
</div>`}</Code>
            <P>
                The <C>cluster</C> variant fits compact key grids (e.g. WASD).
            </P>
        </Section>
    );
}

function AvatarGuide() {
    return (
        <>
            <Section title="Image vs initials">
                <P>
                    Pass children for initials, or pass an image via <C>src</C>. Without <C>src</C>, children render as
                    centered initials. Background color can be overridden per-instance with <C>bg</C>.
                </P>
            </Section>
            <Section title="Status indicators">
                <P>
                    The <C>status</C> variant adds a corner dot. Use <C>statusColor</C> for a custom hex/oklch color.
                </P>
            </Section>
        </>
    );
}

function AvatarGroupGuide() {
    return (
        <Section title="Stack semantics">
            <Bullets
                items={[
                    <>
                        <C>max</C> — how many avatars to show before collapsing.
                    </>,
                    <>
                        <C>total</C> — used in the <C>+N</C> overflow label. Defaults to{" "}
                        <C>items.length</C>.
                    </>,
                    <>
                        <C>items</C> uses the same shape as Avatar children — pass <C>{"{ label, src?, bg? }"}</C>{" "}
                        per item.
                    </>,
                ]}
            />
        </Section>
    );
}

function CardGuide() {
    return (
        <>
            <Section title="Slots per variant">
                <Bullets
                    items={[
                        <>
                            <strong>hero / horizontal</strong> — <C>media</C>, <C>meta</C>, <C>title</C>,{" "}
                            <C>description</C>.
                        </>,
                        <>
                            <strong>editorial</strong> — <C>meta</C>, <C>title</C>, <C>description</C>, <C>footer</C>.
                        </>,
                        <>
                            <strong>feature / metric</strong> — <C>meta</C>, <C>title</C>, <C>description</C>.
                        </>,
                        <>
                            <strong>social</strong> — accepts arbitrary <C>children</C>. Build your own layout inside.
                        </>,
                    ]}
                />
            </Section>
            <Section title="Click-to-act cards">
                <P>
                    For an entirely clickable card, wrap the Card in a button or anchor and set{" "}
                    <C>className="block w-full text-left"</C>.
                </P>
            </Section>
        </>
    );
}

function ChatBubbleGuide() {
    return (
        <>
            <Section title="Sides and groups">
                <P>
                    <C>side="them"</C> (default) or <C>side="me"</C> mirrors the bubble. Wrap a thread in{" "}
                    <C>ChatBubbleGroup</C> for consistent spacing and the iOS-style group corners.
                </P>
            </Section>
            <Section title="Media bubbles">
                <P>
                    The <C>media</C> variant uses <C>media</C> + <C>mediaCaption</C> instead of <C>children</C>.
                </P>
            </Section>
        </>
    );
}

function CodeBlockGuide() {
    return (
        <>
            <Section title="Code source">
                <Bullets
                    items={[
                        <>
                            <C>code</C> — plain string. Required for <C>numbered</C> (line splitting) and{" "}
                            <C>terminal</C> / <C>output</C> rendering.
                        </>,
                        <>
                            <C>children</C> — custom rendered JSX (e.g. highlighted by Shiki). Wins over <C>code</C>.
                        </>,
                        <>
                            <C>diff</C> — array of <C>{"{ kind: 'add' | 'remove' | 'context', content }"}</C> for the{" "}
                            <C>diff</C> variant.
                        </>,
                    ]}
                />
            </Section>
            <Section title="Copy to clipboard">
                <P>
                    Set <C>copyable</C> to render a Copy button in the header. Default behavior writes <C>code</C> to{" "}
                    <C>navigator.clipboard</C>. Override with <C>onCopy</C> for custom serialization.
                </P>
            </Section>
        </>
    );
}

function DataGridGuide() {
    return (
        <>
            <Section title="Composition">
                <Bullets
                    items={[
                        <>
                            <C>columns</C> + <C>rows</C> for flat lists. <C>columns</C> entries can supply{" "}
                            <C>render(row, i)</C> for custom cells and <C>bar(row)</C> (returns 0-100) for inline bar
                            charts.
                        </>,
                        <>
                            <C>groups</C> for the <C>grouped</C> variant — each group has <C>label</C> +{" "}
                            <C>rows</C> + <C>collapsed?</C>.
                        </>,
                        <>
                            <C>toolbar</C> and <C>pagination</C> are slot ReactNodes — provide your own controls and the
                            grid renders them in the chrome.
                        </>,
                    ]}
                />
            </Section>
            <Section title="Selection">
                <P>
                    Pass <C>selectedIds</C> (a <C>Set</C>) + <C>onSelectionChange</C> for the <C>bulk</C> variant.{" "}
                    <C>rowId(row)</C> tells the grid how to key each row.
                </P>
            </Section>
        </>
    );
}

function ImageGuide() {
    return (
        <Section title="Sources">
            <P>
                Pass <C>src</C> to render a native <C>{"<img>"}</C>, or <C>placeholder</C> with any ReactNode (gradient,
                SVG, blurhash). <C>placeholder</C> renders behind the image and shows when <C>src</C> fails to load.
            </P>
            <P>
                <C>caption</C> renders inside the frame on the <C>caption</C> / <C>overlay</C> variants, and below the
                image on others. Use <C>filter</C> for a CSS filter string (e.g. "grayscale(1) contrast(1.1)").
            </P>
        </Section>
    );
}

function ListGuide() {
    return (
        <>
            <Section title="Item shape">
                <Code>{`interface ListItem {
  label: ReactNode;
  description?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  href?: string;       // renders the row as <a>
  onClick?: () => void;
}`}</Code>
            </Section>
            <Section title="Variants">
                <Bullets
                    items={[
                        <>
                            <strong>default / rich</strong> — generic vertical list. Rich adds avatars + descriptions.
                        </>,
                        <>
                            <strong>numbered</strong> — auto-increments via <C>::marker</C>.
                        </>,
                        <>
                            <strong>terminal</strong> — monospace, dark tones; good for command lists or logs.
                        </>,
                        <>
                            <strong>editorial</strong> — large serif, single column.
                        </>,
                        <>
                            <strong>toggles</strong> — designed to host trailing <C>{"<input type='checkbox'>"}</C>.
                        </>,
                    ]}
                />
            </Section>
        </>
    );
}

function ListItemGuide() {
    return (
        <Section title="When to use ListItem vs List">
            <P>
                <C>List</C> renders a homogeneous array. <C>ListItem</C> is the same building block exposed standalone
                — reach for it when each item needs different markup or wrapper.
            </P>
        </Section>
    );
}

function StatisticGuide() {
    return (
        <>
            <Section title="Variants by use-case">
                <Bullets
                    items={[
                        <><strong>kpi</strong> — single metric + delta arrow. Pass <C>{"delta={ dir, text }"}</C>.</>,
                        <><strong>paired</strong> / <strong>grid</strong> — array of <C>entries</C> with <C>label</C> + <C>value</C>.</>,
                        <><strong>dark</strong> — high-contrast card with an inline <C>sparkline</C> (number array).</>,
                        <><strong>progress</strong> — <C>progress</C> (0-100) drives the bar; <C>status</C> + <C>goal</C> render the labels.</>,
                        <><strong>large</strong> — display headline for hero stats.</>,
                    ]}
                />
            </Section>
        </>
    );
}

function TableGuide() {
    return (
        <>
            <Section title="Data-driven vs composition">
                <Bullets
                    items={[
                        <>
                            Pass <C>columns</C> + <C>rows</C> for the data-driven mode. Each column can supply{" "}
                            <C>render(row, i)</C> and <C>align</C>.
                        </>,
                        <>
                            Pass <C>children</C> for full composition — write your own <C>{"<thead>"}</C>/
                            <C>{"<tbody>"}</C> markup; the wrapper still applies the variant's styling.
                        </>,
                        <>
                            <C>bordered</C> wraps the table in a rounded border container for the basic variant.
                        </>,
                    ]}
                />
            </Section>
            <Section title="Empty state">
                <P>
                    Pass <C>empty</C> to render a placeholder row when <C>rows</C> is empty.
                </P>
            </Section>
        </>
    );
}

function TimelineGuide() {
    return (
        <>
            <Section title="Event shape">
                <Code>{`interface TimelineEvent {
  title: ReactNode;
  description?: ReactNode;
  time?: ReactNode;
  done?: boolean;       // milestone variant
  marker?: ReactNode;   // override the dot (e.g. an Avatar)
}`}</Code>
            </Section>
            <Section title="Variants">
                <Bullets
                    items={[
                        <>
                            <strong>vertical / milestone / log / historical / activity</strong> — single-column
                            timelines with different chrome.
                        </>,
                        <>
                            <strong>horizontal</strong> — top-to-bottom flow. Pass <C>progress</C> (0..1) to fill the
                            connector up to that fraction.
                        </>,
                    ]}
                />
            </Section>
        </>
    );
}

function GlobalsGuide() {
    return (
        <>
            <Section title="What this is">
                <P>
                    <C>globals</C> isn't a component — it's a CSS-variable theme that the CLI patches into your
                    project's main stylesheet (typically <C>config.tailwind.css</C>). Every other Diamond component
                    reads these vars at runtime.
                </P>
            </Section>
            <Section title="Installing a theme">
                <Code>{`# default theme
npx @rueda.dev/gems-diamond add globals

# any other theme
npx @rueda.dev/gems-diamond add globals --theme kepler
# or the shorthand flag
npx @rueda.dev/gems-diamond add globals --kepler`}</Code>
                <P>
                    Reinstalling with a different theme <strong>replaces</strong> the previous block in-place. Themes
                    are dual-mode: each declares a <C>:root</C> block for light and a <C>:root.dark</C> block for dark.
                </P>
            </Section>
            <Section title="Canonical CSS variables">
                <Bullets
                    items={[
                        <><C>--diamond-accent</C> / <C>--diamond-on-accent</C> — brand color + readable text on top.</>,
                        <><C>--diamond-accent-soft</C> / <C>--diamond-accent-deep</C> — softer / deeper shades.</>,
                        <><C>--diamond-surface</C> / <C>--diamond-surface-alt</C> — neutral backgrounds.</>,
                        <><C>--diamond-ink</C> / <C>--diamond-muted</C> — text colors.</>,
                        <><C>--diamond-border</C> — divider color.</>,
                        <><C>--diamond-gradient</C> — optional gradient blob token.</>,
                    ]}
                />
            </Section>
        </>
    );
}

/* ─── Router ──────────────────────────────────────────────────────────────── */

const guides: Record<string, () => React.ReactNode> = {
    calendar: CalendarGuide,
    "audio-player": AudioPlayerGuide,
    "video-player": VideoPlayerGuide,
    kanban: KanbanGuide,
    pricing: PricingGuide,
    carousel: CarouselGuide,
    accordion: AccordionGuide,
    button: ButtonGuide,
    badge: BadgeGuide,
    chip: ChipGuide,
    tag: TagGuide,
    kbd: KbdGuide,
    avatar: AvatarGuide,
    "avatar-group": AvatarGroupGuide,
    card: CardGuide,
    "chat-bubble": ChatBubbleGuide,
    "code-block": CodeBlockGuide,
    "data-grid": DataGridGuide,
    image: ImageGuide,
    list: ListGuide,
    "list-item": ListItemGuide,
    statistic: StatisticGuide,
    table: TableGuide,
    timeline: TimelineGuide,
    globals: GlobalsGuide,
};

export default function UsageGuide({ componentId }: Props) {
    const Guide = guides[componentId];
    return (
        <div className="mt-16 border-[var(--diamond-border)] border-t pt-4">
            <p className="mb-1 font-mono text-[10px] text-[var(--diamond-muted)] uppercase tracking-[0.16em]">
                Usage Guide
            </p>
            <p className="mb-6 max-w-prose text-[14px] text-[var(--diamond-muted)]">
                How to wire up this component in your app — props, callbacks, customization, and the conventions Diamond
                shares across the library.
            </p>
            {Guide && <Guide />}
            <UniversalNote />
        </div>
    );
}
