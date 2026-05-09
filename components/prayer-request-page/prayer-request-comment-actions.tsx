import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { AppBottomSheet } from "../layouts/app-bottom-sheet";
import { PrayerGroupOptionButton } from "../prayer-group/options/prayer-group-option-button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onEditComment: () => void;
};

export const PrayerRequestCommentActions: React.FC<Props> = ({
  isOpen,
  onClose,
  onEditComment,
}) => {
  const { translate } = useI18N();
  const theme = useTheme();

  return (
    <AppBottomSheet isOpen={isOpen} onClose={onClose}>
      <View className="p-5">
        <PrayerGroupOptionButton
          icon={
            <MaterialCommunityIcons
              name="pencil"
              size={24}
              color={theme.colors.onSurface}
            />
          }
          label={translate("prayerRequest.comment.editComment")}
          onPress={onEditComment}
        />
      </View>
    </AppBottomSheet>
  );
};
