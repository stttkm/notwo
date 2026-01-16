# Theme Customization: Accent & Base Color Selection

## Overview
Add ability for users to select accent color (primary) and base color (neutral tones for dark mode) from the settings page.

## Current State
- Theme (light/dark/system) is stored in localStorage and applied via DOM class
- CSS variables in `src/styles/global.css` define colors using OKLCH values
- No Jotai atoms for theme - uses action-based approach with localStorage

## Implementation Approach

### 1. Define Theme Options

**Accent Colors** (Tailwind-based, ~17 options):
- red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose

**Base Colors** (for dark mode neutrals):
- slate, gray, zinc, neutral, stone

### 2. Create Theme Configuration

**New file: `src/features/settings/types/theme-colors.ts`**
- Define types for accent colors and base colors
- Define OKLCH color values for each option (light and dark variants)
- Export default values

### 3. Create Theme Atoms

**New file: `src/features/settings/atoms/theme-atoms.ts`**
- `accentColorAtom` - stores selected accent color (persisted to localStorage)
- `baseColorAtom` - stores selected base color (persisted to localStorage)
- Use `createCustomStorage` utility with Zod validation

### 4. Create Theme Application Logic

**New file: `src/features/settings/actions/apply-theme-colors.ts`**
- Function to apply accent color CSS variables to document root
- Function to apply base color CSS variables (dark mode)
- Called on app startup and when user changes selection

### 5. Update App Initialization

**Modify: `src/app/App.tsx`**
- Initialize theme colors on app startup
- Apply stored accent/base color preferences

### 6. Create Settings UI Components

**New file: `src/features/settings/components/accent-color-picker.tsx`**
- Grid of color swatches showing available accent colors
- Visual indicator for selected color
- Uses shadcn Button or custom swatch component

**New file: `src/features/settings/components/base-color-picker.tsx`**
- Grid of color swatches for base colors
- Only affects dark mode appearance

### 7. Update Settings Page

**Modify: `src/features/settings/routes/settings-page.tsx`**
- Add "Accent Color" section with color picker
- Add "Base Color" section with color picker
- Group under "Appearance" section

## Key Files to Modify/Create

### Create:
- `src/features/settings/types/theme-colors.ts`
- `src/features/settings/atoms/theme-atoms.ts`
- `src/features/settings/actions/apply-theme-colors.ts`
- `src/features/settings/components/accent-color-picker.tsx`
- `src/features/settings/components/base-color-picker.tsx`

### Modify:
- `src/features/settings/routes/settings-page.tsx`
- `src/app/App.tsx`

## CSS Variable Mapping

The accent color will update these CSS variables:
- `--primary` / `--primary-foreground`
- `--sidebar-primary` / `--sidebar-primary-foreground`
- `--chart-*` colors (optional, for consistency)

The base color will update (in dark mode):
- `--background` / `--foreground`
- `--card` / `--card-foreground`
- `--muted` / `--muted-foreground`
- `--accent` / `--accent-foreground`
- `--border` / `--input` / `--ring`
- `--sidebar-*` variants

## Verification
1. Run `pnpm start` and navigate to Settings
2. Select different accent colors - verify primary color changes across UI
3. Toggle to dark mode, select different base colors - verify neutral tones change
4. Refresh app - verify selections persist
5. Run `pnpm lint && pnpm test` to ensure no regressions
