export interface ThemeDefinition {
  name: string;
  label: string;
  description: string;
}

/* ─── Theme Registry ──────────────────────────────────────────────────────────
   To add a new theme:
   1. Create src/styles/themes/<id>.css
   2. Add `@import "./themes/<id>.css"` in src/styles/theme.css
   3. Add an entry here
   ──────────────────────────────────────────────────────────────────────────── */
export const themes: ThemeDefinition[] = [
  {
    name: "northern-lights",
    label: "Northern Lights",
    description: "Aurora greens and blues on a near-white / deep-navy base",
  },
  {
    name: "amber-minimal",
    label: "Amber Minimal",
    description: "Variants of orange on dark grey / black base",
  },
];

export function applyTheme(name: string) {
  document.documentElement.dataset.theme = name;
}

export function applyDarkMode(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}
