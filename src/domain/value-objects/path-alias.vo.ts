/**
 * Path alias as declared in diamond.config.ts (e.g. "@/components/ui").
 * Resolves into a real filesystem path via a tsconfig-aware resolver in infra.
 */
export class PathAlias {
    private constructor(public readonly value: string) {}

    static of(raw: string): PathAlias {
        const trimmed = raw.trim();
        if (trimmed.length === 0) {
            throw new Error("Path alias cannot be empty.");
        }
        return new PathAlias(trimmed);
    }

    /** Returns the alias stripped of its "@/" prefix, if any. */
    get relative(): string {
        return this.value.replace(/^@\//, "").replace(/^~\//, "");
    }

    toString(): string {
        return this.value;
    }
}
