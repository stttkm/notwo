import { Language } from "./language";

export default [
  {
    key: "en",
    nativeName: "English",
    prefix: "EN-US",
  },
  {
    key: "pt-PT",
    nativeName: "Português (Portugal)",
    prefix: "PT-PT",
  },
  {
    key: "es-ES",
    nativeName: "Español (España)",
    prefix: "ES-ES",
  },
] as const satisfies Language[];
