# Design System — Integration Guide

How to apply this design system's look and feel to a new project.

---

## What this design system provides

| Layer | What it is |
|---|---|
| **Theme** | CSS variables for color, typography, radius, shadows — defined per-theme via `data-theme` attribute |
| **Components** | shadcn/ui components (Button, Card, Badge, etc.) pre-wired to the theme tokens |
| **Utilities** | `cn()` helper and `applyTheme()` / `applyDarkMode()` functions |
| **Preview** | `src/pages/theme-preview.tsx` — living reference of every component and token in use |

---

## Migrating one theme to a new project

Use this workflow when you've picked a specific theme from the showcase and want to bring only that theme into a target project (no switcher, no extra CSS weight).

### Step 1 — Pick your theme

Look at the theme showcase and decide which theme to use. Available themes are registered in `src/lib/themes.ts`. Each one has a corresponding CSS file at `src/styles/themes/<name>.css`.

### Step 2 — Copy files into the target project

Copy these files from `design-templates`, preserving directory structure:

```
src/
  styles/
    theme.css                          ← copy and edit (see Step 3)
    themes/
      <chosen-theme>.css               ← copy only the theme you picked
  components/
    ui/
      button.tsx
      card.tsx
      badge.tsx
      dialog.tsx
      input.tsx
      label.tsx
      table.tsx                        ← copy only the components you use
  lib/
    utils.ts                           ← cn() helper — always needed
    themes.ts                          ← copy if you want applyDarkMode(); otherwise optional
```

### Step 3 — Trim `theme.css` to one theme

In the copied `theme.css`, remove all `@import` lines for themes you are not using. Keep only the one you chose:

```css
@import "tailwindcss";

@import "./themes/northern-lights.css";   /* ← only your chosen theme */

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* ... token bridge — keep this block unchanged ... */
}

@layer base {
  /* ... keep unchanged ... */
}
```

### Step 4 — Apply the theme on app startup

In your root component or `App.tsx`, call `applyTheme` once with the exact theme name:

```tsx
import { applyTheme, applyDarkMode } from "@/lib/themes";

applyTheme("northern-lights");   // must match the [data-theme="..."] selector in the CSS
applyDarkMode(false);            // true for dark
```

If you don't need dark-mode toggling at runtime, you can skip importing `themes.ts` and just set the attribute directly:

```tsx
document.documentElement.dataset.theme = "northern-lights";
```

### Step 5 — Drop the agent context file into the target project

Copy `agent-context.md` from this repo into the target project and append its contents to that project's `CLAUDE.md`. This gives the agent in that project full knowledge of the design system conventions so it can generate on-theme code without referencing back to `design-templates`.

---

## Full integration (all steps for a fresh project)

### Install dependencies

```bash
npm install @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-slot \
  class-variance-authority clsx lucide-react tailwind-merge react react-dom

npm install -D tailwindcss @tailwindcss/vite @vitejs/plugin-react vite typescript
```

### Configure Vite

In `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
});
```

The `@` alias is required — all component imports use it (e.g. `@/lib/utils`).

### Import the theme in your entry file

In `src/main.tsx` (or `src/index.tsx`):

```tsx
import "@/styles/theme.css";   // must be first
```

### Use components

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
```

Example:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Hello</CardTitle>
  </CardHeader>
  <CardContent>
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="you@example.com" />
    <Button className="mt-3">Submit</Button>
  </CardContent>
</Card>
```

---

## Using design tokens in custom components

Always use CSS variables — never hardcode colors. Reference them as Tailwind utility classes:

```tsx
<div className="bg-background text-foreground" />
<div className="bg-card text-card-foreground" />
<div className="bg-primary text-primary-foreground" />
<div className="text-muted-foreground" />
<div className="border-border" />
```

Or directly in CSS when needed:

```css
background-color: var(--primary);
color: var(--primary-foreground);
border-radius: var(--radius);
box-shadow: var(--shadow-md);
```

Full list of available tokens is in `src/styles/theme.css` under `@theme inline`.

---

## Adding a new theme to the showcase

1. Create `src/styles/themes/<name>.css` — define `[data-theme="<name>"]` and its `.dark` variant. Use `northern-lights.css` as a template.
2. Add `@import "./themes/<name>.css"` in `src/styles/theme.css`.
3. Add an entry to the `themes` array in `src/lib/themes.ts`.
4. Call `applyTheme("<name>")` to activate it.

---

## Dark mode

Dark mode is toggled by adding the `dark` class to `<html>`:

```ts
import { applyDarkMode } from "@/lib/themes";

applyDarkMode(true);   // adds class="dark" to <html>
applyDarkMode(false);  // removes it
```

Use `dark:` Tailwind variants in components to override light-mode styles:

```tsx
<div className="bg-card dark:bg-card" />
```

The theme files already define dark overrides for all tokens under `[data-theme="..."].dark`.

---

## Reference

- `src/pages/theme-preview.tsx` — visual reference for every component, token, and pattern. Run the dev server and open it to see the full design system live.
- `src/styles/themes/northern-lights.css` — all token values for the Northern Lights theme.
- shadcn/ui docs: https://ui.shadcn.com/docs/components
- tweakcn (theme editor): https://tweakcn.com
