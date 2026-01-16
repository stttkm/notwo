import {
  FileText,
  Home,
  PanelLeft,
  PanelRight,
  Settings,
  Sun,
} from "lucide-react";
import { useAtom, useSetAtom } from "jotai";

import type { Command } from "../types/command";
import { ROUTES } from "@/shared/constants/routes";
import { shortcutsAtom } from "@/features/shortcuts/atoms/shortcut-atoms";
import { toggleSidebarAtom } from "@/features/sidebar/atoms/sidebar-atoms";
import { toggleTheme } from "@/features/settings/actions/theme";
import { useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function useCommands() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toggleSidebar = useSetAtom(toggleSidebarAtom);
  const [shortcuts] = useAtom(shortcutsAtom);

  const commands: Command[] = useMemo(
    () => [
      {
        id: "navigate-home",
        label: t("titleHomePage"),
        category: "Navigation",
        icon: <Home className="mr-2 h-4 w-4" />,
        action: () => navigate({ to: ROUTES.HOME }),
      },
      {
        id: "navigate-second",
        label: t("titleSecondPage"),
        category: "Navigation",
        icon: <FileText className="mr-2 h-4 w-4" />,
        action: () => navigate({ to: ROUTES.SECOND }),
      },
      {
        id: "navigate-settings",
        label: t("settings"),
        category: "Navigation",
        icon: <Settings className="mr-2 h-4 w-4" />,
        shortcut: shortcuts["open-settings"],
        action: () => navigate({ to: ROUTES.SETTINGS }),
      },
      {
        id: "toggle-left-sidebar",
        label: "Toggle Left Sidebar",
        category: "Sidebar",
        icon: <PanelLeft className="mr-2 h-4 w-4" />,
        shortcut: shortcuts["toggle-left-sidebar"],
        action: () => toggleSidebar("left"),
      },
      {
        id: "toggle-right-sidebar",
        label: "Toggle Right Sidebar",
        category: "Sidebar",
        icon: <PanelRight className="mr-2 h-4 w-4" />,
        shortcut: shortcuts["toggle-right-sidebar"],
        action: () => toggleSidebar("right"),
      },
      {
        id: "toggle-theme",
        label: t("theme"),
        category: "Settings",
        icon: <Sun className="mr-2 h-4 w-4" />,
        action: () => toggleTheme(),
      },
    ],
    [t, navigate, toggleSidebar, shortcuts],
  );

  const groupedCommands = useMemo(() => {
    const groups: Record<string, Command[]> = {};
    for (const command of commands) {
      const category = command.category ?? "General";
      if (!groups[category]) groups[category] = [];
      groups[category].push(command);
    }
    return groups;
  }, [commands]);

  return { commands, groupedCommands };
}
