import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Mirror of `src/registry/components/utils/utils.ts`.
 * The registry's `button.tsx` imports `@/lib/utils` which, in this docs app,
 * resolves here via tsconfig paths.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
