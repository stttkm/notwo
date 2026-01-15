import { useTranslation } from "react-i18next";
import { SiElectron, SiReact, SiVite } from "@icons-pack/react-simple-icons";
import { getAppVersion } from "@/shared/actions/app";
import { useEffect, useState, useTransition } from "react";
import ExternalLink from "@/components/external-link";

export default function HomeContent() {
  const iconSize = 48;

  const [appVersion, setAppVersion] = useState("0.0.0");
  const [, startGetAppVersion] = useTransition();
  const { t } = useTranslation();

  useEffect(
    () => startGetAppVersion(() => getAppVersion().then(setAppVersion)),
    [],
  );

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex flex-col items-end justify-center gap-0.5">
        <div className="inline-flex gap-2">
          <SiReact size={iconSize} />
          <SiVite size={iconSize} />
          <SiElectron size={iconSize} />
        </div>
        <span className="flex items-end justify-end">
          <h1 className="font-mono text-4xl font-bold">{t("appName")}</h1>
          <p className="text-muted-foreground text-sm">v{appVersion}</p>
        </span>
        <ExternalLink
          href="https://github.com/LuanRoger"
          className="text-muted-foreground text-sm"
        >
          {t("madeBy")}
        </ExternalLink>
      </div>
    </div>
  );
}
