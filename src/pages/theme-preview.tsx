import { useState } from "react";
import { Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { themes, applyTheme, applyDarkMode } from "@/lib/themes";

/* ─── Colour token list ────────────────────────────────────────────────────── */
const colorTokens = [
  { token: "--background", label: "Background" },
  { token: "--foreground", label: "Foreground" },
  { token: "--card", label: "Card" },
  { token: "--primary", label: "Primary" },
  { token: "--primary-foreground", label: "Primary FG" },
  { token: "--secondary", label: "Secondary" },
  { token: "--secondary-foreground", label: "Secondary FG" },
  { token: "--muted", label: "Muted" },
  { token: "--muted-foreground", label: "Muted FG" },
  { token: "--accent", label: "Accent" },
  { token: "--accent-foreground", label: "Accent FG" },
  { token: "--destructive", label: "Destructive" },
  { token: "--border", label: "Border" },
  { token: "--input", label: "Input" },
  { token: "--ring", label: "Ring" },
  { token: "--chart-1", label: "Chart 1" },
  { token: "--chart-2", label: "Chart 2" },
  { token: "--chart-3", label: "Chart 3" },
  { token: "--chart-4", label: "Chart 4" },
  { token: "--chart-5", label: "Chart 5" },
];

function ColorSwatch({ token, label }: { token: string; label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-14 w-full rounded-lg border shadow-sm"
        style={{ backgroundColor: `var(${token})` }}
      />
      <div className="space-y-0.5">
        <p className="text-xs font-medium">{label}</p>
        <p className="text-muted-foreground font-mono text-[10px]">{token}</p>
      </div>
    </div>
  );
}

/* ─── Section wrapper ──────────────────────────────────────────────────────── */
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 space-y-6">
      <div className="border-b pb-3">
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

/* ─── Sample table data ────────────────────────────────────────────────────── */
const tableData = [
  { name: "Alice Chen", role: "Designer", status: "Active", joined: "Jan 2024" },
  { name: "Bob Santos", role: "Engineer", status: "Active", joined: "Mar 2024" },
  { name: "Carol Kim", role: "PM", status: "Away", joined: "Jun 2023" },
  { name: "David Park", role: "Engineer", status: "Inactive", joined: "Sep 2023" },
];

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Active: "default",
  Away: "secondary",
  Inactive: "outline",
};

/* ─── Nav items ────────────────────────────────────────────────────────────── */
const navItems = [
  { href: "#colors", label: "Colors" },
  { href: "#typography", label: "Typography" },
  { href: "#buttons", label: "Buttons" },
  { href: "#badges", label: "Badges" },
  { href: "#cards", label: "Cards" },
  { href: "#inputs", label: "Inputs" },
  { href: "#dialog", label: "Dialog" },
  { href: "#table", label: "Table" },
];

