# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Setup

This project uses pnpm. The `.npmrc` file sets `node-linker=hoisted` which is required by Electron Forge.

```bash
pnpm install
```

## Commands

```bash
# Development
pnpm start              # Run the Electron app in development mode

# Testing
pnpm test               # Run unit tests (Vitest)
pnpm test:watch         # Run unit tests in watch mode
pnpm test:e2e           # Run E2E tests (Playwright)
pnpm test:all           # Run both unit and E2E tests

# Code Quality
pnpm lint               # Run ESLint
pnpm format             # Check formatting with Prettier
pnpm format:write       # Auto-fix formatting

# Building & Distribution
pnpm package            # Package the app
pnpm make               # Create distributables
pnpm publish            # Publish to GitHub (requires GITHUB_TOKEN)
```

## Architecture

This is an Electron + React application using the electron-shadcn template.

### Process Architecture

- **Main process** (`src/main.ts`): Electron main process, creates the BrowserWindow, sets up IPC via oRPC
- **Preload** (`src/preload.ts`): Bridge for IPC message port communication between renderer and main
- **Renderer** (`src/renderer.ts` → `src/App.tsx`): React application entry point

### IPC Communication (oRPC)

The app uses [oRPC](https://orpc.unnoq.com) for type-safe IPC communication:

- `src/ipc/router.ts` - Aggregates all IPC procedure routers
- `src/ipc/handler.ts` - Main process RPC handler setup
- `src/ipc/manager.ts` - Renderer-side client that creates MessageChannel and initializes oRPC link
- `src/ipc/context.ts` - Provides middleware context (e.g., window reference) to handlers
- `src/ipc/{feature}/handlers.ts` - Feature-specific handlers (theme, window, shell, app)

To call main process from renderer: `ipc.client.{router}.{procedure}()`

### Routing (TanStack Router)

File-based routing in `src/routes/`:

- `__root.tsx` - Root layout component
- `index.tsx` - Home page (`/`)
- `second.tsx` - Second page (`/second`)
- `settings.tsx` - Settings page (`/settings`)
- `routeTree.gen.ts` - Auto-generated route tree

Route files are thin wrappers that import from feature modules.

### Project Structure (Bulletproof React)

The codebase follows the Bulletproof React feature-based architecture:

```
src/
├── app/                    # Application-level infrastructure
│   ├── App.tsx
│   ├── window-controls/    # Window control components and actions
│   └── shell/              # Shell/system actions
├── features/               # Feature modules (self-contained)
│   ├── home/
│   ├── second/
│   ├── settings/
│   ├── sidebar/            # Zen-style sidebar system
│   ├── shortcuts/          # Keyboard shortcut system
│   └── command-palette/    # Command palette (Cmd+K)
├── components/             # Shared components
│   └── ui/                 # shadcn/ui primitives
├── shared/                 # Shared utilities
│   ├── actions/
│   ├── constants/
│   ├── types/
│   └── utils/
├── layouts/                # Layout components
├── localization/           # i18n configuration
├── ipc/                    # IPC handlers (main process)
└── routes/                 # TanStack Router route files (thin wrappers)
```

### State Management (Jotai)

- Use Jotai for state management
- Store atoms in `features/{feature}/atoms/` directories
- Use `atomWithStorage` for persisted state (localStorage)
- Consider using `createJSONStorage` utility for custom storage with validation

### Build Configuration

- Vite configs: `vite.main.config.mts`, `vite.preload.config.mts`, `vite.renderer.config.mts`
- Electron Forge: `forge.config.ts`
- Path alias `@/*` maps to `./src/*` (must be configured in ALL vite configs)

---

## User Preferences & Code Style

### TypeScript/ESLint Rules (STRICT)

- **NEVER** use TypeScript casts (`as`, `<Type>`)
- **NEVER** use `@ts-ignore` or `@ts-expect-error`
- **NEVER** use ESLint disable comments (`// eslint-disable-*`)
- Always fix the root cause, not silence the error

### Code Formatting

```ts
// GOOD - single line for simple conditionals
if (typeof window === "undefined") return initialValue;

// BAD - unnecessary multi-line
if (typeof window === "undefined") {
  return initialValue;
}
```

### Component Organization

- **One component per file** - Add `react/no-multi-comp` ESLint rule
- **Max 125 lines per file** - If a component is too big, split it up
- **Extract hooks** from components when they contain complex logic
- **Use shadcn/ui components** - Always prefer existing shadcn components over custom implementations
  - Use `Kbd` component for keyboard shortcut display
  - Use `Resizable` component for resizable panels (not custom implementations)

### shadcn/ui Best Practices

When a shadcn component exists for your use case, use it:

- Resizable panels → `@/components/ui/resizable`
- Keyboard shortcuts display → `@/components/ui/kbd`
- Command palette → `@/components/ui/command`
- Dialogs → `@/components/ui/dialog`

### Performance

- Avoid `transition-all` with `duration-*` on frequently changing properties
- Be mindful of CSS transitions that might feel sluggish
- Extract reusable logic into custom hooks

### File Organization within Features

```
features/{feature}/
├── components/     # React components
├── hooks/          # Custom hooks (extracted from components)
├── atoms/          # Jotai atoms
├── types/          # TypeScript types
├── utils/          # Utility functions
├── actions/        # Actions (side effects, API calls)
└── routes/         # Page components (imported by src/routes/)
```

### Electron-specific

- For keyboard shortcuts, consider Electron's native accelerator API for better cross-platform support
- Use `event.code` (physical key position) instead of `event.key` (character) for keyboard layout independence

### Naming Conventions

- Components: PascalCase (`ThemeToggle.tsx`)
- Hooks: camelCase with `use` prefix (`useGlobalShortcuts.ts`)
- Atoms: camelCase with `Atom` suffix (`sidebarStateAtom`)
- Types: PascalCase (`KeyCombination`)
- Files: kebab-case (`shortcut-utils.ts`)
