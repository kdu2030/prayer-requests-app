import { router } from "expo-router";
import * as React from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { useI18N } from "../../../hooks/use-i18n";
import { PrayerGroupDetails } from "../../../types/prayer-group-types";
import { ProfilePicture } from "../../layouts/profile-picture";
import { PrayerGroupBanner } from "./prayer-group-banner";
import { PrayerGroupHeaderTestIds } from "./tests/test-ids";

type Props = {
  prayerGroupDetails: PrayerGroupDetails | undefined;
  onRemoveUser: () => void;
  isRemoveUserLoading: boolean;
  onAddUser: () => void;
  isAddUserLoading: boolean;
  onOpenOptions: () => void;
};

export const PrayerGroupHeader: React.FC<Props> = ({
  prayerGroupDetails,
  onRemoveUser,
  isRemoveUserLoading,
  onAddUser,
  isAddUserLoading,
  onOpenOptions,
}) => {
  const { translate } = useI18N();
  const theme = useTheme();

  return (
    <View
      className="border-b pb-5"
      style={{ borderColor: theme.colors.outline }}
    >
      <PrayerGroupBanner uri={prayerGroupDetails?.bannerImageFile?.url} />
      <View className="pt-4 px-4 flex-row items-center justify-between">
        <View className="w-2/3 self-start flex-row items-center">
          <View className="mr-4">
            <ProfilePicture
              width={52}
              height={52}
              url={prayerGroupDetails?.avatarFile?.url}
            />
          </View>

          <Text
            variant="titleLarge"
            className="font-bold"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {prayerGroupDetails?.groupName}
          </Text>
        </View>

        {prayerGroupDetails?.isUserJoined && (
          <Button
            icon={"check"}
            className="justify-self-end"
            mode={"outlined"}
            onPress={onRemoveUser}
            loading={isRemoveUserLoading}
            testID={PrayerGroupHeaderTestIds.leaveGroupButton}
          >
            {translate("prayerGroup.actions.joined")}
          </Button>
        )}

        {!prayerGroupDetails?.isUserJoined && (
          <Button
            icon={"account-multiple-plus"}
            className="justify-self-end"
            mode={"contained"}
            onPress={onAddUser}
            loading={isAddUserLoading}
            testID={PrayerGroupHeaderTestIds.joinGroupButton}
          >
            {translate("prayerGroup.actions.join")}
          </Button>
        )}
      </View>
      <View className="mt-2 px-4">
        <Text variant="bodyMedium" numberOfLines={2}>
          {prayerGroupDetails?.description ?? ""}
        </Text>

        <View className="flex-row gap-x-4 mt-4">
          {prayerGroupDetails?.isUserJoined ? (
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
          ) : (
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
          <Button
            icon="dots-horizontal"
            className="flex-1"
            mode={"outlined"}
            onPress={onOpenOptions}
          >
            {translate("prayerGroup.actions.groupOptions")}
          </Button>
        </View>
      </View>
    </View>
  );
};
