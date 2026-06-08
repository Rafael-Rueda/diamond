"use client";

import { CloudArrowUp, Image as ImageIcon, Plus, User } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Dropzone — drag-and-drop file area. Real <input type="file">
 * wired underneath; HTML5 drag events drive the visual state. */

export type DropzoneVariant =
    | "classic"
    | "compact-row"
    | "grid-slots"
    | "with-progress"
    | "hatched"
    | "circular";

const baseVariants = cva(
    "relative flex w-full max-w-[360px] cursor-pointer flex-col items-center justify-center text-center text-(--diamond-ink,#1a1917) transition-colors",
    {
        variants: {
            variant: {
                classic:
                    "min-h-[140px] gap-2 rounded-lg border-[1.5px] border-(--diamond-border,#d9d5cc) border-dashed bg-(--diamond-surface,#fff) p-6 hover:border-(--diamond-accent,#2b7fff)",
                "compact-row":
                    "min-h-0 flex-row gap-3 rounded-md border border-(--diamond-border,#d9d5cc) border-dashed bg-(--diamond-surface,#fff) px-3 py-2.5 text-left text-[12px] hover:border-(--diamond-accent,#2b7fff)",
                "grid-slots": "min-h-0 gap-1.5",
                "with-progress":
                    "min-h-[140px] gap-2 rounded-lg border-[1.5px] border-(--diamond-border,#d9d5cc) border-dashed bg-(--diamond-surface,#fff) p-6",
                hatched:
                    "min-h-[140px] gap-2 rounded-lg border border-(--diamond-border,#d9d5cc) bg-[repeating-linear-gradient(45deg,var(--diamond-surface,#fff)_0px,var(--diamond-surface,#fff)_8px,var(--diamond-surface-alt,#ebe8e1)_8px,var(--diamond-surface-alt,#ebe8e1)_16px)] p-6",
                circular:
                    "size-32 flex-col gap-1 rounded-full border-[1.5px] border-(--diamond-border,#d9d5cc) border-dashed bg-(--diamond-surface,#fff) p-4",
            },
            isDragging: {
                true: "border-(--diamond-accent,#2b7fff) bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_10%,var(--diamond-surface,#fff))]",
                false: "",
            },
        },
        defaultVariants: { variant: "classic", isDragging: false },
    },
);

export interface DropzoneProps
    extends Omit<React.HTMLAttributes<HTMLLabelElement>, "onDrop" | "onChange">,
        VariantProps<typeof baseVariants> {
    /** Heading inside the dropzone. */
    title?: React.ReactNode;
    /** Smaller helper line below the title. */
    description?: React.ReactNode;
    /** Native file input filters. */
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    /** Called for each file dropped or selected. */
    onFiles?: (files: File[]) => void;
    /** Grid-slots variant — how many slots to show. */
    slots?: number;
    /** Manual progress 0..100 for `with-progress`. When undefined, drops auto-animate. */
    progress?: number;
    /** Name shown next to the progress bar. */
    progressFile?: React.ReactNode;
    accent?: string;
}