/* ─── Main page ────────────────────────────────────────────────────────────── */
export default function ThemePreview() {
  const [activeTheme, setActiveTheme] = useState(themes[0].name);
  const [isDark, setIsDark] = useState(false);

  function handleThemeChange(name: string) {
    setActiveTheme(name);
    applyTheme(name);
  }

  function handleDarkToggle() {
    const next = !isDark;
    setIsDark(next);
    applyDarkMode(next);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <Palette className="size-5 text-primary" />
            <span className="font-semibold">Design System</span>
          </div>

          <nav className="hidden gap-5 text-sm md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme selector */}
            <select
              value={activeTheme}
              onChange={(e) => handleThemeChange(e.target.value)}
              className="border-input bg-background text-foreground rounded-md border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {themes.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.label}
                </option>
              ))}
            </select>

            {/* Dark mode toggle */}
            <Button variant="ghost" size="icon" onClick={handleDarkToggle}>
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-20 px-6 py-12">
        {/* Hero */}
        <div className="space-y-3">
          <Badge variant="secondary">v0.1</Badge>
          <h1 className="text-4xl font-bold tracking-tight">
            {themes.find((t) => t.name === activeTheme)?.label ?? "Design System"}
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg">
            {themes.find((t) => t.name === activeTheme)?.description}
          </p>
        </div>

        {/* ── Colors ── */}
        <Section id="colors" title="Color Tokens">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {colorTokens.map((c) => (
              <ColorSwatch key={c.token} {...c} />
            ))}
          </div>
        </Section>

        {/* ── Typography ── */}
        <Section id="typography" title="Typography">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-muted-foreground text-xs uppercase tracking-widest">
                  Sans-serif — {"{--font-sans}"}
                </h3>
                {[
                  { size: "text-4xl font-bold", label: "Display / 36px bold" },
                  { size: "text-2xl font-semibold", label: "Heading 1 / 24px semibold" },
                  { size: "text-xl font-semibold", label: "Heading 2 / 20px semibold" },
                  { size: "text-lg font-medium", label: "Heading 3 / 18px medium" },
                  { size: "text-base", label: "Body / 16px regular" },
                  { size: "text-sm", label: "Small / 14px regular" },
                  { size: "text-xs", label: "XS / 12px regular" },
                ].map(({ size, label }) => (
                  <div key={size}>
                    <p className={size} style={{ fontFamily: "var(--font-sans)" }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-muted-foreground text-xs uppercase tracking-widest">
                  Mono — {"{--font-mono}"}
                </h3>
                {[
                  "const theme = 'northern-lights'",
                  "import { Button } from '@/ui'",
                  "--primary: oklch(0.65 0.15 150)",
                  "font-family: var(--font-mono)",
                ].map((s) => (
                  <p
                    key={s}
                    className="text-sm"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {s}
                  </p>
                ))}

                <h3 className="text-muted-foreground mt-6 text-xs uppercase tracking-widest">
                  Serif — {"{--font-serif}"}
                </h3>
                <p
                  className="text-2xl"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  The quick brown fox
                </p>
                <p
                  className="text-base"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  jumps over the lazy dog.
                </p>
              </div>
            </div>

            {/* Colour ramps on text */}
            <div className="flex flex-wrap gap-4 pt-2">
              {[
                { cls: "text-foreground", label: "foreground" },
                { cls: "text-muted-foreground", label: "muted-fg" },
                { cls: "text-primary", label: "primary" },
                { cls: "text-secondary", label: "secondary" },
                { cls: "text-destructive", label: "destructive" },
              ].map(({ cls, label }) => (
                <span key={cls} className={`text-sm font-medium ${cls}`}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Buttons ── */}
        <Section id="buttons" title="Buttons">
          <div className="space-y-6">
            <div>
              <h3 className="text-muted-foreground mb-3 text-sm font-medium">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>
            <div>
              <h3 className="text-muted-foreground mb-3 text-sm font-medium">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div>
              <h3 className="text-muted-foreground mb-3 text-sm font-medium">States</h3>
              <div className="flex flex-wrap gap-3">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Badges ── */}
        <Section id="badges" title="Badges">
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </Section>

        {/* ── Cards ── */}
        <Section id="cards" title="Cards">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Basic card */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>A simple card with header and content.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  This is the card body. Use it for any secondary information or
                  grouped content.
                </p>
              </CardContent>
            </Card>

            {/* Card with footer */}
            <Card>
              <CardHeader>
                <CardTitle>With Footer</CardTitle>
                <CardDescription>Cards can have footers with actions.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Content area with a footer below.</p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button size="sm">Confirm</Button>
                <Button size="sm" variant="outline">Cancel</Button>
              </CardFooter>
            </Card>

            {/* Stat card */}
            <Card>
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">2,847</div>
                <p className="text-muted-foreground mt-1 text-sm">
                  <span className="text-primary font-medium">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* ── Inputs ── */}
        <Section id="inputs" title="Inputs">
          <div className="grid max-w-xl gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="default-input">Default</Label>
              <Input id="default-input" placeholder="Enter text…" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disabled-input">Disabled</Label>
              <Input id="disabled-input" placeholder="Disabled" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-input">Email</Label>
              <Input id="email-input" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-input">Password</Label>
              <Input id="password-input" type="password" placeholder="••••••••" />
            </div>
          </div>
        </Section>

        {/* ── Dialog ── */}
        <Section id="dialog" title="Dialog">
          <div className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm action</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. Are you sure you want to proceed?
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason (optional)</Label>
                  <Input id="reason" placeholder="Enter a reason…" />
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Continue</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete Item</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete item?</DialogTitle>
                  <DialogDescription>
                    This will permanently delete the item and all associated data.
                    This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive">Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Section>

        {/* ── Table ── */}
        <Section id="table" title="Table">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[row.status] ?? "outline"}>
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.joined}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Section>
      </main>
    </div>
  );
}
