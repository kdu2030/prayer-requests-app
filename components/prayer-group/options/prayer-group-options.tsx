import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { router } from "expo-router";
import * as React from "react";
import { View } from "react-native";
import { Text, TouchableRipple, useTheme } from "react-native-paper";

import { useI18N } from "../../../hooks/use-i18n";
import { PrayerGroupDetails } from "../../../types/prayer-group-types";

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
          <TouchableRipple
            rippleColor={"rgba(0, 0, 0, 0.12)"}
            onPress={() =>
              prayerGroupDetails?.prayerGroupId &&
              router.push({
                pathname: "/(drawer)/prayergroup/[id]/about",
                params: { id: prayerGroupDetails?.prayerGroupId },
              })
            }
            style={{ borderRadius: 8 }}
            borderless
          >
            <View className="flex-row gap-x-3 items-center py-4 px-2">
              <MaterialCommunityIcons name="information" size={24} />
              <Text variant="bodyMedium">
                {translate("prayerGroup.options.about")}
              </Text>
            </View>
          </TouchableRipple>

          <TouchableRipple
            rippleColor={"rgba(0, 0, 0, 0.12)"}
            onPress={() =>
              prayerGroupDetails?.prayerGroupId &&
              router.push({
                pathname: "/(drawer)/prayergroup/[id]/about",
                params: { id: prayerGroupDetails?.prayerGroupId },
              })
            }
            style={{ borderRadius: 8 }}
            borderless
          >
            <View className="flex-row gap-x-3 items-center py-4 px-2">
              <MaterialCommunityIcons name="pencil" size={24} />
              <Text variant="bodyMedium">
                {translate("prayerGroup.options.editPrayerGroup")}
              </Text>
            </View>
          </TouchableRipple>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
