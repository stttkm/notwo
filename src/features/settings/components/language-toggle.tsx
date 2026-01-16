import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import langs from "@/localization/langs";
import { useTranslation } from "react-i18next";
import { setAppLanguage } from "@/features/settings/actions/language";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  function onValueChange(value: string) {
    setAppLanguage(value, i18n);
  }

  return (
    <Select value={currentLang} onValueChange={onValueChange}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {langs.map((lang) => (
          <SelectItem key={lang.key} value={lang.key}>
            {lang.nativeName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
