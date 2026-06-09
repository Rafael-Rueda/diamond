"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type TreeViewVariant = "files" | "workspace" | "code" | "counts" | "org" | "phases";

export interface TreeNode {
    id: string;
    label: string;
    depth?: number;
    expanded?: boolean;
    selected?: boolean;
    count?: number;
}

const treeViewVariants = cva(
    "w-full max-w-[260px] rounded-md border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface,#fff) p-2 font-mono text-[12px]",
    {
        variants: {
            variant: {
                files: "",
                workspace: "font-sans",
                code: "bg-(--diamond-surface-alt,#ebe8e1)",
                counts: "",
                org: "font-sans",
                phases: "",
            },
        },
        defaultVariants: { variant: "files" },
    },
);

export interface TreeViewProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof treeViewVariants> {
    nodes?: TreeNode[];
}

const defaultNodes: TreeNode[] = [
    { id: "src", label: "src", expanded: true },
    { id: "components", label: "components", depth: 1, expanded: true },
    { id: "modal", label: "Modal.tsx", depth: 2, selected: true },
    { id: "drawer", label: "Drawer.tsx", depth: 2 },
    { id: "hooks", label: "hooks", depth: 1 },
];

export const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(function TreeView(
    { className, variant = "files", nodes = defaultNodes, ...rest },
    ref,
) {
    return (
        <div ref={ref} role="tree" className={cn(treeViewVariants({ variant }), className)} {...rest}>
            {nodes.map((node) => (
                <div
                    key={node.id}
                    role="treeitem"
                    tabIndex={node.selected ? 0 : -1}
                    aria-expanded={node.expanded ?? undefined}
                    aria-selected={node.selected ?? undefined}
                    className={cn(
                        "flex items-center gap-1 rounded px-1 py-0.5 text-(--diamond-muted,#6b6862)",
                        node.selected &&
                            "bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_12%,var(--diamond-surface,#fff))] font-semibold text-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_72%,var(--diamond-ink,#1a1917))]",
                        variant === "code" && node.selected && "bg-transparent text-(--diamond-accent,#2b7fff)",
                    )}
                    style={{ paddingLeft: `${(node.depth ?? 0) * 16 + 4}px` }}
                >
                    <span className="w-3 text-(--diamond-muted,#6b6862) text-[10px]" aria-hidden="true">
                        {node.expanded ? "v" : node.depth === undefined || node.depth < 2 ? ">" : ""}
                    </span>
                    <span>{node.label}</span>
                    {node.count !== undefined && (
                        <span className="ml-auto text-(--diamond-muted,#6b6862) text-[10px]">{node.count}</span>
                    )}
                </div>
            ))}
        </div>
    );
});

TreeView.displayName = "Diamond.TreeView";

export { treeViewVariants };
