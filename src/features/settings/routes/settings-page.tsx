import { AccentColorSetting } from "@/features/settings/components/accent-color-setting";
import { BaseColorSetting } from "@/features/settings/components/base-color-setting";
import { LanguageSetting } from "@/features/settings/components/language-setting";
import NavigationMenu from "@/components/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { ShortcutSettings } from "@/features/shortcuts/components/shortcut-settings";
import { SidebarColorSetting } from "@/features/settings/components/sidebar-color-setting";
import { ThemeSetting } from "@/features/settings/components/theme-setting";
import { useTranslation } from "react-i18next";

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
              <ThemeSetting />
              <LanguageSetting />
              <AccentColorSetting />
              <BaseColorSetting />
              <SidebarColorSetting />
            </div>
          </div>

          <Separator />

          <ShortcutSettings />
        </div>
      </div>
    </>
  );
}
