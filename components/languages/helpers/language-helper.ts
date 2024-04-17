import { LANGUAGE_OPTIONS } from "../../../constants/languages";
import { SelectOption } from "../../../types/inputs/select";
import { TranslationKey } from "../../../types/languages";

export function getLanguageDropdownOptions(
  translate: (key: TranslationKey) => string
): SelectOption<string>[] {
  return LANGUAGE_OPTIONS.map((languageOption) => ({
    label: `${languageOption.icon} ${translate(
      languageOption.displayOptionKey
    )}`,
    value: languageOption.value,
  }));
}
