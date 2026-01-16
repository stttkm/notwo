import { AccentColorPicker } from "./accent-color-picker";
import { useTranslation } from "react-i18next";

export function AccentColorSetting() {
  const { t } = useTranslation();

  return (
    <div className="space-y-2 rounded-lg border p-3">
      <span className="text-sm font-medium">{t("accentColor")}</span>
      <AccentColorPicker />
    </div>
  );
}
