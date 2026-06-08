# CLAUDE.md — Gem Diamond (Rueda.Dev)

## 1 · Propósito

Diamond é a **pele** do ecossistema Rueda.Dev.

Design system entregue no modelo **shadcn**: cada componente é **código-fonte copiado** para o projeto do consumidor via `diamond add <id>`. Não há runtime importado de `node_modules`. Uma vez instalado, o componente **pertence ao consumidor** — ele edita à vontade.

Diamond é **agnóstica à regra de negócio**. Zero chamadas de API, zero fetch, zero estado de domínio. Só aparência + interação.

---

## 2 · Fonte da verdade visual

A pasta [`galleries/`](./galleries/) é a **fonte absoluta da verdade** para o catálogo visual de cada componente.

- Cada `*.html` lista as **variantes** com o visual exato que o componente final deve reproduzir.
- Cada variante está agrupada por **categoria** (em `VARIANTS[...].group`). Essa categoria **É** o valor da prop `type` no TSX final.
- Adicionou uma variante nova no gallery? **Precisa** refletir no `.tsx` correspondente — e vice-versa.
- Não invente variantes que não estão no gallery. Não remova variantes do gallery sem remover do TSX.

**Mapeamento obrigatório** (group no HTML → `type` no TSX):

| Gallery group       | `type` prop    |
|---------------------|----------------|
| `Solid & Filled`    | `solid`        |
| `Outlined`          | `outlined`     |
| `Subtle`            | `subtle`       |
| `Expressive`        | `expressive`   |
| `Shaped`            | `shaped`       |
| `Utility`           | `utility`      |
| `Motion`            | `motion`       |
| `Reactive`          | `reactive`     |
| `Surface`           | `surface`      |
| `Identity`          | `identity`     |

---

## 3 · Arquitetura da lib (código do CLI, NÃO copiado para o consumidor)

Ports & Adapters (Hexagonal) + Clean + DDD. **Regra de ouro:** `domain/` e `application/` **nunca** importam `infrastructure/`. Novos adapters plugam via port.

```
src/
├── domain/                 regras puras (entidades, VOs, erros)
├── application/            use cases + ports (interfaces)
├── infrastructure/         adapters (Node fs, tsconfig resolver, cosmiconfig, execa)
├── cli/                    Commander; container.ts é o único lugar que junta tudo
├── public/                 tipos exportados ao consumidor (`@rueda.dev/gems-diamond/config`)
└── registry/components/    ESTES arquivos são copiados; NÃO compilados pelo build
```

Para o código do CLI valem as regras de sempre: nomes claros, sem over-engineering, erros tipados, cada use case com responsabilidade única.

---

## 4 · Regras RÍGIDAS para cada componente do registry

### 4.1 · Um único arquivo por componente

- **Proibido**: separar o componente em `button.variants.ts`, `button.types.ts`, `button.css`, `button.constants.ts`, etc.
- **Obrigatório**: `src/registry/components/<id>/<id>.tsx` + `manifest.json`. Nada mais.
- Dependências inter-componentes existem apenas via `registryDependencies` no manifest (ex: todos os componentes dependem de `utils` pelo `cn`).
- `utils.ts` é a **única** exceção de arquivo solto — ele é compartilhado entre todos, mora em `registry/components/utils/utils.ts`.

### 4.2 · Tailwind e nada mais

- **Zero** arquivo `.css` independente. Zero `.module.css`, zero `styled-components`, zero `emotion`.
- Classes Tailwind devem estar **literais** (scanner do Tailwind não resolve concatenação em runtime).
- Arbitrary values são livres: `bg-[color-mix(in_oklab,var(--diamond-accent)_80%,black)]`, `[clip-path:polygon(...)]`, `shadow-[...]`.
- Variáveis CSS customizadas **sempre** com fallback e prefixo `--diamond-*`. Para referência direta numa utility, use a sintaxe parêntese do Tailwind v4: `bg-(--diamond-accent,#2b7fff)`, `text-(--diamond-muted,#6b6862)`, `border-(--diamond-border,#d9d5cc)`. Use a forma `[var(--diamond-*,fallback)]` **apenas** dentro de expressões compostas como `color-mix` (ex: `bg-[color-mix(in_oklab,var(--diamond-accent,#2b7fff)_8%,var(--diamond-surface,#fff))]`).
- Keyframes que o Tailwind não cobre nativamente → **inline no próprio arquivo** via `React.useInsertionEffect` injetando `<style data-diamond="keyframes">` uma única vez no `<head>`. **Nunca** criar `.css` lateral nem pedir pro usuário estender `tailwind.config`.
- Animações nativas (`animate-spin`, `animate-pulse`, `animate-ping`, `animate-bounce`) são preferidas sobre keyframes custom.

