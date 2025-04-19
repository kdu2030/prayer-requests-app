import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

import { CULTURE_CODES, LANGUAGE_STORAGE_KEY } from "../constants/languages";
import {
  BaseManagedErrorResponse,
  ManagedErrorResponse,
} from "../types/error-handling";
import { TranslationKey } from "../types/languages";
import { CultureCode } from "../types/languages";

export const useI18N = () => {
  const resources = useTranslation();

  const loadLanguage = async (): Promise<ManagedErrorResponse<CultureCode>> => {
    try {
      const language = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (!CULTURE_CODES.includes(language as CultureCode)) {
        throw new Error("Unsupported language");
      }

      if (language) {
        resources.i18n.changeLanguage(language);
      }
      return {
        isError: false,
        value: language as CultureCode,
      };
    } catch (error) {
      return { isError: true, error };
    }
  };

  const translate = (key: TranslationKey, options?: any): string => {
    // This wrapper is for typing purposes
    return resources.t(key, options) as string;
  };

  const setLanguage = async (language: CultureCode) => {
    await resources.i18n.changeLanguage(language);
  };

  const storeLanguage = async (
    language: CultureCode
  ): Promise<BaseManagedErrorResponse> => {
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
