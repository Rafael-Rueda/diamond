import type { Command } from "commander";
import pc from "picocolors";

import type { Container } from "../container.js";

export function registerListCommand(program: Command, container: Container): void {
    program
        .command("list")
        .alias("ls")
        .description("List every component shipped by Diamond.")
        .action(async () => {
            try {
                const components = await container.useCases.list.execute();
                if (components.length === 0) {
                    container.logger.warn("Registry is empty.");
                    return;
                }
                container.logger.plain(pc.bold(`\n  ${components.length} components available:\n`));
                const padTo = components.reduce((m, c) => Math.max(m, c.id.value.length), 0);
                for (const c of components) {
                    container.logger.plain(`  ${pc.cyan(c.id.value.padEnd(padTo))}  ${pc.dim(c.description)}`);
                }
                container.logger.plain("");
            } catch (err) {
                container.logger.error(err instanceof Error ? err.message : String(err));
                process.exitCode = 1;
            }
        });
}
