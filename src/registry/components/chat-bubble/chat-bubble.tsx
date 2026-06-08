"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond · ChatBubble — single message; ChatBubbleGroup arranges threads. */

export type ChatBubbleVariant = "basic" | "avatar" | "typing" | "media" | "imessage" | "terminal";

const bubbleVariants = cva("inline-block max-w-[260px] break-words px-3 py-2 text-[13px] leading-relaxed", {
    variants: {
        variant: {
            basic: "rounded-2xl",
            avatar: "rounded-2xl",
            typing: "rounded-2xl",
            media: "overflow-hidden rounded-2xl p-0",
            imessage: "rounded-2xl",
            terminal: "rounded-md font-mono text-[11px]",
        },
        side: {
            them: "rounded-bl-sm bg-(--diamond-surface-alt,#ebe8e1) text-(--diamond-ink,#1a1917)",
            me: "rounded-br-sm bg-(--diamond-accent,#2b7fff) text-(--diamond-on-accent,#fff)",
        },
    },
    defaultVariants: { variant: "basic", side: "them" },
});

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bubbleVariants> {
    /** Message side — them (default) or me. */
    side?: "them" | "me";
    /** Sender name displayed above (avatar variant). */
    sender?: React.ReactNode;
    /** Time displayed above (avatar variant). */
    time?: React.ReactNode;
    /** Avatar element (avatar variant). */
    avatar?: React.ReactNode;
    /** Media URL/element (media variant). */
    media?: React.ReactNode;
    /** Caption under media. */
    mediaCaption?: React.ReactNode;
    /** Accent override. */
    accent?: string;
}

export const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(function ChatBubble(
    {
        className,
        variant = "basic",
        side = "them",
        sender,
        time,
        avatar,
        media,
        mediaCaption,
        accent,
        style,
        children,
        ...rest
    },
    ref,
) {
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    if (variant === "avatar") {
        return (
            <div
                ref={ref}
                className={cn("flex gap-2", side === "me" ? "flex-row-reverse" : "", className)}
                style={inlineStyle}
                {...rest}
            >
                {avatar && <div className="shrink-0">{avatar}</div>}
                <div className={cn("flex flex-col", side === "me" ? "items-end" : "items-start")}>
                    {(sender || time) && (
                        <div className="mb-1 text-(--diamond-muted,#6b6862) text-[10px]">
                            {sender}
                            {sender && time && " · "}
                            {time}
                        </div>
                    )}
                    <div className={cn(bubbleVariants({ variant: "basic", side }))}>{children}</div>
                </div>
            </div>
        );
    }

    if (variant === "typing") {
        return (
            <div
                ref={ref}
                className={cn(
                    bubbleVariants({ variant: "basic", side }),
                    "inline-flex items-center gap-1.5",
                    className,
                )}
                style={inlineStyle}
                {...rest}
            >
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        className="size-1.5 animate-bounce rounded-full bg-current opacity-60"
                        style={{ animationDelay: `${i * 120}ms` }}
                    />
                ))}
            </div>
        );
    }

    if (variant === "media") {
        return (
            <div ref={ref} className={cn(bubbleVariants({ variant, side }), className)} style={inlineStyle} {...rest}>
                {media}
                {mediaCaption && (
                    <div
                        className={cn(
                            "px-2.5 py-1.5 text-[11px]",
                            side === "me" ? "text-white/80" : "text-(--diamond-muted,#6b6862)",
                        )}
                    >
                        {mediaCaption}
                    </div>
                )}
                {children && (
                    <div
                        className={cn(
                            "px-2.5 pb-2 text-[12px]",
                            side === "me" ? "text-white" : "text-(--diamond-ink,#1a1917)",
                        )}
                    >
                        {children}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div ref={ref} className={cn(bubbleVariants({ variant, side }), className)} style={inlineStyle} {...rest}>
            {children}
        </div>
    );
});

ChatBubble.displayName = "Diamond.ChatBubble";

/** Container that arranges bubbles in a column with sensible alignment. */
export const ChatBubbleGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    function ChatBubbleGroup({ className, ...rest }, ref) {
        return <div ref={ref} className={cn("flex w-full max-w-sm flex-col gap-2", className)} {...rest} />;
    },
);

ChatBubbleGroup.displayName = "Diamond.ChatBubbleGroup";

export { bubbleVariants as chatBubbleVariants };
