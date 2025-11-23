import classNames from "classnames";
import { router } from "expo-router";
import * as React from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import {
  JoinStatus,
  VisibilityLevel,
} from "../../../constants/prayer-group-constants";
import { useI18N } from "../../../hooks/use-i18n";
import { PrayerGroupDetails } from "../../../types/prayer-group-types";
import { ProfilePicture } from "../../layouts/profile-picture";
import { PrayerGroupBanner } from "./prayer-group-banner";
import { PrayerGroupHeaderTestIds } from "./tests/test-ids";

type Props = {
  prayerGroupDetails: PrayerGroupDetails | undefined;
  onAddUser: () => void;
  isAddUserLoading: boolean;
  onOpenOptions: () => void;
};

export const PrayerGroupHeader: React.FC<Props> = ({
  prayerGroupDetails,
  onAddUser,
  isAddUserLoading,
  onOpenOptions,
}) => {
  const { translate } = useI18N();
  const theme = useTheme();

  const showJoinButton = React.useMemo(() => {
    return (
      prayerGroupDetails?.userJoinStatus != JoinStatus.Joined &&
      prayerGroupDetails?.visibilityLevel === VisibilityLevel.Public
    );
  }, [prayerGroupDetails?.userJoinStatus, prayerGroupDetails?.visibilityLevel]);

  return (
    <View
      className="border-b pb-5"
      style={{ borderColor: theme.colors.outline }}
    >
      <PrayerGroupBanner uri={prayerGroupDetails?.bannerFile?.fileUrl} />
      <View className="pt-4 px-4 flex-row items-center justify-between">
        <View className={classNames("self-start flex-row items-center")}>
          <View className="mr-4">
            <ProfilePicture
              width={52}
              height={52}
              url={prayerGroupDetails?.avatarFile?.fileUrl}
            />
          </View>

          <Text
            variant="titleLarge"
            className="font-bold flex-shrink"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {prayerGroupDetails?.groupName}
          </Text>
        </View>
      </View>
      <View className="mt-2 px-4">
        <Text variant="bodyMedium" numberOfLines={2}>
          {prayerGroupDetails?.description ?? ""}
        </Text>

        <View className="flex-row gap-x-4 mt-4">
          {prayerGroupDetails?.userJoinStatus === JoinStatus.Joined && (
            <Button
              icon="plus"
              className="flex-1"
              mode={"contained"}
              testID={PrayerGroupHeaderTestIds.addPrayerRequestButton}
              onPress={() =>
                prayerGroupDetails.prayerGroupId &&
                router.push({
                  pathname: "/(drawer)/prayergroup/[id]/create",
                  params: { id: prayerGroupDetails?.prayerGroupId },
                })
              }
            >
              {translate("prayerGroup.actions.addPrayerRequest")}
            </Button>
          )}

          {prayerGroupDetails?.visibilityLevel === VisibilityLevel.Private &&
            prayerGroupDetails.userJoinStatus !== JoinStatus.Joined && (
              <Button
                icon="information"
                className="flex-1"
                mode="contained"
                testID={PrayerGroupHeaderTestIds.aboutGroupButton}
                onPress={() => {
                  prayerGroupDetails?.prayerGroupId &&
                    router.push({
                      pathname: "/(drawer)/prayergroup/[id]/about",
                      params: { id: prayerGroupDetails?.prayerGroupId },
                    });
                }}
              >
                {translate("prayerGroup.options.about")}
              </Button>
            )}

          {showJoinButton && (
            <Button
              icon={"account-multiple-plus"}
              className="flex-1"
              mode={"contained"}
              onPress={onAddUser}
              loading={isAddUserLoading}
              testID={PrayerGroupHeaderTestIds.joinGroupButton}
            >
              {translate("prayerGroup.actions.join")}
            </Button>
          )}

          <Button
            icon="dots-horizontal"
            className="flex-1"
            mode={"outlined"}
            onPress={onOpenOptions}
            testID={PrayerGroupHeaderTestIds.optionsButton}
          >
            {translate("prayerGroup.actions.groupOptions")}
          </Button>
        </View>
      </View>
    </View>
  );
};
