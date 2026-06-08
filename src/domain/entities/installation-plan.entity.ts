import type { Component } from "./component.entity.js";
import type { Dependency } from "../value-objects/dependency.vo.js";

export interface PlannedFile {
    componentId: string;
    absoluteSource: string; // resolved path in the Diamond package
    absoluteTarget: string; // resolved path in the consumer project
    exists: boolean; // did the target already exist?
}

/**
 * Materialized plan for `diamond add <component>`.
 * Built by the AddComponent use case; executed by the FileSystem adapter.
 *
 * Keeping this as an aggregate makes dry-run trivial: build the plan,
 * print it, skip execution.
 */
export class InstallationPlan {
    constructor(
        public readonly components: readonly Component[],
        public readonly files: readonly PlannedFile[],
        public readonly dependencies: readonly Dependency[],
    ) {}

    get isEmpty(): boolean {
        return this.files.length === 0;
    }

    get conflictingFiles(): readonly PlannedFile[] {
        return this.files.filter((f) => f.exists);
    }

    get newFiles(): readonly PlannedFile[] {
        return this.files.filter((f) => !f.exists);
    }
}
