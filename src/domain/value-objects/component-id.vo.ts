/**
 * Value Object representing the stable identifier of a registry component.
 * Enforces the naming convention (kebab-case, ASCII, 2-40 chars).
 */
export class ComponentId {
    private static readonly PATTERN = /^[a-z][a-z0-9-]{1,39}$/;

    private constructor(public readonly value: string) {}

    static of(raw: string): ComponentId {
        const normalized = raw.trim().toLowerCase();
        if (!ComponentId.PATTERN.test(normalized)) {
            throw new Error(`Invalid component id "${raw}". Use kebab-case (e.g. "button", "dropdown-menu").`);
        }
        return new ComponentId(normalized);
    }

    equals(other: ComponentId): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }
}
