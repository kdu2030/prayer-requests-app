import { englishTranslations } from "../../../i18n/en-us";
import { mockUserData } from "../../prayer-group/tests/mock-data";
import { PrayerRequestPage } from "../prayer-request-page";

jest.mock("../../../hooks/use-api-data", () => ({
  useApiDataContext: () => {
    return {
      userData: mockUserData,
    };
  },
}));

jest.mock("../../../hooks/use-i18n", () => ({
  useI18N: () => {
    return {
      translate: (key: keyof typeof englishTranslations) => {
        return englishTranslations[key];
      },
    };
  },
}));

jest.mock("../../toasters/toaster-context");

describe(PrayerRequestPage, () => {});