### 4.3 · Prop pattern (obrigatório em TODO componente)

1. **`variant`** — o look específico (string union plano de TODAS as variantes que o componente suporta). Sem categorias na API. Categorias existem apenas no docs (ver §4.9).
2. **`size`** — `"sm" | "md" | "lg"` (mais `"icon"` quando fizer sentido). Independente de `variant`.
3. **`accent`** — string de cor (qualquer CSS color) que sobrescreve `--diamond-accent` naquela instância via `style`. **Não** aceitar prop de "color scheme" — a abordagem é sempre uma única var + `color-mix`.
4. **`asChild`** — `boolean`; quando `true`, renderiza via `@radix-ui/react-slot` (composição com `<Link>`, `motion.button`, etc.).
5. **`loading`** — `boolean`; ativa spinner + `aria-busy` + `disabled`.
6. **`leftIcon` / `rightIcon`** — `ReactNode`; adornos opcionais (quando a variante suportar).
7. **Props específicas do componente** — usar nomes curtos e naturais. Preferir **atributos `data-*`** em vez de novas props quando o slot for um conteúdo textual simples lido por pseudo-elemento (ex: `data-count`, `data-alt`).
8. **Props nativas do elemento raiz** preservadas via `React.XHTMLAttributes<HTMLXElement>` SEM `Omit` — incluindo `type`, `name`, `form`, `onClick`, `onFocus`, `aria-*`, etc. `ref` via `React.forwardRef`.

### 4.4 · Tipagem do `variant`

Único union plano. Comente os grupos visualmente para ajudar quem edita, mas **não** crie sub-types separados:

```ts
export type ButtonVariant =
  /* Solid    */ | 'solid' | 'gradient' | 'glow' | 'pill' | 'layer' | 'arrow'
  /* Outlined */ | 'outline' | 'dashed' | 'double' | 'fill' | 'dotborder' | 'trace'
  /* Subtle   */ | 'ghost' | 'soft' | 'underline' | 'caret' | 'glass' | 'stamp'
  /* …                                                                           */;
```

Testes de tipo que devem compilar certo:
- `<Button variant="solid">Hi</Button>` ✓
- `<Button variant="gradient" type="submit" />` ✓ (`type` é o atributo HTML nativo)
- `<Button variant="invalid" />` ✗ (TS erra)

### 4.5 · Acessibilidade (não-negociável)

- Foco visível via `focus-visible:ring-2` sempre — cor da ring usa a mesma CSS var do accent.
- Estados desabilitado/loading: `disabled:pointer-events-none disabled:opacity-50`, `aria-busy`.
- Conteúdo puramente decorativo usa `aria-hidden="true"`.
- Navegação por teclado: elemento raiz deve ser o elemento semântico certo (`<button>` para Button, `<input>` para Input, `<dialog>` ou Radix primitive para modais).

### 4.6 · Simplicidade

- **Nunca** switch gigante no render. Se uma variante precisa de conteúdo interno especial, prefira pseudo-elementos CSS (`before:content-[...]`, `after:content-[attr(data-*)]`, `after:content-[""]`).
- Máximo 1 nível de branching no render. Acima disso, a variante deve ser simplificada visualmente.
- Cada linha de classe Tailwind no map de variantes é **uma única string por variante**. Edite em linha. Não fragmente.

### 4.7 · Componentes do tipo `theme` (kind: "theme")

Casos especiais que **não copiam arquivos** e sim **patcham um único arquivo CSS** existente no projeto do consumidor (tipicamente `config.tailwind.css`). Exemplo: `globals`.

