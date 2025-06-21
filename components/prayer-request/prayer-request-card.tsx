import * as React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { PrayerRequestModel } from "../../types/prayer-request-types";
import { ProfilePicture } from "../layouts/profile-picture";

type Props = {
  prayerRequest: PrayerRequestModel;
  showCreatedUser: boolean;
};

export const PrayerRequestCard: React.FC<Props> = ({
  prayerRequest,
  showCreatedUser,
}) => {
  const theme = useTheme();
  const displayUser = showCreatedUser && prayerRequest.user?.fullName;

  return (
    <View className="p-6" style={{ backgroundColor: theme.colors.background }}>
      {displayUser && (
        <View className="flex flex-row gap-x-2 items-center">
          <ProfilePicture
            url={prayerRequest.user?.image?.url}
            width={24}
            height={24}
          />
          <Text variant="bodyMedium">{prayerRequest.user?.fullName}</Text>
        </View>
      )}
    </View>
  );
};
