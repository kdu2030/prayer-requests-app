import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Href, router } from "expo-router";
import * as React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

import { PrayerGroupRole } from "../../../constants/prayer-group-constants";
import { useI18N } from "../../../hooks/use-i18n";
import { PrayerGroupDetails } from "../../../types/prayer-group-types";
import { PrayerGroupOptionButton } from "./prayer-group-option-button";
import { PrayerGroupOptionsTestIds } from "./tests/test-ids";

type Props = {
  prayerGroupDetails?: PrayerGroupDetails;
  bottomSheetRef: React.RefObject<BottomSheetProps & BottomSheetMethods>;
};

export const PrayerGroupOptions: React.FC<Props> = ({
  prayerGroupDetails,
  bottomSheetRef,
}) => {
  const { translate } = useI18N();
  const theme = useTheme();
  const isAdmin = prayerGroupDetails?.userRole === PrayerGroupRole.Admin;

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const onPressOption = (route: string) => {
    prayerGroupDetails?.prayerGroupId &&
      router.push({
        pathname: route,
        params: { id: prayerGroupDetails?.prayerGroupId },
      } as Href<any>);

    setTimeout(() => bottomSheetRef?.current?.close(), 0);
  };

  return (
    <BottomSheet
      snapPoints={["50%"]}
      index={-1}
      enablePanDownToClose
      ref={bottomSheetRef}
      backgroundStyle={{ backgroundColor: theme.colors.background }}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView>
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
                onPress={() =>
                  onPressOption("/(drawer)/prayergroup/[id]/users")
                }
                testID={PrayerGroupOptionsTestIds.manageUsersButton}
              />

              {prayerGroupDetails.isUserJoined && (
                <PrayerGroupOptionButton
                  label={translate("prayerGroup.actions.addPrayerRequest")}
                  icon={<MaterialCommunityIcons name="plus" size={24} />}
                  onPress={() => {}}
                />
              )}
            </>
          )}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
