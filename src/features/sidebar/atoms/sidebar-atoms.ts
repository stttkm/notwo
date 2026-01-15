import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
  type SidebarState,
  type SidebarPosition,
  DEFAULT_SIDEBAR_STATE,
  MIN_SIDEBAR_WIDTH,
  MAX_SIDEBAR_WIDTH,
  sidebarStateSchema,
} from "../types/sidebar";
import { createCustomStorage } from "@/shared/utils/custom-storage";

const STORAGE_KEY = "notwo-sidebar-state";

/**
 * Main atom storing sidebar state, persisted to localStorage
 */
export const sidebarStateAtom = atomWithStorage<SidebarState>(
  STORAGE_KEY,
  DEFAULT_SIDEBAR_STATE,
  createCustomStorage(sidebarStateSchema),
);

/**
 * Atom to check if left sidebar is open
 */
export const leftSidebarOpenAtom = atom(
  (get) => get(sidebarStateAtom).left.isOpen,
);

/**
 * Atom to check if right sidebar is open
 */
export const rightSidebarOpenAtom = atom(
  (get) => get(sidebarStateAtom).right.isOpen,
);

/**
 * Atom to get left sidebar width
 */
export const leftSidebarWidthAtom = atom(
  (get) => get(sidebarStateAtom).left.width,
);

/**
 * Atom to get right sidebar width
 */
export const rightSidebarWidthAtom = atom(
  (get) => get(sidebarStateAtom).right.width,
);

/**
 * Atom to toggle a sidebar
 */
export const toggleSidebarAtom = atom(
  null,
  (get, set, position: SidebarPosition) => {
    const current = get(sidebarStateAtom);
    set(sidebarStateAtom, {
      ...current,
      [position]: {
        ...current[position],
        isOpen: !current[position].isOpen,
      },
    });
  },
);

/**
 * Atom to set sidebar width
 */
export const setSidebarWidthAtom = atom(
  null,
  (get, set, payload: { position: SidebarPosition; width: number }) => {
    const { position, width } = payload;
    const clampedWidth = Math.min(
      MAX_SIDEBAR_WIDTH,
      Math.max(MIN_SIDEBAR_WIDTH, width),
    );
    const current = get(sidebarStateAtom);
    set(sidebarStateAtom, {
      ...current,
      [position]: {
        ...current[position],
        width: clampedWidth,
      },
    });
  },
);

/**
 * Atom to open a sidebar
 */
export const openSidebarAtom = atom(
  null,
  (get, set, position: SidebarPosition) => {
    const current = get(sidebarStateAtom);
    set(sidebarStateAtom, {
      ...current,
      [position]: {
        ...current[position],
        isOpen: true,
      },
    });
  },
);

/**
 * Atom to close a sidebar
 */
export const closeSidebarAtom = atom(
  null,
  (get, set, position: SidebarPosition) => {
    const current = get(sidebarStateAtom);
    set(sidebarStateAtom, {
      ...current,
      [position]: {
        ...current[position],
        isOpen: false,
      },
    });
  },
);
