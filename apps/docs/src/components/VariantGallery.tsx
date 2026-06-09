import { Accordion } from "@diamond/registry/accordion/accordion";
import { Alert } from "@diamond/registry/alert/alert";
import { AlertDialog } from "@diamond/registry/alert-dialog/alert-dialog";
import { AspectRatio } from "@diamond/registry/aspect-ratio/aspect-ratio";
import { AudioPlayer } from "@diamond/registry/audio-player/audio-player";
import { Autocomplete } from "@diamond/registry/autocomplete/autocomplete";
import { Avatar } from "@diamond/registry/avatar/avatar";
import { AvatarGroup } from "@diamond/registry/avatar-group/avatar-group";
import { Badge } from "@diamond/registry/badge/badge";
import { BottomNavigation } from "@diamond/registry/bottom-navigation/bottom-navigation";
import { BottomSheet } from "@diamond/registry/bottom-sheet/bottom-sheet";
import { Box } from "@diamond/registry/box/box";
import { Breadcrumbs } from "@diamond/registry/breadcrumbs/breadcrumbs";
import { Button } from "@diamond/registry/button/button";
import { Calendar } from "@diamond/registry/calendar/calendar";
import { Card as DiamondCard } from "@diamond/registry/card/card";
import { Carousel } from "@diamond/registry/carousel/carousel";
import { Center } from "@diamond/registry/center/center";
import { ChatBubble, ChatBubbleGroup } from "@diamond/registry/chat-bubble/chat-bubble";
import { Chart } from "@diamond/registry/chart/chart";
import { Checkbox } from "@diamond/registry/checkbox/checkbox";
import { Chip } from "@diamond/registry/chip/chip";
import { CodeBlock } from "@diamond/registry/code-block/code-block";
import { ColorPicker } from "@diamond/registry/color-picker/color-picker";
import { CommandPalette } from "@diamond/registry/command-palette/command-palette";
import { ConfirmDialog } from "@diamond/registry/confirm-dialog/confirm-dialog";
import { Container } from "@diamond/registry/container/container";
import { ContextMenu } from "@diamond/registry/context-menu/context-menu";
import { CookieBanner } from "@diamond/registry/cookie-banner/cookie-banner";
import { DataGrid } from "@diamond/registry/data-grid/data-grid";
import { DatePicker } from "@diamond/registry/date-picker/date-picker";
import { DateRangePicker } from "@diamond/registry/date-range-picker/date-range-picker";
import { Dialog } from "@diamond/registry/dialog/dialog";
import { Divider } from "@diamond/registry/divider/divider";
import { Drawer } from "@diamond/registry/drawer/drawer";
import { DropdownMenu } from "@diamond/registry/dropdown-menu/dropdown-menu";
import { Dropzone } from "@diamond/registry/dropzone/dropzone";
import { EmptyState } from "@diamond/registry/empty-state/empty-state";
import { ErrorState } from "@diamond/registry/error-state/error-state";
import { Fieldset } from "@diamond/registry/fieldset/fieldset";
import { FileInput } from "@diamond/registry/file-input/file-input";
import { Flex } from "@diamond/registry/flex/flex";
import { Form } from "@diamond/registry/form/form";
import { FormError, FormField, FormHelper, FormLabel } from "@diamond/registry/form-field/form-field";
import { Grid } from "@diamond/registry/grid/grid";
import { GridItem } from "@diamond/registry/grid-item/grid-item";
import { Heading } from "@diamond/registry/heading/heading";
import { Image } from "@diamond/registry/image/image";
import { Input } from "@diamond/registry/input/input";
import { Kanban } from "@diamond/registry/kanban/kanban";
import { Kbd } from "@diamond/registry/kbd/kbd";
import { LanguageSwitcher } from "@diamond/registry/language-switcher/language-switcher";
import { Lightbox } from "@diamond/registry/lightbox/lightbox";
import { Link as DiamondLink } from "@diamond/registry/link/link";
import { List } from "@diamond/registry/list/list";
import { ListItem } from "@diamond/registry/list-item/list-item";
import { Map as DiamondMap } from "@diamond/registry/map/map";
import { MegaMenu } from "@diamond/registry/mega-menu/mega-menu";
import { Menu as DiamondMenu } from "@diamond/registry/menu/menu";
import { MultiSelect } from "@diamond/registry/multi-select/multi-select";
import { Navbar } from "@diamond/registry/navbar/navbar";
import { NotificationCenter } from "@diamond/registry/notification-center/notification-center";
import { NotificationDot } from "@diamond/registry/notification-dot/notification-dot";
import { OfflineIndicator } from "@diamond/registry/offline-indicator/offline-indicator";
import { OTPInput } from "@diamond/registry/otp-input/otp-input";
import { Pagination } from "@diamond/registry/pagination/pagination";
import { Paragraph } from "@diamond/registry/paragraph/paragraph";
import { PDFViewer } from "@diamond/registry/pdf-viewer/pdf-viewer";
import { Popconfirm } from "@diamond/registry/popconfirm/popconfirm";
import { Popover } from "@diamond/registry/popover/popover";
import { Pricing } from "@diamond/registry/pricing/pricing";
import { Progress } from "@diamond/registry/progress/progress";
import { QRCode } from "@diamond/registry/qr-code/qr-code";
import { Radio } from "@diamond/registry/radio/radio";
import { Rating } from "@diamond/registry/rating/rating";
import { RichTextEditor } from "@diamond/registry/rich-text-editor/rich-text-editor";
import { Scrollspy } from "@diamond/registry/scrollspy/scrollspy";
import { Select } from "@diamond/registry/select/select";
import { SignaturePad } from "@diamond/registry/signature-pad/signature-pad";
import { Sidebar } from "@diamond/registry/sidebar/sidebar";
import { Skeleton } from "@diamond/registry/skeleton/skeleton";
import { SkipLink } from "@diamond/registry/skip-link/skip-link";
import { Slider } from "@diamond/registry/slider/slider";
import { Spacer } from "@diamond/registry/spacer/spacer";
import { SplitPane } from "@diamond/registry/split-pane/split-pane";
import { Spinner } from "@diamond/registry/spinner/spinner";
import { Stack } from "@diamond/registry/stack/stack";
import { Statistic } from "@diamond/registry/statistic/statistic";
import { Stepper } from "@diamond/registry/stepper/stepper";
import { Switch } from "@diamond/registry/switch/switch";
import { Table } from "@diamond/registry/table/table";
import { Tabs } from "@diamond/registry/tabs/tabs";
import { Tag } from "@diamond/registry/tag/tag";
import { Textarea } from "@diamond/registry/textarea/textarea";
import { ThemeSwitcher } from "@diamond/registry/theme-switcher/theme-switcher";
import { TimePicker } from "@diamond/registry/time-picker/time-picker";
import { Timeline } from "@diamond/registry/timeline/timeline";
import { Toast, ToastProvider, useToast } from "@diamond/registry/toast/toast";
import { Tooltip, TooltipProvider } from "@diamond/registry/tooltip/tooltip";
import { Tour, TourCard } from "@diamond/registry/tour/tour";
import { TransferList } from "@diamond/registry/transfer-list/transfer-list";
import { TreeView } from "@diamond/registry/tree-view/tree-view";
import { Typography } from "@diamond/registry/typography/typography";
import { VideoPlayer } from "@diamond/registry/video-player/video-player";
import { VisuallyHidden } from "@diamond/registry/visually-hidden/visually-hidden";
import * as React from "react";

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

function LayoutCell({
    children,
    className,
    muted = false,
}: {
    children?: React.ReactNode;
    className?: string;
    muted?: boolean;
}) {
    return (
        <div
            className={`flex min-h-8 items-center justify-center rounded border border-[var(--diamond-border)] px-2 py-1 font-mono text-[11px] ${
                muted
                    ? "bg-[var(--diamond-surface)] text-[var(--diamond-muted)]"
                    : "bg-[color-mix(in_oklab,var(--diamond-accent)_14%,var(--diamond-surface))] text-[color-mix(in_oklab,var(--diamond-accent)_70%,var(--diamond-ink))]"
            } ${className ?? ""}`}
        >
            {children}
        </div>
    );
}

function LayoutLabel({ children }: { children: React.ReactNode }) {
    return (
        <span className="font-mono text-[10px] text-[var(--diamond-muted)] uppercase tracking-[0.12em]">
            {children}
        </span>
    );
}

const sampleParagraphs: Record<string, string> = {
    default: "Default body paragraph with comfortable leading and a quiet neutral tone.",
    editorial: "Editorial prose uses a warmer serif texture and a wider rhythm.",
    caption: "Secondary caption text for helper copy, timestamps, and metadata.",
    "drop-cap": "A drop-cap opens the paragraph with a deliberate editorial flourish.",
    mono: "docs.paragraph() returns a compact monotype block for technical notes.",
    "pull-quote": "A pull-quote paragraph draws the eye to a single thought.",
};

const headingText: Record<string, string> = {
    h1: "Display",
    h2: "Section title",
    h3: "Subsection",
    h4: "Small heading",
    h5: "Minor title",
    h6: "Overline",
};

