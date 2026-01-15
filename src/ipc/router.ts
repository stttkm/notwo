import {
  getCurrentThemeMode,
  setThemeMode,
  toggleThemeMode,
} from "./theme/handlers";
import {
  closeWindow,
  maximizeWindow,
  minimizeWindow,
} from "./window/handlers";
import { currentPlatfom, appVersion } from "./app/handlers";
import { openExternalLink } from "./shell/handlers";

export const router = {
  theme: {
    getCurrentThemeMode,
    setThemeMode,
    toggleThemeMode,
  },
  window: {
    minimizeWindow,
    maximizeWindow,
    closeWindow,
  },
  app: {
    currentPlatfom,
    appVersion,
  },
  shell: {
    openExternalLink,
  },
};
