import { useState } from "react";
import {
  Moon,
  Sun,
  Palette,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Settings,
  User,
  LogOut,
  Bell,
  Home,
  ChevronDown,
  Info,
  Terminal,
  ChevronsUpDown,
} from "lucide-react";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Calendar } from "@/components/ui/calendar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Toaster } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

/* ─── Chart config ─────────────────────────────────────────────────────────── */
const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;

/* ─── Scroll area items ────────────────────────────────────────────────────── */
const scrollItems = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

/* ─── Nav items ────────────────────────────────────────────────────────────── */
const navItems = [
  { href: "#colors", label: "Colors" },
  { href: "#typography", label: "Typography" },
  { href: "#buttons", label: "Buttons" },
  { href: "#form-controls", label: "Forms" },
  { href: "#overlays", label: "Overlays" },
  { href: "#navigation", label: "Navigation" },
  { href: "#menus", label: "Menus" },
  { href: "#feedback", label: "Feedback" },
  { href: "#data-display", label: "Data" },
  { href: "#layout", label: "Layout" },
];

/* ─── Main page ────────────────────────────────────────────────────────────── */
export default function ThemePreview() {
  const [activeTheme, setActiveTheme] = useState(themes[0].name);
  const [isDark, setIsDark] = useState(false);
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date());
  const [sliderValue, setSliderValue] = useState([40]);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

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
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen bg-background text-foreground">
        {/* ── Sticky header ── */}
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
            <div className="flex items-center gap-2">
              <Palette className="size-5 text-primary" />
              <span className="font-semibold">Design System</span>
            </div>

            <nav className="hidden gap-5 text-sm lg:flex">
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
                    <p key={s} className="text-sm" style={{ fontFamily: "var(--font-mono)" }}>
                      {s}
                    </p>
                  ))}

                  <h3 className="text-muted-foreground mt-6 text-xs uppercase tracking-widest">
                    Serif — {"{--font-serif}"}
                  </h3>
                  <p className="text-2xl" style={{ fontFamily: "var(--font-serif)" }}>
                    The quick brown fox
                  </p>
                  <p className="text-base" style={{ fontFamily: "var(--font-serif)" }}>
                    jumps over the lazy dog.
                  </p>
                </div>
              </div>

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
              <Card>
                <CardHeader>
                  <CardTitle>Basic Card</CardTitle>
                  <CardDescription>A simple card with header and content.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    This is the card body. Use it for any secondary information or grouped content.
                  </p>
                </CardContent>
              </Card>

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

          {/* ── Form Controls ── */}
          <Section id="form-controls" title="Form Controls">
            <div className="grid gap-10 md:grid-cols-2">
              {/* Text inputs */}
              <div className="space-y-4">
                <h3 className="text-muted-foreground text-sm font-medium">Input</h3>
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

              {/* Textarea */}
              <div className="space-y-4">
                <h3 className="text-muted-foreground text-sm font-medium">Textarea</h3>
                <div className="space-y-2">
                  <Label htmlFor="textarea-default">Message</Label>
                  <Textarea id="textarea-default" placeholder="Type your message here…" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="textarea-disabled">Disabled</Label>
                  <Textarea id="textarea-disabled" placeholder="Disabled" disabled />
                </div>
              </div>

              {/* Select */}
              <div className="space-y-4">
                <h3 className="text-muted-foreground text-sm font-medium">Select</h3>
                <div className="space-y-2">
                  <Label>Framework</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                      <SelectItem value="svelte">Svelte</SelectItem>
                      <SelectItem value="solid">SolidJS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Disabled</Label>
                  <Select disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="Disabled" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="x">Option</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Checkbox */}
              <div className="space-y-4">
                <h3 className="text-muted-foreground text-sm font-medium">Checkbox</h3>
                <div className="space-y-3">
                  {[
                    { id: "terms", label: "Accept terms and conditions", defaultChecked: true },
                    { id: "newsletter", label: "Subscribe to newsletter", defaultChecked: false },
                    { id: "updates", label: "Receive product updates", defaultChecked: false },
                  ].map(({ id, label, defaultChecked }) => (
                    <div key={id} className="flex items-center gap-2">
                      <Checkbox id={id} defaultChecked={defaultChecked} />
                      <Label htmlFor={id} className="font-normal cursor-pointer">{label}</Label>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <Checkbox id="disabled-cb" disabled />
                    <Label htmlFor="disabled-cb" className="font-normal text-muted-foreground">
                      Disabled
                    </Label>
                  </div>
                </div>
              </div>

              {/* Radio Group */}
              <div className="space-y-4">
                <h3 className="text-muted-foreground text-sm font-medium">Radio Group</h3>
                <RadioGroup defaultValue="comfortable">
                  {[
                    { value: "default", label: "Default" },
                    { value: "comfortable", label: "Comfortable" },
                    { value: "compact", label: "Compact" },
                  ].map(({ value, label }) => (
                    <div key={value} className="flex items-center gap-2">
                      <RadioGroupItem value={value} id={`radio-${value}`} />
                      <Label htmlFor={`radio-${value}`} className="font-normal cursor-pointer">
                        {label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Switch */}
              <div className="space-y-4">
                <h3 className="text-muted-foreground text-sm font-medium">Switch</h3>
                <div className="space-y-3">
                  {[
                    { id: "sw-notifications", label: "Notifications", defaultChecked: true },
                    { id: "sw-marketing", label: "Marketing emails", defaultChecked: false },
                    { id: "sw-security", label: "Security alerts", defaultChecked: true },
                  ].map(({ id, label, defaultChecked }) => (
                    <div key={id} className="flex items-center justify-between">
                      <Label htmlFor={id} className="font-normal cursor-pointer">{label}</Label>
                      <Switch id={id} defaultChecked={defaultChecked} />
                    </div>
                  ))}
                  <div className="flex items-center justify-between">
                    <Label className="font-normal text-muted-foreground">Disabled</Label>
                    <Switch disabled />
                  </div>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-4">
                <h3 className="text-muted-foreground text-sm font-medium">Slider</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Volume</Label>
                      <span className="text-muted-foreground">{sliderValue[0]}%</span>
                    </div>
                    <Slider
                      value={sliderValue}
                      onValueChange={setSliderValue}
                      max={100}
                      step={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Disabled</Label>
                    <Slider defaultValue={[60]} max={100} disabled />
                  </div>
                </div>
              </div>

              {/* Input OTP */}
              <div className="space-y-4">
                <h3 className="text-muted-foreground text-sm font-medium">Input OTP</h3>
                <div className="space-y-2">
                  <Label>Verification Code</Label>
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            </div>
          </Section>

          {/* ── Dialog & Overlays ── */}
          <Section id="overlays" title="Dialog & Overlays">
            <div className="flex flex-wrap gap-3">
              {/* Dialog */}
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

              {/* Alert Dialog */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Alert Dialog</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and
                      remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription>
                      Make changes to your profile here. Click save when done.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="sheet-name">Name</Label>
                      <Input id="sheet-name" defaultValue="Alice Chen" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sheet-email">Email</Label>
                      <Input id="sheet-email" defaultValue="alice@example.com" />
                    </div>
                    <Button className="w-full">Save changes</Button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Drawer */}
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">Open Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Move Goal</DrawerTitle>
                    <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4">
                    <p className="text-muted-foreground text-sm">
                      Adjust your daily step goal to stay on track with your fitness targets.
                    </p>
                  </div>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

              {/* Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensions</h4>
                    <p className="text-muted-foreground text-sm">Set the dimensions for the layer.</p>
                    <div className="grid grid-cols-3 items-center gap-4 pt-2">
                      <Label htmlFor="width">Width</Label>
                      <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                      <Label htmlFor="height">Height</Label>
                      <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Hover Card */}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link">@shadcn</Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">@shadcn</h4>
                      <p className="text-muted-foreground text-sm">
                        Creator of shadcn/ui. Building the future of design systems.
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>

              {/* Tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover for Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip with extra context</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </Section>

          {/* ── Navigation ── */}
          <Section id="navigation" title="Navigation">
            <div className="space-y-10">
              {/* Breadcrumb */}
              <div className="space-y-2">
                <h3 className="text-muted-foreground text-sm font-medium">Breadcrumb</h3>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Components</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              {/* Tabs */}
              <div className="space-y-2">
                <h3 className="text-muted-foreground text-sm font-medium">Tabs</h3>
                <Tabs defaultValue="account" className="w-full max-w-md">
                  <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>Manage your account settings.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="tab-name">Name</Label>
                          <Input id="tab-name" defaultValue="Alice Chen" />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="password" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>Change your password here.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="current">Current password</Label>
                          <Input id="current" type="password" />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="settings" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Settings</CardTitle>
                        <CardDescription>Manage your preferences.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <Label>Dark mode</Label>
                          <Switch />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Pagination */}
              <div className="space-y-2">
                <h3 className="text-muted-foreground text-sm font-medium">Pagination</h3>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>

              {/* Navigation Menu */}
              <div className="space-y-2">
                <h3 className="text-muted-foreground text-sm font-medium">Navigation Menu</h3>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-4 w-[300px]">
                          <NavigationMenuLink className="block space-y-1 rounded-md p-3 hover:bg-accent">
                            <div className="text-sm font-medium">Introduction</div>
                            <div className="text-muted-foreground text-sm">
                              Re-usable components built with shadcn/ui.
                            </div>
                          </NavigationMenuLink>
                          <NavigationMenuLink className="block space-y-1 rounded-md p-3 hover:bg-accent">
                            <div className="text-sm font-medium">Installation</div>
                            <div className="text-muted-foreground text-sm">
                              How to install dependencies and structure your app.
                            </div>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-4 w-[300px]">
                          <NavigationMenuLink className="block space-y-1 rounded-md p-3 hover:bg-accent">
                            <div className="text-sm font-medium">Button</div>
                            <div className="text-muted-foreground text-sm">
                              Displays a button or a component that looks like a button.
                            </div>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink className="px-4 py-2 text-sm hover:bg-accent rounded-md inline-flex">
                        Docs
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              {/* Menubar */}
              <div className="space-y-2">
                <h3 className="text-muted-foreground text-sm font-medium">Menubar</h3>
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>New Tab</MenubarItem>
                      <MenubarItem>New Window</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Share</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Print</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>Edit</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>Undo</MenubarItem>
                      <MenubarItem>Redo</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Cut</MenubarItem>
                      <MenubarItem>Copy</MenubarItem>
                      <MenubarItem>Paste</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>View</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>Always Show Bookmarks Bar</MenubarItem>
                      <MenubarItem>Toggle Fullscreen</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </div>
          </Section>

          {/* ── Menus ── */}
          <Section id="menus" title="Menus">
            <div className="flex flex-wrap gap-6 items-start">
              {/* Dropdown Menu */}
              <div className="space-y-2">
                <h3 className="text-muted-foreground text-sm font-medium">Dropdown Menu</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Open Menu <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell className="mr-2 h-4 w-4" /> Notifications
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Context Menu */}
              <div className="space-y-2">
                <h3 className="text-muted-foreground text-sm font-medium">Context Menu</h3>
                <ContextMenu>
                  <ContextMenuTrigger>
                    <div className="flex h-20 w-48 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground select-none">
                      Right-click here
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>
                      <Home className="mr-2 h-4 w-4" /> Back
                    </ContextMenuItem>
                    <ContextMenuItem>Reload</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Save Page As…</ContextMenuItem>
                    <ContextMenuItem>Print…</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Inspect</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </div>

              {/* Command */}
              <div className="space-y-2">
                <h3 className="text-muted-foreground text-sm font-medium">Command</h3>
                <div className="rounded-md border w-72">
                  <Command>
                    <CommandInput placeholder="Search commands…" />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        <CommandItem>
                          <Home className="mr-2 h-4 w-4" /> Dashboard
                        </CommandItem>
                        <CommandItem>
                          <User className="mr-2 h-4 w-4" /> Profile
                        </CommandItem>
                        <CommandItem>
                          <Settings className="mr-2 h-4 w-4" /> Settings
                        </CommandItem>
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup heading="Actions">
                        <CommandItem>
                          <Bell className="mr-2 h-4 w-4" /> Notifications
                        </CommandItem>
                        <CommandItem>
                          <LogOut className="mr-2 h-4 w-4" /> Log out
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              </div>

              {/* Toggle */}
              <div className="space-y-2">
                <h3 className="text-muted-foreground text-sm font-medium">Toggle</h3>
                <div className="flex flex-wrap gap-2">
                  <Toggle aria-label="Bold"><Bold className="h-4 w-4" /></Toggle>
                  <Toggle aria-label="Italic"><Italic className="h-4 w-4" /></Toggle>
                  <Toggle aria-label="Underline"><Underline className="h-4 w-4" /></Toggle>
                  <Toggle variant="outline" aria-label="Bold outline"><Bold className="h-4 w-4" /></Toggle>
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-muted-foreground text-xs">Toggle Group</p>
                  <ToggleGroup type="single" defaultValue="center" variant="outline">
                    <ToggleGroupItem value="left" aria-label="Align left">
                      <AlignLeft className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="center" aria-label="Align center">
                      <AlignCenter className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="right" aria-label="Align right">
                      <AlignRight className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </div>
          </Section>

          {/* ── Feedback ── */}
          <Section id="feedback" title="Feedback">
            <div className="space-y-8">
              {/* Alert */}
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-sm font-medium">Alert</h3>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Heads up!</AlertTitle>
                  <AlertDescription>
                    You can add components to your app using the CLI.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Your session has expired. Please log in again to continue.
                  </AlertDescription>
                </Alert>
              </div>

              {/* Progress */}
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-sm font-medium">Progress</h3>
                <div className="space-y-3 max-w-md">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Upload progress</span><span>33%</span>
                    </div>
                    <Progress value={33} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Installation</span><span>66%</span>
                    </div>
                    <Progress value={66} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Complete</span><span>100%</span>
                    </div>
                    <Progress value={100} />
                  </div>
                </div>
              </div>

              {/* Skeleton */}
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-sm font-medium">Skeleton</h3>
                <div className="flex items-start gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Skeleton className="h-24 rounded-lg" />
                  <Skeleton className="h-24 rounded-lg" />
                  <Skeleton className="h-24 rounded-lg" />
                </div>
              </div>

              {/* Toast */}
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-sm font-medium">Toast (Sonner)</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => toast("Event has been created.")}>
                    Default toast
                  </Button>
                  <Button variant="outline" onClick={() => toast.success("Profile updated successfully.")}>
                    Success
                  </Button>
                  <Button variant="outline" onClick={() => toast.error("Something went wrong.")}>
                    Error
                  </Button>
                  <Button variant="outline" onClick={() => toast.warning("Your plan is about to expire.")}>
                    Warning
                  </Button>
                  <Button variant="outline" onClick={() => toast.info("New update available.")}>
                    Info
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast("File uploaded", {
                        description: "your-design.fig has been uploaded to the cloud.",
                        action: { label: "View", onClick: () => {} },
                      })
                    }
                  >
                    With action
                  </Button>
                </div>
              </div>
            </div>
          </Section>

          {/* ── Data Display ── */}
          <Section id="data-display" title="Data Display">
            <div className="space-y-10">
              {/* Avatar */}
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-sm font-medium">Avatar</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-14 w-14">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>BS</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>CK</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Separator */}
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-sm font-medium">Separator</h3>
                <div className="space-y-4 max-w-sm">
                  <div>
                    <h4 className="text-sm font-medium">Radix Primitives</h4>
                    <p className="text-muted-foreground text-sm">An open-source UI component library.</p>
                  </div>
                  <Separator />
                  <div className="flex h-5 items-center gap-4 text-sm">
                    <span>Blog</span>
                    <Separator orientation="vertical" />
                    <span>Docs</span>
                    <Separator orientation="vertical" />
                    <span>Source</span>
                  </div>
                </div>
              </div>

              {/* Accordion */}
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-sm font-medium">Accordion</h3>
                <Accordion type="single" collapsible className="max-w-lg">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It comes with default styles that match the other components&apos; aesthetic.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It&apos;s animated by default, but you can disable it if you prefer.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Collapsible */}
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-sm font-medium">Collapsible</h3>
                <Collapsible
                  open={collapsibleOpen}
                  onOpenChange={setCollapsibleOpen}
                  className="max-w-sm space-y-2"
                >
                  <div className="flex items-center justify-between rounded-md border px-4 py-3">
                    <span className="text-sm font-medium">@peduarte starred 3 repos</span>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronsUpDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <div className="rounded-md border px-4 py-3 text-sm font-mono">@radix-ui/primitives</div>
                  <CollapsibleContent className="space-y-2">
                    <div className="rounded-md border px-4 py-3 text-sm font-mono">@radix-ui/colors</div>
                    <div className="rounded-md border px-4 py-3 text-sm font-mono">@stitches/react</div>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              {/* Calendar */}
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-sm font-medium">Calendar</h3>
                <Calendar
                  mode="single"
                  selected={calendarDate}
                  onSelect={setCalendarDate}
                  className="rounded-md border w-fit"
                />
              </div>

              {/* Carousel */}
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-sm font-medium">Carousel</h3>
                <Carousel className="max-w-sm">
                  <CarouselContent>
                    {Array.from({ length: 5 }, (_, i) => (
                      <CarouselItem key={i}>
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-4xl font-bold">{i + 1}</span>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>

              {/* Scroll Area */}
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-sm font-medium">Scroll Area</h3>
                <ScrollArea className="h-48 w-48 rounded-md border">
                  <div className="p-4">
                    {scrollItems.map((item) => (
                      <div key={item} className="py-1.5 text-sm border-b last:border-0">
                        {item}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Chart */}
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-sm font-medium">Chart</h3>
                <Card className="max-w-lg">
                  <CardHeader>
                    <CardTitle>Bar Chart — Desktop vs Mobile</CardTitle>
                    <CardDescription>January – June 2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig}>
                      <BarChart data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          {/* ── Layout ── */}
          <Section id="layout" title="Layout">
            <div className="space-y-8">
              {/* Resizable */}
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-sm font-medium">Resizable Panels</h3>
                <ResizablePanelGroup
                  orientation="horizontal"
                  className="min-h-[160px] max-w-xl rounded-lg border"
                >
                  <ResizablePanel defaultSize={30}>
                    <div className="flex h-full items-center justify-center p-6">
                      <span className="text-sm font-medium">Sidebar</span>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={70}>
                    <ResizablePanelGroup orientation="vertical">
                      <ResizablePanel defaultSize={50}>
                        <div className="flex h-full items-center justify-center p-6">
                          <span className="text-sm font-medium">Content</span>
                        </div>
                      </ResizablePanel>
                      <ResizableHandle withHandle />
                      <ResizablePanel defaultSize={50}>
                        <div className="flex h-full items-center justify-center p-6">
                          <span className="text-sm font-medium">Details</span>
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
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
                        <TableCell className="text-muted-foreground">{row.joined}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost">Edit</Button>
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
    </TooltipProvider>
  );
}
