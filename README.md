# Diamond

> The UI skin of the **Rueda.Dev** ecosystem.
> A shadcn-style, copy-to-your-project component library built on **Radix UI + Tailwind CSS**.

Diamond does **not** ship a runtime package you `import` from. Instead, the CLI copies
fully editable source files into a folder of your choosing. Every component is yours
to modify - no black boxes, no upstream breaking changes.

---

## Quick start

```bash
# 1. Scaffold diamond.config.ts at the root of your app
npx @rueda.dev/gems-diamond init

# 2. Add a component (copies source into your UI path)
npx @rueda.dev/gems-diamond add button

# 3. Use it
import { Button } from '@/components/ui/button';

<Button variant="gradient" accent="#e11d48" leftIcon={<Plus />}>
  Get started
</Button>
```

---

## `diamond.config.ts`

Sits at the **root of the consumer project**. Every install reads it to decide
where files land. Edit any field at any time.

```ts
import type { DiamondConfig } from '@rueda.dev/gems-diamond/config';

const config: DiamondConfig = {
  style: 'default',

  tailwind: {
    config: 'tailwind.config.ts',
    css: 'src/styles/globals.css',
    baseColor: 'neutral',
    cssVariables: true,
  },

  // All component paths are controlled here. "ui" is where installs land.
  aliases: {
    components: '@/components',
    ui:         '@/components/ui',   // ← change this to move the whole family
    utils:      '@/lib/utils',
    hooks:      '@/hooks',
    lib:        '@/lib',
  },

  rsc: true,
  typescript: true,
  packageManager: 'npm',
};

export default config;
```

---

## CLI

| Command | Description |
|---|---|
| `diamond init`          | Write `diamond.config.ts` (interactive). `-y` for defaults, `-f` to overwrite. |
| `diamond add <...ids>`  | Install one or more components. Flags: `--overwrite`, `--dry-run`, `--skip-deps`. |
| `diamond list` / `ls`   | Show every component the registry ships. |

Transitive Diamond deps (e.g. `button` → `utils`) are resolved automatically.
npm deps (`@radix-ui/react-slot`, `class-variance-authority`, …) are installed
with the package manager chosen in `diamond.config.ts`.

---

## Button (59 variants)

```tsx
<Button variant="solid">Primary</Button>
<Button variant="ghost" size="sm">Ghost</Button>
<Button variant="neobrutal" accent="#f59e0b">Buy now</Button>

// Radix Slot composition
<Button asChild variant="outline">
  <Link href="/docs">Docs →</Link>
</Button>

// Variant-aware slots
<Button variant="counter" count={12}>Inbox</Button>
<Button variant="reveal"  altText="Open →">Hover me</Button>
<Button variant="split"   onSplitMenu={openMenu}>Deploy</Button>
<Button variant="status"  indicatorColor="#10b981">Online</Button>

// React events pass through to the underlying <button>
<Button onClick={(e) => ...} onFocus={...} disabled loading>Saving…</Button>
```

Full list of variants: `solid · gradient · glow · pill · layer · arrow · outline
· dashed · double · fill · dotborder · trace · ghost · soft · underline · caret
· glass · stamp · neobrutal · retro · pixel · terminal · aurora · sketch ·
notch · chevron · ticket · mono-ticket · exec · icon-chip · split · circle ·
status · darkcard · lift · liquid · ring · scan · breathe · wave · morse ·
magnet · reveal · progress · gooey · confetti · fold · paper · grain · tape ·
cloud · neumorph · longshadow · glitch · slash · scope · badge · counter · url`

---

## Architecture

The CLI is built with **DDD + Clean Architecture + Ports & Adapters (Hexagonal)**.

```
src/
├── domain/                  Pure business rules, no I/O
│   ├── entities/            Component, DiamondConfig, InstallationPlan
│   ├── value-objects/       ComponentId, PathAlias, Dependency
│   └── errors/              Typed domain errors
│
├── application/             Use cases + port definitions
│   ├── use-cases/           initialize-project, add-component, list-components
│   └── ports/               file-system, config-repository, component-registry,
│                            package-manager, logger
│
├── infrastructure/          Driven adapters (implement the ports)
│   ├── filesystem/          NodeFileSystemAdapter
│   ├── config/              TsConfigRepositoryAdapter + template renderer
│   ├── registry/            LocalComponentRegistryAdapter (reads manifests)
│   ├── package-manager/     ExecaPackageManagerAdapter
│   └── logger/              ConsoleLoggerAdapter
│
├── cli/                     Driving adapter (Commander)
│   ├── commands/            init, add, list
│   ├── container.ts         Composition root (only place that wires concretes)
│   └── index.ts             Shebang entry
│
├── public/                  Types consumers import (`@rueda.dev/gems-diamond/config`)
│
└── registry/                Component SOURCE (copied into consumer projects)
    └── components/
        ├── utils/           cn() shared helper
        └── button/          manifest.json, button.tsx, variants, css, types
```

**Golden rule:** domain & application never import from infrastructure. New
adapters (e.g. a remote registry fetched over HTTPS, or a WebContainer-backed
filesystem) slot in by implementing the matching port.

---

## Adding a new component to the registry

1. Create `src/registry/components/<your-component>/`.
2. Add a `manifest.json` (see `button/manifest.json` for reference).
3. Drop your source files beside the manifest.
4. The CLI picks it up automatically - no code changes needed.

---

## License

MIT · Rueda.Dev
