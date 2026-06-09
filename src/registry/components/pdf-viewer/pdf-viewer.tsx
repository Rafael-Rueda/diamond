"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond PDFViewer
 * A styled document viewer shell. Pass rendered page images/canvases through
 * `pages[].content` when using PDF.js or a server-side renderer. */

export type PDFViewerVariant = "single" | "thumbnails" | "search" | "zoom" | "spread" | "annotated";

const viewerVariants = cva(
    "w-full min-w-[280px] max-w-[680px] overflow-hidden rounded-lg border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917)",
    {
        variants: {
            variant: {
                single: "",
                thumbnails: "grid grid-cols-[92px_1fr]",
                search: "",
                zoom: "",
                spread: "",
                annotated: "",
            },
        },
        defaultVariants: { variant: "single" },
    },
);

export interface PDFPage {
    id: string;
    title?: React.ReactNode;
    content?: React.ReactNode;
    annotation?: React.ReactNode;
}

export interface PDFViewerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "title">, VariantProps<typeof viewerVariants> {
    pages?: PDFPage[];
    page?: number;
    defaultPage?: number;
    onPageChange?: (page: number) => void;
    zoom?: number;
    defaultZoom?: number;
    onZoomChange?: (zoom: number) => void;
    searchTerm?: string;
    title?: React.ReactNode;
    accent?: string;
}

const DEFAULT_PAGES: PDFPage[] = [
    { id: "1", title: "Proposal", annotation: "Revise this section" },
    { id: "2", title: "Scope" },
    { id: "3", title: "Timeline" },
];

