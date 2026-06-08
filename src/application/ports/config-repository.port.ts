import type { DiamondConfig } from "../../domain/entities/diamond-config.entity.js";

/**
 * Output port for loading/persisting diamond.config.ts.
 * Implementation decides the format (ts, json, cjs, etc.).
 */
export interface ConfigRepositoryPort {
    /** Returns null if no config exists at the project root. */
    load(): Promise<DiamondConfig | null>;
    /** Writes diamond.config.ts to the project root. Throws if it exists and overwrite=false. */
    save(config: DiamondConfig, options: { overwrite: boolean }): Promise<void>;
    exists(): Promise<boolean>;
}
