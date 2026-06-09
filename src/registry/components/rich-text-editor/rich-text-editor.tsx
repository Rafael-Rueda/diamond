"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Diamond RichTextEditor
 * A compact editor for lightweight WYSIWYG, markdown and collaborative
 * authoring surfaces. It ships with basic browser formatting commands and
 * still lets apps replace tool callbacks with their own document engine. */

export type RichTextEditorVariant = "classic" | "heading" | "quote" | "floating" | "markdown" | "collaborative";

const editorVariants = cva(
    "w-full min-w-0 max-w-[560px] overflow-hidden rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) text-(--diamond-ink,#1a1917) shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
    {
        variants: {
            variant: {
                classic: "",
                heading: "",
                quote: "",
                floating: "relative",
                markdown: "border-[#2d2c28] bg-[#0f0f0e] font-mono text-[#d4d0c8]",
                collaborative: "",
            },
        },
        defaultVariants: { variant: "classic" },
    },
);

export interface RichTextTool {
    id: string;
    label: React.ReactNode;
    ariaLabel?: string;
    active?: boolean;
    disabled?: boolean;
    onSelect?: (tool: RichTextTool) => void;
}

export interface RichTextCollaborator {
    id: string;
    name: string;
    initials?: string;
    color?: string;
}

export interface RichTextEditorProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "title">,
        VariantProps<typeof editorVariants> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    tools?: RichTextTool[];
    collaborators?: RichTextCollaborator[];
    headingOptions?: string[];
    fontOptions?: string[];
    title?: React.ReactNode;
    accent?: string;
    readOnly?: boolean;
}

const DEFAULT_TOOLS: RichTextTool[] = [
    { id: "bold", label: "B", ariaLabel: "Bold" },
    { id: "italic", label: "I", ariaLabel: "Italic" },
    { id: "underline", label: "U", ariaLabel: "Underline" },
    { id: "strike", label: "S", ariaLabel: "Strikethrough" },
    { id: "list", label: "List", ariaLabel: "List" },
    { id: "link", label: "Link", ariaLabel: "Link" },
    { id: "code", label: "{ }", ariaLabel: "Code" },
];

const DEFAULT_COLLABORATORS: RichTextCollaborator[] = [
    { id: "ac", name: "Aria Chen", initials: "AC", color: "#2b7fff" },
    { id: "ml", name: "Mina Lee", initials: "ML", color: "#10b981" },
    { id: "jo", name: "Jon Ortiz", initials: "JO", color: "#f59e0b" },
];

function ToolButton({ tool, onSelect, dark }: { tool: RichTextTool; onSelect?: (tool: RichTextTool) => void; dark?: boolean }) {
    return (
        <button
            type="button"
            aria-pressed={tool.active || undefined}
            aria-label={tool.ariaLabel}
            disabled={tool.disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onSelect?.(tool)}
            className={cn(
                "inline-flex h-7 min-w-7 cursor-pointer items-center justify-center rounded px-2 font-medium text-[12px] transition-colors disabled:pointer-events-none disabled:opacity-50",
                dark
                    ? "text-[#d4d0c8] hover:bg-white/10 data-[active=true]:bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_28%,transparent)]"
                    : "text-(--diamond-muted,#6b6862) hover:bg-(--diamond-surface-alt,#ebe8e1) hover:text-(--diamond-ink,#1a1917)",
                tool.active &&
                    (dark
                        ? "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_28%,transparent)] text-(--diamond-accent,#2b7fff)"
                        : "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_12%,var(--diamond-surface,#fff))] text-(--diamond-accent,#2b7fff)"),
            )}
            data-active={tool.active ? "true" : undefined}
        >
            {tool.label}
        </button>
    );
}

