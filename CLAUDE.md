# UI Standard — Design System

## Stack
- React + Vite (or Next.js)
- shadcn/ui (component source copied into project)
- Tailwind CSS v4
- Theme defined via CSS variables (tweakcn export)

## Theme
The canonical theme lives in `src/styles/theme.css`.
Always use CSS variables from this file — never hardcode colors.

## Component rules
- Use shadcn/ui components for all standard UI (Button, Card, Dialog, etc.)
- Custom components go in `src/components/ui/custom/`
- Follow shadcn naming and variant conventions

## Reference page
`src/pages/theme-preview.tsx` is a living preview of the design system in action.
It must be kept up to date when new components or patterns are added.
Treat it as the source of truth for visual standards — similar to:
https://thariqs.github.io/html-effectiveness/05-design-system.html

## Coding conventions
- TypeScript strict mode
- No inline styles — Tailwind classes only
- Dark mode support via `dark:` variants (already handled by theme)