export const Dropzone = React.forwardRef<HTMLLabelElement, DropzoneProps>(function Dropzone(
    {
        className,
        variant = "classic",
        title,
        description,
        accept,
        multiple = true,
        disabled,
        onFiles,
        slots = 4,
        progress: progressProp,
        progressFile,
        accent,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "classic";
    const [isDragging, setIsDragging] = React.useState(false);
    const [files, setFiles] = React.useState<File[]>([]);
    const [autoProgress, setAutoProgress] = React.useState<number | null>(null);
    const inputId = React.useId();
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const ingest = (list: FileList | File[]) => {
        const arr = Array.from(list);
        if (!arr.length) return;
        setFiles((prev) => (multiple ? [...prev, ...arr] : arr));
        onFiles?.(arr);
        if (v === "with-progress" && progressProp === undefined) {
            setAutoProgress(0);
            const start = Date.now();
            const id = window.setInterval(() => {
                const elapsed = Date.now() - start;
                const pct = Math.min(100, Math.round((elapsed / 1600) * 100));
                setAutoProgress(pct);
                if (pct >= 100) window.clearInterval(id);
            }, 60);
        }
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (disabled) return;
        ingest(e.dataTransfer.files);
    };
    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (!isDragging) setIsDragging(true);
    };
    const onDragLeave = () => setIsDragging(false);
    const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) ingest(e.target.files);
    };

    const progress = progressProp ?? autoProgress ?? 0;
    const progressFileName = progressFile ?? files[0]?.name ?? "atlas.zip";

    if (v === "grid-slots") {
        const filled = files.slice(0, slots);
        return (
            <label
                ref={ref}
                htmlFor={inputId}
                className={cn("grid w-full max-w-[280px] grid-cols-3 gap-1.5", className)}
                style={inlineStyle}
                {...rest}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
            >
                <input
                    id={inputId}
                    type="file"
                    accept={accept}
                    multiple
                    disabled={disabled}
                    onChange={onPick}
                    className="sr-only"
                />
                {Array.from({ length: slots }, (_, i) => {
                    const f = filled[i];
                    const isAdd = !f && i === filled.length;
                    return (
                        <span
                            // biome-ignore lint/suspicious/noArrayIndexKey: positional grid slot
                            key={i}
                            className={cn(
                                "flex aspect-square cursor-pointer items-center justify-center rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-muted,#9a968e) transition-colors",
                                isDragging && "border-(--diamond-accent,#2b7fff)",
                                f && "border-(--diamond-accent,#2b7fff)/40 bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_12%,var(--diamond-surface,#fff))] text-(--diamond-accent,#2b7fff)",
                                isAdd && "border-dashed",
                            )}
                        >
                            {f ? <ImageIcon size={20} /> : isAdd ? <Plus size={16} /> : null}
                        </span>
                    );
                })}
            </label>
        );
    }

    return (
        <label
            ref={ref}
            htmlFor={inputId}
            className={cn(baseVariants({ variant: v, isDragging }), disabled && "pointer-events-none opacity-50", className)}
            style={inlineStyle}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            {...rest}
        >
            <input
                id={inputId}
                type="file"
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                onChange={onPick}
                className="sr-only"
            />

            {v === "compact-row" ? (
                <>
                    <CloudArrowUp size={16} weight="bold" className="text-(--diamond-accent,#2b7fff)" />
                    <span className="flex-1">
                        <strong className="font-semibold">{title ?? "Drop files"}</strong>
                        <span className="text-(--diamond-muted,#6b6862)"> {description ?? "or click"}</span>
                    </span>
                </>
            ) : v === "circular" ? (
                <>
                    <User size={28} weight="duotone" className="text-(--diamond-muted,#6b6862)" />
                    <span className="text-(--diamond-muted,#6b6862) text-[11px]">{title ?? "Avatar"}</span>
                </>
            ) : (
                <>
                    <span className="flex size-12 items-center justify-center rounded-full bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-accent,#2b7fff)">
                        <CloudArrowUp size={22} weight="duotone" />
                    </span>
                    <strong className="font-semibold text-[14px]">{title ?? "Drop files here"}</strong>
                    {description !== undefined ? (
                        <span className="text-(--diamond-muted,#6b6862) text-[11px]">{description}</span>
                    ) : (
                        <span className="text-(--diamond-muted,#6b6862) text-[11px]">or click to browse</span>
                    )}
                </>
            )}

            {v === "with-progress" && (autoProgress !== null || progressProp !== undefined) ? (
                <div className="mt-2 w-full">
                    <div className="flex justify-between font-mono text-(--diamond-muted,#6b6862) text-[10px] uppercase tracking-[0.1em]">
                        <span>{progressFileName}</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-(--diamond-surface-alt,#ebe8e1)">
                        <span
                            className="block h-full rounded-full bg-(--diamond-accent,#2b7fff) transition-[width] duration-200"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            ) : null}
        </label>
    );
});

Dropzone.displayName = "Diamond.Dropzone";

export { baseVariants as dropzoneVariants };
