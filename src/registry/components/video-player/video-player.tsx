"use client";

import { Circle, CornersOut, Pause, Play } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · VideoPlayer — drives a real <video> when `src` is provided; falls back to poster-only otherwise. */

export type VideoPlayerVariant = "standard" | "live" | "portrait" | "rec" | "editorial" | "accent";

const videoPlayerVariants = cva("relative w-full overflow-hidden rounded-md bg-(--diamond-ink,#1a1917)", {
    variants: {
        variant: {
            standard: "",
            live: "",
            portrait: "aspect-[9/16] w-[180px]",
            rec: "rounded-sm border border-(--diamond-ink,#1a1917)",
            editorial: "",
            accent: "",
        },
        ratio: {
            video: "aspect-video",
            square: "aspect-square",
            portrait: "aspect-[9/16]",
            free: "",
        },
    },
    defaultVariants: { variant: "standard", ratio: "video" },
});

export interface VideoPlayerSpeed {
    id: string;
    /** Display label. */
    label: React.ReactNode;
    /** Playback rate multiplier (e.g. 0.5, 1, 1.5, 2). */
    rate?: number;
    /** Whether this is the active speed (controlled). */
    active?: boolean;
}

export interface VideoPlayerSideAction {
    id: string;
    icon: React.ReactNode;
    onClick?: () => void;
    label?: string;
}

export interface VideoPlayerProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title" | "onTimeUpdate">,
        VariantProps<typeof videoPlayerVariants> {
    /** Video source. When set, a real <video> element drives playback. */
    src?: string;
    /** Loop playback. */
    loop?: boolean;
    /** Autoplay on mount (subject to browser policy — pair with muted for reliability). */
    autoPlay?: boolean;
    /** Volume 0..1. */
    volume?: number;
    /** Muted. */
    muted?: boolean;
    /** Preload strategy. */
    preload?: "none" | "metadata" | "auto";
    /** Object-fit on the underlying <video>. */
    objectFit?: "cover" | "contain";
    /** Inline playback on iOS Safari. */
    playsInline?: boolean;

    /** Poster URL or React node (gradient, image) shown above the video. */
    poster?: React.ReactNode;
    /** Title (editorial / overlays). */
    title?: React.ReactNode;
    /** Subtitle (editorial / live). */
    subtitle?: React.ReactNode;

    /** Native lifecycle. */
    onEnded?: () => void;
    onTimeUpdate?: (currentTime: number, duration: number) => void;
    onPlayingChange?: (playing: boolean) => void;

    /** Controlled play state. */
    playing?: boolean;
    onPlayPauseToggle?: () => void;

    /** Live-stream count text (live variant). */
    liveCount?: React.ReactNode;
    /** Recording badge (rec variant). */
    recording?: boolean;
    /** Tag info (rec variant top-right). */
    tag?: React.ReactNode;

    /** Controlled current-time display. Defaults to formatted time from <video>. */
    currentTime?: React.ReactNode;
    /** Controlled duration display. Defaults to formatted duration from <video>. */
    duration?: React.ReactNode;
    /** Controlled progress 0..1. Defaults to derived progress. */
    progress?: number;
    /** Called when user seeks (0..1). */
    onSeek?: (progress: number) => void;

    /** Show built-in chrome (overlay play + bottom bar). */
    controls?: boolean;

    /** Speed switcher (accent variant). */
    speeds?: VideoPlayerSpeed[];
    /** Active speed id (controlled). */
    activeSpeedId?: string;
    /** Default active speed id (uncontrolled). */
    defaultSpeedId?: string;
    onSpeedChange?: (id: string) => void;

    /** Side-rail actions (portrait variant). */
    sideActions?: VideoPlayerSideAction[];

    accent?: string;
}

function formatTime(t: number): string {
    if (!Number.isFinite(t) || t < 0) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
}

function seekFractionFromEvent(e: React.MouseEvent<HTMLElement>): number {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0) return 0;
    return Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
}

interface PlaybackState {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    playing: boolean;
    currentTime: number;
    duration: number;
    progress: number;
    togglePlay: () => void;
    seek: (fraction: number) => void;
    setRate: (rate: number) => void;
    toggleFullscreen: () => void;
}

interface UsePlaybackOpts {
    controlledPlaying?: boolean;
    controlledProgress?: number;
    onControlledToggle?: () => void;
    onControlledSeek?: (p: number) => void;
    onEnded?: () => void;
    onTimeUpdate?: (t: number, d: number) => void;
    onPlayingChange?: (p: boolean) => void;
    autoPlay?: boolean;
    volume?: number;
    muted?: boolean;
    rootRef: React.RefObject<HTMLDivElement | null>;
}

