import "@/localization/i18n";

import React, { useEffect } from "react";

import { RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { router } from "@/shared/utils/routes";
import { syncWithLocalTheme } from "@/features/settings/actions/theme";
import { updateAppLanguage } from "@/features/settings/actions/language";
import { useTranslation } from "react-i18next";

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    syncWithLocalTheme();
    updateAppLanguage(i18n);
  }, [i18n]);

  return <RouterProvider router={router} />;
}

const root = createRoot(document.getElementById("app")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
