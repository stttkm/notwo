# Zen Browser-Style UI Implementation Plan

## Original User Input

> Ok, now my vision is that we have two sidebars:
>
> 1. One is on the left
> 2. The other is on the right
>    Both of them are of type inset because yeah, I like it. I just want to look like the Zen browser where it looks like the first layer (the most bottom layer) is just a solid color, like blue, and then the layer above it is the page I am currently on.
>    When I toggle open a sidebar, it looks like the layer of my page I am on sort of moves to the right, but it also shrinks. Yeah, to be right, it just shrinks, and when it moves to the right, I can see the sidebar, and the sidebar looks like part of the layer zero.
>    Generally speaking, when both sidebars are closed, it should look like there's a ring around the main content. Yeah, yes, and when I open a sidebar, then it should look like the main content sort of shrank, decreased in size, and it uncovered the sidebar content.
>
> Let me attach some screenshots.
>
> plans/closed sidebars.jpeg
> plans/open sidebar.jpeg
>
> Ok now we have a settings page and in the settings page let's make a keyboard shortcut page like a section. There will be:
>
> - Toggle open left sidebar shortcut
> - Toggle open closed right sidebar shortcut
>   The input there will be interactive, meaning that I can click this input and then I make a combination of shortcuts that will be the shortcut I will use. I think this is quite complex to be frank, but it must have been explored many times in the past, so I think you could search the web and see some references for this kind of problem.
>   Additionally, I want to have when I click Command K I want to see a prompt. I mean, I want to see the search utility modal. It will be empty for now, but let's just have it and remember use Shadcn and Shadcn is great. Also, never ever silence TypeScript or ESLint - don't you ever use any casts or disable ESLint comments or TypeScript ignore this will not fly in this codebase.

## Additional Requirements (from follow-up)

- Shortcuts must persist to localStorage
- Centralized shortcut configuration system (single source of truth)
- Default shortcuts:
  - `Cmd+Option+Ctrl+S` - Toggle left sidebar
  - `Cmd+Option+Ctrl+K` - Toggle right sidebar
  - `Cmd+K` - Open command palette
- Sidebars should be resizable via drag
- Command palette should be VS Code style (keyboard navigation, categories)
- Sidebars have placeholder content initially

## Reference Screenshots

- `plans/closed sidebars.jpeg` - Shows the Zen browser with sidebars closed: rounded main content with visible border/ring around it
- `plans/open sidebar.jpeg` - Shows left sidebar open: main content shrunk, sidebar revealed on the left as part of the background layer

---

## Visual Design Specification

### Layer Architecture

```
Layer 0 (Background):  Solid color (dark blue/navy)
                       Contains: sidebars, ring/border effect

Layer 1 (Content):     Main page content
                       Floating card with rounded corners
                       Animates size/position when sidebars toggle
```

### States

1. **Both sidebars closed**: Main content has visible ring/padding around all edges
2. **Left sidebar open**: Main content shrinks horizontally, shifts right to reveal left sidebar
3. **Right sidebar open**: Main content shrinks horizontally, shifts left to reveal right sidebar
4. **Both sidebars open**: Main content shrinks from both sides

### Animation

- Smooth transition when toggling sidebars
- Content shrinks/expands with easing
- Sidebar content fades in/out or slides

---

## Implementation Plan

### Phase 1: Core Infrastructure - Shortcut System

#### 1.1 Create shortcut types and schemas

```
src/features/shortcuts/
  types/
    shortcut.ts         # ShortcutId, ShortcutConfig, KeyCombination types
  schemas/
    shortcut-schema.ts  # Zod schemas for validation
```

**Types to define:**

```typescript
type ModifierKey = "ctrl" | "alt" | "shift" | "meta";
type ShortcutId = "toggle-left-sidebar" | "toggle-right-sidebar" | "open-command-palette";

interface KeyCombination {
  key: string; // e.g., "s", "k", "Enter"
  modifiers: ModifierKey[];
}

interface ShortcutConfig {
  id: ShortcutId;
  label: string;
  combination: KeyCombination;
}
```

#### 1.2 Create shortcut store

```
src/features/shortcuts/
  stores/
    shortcut-store.ts   # Zustand store for shortcut state
  utils/
    shortcut-utils.ts   # Parse, serialize, compare shortcuts
    shortcut-storage.ts # localStorage read/write
```

**Store responsibilities:**

- Load shortcuts from localStorage on init
- Provide defaults if no saved config
- Save to localStorage on change
- Expose methods: `getShortcut(id)`, `setShortcut(id, combination)`, `resetToDefaults()`

**Default shortcuts:**

