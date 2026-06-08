import { existsSync, promises as fs } from "node:fs";
import path from "node:path";

import type { FileSystemPort } from "../../application/ports/file-system.port.js";
import type { TsPathResolverPort } from "../../application/ports/ts-path-resolver.port.js";

interface TsConfigShape {
    extends?: string;
    compilerOptions?: {
        baseUrl?: string;
        paths?: Record<string, string[]>;
    };
}

/**
 * Reads the consumer's tsconfig.json (following `extends` one level) and
 * uses its `paths` to expand aliases.
 *
 * Algorithm for `resolveAlias("@/components/ui")`:
 *   1. Find the first paths pattern that matches ("@/*" matches with
 *      wildcard capture "components/ui").
 *   2. Substitute the capture into the first mapping value ("./src/*"
 *      → "./src/components/ui").
 *   3. Resolve relative to `baseUrl` (defaults to tsconfig's directory).
 *   4. If no mapping matches, fall back to `{projectRoot}/{alias without "@/"}`.
 */
export class TsConfigPathResolverAdapter implements TsPathResolverPort {
    private cache: TsConfigShape | null | undefined;

    constructor(
        private readonly fs: FileSystemPort,
        private readonly configFileNames: readonly string[] = ["tsconfig.json", "jsconfig.json"],
    ) {}

    async resolveAlias(alias: string): Promise<string> {
        const tsconfig = await this.loadTsConfig();
        const projectRoot = this.fs.projectRoot();

        if (!tsconfig?.compilerOptions?.paths) {
            return this.literalFallback(projectRoot, alias);
        }

        const baseUrl = path.resolve(projectRoot, tsconfig.compilerOptions.baseUrl ?? ".");
        const paths = tsconfig.compilerOptions.paths;

        for (const [pattern, mappings] of Object.entries(paths)) {
            const captured = matchPattern(pattern, alias);
            if (captured === null) continue;
            const target = mappings[0];
            if (!target) continue;
            const substituted = target.includes("*") ? target.replace("*", captured) : target;
            return path.resolve(baseUrl, substituted);
        }

        return this.literalFallback(projectRoot, alias);
    }

    private literalFallback(projectRoot: string, alias: string): string {
        const stripped = alias.replace(/^@\//, "").replace(/^~\//, "");
        return path.join(projectRoot, stripped);
    }

    private async loadTsConfig(): Promise<TsConfigShape | null> {
        if (this.cache !== undefined) return this.cache;
        const root = this.fs.projectRoot();

        for (const name of this.configFileNames) {
            const p = path.join(root, name);
            if (!existsSync(p)) continue;
            const parsed = parseTsConfigText(await fs.readFile(p, "utf8")) as TsConfigShape;

            // Follow `extends` one level (enough for most setups, incl. Next.js).
            if (parsed.extends) {
                try {
                    const extendsPath = path.resolve(path.dirname(p), parsed.extends);
                    const finalPath = extendsPath.endsWith(".json") ? extendsPath : `${extendsPath}.json`;
                    if (existsSync(finalPath)) {
                        const parent = parseTsConfigText(await fs.readFile(finalPath, "utf8")) as TsConfigShape;
                        parsed.compilerOptions = {
                            ...parent.compilerOptions,
                            ...parsed.compilerOptions,
                            paths: {
                                ...(parent.compilerOptions?.paths ?? {}),
                                ...(parsed.compilerOptions?.paths ?? {}),
                            },
                        };
                    }
                } catch {
                    /* best-effort extend merge */
                }
            }

            this.cache = parsed;
            return parsed;
        }

        this.cache = null;
        return null;
    }
}

/**
 * Matches `pattern` against `alias`. Returns the wildcard capture, or
 * null if no match. Both exact ("@/components" -> "@/components") and
 * wildcard ("@/*" -> "@/foo/bar") are supported.
 */
function matchPattern(pattern: string, alias: string): string | null {
    if (!pattern.includes("*")) {
        return pattern === alias ? "" : null;
    }
    const [prefix, suffix] = pattern.split("*");
    if (prefix === undefined || suffix === undefined) return null;
    if (!alias.startsWith(prefix)) return null;
    if (suffix && !alias.endsWith(suffix)) return null;
    return alias.slice(prefix.length, alias.length - suffix.length);
}

/**
 * Parses tsconfig JSONC text into a plain object.
 *
 * We try native `JSON.parse` first (fast, covers clean tsconfig files), and
 * only fall back to a state-machine JSONC stripper when that fails. The
 * naive regex-based approach is avoided because patterns like `"./src/*"`
 * and `"**\/*.ts"` contain `/` `*` sequences that trick simple regexes
 * into eating half of the file.
 */
function parseTsConfigText(raw: string): unknown {
    try {
        return JSON.parse(raw);
    } catch {
        return JSON.parse(stripJsonComments(raw));
    }
}

/**
 * Strips // and block comments from a JSONC string, WITHOUT touching the
 * interior of string literals. Handles escaped quotes. Also removes
 * trailing commas (legal in tsconfig, illegal in JSON).
 */
function stripJsonComments(input: string): string {
    let out = "";
    let i = 0;
    let inString = false;
    let stringChar = "";

    while (i < input.length) {
        const ch = input[i]!;
        const next = input[i + 1];

        if (inString) {
            out += ch;
            if (ch === "\\" && i + 1 < input.length) {
                out += input[i + 1]!;
                i += 2;
                continue;
            }
            if (ch === stringChar) inString = false;
            i++;
            continue;
        }

        if (ch === '"' || ch === "'") {
            inString = true;
            stringChar = ch;
            out += ch;
            i++;
            continue;
        }

        if (ch === "/" && next === "/") {
            while (i < input.length && input[i] !== "\n") i++;
            continue;
        }

        if (ch === "/" && next === "*") {
            i += 2;
            while (i < input.length && !(input[i] === "*" && input[i + 1] === "/")) i++;
            i += 2;
            continue;
        }

        out += ch;
        i++;
    }

    return out.replace(/,(\s*[}\]])/g, "$1");
}
