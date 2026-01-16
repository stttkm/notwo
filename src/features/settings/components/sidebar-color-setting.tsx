import { SidebarColorPicker } from "./sidebar-color-picker";
import { useTranslation } from "react-i18next";

export function SidebarColorSetting() {
  const { t } = useTranslation();

  return (
    <div className="space-y-2 rounded-lg border p-3">
      <span className="text-sm font-medium">{t("sidebarColor")}</span>
      <SidebarColorPicker />
    </div>
  );
}
