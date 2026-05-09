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
    <View className="p-2 flex flex-row justify-between w-full">
      <View className="flex flex-row items-start flex-1">
        <ProfilePicture
          width={24}
          height={24}
          url={prayerRequestComment.user?.image?.fileUrl}
        />

        <Text variant="bodyMedium">{prayerRequestComment.comment}</Text>
      </View>

      <MaterialIcons
        size={24}
        name="more-vert"
        color={theme.colors.onSurface}
      />
    </View>
  );
};
