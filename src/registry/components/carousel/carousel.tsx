"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · Carousel — transform-based slider with drag/swipe, keyboard, autoplay-pause-on-hover. */

export type CarouselVariant = "dots" | "arrows" | "thumbs" | "cards" | "circular" | "progress";

const carouselVariants = cva("relative w-full select-none", {
    variants: {
        variant: {
            dots: "",
            arrows: "px-8",
            thumbs: "",
            cards: "",
            circular: "",
            progress: "",
        },
    },
    defaultVariants: { variant: "dots" },
});

export interface CarouselSlide {
    id?: React.Key;
    /** Slide content. */
    content: React.ReactNode;
    /** Optional thumbnail (used by `thumbs`). */
    thumb?: React.ReactNode;
}

export interface CarouselProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
        VariantProps<typeof carouselVariants> {
    slides: CarouselSlide[];
    /** Controlled current index. */
    index?: number;
    /** Default index (uncontrolled). */
    defaultIndex?: number;
    onIndexChange?: (i: number) => void;
    /** Auto-advance interval in ms. Autoplay pauses on hover/focus and during drag. */
    autoplay?: number;
    /** Continue past the last slide back to the first. Default true. */
    loop?: boolean;
    /** Pause autoplay while pointer is over the carousel. Default true. */
    pauseOnHover?: boolean;
    /** Enable drag / swipe gesture. Default true (off on `circular` + `thumbs`). */
    draggable?: boolean;
    /** Enable left/right keyboard navigation. Default true. */
    keyboard?: boolean;
    /** Slides per view (transform slider). Defaults: 1 for most variants, 2.4 for `cards`. */
    slidesPerView?: number;
    /** Drag threshold in px to commit a slide change. Default 50. */
    dragThreshold?: number;
    /** CSS aspect-ratio (defaults to 16/9). */
    aspect?: string;
    /** Slide gap (px). */
    gap?: number;
    accent?: string;
}

function useIndexState(
    controlled: number | undefined,
    defaultIndex: number,
    length: number,
    onChange?: (i: number) => void,
    loop = true,
) {
    const [internal, setInternal] = React.useState(defaultIndex);
    const isControlled = controlled !== undefined;
    const i = controlled ?? internal;

    const setI = React.useCallback(
        (n: number) => {
            if (length === 0) return;
            let next: number;
            if (loop) {
                next = ((n % length) + length) % length;
            } else {
                next = Math.min(length - 1, Math.max(0, n));
            }
            if (!isControlled) setInternal(next);
            onChange?.(next);
        },
        [isControlled, length, loop, onChange],
    );

    return [i, setI] as const;
}

interface TransformSliderProps {
    slides: CarouselSlide[];
    index: number;
    setIndex: (n: number) => void;
    slidesPerView: number;
    gap: number;
    aspect: string;
    fixedAspect?: boolean;
    draggable: boolean;
    dragThreshold: number;
    onDragStateChange?: (dragging: boolean) => void;
}

