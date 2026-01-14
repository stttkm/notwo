# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- `src/ipc/{feature}/` - Feature-specific handlers (theme, window, shell, app)

To call main process from renderer: `ipc.client.{router}.{procedure}()`

### Routing (TanStack Router)

File-based routing in `src/routes/`:
- `__root.tsx` - Root layout component
- `index.tsx` - Home page (`/`)
- `second.tsx` - Second page (`/second`)
- `routeTree.gen.ts` - Auto-generated route tree

### Actions

`src/actions/` contains renderer-side functions that combine IPC calls with local state:
- `theme.ts` - Theme management (IPC + localStorage sync)
- `language.ts` - i18n language handling
- `window.ts`, `shell.ts`, `app.ts` - Window/system operations

### Build Configuration

- Vite configs: `vite.main.config.mts`, `vite.preload.config.mts`, `vite.renderer.config.mts`
- Electron Forge: `forge.config.ts`
- Path alias `@/*` maps to `./src/*`