function usePlayback(opts: UsePlaybackOpts): PlaybackState {
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const [internalPlaying, setInternalPlaying] = React.useState(Boolean(opts.autoPlay));
    const [internalTime, setInternalTime] = React.useState(0);
    const [internalDuration, setInternalDuration] = React.useState(0);
    const isControlled = opts.controlledPlaying !== undefined;
    const playing = opts.controlledPlaying ?? internalPlaying;
    const progress = opts.controlledProgress ?? (internalDuration > 0 ? internalTime / internalDuration : 0);

    const cbRef = React.useRef({
        onEnded: opts.onEnded,
        onTimeUpdate: opts.onTimeUpdate,
        onPlayingChange: opts.onPlayingChange,
    });
    cbRef.current = {
        onEnded: opts.onEnded,
        onTimeUpdate: opts.onTimeUpdate,
        onPlayingChange: opts.onPlayingChange,
    };

    React.useEffect(() => {
        const el = videoRef.current;
        if (!el) return;
        const onTime = () => {
            setInternalTime(el.currentTime);
            cbRef.current.onTimeUpdate?.(el.currentTime, el.duration || 0);
        };
        const onMeta = () => setInternalDuration(el.duration || 0);
        const onPlay = () => {
            if (!isControlled) setInternalPlaying(true);
            cbRef.current.onPlayingChange?.(true);
        };
        const onPause = () => {
            if (!isControlled) setInternalPlaying(false);
            cbRef.current.onPlayingChange?.(false);
        };
        const onEnded = () => {
            if (!isControlled) setInternalPlaying(false);
            cbRef.current.onEnded?.();
        };
        el.addEventListener("timeupdate", onTime);
        el.addEventListener("loadedmetadata", onMeta);
        el.addEventListener("durationchange", onMeta);
        el.addEventListener("play", onPlay);
        el.addEventListener("pause", onPause);
        el.addEventListener("ended", onEnded);
        return () => {
            el.removeEventListener("timeupdate", onTime);
            el.removeEventListener("loadedmetadata", onMeta);
            el.removeEventListener("durationchange", onMeta);
            el.removeEventListener("play", onPlay);
            el.removeEventListener("pause", onPause);
            el.removeEventListener("ended", onEnded);
        };
    }, [isControlled]);

    React.useEffect(() => {
        const el = videoRef.current;
        if (!el) return;
        if (playing) {
            const p = el.play();
            if (p && typeof p.catch === "function") {
                p.catch(() => {
                    if (!isControlled) setInternalPlaying(false);
                });
            }
        } else if (!el.paused) {
            el.pause();
        }
    }, [playing, isControlled]);

    React.useEffect(() => {
        const el = videoRef.current;
        if (!el || opts.volume === undefined) return;
        el.volume = Math.min(1, Math.max(0, opts.volume));
    }, [opts.volume]);

    React.useEffect(() => {
        const el = videoRef.current;
        if (!el || opts.muted === undefined) return;
        el.muted = opts.muted;
    }, [opts.muted]);

    const togglePlay = React.useCallback(() => {
        if (opts.onControlledToggle) {
            opts.onControlledToggle();
            return;
        }
        if (!isControlled) setInternalPlaying((p) => !p);
    }, [opts.onControlledToggle, isControlled]);

    const seek = React.useCallback(
        (fraction: number) => {
            const clamped = Math.min(1, Math.max(0, fraction));
            const el = videoRef.current;
            if (el && Number.isFinite(el.duration) && el.duration > 0) {
                el.currentTime = el.duration * clamped;
                setInternalTime(el.currentTime);
            }
            opts.onControlledSeek?.(clamped);
        },
        [opts.onControlledSeek],
    );

    const setRate = React.useCallback((rate: number) => {
        const el = videoRef.current;
        if (el) el.playbackRate = rate;
    }, []);

    const toggleFullscreen = React.useCallback(() => {
        const host = opts.rootRef.current;
        if (!host || typeof document === "undefined") return;
        if (document.fullscreenElement === host) {
            document.exitFullscreen?.();
        } else {
            host.requestFullscreen?.();
        }
    }, [opts.rootRef]);

    return {
        videoRef,
        playing,
        currentTime: internalTime,
        duration: internalDuration,
        progress,
        togglePlay,
        seek,
        setRate,
        toggleFullscreen,
    };
}

