import "@/localization/i18n";

import React, { useEffect } from "react";

import { RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { router } from "@/shared/utils/routes";
import { syncWithLocalTheme } from "@/features/settings/actions/theme";
import { updateAppLanguage } from "@/features/settings/actions/language";
import { useThemeColors } from "@/features/settings/hooks/use-theme-colors";
import { useTranslation } from "react-i18next";
import { useSetAtom } from "jotai";
import { initPlatformAtom } from "@/shared/atoms/platform-atom";

export default function App() {
  const { i18n } = useTranslation();
  const initPlatform = useSetAtom(initPlatformAtom);

  useThemeColors();

  useEffect(() => {
    syncWithLocalTheme();
    updateAppLanguage(i18n);
    initPlatform();
  }, [i18n, initPlatform]);

  return <RouterProvider router={router} />;
}

const root = createRoot(document.getElementById("app")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
