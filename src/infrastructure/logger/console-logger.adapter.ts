import pc from "picocolors";

import type { LoggerPort } from "../../application/ports/logger.port.js";

export class ConsoleLoggerAdapter implements LoggerPort {
    info(message: string): void {
        process.stdout.write(`${pc.cyan("ℹ")} ${message}\n`);
    }
    success(message: string): void {
        process.stdout.write(`${pc.green("✔")} ${message}\n`);
    }
    warn(message: string): void {
        process.stdout.write(`${pc.yellow("⚠")} ${message}\n`);
    }
    error(message: string): void {
        process.stderr.write(`${pc.red("✖")} ${message}\n`);
    }
    step(message: string): void {
        process.stdout.write(`  ${pc.dim(message)}\n`);
    }
    plain(message: string): void {
        process.stdout.write(`${message}\n`);
    }
}