- O manifest declara `"kind": "theme"`, `"files": []`, e um mapa `themes`:
  ```json
  {
    "kind": "theme",
    "files": [],
    "themes": {
      "default":       { "source": "themes/default.css" },
      "kepler":        { "source": "themes/kepler.css" },
      "high-contrast": { "source": "themes/high-contrast.css" },
      "mars":          { "source": "themes/mars.css" },
      "earth":         { "source": "themes/earth.css" },
      "ocean":         { "source": "themes/ocean.css" }
    },
    "defaultTheme": "default"
  }
  ```
- Mínimo **5 temas** por componente theme.
- Cada arquivo CSS de tema vive em `themes/<theme>.css` dentro da pasta do componente.
- O CSS de tema só pode definir CSS variables com prefixo `--diamond-*` (ou outros tokens neutros). **Nunca** classes utilitárias, **nunca** keyframes lá — keyframes são responsabilidade dos componentes individuais.
- **Obrigatório dual-mode**: cada arquivo de tema declara um bloco `:root { … }` (light) **e** um bloco `:root.dark { … }` (dark). O accent fica idêntico nos dois (identidade da marca); só `surface`, `surface-alt`, `ink`, `muted` e `border` invertem. O `--diamond-accent-soft` deve usar `var(--diamond-surface)` no `color-mix` (não `white` literal) pra adaptar automaticamente. Casos onde o accent é a própria identidade monocromática (ex: `noir`) podem inverter o accent também — declarar nos dois blocos.
- Variáveis canônicas: `--diamond-accent`, `--diamond-on-accent` (texto sobre o accent — branco/preto/dark conforme luminância), `--diamond-accent-soft`, `--diamond-accent-deep`, `--diamond-surface`, `--diamond-surface-alt`, `--diamond-ink`, `--diamond-muted`, `--diamond-border`, `--diamond-gradient`. Adicionar tokens novos é OK; remover é breaking.
- **Regras de contraste em variants**: bg=accent → texto sempre `var(--diamond-on-accent,white)`. Mix com tinta clara (ex: `mix(accent 15%, X)`) usa `var(--diamond-surface,white)` no lugar de `white` literal — caso contrário variants ficam ilegíveis em temas escuros (Kepler, Mars). Variants intencionalmente "claros sempre" (paper, cloud, lift, terminal) hardcodam cores fixas e não recebem CSS vars de tema.
- O CLI faz upsert idempotente do bloco delimitado:
  ```css
  /* @diamond:<id>:start [theme=<name>] */
  …conteúdo do tema…
  /* @diamond:<id>:end */
  ```
  Reinstalar com outro tema **substitui** o bloco.
- Comando: `diamond add globals --theme <name>` ou `diamond add globals --<name>` (atalho descoberto automaticamente do manifest).

### 4.8 · Categorização para o docs (`documentation` no manifest)

A categoria de uma variante (Solid, Outlined, Subtle, etc.) **não** é prop do componente — é metadata do manifest, lida exclusivamente pelo docs site. Adicionar/remover variante de uma categoria = editar uma string num array JSON. Zero impacto na lib.

Schema (opcional):

```json
{
  "documentation": {
    "groups": {
      "Solid & Filled": ["solid", "gradient", "glow", "pill", "layer", "arrow"],
      "Outlined":       ["outline", "dashed", "double", "fill", "dotborder", "trace"]
    },
    "samples": {
      "default": "Get started",
      "perVariant": {
        "circle":  { "label": "+" },
        "counter": { "label": "Inbox", "props": { "data-count": 12 } },
        "reveal":  { "label": "Hover me", "props": { "data-alt": "Open →" } }
      }
    }
  }
}
```

Regras:
- **Toda** variante presente no CVA do componente deve aparecer em **exatamente um** grupo de `documentation.groups`. O docs trata isso como erro de validação se faltar (no futuro: lint).
- `samples.default` é o label exibido como exemplo padrão de cada card no docs.
- `samples.perVariant.<id>.label` substitui o default para variantes que ficam estranhas com o texto genérico (ex: `circle`, `exec`, `terminal`).
- `samples.perVariant.<id>.props` injeta atributos DOM extras no card (ex: `data-count` para `counter`, `data-alt` para `reveal`).
- Adicionar uma variante: 1) acrescentar em `button.tsx` (CVA + union); 2) acrescentar o id no array do grupo certo no manifest. Done.

