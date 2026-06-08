"use client";

import { Pause, Play, SkipBack, SkipForward } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · AudioPlayer — drives a real <audio> when `src` is provided; falls back to controlled mode otherwise. */

export type AudioPlayerVariant = "minimal" | "podcast" | "waveform" | "radio" | "playlist" | "pill";

const audioPlayerVariants = cva("flex items-center gap-3 rounded-md border px-3 py-2 text-[12px]", {
    variants: {
        variant: {
            minimal: "border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917)",
            podcast:
                "flex-col items-stretch gap-2 border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917)",
            waveform: "border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) py-3 text-(--diamond-ink,#1a1917)",
            radio: "border-(--diamond-ink,#1a1917) bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#fff)",
            playlist: "flex-col gap-1.5 border-0 bg-transparent p-0",
            pill: "rounded-full border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-3 py-1.5 text-(--diamond-ink,#1a1917)",
        },
    },
    defaultVariants: { variant: "minimal" },
});

export interface AudioPlayerTrack {
    id: React.Key;
    title: React.ReactNode;
    duration?: React.ReactNode;
    /** Audio source — selecting this track loads & plays it. */
    src?: string;
}

export interface AudioPlayerProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title" | "onTimeUpdate">,
        VariantProps<typeof audioPlayerVariants> {
    /** Audio source. When set, a real <audio> element drives playback. */
    src?: string;
    /** Loop playback. */
    loop?: boolean;
    /** Try to autoplay on mount (subject to browser policy). */
    autoPlay?: boolean;
    /** Volume 0..1. */
    volume?: number;
    /** Preload strategy for the native element. */
    preload?: "none" | "metadata" | "auto";
    /** Muted state for the native element. */
    muted?: boolean;

    /** Native lifecycle callbacks. */
    onEnded?: () => void;
    onTimeUpdate?: (currentTime: number, duration: number) => void;
    onPlayingChange?: (playing: boolean) => void;

    /** Title (currently-playing track). */
    title?: React.ReactNode;
    /** Subtitle (episode #, station). */
    subtitle?: React.ReactNode;
    /** Cover image element. */
    cover?: React.ReactNode;

    /** Controlled play state — overrides internal. */
    playing?: boolean;
    /** Controlled toggle handler — overrides internal. */
    onPlayPauseToggle?: () => void;

    /** Controlled display for current time. Otherwise auto-formatted from <audio>. */
    currentTime?: React.ReactNode;
    /** Controlled display for duration. Otherwise auto-formatted from <audio>. */
    duration?: React.ReactNode;
    /** Controlled progress 0..1. Otherwise derived from <audio>. */
    progress?: number;
    /** Seek callback (0..1). Always fired in addition to native seek. */
    onSeek?: (progress: number) => void;

    /** Playlist tracks (`playlist` variant). */
    tracks?: AudioPlayerTrack[];
    /** Active track id (controlled). */
    activeTrackId?: React.Key;
    /** Default active track id (uncontrolled). */
    defaultActiveTrackId?: React.Key;
    onSelectTrack?: (id: React.Key) => void;

    /** Show 15s / 30s skip controls (`podcast`). */
    showSkip?: boolean;
    /** Waveform data points (0..1). */
    waveform?: number[];
    accent?: string;
}

function formatTime(t: number): string {
    if (!Number.isFinite(t) || t < 0) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
}

interface PlaybackState {
    audioRef: React.RefObject<HTMLAudioElement | null>;
    playing: boolean;
    currentTime: number;
    duration: number;
    progress: number;
    togglePlay: () => void;
    seek: (fraction: number) => void;
    skip: (seconds: number) => void;
}

interface UsePlaybackOpts {
    controlledPlaying?: boolean;
    controlledProgress?: number;
    onControlledToggle?: () => void;
    onControlledSeek?: (p: number) => void;
    onEnded?: () => void;
    onTimeUpdate?: (t: number, d: number) => void;
    onPlayingChange?: (p: boolean) => void;
    volume?: number;
    muted?: boolean;
    autoPlay?: boolean;
}