| ID                     | Label                | Default Combination        |
| ---------------------- | -------------------- | -------------------------- |
| `toggle-left-sidebar`  | Toggle Left Sidebar  | `Cmd+Option+Ctrl+S`        |
| `toggle-right-sidebar` | Toggle Right Sidebar | `Cmd+Option+Ctrl+K`        |
| `open-command-palette` | Open Command Palette | `Cmd+K`                    |

#### 1.3 Create global shortcut listener

```
src/features/shortcuts/
  hooks/
    use-global-shortcuts.ts  # Hook to register/handle global shortcuts
```

**Implementation:**

- Listen to `keydown` events on `document`
- Match against registered shortcuts
- Execute corresponding action
- Prevent default for matched shortcuts

### Phase 2: Sidebar Layout System

#### 2.1 Create sidebar state store

```
src/features/sidebar/
  stores/
    sidebar-store.ts    # Zustand store for sidebar state
  types/
    sidebar.ts          # SidebarPosition, SidebarState types
```

**State shape:**

```typescript
interface SidebarState {
  left: {
    isOpen: boolean;
    width: number; // in pixels, user-resizable
  };
  right: {
    isOpen: boolean;
    width: number;
  };
}
```

**Default widths:** 280px (adjustable)
**Min width:** 200px
**Max width:** 400px

#### 2.2 Create Zen-style layout components

```
src/features/sidebar/
  components/
    zen-layout.tsx           # Main wrapper with layer architecture
    sidebar-panel.tsx        # Individual sidebar panel
    sidebar-resizer.tsx      # Drag handle for resizing
    sidebar-content.tsx      # Placeholder content wrapper
```

**ZenLayout structure:**

```tsx
<div className="zen-layer-0"> {/* Solid background color */}
  <SidebarPanel position="left" />
  <div className="zen-layer-1"> {/* Main content card */}
    <Outlet /> {/* Router content */}
  </div>
  <SidebarPanel position="right" />
</div>
```

#### 2.3 Implement resize functionality

- `SidebarResizer` component with drag handle
- Mouse events: `onMouseDown`, `onMouseMove`, `onMouseUp`
- Constrain to min/max widths
- Persist width to store (and localStorage)

#### 2.4 CSS/Styling

- Layer 0: `bg-sidebar` or custom blue color (CSS variable)
- Layer 1: `bg-background` with `rounded-lg` and padding
- Transitions: `transition-all duration-300 ease-in-out`
- Ring effect when sidebars closed: padding on layer-1 container

### Phase 3: Settings Page - Keyboard Shortcuts Section

#### 3.1 Create shortcut recorder component

```
src/features/shortcuts/
  components/
    shortcut-recorder.tsx    # Interactive input for recording shortcuts
    shortcut-display.tsx     # Display formatted shortcut (Cmd+K style)
    shortcut-settings.tsx    # Settings section with all shortcuts
```

**ShortcutRecorder behavior:**

1. Click to activate recording mode
2. Visual feedback (focus ring, "Press keys..." text)
3. Listen for keydown, capture modifiers + key
4. Display live preview of combination
5. Press Enter to confirm, Escape to cancel
6. Validate: must have at least one modifier for non-function keys
7. Conflict detection: warn if shortcut already used

#### 3.2 Update settings page

```
src/features/settings/
  routes/
    settings-page.tsx        # Add keyboard shortcuts section
```

**Layout:**

```
Settings
├── Theme
├── Language
└── Keyboard Shortcuts (NEW)
    ├── Toggle Left Sidebar    [Cmd+Option+Ctrl+S] [Reset]
    ├── Toggle Right Sidebar   [Cmd+Option+Ctrl+K] [Reset]
    └── Open Command Palette   [Cmd+K]             [Reset]
```

### Phase 4: Command Palette

#### 4.1 Create command palette components

```
src/features/command-palette/
  components/
    command-palette.tsx      # Main dialog component
    command-input.tsx        # Search input
    command-list.tsx         # Results list with keyboard nav
    command-item.tsx         # Individual command item
  types/
    command.ts               # Command type definitions
  stores/
    command-palette-store.ts # Open/close state, search query
  hooks/
    use-command-palette.ts   # Hook for registering commands
```

**Command type:**

```typescript
interface Command {
  id: string;
  label: string;
  category?: string; // "Navigation", "Settings", etc.
  shortcut?: KeyCombination;
  icon?: ReactNode;
  action: () => void;
}
```

#### 4.2 Use shadcn/ui components

- Use `Dialog` for the modal
- Use `Command` component from cmdk (shadcn has this) for search/list
- Keyboard navigation: arrow keys, Enter to select, Escape to close

#### 4.3 Register initial commands

- Navigate to Home
- Navigate to Second Page
- Navigate to Settings
- Toggle Left Sidebar
- Toggle Right Sidebar
- Toggle Theme

### Phase 5: Integration & Layout Update

#### 5.1 Update base layout

