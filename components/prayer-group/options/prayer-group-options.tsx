import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import * as React from "react";
import { View } from "react-native";

import { PrayerGroupRole } from "../../../constants/prayer-group-constants";
import { useI18N } from "../../../hooks/use-i18n";
import { PrayerGroupDetails } from "../../../types/prayer-group-types";
import { AppBottomSheet } from "../../layouts/app-bottom-sheet";
import { PrayerGroupOptionButton } from "./prayer-group-option-button";
import { PrayerGroupOptionsTestIds } from "./tests/test-ids";

type Props = {
  prayerGroupDetails?: PrayerGroupDetails;
  isOptionsOpen: boolean;
  setIsOptionsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSortingOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PrayerGroupOptions: React.FC<Props> = ({
  prayerGroupDetails,
  isOptionsOpen,
  setIsOptionsOpen,
  setIsSortingOpen,
}) => {
  const { translate } = useI18N();
  const isAdmin = prayerGroupDetails?.userRole === PrayerGroupRole.Admin;

  const onPressOption = (route: string) => {
    prayerGroupDetails?.prayerGroupId &&
      router.push({
        pathname: route,
        params: { id: prayerGroupDetails?.prayerGroupId },
      } as Href<any>);
  };

  return (
    <AppBottomSheet
      snapPoints={["50%"]}
      isOpen={isOptionsOpen}
      setIsOpen={setIsOptionsOpen}
    >
      <View className="px-4">
        <PrayerGroupOptionButton
          label={translate("prayerGroup.options.about")}
          icon={<MaterialCommunityIcons name="information" size={24} />}
          onPress={() => onPressOption("/(drawer)/prayergroup/[id]/about")}
          testID={PrayerGroupOptionsTestIds.aboutButton}
        />

        {isAdmin && (
          <>
            <PrayerGroupOptionButton
              label={translate("prayerGroup.options.editPrayerGroup")}
              icon={<MaterialCommunityIcons name="pencil" size={24} />}
              onPress={() => onPressOption("/(drawer)/prayergroup/[id]/edit")}
              testID={PrayerGroupOptionsTestIds.editButton}
            />

            <PrayerGroupOptionButton
              label={translate("prayerGroup.manageUsers.label")}
              icon={<MaterialCommunityIcons name="account" size={24} />}
              onPress={() => onPressOption("/(drawer)/prayergroup/[id]/users")}
              testID={PrayerGroupOptionsTestIds.manageUsersButton}
            />
          </>
        )}

        {prayerGroupDetails?.isUserJoined && (
          <PrayerGroupOptionButton
            label={translate("prayerGroup.actions.addPrayerRequest")}
            icon={<MaterialCommunityIcons name="plus" size={24} />}
            onPress={() => {
              onPressOption("/(drawer)/prayergroup/[id]/create");
            }}
          />
        )}

        <PrayerGroupOptionButton
          label={translate("prayerRequest.sorting.label")}
          icon={<MaterialCommunityIcons name="sort" size={24} />}
          onPress={() => {
            setIsOptionsOpen(false);
            setIsSortingOpen(true);
          }}
        />
      </View>
    </AppBottomSheet>
  );
};
