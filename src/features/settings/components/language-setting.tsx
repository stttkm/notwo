import LanguageToggle from "./language-toggle";
import { useTranslation } from "react-i18next";

export function LanguageSetting() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between gap-8 rounded-lg border p-3">
      <span className="text-sm font-medium">{t("language")}</span>
      <LanguageToggle />
    </div>
  );
}