export const VideoPlayer = React.forwardRef<HTMLDivElement, VideoPlayerProps>(function VideoPlayer(
    {
        className,
        variant = "standard",
        ratio,
        src,
        loop,
        autoPlay,
        volume,
        muted,
        preload = "metadata",
        objectFit = "cover",
        playsInline = true,
        poster,
        liveCount,
        title,
        subtitle,
        onEnded,
        onTimeUpdate,
        onPlayingChange,
        playing: controlledPlaying,
        onPlayPauseToggle,
        currentTime: currentTimeOverride,
        duration: durationOverride,
        progress: progressOverride,
        onSeek,
        controls = true,
        recording,
        tag,
        speeds,
        activeSpeedId,
        defaultSpeedId,
        onSpeedChange,
        sideActions,
        accent,
        style,
        ...rest
    },
    ref,
) {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(ref, () => rootRef.current as HTMLDivElement, []);

    const playback = usePlayback({
        controlledPlaying,
        controlledProgress: progressOverride,
        onControlledToggle: onPlayPauseToggle,
        onControlledSeek: onSeek,
        onEnded,
        onTimeUpdate,
        onPlayingChange,
        autoPlay,
        volume,
        muted,
        rootRef,
    });

    const [internalSpeedId, setInternalSpeedId] = React.useState<string | undefined>(
        defaultSpeedId ?? speeds?.find((s) => s.active)?.id ?? speeds?.[0]?.id,
    );
    const currentSpeedId = activeSpeedId ?? internalSpeedId;

    React.useEffect(() => {
        const s = speeds?.find((x) => x.id === currentSpeedId);
        if (s?.rate !== undefined) playback.setRate(s.rate);
    }, [currentSpeedId, speeds, playback]);

    const handleSpeedChange = (id: string) => {
        if (activeSpeedId === undefined) setInternalSpeedId(id);
        onSpeedChange?.(id);
    };

    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const renderCurrentTime = (): React.ReactNode => {
        if (currentTimeOverride !== undefined) return currentTimeOverride;
        if (src) return formatTime(playback.currentTime);
        return undefined;
    };
    const renderDuration = (): React.ReactNode => {
        if (durationOverride !== undefined) return durationOverride;
        if (src && playback.duration > 0) return formatTime(playback.duration);
        return undefined;
    };
    const progressValue = progressOverride !== undefined ? progressOverride : src ? playback.progress : 0.35;

    const showCentralPlay =
        controls && (variant === "standard" || variant === "editorial" || variant === "accent") && !playback.playing;

    const objectFitCls = objectFit === "contain" ? "object-contain" : "object-cover";

    const videoEl = src ? (
        <video
            ref={playback.videoRef as React.RefObject<HTMLVideoElement>}
            src={src}
            loop={loop}
            muted={muted}
            preload={preload}
            playsInline={playsInline}
            className={cn("absolute inset-0 size-full", objectFitCls)}
        >
            <track kind="captions" />
        </video>
    ) : null;

    return (
        <div
            ref={rootRef}
            className={cn(videoPlayerVariants({ variant, ratio }), className)}
            style={inlineStyle}
            {...rest}
        >
            {videoEl}
            {!src &&
                (typeof poster === "string" ? (
                    <img src={poster} alt="" className="absolute inset-0 size-full object-cover" />
                ) : (
                    <div className="absolute inset-0">{poster}</div>
                ))}
            {variant === "live" && (
                <div className="absolute top-2 left-2 flex items-center gap-1 rounded bg-rose-500 px-2 py-0.5 font-bold text-[10px] text-white uppercase tracking-[0.1em]">
                    <Circle weight="fill" size={8} />
                    LIVE
                </div>
            )}
            {variant === "live" && liveCount && (
                <div className="absolute top-2 right-2 rounded bg-black/55 px-2 py-0.5 text-[10px] text-white">
                    {liveCount}
                </div>
            )}
            {variant === "rec" && recording && (
                <div className="absolute top-0 right-0 left-0 flex gap-2 bg-black/60 px-2 py-1.5 font-mono text-[#d4d0c8] text-[10px]">
                    <span className="flex items-center gap-1">
                        <Circle weight="fill" size={9} className="text-rose-500" />
                        REC
                    </span>
                    {renderCurrentTime() !== undefined && <span>{renderCurrentTime()}</span>}
                    {tag && <span className="ml-auto">{tag}</span>}
                </div>
            )}
            {variant === "editorial" && (title || subtitle) && (
                <>
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.7),transparent_55%)]" />
                    <div className="absolute right-2 bottom-2 left-2 text-white">
                        {subtitle && <div className="text-[10px] tracking-[0.1em] opacity-70">{subtitle}</div>}
                        {title && (
                            <div className="text-[14px] italic [font-family:Fraunces,Georgia,serif]">{title}</div>
                        )}
                    </div>
                </>
            )}
            {sideActions && variant === "portrait" && (
                <div className="absolute right-2 bottom-10 flex flex-col items-center gap-2">
                    {sideActions.map((a) => (
                        <button
                            type="button"
                            key={a.id}
                            onClick={a.onClick}
                            aria-label={a.label}
                            className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
                        >
                            {a.icon}
                        </button>
                    ))}
                </div>
            )}
            {showCentralPlay && variant !== "accent" && (
                <button
                    type="button"
                    onClick={playback.togglePlay}
                    aria-label="Play"
                    className="absolute flex size-12 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white shadow-lg hover:bg-black/70"
                    style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                >
                    <Play weight="fill" size={20} />
                </button>
            )}
            {variant === "accent" && (
                <button
                    type="button"
                    onClick={playback.togglePlay}
                    aria-label={playback.playing ? "Pause" : "Play"}
                    aria-pressed={playback.playing}
                    className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff) shadow-lg"
                >
                    {playback.playing ? <Pause weight="fill" size={20} /> : <Play weight="fill" size={20} />}
                </button>
            )}
            {variant === "portrait" && controls && (
                <button
                    type="button"
                    onClick={playback.togglePlay}
                    aria-label={playback.playing ? "Pause" : "Play"}
                    aria-pressed={playback.playing}
                    className={cn(
                        "absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white shadow-lg transition-opacity",
                        playback.playing ? "opacity-0 hover:opacity-100" : "opacity-100",
                    )}
                >
                    {playback.playing ? <Pause weight="fill" size={20} /> : <Play weight="fill" size={20} />}
                </button>
            )}
            {controls && variant === "standard" && (
                <div className="absolute right-0 bottom-0 left-0 flex items-center gap-2 bg-black/55 px-3 py-2 text-[11px] text-white">
                    <button
                        type="button"
                        onClick={playback.togglePlay}
                        aria-label={playback.playing ? "Pause" : "Play"}
                        className="inline-flex cursor-pointer items-center"
                    >
                        {playback.playing ? <Pause weight="fill" size={13} /> : <Play weight="fill" size={13} />}
                    </button>
                    {renderCurrentTime() !== undefined && <span>{renderCurrentTime()}</span>}
                    <button
                        type="button"
                        onClick={(e) => playback.seek(seekFractionFromEvent(e))}
                        aria-label="Seek"
                        className="h-1 flex-1 cursor-pointer overflow-hidden rounded-full bg-white/30 p-0"
                    >
                        <div
                            className="h-full bg-(--diamond-accent,#2b7fff)"
                            style={{ width: `${progressValue * 100}%` }}
                        />
                    </button>
                    {renderDuration() !== undefined && <span>{renderDuration()}</span>}
                    <button
                        type="button"
                        onClick={playback.toggleFullscreen}
                        aria-label="Fullscreen"
                        className="inline-flex cursor-pointer items-center"
                    >
                        <CornersOut size={13} />
                    </button>
                </div>
            )}
            {variant === "accent" && speeds && (
                <div className="absolute right-2 bottom-2 left-2 flex items-center gap-1.5 text-[10px] text-white">
                    {speeds.map((s) => (
                        <button
                            type="button"
                            key={s.id}
                            onClick={() => handleSpeedChange(s.id)}
                            aria-pressed={s.id === currentSpeedId}
                            className={cn(
                                "cursor-pointer rounded px-2 py-0.5",
                                s.id === currentSpeedId
                                    ? "bg-(--diamond-accent,#2b7fff)"
                                    : "bg-white/20 hover:bg-white/30",
                            )}
                        >
                            {s.label}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={playback.toggleFullscreen}
                        aria-label="Fullscreen"
                        className="ml-auto inline-flex cursor-pointer items-center gap-1"
                    >
                        HD · CC
                    </button>
                </div>
            )}
        </div>
    );
});

VideoPlayer.displayName = "Diamond.VideoPlayer";

export { videoPlayerVariants };
