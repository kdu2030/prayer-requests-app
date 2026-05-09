import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { PrayerRequestCommentModel } from "../../types/prayer-request-types";
import { ProfilePicture } from "../layouts/profile-picture";

type Props = {
  prayerRequestComment: PrayerRequestCommentModel;
};

export const PrayerRequestCommentCard: React.FC<Props> = ({
  prayerRequestComment,
}) => {
  const theme = useTheme();

  return (
    <View className="p-5 flex flex-row justify-between flex-1">
      <View className="flex flex-row flex-1 gap-x-2">
        <ProfilePicture
          width={24}
          height={24}
          url={prayerRequestComment.user?.image?.fileUrl}
        />

        <View className="flex-1">
          <Text variant="bodyMedium">{prayerRequestComment.comment}</Text>
        </View>
      </View>

      <MaterialIcons
        size={24}
        name="more-vert"
        color={theme.colors.onSurface}
      />
    </View>
  );
};
