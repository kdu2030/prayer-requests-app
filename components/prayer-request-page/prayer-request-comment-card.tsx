import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { formatDate } from "../../helpers/formatting-helpers";
import { useI18N } from "../../hooks/use-i18n";
import { CultureCode } from "../../types/languages";
import { PrayerRequestCommentModel } from "../../types/prayer-request-types";
import { ProfilePicture } from "../layouts/profile-picture";

type Props = {
  prayerRequestComment: PrayerRequestCommentModel;
};

export const PrayerRequestCommentCard: React.FC<Props> = ({
  prayerRequestComment,
}) => {
  const { i18n } = useI18N();
  const theme = useTheme();

  return (
    <View className="flex flex-col p-5 bg-green-300">
      <View className="flex flex-row justify-between bg-blue-200 flex-1">
        <View className="flex flex-row items-center gap-x-2 flex-1">
          <ProfilePicture
            width={24}
            height={24}
            url={prayerRequestComment.user?.image?.fileUrl}
          />

          {/* <View className="flex-1">
          <Text variant="bodyMedium">{prayerRequestComment.comment}</Text>
        </View> */}

          <View className="flex flex-row flex-1">
            <Text variant="bodyMedium" numberOfLines={1}>
              {prayerRequestComment.user?.fullName}
            </Text>

            {prayerRequestComment.submittedDate && (
              <Text variant="bodyMedium" className="ml-4 text-gray-500">
                {formatDate(
                  prayerRequestComment.submittedDate,
                  i18n.language as CultureCode,
                )}
              </Text>
            )}
          </View>
        </View>

        <MaterialIcons
          size={24}
          name="more-vert"
          color={theme.colors.onSurface}
        />
      </View>

      <View className="flex-1 mt-4 bg-red-200">
        <Text variant="bodyMedium">{prayerRequestComment.comment}</Text>
      </View>
    </View>
  );
};
