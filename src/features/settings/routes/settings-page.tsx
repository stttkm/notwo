import { useTranslation } from "react-i18next";
import NavigationMenu from "@/components/navigation-menu";
import ThemeToggle from "@/features/settings/components/theme-toggle";
import LanguageToggle from "@/features/settings/components/language-toggle";

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <>
      <NavigationMenu />
      <div className="flex h-full flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold">{t("settings")}</h1>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-8">
            <span>{t("theme")}</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between gap-8">
            <span>{t("language")}</span>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </>
  );
}
