import { promises as fs, constants as fsConstants } from "node:fs";
import path from "node:path";

import type { FileSystemPort } from "../../application/ports/file-system.port.js";

export class NodeFileSystemAdapter implements FileSystemPort {
    constructor(private readonly root: string = process.cwd()) {}

    projectRoot(): string {
        return this.root;
    }

    async exists(absolutePath: string): Promise<boolean> {
        try {
            await fs.access(absolutePath, fsConstants.F_OK);
            return true;
        } catch {
            return false;
        }
    }

    async readFile(absolutePath: string): Promise<string> {
        return fs.readFile(absolutePath, "utf8");
    }

    async writeFile(absolutePath: string, contents: string): Promise<void> {
        await this.ensureDir(path.dirname(absolutePath));
        await fs.writeFile(absolutePath, contents, "utf8");
    }

    async copyFile(source: string, target: string): Promise<void> {
        await this.ensureDir(path.dirname(target));
        await fs.copyFile(source, target);
    }

    async copyFileWithTransform(
        source: string,
        target: string,
        transform: (contents: string) => string,
    ): Promise<void> {
        const contents = await fs.readFile(source, "utf8");
        await this.writeFile(target, transform(contents));
    }

    async ensureDir(absolutePath: string): Promise<void> {
        await fs.mkdir(absolutePath, { recursive: true });
    }
}
