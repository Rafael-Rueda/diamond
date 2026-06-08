import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind class strings safely (later classes win conflicts).
 * Used by every Diamond component - kept here so you can tweak merge
 * behavior project-wide.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
