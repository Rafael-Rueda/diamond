import type { Component } from "../../domain/entities/component.entity.js";
import type { ComponentRegistryPort } from "../ports/component-registry.port.js";

/**
 * Returns every component Diamond ships, grouped by kind.
 * Consumed by `diamond list` and by `diamond add` for typeahead.
 */
export class ListComponentsUseCase {
    constructor(private readonly registry: ComponentRegistryPort) {}

    async execute(): Promise<readonly Component[]> {
        const all = await this.registry.list();
        return [...all].sort((a, b) => a.id.value.localeCompare(b.id.value));
    }
}
