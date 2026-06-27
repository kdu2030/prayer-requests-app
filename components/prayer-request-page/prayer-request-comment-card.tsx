import { MaterialIcons } from "@expo/vector-icons";
import classNames from "classnames";
import * as React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { formatDate } from "../../helpers/formatting-helpers";
import { getArrayTestId } from "../../helpers/utils";
import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import { CultureCode } from "../../types/languages";
import { PrayerRequestCommentModel } from "../../types/prayer-request-types";
import { DismissTouchableRipple } from "../inputs/dismiss-touchable-ripple";
import { ProfilePicture } from "../layouts/profile-picture";
import { PrayerRequestPageTestIds } from "./tests/test-ids";

type Props = {
  prayerRequestComment: PrayerRequestCommentModel;
  onOpenActions: () => void;
  isSelected: boolean;
};

export const PrayerRequestCommentCard: React.FC<Props> = ({
  prayerRequestComment,
  onOpenActions,
  isSelected,
}) => {
  const { i18n } = useI18N();
  const theme = useTheme();

  const { userData } = useApiDataContext();

  return (
    <View
      className={classNames("flex flex-col p-5", { "opacity-80": isSelected })}
    >
      <View className="flex flex-row justify-between flex-1">
        <View className="flex flex-row items-center flex-1 gap-x-2">
          <View>
            <ProfilePicture
              width={24}
              height={24}
              url={prayerRequestComment.user?.image?.fileUrl}
              testID={getArrayTestId(
                PrayerRequestPageTestIds.commentProfilePicture,
                prayerRequestComment.prayerRequestCommentId,
              )}
            />
          </View>

          <View className="flex flex-row flex-1">
            <Text
              variant="bodyMedium"
              numberOfLines={1}
              testID={getArrayTestId(
                PrayerRequestPageTestIds.commentFullName,
                prayerRequestComment.prayerRequestCommentId,
              )}
            >
              {prayerRequestComment.user?.fullName}
            </Text>

            {prayerRequestComment.submittedDate && (
              <Text
                variant="bodyMedium"
                className="ml-4 text-gray-500"
                testID={getArrayTestId(
                  PrayerRequestPageTestIds.commentDate,
                  prayerRequestComment.prayerRequestCommentId,
                )}
              >
                {formatDate(
                  prayerRequestComment.submittedDate,
                  i18n.language as CultureCode,
                )}
              </Text>
            )}
          </View>
        </View>

        {prayerRequestComment.user?.userId === userData?.userId && (
          <DismissTouchableRipple
            rippleColor={"rgba(0, 0, 0, 0.12)"}
            style={{ borderRadius: 9999 }}
            onPress={onOpenActions}
            borderless
            testID={getArrayTestId(
              PrayerRequestPageTestIds.commentActionsButton,
              prayerRequestComment.prayerRequestCommentId,
            )}
          >
            <MaterialIcons
              size={24}
              name="more-vert"
              color={theme.colors.onSurface}
            />
          </DismissTouchableRipple>
        )}
      </View>

      <View className="flex-1 mt-4">
        <Text
          variant="bodyMedium"
          testID={getArrayTestId(
            PrayerRequestPageTestIds.commentText,
            prayerRequestComment.prayerRequestCommentId,
          )}
        >
          {prayerRequestComment.comment}
        </Text>
      </View>
    </View>
  );
};
