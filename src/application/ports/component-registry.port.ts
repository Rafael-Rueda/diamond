import type { Component } from "../../domain/entities/component.entity.js";
import type { ComponentId } from "../../domain/value-objects/component-id.vo.js";

/**
 * Output port for discovering components shipped by Diamond.
 * The default adapter reads the bundled `src/registry/components/*` tree.
 */
export interface ComponentRegistryPort {
    list(): Promise<readonly Component[]>;
    findById(id: ComponentId): Promise<Component | null>;
    /** Absolute path to the file inside the Diamond package. */
    resolveSourcePath(component: Component, relativeSource: string): string;
}