---

## 5 · Convenções de import/alias (fonte: `diamond.config.ts` do consumidor)

- `@/lib/utils` → resolvido em instalação pelo CLI conforme `aliases.utils` do consumidor.
- `@/components/ui/*` → resolvido conforme `aliases.ui`.
- No monorepo Diamond (modo autoria), o `tsconfig.json` aponta esses aliases para `src/registry/components/*` só para o IDE type-check. O CLI reescreve no copy.

---

## 6 · Manifest por componente (`manifest.json`)

Toda pasta `src/registry/components/<id>/` **precisa** ter um `manifest.json` válido:

```json
{
  "id": "button",
  "name": "Button",
  "description": "…",
  "kind": "ui",
  "files": [
    { "source": "button.tsx", "target": "button.tsx", "alias": "ui" }
  ],
  "dependencies": [
    { "name": "@radix-ui/react-slot", "version": "^1.1.0", "kind": "runtime" }
  ],
  "registryDependencies": ["utils"],
  "tags": ["primitive", "interactive", "form"]
}
```

- Um componente UI **típico** tem `files.length === 1`.
- `utils` é sempre registrado em `registryDependencies` para componentes que usam `cn`.
- `dependencies` declara o que o CLI instala no consumidor via o package manager escolhido.
- `kind` ∈ `"ui" | "hook" | "util" | "primitive" | "theme"`. `theme` tem regras próprias (ver §4.8).

---

## 7 · Comandos principais

| Comando                       | O que faz                                                             |
|-------------------------------|-----------------------------------------------------------------------|
| `npm run build`               | Compila o CLI (`tsc -p tsconfig.build.json`)                          |
| `npm run cli -- <subcmd>`     | Roda o CLI direto do source via `tsx` (sem build)                     |
| `node dist/cli/index.js <...>`| Roda o CLI buildado                                                   |
| `diamond init`                | Escreve `diamond.config.ts` no projeto consumidor                     |
| `diamond add <id>...`         | Copia componente(s) + resolve deps transitivas + instala npm deps     |
| `diamond list`                | Lista tudo no registry                                                |

---

## 8 · Workflow ao adicionar componente novo

1. Crie/edite o gallery HTML em `galleries/<Component> Gallery.html` com **todas** as variantes + grupos.
2. `src/registry/components/<id>/<id>.tsx` — **um único arquivo**, Tailwind puro, discriminated union (`type` → `variant`).
3. `src/registry/components/<id>/manifest.json`.
4. Adicione keyframes custom (se houver) dentro do próprio `.tsx` via `useInsertionEffect`.
5. Se o componente usa `cn`, declare `"registryDependencies": ["utils"]`.
6. Rode `npm run build && node dist/cli/index.js list` para confirmar que apareceu.
7. Teste instalação num projeto fresco:
   ```bash
   cd /tmp/fresh-project
   node <diamond>/dist/cli/index.js init -y
   node <diamond>/dist/cli/index.js add <id> --skip-deps
   ```

---

## 9 · Proibições explícitas

- ❌ `.css` lateral por componente.
- ❌ Mais de um `.tsx` por componente (barris `index.ts`, `types.ts` separados, `variants.ts` separado).
- ❌ Concatenar nomes de classe Tailwind em runtime (`bg-${color}-500`) — scanner não pega.
- ❌ Props chamadas `color`, `scheme`, `tone`, `kind`, `type` (custom), `category` — padrão é só `variant` + `accent`. Categoria vive no manifest, não na API.
- ❌ Switch/if gigante no render. Se precisar, é porque a arquitetura da variante está errada.
- ❌ Dependência de contexto global (provider Diamond). Cada componente é autossuficiente.
- ❌ Chamar API, usar fetch, ler `window.localStorage` direto, etc. Diamond é visual.
- ❌ Adicionar runtime deps pesadas (motion libs, icon libs) sem justificativa — manter Radix primitives + `clsx` + `tailwind-merge` + `cva` como base.
- ❌ Quebrar a discriminação `type`/`variant` — se não couber em categorias discretas, a variante não entra.
- ❌ Criar uma nova variante sem primeiro adicioná-la ao gallery HTML correspondente.
