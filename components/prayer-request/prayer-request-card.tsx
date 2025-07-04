import * as React from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { formatDate, formatNumber } from "../../helpers/formatting-helpers";
import { useI18N } from "../../hooks/use-i18n";
import { CultureCode } from "../../types/languages";
import { PrayerRequestModel } from "../../types/prayer-request-types";
import { ProfilePicture } from "../layouts/profile-picture";

type Props = {
  prayerRequest: PrayerRequestModel;
  showCreatedUser: boolean;
  updatePrayerRequestLikes: (
    prayerRequestId: number,
    addLike: boolean
  ) => Promise<void>;
};

export const PrayerRequestCard: React.FC<Props> = ({
  prayerRequest,
  showCreatedUser,
}) => {
  const theme = useTheme();
  const { i18n } = useI18N();
  const displayUser = showCreatedUser && prayerRequest.user?.fullName;

  return (
    <View
      className="p-5 border-b"
      style={{
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.outline,
      }}
    >
      <View className="flex flex-row items-center">
        {displayUser && (
          <View className="flex flex-row items-center">
            <ProfilePicture
              url={prayerRequest.user?.image?.url}
              width={24}
              height={24}
            />
            <Text className="ml-2" variant="bodyMedium">
              {prayerRequest.user?.fullName}
            </Text>
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

      <Text variant="titleMedium" className="mt-4 font-bold" numberOfLines={1}>
        {prayerRequest.requestTitle}
      </Text>

      <Text variant="bodyMedium" className="mt-2" numberOfLines={3}>
        {prayerRequest.requestDescription}
      </Text>

      <View className="flex flex-row justify-between items-center mt-6">
        <View className="flex flex-row gap-x-3 items-center">
          <Button
            mode="outlined"
            icon={prayerRequest.isUserLiked ? "heart" : "heart-outline"}
          >
            {formatNumber(
              prayerRequest.likeCount ?? 0,
              i18n.language as CultureCode,
              { notation: "compact", compactDisplay: "short" }
            )}
          </Button>

          <Button
            mode="outlined"
            icon={prayerRequest.isUserCommented ? "comment" : "comment-outline"}
          >
            {formatNumber(
              prayerRequest.commentCount ?? 0,
              i18n.language as CultureCode,
              { notation: "compact", compactDisplay: "short" }
            )}
          </Button>
        </View>

        <Button
          mode="outlined"
          icon={
            prayerRequest.isUserPrayed
              ? "account-heart"
              : "account-heart-outline"
          }
        >
          {formatNumber(
            prayerRequest.prayedCount ?? 0,
            i18n.language as CultureCode,
            { notation: "compact", compactDisplay: "short" }
          )}
        </Button>
      </View>
    </View>
  );
};
