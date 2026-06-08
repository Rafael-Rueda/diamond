/**
 * Output port abstracting the filesystem.
 * Driving the "driven side" of the hexagon - use cases depend on this
 * interface, never on `node:fs` directly.
 */
export interface FileSystemPort {
    exists(absolutePath: string): Promise<boolean>;
    readFile(absolutePath: string): Promise<string>;
    writeFile(absolutePath: string, contents: string): Promise<void>;
    copyFile(source: string, target: string): Promise<void>;
    /** Read source, apply a text transform, write to target. */
    copyFileWithTransform(source: string, target: string, transform: (contents: string) => string): Promise<void>;
    ensureDir(absolutePath: string): Promise<void>;
    /** Returns the absolute project root (cwd of the CLI invocation). */
    projectRoot(): string;
}
