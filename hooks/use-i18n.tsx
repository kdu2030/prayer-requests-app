import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

import { LANGUAGE_STORAGE_KEY } from "../constants/languages";
import { ManagedErrorResponse } from "../types/error-handling";
import { TranslationKey } from "../types/languages";
import { SupportedLanguages } from "../types/languages";

export const useI18N = () => {
  const resources = useTranslation();

  const loadLanguage = async (): Promise<
    ManagedErrorResponse<SupportedLanguages>
  > => {
    try {
      const language = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (language) {
        resources.i18n.changeLanguage(language);
      }
      return {
        isError: false,
        value: language as SupportedLanguages | undefined,
      };
    } catch (error) {
      return { isError: true, error };
    }
  };

  const translate = (key: TranslationKey, options?: any): string => {
    // This wrapper is for typing purposes
    return resources.t(key, options) as string;
  };

  const setLanguage = async (language: SupportedLanguages) => {
    await resources.i18n.changeLanguage(language);
  };

  const storeLanguage = async (
    language: SupportedLanguages
  ): Promise<ManagedErrorResponse<undefined>> => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      return { isError: false };
    } catch (error) {
      return { isError: true, error };
    }
  };

  return {
    ...resources,
    loadLanguage,
    storeLanguage,
    setLanguage,
    translate,
  };
};
