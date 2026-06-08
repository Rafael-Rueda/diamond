import type { DiamondConfig } from "../../domain/entities/diamond-config.entity.js";
import { ConfigAlreadyExistsError } from "../../domain/errors/domain.error.js";
import type { ConfigRepositoryPort } from "../ports/config-repository.port.js";
import type { LoggerPort } from "../ports/logger.port.js";

export interface InitializeProjectInput {
    config: DiamondConfig;
    force: boolean;
}

/**
 * Writes a fresh diamond.config.ts at the project root.
 * Fails if one already exists unless `force=true`.
 */
export class InitializeProjectUseCase {
    constructor(
        private readonly configRepo: ConfigRepositoryPort,
        private readonly logger: LoggerPort,
    ) {}

    async execute(input: InitializeProjectInput): Promise<void> {
        if ((await this.configRepo.exists()) && !input.force) {
            throw new ConfigAlreadyExistsError();
        }

        await this.configRepo.save(input.config, { overwrite: input.force });
        this.logger.success("diamond.config.ts written at project root.");
        this.logger.step(`UI path: ${input.config.aliases.ui.toString()} - edit this in diamond.config.ts.`);
    }
}
