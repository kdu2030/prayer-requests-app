import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
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
import { PrayerRequestModel } from "../../types/prayer-request-types";
import { PrayerGroupOptionButton } from "../prayer-group/options/prayer-group-option-button";
import { usePrayerRequestActionsSheet } from "./use-prayer-request-actions-sheet";

type Props = {
  showExtendedActions: boolean;
  selectedPrayerRequest: PrayerRequestModel | undefined;
  isOpen: boolean;
  onClose: () => void;
};

export const PrayerRequestActions: React.FC<Props> = ({
  selectedPrayerRequest,
  isOpen,
  onClose,
}) => {
  const theme = useTheme();
  const { translate } = useI18N();

  const { toggleBookmark, isToggleBookmarkLoading } =
    usePrayerRequestActionsSheet(onClose, selectedPrayerRequest);

  const bottomSheetRef = React.useRef<BottomSheetMethods>(null);

  React.useEffect(() => {
    if (!bottomSheetRef.current) {
      return;
    }

    if (isOpen) {
      bottomSheetRef.current.snapToIndex(0);
    } else {
      bottomSheetRef.current.close();
    }
  }, [isOpen]);

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
      onClose={onClose}
      ref={bottomSheetRef}
    >
      <BottomSheetView>
        <View className="p-4">
          <PrayerGroupOptionButton
            icon={
              <MaterialCommunityIcons
                name="cross"
                size={24}
                color={theme.colors.onSurface}
              />
            }
            label={translate("prayerRequest.actions.prayForRequest")}
            onPress={() => {}}
          />

          <PrayerGroupOptionButton
            icon={
              <MaterialIcons
                name={
                  selectedPrayerRequest?.userBookmarkId
                    ? "bookmark"
                    : "bookmark-outline"
                }
                size={24}
                color={theme.colors.onSurface}
              />
            }
            label={
              selectedPrayerRequest?.userBookmarkId
                ? translate("prayerRequest.actions.unsavePrayerRequest")
                : translate("prayerRequest.actions.savePrayerRequest")
            }
            onPress={toggleBookmark}
            isLoading={isToggleBookmarkLoading}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