export const PDFViewer = React.forwardRef<HTMLDivElement, PDFViewerProps>(function PDFViewer(
    {
        className,
        variant = "single",
        pages = DEFAULT_PAGES,
        page,
        defaultPage = 1,
        onPageChange,
        zoom,
        defaultZoom = 100,
        onZoomChange,
        searchTerm = "diamond",
        title,
        accent,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "single";
    const [internalPage, setInternalPage] = React.useState(defaultPage);
    const [internalZoom, setInternalZoom] = React.useState(defaultZoom);
    const currentPage = page ?? internalPage;
    const currentZoom = zoom ?? internalZoom;
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const setPage = (next: number) => {
        const safe = Math.max(1, Math.min(pages.length, next));
        if (page === undefined) setInternalPage(safe);
        onPageChange?.(safe);
    };

    const setZoom = (next: number) => {
        const safe = Math.max(50, Math.min(180, next));
        if (zoom === undefined) setInternalZoom(safe);
        onZoomChange?.(safe);
    };

    const active = pages[currentPage - 1] ?? pages[0] ?? { id: "empty" };

    return (
        <div ref={ref} className={cn(viewerVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
            {v === "thumbnails" ? (
                <aside className="border-(--diamond-border,#d9d5cc) border-r bg-(--diamond-surface-alt,#ebe8e1) p-2">
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-(--diamond-muted,#6b6862)">Pages</div>
                    <div className="grid gap-2">
                        {pages.map((pdfPage, index) => (
                            <button
                                key={pdfPage.id}
                                type="button"
                                onClick={() => setPage(index + 1)}
                                className={cn(
                                    "h-24 cursor-pointer rounded border bg-(--diamond-surface,#fff) p-2 text-left text-[10px]",
                                    currentPage === index + 1 ? "border-(--diamond-accent,#2b7fff)" : "border-(--diamond-border,#d9d5cc)",
                                )}
                            >
                                <MiniPage />
                                <div className="mt-1 truncate font-mono">{index + 1}</div>
                            </button>
                        ))}
                    </div>
                </aside>
            ) : null}

            <div className="min-w-0">
                <Toolbar
                    title={title ?? "Document.pdf"}
                    page={currentPage}
                    total={pages.length}
                    zoom={currentZoom}
                    searchTerm={v === "search" ? searchTerm : undefined}
                    showZoom={v === "zoom"}
                    onPrev={() => setPage(currentPage - 1)}
                    onNext={() => setPage(currentPage + 1)}
                    onZoomIn={() => setZoom(currentZoom + 10)}
                    onZoomOut={() => setZoom(currentZoom - 10)}
                />
                <div className="flex h-[330px] items-center justify-center overflow-auto bg-(--diamond-surface-alt,#ebe8e1) p-5">
                    {v === "spread" ? (
                        <div className="flex gap-4" style={{ transform: `scale(${currentZoom / 100})` }}>
                            <PageView page={active} pageNumber={currentPage} />
                            <PageView page={pages[currentPage] ?? pages[0] ?? active} pageNumber={Math.min(pages.length, currentPage + 1)} />
                        </div>
                    ) : (
                        <div className="relative" style={{ transform: `scale(${currentZoom / 100})` }}>
                            <PageView page={active} pageNumber={currentPage} highlight={v === "search" ? searchTerm : undefined} />
                            {v === "annotated" ? (
                                <div className="absolute top-16 right-[-36px] max-w-[120px] rounded border border-amber-300 bg-amber-100 px-2 py-1 text-amber-900 text-[11px] shadow">
                                    {active.annotation ?? "Revise this section"}
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

function Toolbar({
    title,
    page,
    total,
    zoom,
    searchTerm,
    showZoom,
    onPrev,
    onNext,
    onZoomIn,
    onZoomOut,
}: {
    title: React.ReactNode;
    page: number;
    total: number;
    zoom: number;
    searchTerm?: string;
    showZoom?: boolean;
    onPrev: () => void;
    onNext: () => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
}) {
    return (
        <div className="flex items-center gap-2 border-(--diamond-border,#d9d5cc) border-b px-3 py-2">
            <span className="min-w-0 flex-1 truncate font-medium text-[13px]">{title}</span>
            {searchTerm ? (
                <div className="hidden rounded border border-(--diamond-border,#d9d5cc) px-2 py-1 text-[11px] sm:block">
                    Search: <span className="text-(--diamond-accent,#2b7fff)">{searchTerm}</span>
                </div>
            ) : null}
            {showZoom ? (
                <>
                    <button type="button" onClick={onZoomOut} className="h-7 cursor-pointer rounded border border-(--diamond-border,#d9d5cc) px-2 text-[12px]">-</button>
                    <span className="font-mono text-[11px] text-(--diamond-muted,#6b6862)">{zoom}%</span>
                    <button type="button" onClick={onZoomIn} className="h-7 cursor-pointer rounded border border-(--diamond-border,#d9d5cc) px-2 text-[12px]">+</button>
                </>
            ) : null}
            <button type="button" onClick={onPrev} className="h-7 cursor-pointer rounded border border-(--diamond-border,#d9d5cc) px-2 text-[12px]">&lt;</button>
            <span className="font-mono text-[11px] text-(--diamond-muted,#6b6862)">{page}/{total}</span>
            <button type="button" onClick={onNext} className="h-7 cursor-pointer rounded border border-(--diamond-border,#d9d5cc) px-2 text-[12px]">&gt;</button>
        </div>
    );
}

function PageView({ page, pageNumber, highlight }: { page: PDFPage; pageNumber: number; highlight?: string }) {
    return (
        <article className="h-[280px] w-[200px] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
            {page.content ?? (
                <div className="space-y-3">
                    <div className="font-serif text-[18px]">{page.title ?? "Diamond Report"}</div>
                    <div className="h-px bg-(--diamond-border,#d9d5cc)" />
                    <PdfLine width="88%" />
                    <PdfLine width="72%" />
                    <PdfLine width="96%" highlight={!!highlight} />
                    <PdfLine width="64%" />
                    <div className="grid grid-cols-2 gap-2 pt-3">
                        <PdfLine width="100%" />
                        <PdfLine width="100%" />
                        <PdfLine width="100%" />
                        <PdfLine width="100%" />
                    </div>
                    <div className="pt-10 text-right font-mono text-[10px] text-(--diamond-muted,#6b6862)">Page {pageNumber}</div>
                </div>
            )}
        </article>
    );
}

function PdfLine({ width, highlight }: { width: string; highlight?: boolean }) {
    return <div className={cn("h-2 rounded-full", highlight ? "bg-amber-200" : "bg-(--diamond-border,#d9d5cc)")} style={{ width }} />;
}

function MiniPage() {
    return (
        <div className="grid gap-1">
            <PdfLine width="72%" />
            <PdfLine width="90%" />
            <PdfLine width="62%" />
        </div>
    );
}

PDFViewer.displayName = "Diamond.PDFViewer";

export { viewerVariants as pdfViewerVariants };
