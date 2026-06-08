"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* ========================================================================
 *  Diamond · Button
 *  ------------------------------------------------------------------------
 *  One file, Tailwind only. Edit anything freely.
 *
 *  Prop model
 *  ----------
 *    variant   the visual look — autocompletes 59 options.
 *    size      "sm" | "md" | "lg" | "icon"
 *    accent    CSS color override for this instance (sets --diamond-accent).
 *    asChild   Radix Slot composition (render onto any child element).
 *    loading   spinner + aria-busy + disabled.
 *    leftIcon / rightIcon  optional adornments.
 *
 *  Native React/DOM props (type="submit", onClick, onFocus, aria-*, form,
 *  name, …) pass through to the underlying <button> unchanged.
 * ====================================================================== */

export type ButtonVariant =
    /* Solid    */
    | "solid"
    | "gradient"
    | "glow"
    | "pill"
    | "layer"
    | "arrow"
    /* Outlined */
    | "outline"
    | "dashed"
    | "double"
    | "fill"
    | "dotborder"
    | "trace"
    /* Subtle   */
    | "ghost"
    | "soft"
    | "underline"
    | "caret"
    | "glass"
    | "stamp"
    /* Expressive */
    | "neobrutal"
    | "retro"
    | "pixel"
    | "terminal"
    | "aurora"
    | "sketch"
    /* Shaped   */
    | "notch"
    | "chevron"
    | "ticket"
    | "mono-ticket"
    | "exec"
    /* Utility  */
    | "icon-chip"
    | "split"
    | "circle"
    | "status"
    | "darkcard"
    | "lift"
    /* Motion   */
    | "liquid"
    | "ring"
    | "scan"
    | "breathe"
    | "wave"
    | "morse"
    /* Reactive */
    | "magnet"
    | "reveal"
    | "progress"
    | "gooey"
    | "confetti"
    | "fold"
    /* Surface  */
    | "paper"
    | "grain"
    | "tape"
    | "cloud"
    | "neumorph"
    | "longshadow"
    /* Identity */
    | "glitch"
    | "slash"
    | "scope"
    | "badge"
    | "counter"
    | "url";

/* ------- CVA · each variant is ONE Tailwind string (edit in place) ------ */

