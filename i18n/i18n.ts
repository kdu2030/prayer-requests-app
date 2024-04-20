import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { englishTranslations } from "./en-us";
import { chineseTranslations } from "./zh-cn";

const resources = {
  en: {
    translation: {
      ...englishTranslations,
    },
  },
  zh: {
    translation: {
      ...chineseTranslations,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  compatibilityJSON: "v3",
  keySeparator: false,
  interpolation: { escapeValue: false },
});

export default i18n;
