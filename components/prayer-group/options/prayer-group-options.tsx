import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

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
        {/* <TouchableRipple
          rippleColor={"rgba(0, 0, 0, 0.5)"}
          className="flex gap-x-4"
        > */}
        <View>
          <MaterialCommunityIcons name="information" size={24} />
          <Text variant="bodyMedium">
            {translate("prayerGroup.options.about")}
          </Text>
        </View>
        {/* </TouchableRipple> */}
      </BottomSheetView>
    </BottomSheet>
  );
};
