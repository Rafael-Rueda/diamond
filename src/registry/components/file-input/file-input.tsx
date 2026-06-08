"use client";

import { Image as ImageIcon, Paperclip, Plus, UploadSimple } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · FileInput — single file picker wrapping a real <input type="file">.
 * Six visual treatments. Native multi-file selection is opt-in via `multiple`. */

export type FileInputVariant =
    | "classic"
    | "segmented"
    | "image-preview"
    | "attach"
    | "terminal"
    | "fab";

const wrapperVariants = cva("inline-flex w-full max-w-[280px]", {
    variants: {
        variant: {
            classic: "",
            segmented:
                "items-center overflow-hidden rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff)",
            "image-preview": "",
            attach: "",
            terminal: "",
            fab: "size-12",
        },
    },
    defaultVariants: { variant: "classic" },
});

export interface FileInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
        VariantProps<typeof wrapperVariants> {
    /** Button / placeholder label. */
    label?: React.ReactNode;
    accent?: string;
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
    {
        className,
        variant = "classic",
        label,
        accent,
        accept,
        multiple,
        onChange,
        disabled,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "classic";
    const [files, setFiles] = React.useState<File[]>([]);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const inputId = React.useId();
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const list = Array.from(e.target.files ?? []);
        setFiles(list);
        if (v === "image-preview" && list[0]?.type.startsWith("image/")) {
            const url = URL.createObjectURL(list[0]);
            setPreviewUrl((prev) => {
                if (prev) URL.revokeObjectURL(prev);
                return url;
            });
        }
        onChange?.(e);
    };
    React.useEffect(() => () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
    }, [previewUrl]);

    const trigger = () => inputRef.current?.click();
    const fileName = files[0]?.name ?? null;

    const hiddenInput = (
        <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={handle}
            className="sr-only"
            {...rest}
        />
    );

    if (v === "classic") {
        return (
            <label
                htmlFor={inputId}
                className={cn(
                    "inline-flex cursor-pointer items-center gap-2 rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3.5 py-2.5 text-[13px] transition-colors hover:border-(--diamond-accent,#2b7fff)",
                    disabled && "pointer-events-none opacity-50",
                    className,
                )}
                style={inlineStyle}
            >
                {hiddenInput}
                <UploadSimple size={14} weight="bold" />
                <span>{fileName ?? label ?? "Upload file"}</span>
            </label>
        );
    }

    if (v === "segmented") {
        return (
            <label
                htmlFor={inputId}
                className={cn(wrapperVariants({ variant: v }), disabled && "pointer-events-none opacity-50", className)}
                style={inlineStyle}
            >
                {hiddenInput}
                <span className="flex-1 truncate px-3.5 py-2.5 font-mono text-[12px] text-(--diamond-muted,#6b6862)">
                    {fileName ?? label ?? "No file selected"}
                </span>
                <button
                    type="button"
                    onClick={trigger}
                    className="cursor-pointer bg-(--diamond-ink,#1a1917) px-3.5 py-2.5 font-medium text-(--diamond-surface,#fff) text-[12px]"
                >
                    Browse
                </button>
            </label>
        );
    }

    if (v === "image-preview") {
        return (
            <label
                htmlFor={inputId}
                className={cn(
                    "relative inline-flex size-28 cursor-pointer items-center justify-center overflow-hidden rounded-md border-[1.5px] border-(--diamond-border,#d9d5cc) border-dashed bg-(--diamond-surface-alt,#ebe8e1) transition-colors hover:border-(--diamond-accent,#2b7fff)",
                    disabled && "pointer-events-none opacity-50",
                    className,
                )}
                style={inlineStyle}
            >
                {hiddenInput}
                {previewUrl ? (
                    <img src={previewUrl} className="size-full object-cover" alt={fileName ?? "Preview"} />
                ) : (
                    <div className="flex flex-col items-center gap-1 text-(--diamond-muted,#6b6862)">
                        <ImageIcon size={20} />
                        <span className="font-mono text-[10px] tracking-[0.1em]">{label ?? "PHOTO"}</span>
                    </div>
                )}
            </label>
        );
    }

    if (v === "attach") {
        return (
            <label
                htmlFor={inputId}
                className={cn(
                    "inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-(--diamond-border,#d9d5cc) border-dashed bg-transparent px-3 py-2 font-medium text-(--diamond-muted,#6b6862) text-[12px] transition-colors hover:border-(--diamond-accent,#2b7fff) hover:text-(--diamond-accent,#2b7fff)",
                    disabled && "pointer-events-none opacity-50",
                    className,
                )}
                style={inlineStyle}
            >
                {hiddenInput}
                <Paperclip size={12} weight="bold" />
                {fileName ?? label ?? "Attach a file"}
            </label>
        );
    }

    if (v === "terminal") {
        return (
            <label
                htmlFor={inputId}
                className={cn(
                    "inline-flex cursor-pointer items-center gap-2 rounded-sm border border-[#2d2c28] bg-[#0a0a08] px-3 py-2.5 font-mono text-[#d4d0c8] text-[12px]",
                    disabled && "pointer-events-none opacity-50",
                    className,
                )}
                style={inlineStyle}
            >
                {hiddenInput}
                <span className="text-(--diamond-accent,#2b7fff)">$</span>
                <span>{fileName ?? "upload --file ./path"}</span>
            </label>
        );
    }

    /* fab */
    return (
        <label
            htmlFor={inputId}
            className={cn(
                "inline-flex size-12 cursor-pointer items-center justify-center rounded-full bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff) shadow-[0_8px_24px_-8px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_60%,transparent)] transition-transform hover:scale-105",
                disabled && "pointer-events-none opacity-50",
                className,
            )}
            style={inlineStyle}
            aria-label={typeof label === "string" ? label : "Add file"}
        >
            {hiddenInput}
            <Plus size={20} weight="bold" />
        </label>
    );
});

FileInput.displayName = "Diamond.FileInput";

export { wrapperVariants as fileInputVariants };
