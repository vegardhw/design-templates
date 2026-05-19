# Design Templates

A personal design system and component library built with React, shadcn/ui, and Tailwind CSS v4. Used as a reference and starting point for new projects.

## Stack

- **React 19** + **Vite 6**
- **shadcn/ui** — component source copied directly into the project
- **Tailwind CSS v4**
- **TypeScript** (strict mode)
- Theme switching via `data-theme` attribute on `<html>`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the theme preview.

## Project structure

```
src/
├── components/ui/         # shadcn/ui components (Button, Card, Dialog, …)
│   └── custom/            # project-specific custom components
├── hooks/                 # shared hooks (e.g. use-mobile)
├── lib/
│   ├── themes.ts          # theme registry + applyTheme / applyDarkMode helpers
│   └── utils.ts           # cn() utility
├── pages/
│   └── theme-preview.tsx  # living design-system preview (source of truth)
└── styles/
    ├── theme.css          # canonical CSS variable definitions
    └── themes/            # per-theme overrides (one file per theme)
```

## Themes

| Name | Description |
|------|-------------|
| `default` | Clean light/dark base theme |
| `northern-lights` | Aurora greens and blues on a near-white / deep-navy base |
| `amber-minimal` | Variants of orange on a dark grey / black base |

Themes are applied by setting `data-theme` on `<html>`:

```ts
import { applyTheme, applyDarkMode } from "@/lib/themes";

applyTheme("northern-lights");
applyDarkMode(false); // true for dark
```

Or directly without importing `themes.ts`:

```ts
document.documentElement.dataset.theme = "northern-lights";
```

### Adding a theme

1. Create `src/styles/themes/<name>.css` — use `northern-lights.css` as a template.
2. Add `@import "./themes/<name>.css"` in `src/styles/theme.css`.
3. Add an entry to the `themes` array in `src/lib/themes.ts`.

### Adding a theme to an app that already has an older export

If a project was set up from an earlier export that is missing a theme, apply the three changes manually — no need to re-run the full export.

**1. Copy the CSS file** into the target app:

```
src/styles/themes/<name>.css
```

**2. Register the import** in the target app's `src/styles/theme.css`:

```css
@import "./themes/<name>.css";
```

**3. Add the entry** to the target app's `src/lib/themes.ts`:

```ts
{ name: "<name>", label: "<Label>", description: "…" },
```

Place it first in the array if you want it to be the initial active theme (the preview page uses `themes[0].name` as its default state).

### Dark mode

Dark mode is toggled by adding the `dark` class to `<html>`. Use `applyDarkMode(true/false)` or toggle the class directly. All theme files already define dark overrides for every token under `[data-theme="..."].dark`.

## Exporting to a new project

`export-theme.sh` packages the full design system — all themes, all components, hooks, lib, and `agent-context.md` — into a single archive ready to drop into any project:

```bash
./export-theme.sh
```

This produces `design-system.tar.gz`. The default theme applied on first load is `default` (hardcoded in the script via `DEFAULT_THEME`). Edit that variable before running if you want a different default.

### Extracting and wiring up

**1. Extract into the target project root:**

```bash
tar -xzf design-system.tar.gz --strip-components=1 -C /path/to/target
```

**2. Install dependencies:**

```bash
npm install @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-slot \
  class-variance-authority clsx lucide-react tailwind-merge react react-dom

npm install -D tailwindcss @tailwindcss/vite @vitejs/plugin-react vite typescript
```

**3. Configure Vite** (`vite.config.ts`):

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": new URL("./src", import.meta.url).pathname },
  },
});
```

The `@` alias is required — all component imports use it.

**4. Import the theme as the first import** in `src/main.tsx`:

```tsx
import "@/styles/theme.css";
```

**5. Apply the theme on startup** in your root component or `App.tsx`:

```tsx
import { applyTheme, applyDarkMode } from "@/lib/themes";

applyTheme("default");
applyDarkMode(false);
```

**6. Drop `agent-context.md` into the target project** — append its contents to that project's `CLAUDE.md` so the agent there has full knowledge of the design system conventions.

## Using design tokens

Always use CSS variables — never hardcode colors:

```tsx
<div className="bg-background text-foreground" />
<div className="bg-card text-card-foreground" />
<div className="bg-primary text-primary-foreground" />
<div className="text-muted-foreground" />
<div className="border-border" />
```

Or directly in CSS:

```css
background-color: var(--primary);
border-radius: var(--radius);
box-shadow: var(--shadow-md);
```

Full token list: `src/styles/theme.css` under `@theme inline`.

## Reference

- `src/pages/theme-preview.tsx` — visual reference for every component, token, and pattern
- `src/styles/themes/northern-lights.css` — annotated token values for the default theme
- [shadcn/ui docs](https://ui.shadcn.com/docs/components)
- [tweakcn theme editor](https://tweakcn.com)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `./export-theme.sh` | Package all themes into `design-system.tar.gz` |
