import type { PackageManager } from "../../domain/entities/diamond-config.entity.js";
import type { Dependency } from "../../domain/value-objects/dependency.vo.js";

export interface PackageManagerPort {
    install(dependencies: readonly Dependency[], manager: PackageManager): Promise<void>;
}
