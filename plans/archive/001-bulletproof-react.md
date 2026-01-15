# Bulletproof React Migration Plan

## Goal

Migrate the codebase to Bulletproof React's feature-based architecture with:

- Feature folders for `home`, `second`, and `settings` pages
- App-level infrastructure (window-controls, shell) in `app/` folder
- ESLint rules enforcing unidirectional imports
- No barrel files

## New Folder Structure

```
src/
├── app/                          # Application layer
│   ├── App.tsx                   # Main App component
│   ├── window-controls/          # Window control infrastructure
│   │   ├── components/
│   │   │   └── drag-window-region.tsx
│   │   └── actions/
│   │       └── window.ts
│   └── shell/                    # Shell infrastructure
│       └── actions/
│           └── shell.ts
├── components/                   # Shared components
│   ├── ui/                       # shadcn primitives (unchanged)
│   ├── external-link.tsx
│   └── navigation-menu.tsx
├── features/
│   ├── home/
│   │   ├── components/
│   │   │   └── home-content.tsx  # Extracted from routes/index.tsx
│   │   └── routes/
│   │       └── home-page.tsx
│   ├── second/
│   │   ├── components/
│   │   │   └── second-content.tsx
│   │   └── routes/
│   │       └── second-page.tsx
│   └── settings/                 # NEW feature
│       ├── components/
│       │   ├── theme-toggle.tsx
│       │   └── language-toggle.tsx
│       ├── actions/
│       │   ├── theme.ts
│       │   └── language.ts
│       └── routes/
│           └── settings-page.tsx
├── ipc/                          # IPC handlers (unchanged, at root)
├── layouts/
│   └── base-layout.tsx
├── localization/                 # i18n (unchanged)
├── routes/                       # TanStack Router (THIN wrappers only)
│   ├── __root.tsx
│   ├── index.tsx                 # -> imports features/home
│   ├── second.tsx                # -> imports features/second
│   └── settings.tsx              # NEW -> imports features/settings
├── shared/
│   ├── actions/
│   │   └── app.ts
│   ├── constants/
│   │   └── index.ts
│   ├── types/
│   │   └── theme-mode.ts
│   └── utils/
│       ├── routes.ts
│       └── tailwind.ts
├── main.ts                       # Electron main (unchanged)
├── preload.ts                    # (unchanged)
└── renderer.ts                   # (unchanged)
```

## File Migration Map

| From                                | To                                                      |
| ----------------------------------- | ------------------------------------------------------- |
| `actions/theme.ts`                  | `features/settings/actions/theme.ts`                    |
| `actions/language.ts`               | `features/settings/actions/language.ts`                 |
| `actions/window.ts`                 | `app/window-controls/actions/window.ts`                 |
| `actions/shell.ts`                  | `app/shell/actions/shell.ts`                            |
| `actions/app.ts`                    | `shared/actions/app.ts`                                 |
| `components/toggle-theme.tsx`       | `features/settings/components/theme-toggle.tsx`         |
| `components/lang-toggle.tsx`        | `features/settings/components/language-toggle.tsx`      |
| `components/drag-window-region.tsx` | `app/window-controls/components/drag-window-region.tsx` |
| `constants/index.ts`                | `shared/constants/index.ts`                             |
| `types/theme-mode.ts`               | `shared/types/theme-mode.ts`                            |
| `utils/*`                           | `shared/utils/*`                                        |
| `App.tsx`                           | `app/App.tsx`                                           |

## Implementation Steps

### Phase 1: Create folder structure

1. Create `shared/` with `constants/`, `types/`, `utils/`, `actions/`
2. Create `app/window-controls/` with `components/`, `actions/`
3. Create `app/shell/actions/`
4. Create `features/home/` with `components/`, `routes/`
5. Create `features/second/` with `components/`, `routes/`
6. Create `features/settings/` with `components/`, `actions/`, `routes/`

### Phase 2: Move shared utilities

7. Move `constants/index.ts` -> `shared/constants/index.ts`
8. Move `types/theme-mode.ts` -> `shared/types/theme-mode.ts`
9. Move `utils/routes.ts` -> `shared/utils/routes.ts`
10. Move `utils/tailwind.ts` -> `shared/utils/tailwind.ts`
11. Move `actions/app.ts` -> `shared/actions/app.ts`
12. Update imports, delete empty folders

### Phase 3: Move app infrastructure

13. Move `App.tsx` -> `app/App.tsx`
14. Move `components/drag-window-region.tsx` -> `app/window-controls/components/`
15. Move `actions/window.ts` -> `app/window-controls/actions/`
16. Move `actions/shell.ts` -> `app/shell/actions/`
17. Update imports in `layouts/base-layout.tsx` and `components/external-link.tsx`
18. Update `renderer.ts` import

### Phase 4: Create settings feature

19. Move `actions/theme.ts` -> `features/settings/actions/`
20. Move `actions/language.ts` -> `features/settings/actions/`
21. Move `components/toggle-theme.tsx` -> `features/settings/components/theme-toggle.tsx`
22. Move `components/lang-toggle.tsx` -> `features/settings/components/language-toggle.tsx`
23. Create `features/settings/routes/settings-page.tsx` (new page with theme + language controls)
24. Create `routes/settings.tsx` (thin route wrapper)
25. Delete empty `actions/` folder

### Phase 5: Create home and second features

26. Extract content from `routes/index.tsx` into `features/home/`
27. Make `routes/index.tsx` thin wrapper
28. Extract content from `routes/second.tsx` into `features/second/`
29. Make `routes/second.tsx` thin wrapper

### Phase 6: Finalize app

30. Update `app/App.tsx` imports (theme/language now in features/settings)
31. Add settings link to `components/navigation-menu.tsx`

### Phase 7: ESLint boundary rules

32. Update `eslint.config.mjs` with `no-restricted-imports` rules:
    - `shared/` cannot import from features, app, routes
    - `features/` cannot import from other features or app
    - `components/` cannot import from features, app, routes

### Phase 8: Cleanup IPC barrel files

33. Remove barrel re-exports from `ipc/*/index.ts` files
34. Update `ipc/router.ts` to use direct imports
35. Fix typo: `ipc/window/hadlers.ts` -> `handlers.ts`

## Thin Route Pattern

Route files stay in `routes/` for TanStack Router but only contain:

```tsx
// routes/settings.tsx
import { createFileRoute } from "@tanstack/react-router";
import SettingsPage from "@/features/settings/routes/settings-page";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});
```

## i18n Updates Required

Add to `localization/i18n.ts`:

- `settings: "Settings"`
- `theme: "Theme"`
- `language: "Language"`

## Verification

1. Run `pnpm lint` - should pass with no boundary violations
2. Run `pnpm exec tsc --noEmit` - no type errors
3. Run `pnpm start` - app should work, all pages accessible
4. Navigate to `/settings` - should show theme and language controls
5. Run `pnpm test` - tests should pass
