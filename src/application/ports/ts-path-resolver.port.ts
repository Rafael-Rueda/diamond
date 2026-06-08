/**
 * Resolves a TypeScript-style alias (e.g. "@/components/ui") into an
 * absolute filesystem directory, using the consumer project's
 * tsconfig.json `compilerOptions.paths`.
 *
 * Without this, `@/components/ui` would be treated as literal
 * `<projectRoot>/components/ui` - wrong for 99% of setups (Next.js with
 * src/, Vite with @ → src, etc.).
 */
export interface TsPathResolverPort {
    /** Returns the absolute directory the alias points to. */
    resolveAlias(alias: string): Promise<string>;
}