function usePlayback(opts: UsePlaybackOpts): PlaybackState {
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
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
        const el = audioRef.current;
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
        const el = audioRef.current;
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
        const el = audioRef.current;
        if (!el || opts.volume === undefined) return;
        el.volume = Math.min(1, Math.max(0, opts.volume));
    }, [opts.volume]);

    React.useEffect(() => {
        const el = audioRef.current;
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
            const el = audioRef.current;
            if (el && Number.isFinite(el.duration) && el.duration > 0) {
                el.currentTime = el.duration * clamped;
                setInternalTime(el.currentTime);
            }
            opts.onControlledSeek?.(clamped);
        },
        [opts.onControlledSeek],
    );

    const skip = React.useCallback((seconds: number) => {
        const el = audioRef.current;
        if (!el) return;
        const t = Math.min(el.duration || Number.POSITIVE_INFINITY, Math.max(0, el.currentTime + seconds));
        el.currentTime = t;
        setInternalTime(t);
    }, []);

    return {
        audioRef,
        playing,
        currentTime: internalTime,
        duration: internalDuration,
        progress,
        togglePlay,
        seek,
        skip,
    };
}

function seekFractionFromEvent(e: React.MouseEvent<HTMLElement>): number {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0) return 0;
    return Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
}

const PlayBtn: React.FC<{ playing?: boolean; onClick?: () => void; size?: number; accent?: boolean }> = ({
    playing,
    onClick,
    size = 32,
    accent,
}) => {
    const iconSize = Math.round(size * 0.45);
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={playing ? "Pause" : "Play"}
            aria-pressed={playing}
            className={cn(
                "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors",
                "focus-visible:outline-none focus-visible:ring-(--diamond-accent,#2b7fff) focus-visible:ring-2 focus-visible:ring-offset-1",
                accent
                    ? "bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff) hover:brightness-110"
                    : "bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#fff) hover:bg-(--diamond-accent,#2b7fff) hover:text-(--diamond-on-accent,#fff)",
            )}
            style={{ width: size, height: size }}
        >
            {playing ? <Pause weight="fill" size={iconSize} /> : <Play weight="fill" size={iconSize} />}
        </button>
    );
};

