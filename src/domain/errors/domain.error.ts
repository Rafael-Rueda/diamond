/**
 * Base class for all domain-level errors.
 * Infrastructure layer translates these into CLI-friendly messages.
 */
export abstract class DomainError extends Error {
    abstract readonly code: string;

    constructor(
        message: string,
        public override readonly cause?: unknown,
    ) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ComponentNotFoundError extends DomainError {
    readonly code = "COMPONENT_NOT_FOUND";
    constructor(componentId: string) {
        super(`Component "${componentId}" does not exist in the Diamond registry.`);
    }
}

export class ConfigNotFoundError extends DomainError {
    readonly code = "CONFIG_NOT_FOUND";
    constructor() {
        super("diamond.config.ts not found at project root. Run `diamond init` first.");
    }
}

export class ConfigAlreadyExistsError extends DomainError {
    readonly code = "CONFIG_EXISTS";
    constructor() {
        super("diamond.config.ts already exists. Use --force to overwrite.");
    }
}

export class InvalidConfigError extends DomainError {
    readonly code = "INVALID_CONFIG";
    constructor(message: string, cause?: unknown) {
        super(`Invalid diamond.config.ts: ${message}`, cause);
    }
}

export class FileAlreadyExistsError extends DomainError {
    readonly code = "FILE_EXISTS";
    constructor(path: string) {
        super(`File already exists: ${path}. Use --overwrite to replace.`);
    }
}
