import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { PrayerGroupOptionButton } from "../prayer-group/options/prayer-group-option-button";

type Props = {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
};

export const PrayerRequestActions: React.FC<Props> = ({ bottomSheetRef }) => {
  const theme = useTheme();
  const { translate } = useI18N();

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => {
      return (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      );
    },
    [],
  );

  return (
    <BottomSheet
      enableDynamicSizing
      index={-1}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: theme.colors.background }}
      ref={bottomSheetRef}
    >
      <BottomSheetView>
        <View className="p-4">
          <PrayerGroupOptionButton
            icon={<MaterialCommunityIcons name="cross" size={24} />}
            label={translate("prayerRequest.actions.prayForRequest")}
            onPress={() => {}}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
