import { BaseColorPicker } from "./base-color-picker";
import { useTranslation } from "react-i18next";

export function BaseColorSetting() {
  const { t } = useTranslation();

  return (
    <div className="space-y-2 rounded-lg border p-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{t("baseColor")}</span>
        <span className="text-muted-foreground text-xs">
          ({t("darkModeOnly")})
        </span>
      </div>
      <BaseColorPicker />
    </div>
  );
}