const TransformSlider: React.FC<TransformSliderProps> = ({
    slides,
    index,
    setIndex,
    slidesPerView,
    gap,
    aspect,
    fixedAspect = true,
    draggable,
    dragThreshold,
    onDragStateChange,
}) => {
    const viewportRef = React.useRef<HTMLDivElement | null>(null);
    const [viewportWidth, setViewportWidth] = React.useState(0);
    const [dragX, setDragX] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);
    const dragStartX = React.useRef(0);
    const slideWidth = React.useMemo(
        () => (viewportWidth - gap * Math.max(0, slidesPerView - 1)) / slidesPerView,
        [viewportWidth, gap, slidesPerView],
    );

    React.useEffect(() => {
        const el = viewportRef.current;
        if (!el || typeof ResizeObserver === "undefined") return;
        const ro = new ResizeObserver(([entry]) => {
            if (entry) setViewportWidth(entry.contentRect.width);
        });
        ro.observe(el);
        setViewportWidth(el.clientWidth);
        return () => ro.disconnect();
    }, []);

    const baseOffset = -index * (slideWidth + gap);
    const offset = baseOffset + dragX;

    const beginDrag = (clientX: number) => {
        if (!draggable) return;
        dragStartX.current = clientX;
        setIsDragging(true);
        onDragStateChange?.(true);
    };

    const moveDrag = (clientX: number) => {
        if (!isDragging) return;
        setDragX(clientX - dragStartX.current);
    };

    const endDrag = () => {
        if (!isDragging) return;
        const commit = Math.abs(dragX) > dragThreshold ? Math.sign(dragX) * -1 : 0;
        if (commit !== 0) setIndex(index + commit);
        setDragX(0);
        setIsDragging(false);
        onDragStateChange?.(false);
    };

    return (
        // biome-ignore lint/a11y/noStaticElementInteractions: viewport must intercept pointer/touch for swipe-to-slide
        <div
            ref={viewportRef}
            className={cn(
                "overflow-hidden rounded-md bg-(--diamond-surface-alt,#ebe8e1)",
                draggable && (isDragging ? "cursor-grabbing" : "cursor-grab"),
            )}
            style={fixedAspect ? { aspectRatio: aspect } : undefined}
            onMouseDown={(e) => beginDrag(e.clientX)}
            onMouseMove={(e) => moveDrag(e.clientX)}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={(e) => {
                const t = e.touches[0];
                if (t) beginDrag(t.clientX);
            }}
            onTouchMove={(e) => {
                const t = e.touches[0];
                if (t) moveDrag(t.clientX);
            }}
            onTouchEnd={endDrag}
        >
            <div
                className={cn(
                    "flex h-full",
                    !isDragging && "transition-transform duration-300 ease-out",
                )}
                style={{
                    gap: `${gap}px`,
                    transform: `translateX(${offset}px)`,
                    width: viewportWidth > 0 ? "fit-content" : "100%",
                }}
            >
                {slides.map((s, k) => (
                    <div
                        key={s.id ?? k}
                        className="shrink-0"
                        style={{
                            width: slideWidth > 0 ? `${slideWidth}px` : `${100 / slidesPerView}%`,
                        }}
                    >
                        {s.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const Carousel = React.forwardRef<HTMLElement, CarouselProps>(function Carousel(
    {
        className,
        variant = "dots",
        slides,
        index,
        defaultIndex = 0,
        onIndexChange,
        autoplay,
        loop = true,
        pauseOnHover = true,
        draggable,
        keyboard = true,
        slidesPerView,
        dragThreshold = 50,
        aspect = "16 / 9",
        gap = 8,
        accent,
        style,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        ...rest
    },
    ref,
) {
    const [i, setI] = useIndexState(index, defaultIndex, slides.length, onIndexChange, loop);
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const isThumbs = variant === "thumbs";
    const isCircular = variant === "circular";
    const isCards = variant === "cards";
    const isArrows = variant === "arrows";
    const isProgress = variant === "progress";
    const isDots = variant === "dots";

    const effectiveSlidesPerView = slidesPerView ?? (isCards ? 2.4 : 1);
    const effectiveDraggable = draggable ?? !(isCircular || isThumbs);

    const [hovered, setHovered] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const autoplayActive = !!autoplay && !(pauseOnHover && hovered) && !isDragging;

    React.useEffect(() => {
        if (!autoplayActive) return;
        const id = setInterval(() => setI(i + 1), autoplay);
        return () => clearInterval(id);
    }, [autoplayActive, autoplay, i, setI]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!keyboard) return;
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            setI(i - 1);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            setI(i + 1);
        }
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        setHovered(true);
        onMouseEnter?.(e);
    };
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        setHovered(false);
        onMouseLeave?.(e);
    };
    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
        setHovered(true);
        onFocus?.(e);
    };
    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        setHovered(false);
        onBlur?.(e);
    };

    /* `thumbs` keeps its row of clickable thumbnails — single-slide stage. */
    if (isThumbs) {
        return (
            <section
                ref={ref}
                className={cn(carouselVariants({ variant }), className)}
                style={inlineStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                tabIndex={keyboard ? 0 : undefined}
                aria-label="Carousel"
                aria-roledescription="carousel"
                {...rest}
            >
                <TransformSlider
                    slides={slides}
                    index={i}
                    setIndex={setI}
                    slidesPerView={1}
                    gap={0}
                    aspect={aspect}
                    draggable={effectiveDraggable}
                    dragThreshold={dragThreshold}
                    onDragStateChange={setIsDragging}
                />
                <div className="mt-1.5 grid grid-cols-4 gap-1">
                    {slides.map((s, k) => (
                        <button
                            type="button"
                            key={s.id ?? k}
                            onClick={() => setI(k)}
                            aria-label={`Go to slide ${k + 1}`}
                            aria-current={k === i ? "true" : undefined}
                            className={cn(
                                "aspect-square cursor-pointer overflow-hidden rounded transition-opacity",
                                k === i
                                    ? "opacity-100 ring-2 ring-(--diamond-accent,#2b7fff)"
                                    : "opacity-70 hover:opacity-100",
                            )}
                        >
                            {s.thumb ?? s.content}
                        </button>
                    ))}
                </div>
            </section>
        );
    }

    /* `circular` shows a flat row, click to focus. No transform slider. */
    if (isCircular) {
        return (
            <section
                ref={ref}
                className={cn(carouselVariants({ variant }), className)}
                style={inlineStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                tabIndex={keyboard ? 0 : undefined}
                aria-label="Carousel"
                aria-roledescription="carousel"
                {...rest}
            >
                <div className="flex items-center justify-center" style={{ gap }}>
                    {slides.map((s, k) => (
                        <button
                            type="button"
                            key={s.id ?? k}
                            onClick={() => setI(k)}
                            aria-label={`Go to slide ${k + 1}`}
                            aria-current={k === i ? "true" : undefined}
                            className={cn(
                                "size-20 shrink-0 cursor-pointer overflow-hidden rounded-full transition-all",
                                k === i
                                    ? "scale-110 opacity-100 ring-[3px] ring-(--diamond-accent,#2b7fff)"
                                    : "opacity-60 hover:opacity-90",
                            )}
                        >
                            {s.content}
                        </button>
                    ))}
                </div>
            </section>
        );
    }

    /* `progress` — single-slide stage + counter + progress bar. */
    if (isProgress) {
        return (
            <section
                ref={ref}
                className={cn(carouselVariants({ variant }), className)}
                style={inlineStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                tabIndex={keyboard ? 0 : undefined}
                aria-label="Carousel"
                aria-roledescription="carousel"
                {...rest}
            >
                <div className="mb-1.5 flex items-center justify-between font-mono text-(--diamond-muted,#6b6862) text-[10px] uppercase tracking-[0.1em]">
                    <span>
                        {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                    </span>
                    {autoplay && (
                        <span>{autoplayActive ? `Autoplay ${Math.round(autoplay / 1000)}s` : "Paused"}</span>
                    )}
                </div>
                <div className="relative">
                    <TransformSlider
                        slides={slides}
                        index={i}
                        setIndex={setI}
                        slidesPerView={1}
                        gap={0}
                        aspect={aspect}
                        draggable={effectiveDraggable}
                        dragThreshold={dragThreshold}
                        onDragStateChange={setIsDragging}
                    />
                    <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-white/30">
                        <div
                            className="h-full bg-(--diamond-accent,#2b7fff) transition-all duration-300"
                            style={{ width: `${((i + 1) / slides.length) * 100}%` }}
                        />
                    </div>
                </div>
            </section>
        );
    }

    /* `dots`, `arrows`, `cards` — transform-based slider with controls overlay. */
    return (
        <section
            ref={ref}
            className={cn(carouselVariants({ variant }), className)}
            style={inlineStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            tabIndex={keyboard ? 0 : undefined}
            aria-label="Carousel"
            aria-roledescription="carousel"
            {...rest}
        >
            <TransformSlider
                slides={slides}
                index={i}
                setIndex={setI}
                slidesPerView={effectiveSlidesPerView}
                gap={gap}
                aspect={aspect}
                fixedAspect={!isCards}
                draggable={effectiveDraggable}
                dragThreshold={dragThreshold}
                onDragStateChange={setIsDragging}
            />

            {isArrows && (
                <>
                    <button
                        type="button"
                        onClick={() => setI(i - 1)}
                        aria-label="Previous slide"
                        disabled={!loop && i === 0}
                        className="-translate-y-1/2 absolute top-1/2 left-0 flex size-7 cursor-pointer items-center justify-center rounded-full border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) shadow-md transition-all hover:text-(--diamond-accent,#2b7fff) active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <CaretLeft weight="bold" size={14} />
                    </button>
                    <button
                        type="button"
                        onClick={() => setI(i + 1)}
                        aria-label="Next slide"
                        disabled={!loop && i === slides.length - 1}
                        className="-translate-y-1/2 absolute top-1/2 right-0 flex size-7 cursor-pointer items-center justify-center rounded-full border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) shadow-md transition-all hover:text-(--diamond-accent,#2b7fff) active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <CaretRight weight="bold" size={14} />
                    </button>
                </>
            )}

            {isDots && (
                <div className="mt-2 flex justify-center gap-1.5">
                    {slides.map((s, k) => (
                        <button
                            type="button"
                            key={s.id ?? k}
                            onClick={() => setI(k)}
                            aria-label={`Go to slide ${k + 1}`}
                            aria-current={k === i ? "true" : undefined}
                            className={cn(
                                "h-1.5 cursor-pointer rounded-full transition-all duration-200",
                                k === i ? "w-4 bg-(--diamond-accent,#2b7fff)" : "w-1.5 bg-(--diamond-border,#d9d5cc) hover:bg-(--diamond-muted,#6b6862)",
                            )}
                        />
                    ))}
                </div>
            )}

            {isCards && slides.length > effectiveSlidesPerView && (
                <div className="mt-2 flex justify-center gap-1.5">
                    {slides.map((s, k) => (
                        <button
                            type="button"
                            key={s.id ?? k}
                            onClick={() => setI(k)}
                            aria-label={`Go to slide ${k + 1}`}
                            aria-current={k === i ? "true" : undefined}
                            className={cn(
                                "h-1 cursor-pointer rounded-full transition-all duration-200",
                                k === i ? "w-3 bg-(--diamond-accent,#2b7fff)" : "w-1 bg-(--diamond-border,#d9d5cc)",
                            )}
                        />
                    ))}
                </div>
            )}
        </section>
    );
});

Carousel.displayName = "Diamond.Carousel";

export { carouselVariants };
