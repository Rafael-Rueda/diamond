import type { Command } from "commander";
import prompts from "prompts";

import type { Container } from "../container.js";

export function registerAddCommand(program: Command, container: Container): void {
    program
        .command("add")
        .description("Add one or more components to your project.")
        .argument("[components...]", 'Component ids (e.g. "button", "globals")')
        .option("-o, --overwrite", "Overwrite existing files.", false)
        .option("-d, --dry-run", "Show the installation plan without writing.", false)
        .option("--skip-deps", "Skip installing npm dependencies.", false)
        .option(
            "-t, --theme <name>",
            'Theme variant for theme-based components (e.g. "kepler"). Bare flags like "--kepler" also work.',
        )
        .allowUnknownOption(true) // accepts bare theme flags like --kepler, --mars, …
        .action(
            async (
                componentIds: string[],
                opts: { overwrite: boolean; dryRun: boolean; skipDeps: boolean; theme?: string },
            ) => {
                try {
                    // Bare theme flags (--kepler) leak into the positional args under
                    // `allowUnknownOption`. Strip anything starting with "--".
                    let ids = componentIds.filter((id) => !id.startsWith("--"));
                    const all = await container.useCases.list.execute();

                    if (ids.length === 0) {
                        const picked = await prompts({
                            type: "multiselect",
                            name: "components",
                            message: "Which components to add?",
                            choices: all.map((c) => ({
                                title: c.name,
                                value: c.id.value,
                                description: c.description,
                            })),
                            min: 1,
                            hint: "Space to select, Enter to confirm",
                            instructions: false,
                        });
                        ids = (picked.components as string[]) ?? [];
                        if (ids.length === 0) {
                            container.logger.warn("No component selected. Aborting.");
                            return;
                        }
                    }

                    // Resolve theme: explicit --theme wins; otherwise scan argv for any
                    // bare flag matching a theme exposed by a component in the registry.
                    let theme = opts.theme;
                    if (!theme) {
                        const known = new Set<string>();
                        for (const c of all) for (const t of c.themes.keys()) known.add(t);
                        theme = [...known].find((t) => process.argv.includes(`--${t}`));
                    }

                    await container.useCases.add.execute({
                        componentIds: ids,
                        overwrite: opts.overwrite,
                        dryRun: opts.dryRun,
                        skipDeps: opts.skipDeps,
                        ...(theme ? { theme } : {}),
                    });
                } catch (err) {
                    container.logger.error(err instanceof Error ? err.message : String(err));
                    process.exitCode = 1;
                }
            },
        );
}
