#!/usr/bin/env node
import { Command } from "commander";

import { registerAddCommand } from "./commands/add.command.js";
import { registerInitCommand } from "./commands/init.command.js";
import { registerListCommand } from "./commands/list.command.js";
import { buildContainer } from "./container.js";

const container = buildContainer();
const program = new Command();

program.name("diamond").description("Diamond CLI - install Rueda.Dev components into your project.").version("0.1.0");

registerInitCommand(program, container);
registerAddCommand(program, container);
registerListCommand(program, container);

program.parseAsync(process.argv).catch((err) => {
    container.logger.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
});
