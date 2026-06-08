import type { DiamondConfig } from "../../domain/entities/diamond-config.entity.js";

/**
 * Renders a diamond.config.ts file.
 *
 * The emitted file is intentionally:
 *   - minimal (only the fields the user asked for)
 *   - hand-editable (clean whitespace, inline comments on the important knobs)
 *   - type-safe (imports the DiamondConfig type)
 */
export function renderDiamondConfigTemplate(config: DiamondConfig): string {
    return `import type { DiamondConfig } from '@rueda.dev/gems-diamond/config';

/**
 * Diamond configuration.
 * Run \`diamond add <component>\` to install components into the paths below.
 * Every field is customizable - change what you need.
 */
const config: DiamondConfig = {
  style: '${config.style}',

  // --- Tailwind integration ------------------------------------------------
  tailwind: {
    config: '${config.tailwind.config}',
    css: '${config.tailwind.css}',
    baseColor: '${config.tailwind.baseColor}',
    cssVariables: ${config.tailwind.cssVariables},${
        config.tailwind.prefix ? `\n    prefix: '${config.tailwind.prefix}',` : ""
    }
  },

  // --- Path aliases (where installed components land) ----------------------
  // These MUST match the aliases in your tsconfig.json paths.
  // The "ui" path is where every Diamond component is copied.
  aliases: {
    components: '${config.aliases.components.toString()}',
    ui: '${config.aliases.ui.toString()}',
    utils: '${config.aliases.utils.toString()}',
    hooks: '${config.aliases.hooks.toString()}',
    lib: '${config.aliases.lib.toString()}',
  },

  // --- Framework flags ----------------------------------------------------
  rsc: ${config.rsc},                  // React Server Components
  typescript: ${config.typescript},
  packageManager: '${config.packageManager}',
};

export default config;
`;
}