function Live({ componentId, variant, label, extraProps }: LiveProps) {
    switch (componentId) {
        case "button":
            return (
                <Button variant={variant as never} {...(extraProps as React.HTMLAttributes<HTMLButtonElement>)}>
                    {label}
                </Button>
            );

        case "navbar": {
            const v = variant as "classic" | "tinted" | "search" | "commerce" | "pill" | "terminal";
            return (
                <div className="w-[320px]">
                    <Navbar
                        variant={v}
                        brand={v === "terminal" ? "~/diamond" : v === "pill" ? "Halo" : "Diamond"}
                        action={v === "commerce" ? "Bag (0)" : v === "pill" ? "Launch" : "Sign in"}
                        items={[
                            { label: v === "commerce" ? "Shop" : "Home", href: "/components", active: true },
                            { label: v === "commerce" ? "Journal" : "Docs", href: "/components" },
                            { label: "Pricing", href: "/components" },
                        ]}
                    />
                </div>
            );
        }

        case "sidebar": {
            const v = variant as "grouped" | "tinted" | "rail" | "workspace" | "editorial" | "counts";
            return (
                <Sidebar
                    variant={v}
                    brand={v === "workspace" ? "Workspace" : v === "editorial" ? "Journal" : "Diamond"}
                    items={[
                        {
                            label: v === "counts" ? "Inbox" : "Dashboard",
                            href: "/components",
                            active: true,
                            count: v === "counts" ? 12 : undefined,
                        },
                        { label: v === "counts" ? "Starred" : "Projects", href: "/components" },
                        {
                            label: v === "counts" ? "Snoozed" : "Team",
                            href: "/components",
                            count: v === "counts" ? 3 : undefined,
                        },
                        {
                            label: v === "editorial" ? "Archive" : "Settings",
                            href: "/components",
                            group: v === "grouped" || v === "workspace" ? "Account" : undefined,
                        },
                    ]}
                />
            );
        }

        case "bottom-navigation": {
            const v = variant as "labeled" | "icons" | "fab" | "active-pill" | "top-indicator" | "active-chip";
            return (
                <BottomNavigation
                    variant={v}
                    items={[
                        { label: "Home", icon: "H", href: "/components", active: v !== "fab" },
                        { label: "Search", icon: "S", href: "/components" },
                        { label: "Inbox", icon: "I", href: "/components" },
                        { label: "Me", icon: "M", href: "/components", active: v === "fab" },
                    ]}
                />
            );
        }

        case "breadcrumbs": {
            const v = variant as "slash" | "chevron" | "slab" | "filesystem" | "ellipsis" | "editorial";
            return (
                <div className="w-[280px]">
                    <Breadcrumbs
                        variant={v}
                        items={[
                            { label: "Home", href: "/components" },
                            { label: v === "filesystem" ? "work" : "Projects", href: "/components" },
                            { label: "Diamond", href: "/components" },
                            { label: v === "editorial" ? "Profile and Notifications" : "Settings" },
                        ]}
                    />
                </div>
            );
        }

        case "pagination": {
            const v = variant as "numbered" | "simple" | "circular" | "compact" | "jump" | "grouped";
            return <Pagination variant={v} page={3} totalPages={12} />;
        }

        case "tabs": {
            const v = variant as "underline" | "segmented" | "vertical" | "browser" | "pills" | "mono";
            return (
                <Tabs
                    variant={v}
                    defaultValue={v === "segmented" ? "week" : "overview"}
                    items={[
                        {
                            id: "overview",
                            label: v === "mono" ? "01 / Intro" : "Overview",
                            content: "Dashboard overview with key metrics.",
                        },
                        {
                            id: "week",
                            label: v === "segmented" ? "Week" : "Activity",
                            content: "Weekly trends and recent activity.",
                        },
                        {
                            id: "settings",
                            label: v === "browser" ? "Code" : "Settings",
                            content: "Preference controls.",
                        },
                    ]}
                />
            );
        }

        case "stepper": {
            const v = variant as "horizontal" | "vertical" | "progress" | "numbered" | "segmented" | "editorial";
            return (
                <Stepper
                    variant={v}
                    currentStep={v === "horizontal" ? 1 : 2}
                    steps={[
                        { label: "Account" },
                        { label: "Details", description: "Add profile details." },
                        { label: "Review", description: "Confirm choices." },
                        { label: "Done" },
                    ]}
                />
            );
        }

        case "link": {
            const v = variant as "default" | "icon" | "decorative" | "numbered" | "pill" | "editorial";
            return (
                <div className="flex flex-col gap-3">
                    <DiamondLink variant={v} href="/components" data-index="04 ">
                        {v === "editorial" ? "Read the passage" : label || "Open docs"}
                    </DiamondLink>
                    {v === "default" && (
                        <DiamondLink variant="default" href="/components">
                            Underlined link
                        </DiamondLink>
                    )}
                </div>
            );
        }

        case "menu": {
            const v = variant as "shortcut" | "grouped" | "accent" | "toggles" | "terminal" | "user";
            const menuItems =
                v === "toggles"
                    ? [
                          { label: "Notifications", checked: true },
                          { label: "Sounds", checked: false },
                          { label: "Auto-save", checked: true },
                      ]
                    : [
                          { label: "Open", icon: "O", shortcut: "Enter", group: v === "grouped" ? "File" : undefined },
                          { label: "Rename", icon: "R", shortcut: "F2" },
                          {
                              label: "Duplicate",
                              icon: "D",
                              shortcut: "Ctrl D",
                              group: v === "grouped" ? "Edit" : undefined,
                          },
                          { label: "Delete", icon: "X", danger: true },
                      ];
            return <DiamondMenu variant={v} header={v === "user" ? "Aria Chen" : undefined} items={menuItems} />;
        }

        case "dropdown-menu": {
            const v = variant as "sort" | "retro" | "searchable" | "pill" | "bulk" | "terminal";
            return (
                <div className="min-h-[170px]">
                    <DropdownMenu
                        variant={v}
                        defaultOpen
                        label={v === "bulk" ? "Bulk actions" : v === "terminal" ? "command" : "Sort"}
                        items={[{ label: "Newest", active: true }, { label: "Popular" }, { label: "A-Z" }]}
                    />
                </div>
            );
        }

        case "context-menu": {
            const v = variant as "standard" | "file" | "tinted" | "compact" | "share" | "git";
            return (
                <ContextMenu
                    variant={v}
                    defaultOpen
                    items={[
                        { label: v === "git" ? "git add" : "Copy", shortcut: "Ctrl C" },
                        { label: v === "share" ? "Share link" : "Rename" },
                        { label: v === "file" ? "Move file" : "Duplicate" },
                        { label: "Delete", danger: true },
                    ]}
                />
            );
        }

        case "mega-menu": {
            const v = variant as "saas" | "commerce" | "docs" | "solutions" | "editorial" | "icons";
            return (
                <MegaMenu
                    variant={v}
                    columns={[
                        {
                            title: v === "commerce" ? "Shop" : "Products",
                            items: [
                                { label: "Analytics", description: "Dashboards" },
                                { label: "Automation", description: "Workflows" },
                            ],
                        },
                        {
                            title: v === "docs" ? "Learn" : "Resources",
                            items: [{ label: "Docs" }, { label: "API" }, { label: "Guides" }],
                        },
                        { title: "Company", items: [{ label: "About" }, { label: "Pricing" }, { label: "Contact" }] },
                    ]}
                />
            );
        }

        case "tree-view": {
            const v = variant as "files" | "workspace" | "code" | "counts" | "org" | "phases";
            const nodes =
                v === "org"
                    ? [
                          { id: "engineering", label: "Engineering", expanded: true, count: 32 },
                          { id: "frontend", label: "Frontend", depth: 1, count: 8 },
                          { id: "backend", label: "Backend", depth: 1, count: 12 },
                          { id: "design", label: "Design", expanded: true, count: 6 },
                      ]
                    : v === "phases"
                      ? [
                            { id: "q1", label: "Q1 2026", expanded: true },
                            { id: "research", label: "Research", depth: 1, expanded: true },
                            { id: "discovery", label: "Discovery", depth: 2, selected: true },
                            { id: "build", label: "Build", depth: 1 },
                        ]
                      : [
                            { id: "src", label: "src", expanded: true },
                            { id: "components", label: "components", depth: 1, expanded: true },
                            {
                                id: "modal",
                                label: "Modal.tsx",
                                depth: 2,
                                selected: true,
                                count: v === "counts" ? 3 : undefined,
                            },
                            { id: "drawer", label: "Drawer.tsx", depth: 2 },
                            { id: "hooks", label: "hooks", depth: 1 },
                        ];
            return <TreeView variant={v} nodes={nodes} />;
        }

        case "scrollspy": {
            const v = variant as "rail" | "pills" | "dots" | "mono" | "badge" | "sliding";
            return (
                <Scrollspy
                    variant={v}
                    activeId={v === "badge" ? "faq" : "install"}
                    sections={[
                        {
                            id: "overview",
                            label: v === "mono" ? "01 intro" : "Overview",
                            content: "Short description here.",
                        },
                        { id: "install", label: v === "mono" ? "02 body" : "Install", content: "npm i @diamond/ui" },
                        { id: "faq", label: "FAQ", content: "Common questions and answers." },
                    ]}
                />
            );
        }

        case "skip-link": {
            const v = variant as "standard" | "centered" | "banner" | "outlined" | "multiple" | "annotation";
            return (
                <div className="relative min-h-[150px] w-[280px] overflow-hidden rounded-md bg-[var(--diamond-surface-alt)] p-4">
                    {v === "annotation" && (
                        <div className="bg-[var(--diamond-ink)] p-1.5 text-center font-mono text-[9px] text-[var(--diamond-surface)] uppercase tracking-[0.1em]">
                            Hidden until focused
                        </div>
                    )}
                    <SkipLink
                        variant={v}
                        href="#main"
                        targets={
                            v === "multiple"
                                ? [
                                      { label: "Content", href: "#main" },
                                      { label: "Navigation", href: "#nav" },
                                      { label: "Footer", href: "#footer" },
                                  ]
                                : undefined
                        }
                    >
                        {v === "centered" ? "Jump to content" : "Skip to main content"}
                    </SkipLink>
                    <div
                        id="main"
                        className="mt-12 rounded border border-[var(--diamond-border)] bg-[var(--diamond-surface)] p-3 text-[11px] text-[var(--diamond-muted)]"
                    >
                        Main content area begins here.
                    </div>
                </div>
            );
        }

        case "box": {
            const v = variant as "card" | "inverted" | "accent-rail" | "elevated" | "terminal" | "brutalist";
            if (v === "terminal") {
                return (
                    <Box variant={v}>
                        <div className="text-[var(--diamond-accent)]">$ ls layout/</div>
                        <div>drwxr-xr-x box</div>
                        <div>-rw-r--r-- 1.2k</div>
                    </Box>
                );
            }
            return (
                <Box variant={v}>
                    <div className="font-semibold text-[13px]">{label || v}</div>
                    <div className="mt-1 text-[11px] text-[var(--diamond-muted)]">A reusable layout surface.</div>
                </Box>
            );
        }

        case "container": {
            const v = variant as "small" | "medium" | "fluid" | "stepped" | "prose" | "ruled";
            return (
                <div className="w-[240px] rounded-md border border-[var(--diamond-border)] border-dashed py-3">
                    <Container variant={v}>
                        <div className="rounded bg-[var(--diamond-ink)] px-3 py-2 text-center font-mono text-[11px] text-[var(--diamond-surface)]">
                            {v === "prose" ? "65ch prose" : v === "fluid" ? "100% fluid" : `${v} width`}
                        </div>
                    </Container>
                    <div className="mt-2 text-center">
                        <LayoutLabel>{v}</LayoutLabel>
                    </div>
                </div>
            );
        }

        case "grid": {
            const v = variant as "three-col" | "four-col" | "fractional" | "auto-fit" | "twelve-col" | "masonry";
            const gridLabels =
                v === "four-col"
                    ? ["01", "02", "03", "04", "05", "06", "07", "08"]
                    : v === "twelve-col"
                      ? ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
                      : ["1", "2", "3", "4", "5", "6"];
            return (
                <div className="w-[240px]">
                    <Grid variant={v} className={v === "masonry" ? "auto-rows-[22px]" : ""}>
                        {gridLabels.map((item) => (
                            <LayoutCell
                                key={`${v}-${item}`}
                                className={
                                    v === "masonry" && (item === "1" || item === "5") ? "row-span-2 min-h-14" : ""
                                }
                            >
                                {v === "auto-fit" ? "auto" : item}
                            </LayoutCell>
                        ))}
                    </Grid>
                </div>
            );
        }

        case "grid-item": {
            const v = variant as "column-span" | "row-span" | "bento" | "explicit" | "area" | "featured";
            if (v === "area") {
                return (
                    <div
                        className="grid w-[240px] grid-cols-4 grid-rows-[repeat(3,28px)] gap-1"
                        style={{ gridTemplateAreas: '"h h h h" "s m m a" "s f f a"' }}
                    >
                        <GridItem area="h" variant="featured">
                            header
                        </GridItem>
                        <GridItem area="s">side</GridItem>
                        <GridItem area="m">main</GridItem>
                        <GridItem area="a">aside</GridItem>
                        <GridItem area="f" variant="featured">
                            footer
                        </GridItem>
                    </div>
                );
            }
            return (
                <div className="grid w-[240px] auto-rows-[32px] grid-cols-4 gap-1">
                    <GridItem variant={v}>
                        {v === "explicit" ? "2 / 4" : v === "featured" ? "featured" : "span"}
                    </GridItem>
                    {["1", "2", "3", "4", "5", "6", "7"].map((item) => (
                        <LayoutCell key={`grid-item-${item}`} muted>
                            {item}
                        </LayoutCell>
                    ))}
                </div>
            );
        }

        case "flex": {
            const v = variant as "row" | "space-between" | "column" | "wrap" | "center" | "baseline";
            const items = v === "wrap" ? ["React", "Vue", "Svelte", "Solid", "Astro"] : ["A", "B", "C"];
            return (
                <div className="w-[240px]">
                    <Flex variant={v}>
                        {items.map((item, i) => (
                            <LayoutCell key={item} className={v === "baseline" ? ["h-8", "h-14", "h-10"][i] : ""}>
                                {v === "space-between" && i === 0
                                    ? "Logo"
                                    : v === "space-between" && i === 1
                                      ? "Menu"
                                      : item}
                            </LayoutCell>
                        ))}
                    </Flex>
                </div>
            );
        }

        case "stack": {
            const v = variant as "tight" | "loose" | "horizontal" | "divided" | "indented" | "separated";
            return (
                <div className="w-[240px]">
                    <Stack variant={v}>
                        {["Title", "Subtitle", "Body text", "Meta"].map((item, i) => (
                            <LayoutCell key={item} muted={v === "divided" || v === "separated"}>
                                {v === "indented" ? `step ${i + 1}` : item}
                            </LayoutCell>
                        ))}
                    </Stack>
                </div>
            );
        }

        case "center": {
            const v = variant as "flex" | "crosshair" | "column" | "grid" | "absolute" | "margin";
            return (
                <div className="w-[220px]">
                    <Center variant={v}>
                        {v === "column" ? (
                            <>
                                <LayoutCell>A</LayoutCell>
                                <LayoutCell>B</LayoutCell>
                            </>
                        ) : (
                            <LayoutCell>{v}</LayoutCell>
                        )}
                    </Center>
                </div>
            );
        }

        case "divider": {
            const v = variant as "soft" | "strong" | "dashed" | "labeled" | "ornament" | "vertical";
            if (v === "vertical") {
                return (
                    <div className="flex h-20 items-stretch gap-3 text-[12px]">
                        <span>left</span>
                        <Divider variant={v} />
                        <span>mid</span>
                        <Divider variant={v} />
                        <span>right</span>
                    </div>
                );
            }
            return (
                <div className="w-[220px] space-y-3 text-[12px]">
                    <div className="text-[var(--diamond-muted)]">above</div>
                    <Divider variant={v} label={label || "OR"} />
                    <div className="text-[var(--diamond-muted)]">below</div>
                </div>
            );
        }

        case "spacer": {
            const v = variant as "fill" | "push-end" | "vertical-fill" | "scale" | "nav" | "between";
            if (v === "vertical-fill") {
                return (
                    <div className="flex h-28 w-[180px] flex-col rounded-md border border-[var(--diamond-border)] p-2">
                        <LayoutCell>top</LayoutCell>
                        <Spacer variant={v} />
                        <LayoutCell>bottom</LayoutCell>
                    </div>
                );
            }
            if (v === "scale") {
                return (
                    <div className="flex w-[180px] flex-col gap-2">
                        {[4, 16, 32].map((size) => (
                            <div key={size} className="flex items-center gap-2">
                                <LayoutLabel>{size}px</LayoutLabel>
                                <Spacer variant="scale" size={size} className="rounded bg-[var(--diamond-accent)]" />
                            </div>
                        ))}
                    </div>
                );
            }
            return (
                <div className="flex w-[240px] items-center rounded-md border border-[var(--diamond-border)] p-2">
                    <LayoutCell>A</LayoutCell>
                    <Spacer variant={v} className={v === "nav" ? "mx-2 min-h-8" : ""} />
                    <LayoutCell>{v === "push-end" ? "B" : "C"}</LayoutCell>
                </div>
            );
        }

        case "aspect-ratio": {
            const v = variant as "video" | "square" | "portrait" | "cinematic" | "photo" | "social";
            return (
                <div className="w-[220px]">
                    <AspectRatio variant={v} className="border border-[var(--diamond-border)]">
                        <div className="flex size-full items-center justify-center bg-[var(--diamond-ink)] text-[var(--diamond-surface)]">
                            <div className="text-center">
                                <div className="font-mono text-lg">
                                    {v === "video"
                                        ? "16:9"
                                        : v === "square"
                                          ? "1:1"
                                          : v === "portrait"
                                            ? "3:4"
                                            : v === "cinematic"
                                              ? "21:9"
                                              : v === "photo"
                                                ? "3:2"
                                                : "4:5"}
                                </div>
                                <LayoutLabel>{v}</LayoutLabel>
                            </div>
                        </div>
                    </AspectRatio>
                </div>
            );
        }

        case "typography": {
            const v = variant as "scale" | "code" | "weights" | "decorations" | "quote" | "eyebrow";
            return <Typography variant={v} />;
        }

        case "heading": {
            const v = variant as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
            return (
                <div className="w-[240px]">
                    <LayoutLabel>{`<${v}>`}</LayoutLabel>
                    <Heading variant={v} className="mt-1">
                        {headingText[v]}
                    </Heading>
                </div>
            );
        }

        case "paragraph": {
            const v = variant as "default" | "editorial" | "caption" | "drop-cap" | "mono" | "pull-quote";
            return (
                <div className="w-[240px]">
                    <Paragraph variant={v}>{sampleParagraphs[v]}</Paragraph>
                </div>
            );
        }

        case "visually-hidden": {
            const v = variant as "icon-label" | "field-label" | "skip-link" | "status" | "list-bound" | "live-status";
            if (v === "field-label") {
                return (
                    <div className="space-y-2">
                        <VisuallyHidden as="label" htmlFor="layout-gallery-hidden-search" variant={v}>
                            Search the site
                        </VisuallyHidden>
                        <input
                            id="layout-gallery-hidden-search"
                            className="h-9 rounded-md border border-[var(--diamond-border)] bg-[var(--diamond-surface)] px-3 text-sm"
                            placeholder="Search"
                            type="search"
                        />
                        <LayoutLabel>visual-less label</LayoutLabel>
                    </div>
                );
            }
            if (v === "skip-link") {
                return (
                    <div className="space-y-2 text-center">
                        <VisuallyHidden as="a" href="#main" variant={v}>
                            Skip to content
                        </VisuallyHidden>
                        <LayoutCell>focus reveals skip link</LayoutCell>
                    </div>
                );
            }
            if (v === "status") {
                return (
                    <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
                        <span className="text-sm">Online</span>
                        <VisuallyHidden variant={v}>Status: online</VisuallyHidden>
                    </div>
                );
            }
            if (v === "list-bound") {
                return (
                    <div className="text-sm">
                        <h3 className="mb-1 font-semibold">Top posts</h3>
                        <ol className="list-decimal pl-5 text-[var(--diamond-muted)]">
                            <li>Article one</li>
                            <li>Article two</li>
                        </ol>
                        <VisuallyHidden variant={v}>End of list</VisuallyHidden>
                    </div>
                );
            }
            if (v === "live-status") {
                return (
                    <div className="space-y-2" role="status" aria-live="polite">
                        <div className="font-mono text-[12px] text-[var(--diamond-muted)]">
                            <VisuallyHidden variant={v}>Loading status: </VisuallyHidden>
                            42% complete
                        </div>
                        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-[var(--diamond-surface-alt)]">
                            <div className="h-full w-[42%] bg-[var(--diamond-accent)]" />
                        </div>
                    </div>
                );
            }
            return (
                <div className="space-y-2 text-center">
                    <button
                        type="button"
                        className="inline-flex size-10 items-center justify-center rounded-full bg-[var(--diamond-accent)] font-semibold text-white"
                    >
                        <span aria-hidden="true">x</span>
                        <VisuallyHidden variant={v}>Close dialog</VisuallyHidden>
                    </button>
                    <LayoutLabel>screen reader label</LayoutLabel>
                </div>
            );
        }

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
                    {v === "ring" ? <span className="text-[11px] text-[var(--diamond-muted)]">Loading…</span> : null}
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
            const v = variant as "inbox" | "cta" | "no-results" | "dropzone" | "editorial" | "caught-up";
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
            const v = variant as "not-found" | "server" | "broken" | "connection" | "terminal" | "friendly";
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
                    <OfflineIndicator variant={v} visible className="absolute" />
                </div>
            );
        }

        case "notification-center": {
            const v = variant as "classic" | "tabbed" | "grouped" | "dark" | "calendar" | "banner";
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
                                avatarBg: "color-mix(in oklab, #10b981 20%, white)",
                                avatarColor: "#10b981",
                            },
                            {
                                id: "g2",
                                title: <b>Billing reminder</b>,
                                description: "Invoice due in 3 days",
                                time: "1h ago",
                                avatar: "!",
                                avatarBg: "color-mix(in oklab, #f59e0b 20%, white)",
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
            const v = variant as "label" | "shortcut" | "rich" | "accent" | "light" | "status";
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
            const v = variant as "panel" | "filter" | "share" | "picker" | "menu" | "mentions";
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
                        <div className="flex gap-1.5 border-[var(--diamond-border)] border-t pt-2">
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
                            {[
                                "#2b7fff",
                                "#e11d48",
                                "#10b981",
                                "#f59e0b",
                                "#8b5cf6",
                                "#ec4899",
                                "#14b8a6",
                                "#1a1917",
                            ].map((c) => (
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
                        <button
                            type="button"
                            className="block w-full rounded px-2 py-1.5 text-left text-[11px] hover:bg-[var(--diamond-surface-alt)]"
                        >
                            ✏ Edit
                        </button>
                        <button
                            type="button"
                            className="block w-full rounded px-2 py-1.5 text-left text-[11px] hover:bg-[var(--diamond-surface-alt)]"
                        >
                            ⎘ Duplicate
                        </button>
                        <button
                            type="button"
                            className="block w-full rounded px-2 py-1.5 text-left text-[11px] hover:bg-[var(--diamond-surface-alt)]"
                        >
                            📎 Archive
                        </button>
                        <button
                            type="button"
                            className="mt-1 block w-full rounded border-[var(--diamond-border)] border-t px-2 py-1.5 text-left text-[11px] text-rose-600 hover:bg-[var(--diamond-surface-alt)]"
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
                            <div className="flex size-5 items-center justify-center rounded-full bg-[var(--diamond-surface-alt)] text-[10px]">
                                J
                            </div>
                            <div>
                                <b>Jay</b> · 2h
                                <div className="text-[10px] text-[var(--diamond-muted)]">"check this out"</div>
                            </div>
                        </div>
                        <div className="flex gap-1.5 border-[var(--diamond-border)] border-t py-1.5 text-[11px]">
                            <div className="flex size-5 items-center justify-center rounded-full bg-[var(--diamond-surface-alt)] text-[10px]">
                                L
                            </div>
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
            const v = variant as "success" | "undo" | "progress" | "error" | "minimal" | "action";
            return <ToastDemo variant={v} label={label} />;
        }

        case "input": {
            const v = variant as never;
            if (variant === "mask") {
                return <Input variant={v} mask="(###) ###-####" defaultValue="555 123 4567" />;
            }
            return (
                <Input
                    variant={v}
                    placeholder={label || "Type here…"}
                    defaultValue={
                        variant === "currency"
                            ? "29.00"
                            : variant === "terminal-number"
                              ? "42"
                              : variant === "digits" || variant === "pick-one-to-nine"
                                ? ""
                                : ""
                    }
                />
            );
        }

        case "textarea": {
            const v = variant as "classic" | "auto" | "counter" | "toolbar" | "markdown" | "ghost";
            return (
                <Textarea
                    variant={v}
                    placeholder={label || "Write something…"}
                    defaultValue={
                        v === "markdown" ? "# Heading\n\nMarkdown" : v === "counter" ? "Hello world" : undefined
                    }
                />
            );
        }

        case "checkbox": {
            const v = variant as never;
            const groupVariants = ["stacked", "card-grid", "pills", "select-all", "days", "priced-rows"];
            if (groupVariants.includes(variant)) {
                const items =
                    variant === "days"
                        ? ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => ({ id: d, label: d }))
                        : variant === "priced-rows"
                          ? [
                                { id: "a", label: "Essentials", trailing: "Free" },
                                { id: "b", label: "Pro tools", trailing: "$9" },
                                { id: "c", label: "Team seats", trailing: "$24" },
                            ]
                          : [
                                { id: "a", label: "Design" },
                                { id: "b", label: "Code" },
                                { id: "c", label: "Write" },
                                { id: "d", label: "Ship" },
                            ];
                return (
                    <Checkbox
                        variant={v}
                        items={items}
                        defaultValue={
                            variant === "priced-rows" ? ["a", "b"] : variant === "days" ? ["Mo", "We", "Fr"] : ["a"]
                        }
                    />
                );
            }
            return <Checkbox variant={v} defaultChecked={variant !== "x-mark"} label={label || "Accept terms"} />;
        }

        case "radio": {
            const v = variant as never;
            const groupVariants = ["vertical", "plan-cards", "segmented-bar", "icon-grid", "scale", "stacked-list"];
            if (groupVariants.includes(variant)) {
                const items =
                    variant === "plan-cards"
                        ? [
                              { id: "a", label: "Starter", description: "For hobby", trailing: "$0" },
                              { id: "b", label: "Team", description: "For pros", trailing: "$49" },
                          ]
                        : variant === "icon-grid"
                          ? [
                                { id: "a", label: "Sun", icon: "☀" },
                                { id: "b", label: "Half", icon: "◐" },
                                { id: "c", label: "Moon", icon: "☾" },
                            ]
                          : variant === "scale"
                            ? [1, 2, 3, 4, 5].map((n) => ({ id: String(n), label: String(n) }))
                            : variant === "segmented-bar"
                              ? ["Grid", "List", "Kanban"].map((k) => ({ id: k, label: k }))
                              : variant === "stacked-list"
                                ? ["Email", "SMS", "Push", "None"].map((k) => ({ id: k, label: k }))
                                : [
                                      { id: "m", label: "Monthly" },
                                      { id: "q", label: "Quarterly" },
                                      { id: "y", label: "Yearly" },
                                  ];
                return (
                    <Radio
                        variant={v}
                        items={items}
                        defaultValue={
                            variant === "scale"
                                ? "2"
                                : variant === "icon-grid"
                                  ? "a"
                                  : variant === "stacked-list"
                                    ? "SMS"
                                    : variant === "segmented-bar"
                                      ? "List"
                                      : variant === "plan-cards"
                                        ? "a"
                                        : "m"
                        }
                    />
                );
            }
            return <Radio variant={v} defaultChecked label={label || "Option"} />;
        }

        case "switch": {
            const v = variant as "classic" | "square" | "with-label" | "ios" | "bi-state" | "industrial";
            return (
                <Switch variant={v} defaultChecked label={v === "with-label" ? label || "Notifications" : undefined} />
            );
        }

        case "select": {
            const v = variant as "native" | "custom" | "avatars" | "flat" | "terminal" | "flags";
            const baseOptions = [
                { value: "design", label: "Design" },
                { value: "eng", label: "Engineering" },
                { value: "ops", label: "Operations" },
            ];
            const opts =
                v === "avatars"
                    ? [
                          { value: "ac", label: "Aria Chen", leading: "A" },
                          {
                              value: "lr",
                              label: "Leo Reyes",
                              leading: "L",
                              leadingColor: "color-mix(in oklab, #8b7355 30%, white)",
                          },
                          {
                              value: "mt",
                              label: "Mei Tan",
                              leading: "M",
                              leadingColor: "color-mix(in oklab, #10b981 30%, white)",
                          },
                      ]
                    : v === "flags"
                      ? [
                            { value: "br", label: "Brazil", flag: "🇧🇷" },
                            { value: "us", label: "United States", flag: "🇺🇸" },
                            { value: "jp", label: "Japan", flag: "🇯🇵" },
                        ]
                      : v === "terminal"
                        ? [
                              { value: "prod", label: "production" },
                              { value: "stage", label: "staging" },
                              { value: "dev", label: "dev" },
                          ]
                        : baseOptions;
            return <Select variant={v} options={opts} defaultValue={opts[0].value} placeholder={label || "Choose…"} />;
        }

        case "multi-select": {
            const v = variant as "tag-pills" | "chip-dark" | "checklist" | "filter-chips" | "segmented" | "dropdown";
            const opts = [
                { value: "design", label: "Design" },
                { value: "code", label: "Code" },
                { value: "write", label: "Write" },
                { value: "ship", label: "Ship" },
            ];
            return (
                <MultiSelect
                    variant={v}
                    options={opts}
                    defaultValue={["design", "code"]}
                    placeholder={label || "Add…"}
                />
            );
        }

        case "autocomplete": {
            const v = variant as "basic" | "hints" | "recents" | "mentions" | "slash" | "ghost";
            const items =
                v === "slash"
                    ? [
                          { value: "image", label: "Insert image", description: "Add a photo", hint: "/img" },
                          { value: "table", label: "Insert table", description: "Add rows × cols", hint: "/tbl" },
                          { value: "code", label: "Code block", description: "Add a snippet", hint: "/code" },
                      ]
                    : v === "mentions"
                      ? [
                            { value: "aria", label: "Aria Chen", description: "Design" },
                            { value: "leo", label: "Leo Reyes", description: "Engineering" },
                            { value: "mei", label: "Mei Tan", description: "Ops" },
                        ]
                      : ["Apple", "Apricot", "Banana", "Blackberry", "Cherry", "Coconut"].map((n) => ({
                            value: n,
                            label: n,
                            description: v === "hints" ? "fruit" : undefined,
                            hint: v === "basic" ? "↵" : undefined,
                        }));
            const recents = ["Cherry", "Banana"].map((n) => ({ value: n, label: n }));
            return (
                <Autocomplete variant={v} items={items} recents={recents} placeholder={label || "Type to search…"} />
            );
        }

        case "slider": {
            const v = variant as never;
            const rangeVariants = [
                "range",
                "range-thick",
                "range-bubbles",
                "range-fields",
                "range-histogram",
                "range-mono",
            ];
            if (rangeVariants.includes(variant)) {
                return <Slider variant={v} defaultValue={[25, 75]} min={0} max={100} />;
            }
            return (
                <Slider
                    variant={v}
                    defaultValue={variant === "gradient" ? 60 : 50}
                    min={0}
                    max={100}
                    steps={variant === "stepped" ? 6 : undefined}
                />
            );
        }

        case "file-input": {
            const v = variant as "classic" | "segmented" | "image-preview" | "attach" | "terminal" | "fab";
            return <FileInput variant={v} label={label || undefined} />;
        }

        case "dropzone": {
            const v = variant as "classic" | "compact-row" | "grid-slots" | "with-progress" | "hatched" | "circular";
            if (v === "with-progress") {
                return (
                    <Dropzone
                        variant={v}
                        title={label || "Uploading…"}
                        description="atlas.zip"
                        progress={45}
                        progressFile="atlas.zip"
                    />
                );
            }
            return (
                <Dropzone
                    variant={v}
                    title={label || "Drop files here"}
                    description={v === "compact-row" ? "or click" : v === "circular" ? undefined : "or click to browse"}
                />
            );
        }

        case "date-picker": {
            const v = variant as "calendar" | "native" | "inline-pill" | "big-date" | "terminal" | "presets";
            return <DatePicker variant={v} defaultValue="2026-04-18" placeholder={label || "Pick a date"} />;
        }

        case "time-picker": {
            const v = variant as "hhmm-ampm" | "big-readout" | "split-selects" | "slots" | "analog" | "native";
            return <TimePicker variant={v} defaultValue="14:30" />;
        }

        case "date-range-picker": {
            const v = variant as
                | "pill-span"
                | "calendar-range"
                | "presets"
                | "twin-native"
                | "stacked-cards"
                | "duration-bar";
            return <DateRangePicker variant={v} defaultValue={{ start: "2026-04-08", end: "2026-04-22" }} />;
        }

        case "color-picker": {
            const v = variant as "swatches" | "hex" | "wheel" | "hsl" | "strip" | "shades";
            return <ColorPicker variant={v} defaultValue="#2b7fff" />;
        }

        case "rating": {
            const v = variant as "stars" | "big-stars" | "hearts" | "scale-10" | "emoji" | "gradient";
            return (
                <Rating
                    variant={v}
                    defaultValue={v === "scale-10" ? 7 : v === "gradient" ? 3 : v === "emoji" ? 4 : 3.5}
                    allowHalf={v === "stars" || v === "big-stars"}
                />
            );
        }

        case "otp-input": {
            const v = variant as "classic" | "underlined" | "big-xl" | "dashed" | "terminal" | "readonly";
            return (
                <OTPInput
                    variant={v}
                    length={6}
                    splitAfter={v === "dashed" ? 3 : undefined}
                    defaultValue={v === "readonly" ? "284619" : "284"}
                />
            );
        }

        case "form-field": {
            const v = variant as string;
            const labelVars = ["classic", "required", "mono", "badge", "tags", "accent"];
            const helperVars = ["subtle", "info", "comment", "counter", "box", "tip"];
            const errorVars = ["icon", "x-mark", "banner", "badge", "ticked", "code"];
            if (labelVars.includes(v)) {
                return (
                    <div className="flex w-full max-w-[260px] flex-col gap-1.5">
                        <FormLabel
                            variant={v as never}
                            required={v === "required"}
                            badge={v === "badge" ? "PRO" : undefined}
                            tags={v === "tags" ? ["v3", "beta"] : undefined}
                        >
                            {label || "Email"}
                        </FormLabel>
                        <Input variant="classic" placeholder="you@team.co" />
                    </div>
                );
            }
            if (helperVars.includes(v)) {
                return (
                    <div className="flex w-full max-w-[260px] flex-col gap-1.5">
                        <FormLabel>Email</FormLabel>
                        <Input variant="classic" placeholder="you@team.co" />
                        <FormHelper
                            variant={v as never}
                            counter={v === "counter" ? { current: 24, max: 280 } : undefined}
                        >
                            {label}
                        </FormHelper>
                    </div>
                );
            }
            if (errorVars.includes(v)) {
                return (
                    <div className="flex w-full max-w-[260px] flex-col gap-1.5">
                        <FormLabel>Email</FormLabel>
                        <Input variant="classic" invalid placeholder="you@team.co" defaultValue="not-an-email" />
                        <FormError
                            variant={v as never}
                            code={v === "code" ? "ERR_SCHEMA" : undefined}
                            detail={v === "ticked" ? "Try again later." : undefined}
                        >
                            {label}
                        </FormError>
                    </div>
                );
            }
            return (
                <FormField title={label || "Email"} helperText="We never share your email.">
                    <Input variant="classic" placeholder="you@team.co" />
                </FormField>
            );
        }

        case "fieldset": {
            const v = variant as "classic" | "card-accent" | "rule" | "section" | "numbered" | "editorial";
            return (
                <div className="w-[280px]">
                    <Fieldset
                        variant={v}
                        legend={label || "Personal info"}
                        step={v === "numbered" ? "1" : undefined}
                        description={v === "classic" || v === "card-accent" ? "Tell us about yourself." : undefined}
                    >
                        <Input variant="classic" placeholder="Name" />
                        <Input variant="classic" placeholder="Email" />
                    </Fieldset>
                </div>
            );
        }

        case "form": {
            const v = variant as "login-card" | "minimal-stack" | "stepped" | "terminal" | "subscribe-cta" | "profile";
            if (v === "subscribe-cta") {
                return (
                    <Form variant={v}>
                        <Input variant="classic" placeholder="you@team.co" className="flex-1" />
                        <Button variant="solid" size="sm">
                            Subscribe
                        </Button>
                    </Form>
                );
            }
            if (v === "terminal") {
                return (
                    <Form variant={v} title="login --user">
                        <Input variant="terminal" placeholder="~/$ username" />
                        <Input variant="terminal-password" placeholder="••••••" />
                        <Button variant="solid" size="sm">
                            $ submit
                        </Button>
                    </Form>
                );
            }
            if (v === "stepped") {
                return (
                    <Form
                        variant={v}
                        step={2}
                        steps={3}
                        title={label || "Onboarding"}
                        description="Tell us about your team."
                    >
                        <FormField title="Team name">
                            <Input variant="classic" placeholder="Atlas Co." />
                        </FormField>
                        <FormField title="Size" helperText="Approximate is fine.">
                            <Input variant="classic" placeholder="1–10" />
                        </FormField>
                        <Button variant="solid" size="sm">
                            Continue →
                        </Button>
                    </Form>
                );
            }
            if (v === "minimal-stack") {
                return (
                    <Form variant={v}>
                        <Input variant="underline" placeholder="Name" />
                        <Input variant="underline" placeholder="Email" />
                        <Button variant="solid" size="sm">
                            Send
                        </Button>
                    </Form>
                );
            }
            if (v === "profile") {
                return (
                    <Form variant={v} title={label || "Edit profile"}>
                        <FormField title="Display name">
                            <Input variant="classic" defaultValue="Aria Chen" />
                        </FormField>
                        <FormField title="Bio">
                            <Textarea variant="classic" defaultValue="Designer at Atlas Co." />
                        </FormField>
                        <Button variant="solid" size="sm">
                            Save
                        </Button>
                    </Form>
                );
            }
            return (
                <Form
                    variant={v}
                    title={label || "Sign in"}
                    description="Welcome back."
                    footer={
                        <>
                            <span>New here?</span>
                            <span className="text-[var(--diamond-accent)] underline">Create account</span>
                        </>
                    }
                >
                    <FormField title="Email">
                        <Input variant="classic" placeholder="you@team.co" />
                    </FormField>
                    <FormField title="Password">
                        <Input variant="reveal" placeholder="••••••••" />
                    </FormField>
                    <Button variant="solid" size="sm">
                        Sign in →
                    </Button>
                </Form>
            );
        }

        case "dialog": {
            const v = variant as "standard" | "success" | "dark" | "header-footer" | "editorial" | "brutalist";
            return (
                <Dialog
                    variant={v}
                    trigger={<OverlayTrigger label="Open dialog" />}
                    title={label || "Invite teammates"}
                    description={v === "success" ? "Your subscription is now active." : v === "header-footer" ? undefined : v === "dark" ? "For media-rich or cinematic contexts." : v === "editorial" ? "Left-rail accent with quiet mono caption." : v === "brutalist" ? "Hard edges, hard shadow. No fuss." : "Enter emails to send collaboration invites."}
                    kicker={v === "editorial" ? "DIALOG · 01" : undefined}
                    actions={
                        <>
                            {v !== "success" && v !== "brutalist" ? <button type="button" className="inline-flex h-9 cursor-pointer items-center rounded-md border border-[var(--diamond-border)] bg-[var(--diamond-surface)] px-3 font-medium text-[var(--diamond-ink)] text-[13px]">Cancel</button> : null}
                            <button type="button" className={v === "brutalist" ? "inline-flex h-9 cursor-pointer items-center rounded-none bg-[var(--diamond-ink)] px-3 font-mono font-semibold text-[var(--diamond-surface)] text-[12px]" : v === "success" ? "inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-md bg-[var(--diamond-accent)] px-3 font-medium text-[var(--diamond-on-accent,white)] text-[13px]" : "inline-flex h-9 cursor-pointer items-center rounded-md bg-[var(--diamond-accent)] px-3 font-medium text-[var(--diamond-on-accent,white)] text-[13px]"}>{v === "brutalist" ? "ACK" : v === "success" ? "Done" : v === "header-footer" ? "Save" : v === "editorial" ? "Continue" : "Send"}</button>
                        </>
                    }
                >
                    {v === "header-footer" ? "Preferences scrollable body area." : null}
                </Dialog>
            );
        }

        case "alert-dialog": {
            const v = variant as "destructive" | "unsaved" | "left-rail" | "dark-critical" | "mono-error" | "floating-icon";
            const copy: Record<typeof v, { title: string; desc: string; cancel: string; action: string }> = {
                destructive: { title: "Delete this workspace?", desc: "All files, members, and history will be permanently removed. This can't be undone.", cancel: "Cancel", action: "Delete" },
                unsaved: { title: "Unsaved changes", desc: "Leave the page? Your draft will be lost.", cancel: "Stay", action: "Leave" },
                "left-rail": { title: "Critical error", desc: "Database connection lost. Reconnecting…", cancel: "Dismiss", action: "Retry" },
                "dark-critical": { title: "Account suspended", desc: "Access paused due to unusual activity.", cancel: "Contact", action: "Review" },
                "mono-error": { title: "Merge conflict detected", desc: "3 files have conflicting changes. Resolve manually before continuing.", cancel: "Abort", action: "Override" },
                "floating-icon": { title: "Permanent deletion", desc: "Type DELETE to confirm.", cancel: "Cancel", action: "Proceed" },
            };
            return (
                <AlertDialog
                    variant={v}
                    trigger={<OverlayTrigger label="Show alert" tone="danger" />}
                    title={label || copy[v].title}
                    description={copy[v].desc}
                    cancelLabel={copy[v].cancel}
                    actionLabel={copy[v].action}
                />
            );
        }

        case "confirm-dialog": {
            const v = variant as "archive" | "icon-subtitle" | "purchase" | "emoji-deploy" | "persist-checkbox" | "terminal";
            const copy: Record<typeof v, { title: string; desc: string; cancel?: string; action?: string }> = {
                archive: { title: "Move to archive?", desc: "You can restore it from Archive later.", cancel: "Cancel", action: "Archive" },
                "icon-subtitle": { title: "Publish changes?", desc: "Goes live to all users.", cancel: "Not now", action: "Publish" },
                purchase: { title: "Confirm purchase", desc: "Review your plan before paying.", cancel: "Back", action: "Pay" },
                "emoji-deploy": { title: "Ship it?", desc: "All tests are passing. Deploy to production?", cancel: "Wait", action: "Deploy" },
                "persist-checkbox": { title: "Apply to all?", desc: "This action will run on every selected item.", cancel: "Just this", action: "Apply all" },
                terminal: { title: "deploy --prod", desc: "Push HEAD to production?", cancel: "no", action: "yes" },
            };
            return (
                <ConfirmDialog
                    variant={v}
                    trigger={<OverlayTrigger label="Open confirm" />}
                    title={label || copy[v].title}
                    description={copy[v].desc}
                    cancelLabel={copy[v].cancel}
                    actionLabel={copy[v].action}
                    summary={v === "purchase" ? [
                        { label: "Pro plan", value: "$29.00" },
                        { label: "Total", value: "$29.00", total: true },
                    ] : undefined}
                    emoji={v === "emoji-deploy" ? "🚀" : undefined}
                />
            );
        }

        case "bottom-sheet": {
            const v = variant as "share" | "sort" | "settings" | "quick-contact" | "scrollable" | "media";
            const items: Record<typeof v, Array<{ id: string; label: React.ReactNode; leading?: React.ReactNode; description?: React.ReactNode; group?: string; trailing?: React.ReactNode }>> = {
                share: [
                    { id: "msg", label: "Messages", leading: "💬" },
                    { id: "mail", label: "Mail", leading: "✉" },
                    { id: "copy", label: "Copy link", leading: "🔗" },
                    { id: "more", label: "More", leading: "⋯" },
                ],
                sort: [
                    { id: "newest", label: "Newest first" },
                    { id: "oldest", label: "Oldest first" },
                    { id: "az", label: "A → Z" },
                ],
                settings: [
                    { id: "name", label: "Display name", trailing: "Aria Chen", group: "Profile" },
                    { id: "email", label: "Email", trailing: "aria@team.co", group: "Profile" },
                    { id: "notif", label: "Notifications", trailing: "On", group: "Preferences" },
                    { id: "dark", label: "Dark mode", trailing: "Auto", group: "Preferences" },
                ],
                "quick-contact": [
                    { id: "aria", label: "Aria Chen", description: "Designer · SF", leading: "A" },
                    { id: "call", label: "Call", leading: "📞" },
                    { id: "msg", label: "Message", leading: "💬" },
                    { id: "mail", label: "Email", leading: "✉" },
                ],
                scrollable: Array.from({ length: 8 }, (_, i) => ({
                    id: `n${i}`,
                    label: `Activity ${i + 1}`,
                    description: `Updated ${i + 1}h ago`,
                })),
                media: [
                    { id: "prev", label: "⏮", onSelect: () => {} },
                    { id: "play", label: "▶", onSelect: () => {} },
                    { id: "next", label: "⏭", onSelect: () => {} },
                ],
            };
            return (
                <BottomSheet
                    variant={v}
                    trigger={<OverlayTrigger label="Open sheet" />}
                    title={label || (v === "share" ? "Share" : v === "sort" ? "Sort by" : v === "settings" ? "Preferences" : v === "media" ? "Atlas Co." : undefined)}
                    description={v === "media" ? "Quiet Discipline · 2:42 / 4:18" : undefined}
                    items={items[v]}
                    selectedId={v === "sort" ? "newest" : undefined}
                />
            );
        }

        case "drawer": {
            const v = variant as "right-nav" | "left-sidebar" | "top-notifications" | "right-edit" | "right-cart-dark" | "left-file-tree";
            const body: Record<typeof v, React.ReactNode> = {
                "right-nav": (
                    <ul className="m-0 flex list-none flex-col gap-1 p-0 text-[13px]">
                        {["Home", "Inbox", "Projects", "Settings", "Sign out"].map((l) => (
                            <li key={l}><button type="button" className="w-full cursor-pointer rounded-md px-3 py-2 text-left hover:bg-[var(--diamond-surface-alt)]">{l}</button></li>
                        ))}
                    </ul>
                ),
                "left-sidebar": (
                    <div className="flex flex-col gap-3 text-[12px]">
                        <input placeholder="Search…" className="w-full rounded-md border border-[var(--diamond-border)] bg-[var(--diamond-surface)] px-3 py-1.5 outline-none" />
                        {["Inbox", "Drafts", "Sent", "Archive"].map((l) => (
                            <div key={l} className="px-2 font-medium">{l}</div>
                        ))}
                    </div>
                ),
                "top-notifications": (
                    <div className="flex flex-col gap-1.5 text-[12px]">
                        {["Aria mentioned you", "Build #241 completed", "Monthly report ready"].map((l) => (
                            <div key={l} className="rounded-md bg-[var(--diamond-surface-alt)] px-3 py-2">{l}</div>
                        ))}
                    </div>
                ),
                "right-edit": (
                    <div className="flex flex-col gap-2 text-[12px]">
                        <label className="flex flex-col gap-1"><span className="font-mono text-[10px] text-[var(--diamond-muted)] uppercase tracking-[0.1em]">Name</span><input defaultValue="Aria Chen" className="rounded-md border border-[var(--diamond-border)] bg-[var(--diamond-surface)] px-2 py-1.5 outline-none" /></label>
                        <label className="flex flex-col gap-1"><span className="font-mono text-[10px] text-[var(--diamond-muted)] uppercase tracking-[0.1em]">Role</span><input defaultValue="Designer" className="rounded-md border border-[var(--diamond-border)] bg-[var(--diamond-surface)] px-2 py-1.5 outline-none" /></label>
                    </div>
                ),
                "right-cart-dark": (
                    <div className="flex flex-col gap-2 text-[12px]">
                        {[
                            { n: "Horizon Mug", p: "$28" },
                            { n: "Atlas Tote", p: "$48" },
                            { n: "Field Notes", p: "$12" },
                        ].map((it) => (
                            <div key={it.n} className="flex justify-between border-b border-[#2d2c28] py-2">
                                <span>{it.n}</span>
                                <span className="font-mono">{it.p}</span>
                            </div>
                        ))}
                    </div>
                ),
                "left-file-tree": (
                    <ul className="m-0 flex list-none flex-col gap-0.5 p-0 text-[12px]">
                        {["src/", "  components/", "    button.tsx", "    input.tsx", "  utils.ts", "package.json", "README.md"].map((l) => (
                            <li key={l} className="px-1">{l}</li>
                        ))}
                    </ul>
                ),
            };
            return (
                <Drawer
                    variant={v}
                    trigger={<OverlayTrigger label="Open drawer" />}
                    title={label || (v === "right-nav" ? "Menu" : v === "left-sidebar" ? "Browse" : v === "top-notifications" ? "Notifications" : v === "right-edit" ? "Edit profile" : v === "right-cart-dark" ? "Cart" : "tree")}
                >
                    {body[v]}
                </Drawer>
            );
        }

        case "lightbox": {
            const v = variant as "arrows" | "caption" | "thumbs" | "toolbar" | "video" | "exif";
            const slides = GRADIENTS.slice(0, 4).map((g, i) => ({
                id: String(i),
                media: <div className="size-[200px] rounded-md" style={{ background: `linear-gradient(135deg, ${g[0]}, ${g[1]})` }} />,
                thumb: <div className="size-full" style={{ background: `linear-gradient(135deg, ${g[0]}, ${g[1]})` }} />,
                caption: i === 0 ? "Atlas Co. · Spring 2026 · Shot on Hasselblad X1D" : "Slide caption",
                exif: i === 0 ? [
                    ["Camera", "Hasselblad X1D II"],
                    ["Lens", "65mm f/2.8"],
                    ["ISO", "100"],
                    ["Shutter", "1/250s"],
                    ["Aperture", "f/8.0"],
                ] as Array<[React.ReactNode, React.ReactNode]> : undefined,
            }));
            return (
                <Lightbox
                    variant={v}
                    trigger={<OverlayTrigger label="View media" />}
                    items={slides}
                    title={label || "Gallery"}
                />
            );
        }

        case "popconfirm": {
            const v = variant as "quick" | "accent" | "titled" | "dark-mini" | "emoji" | "terminal";
            const copy: Record<typeof v, { title: string; desc?: string }> = {
                quick: { title: "Delete?" },
                accent: { title: "Remove?" },
                titled: { title: "Discard draft?", desc: "Your changes won't be saved." },
                "dark-mini": { title: "Reset?" },
                emoji: { title: "Move to trash?", desc: "You can restore it later." },
                terminal: { title: "rm -rf /tmp/cache", desc: "Cannot be undone." },
            };
            return (
                <Popconfirm
                    variant={v}
                    side="top"
                    title={label || copy[v].title}
                    description={copy[v].desc}
                    showWarning={v === "quick" || v === "accent" || v === "titled"}
                >
                    <OverlayTrigger label={v === "emoji" ? "🗑 Trash" : v === "terminal" ? "$ rm" : "Delete"} tone={v === "dark-mini" ? "neutral" : "danger"} />
                </Popconfirm>
            );
        }

        case "tour": {
            const v = variant as "step" | "import" | "dark-tip" | "accent-final" | "new-feature" | "spotlight";
            if (v === "spotlight") return <TourDemo />;
            const copy: Record<Exclude<typeof v, "spotlight">, { title: string; desc?: string; step?: number; total?: number; badge?: string; primary?: string }> = {
                step: { title: "Create your first project", desc: "Click + to open the project creator.", step: 1, total: 4, primary: "Next" },
                import: { title: "Import existing data", desc: "Bring projects, files, and members from your old tools.", step: 2, total: 4, primary: "Got it" },
                "dark-tip": { title: "Quick tip", desc: "Press ⌘K anywhere to open the command palette." },
                "accent-final": { title: "You're all set!", desc: "Welcome aboard. Let's get you building.", step: 4, total: 4, primary: "Start" },
                "new-feature": { title: "Realtime collaboration", desc: "See cursors instantly.", badge: "NEW" },
            };
            return (
                <div className="w-[300px]">
                    <TourCard
                        variant={v}
                        title={label || copy[v].title}
                        description={copy[v].desc}
                        step={copy[v].step}
                        total={copy[v].total}
                        badge={copy[v].badge}
                        primaryLabel={copy[v].primary}
                        skipLabel={v === "step" || v === "import" ? "Skip tour" : undefined}
                        onClose={v !== "new-feature" ? () => {} : undefined}
                    />
                </div>
            );
        }

        case "rich-text-editor": {
            const v = variant as "classic" | "heading" | "quote" | "floating" | "markdown" | "collaborative";
            const content =
                v === "markdown"
                    ? "# Diamond\nA **systematic** toolkit.\n- Semantic formatting\n- Local ownership"
                    : v === "quote"
                      ? "Perfection is achieved through quiet, repeatable craft."
                      : "Diamond is a systematic design toolkit with linked references and semantic formatting.";
            return <RichTextEditor variant={v} defaultValue={content} />;
        }

        case "command-palette": {
            const v = variant as "project" | "suggested" | "terminal" | "jump" | "people" | "ask";
            return <CommandPalette variant={v} defaultQuery={v === "people" ? "ari" : v === "project" ? "proj" : undefined} promptLabel={label || "Ask Diamond"} />;
        }

        case "map": {
            const v = variant as "pin" | "clusters" | "dark" | "route" | "heatmap" | "place-card";
            return (
                <DiamondMap
                    variant={v}
                    title={v === "place-card" ? "Ferry Building" : label || undefined}
                    description={v === "place-card" ? "Market St. San Francisco" : undefined}
                    metric={v === "route" ? "4.2 mi - 14 min" : v === "place-card" ? "Open until 8 PM" : undefined}
                />
            );
        }

        case "chart": {
            const v = variant as "area-line" | "bars" | "donut" | "scatter" | "target-bars" | "radar";
            return <Chart variant={v} title={label || "Revenue"} description={v === "radar" ? "Capability score" : "Last six months"} />;
        }

        case "transfer-list": {
            const v = variant as "classic" | "drag" | "approval" | "avatars" | "filter" | "scopes-dark";
            return <TransferList variant={v} />;
        }

        case "split-pane": {
            const v = variant as "sidebar" | "console" | "triple" | "preview" | "nav-content" | "decorative";
            return <SplitPane variant={v} />;
        }

        case "signature-pad": {
            const v = variant as "simple" | "line" | "dark" | "color" | "witness" | "certified";
            return <SignaturePad variant={v} signerLabel={label || undefined} />;
        }

        case "pdf-viewer": {
            const v = variant as "single" | "thumbnails" | "search" | "zoom" | "spread" | "annotated";
            return <PDFViewer variant={v} title={label || "Diamond.pdf"} />;
        }

        case "qr-code": {
            const v = variant as "classic" | "branded" | "inverted" | "wifi" | "export" | "error-level";
            return <QRCode variant={v} caption={label || undefined} />;
        }

        case "theme-switcher": {
            const v = variant as "segmented" | "circles" | "toggle" | "previews" | "menu" | "swatches";
            return <ThemeSwitcher variant={v} defaultValue={v === "toggle" || v === "menu" ? "dark" : "light"} />;
        }

        case "language-switcher": {
            const v = variant as "dropdown" | "code" | "menu" | "segmented" | "searchable" | "regional-dark";
            return <LanguageSwitcher variant={v} defaultValue={v === "regional-dark" ? "en" : "pt"} />;
        }

        case "cookie-banner": {
            const v = variant as "classic" | "inverted" | "granular" | "corner-chip" | "terminal" | "editorial";
            return <CookieBannerDemo variant={v} label={label} />;
        }
    }
    return <span className="text-[var(--diamond-muted)] italic">No preview yet for {componentId}</span>;
}