export const AudioPlayer = React.forwardRef<HTMLDivElement, AudioPlayerProps>(function AudioPlayer(
    {
        className,
        variant = "minimal",
        src,
        loop,
        autoPlay,
        volume,
        preload = "metadata",
        muted,
        onEnded,
        onTimeUpdate,
        onPlayingChange,
        title,
        subtitle,
        cover,
        playing: controlledPlaying,
        onPlayPauseToggle,
        currentTime: currentTimeOverride,
        duration: durationOverride,
        progress: progressOverride,
        onSeek,
        tracks,
        activeTrackId: controlledActiveId,
        defaultActiveTrackId,
        onSelectTrack,
        showSkip,
        waveform,
        accent,
        style,
        ...rest
    },
    ref,
) {
    const [internalActiveId, setInternalActiveId] = React.useState<React.Key | undefined>(
        defaultActiveTrackId ?? tracks?.[0]?.id,
    );
    const activeId = controlledActiveId ?? internalActiveId;
    const activeTrack = tracks?.find((t) => t.id === activeId);
    const effectiveSrc = activeTrack?.src ?? src;

    const playback = usePlayback({
        controlledPlaying,
        controlledProgress: progressOverride,
        onControlledToggle: onPlayPauseToggle,
        onControlledSeek: onSeek,
        onEnded,
        onTimeUpdate,
        onPlayingChange,
        volume,
        muted,
        autoPlay,
    });

    const handleSelectTrack = (id: React.Key) => {
        if (controlledActiveId === undefined) setInternalActiveId(id);
        onSelectTrack?.(id);
    };

    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const renderCurrentTime = (): React.ReactNode => {
        if (currentTimeOverride !== undefined) return currentTimeOverride;
        if (effectiveSrc) return formatTime(playback.currentTime);
        return undefined;
    };
    const renderDuration = (): React.ReactNode => {
        if (durationOverride !== undefined) return durationOverride;
        if (effectiveSrc && playback.duration > 0) return formatTime(playback.duration);
        return undefined;
    };

    const progressValue = progressOverride !== undefined ? progressOverride : effectiveSrc ? playback.progress : 0.4;

    const audioEl = effectiveSrc ? (
        // biome-ignore lint/a11y/useMediaCaption: consumers attach <track> after copying if captions are required
        <audio
            ref={playback.audioRef as React.RefObject<HTMLAudioElement>}
            src={effectiveSrc}
            loop={loop}
            preload={preload}
            className="hidden"
        />
    ) : null;

    if (variant === "playlist" && tracks) {
        return (
            <div ref={ref} className={cn(audioPlayerVariants({ variant }), className)} style={inlineStyle} {...rest}>
                {audioEl}
                {tracks.map((t, i) => {
                    const isActive = t.id === activeId;
                    return (
                        <button
                            type="button"
                            key={t.id}
                            onClick={() => handleSelectTrack(t.id)}
                            className={cn(
                                "flex cursor-pointer items-center gap-3 rounded px-3 py-1.5 text-left text-[12px]",
                                "focus-visible:outline-none focus-visible:ring-(--diamond-accent,#2b7fff) focus-visible:ring-2",
                                isActive
                                    ? "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_8%,var(--diamond-surface,#fff))] font-semibold text-(--diamond-accent,#2b7fff)"
                                    : "bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-ink,#1a1917) hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_8%,var(--diamond-surface-alt,#ebe8e1))]",
                            )}
                        >
                            <span className="w-5 font-mono text-(--diamond-muted,#6b6862) text-[10px]">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1 truncate">{t.title}</span>
                            {t.duration && (
                                <span className="font-mono text-(--diamond-muted,#6b6862) text-[10px]">
                                    {t.duration}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        );
    }

    if (variant === "podcast") {
        return (
            <div ref={ref} className={cn(audioPlayerVariants({ variant }), className)} style={inlineStyle} {...rest}>
                {audioEl}
                <div className="flex items-center gap-3">
                    {cover && <div className="size-10 shrink-0 overflow-hidden rounded">{cover}</div>}
                    <div className="min-w-0 flex-1">
                        {title && <div className="truncate font-semibold text-[12px]">{title}</div>}
                        {subtitle && (
                            <div className="truncate text-(--diamond-muted,#6b6862) text-[10px]">{subtitle}</div>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {showSkip && (
                        <button
                            type="button"
                            onClick={() => playback.skip(-15)}
                            aria-label="Rewind 15 seconds"
                            className="inline-flex cursor-pointer items-center gap-0.5 text-(--diamond-muted,#6b6862) text-[11px] hover:text-(--diamond-ink,#1a1917)"
                        >
                            <SkipBack weight="fill" size={11} />
                            15
                        </button>
                    )}
                    <PlayBtn playing={playback.playing} onClick={playback.togglePlay} size={36} accent />
                    {showSkip && (
                        <button
                            type="button"
                            onClick={() => playback.skip(30)}
                            aria-label="Skip forward 30 seconds"
                            className="inline-flex cursor-pointer items-center gap-0.5 text-(--diamond-muted,#6b6862) text-[11px] hover:text-(--diamond-ink,#1a1917)"
                        >
                            30
                            <SkipForward weight="fill" size={11} />
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={(e) => playback.seek(seekFractionFromEvent(e))}
                        aria-label="Seek"
                        className="h-1 flex-1 cursor-pointer overflow-hidden rounded-full bg-(--diamond-surface-alt,#ebe8e1) p-0"
                    >
                        <div
                            className="h-full bg-(--diamond-accent,#2b7fff)"
                            style={{ width: `${progressValue * 100}%` }}
                        />
                    </button>
                </div>
            </div>
        );
    }

    if (variant === "waveform") {
        const data = waveform ?? Array.from({ length: 28 }, (_, i) => Math.abs(Math.sin(i * 0.5)));
        return (
            <div ref={ref} className={cn(audioPlayerVariants({ variant }), className)} style={inlineStyle} {...rest}>
                {audioEl}
                <PlayBtn playing={playback.playing} onClick={playback.togglePlay} size={38} accent />
                <button
                    type="button"
                    onClick={(e) => playback.seek(seekFractionFromEvent(e))}
                    aria-label="Seek"
                    className="flex h-6 flex-1 cursor-pointer items-center gap-[2px] bg-transparent p-0"
                >
                    {data.map((v, i) => (
                        <div
                            // biome-ignore lint/suspicious/noArrayIndexKey: waveform bars are positional and never reorder
                            key={i}
                            className="flex-1 rounded-sm"
                            style={{
                                height: Math.max(4, v * 22),
                                background:
                                    i / data.length <= progressValue
                                        ? "var(--diamond-accent,#2b7fff)"
                                        : "var(--diamond-border,#d9d5cc)",
                            }}
                        />
                    ))}
                </button>
                {renderCurrentTime() !== undefined && (
                    <span className="font-mono text-(--diamond-muted,#6b6862) text-[10px]">{renderCurrentTime()}</span>
                )}
            </div>
        );
    }

    if (variant === "radio") {
        return (
            <div ref={ref} className={cn(audioPlayerVariants({ variant }), className)} style={inlineStyle} {...rest}>
                {audioEl}
                <PlayBtn playing={playback.playing} onClick={playback.togglePlay} size={32} accent />
                <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold text-[12px]">{title ?? "Now playing"}</div>
                    {subtitle && <div className="truncate text-[#a8a49c] text-[10px]">{subtitle}</div>}
                </div>
                <span className="font-mono text-[#a8a49c] text-[10px] uppercase">LIVE</span>
            </div>
        );
    }

    if (variant === "pill") {
        return (
            <div ref={ref} className={cn(audioPlayerVariants({ variant }), className)} style={inlineStyle} {...rest}>
                {audioEl}
                <PlayBtn playing={playback.playing} onClick={playback.togglePlay} size={22} />
                <button
                    type="button"
                    onClick={(e) => playback.seek(seekFractionFromEvent(e))}
                    aria-label="Seek"
                    className="h-[3px] flex-1 cursor-pointer overflow-hidden rounded-full bg-(--diamond-surface-alt,#ebe8e1) p-0"
                >
                    <div
                        className="h-full bg-(--diamond-accent,#2b7fff)"
                        style={{ width: `${progressValue * 100}%` }}
                    />
                </button>
                {renderCurrentTime() !== undefined && (
                    <span className="font-mono text-(--diamond-muted,#6b6862) text-[10px]">{renderCurrentTime()}</span>
                )}
            </div>
        );
    }

    const displayTime = renderCurrentTime() ?? "0:00";
    const displayDuration = renderDuration();
    return (
        <div ref={ref} className={cn(audioPlayerVariants({ variant }), className)} style={inlineStyle} {...rest}>
            {audioEl}
            <PlayBtn playing={playback.playing} onClick={playback.togglePlay} size={32} />
            <button
                type="button"
                onClick={(e) => playback.seek(seekFractionFromEvent(e))}
                aria-label="Seek"
                className="h-1 flex-1 cursor-pointer overflow-hidden rounded-full bg-(--diamond-surface-alt,#ebe8e1) p-0"
            >
                <div className="h-full bg-(--diamond-accent,#2b7fff)" style={{ width: `${progressValue * 100}%` }} />
            </button>
            <span className="font-mono text-(--diamond-muted,#6b6862) text-[10px]">
                {displayTime}
                {displayDuration ? ` / ${displayDuration}` : ""}
            </span>
        </div>
    );
});

AudioPlayer.displayName = "Diamond.AudioPlayer";

export { audioPlayerVariants };
