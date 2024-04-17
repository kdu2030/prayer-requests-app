import {
  CanExpireValue,
  PrayerRequestVisibility,
} from "../../types/forms/create-prayer-request-form";
import { SelectOption } from "../../types/inputs/select";
import { TranslationKey } from "../../types/languages";

export const getOptionsForVisibilityDropdown = (
  translate: (key: TranslationKey) => string
): SelectOption<PrayerRequestVisibility>[] => {
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

export const getOptionsForExpireRadioButtons = (
  translate: (key: TranslationKey) => string
): SelectOption<CanExpireValue>[] => {
  return [
    {
      label: translate("createPrayerRequest.canExpire.yes.option"),
      value: CanExpireValue.Yes,
    },
    {
      label: translate("createPrayerRequest.canExpire.no.option"),
      value: CanExpireValue.No,
    },
  ];
};
