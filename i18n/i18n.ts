import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { CultureCode } from "../types/languages";
import { englishTranslations } from "./en-us";
import { chineseTranslations } from "./zh-cn";

const resources = {
  [CultureCode.enUS]: {
    translation: {
      ...englishTranslations,
    },
  },
  [CultureCode.zhCN]: {
    translation: {
      ...chineseTranslations,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: CultureCode.enUS,
  compatibilityJSON: "v3",
  keySeparator: false,
  interpolation: { escapeValue: false },
});

export default i18n;
