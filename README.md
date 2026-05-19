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
├── components/ui/       # shadcn/ui components (Button, Card, Dialog, …)
│   └── custom/          # project-specific custom components
├── lib/
│   ├── themes.ts        # theme registry + applyTheme / applyDarkMode helpers
│   └── utils.ts         # cn() utility
├── pages/
│   └── theme-preview.tsx  # living design-system preview (source of truth)
└── styles/
    ├── theme.css          # canonical CSS variable definitions
    └── themes/            # per-theme overrides (one file per theme)
```

## Themes

Themes are applied by setting `document.documentElement.dataset.theme = "<name>"`. Each theme is a CSS file in `src/styles/themes/` that overrides the CSS variables defined in `src/styles/theme.css`.

| Name | Description |
|------|-------------|
| `northern-lights` | Aurora greens and blues on a near-white / deep-navy base |

### Adding a theme

1. Create `src/styles/themes/<id>.css` with variable overrides.
2. Add `@import "./themes/<id>.css"` in `src/styles/theme.css`.
3. Add an entry to the `themes` array in `src/lib/themes.ts`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
