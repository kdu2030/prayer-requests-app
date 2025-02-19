import * as React from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { useI18N } from "../../../hooks/use-i18n";
import { PrayerGroupDetails } from "../../../types/prayer-group-types";
import { ProfilePicture } from "../../layouts/profile-picture";
import { PrayerGroupBanner } from "./prayer-group-banner";

type Props = {
  prayerGroupDetails: PrayerGroupDetails | undefined;
  onRemoveUser: () => void;
  isRemoveUserLoading: boolean;
  onAddUser: () => void;
  isAddUserLoading: boolean;
};

export const PrayerGroupHeader: React.FC<Props> = ({
  prayerGroupDetails,
  onRemoveUser,
  isRemoveUserLoading,
  onAddUser,
  isAddUserLoading,
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
              url={prayerGroupDetails?.imageFile?.url}
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
          <Button icon="plus" className="flex-1" mode={"contained"}>
            {translate("prayerGroup.actions.addPrayerRequest")}
          </Button>
          <Button icon="dots-horizontal" className="flex-1" mode={"outlined"}>
            {translate("prayerGroup.actions.groupOptions")}
          </Button>
        </View>
      </View>
    </View>
  );
};
