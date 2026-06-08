import type { Command } from "commander";
import prompts from "prompts";

import {
    type BaseColor,
    DiamondConfig,
    type PackageManager,
    type Style,
} from "../../domain/entities/diamond-config.entity.js";
import { PathAlias } from "../../domain/value-objects/path-alias.vo.js";
import type { Container } from "../container.js";

export function registerInitCommand(program: Command, container: Container): void {
    program
        .command("init")
        .description("Create diamond.config.ts at the project root.")
        .option("-y, --yes", "Accept all defaults without prompts.", false)
        .option("-f, --force", "Overwrite an existing diamond.config.ts.", false)
        .action(async (opts: { yes: boolean; force: boolean }) => {
            try {
                const config = opts.yes ? DiamondConfig.default() : await runInteractivePrompts();
                await container.useCases.init.execute({ config, force: opts.force });
            } catch (err) {
                container.logger.error(err instanceof Error ? err.message : String(err));
                process.exitCode = 1;
            }
        });
}

async function runInteractivePrompts(): Promise<DiamondConfig> {
    const defaults = DiamondConfig.default();

    const answers = await prompts(
        [
            {
                type: "select",
                name: "style",
                message: "Which style?",
                choices: [
                    { title: "default", value: "default" },
                    { title: "new-york", value: "new-york" },
                ],
                initial: 0,
            },
            {
                type: "select",
                name: "baseColor",
                message: "Base color?",
                choices: [
                    { title: "Neutral", value: "neutral" },
                    { title: "Stone", value: "stone" },
                    { title: "Zinc", value: "zinc" },
                    { title: "Gray", value: "gray" },
                    { title: "Slate", value: "slate" },
                    { title: "Diamond", value: "diamond" },
                ],
                initial: 0,
            },
            {
                type: "text",
                name: "tailwindCss",
                message: "Path to your global CSS file?",
                initial: defaults.tailwind.css,
            },
            {
                type: "text",
                name: "tailwindConfig",
                message: "Path to your Tailwind config?",
                initial: defaults.tailwind.config,
            },
            {
                type: "text",
                name: "ui",
                message: "Where should components be installed? (ui alias)",
                initial: defaults.aliases.ui.toString(),
            },
            {
                type: "text",
                name: "utils",
                message: "Utils alias (cn, etc.)?",
                initial: defaults.aliases.utils.toString(),
            },
            {
                type: "text",
                name: "hooks",
                message: "Hooks alias?",
                initial: defaults.aliases.hooks.toString(),
            },
            {
                type: "toggle",
                name: "rsc",
                message: "Using React Server Components?",
                initial: defaults.rsc,
                active: "yes",
                inactive: "no",
            },
            {
                type: "select",
                name: "packageManager",
                message: "Package manager?",
                choices: [
                    { title: "npm", value: "npm" },
                    { title: "pnpm", value: "pnpm" },
                    { title: "yarn", value: "yarn" },
                    { title: "bun", value: "bun" },
                ],
                initial: 0,
            },
        ],
        { onCancel: () => process.exit(1) },
    );

    return new DiamondConfig(
        answers.style as Style,
        {
            config: answers.tailwindConfig as string,
            css: answers.tailwindCss as string,
            baseColor: answers.baseColor as BaseColor,
            cssVariables: true,
        },
        {
            components: PathAlias.of("@/components"),
            ui: PathAlias.of(answers.ui as string),
            utils: PathAlias.of(answers.utils as string),
            hooks: PathAlias.of(answers.hooks as string),
            lib: PathAlias.of("@/lib"),
        },
        answers.rsc as boolean,
        true,
        answers.packageManager as PackageManager,
    );
}