function CookieBannerDemo({
    variant,
    label,
}: {
    variant: "classic" | "inverted" | "granular" | "corner-chip" | "terminal" | "editorial";
    label: string;
}) {
    const [open, setOpen] = React.useState(false);
    const copy: Record<typeof variant, { title: string; desc: string }> = {
        classic: { title: "We use cookies", desc: "To improve your experience and analyze traffic." },
        inverted: { title: "We use cookies", desc: "Read our policy." },
        granular: { title: "Cookie preferences", desc: "Choose which categories you allow." },
        "corner-chip": { title: "We use cookies", desc: "OK to proceed?" },
        terminal: { title: "Allow cookies?", desc: "y/n to continue session" },
        editorial: { title: "A note on cookies.", desc: "We use them sparingly to make this site better. Read more in our policy." },
    };
    return (
        <div className="flex flex-col items-center gap-3">
            <OverlayTrigger label={open ? "Banner open ↓" : "Show cookie banner"} onClick={() => setOpen(true)} />
            <CookieBanner
                variant={variant}
                open={open}
                onOpenChange={setOpen}
                title={label || copy[variant].title}
                description={copy[variant].desc}
                dismissible
                categories={variant === "granular" ? [
                    { id: "ess", label: "Essential", description: "Required for the site to work.", essential: true },
                    { id: "perf", label: "Performance", description: "Anonymous analytics.", defaultChecked: true },
                    { id: "mkt", label: "Marketing", description: "Personalized ads." },
                ] : undefined}
            />
        </div>
    );
}

