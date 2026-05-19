# Design System Context — Agent Reference

This project uses a custom design system ported from `design-templates`. This section tells you everything you need to generate on-theme code without referencing the source repo.

---

## Stack

- React + Vite (or Next.js)
- shadcn/ui — component source is copied into `src/components/ui/`, NOT installed as a package
- Tailwind CSS v4 via `@tailwindcss/vite`
- Theme defined entirely via CSS custom properties

## Active theme

The theme is set once on startup via:

```ts
document.documentElement.dataset.theme = "<theme-name>";
```

All CSS variable values come from `src/styles/themes/<theme-name>.css`. Do not modify token values there unless you intend to reskin the entire app.

---

## Coding conventions

- **No inline styles.** Use Tailwind utility classes only.
- **No hardcoded colors.** Use the token classes listed below.
- TypeScript strict mode throughout.
- Dark mode is toggled by the `dark` class on `<html>` — use `dark:` variants where needed.

---

## Available design tokens (Tailwind class form)

Use these classes to reference the theme. They map to CSS variables defined in the theme file.

| Token class | Used for |
|---|---|
| `bg-background` / `text-foreground` | Page background and default text |
| `bg-card` / `text-card-foreground` | Card surfaces |
| `bg-primary` / `text-primary-foreground` | Primary actions, CTAs |
| `bg-secondary` / `text-secondary-foreground` | Secondary actions |
| `bg-muted` / `text-muted-foreground` | Subdued backgrounds, helper text |
| `bg-accent` / `text-accent-foreground` | Highlights, hover states |
| `bg-destructive` / `text-destructive-foreground` | Errors, delete actions |
| `border-border` | Default border color |
| `bg-input` | Input field backgrounds |
| `ring-ring` | Focus rings |
| `bg-popover` / `text-popover-foreground` | Dropdown / tooltip surfaces |
| `bg-sidebar` / `text-sidebar-foreground` | Sidebar surfaces |
| `bg-sidebar-primary` / `text-sidebar-primary-foreground` | Active sidebar items |
| `bg-sidebar-accent` / `text-sidebar-accent-foreground` | Sidebar hover states |
| `border-sidebar-border` | Sidebar borders |

Radius utilities: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl` (derived from `--radius`).

Shadow utilities: `shadow-2xs`, `shadow-xs`, `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`.

---

## Components

Components live in `src/components/ui/`. Import them with the `@` alias:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
```

Follow shadcn/ui naming and variant conventions when adding new components or variants. Custom components go in `src/components/ui/custom/`.

---

## Utility

```ts
import { cn } from "@/lib/utils";   // merges Tailwind classes safely
```

---

## What NOT to do

- Do not hardcode hex, rgb, or hsl values anywhere.
- Do not edit the theme CSS file to fix a layout problem — that file is only for color/typography tokens.
- Do not install shadcn/ui as an npm package — the component source is already local and should be edited in place.
- Do not create a new CSS file for component styles — use Tailwind classes in JSX.
