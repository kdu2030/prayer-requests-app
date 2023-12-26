import { LANGUAGE_OPTIONS } from "../../../constants/languages";
import { DropdownOption } from "../../../types/inputs/dropdown";
import { TranslationKey } from "../../../types/languages";

export function getLanguageDropdownOptions(
  translate: (key: TranslationKey) => string
): DropdownOption<string>[] {
  return LANGUAGE_OPTIONS.map((languageOption) => ({
    label: `${languageOption.icon} ${translate(
      languageOption.displayOptionKey
    )}`,
    value: languageOption.value,
  }));
}