function TourDemo() {
    const [open, setOpen] = React.useState(false);
    const targetA = React.useRef<HTMLDivElement>(null);
    const targetB = React.useRef<HTMLDivElement>(null);
    const targetC = React.useRef<HTMLDivElement>(null);
    return (
        <div className="flex w-full max-w-[320px] flex-col items-stretch gap-3">
            <OverlayTrigger label="Launch real tour" onClick={() => setOpen(true)} />
            <div className="rounded-md border border-[var(--diamond-border)] bg-[var(--diamond-surface)] p-3">
                <div ref={targetA} className="mb-2 inline-flex items-center gap-2 rounded bg-[var(--diamond-surface-alt)] px-2 py-1 text-[11px]">
                    <span className="size-2 rounded-full bg-[var(--diamond-accent)]" />
                    Workspace
                </div>
                <div ref={targetB} className="mb-2 cursor-pointer rounded-md bg-[var(--diamond-accent)] px-2.5 py-1.5 text-center font-medium text-[11px] text-[var(--diamond-on-accent,white)]">
                    + New project
                </div>
                <div ref={targetC} className="rounded border border-[var(--diamond-border)] px-2 py-1.5 text-[11px] text-[var(--diamond-muted)]">
                    Search · ⌘K
                </div>
            </div>
            <Tour
                open={open}
                onOpenChange={setOpen}
                steps={[
                    { target: targetA, title: "Your workspace", description: "Switch projects from here.", placement: "right" },
                    { target: targetB, title: "Create anything", description: "Press + or ⌘N to start.", placement: "bottom" },
                    { target: targetC, title: "Search everything", description: "⌘K opens the command palette anywhere.", placement: "top" },
                    { title: "You're all set!", description: "Have fun building.", variant: "accent-final" },
                ]}
                onComplete={() => console.log("Tour complete")}
                onSkip={() => console.log("Tour skipped")}
            />
        </div>
    );
}