export const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(function RichTextEditor(
    {
        className,
        variant = "classic",
        value,
        defaultValue = "Diamond is a systematic design toolkit with semantic formatting.",
        onValueChange,
        placeholder = "Start writing...",
        tools = DEFAULT_TOOLS,
        collaborators = DEFAULT_COLLABORATORS,
        headingOptions = ["Heading 1", "Heading 2", "Paragraph"],
        fontOptions = ["Inter", "Fraunces", "JetBrains Mono"],
        title,
        accent,
        readOnly,
        style,
        ...rest
    },
    ref,
) {
    const v = variant ?? "classic";
    const editorRef = React.useRef<HTMLDivElement>(null);
    const [internal, setInternal] = React.useState(defaultValue);
    const [activeTools, setActiveTools] = React.useState<Record<string, boolean>>({});
    const isControlled = value !== undefined;
    const content = isControlled ? value : internal;
    const inlineStyle: React.CSSProperties = { ...style };
    if (accent) (inlineStyle as Record<string, string>)["--diamond-accent"] = accent;

    const commit = (next: string) => {
        if (!isControlled) setInternal(next);
        onValueChange?.(next);
    };

    const updateActiveTools = React.useCallback(() => {
        if (v === "markdown") return;
        const next: Record<string, boolean> = {};
        for (const tool of tools) {
            if (tool.id === "bold" || tool.id === "italic" || tool.id === "underline") {
                next[tool.id] = document.queryCommandState(tool.id);
            }
            if (tool.id === "strike") {
                next[tool.id] = document.queryCommandState("strikeThrough");
            }
            if (tool.id === "list") {
                next[tool.id] = document.queryCommandState("insertUnorderedList");
            }
        }
        setActiveTools(next);
    }, [tools, v]);

    const runTool = React.useCallback(
        (tool: RichTextTool) => {
            tool.onSelect?.(tool);
            if (tool.disabled || v === "markdown" || readOnly) return;

            editorRef.current?.focus();

            const commands: Record<string, () => void> = {
                bold: () => document.execCommand("bold"),
                italic: () => document.execCommand("italic"),
                underline: () => document.execCommand("underline"),
                strike: () => document.execCommand("strikeThrough"),
                list: () => document.execCommand("insertUnorderedList"),
                link: () => document.execCommand("createLink", false, "#"),
                code: () => document.execCommand("formatBlock", false, "pre"),
            };

            commands[tool.id]?.();
            commit(editorRef.current?.innerHTML ?? "");
            updateActiveTools();
        },
        [commit, readOnly, updateActiveTools, v],
    );

    const formatBlock = (option: string) => {
        if (v === "markdown" || readOnly) return;
        const tag = option.toLowerCase().includes("heading 1") ? "h1" : option.toLowerCase().includes("heading 2") ? "h2" : "p";
        editorRef.current?.focus();
        document.execCommand("formatBlock", false, tag);
        commit(editorRef.current?.innerHTML ?? "");
    };

    const setFont = (font: string) => {
        if (v === "markdown" || readOnly) return;
        editorRef.current?.focus();
        document.execCommand("fontName", false, font);
        commit(editorRef.current?.innerHTML ?? "");
    };

    const resolvedTools = tools.map((tool) => ({ ...tool, active: tool.active ?? activeTools[tool.id] }));

    const toolbar = (
        <div
            className={cn(
                "flex flex-wrap items-center gap-1 border-(--diamond-border,#d9d5cc) border-b px-2 py-2",
                v === "quote" && "justify-center bg-(--diamond-ink,#1a1917)",
                v === "markdown" && "border-[#2d2c28] bg-[#0a0a08]",
            )}
        >
            {v === "heading" ? (
                <>
                    <select
                        onChange={(event) => formatBlock(event.target.value)}
                        className="h-7 rounded border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2 text-[12px] outline-none"
                    >
                        {headingOptions.map((option) => (
                            <option key={option}>{option}</option>
                        ))}
                    </select>
                    <select
                        onChange={(event) => setFont(event.target.value)}
                        className="h-7 rounded border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) px-2 text-[12px] outline-none"
                    >
                        {fontOptions.map((option) => (
                            <option key={option}>{option}</option>
                        ))}
                    </select>
                    <span className="mx-1 h-5 w-px bg-(--diamond-border,#d9d5cc)" />
                </>
            ) : null}

            {resolvedTools.map((tool, index) => (
                <React.Fragment key={tool.id}>
                    {index === 4 ? <span className="mx-1 h-5 w-px bg-(--diamond-border,#d9d5cc)" /> : null}
                    <ToolButton tool={tool} onSelect={runTool} dark={v === "quote" || v === "markdown"} />
                </React.Fragment>
            ))}
        </div>
    );

    const collaborativeHeader = (
        <div className="flex items-center gap-2 border-(--diamond-border,#d9d5cc) border-b bg-(--diamond-surface-alt,#ebe8e1) px-3 py-2">
            <span className="font-mono text-[10px] text-(--diamond-muted,#6b6862) uppercase tracking-[0.12em]">
                {title ?? "Collab"}
            </span>
            <div className="ml-auto flex -space-x-1.5">
                {collaborators.map((person) => (
                    <span
                        key={person.id}
                        title={person.name}
                        className="inline-flex size-6 items-center justify-center rounded-full border-2 border-(--diamond-surface,#fff) font-semibold text-white text-[9px]"
                        style={{ background: person.color ?? "var(--diamond-accent,#2b7fff)" }}
                    >
                        {person.initials ?? person.name.slice(0, 2).toUpperCase()}
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <div ref={ref} className={cn(editorVariants({ variant: v }), className)} style={inlineStyle} {...rest}>
            {v === "collaborative" ? collaborativeHeader : v !== "floating" ? toolbar : null}

            {v === "floating" ? (
                <div className="relative min-h-[144px] p-4">
                    <div className="absolute top-3 left-4 z-10 flex rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-1 shadow-[0_6px_18px_rgba(0,0,0,0.1)]">
                        {resolvedTools.slice(0, 4).map((tool) => (
                            <ToolButton key={tool.id} tool={tool} onSelect={runTool} />
                        ))}
                    </div>
                    <EditableBody
                        ref={editorRef}
                        value={content}
                        placeholder={placeholder}
                        readOnly={readOnly}
                        onValueChange={commit}
                        onSelectionChange={updateActiveTools}
                        className="pt-10"
                    />
                </div>
            ) : v === "markdown" ? (
                <textarea
                    value={content}
                    readOnly={readOnly}
                    onChange={(event) => commit(event.target.value)}
                    placeholder={placeholder}
                    className="min-h-[144px] w-full resize-y bg-[#151411] p-4 font-mono text-[#d4d0c8] text-[12px] leading-6 outline-none placeholder:text-[#6b6862]"
                />
            ) : v === "quote" ? (
                <EditableBody
                    ref={editorRef}
                    value={content}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    onValueChange={commit}
                    onSelectionChange={updateActiveTools}
                    className="min-h-[132px] px-5 py-5 font-serif text-[16px] italic leading-8"
                />
            ) : (
                <EditableBody
                    ref={editorRef}
                    value={content}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    onValueChange={commit}
                    onSelectionChange={updateActiveTools}
                    className={cn(v === "heading" && "before:mb-2 before:block before:font-serif before:text-[17px] before:italic before:content-['On_quiet_craft.']")}
                />
            )}
        </div>
    );
});

interface EditableBodyProps {
    value: string;
    placeholder: string;
    readOnly?: boolean;
    onValueChange: (value: string) => void;
    onSelectionChange?: () => void;
    className?: string;
}

const EditableBody = React.forwardRef<HTMLDivElement, EditableBodyProps>(function EditableBody(
    {
        value,
        placeholder,
        readOnly,
        onValueChange,
        onSelectionChange,
        className,
    },
    forwardedRef,
) {
    const localRef = React.useRef<HTMLDivElement | null>(null);
    const initialValue = React.useRef(value);
    const lastValue = React.useRef(value);
    const [empty, setEmpty] = React.useState(stripHtml(value).trim().length === 0);

    const setRef = React.useCallback(
        (node: HTMLDivElement | null) => {
            localRef.current = node;
            if (typeof forwardedRef === "function") {
                forwardedRef(node);
            } else if (forwardedRef) {
                forwardedRef.current = node;
            }
        },
        [forwardedRef],
    );

    React.useEffect(() => {
        const node = localRef.current;
        if (!node) return;
        if (value === lastValue.current || node.innerHTML === value) {
            lastValue.current = value;
            setEmpty(stripHtml(node.innerHTML).trim().length === 0);
            return;
        }
        node.innerHTML = value;
        lastValue.current = value;
        setEmpty(stripHtml(value).trim().length === 0);
    }, [value]);

    const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
        const next = event.currentTarget.innerHTML;
        lastValue.current = next;
        setEmpty(stripHtml(next).trim().length === 0);
        onValueChange(next);
        onSelectionChange?.();
    };

    return (
        <div
            ref={setRef}
            contentEditable={!readOnly}
            suppressContentEditableWarning
            role="textbox"
            aria-multiline="true"
            data-placeholder={placeholder}
            data-empty={empty ? "true" : undefined}
            onInput={handleInput}
            onKeyUp={onSelectionChange}
            onMouseUp={onSelectionChange}
            className={cn(
                "min-h-[132px] px-4 py-4 text-[14px] leading-7 outline-none data-[empty=true]:before:text-(--diamond-muted,#9a968e) data-[empty=true]:before:content-[attr(data-placeholder)]",
                className,
            )}
            dangerouslySetInnerHTML={{ __html: initialValue.current }}
        />
    );
});

function stripHtml(value: string) {
    return value.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ");
}

RichTextEditor.displayName = "Diamond.RichTextEditor";

export { editorVariants as richTextEditorVariants };
