"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type PaginationVariant = "numbered" | "simple" | "circular" | "compact" | "jump" | "grouped";

const paginationVariants = cva("flex items-center gap-1 text-sm", {
    variants: {
        variant: {
            numbered: "",
            simple: "",
            circular: "",
            compact: "w-[240px] flex-col items-stretch gap-2",
            jump: "",
            grouped: "gap-0",
        },
    },
    defaultVariants: { variant: "numbered" },
});

export interface PaginationProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof paginationVariants> {
    page?: number;
    totalPages?: number;
    totalItems?: number;
    onPageChange?: (page: number) => void;
}

function pageRange(totalPages: number) {
    return Array.from({ length: Math.min(totalPages, 5) }, (_, index) => index + 1);
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(function Pagination(
    { className, variant = "numbered", page = 3, totalPages = 12, totalItems = 248, onPageChange, ...rest },
    ref,
) {
    const [localPage, setLocalPage] = React.useState(page);
    const currentPage = onPageChange ? page : localPage;
    const setPage = (next: number) => {
        const clamped = Math.max(1, Math.min(totalPages, next));
        setLocalPage(clamped);
        onPageChange?.(clamped);
    };

    const buttonClass =
        "inline-flex h-7 min-w-7 items-center justify-center rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2 text-(--diamond-muted,#6b6862) text-[12px] hover:bg-(--diamond-surface-alt,#ebe8e1) disabled:opacity-45";
    const activeStandaloneClass =
        "inline-flex h-7 min-w-7 items-center justify-center rounded-md border border-(--diamond-ink,#1a1917) bg-(--diamond-ink,#1a1917) px-2 text-(--diamond-surface,#fff) text-[12px] hover:bg-[color-mix(in_oklab,var(--diamond-ink,#1a1917)_85%,var(--diamond-surface,#fff))] disabled:opacity-45";

    if (variant === "compact") {
        return (
            <nav ref={ref} aria-label="Pagination" className={cn(paginationVariants({ variant }), className)} {...rest}>
                <div className="flex justify-between font-mono text-(--diamond-muted,#6b6862) text-[10px]">
                    <span>21-30 / {totalItems}</span>
                    <span>
                        Page {currentPage} / {totalPages}
                    </span>
                </div>
                <div className="flex gap-1">
                    <button
                        type="button"
                        className={cn(buttonClass, "flex-1")}
                        onClick={() => setPage(currentPage - 1)}
                        disabled={currentPage <= 1}
                    >
                        Prev
                    </button>
                    <button
                        type="button"
                        className={cn(activeStandaloneClass, "flex-1")}
                        onClick={() => setPage(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                    >
                        Next
                    </button>
                </div>
            </nav>
        );
    }

    if (variant === "simple") {
        return (
            <nav ref={ref} aria-label="Pagination" className={cn(paginationVariants({ variant }), className)} {...rest}>
                <button
                    type="button"
                    className={buttonClass}
                    onClick={() => setPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                >
                    Prev
                </button>
                <span className="px-2 text-(--diamond-muted,#6b6862) text-[12px]">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    type="button"
                    className={buttonClass}
                    onClick={() => setPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                >
                    Next
                </button>
            </nav>
        );
    }

    if (variant === "jump") {
        return (
            <nav ref={ref} aria-label="Pagination" className={cn(paginationVariants({ variant }), className)} {...rest}>
                <button
                    type="button"
                    className={buttonClass}
                    onClick={() => setPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                >
                    Prev
                </button>
                <label className="sr-only" htmlFor="diamond-pagination-page">
                    Page
                </label>
                <input
                    id="diamond-pagination-page"
                    className="h-7 w-11 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-center text-[12px]"
                    value={currentPage}
                    onChange={(event) => setPage(Number(event.target.value) || 1)}
                    inputMode="numeric"
                />
                <span className="px-1 text-(--diamond-muted,#6b6862) text-[12px]">of {totalPages}</span>
                <button
                    type="button"
                    className={buttonClass}
                    onClick={() => setPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                >
                    Next
                </button>
            </nav>
        );
    }

    return (
        <nav ref={ref} aria-label="Pagination" className={cn(paginationVariants({ variant }), className)} {...rest}>
            <button
                type="button"
                className={cn(buttonClass, variant === "grouped" && "rounded-r-none border-r-0")}
                onClick={() => setPage(1)}
                disabled={currentPage <= 1}
            >
                {variant === "grouped" ? "<<" : "Prev"}
            </button>
            {pageRange(totalPages).map((item) => (
                <button
                    key={item}
                    type="button"
                    aria-current={item === currentPage ? "page" : undefined}
                    className={cn(
                        item === currentPage ? activeStandaloneClass : buttonClass,
                        variant === "circular" && "rounded-full",
                        variant === "grouped" && "rounded-none border-r-0",
                    )}
                    onClick={() => setPage(item)}
                >
                    {item}
                </button>
            ))}
            {totalPages > 5 && variant !== "grouped" && (
                <span className="px-1 text-(--diamond-muted,#6b6862)">...</span>
            )}
            {variant !== "grouped" && totalPages > 5 && (
                <button type="button" className={buttonClass} onClick={() => setPage(totalPages)}>
                    {totalPages}
                </button>
            )}
            <button
                type="button"
                className={cn(buttonClass, variant === "grouped" && "rounded-l-none")}
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
            >
                {variant === "grouped" ? ">>" : "Next"}
            </button>
        </nav>
    );
});

Pagination.displayName = "Diamond.Pagination";

export { paginationVariants };