function OverlayTrigger({
    label,
    tone = "accent",
    className,
    ...rest
}: {
    label: React.ReactNode;
    tone?: "accent" | "danger" | "neutral";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const toneCls =
        tone === "danger"
            ? "bg-rose-500 text-white hover:bg-rose-600"
            : tone === "neutral"
              ? "border border-[var(--diamond-border)] bg-[var(--diamond-surface)] text-[var(--diamond-ink)] hover:bg-[var(--diamond-surface-alt)]"
              : "bg-[var(--diamond-accent)] text-[var(--diamond-on-accent,white)] hover:opacity-90";
    return (
        <button
            type="button"
            className={`inline-flex h-9 cursor-pointer items-center justify-center rounded-md px-3.5 font-medium text-[13px] transition-colors ${toneCls} ${className ?? ""}`}
            {...rest}
        >
            {label}
        </button>
    );
}

function OverlayPreview({
    children,
    height = 240,
    variant = "light",
    backdrop = false,
}: {
    children: React.ReactNode;
    height?: number;
    variant?: "light" | "dark";
    backdrop?: boolean;
}) {
    return (
        <div
            className="relative w-full max-w-[360px] overflow-hidden rounded-lg border border-[var(--diamond-border)]"
            style={{
                height,
                background: variant === "dark" ? "#0f0f0e" : "var(--diamond-surface-alt)",
            }}
        >
            <div className="flex items-center gap-1.5 border-b border-[var(--diamond-border)] bg-[var(--diamond-surface)] px-3 py-1.5">
                <span className="size-2 rounded-full bg-rose-400" />
                <span className="size-2 rounded-full bg-amber-400" />
                <span className="size-2 rounded-full bg-emerald-400" />
                <span className="ml-2 font-mono text-[9px] text-[var(--diamond-muted)] tracking-[0.12em]">app.preview</span>
            </div>
            <div className="flex h-[calc(100%-28px)] flex-col gap-1.5 p-3 opacity-50">
                <div className="h-1.5 w-3/5 rounded-full bg-[var(--diamond-border)]" />
                <div className="h-1.5 w-4/5 rounded-full bg-[var(--diamond-border)]" />
                <div className="h-1.5 w-2/5 rounded-full bg-[var(--diamond-border)]" />
            </div>
            {backdrop ? <div className="absolute inset-0 bg-black/60" /> : null}
            <div className="absolute inset-0 flex items-center justify-center">{children}</div>
        </div>
    );
}

function ToastDemo({
    variant,
    label,
}: {
    variant: "success" | "undo" | "progress" | "error" | "minimal" | "action";
    label: string;
}) {
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
                    description={
                        variant === "success"
                            ? "Draft updated"
                            : variant === "error"
                              ? "Check your network"
                              : variant === "action"
                                ? '"can you review this?"'
                                : undefined
                    }
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