const buttonVariants = cva(
    [
        "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-medium",
        "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "focus-visible:ring-[color:var(--diamond-accent,#2b7fff)]",
        "cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        /* Default svg size = 1em ONLY when the icon doesn't already declare its own
       size via `width`/`height` attributes (Phosphor, Lucide, react-icons all
       set these when their `size` prop is used) or via a Tailwind `size-*`
       class. This way `<Icon size={64} />` renders at 64px, `<Icon className="size-8" />`
       at 2rem, and bare `<svg>` falls back to 1em. */
        "[&_svg:not([class*=size-]):not([width]):not([height])]:size-[1em]",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    ].join(" "),
    {
        variants: {
            /* `size` is declared FIRST so its horizontal padding (px-…) is
         emitted before the variant's. Tailwind-merge keeps the latter,
         which means a variant can freely override pl-/pr- without the
         size's px-X eating it. Swapping these breaks every variant
         that needs custom horizontal padding (magnet, wave, morse,
         scope, badge, gooey, counter, etc.). */
            size: {
                sm: "h-9 rounded-md px-4 text-[13px]",
                md: "h-11 rounded-[10px] px-[22px] text-[15px]",
                lg: "h-12 rounded-xl px-7 text-[17px]",
                icon: "size-[52px] rounded-full p-0",
            },
            variant: {
                /* ── SOLID ─────────────────────────────────────────────────── */
                solid: "bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,white) hover:-translate-y-px hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,black)]",
                gradient:
                    "bg-[linear-gradient(135deg,var(--diamond-accent,#2b7fff),color-mix(in_oklab,var(--diamond-accent,#2b7fff)_60%,#000))] text-(--diamond-on-accent,white) shadow-[0_4px_14px_-2px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_40%,transparent)] hover:-translate-y-px hover:shadow-[0_8px_20px_-4px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_50%,transparent)]",
                glow: "bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,white) shadow-[0_0_24px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_50%,transparent),0_0_0_1px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,transparent)] hover:shadow-[0_0_36px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_70%,transparent),0_0_0_1px_var(--diamond-accent,#2b7fff)]",
                pill: "rounded-full bg-(--diamond-accent,#2b7fff) px-7 text-(--diamond-on-accent,white) hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,black)]",
                layer: "bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,white) shadow-[4px_4px_0_-1px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_30%,white),8px_8px_0_-2px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_20%,white)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_-1px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_30%,white),12px_12px_0_-2px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_20%,white)]",
                arrow: 'overflow-hidden bg-(--diamond-accent,#2b7fff) pr-10 text-(--diamond-on-accent,white) after:absolute after:top-1/2 after:right-4 after:-translate-y-1/2 after:transition-transform after:duration-200 after:content-["→"] hover:after:translate-x-1',

                /* ── OUTLINED ──────────────────────────────────────────────── */
                outline:
                    "border-(--diamond-accent,#2b7fff) border-[1.5px] bg-transparent text-(--diamond-accent,#2b7fff) hover:bg-(--diamond-accent,#2b7fff) hover:text-(--diamond-on-accent,white)",
                dashed: "border-(--diamond-accent,#2b7fff) border-[1.5px] border-dashed bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_8%,transparent)] text-(--diamond-accent,#2b7fff) hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_20%,transparent)]",
                double: "border-(--diamond-accent,#2b7fff) border-[3px] border-double bg-transparent font-semibold text-(--diamond-accent,#2b7fff) hover:bg-(--diamond-accent,#2b7fff) hover:text-(--diamond-on-accent,white)",
                fill: 'z-0 overflow-hidden border-(--diamond-accent,#2b7fff) border-[1.5px] bg-transparent text-(--diamond-accent,#2b7fff) before:absolute before:inset-0 before:-z-10 before:-translate-x-full before:bg-(--diamond-accent,#2b7fff) before:transition-transform before:duration-300 before:content-[""] hover:text-(--diamond-on-accent,white) hover:before:translate-x-0',
                dotborder:
                    'bg-transparent text-(--diamond-accent,#2b7fff) before:absolute before:inset-0 before:rounded-[inherit] before:border-(--diamond-accent,#2b7fff) before:border-2 before:border-dotted before:transition-all before:duration-300 before:content-[""] hover:before:-inset-1',
                trace: "animate-[d-trace_3s_linear_infinite] rounded-[10px] border-2 border-transparent text-(--diamond-ink,#1a1917) [background-size:100%_100%,200%_100%] [background:linear-gradient(var(--diamond-surface,white),var(--diamond-surface,white))_padding-box,linear-gradient(90deg,var(--diamond-accent,#2b7fff),transparent_50%,var(--diamond-accent,#2b7fff))_border-box]",

                /* ── SUBTLE ────────────────────────────────────────────────── */
                ghost: "bg-transparent text-(--diamond-accent,#2b7fff) hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_12%,transparent)]",
                soft: "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_18%,var(--diamond-surface,white))] text-(--diamond-accent,#2b7fff) hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_28%,var(--diamond-surface,white))]",
                underline:
                    'rounded-none bg-transparent px-0 py-1 text-(--diamond-accent,#2b7fff) after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[1.5px] after:origin-right after:scale-x-0 after:bg-(--diamond-accent,#2b7fff) after:transition-transform after:duration-300 after:content-[""] hover:after:origin-left hover:after:scale-x-100',
                caret: 'rounded-none border-current border-b bg-transparent px-0 py-1.5 text-(--diamond-ink,#1a1917) before:mr-1.5 before:font-bold before:text-(--diamond-accent,#2b7fff) before:content-["→"] hover:text-(--diamond-accent,#2b7fff)',
                glass: "rounded-xl border border-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_30%,transparent)] bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_20%,transparent)] text-(--diamond-accent,#2b7fff) backdrop-blur-md hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_30%,transparent)]",
                stamp: "border border-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_30%,var(--diamond-surface,white))] bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_28%,var(--diamond-surface,white))] font-semibold text-[var(--diamond-accent-deep,color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,black))] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.18),inset_-2px_-2px_4px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_15%,transparent)] hover:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.25),inset_-1px_-1px_2px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_10%,transparent)]",

                /* ── EXPRESSIVE ────────────────────────────────────────────── */
                neobrutal:
                    "rounded-md border-(--diamond-ink,#1a1917) border-2 bg-(--diamond-accent,#2b7fff) font-bold text-(--diamond-on-accent,white) shadow-[4px_4px_0_0_var(--diamond-ink,#1a1917)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--diamond-ink,#1a1917)] active:translate-x-1 active:translate-y-1 active:shadow-none",
                retro: "rounded-sm border-t border-t-[color-mix(in_oklab,white_30%,var(--diamond-accent,#2b7fff))] border-r-2 border-r-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,black)] border-b-2 border-b-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,black)] border-l border-l-[color-mix(in_oklab,white_30%,var(--diamond-accent,#2b7fff))] bg-(--diamond-accent,#2b7fff) font-semibold text-(--diamond-on-accent,white)",
                pixel: "rounded-none bg-(--diamond-accent,#2b7fff) font-bold font-mono text-(--diamond-on-accent,white) uppercase tracking-[0.1em] shadow-[0_-4px_0_0_color-mix(in_oklab,white_20%,var(--diamond-accent,#2b7fff))_inset,0_4px_0_0_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,black)_inset,4px_0_0_0_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,black)_inset,-4px_0_0_0_color-mix(in_oklab,white_15%,var(--diamond-accent,#2b7fff))_inset] active:translate-y-0.5",
                terminal:
                    'rounded-md border border-[#2d2c28] bg-[#0a0a08] font-mono text-[color-mix(in_oklab,var(--diamond-accent,#2b7fff),white_40%)] before:mr-2 before:text-[color-mix(in_oklab,var(--diamond-accent,#2b7fff),white_55%)] before:content-["$"] hover:bg-[#1a1815]',
                aurora: "animate-[d-aurora_4s_linear_infinite] rounded-[10px] border-2 border-transparent font-semibold text-(--diamond-ink,#1a1917) [background-size:100%_100%,200%_200%] [background:linear-gradient(var(--diamond-surface,white),var(--diamond-surface,white))_padding-box,linear-gradient(90deg,var(--diamond-accent,#2b7fff),color-mix(in_oklab,var(--diamond-accent,#2b7fff)_50%,magenta),var(--diamond-accent,#2b7fff))_border-box]",
                sketch: "border-(--diamond-accent,#2b7fff) border-2 bg-transparent font-[500] text-(--diamond-ink,#1a1917) [border-radius:255px_15px_225px_15px/15px_225px_15px_255px] [font-family:Fraunces,Georgia,serif] hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_12%,transparent)] hover:[border-radius:15px_225px_15px_255px/225px_15px_255px_15px]",

                /* ── SHAPED ────────────────────────────────────────────────── */
                notch: "rounded-none bg-(--diamond-accent,#2b7fff) font-semibold text-(--diamond-on-accent,white) tracking-wide [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,black)]",
                chevron:
                    "rounded-none bg-(--diamond-accent,#2b7fff) pr-8 font-semibold text-(--diamond-on-accent,white) tracking-wide [clip-path:polygon(0_0,calc(100%-14px)_0,100%_50%,calc(100%-14px)_100%,0_100%)] hover:brightness-[0.92]",
                ticket: 'bg-(--diamond-accent,#2b7fff) font-semibold text-(--diamond-on-accent,white) before:absolute before:top-1/2 before:-left-1 before:size-2 before:-translate-y-1/2 before:rounded-full before:bg-(--diamond-surface,#f5f3ef) before:content-[""] after:absolute after:top-1/2 after:-right-1 after:size-2 after:-translate-y-1/2 after:rounded-full after:bg-(--diamond-surface,#f5f3ef) after:content-[""]',
                "mono-ticket":
                    'rounded-sm border border-(--diamond-ink,#1a1917) bg-(--diamond-ink,#1a1917) font-medium font-mono text-(--diamond-surface,#f5f3ef) text-xs uppercase tracking-[0.16em] before:mr-2.5 before:text-(--diamond-accent,#2b7fff) before:content-["◆"] hover:border-(--diamond-accent,#2b7fff) hover:bg-(--diamond-accent,#2b7fff)',
                exec: "rounded-none border border-current bg-transparent px-9 py-4 font-medium text-(--diamond-ink,#1a1917) text-[11px] uppercase tracking-[0.24em] hover:border-(--diamond-accent,#2b7fff) hover:bg-(--diamond-accent,#2b7fff) hover:text-(--diamond-on-accent,white) hover:tracking-[0.3em]",

                /* ── UTILITY ───────────────────────────────────────────────── */
                "icon-chip":
                    'rounded-full bg-(--diamond-accent,#2b7fff) pl-3.5 text-(--diamond-on-accent,white) before:-mr-1.5 before:flex before:size-[22px] before:items-center before:justify-center before:rounded-full before:bg-white/30 before:content-["→"]',
                split: 'overflow-hidden bg-(--diamond-accent,#2b7fff) pr-11 text-(--diamond-on-accent,white) after:absolute after:top-0 after:right-0 after:bottom-0 after:flex after:items-center after:border-white/30 after:border-l after:px-3 after:content-["▾"] hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,black)]',
                circle: "size-[52px] rounded-full bg-(--diamond-accent,#2b7fff) p-0 text-(--diamond-on-accent,white) shadow-[0_4px_12px_-2px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_40%,transparent)] hover:scale-105",
                status: 'rounded-full border border-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_30%,var(--diamond-surface,white))] bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_14%,var(--diamond-surface,white))] pl-2.5 text-(--diamond-accent,#2b7fff) before:size-2 before:animate-pulse before:rounded-full before:bg-(--diamond-accent,#2b7fff) before:shadow-[0_0_8px_var(--diamond-accent,#2b7fff)] before:content-[""]',
                darkcard:
                    'rounded-[10px] border border-[#2d2c28] bg-(--diamond-ink,#1a1917) text-(--diamond-surface,#f5f3ef) before:size-1.5 before:rounded-full before:bg-(--diamond-accent,#2b7fff) before:shadow-[0_0_8px_var(--diamond-accent,#2b7fff)] before:content-[""] hover:bg-[#252420]',
                lift: "border border-[#d9d5cc] bg-white text-[#1a1917] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 hover:border-(--diamond-accent,#2b7fff) hover:text-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_60%,#0a0a08)] hover:shadow-[0_8px_24px_-4px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_25%,transparent)]",

                /* ── MOTION ────────────────────────────────────────────────── */
                liquid: "animate-[d-liquid_8s_ease-in-out_infinite] bg-(--diamond-accent,#2b7fff) font-semibold text-(--diamond-on-accent,white) [border-radius:30%_70%_70%_30%/30%_30%_70%_70%] hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,black)] hover:[animation-duration:2s]",
                ring: 'rounded-full bg-(--diamond-accent,#2b7fff) font-semibold text-(--diamond-on-accent,white) before:absolute before:-inset-1.5 before:animate-ping before:rounded-full before:border-(--diamond-accent,#2b7fff) before:border-2 before:opacity-70 before:content-[""]',
                scan: 'overflow-hidden rounded-sm border border-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_50%,#0a0a08)] bg-[#0a0a08] font-mono text-[color-mix(in_oklab,var(--diamond-accent,#2b7fff),white_40%)] text-xs uppercase tracking-[0.2em] after:pointer-events-none after:absolute after:inset-0 after:animate-[d-scan_2.5s_linear_infinite] after:bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklab,var(--diamond-accent,#2b7fff)_30%,transparent)_50%,transparent_100%)] after:content-[""]',
                breathe:
                    "animate-[d-breathe_3s_ease-in-out_infinite] rounded-[14px] bg-(--diamond-accent,#2b7fff) font-semibold text-(--diamond-on-accent,white)",
                wave: 'rounded-full bg-(--diamond-accent,#2b7fff) pr-5 pl-12 font-semibold text-(--diamond-on-accent,white) before:absolute before:top-1/2 before:left-4 before:-translate-y-1/2 before:animate-pulse before:text-[10px] before:leading-none before:tracking-[0.05em] before:opacity-90 before:content-["▌▌▌"]',
                morse: 'border border-(--diamond-border,#d9d5cc) bg-transparent pr-12 pl-5 font-mono text-(--diamond-ink,#1a1917) text-sm after:absolute after:top-1/2 after:right-4 after:-translate-y-1/2 after:animate-pulse after:text-(--diamond-accent,#2b7fff) after:text-xs after:tracking-[0.18em] after:content-["•‒•"]',

                /* ── REACTIVE ──────────────────────────────────────────────── */
                magnet: 'border-[1.5px] border-current bg-transparent pl-10 text-(--diamond-ink,#1a1917) before:absolute before:top-1/2 before:left-3.5 before:-translate-y-1/2 before:text-(--diamond-accent,#2b7fff) before:transition-all before:duration-300 before:content-["→"] hover:border-(--diamond-accent,#2b7fff) hover:bg-(--diamond-accent,#2b7fff) hover:pl-12 hover:text-(--diamond-on-accent,white) hover:before:left-[1.4rem] hover:before:text-(--diamond-on-accent,white)',
                reveal: "relative overflow-hidden bg-(--diamond-accent,#2b7fff) font-semibold text-(--diamond-on-accent,white) before:absolute before:inset-0 before:flex before:translate-y-full before:items-center before:justify-center before:transition-transform before:duration-300 before:content-[attr(data-alt)] hover:before:translate-y-0 [&>*]:transition-transform [&>*]:duration-300 hover:[&>*]:-translate-y-[150%]",
                progress:
                    'overflow-hidden rounded-lg bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_14%,var(--diamond-surface,white))] font-semibold text-(--diamond-accent,#2b7fff) before:absolute before:top-0 before:bottom-0 before:left-0 before:w-0 before:bg-(--diamond-accent,#2b7fff) before:opacity-25 before:transition-[width] before:duration-1000 before:content-[""] hover:before:w-full',
                gooey: 'rounded-full bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_16%,var(--diamond-surface,white))] pr-2.5 pl-5 font-semibold text-(--diamond-accent,#2b7fff) after:flex after:size-7 after:items-center after:justify-center after:rounded-full after:bg-(--diamond-accent,#2b7fff) after:text-(--diamond-on-accent,white) after:transition-transform after:duration-300 after:content-["→"] hover:after:rotate-90 hover:after:scale-110',
                confetti:
                    'rounded-[10px] bg-(--diamond-accent,#2b7fff) font-bold text-(--diamond-on-accent,white) before:absolute before:size-1.5 before:rounded-full before:bg-(--diamond-accent,#2b7fff) before:opacity-0 before:content-[""] after:absolute after:size-1.5 after:rounded-full after:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_40%,yellow)] after:opacity-0 after:content-[""] hover:after:animate-[d-confetti2_0.8s_ease-out] hover:before:animate-[d-confetti1_0.8s_ease-out]',
                fold: 'rounded-md bg-(--diamond-accent,#2b7fff) font-semibold text-(--diamond-on-accent,white) after:absolute after:top-0 after:right-0 after:size-3.5 after:rounded-bl after:bg-[linear-gradient(-135deg,var(--diamond-surface,#f5f3ef)_50%,color-mix(in_oklab,var(--diamond-accent,#2b7fff)_30%,black)_50%)] after:shadow-[-1px_1px_2px_rgba(0,0,0,0.15)] after:transition-all after:duration-200 after:content-[""] hover:after:size-5',

                /* ── SURFACE ───────────────────────────────────────────────── */
                paper: "rounded-[2px] border border-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_40%,#fafaf7)] bg-[#fafaf7] text-[#1a1917] italic shadow-[1px_1px_0_0_var(--diamond-accent,#2b7fff),2px_2px_0_0_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_50%,white),3px_3px_8px_rgba(0,0,0,0.04)] [font-family:Fraunces,Georgia,serif] hover:-translate-x-px hover:-translate-y-px hover:shadow-[2px_2px_0_0_var(--diamond-accent,#2b7fff),4px_4px_0_0_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_50%,white),6px_6px_12px_rgba(0,0,0,0.05)]",
                grain: 'overflow-hidden rounded-sm bg-(--diamond-accent,#2b7fff) font-bold text-(--diamond-on-accent,white) text-[13px] uppercase tracking-wider after:pointer-events-none after:absolute after:inset-0 after:opacity-60 after:mix-blend-overlay after:content-[""] after:[background-image:url("data:image/svg+xml,%3Csvg_xmlns=%27http://www.w3.org/2000/svg%27_width=%27160%27_height=%27160%27%3E%3Cfilter_id=%27n%27%3E%3CfeTurbulence_baseFrequency=%270.9%27_numOctaves=%272%27_stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect_width=%27100%25%27_height=%27100%25%27_filter=%27url(%23n)%27_opacity=%270.35%27/%3E%3C/svg%3E")]',
                tape: "-rotate-[1.5deg] rounded-none border-x border-x-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_60%,var(--diamond-surface,white))] border-dashed bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_32%,var(--diamond-surface,white))] text-[var(--diamond-accent-deep,color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,black))] shadow-[0_1px_0_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_50%,var(--diamond-surface,white))] [font-family:Fraunces,Georgia,serif] hover:rotate-0",
                cloud: "rounded-2xl border border-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_15%,white)] bg-white font-semibold text-[#1a1917] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8),0_10px_30px_-10px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_30%,transparent)] hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05),0_20px_40px_-10px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_40%,transparent)]",
                neumorph:
                    "rounded-2xl bg-(--diamond-surface,#f5f3ef) font-semibold text-(--diamond-ink,#1a1917) shadow-[6px_6px_12px_rgba(0,0,0,0.18),-6px_-6px_12px_color-mix(in_oklab,var(--diamond-surface,white)_70%,white)] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.18),inset_-4px_-4px_8px_color-mix(in_oklab,var(--diamond-surface,white)_70%,white)]",
                longshadow:
                    "rounded-sm bg-(--diamond-accent,#2b7fff) font-extrabold text-(--diamond-on-accent,white) uppercase tracking-wide [text-shadow:1px_1px_0_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,black),2px_2px_0_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,black),3px_3px_0_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,black),4px_4px_0_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,black),5px_5px_0_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,black),6px_6px_0_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_40%,black)]",

                /* ── IDENTITY ──────────────────────────────────────────────── */
                glitch: "rounded-none border border-current bg-[#0a0a08] font-mono font-semibold text-[color-mix(in_oklab,var(--diamond-accent,#2b7fff),white_40%)] uppercase tracking-wider shadow-[0_0_20px_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_30%,transparent)] [clip-path:polygon(0_8px,8px_0,calc(100%-8px)_0,100%_8px,100%_calc(100%-8px),calc(100%-8px)_100%,8px_100%,0_calc(100%-8px))] hover:animate-[d-glitch_0.3s_steps(2)_infinite] hover:[text-shadow:2px_0_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,red),-2px_0_color-mix(in_oklab,var(--diamond-accent,#2b7fff)_80%,cyan)]",
                slash: "rounded-none bg-(--diamond-accent,#2b7fff) pr-9 font-bold text-(--diamond-on-accent,white) tracking-wide [clip-path:polygon(0_0,100%_0,calc(100%-12px)_100%,0_100%)] hover:brightness-90",
                scope: 'rounded-md border border-(--diamond-border,#d9d5cc) bg-transparent pl-11 text-(--diamond-ink,#1a1917) before:absolute before:top-1/2 before:left-4 before:size-3 before:-translate-y-1/2 before:rounded-full before:border-(--diamond-accent,#2b7fff) before:border-2 before:shadow-[inset_0_0_0_2px_var(--diamond-surface,#f5f3ef)] before:content-[""] hover:border-(--diamond-accent,#2b7fff)',
                badge: 'rounded-sm bg-(--diamond-accent,#2b7fff) pr-4 pl-9 font-mono font-semibold text-(--diamond-on-accent,white) text-xs uppercase tracking-[0.12em] before:absolute before:top-1/2 before:left-3 before:size-2 before:-translate-y-1/2 before:rounded-full before:border before:border-current before:content-[""]',
                counter:
                    "rounded-full bg-(--diamond-ink,#1a1917) py-1.5 pr-1.5 pl-5 font-semibold text-(--diamond-surface,#f5f3ef) after:ml-2.5 after:rounded-full after:bg-(--diamond-accent,#2b7fff) after:px-3 after:py-1.5 after:font-mono after:text-(--diamond-on-accent,white) after:text-xs after:content-[attr(data-count)]",
                url: 'rounded-md border border-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_25%,var(--diamond-surface,white))] bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_10%,var(--diamond-surface,white))] font-mono text-(--diamond-accent,#2b7fff) text-sm before:text-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_55%,var(--diamond-surface,white))] before:content-["/"] hover:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_18%,var(--diamond-surface,white))]',
            },
        },
        defaultVariants: { variant: "solid", size: "md" },
    },
);

/* ------- Keyframes that Tailwind can't express inline ------------------- */

const KEYFRAMES = `
@keyframes d-aurora { 0% { background-position: 0% 50%, 0% 50% } 100% { background-position: 0% 50%, 200% 50% } }
@keyframes d-liquid { 0%,100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70% } 33% { border-radius: 70% 30% 50% 50% / 50% 70% 30% 50% } 66% { border-radius: 50% 50% 30% 70% / 70% 30% 70% 30% } }
@keyframes d-scan { 0% { transform: translateY(-100%) } 100% { transform: translateY(100%) } }
@keyframes d-breathe { 0%,100% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--diamond-accent,#2b7fff) 60%, transparent) } 50% { box-shadow: 0 0 0 10px transparent } }
@keyframes d-glitch { 0%,100% { transform: translate(0) } 50% { transform: translate(1px,-1px) } }
@keyframes d-trace { to { background-position: 0 0, -200% 0 } }
@keyframes d-confetti1 { 0% { top: 50%; left: 10%; opacity: 1 } 100% { top: -150%; left: -10%; opacity: 0; transform: rotate(180deg) } }
@keyframes d-confetti2 { 0% { top: 50%; right: 10%; opacity: 1 } 100% { top: -150%; right: -10%; opacity: 0; transform: rotate(-180deg) } }
`;

let keyframesInjected = false;
function useDiamondKeyframes(): void {
    React.useInsertionEffect(() => {
        if (keyframesInjected || typeof document === "undefined") return;
        keyframesInjected = true;
        const el = document.createElement("style");
        el.setAttribute("data-diamond", "keyframes");
        el.textContent = KEYFRAMES;
        document.head.appendChild(el);
    }, []);
}

/* ------- Component ------------------------------------------------------ */

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        loading?: boolean;
        accent?: string;
        leftIcon?: React.ReactNode;
        rightIcon?: React.ReactNode;
    };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
    const {
        className,
        variant,
        size,
        asChild = false,
        type = "button",
        loading = false,
        disabled,
        accent,
        leftIcon,
        rightIcon,
        style,
        children,
        ...rest
    } = props;

    useDiamondKeyframes();
    const Comp: React.ElementType = asChild ? Slot : "button";

    return (
        <Comp
            ref={ref}
            className={cn(buttonVariants({ variant, size }), className)}
            style={accent ? { ...style, ["--diamond-accent" as string]: accent } : style}
            disabled={asChild ? undefined : disabled || loading}
            aria-busy={loading || undefined}
            type={asChild ? undefined : type}
            {...rest}
        >
            {loading && (
                <span
                    className="size-[1em] animate-spin rounded-full border-2 border-current border-r-transparent"
                    aria-hidden="true"
                />
            )}
            {!loading && leftIcon}
            {/* Inline-flex wrapper so children with mixed nodes (icon + text,
            multiple elements, …) layout naturally with the parent's gap.
            Single-node children (just text) are unaffected visually. */}
            <span className="inline-flex items-center justify-center gap-2">{children}</span>
            {!loading && rightIcon}
        </Comp>
    );
});

Button.displayName = "Diamond.Button";

export { buttonVariants };