```
src/layouts/
  base-layout.tsx           # Integrate ZenLayout
```

Replace current layout structure with ZenLayout wrapper.

#### 5.2 Wire up shortcuts to actions

- `toggle-left-sidebar` -> `sidebarStore.toggleLeft()`
- `toggle-right-sidebar` -> `sidebarStore.toggleRight()`
- `open-command-palette` -> `commandPaletteStore.open()`

#### 5.3 Add sidebar toggle buttons to UI

- Add toggle buttons in header/navigation for non-keyboard users
- Icons: `PanelLeft`, `PanelRight` from lucide-react

### Phase 6: i18n Updates

Add translations for:

```typescript
{
  keyboardShortcuts: "Keyboard Shortcuts",
  toggleLeftSidebar: "Toggle Left Sidebar",
  toggleRightSidebar: "Toggle Right Sidebar",
  openCommandPalette: "Open Command Palette",
  pressKeys: "Press keys...",
  reset: "Reset",
  commandPalette: "Command Palette",
  searchCommands: "Search commands...",
  noResults: "No results found",
}
```

---

## File Structure Summary

```
src/
├── features/
│   ├── shortcuts/
│   │   ├── components/
│   │   │   ├── shortcut-recorder.tsx
│   │   │   ├── shortcut-display.tsx
│   │   │   └── shortcut-settings.tsx
│   │   ├── hooks/
│   │   │   └── use-global-shortcuts.ts
│   │   ├── stores/
│   │   │   └── shortcut-store.ts
│   │   ├── types/
│   │   │   └── shortcut.ts
│   │   ├── schemas/
│   │   │   └── shortcut-schema.ts
│   │   └── utils/
│   │       ├── shortcut-utils.ts
│   │       └── shortcut-storage.ts
│   ├── sidebar/
│   │   ├── components/
│   │   │   ├── zen-layout.tsx
│   │   │   ├── sidebar-panel.tsx
│   │   │   ├── sidebar-resizer.tsx
│   │   │   └── sidebar-content.tsx
│   │   ├── stores/
│   │   │   └── sidebar-store.ts
│   │   └── types/
│   │       └── sidebar.ts
│   ├── command-palette/
│   │   ├── components/
│   │   │   ├── command-palette.tsx
│   │   │   ├── command-input.tsx
│   │   │   ├── command-list.tsx
│   │   │   └── command-item.tsx
│   │   ├── hooks/
│   │   │   └── use-command-palette.ts
│   │   ├── stores/
│   │   │   └── command-palette-store.ts
│   │   └── types/
│   │       └── command.ts
│   └── settings/
│       └── routes/
│           └── settings-page.tsx  # Update to include shortcuts section
└── layouts/
    └── base-layout.tsx            # Update to use ZenLayout
```

---

## Dependencies to Add

```bash
pnpm add zustand                    # State management for stores
pnpm add zod                        # Schema validation (if not present)
pnpm dlx shadcn@latest add command  # Command palette component (cmdk)
pnpm dlx shadcn@latest add dialog   # Dialog for command palette
```

---

## Implementation Order

1. **Phase 1.1-1.2**: Shortcut types, schemas, store (foundation)
2. **Phase 2.1**: Sidebar state store
3. **Phase 2.2-2.4**: ZenLayout and sidebar components
4. **Phase 5.1**: Integrate ZenLayout into base-layout
5. **Phase 1.3**: Global shortcut listener
6. **Phase 5.2**: Wire shortcuts to sidebar actions
7. **Phase 3**: Settings page shortcut recorder
8. **Phase 4**: Command palette
9. **Phase 6**: i18n updates
10. **Phase 5.3**: UI toggle buttons

---

## Quality Checklist

- [ ] No TypeScript `as` casts or `@ts-ignore` comments
- [ ] No ESLint disable comments
- [ ] All components use proper TypeScript types
- [ ] Zod schemas for runtime validation where needed
- [ ] Proper error boundaries for user input
- [ ] Accessible keyboard navigation
- [ ] Smooth animations (60fps)
- [ ] Responsive to window resize
- [ ] Persisted state survives app restart

---

## Verification Steps

1. `pnpm lint` - No errors
2. `pnpm exec tsc --noEmit` - No type errors
3. `pnpm test` - All tests pass
4. Manual testing:
   - [ ] Sidebars toggle with keyboard shortcuts
   - [ ] Sidebars toggle with UI buttons
   - [ ] Sidebar width is resizable via drag
   - [ ] Sidebar state persists across page navigation
   - [ ] Shortcut recorder captures key combinations
   - [ ] Shortcuts can be customized in settings
   - [ ] Custom shortcuts persist across app restart
   - [ ] Command palette opens with Cmd+K
   - [ ] Command palette has keyboard navigation
   - [ ] Zen-style visual effect works (layer 0/1 separation)
