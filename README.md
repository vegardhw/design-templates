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
| `amber-minimal` | Variants of orange on a dark grey / black base |

### Adding a theme

1. Create `src/styles/themes/<id>.css` with variable overrides.
2. Add `@import "./themes/<id>.css"` in `src/styles/theme.css`.
3. Add an entry to the `themes` array in `src/lib/themes.ts`.

## Exporting to a new project

Use `export-theme.sh` to package a single theme's files into a ready-to-copy archive:

```bash
./export-theme.sh                  # interactive menu
./export-theme.sh northern-lights  # by name
./export-theme.sh 1                # by number
```

The archive contains only the files needed for that theme (`src/styles/`, `src/components/ui/`, `src/lib/`, `agent-context.md`) with `theme.css` and `themes.ts` already trimmed to that one theme. See `INSTRUCTIONS.md` for how to wire it into the target project after extracting.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `./export-theme.sh [theme]` | Package a theme into a `.tar.gz` archive |
