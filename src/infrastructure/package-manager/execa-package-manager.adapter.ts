import { execa } from "execa";

import type { FileSystemPort } from "../../application/ports/file-system.port.js";
import type { PackageManagerPort } from "../../application/ports/package-manager.port.js";
import type { PackageManager } from "../../domain/entities/diamond-config.entity.js";
import type { Dependency } from "../../domain/value-objects/dependency.vo.js";

const INSTALL_COMMANDS: Record<PackageManager, { runtime: string[]; dev: string[] }> = {
    npm: { runtime: ["install"], dev: ["install", "-D"] },
    pnpm: { runtime: ["add"], dev: ["add", "-D"] },
    yarn: { runtime: ["add"], dev: ["add", "-D"] },
    bun: { runtime: ["add"], dev: ["add", "-d"] },
};

export class ExecaPackageManagerAdapter implements PackageManagerPort {
    constructor(private readonly fs: FileSystemPort) {}

    async install(dependencies: readonly Dependency[], manager: PackageManager): Promise<void> {
        const runtime = dependencies.filter((d) => d.kind === "runtime").map((d) => d.toInstallSpec());
        const dev = dependencies.filter((d) => d.kind === "dev").map((d) => d.toInstallSpec());
        const cwd = this.fs.projectRoot();
        const cmd = INSTALL_COMMANDS[manager];

        if (runtime.length > 0) {
            await execa(manager, [...cmd.runtime, ...runtime], { cwd, stdio: "inherit" });
        }
        if (dev.length > 0) {
            await execa(manager, [...cmd.dev, ...dev], { cwd, stdio: "inherit" });
        }
    }
}
