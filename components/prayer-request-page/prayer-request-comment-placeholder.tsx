import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";

type Props = {
  setPlaceholderPosition: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
};

export const PrayerRequestCommentPlaceholder: React.FC<Props> = ({
  setPlaceholderPosition,
}) => {
  const theme = useTheme();
  const { translate } = useI18N();

  return (
    <View
      className="items-center px-5 py-8"
      onLayout={(layoutEvent) =>
        setPlaceholderPosition(layoutEvent.nativeEvent.layout.y)
      }
    >
      <MaterialCommunityIcons
        name="comment-text-outline"
        size={64}
        color={theme.colors.onSurface}
      />
      <Text className="mt-5" variant="titleMedium">
        {translate("prayerRequest.comments.placeholder")}
      </Text>
    </View>
  );
};
