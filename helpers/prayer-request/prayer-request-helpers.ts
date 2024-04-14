import { PrayerRequestVisibility } from "../../types/forms/create-prayer-request-form";
import { DropdownOption } from "../../types/inputs/dropdown";
import { TranslationKey } from "../../types/languages";

export const getOptionsForVisibilityDropdown = (
  translate: (key: TranslationKey) => string
): DropdownOption<PrayerRequestVisibility>[] => {
  return [
    {
      label: translate("createPrayerRequest.private.label"),
      value: PrayerRequestVisibility.Private,
    },
    {
      label: translate("createPrayerRequest.friendsOnly.label"),
      value: PrayerRequestVisibility.FriendsOnly,
    },
    {
      label: translate("createPrayerRequest.groupOnly.label"),
      value: PrayerRequestVisibility.GroupOnly,
    },
    {
      label: translate("createPrayerRequest.public.label"),
      value: PrayerRequestVisibility.Public,
    },
  ];
};
