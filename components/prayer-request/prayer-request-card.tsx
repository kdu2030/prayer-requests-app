import * as React from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { formatDate, formatNumber } from "../../helpers/formatting-helpers";
import { getArrayTestId } from "../../helpers/utils";
import { useI18N } from "../../hooks/use-i18n";
import { CultureCode } from "../../types/languages";
import { PrayerRequestModel } from "../../types/prayer-request-types";
import { ProfilePicture } from "../layouts/profile-picture";
import { PrayerRequestCardTestIds } from "./tests/test-ids";
import { usePrayerRequestCard } from "./use-prayer-request-card";

type Props = {
  prayerRequest: PrayerRequestModel;
  prayerRequests: PrayerRequestModel[];
  setPrayerRequests: React.Dispatch<React.SetStateAction<PrayerRequestModel[]>>;
  setSnackbarError: React.Dispatch<React.SetStateAction<string | undefined>>;
  showCreatedUser?: boolean;
};

export const PrayerRequestCard: React.FC<Props> = ({
  prayerRequest,
  prayerRequests,
  setPrayerRequests,
  setSnackbarError,
  showCreatedUser = true,
}) => {
  const theme = useTheme();
  const { i18n } = useI18N();
  const displayUser = showCreatedUser && prayerRequest.user?.fullName;

  const { isLikeLoading, onLikePress, likeIcon } = usePrayerRequestCard(
    prayerRequest,
    prayerRequests,
    setPrayerRequests,
    setSnackbarError
  );

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
              testID={getArrayTestId(
                PrayerRequestCardTestIds.userProfilePicture,
                prayerRequest.prayerRequestId
              )}
            />
            <Text className="ml-2" variant="bodyMedium">
              {prayerRequest.user?.fullName}
            </Text>
          </View>
        )}

        {prayerRequest.createdDate && (
          <Text
            variant="bodyMedium"
            className="ml-4 text-gray-500"
            testID={getArrayTestId(
              PrayerRequestCardTestIds.createdDate,
              prayerRequest.prayerRequestId
            )}
          >
            {formatDate(
              prayerRequest.createdDate,
              i18n.language as CultureCode
            )}
          </Text>
        )}
      </View>

      <Text
        variant="titleMedium"
        className="mt-4 font-bold"
        numberOfLines={1}
        testID={getArrayTestId(
          PrayerRequestCardTestIds.requestTitle,
          prayerRequest.prayerRequestId
        )}
      >
        {prayerRequest.requestTitle}
      </Text>

      <Text
        variant="bodyMedium"
        className="mt-2"
        numberOfLines={3}
        testID={getArrayTestId(
          PrayerRequestCardTestIds.requestDescription,
          prayerRequest.prayerRequestId
        )}
      >
        {prayerRequest.requestDescription}
      </Text>

      <View className="flex flex-row justify-between items-center mt-6">
        <View className="flex flex-row gap-x-3 items-center">
          <Button
            mode="outlined"
            icon={likeIcon}
            loading={isLikeLoading}
            onPress={onLikePress}
            testID={getArrayTestId(
              PrayerRequestCardTestIds.likeButton,
              prayerRequest.prayerRequestId
            )}
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
            testID={getArrayTestId(
              PrayerRequestCardTestIds.commentButton,
              prayerRequest.prayerRequestId
            )}
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
          testID={getArrayTestId(
            PrayerRequestCardTestIds.prayedButton,
            prayerRequest.prayerRequestId
          )}
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
