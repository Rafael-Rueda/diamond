import { AddComponentUseCase } from "../application/use-cases/add-component.use-case.js";
import { InitializeProjectUseCase } from "../application/use-cases/initialize-project.use-case.js";
import { ListComponentsUseCase } from "../application/use-cases/list-components.use-case.js";
import { TsConfigRepositoryAdapter } from "../infrastructure/config/ts-config-repository.adapter.js";
import { NodeFileSystemAdapter } from "../infrastructure/filesystem/node-file-system.adapter.js";
import { ConsoleLoggerAdapter } from "../infrastructure/logger/console-logger.adapter.js";
import { ExecaPackageManagerAdapter } from "../infrastructure/package-manager/execa-package-manager.adapter.js";
import { TsConfigPathResolverAdapter } from "../infrastructure/path-resolver/tsconfig-path-resolver.adapter.js";
import { LocalComponentRegistryAdapter } from "../infrastructure/registry/local-component-registry.adapter.js";

/**
 * Composition root. Wires every adapter to its port and exposes the
 * use cases that CLI commands consume. This is the ONLY place where
 * concrete infrastructure is referenced outside of src/infrastructure/*.
 */
export function buildContainer() {
    const logger = new ConsoleLoggerAdapter();
    const fs = new NodeFileSystemAdapter();
    const configRepo = new TsConfigRepositoryAdapter(fs);
    const registry = new LocalComponentRegistryAdapter();
    const pm = new ExecaPackageManagerAdapter(fs);
    const pathResolver = new TsConfigPathResolverAdapter(fs);

    return {
        logger,
        fs,
        configRepo,
        registry,
        pm,
        pathResolver,
        useCases: {
            init: new InitializeProjectUseCase(configRepo, logger),
            add: new AddComponentUseCase(registry, configRepo, fs, pm, logger, pathResolver),
            list: new ListComponentsUseCase(registry),
        },
    };
}

export type Container = ReturnType<typeof buildContainer>;
