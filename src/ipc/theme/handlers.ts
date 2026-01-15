import { nativeTheme } from "electron";
import { os } from "@orpc/server";
import { setThemeModeInputSchema } from "./schemas";

export const getCurrentThemeMode = os.handler(() => nativeTheme.themeSource);

export const toggleThemeMode = os.handler(() => {
  const theme = nativeTheme.shouldUseDarkColors ? "light" : "dark";
  nativeTheme.themeSource = theme;
  return nativeTheme.shouldUseDarkColors;
});

export const setThemeMode = os
  .input(setThemeModeInputSchema)
  .handler(({ input: mode }) => {
    switch (mode) {
      case "light":
        nativeTheme.themeSource = "light";
        break;
      case "dark":
        nativeTheme.themeSource = "dark";
        break;
      case "system":
        nativeTheme.themeSource = "system";
        break;
      // TODO assert never
    }

    return nativeTheme.themeSource;
  });
