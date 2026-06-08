/**
 * npm dependency required by a component.
 * Kept as a VO so the install use-case can dedupe and range-merge later.
 */
export class Dependency {
    private constructor(
        public readonly name: string,
        public readonly version: string,
        public readonly kind: "runtime" | "dev",
    ) {}

    static runtime(name: string, version = "latest"): Dependency {
        return new Dependency(name, version, "runtime");
    }

    static dev(name: string, version = "latest"): Dependency {
        return new Dependency(name, version, "dev");
    }

    /** npm install spec, e.g. "react@^18.0.0" */
    toInstallSpec(): string {
        return this.version === "latest" ? this.name : `${this.name}@${this.version}`;
    }
}
