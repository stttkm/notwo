import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        appName: "Notwo",
        titleHomePage: "Home Page",
        titleSecondPage: "Second Page",
        titleSettingsPage: "Settings",
        documentation: "Documentation",
        madeBy: "Made by Krzysztof Mitko",
        settings: "Settings",
        theme: "Theme",
        language: "Language",
      },
    },
    "pt-PT": {
      translation: {
        appName: "Noto",
        titleHomePage: "Página Inicial",
        titleSecondPage: "Segunda Página",
        titleSettingsPage: "Definições",
        documentation: "Documentação",
        madeBy: "Feito por Krzysztof Mitko",
        settings: "Definições",
        theme: "Tema",
        language: "Idioma",
      },
    },
    "es-ES": {
      translation: {
        appName: "Notu",
        titleHomePage: "Página Inicial",
        titleSecondPage: "Segunda Página",
        titleSettingsPage: "Configuración",
        documentation: "Documentación",
        madeBy: "Hecho por Krzysztof Mitko",
        settings: "Configuración",
        theme: "Tema",
        language: "Idioma",
      },
    },
  },
});
