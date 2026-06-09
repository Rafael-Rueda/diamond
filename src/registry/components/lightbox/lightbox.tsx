"use client";

import { CaretLeft, CaretRight, DownloadSimple, Heart, Share, X } from "@phosphor-icons/react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Lightbox — full-screen media viewer. Six visual treatments
 * covering plain counter+arrows, captioned, thumbnail strip, action
 * toolbar, video with scrubber, and EXIF metadata pane. */

export type LightboxVariant =
    | "arrows"
    | "caption"
    | "thumbs"
    | "toolbar"
    | "video"
    | "exif";

export interface LightboxItem {
    id: string;
    /** Image or video src. */
    src?: string;
    /** Render slot — alternative to src (e.g. for placeholders, gradients). */
    media?: React.ReactNode;
    /** Optional alt text for screen readers. */
    alt?: string;
    /** Caption shown for `caption` variant. */
    caption?: React.ReactNode;
    /** Thumbnail node (for `thumbs` variant). Defaults to the media slot. */
    thumb?: React.ReactNode;
    /** EXIF rows for the `exif` variant — array of [label, value]. */
    exif?: Array<[React.ReactNode, React.ReactNode]>;
    /** Video flag — when true, render <video controls/> for variant=video. */
    isVideo?: boolean;
}

const contentCls = [
    "fixed inset-0 z-50 flex items-center justify-center",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "duration-200 outline-none",
].join(" ");

const overlayCls =
    "fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

const stageVariants = cva("relative flex flex-1 items-center justify-center", {
    variants: {
        variant: {
            arrows: "",
            caption: "",
            thumbs: "",
            toolbar: "",
            video: "",
            exif: "",
        },
    },
    defaultVariants: { variant: "arrows" },
});

export interface LightboxProps
    extends Omit<React.ComponentPropsWithoutRef<typeof RadixDialog.Content>, "title">,
        VariantProps<typeof stageVariants> {
    trigger?: React.ReactElement;
    items: LightboxItem[];
    /** Controlled / default index. */
    index?: number;
    defaultIndex?: number;
    onIndexChange?: (index: number) => void;
    /** Heading shown above the counter. */
    title?: React.ReactNode;
    /** Toolbar variant — array of action buttons. */
    actions?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
    inline?: boolean;
    accent?: string;
}

export const Lightbox = React.forwardRef<HTMLDivElement, LightboxProps>(function Lightbox(
    {
        className,
        variant = "arrows",
        trigger,
        items,
        index: indexProp,
        defaultIndex,
        onIndexChange,
        title,
        actions,
        open,
        onOpenChange,
        defaultOpen,
        inline = false,
        accent,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "arrows";
    const [internal, setInternal] = React.useState(defaultIndex ?? 0);
    const isControlled = indexProp !== undefined;
    const index = isControlled ? indexProp : internal;
    const setIndex = (next: number) => {
        const clamped = ((next % items.length) + items.length) % items.length;
        if (!isControlled) setInternal(clamped);
        onIndexChange?.(clamped);
    };
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;
    const current = items[index];

    React.useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") setIndex(index - 1);
            if (e.key === "ArrowRight") setIndex(index + 1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, index]);

    const mediaNode = current?.media ?? (current?.src ? (
        current.isVideo || v === "video" ? (
            <video src={current.src} controls className="max-h-[80vh] max-w-[90vw] rounded-md object-contain" />
        ) : (
            <img
                src={current.src}
                alt={current.alt ?? ""}
                className="max-h-[80vh] max-w-[90vw] rounded-md object-contain"
            />
        )
    ) : null);

    const contentNode = (
        <>
            <RadixDialog.Overlay className={overlayCls} />
            <RadixDialog.Content
                ref={ref}
                className={cn(contentCls, "flex-col gap-3 p-6 text-white", className)}
                style={inlineStyle}
                {...rest}
            >
                <RadixDialog.Title className="sr-only">{title ?? "Media viewer"}</RadixDialog.Title>

                <div className="flex w-full items-center justify-between text-[12px]">
                    <span className="font-mono uppercase tracking-[0.14em]">
                        {title ?? "Media"} · {index + 1} / {items.length}
                    </span>
                    <div className="flex items-center gap-2">
                        {v === "toolbar" ? (
                            actions ?? (
                                <>
                                    <button type="button" aria-label="Favorite" className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                                        <Heart size={16} />
                                    </button>
                                    <button type="button" aria-label="Share" className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                                        <Share size={16} />
                                    </button>
                                    <button type="button" aria-label="Download" className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                                        <DownloadSimple size={16} />
                                    </button>
                                </>
                            )
                        ) : null}
                        <RadixDialog.Close asChild>
                            <button
                                type="button"
                                aria-label="Close"
                                className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                            >
                                <X size={16} weight="bold" />
                            </button>
                        </RadixDialog.Close>
                    </div>
                </div>

                <div className={stageVariants({ variant: v })}>
                    {items.length > 1 ? (
                        <button
                            type="button"
                            aria-label="Previous"
                            onClick={() => setIndex(index - 1)}
                            className="-translate-y-1/2 absolute top-1/2 left-2 inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                        >
                            <CaretLeft size={18} weight="bold" />
                        </button>
                    ) : null}
                    {mediaNode}
                    {items.length > 1 ? (
                        <button
                            type="button"
                            aria-label="Next"
                            onClick={() => setIndex(index + 1)}
                            className="-translate-y-1/2 absolute top-1/2 right-2 inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                        >
                            <CaretRight size={18} weight="bold" />
                        </button>
                    ) : null}
                </div>

                {v === "caption" && current?.caption ? (
                    <p className="max-w-[480px] text-center text-[12px] text-white/80">{current.caption}</p>
                ) : null}

                {v === "exif" && current?.exif?.length ? (
                    <div className="grid w-full max-w-[480px] grid-cols-2 gap-x-6 gap-y-1 rounded-md bg-white/5 p-3 font-mono text-[11px]">
                        {current.exif.map(([k, val], i) => (
                            <React.Fragment
                                // biome-ignore lint/suspicious/noArrayIndexKey: positional EXIF rows
                                key={i}
                            >
                                <span className="text-white/60 uppercase tracking-[0.1em]">{k}</span>
                                <span className="text-right text-white">{val}</span>
                            </React.Fragment>
                        ))}
                    </div>
                ) : null}

                {v === "thumbs" ? (
                    <div className="flex max-w-[90vw] gap-1.5 overflow-x-auto">
                        {items.map((it, i) => (
                            <button
                                key={it.id}
                                type="button"
                                aria-label={`Slide ${i + 1}`}
                                onClick={() => setIndex(i)}
                                className={cn(
                                    "h-14 w-14 shrink-0 overflow-hidden rounded ring-2 ring-transparent transition-all",
                                    i === index && "ring-(--diamond-accent,#2b7fff)",
                                )}
                            >
                                {it.thumb ?? it.media ?? (it.src ? (
                                    <img src={it.src} alt={it.alt ?? ""} className="size-full object-cover" />
                                ) : null)}
                            </button>
                        ))}
                    </div>
                ) : null}
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

Lightbox.displayName = "Diamond.Lightbox";

export { stageVariants as lightboxStageVariants };
