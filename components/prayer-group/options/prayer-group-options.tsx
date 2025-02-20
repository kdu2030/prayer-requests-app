import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as React from "react";
import { View } from "react-native";
import { Text, TouchableRipple, useTheme } from "react-native-paper";

import { useI18N } from "../../../hooks/use-i18n";

type Props = {
  bottomSheetRef: React.RefObject<BottomSheetProps & BottomSheetMethods>;
};

export const PrayerGroupOptions: React.FC<Props> = ({ bottomSheetRef }) => {
  const { translate } = useI18N();
  const theme = useTheme();

  return (
    <BottomSheet
      snapPoints={["50%"]}
      index={-1}
      enablePanDownToClose
      ref={bottomSheetRef}
      backgroundStyle={{ backgroundColor: theme.colors.background }}
    >
      <BottomSheetView>
        <View className="px-4">
          <TouchableRipple
            rippleColor={"rgba(0, 0, 0, 0.12)"}
            onPress={() => console.log("Pressed")}
            style={{ borderRadius: 8 }}
            borderless
          >
            <View className="flex-row gap-x-4 items-center py-4 px-2">
              <MaterialCommunityIcons name="information" size={24} />
              <Text variant="bodyMedium">
                {translate("prayerGroup.options.about")}
              </Text>
            </View>
          </TouchableRipple>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
