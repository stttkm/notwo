import { z } from "zod";

export const sidebarPositionSchema = z.enum(["left", "right"]);
export type SidebarPosition = z.infer<typeof sidebarPositionSchema>;

export const sidebarPanelStateSchema = z.object({
  isOpen: z.boolean(),
  width: z.number().min(200).max(500),
});
export type SidebarPanelState = z.infer<typeof sidebarPanelStateSchema>;

export const sidebarStateSchema = z.object({
  left: sidebarPanelStateSchema,
  right: sidebarPanelStateSchema,
});
export type SidebarState = z.infer<typeof sidebarStateSchema>;

export const DEFAULT_SIDEBAR_WIDTH = 280;
export const MIN_SIDEBAR_WIDTH = 200;
export const MAX_SIDEBAR_WIDTH = 500;

export const DEFAULT_SIDEBAR_STATE: SidebarState = {
  left: {
    isOpen: false,
    width: DEFAULT_SIDEBAR_WIDTH,
  },
  right: {
    isOpen: false,
    width: DEFAULT_SIDEBAR_WIDTH,
  },
};
