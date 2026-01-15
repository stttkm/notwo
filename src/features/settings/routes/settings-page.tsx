import { useTranslation } from "react-i18next";
import NavigationMenu from "@/components/navigation-menu";
import ThemeToggle from "@/features/settings/components/theme-toggle";
import LanguageToggle from "@/features/settings/components/language-toggle";
import { ShortcutSettings } from "@/features/shortcuts/components/shortcut-settings";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <>
      <NavigationMenu />
      <div className="mx-auto max-w-2xl space-y-8 p-8">
        <h1 className="text-4xl font-bold">{t("settings")}</h1>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t("appearance")}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-8 rounded-lg border p-3">
                <span className="text-sm font-medium">{t("theme")}</span>
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-between gap-8 rounded-lg border p-3">
                <span className="text-sm font-medium">{t("language")}</span>
                <LanguageToggle />
              </div>
            </div>
          </div>

          <Separator />

          <ShortcutSettings />
        </div>
      </div>
    </>
  );
}
