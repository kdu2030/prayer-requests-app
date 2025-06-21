import * as React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { formatDate } from "../../helpers/formatting-helpers";
import { useI18N } from "../../hooks/use-i18n";
import { CultureCode } from "../../types/languages";
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
  const { i18n } = useI18N();
  const displayUser = showCreatedUser && prayerRequest.user?.fullName;

  return (
    <View className="p-6" style={{ backgroundColor: theme.colors.background }}>
      <View className="flex flex-row items-center">
        {displayUser && (
          <View className=" flex flex-row items-center gap-x-2">
            <ProfilePicture
              url={prayerRequest.user?.image?.url}
              width={24}
              height={24}
            />
            <Text variant="bodyMedium">{prayerRequest.user?.fullName}</Text>
          </View>
        )}

        {prayerRequest.createdDate && (
          <Text variant="bodyMedium" className="ml-4 text-gray-500">
            {formatDate(
              prayerRequest.createdDate,
              i18n.language as CultureCode
            )}
          </Text>
        )}
      </View>
    </View>
  );
};
