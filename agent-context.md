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
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@/components/ui/breadcrumb";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle } from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandSeparator, CommandItem, CommandShortcut } from "@/components/ui/command";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuGroup, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent, ContextMenuRadioGroup } from "@/components/ui/context-menu";
import { Dialog, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Drawer, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuRadioGroup } from "@/components/ui/dropdown-menu";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarCheckboxItem, MenubarRadioItem, MenubarLabel, MenubarSeparator, MenubarShortcut, MenubarGroup, MenubarSub, MenubarSubTrigger, MenubarSubContent, MenubarRadioGroup } from "@/components/ui/menubar";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuViewport, NavigationMenuIndicator } from "@/components/ui/navigation-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarRail, SidebarInset, SidebarInput, SidebarHeader, SidebarFooter, SidebarSeparator, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupAction, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction, SidebarMenuBadge, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Toaster } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle, toggleVariants } from "@/components/ui/toggle";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
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
