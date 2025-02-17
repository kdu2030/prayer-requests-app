import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useI18N } from "../../hooks/use-i18n";
import { ProfilePicture } from "../layouts/profile-picture";
import { PrayerGroupHeader } from "./header/prayer-group-header";
import { usePrayerGroup } from "./use-prayer-group";

type Props = {
  prayerGroupId: number;
};

export const PrayerGroup: React.FC<Props> = ({ prayerGroupId }) => {
  const { left, right, bottom } = useSafeAreaInsets();
  const { prayerGroupDetails } = usePrayerGroup(prayerGroupId);
  const { translate } = useI18N();

  return (
    <>
      <StatusBar translucent style="light" />
      <View
        style={{
          paddingLeft: left,
          paddingRight: right,
          paddingBottom: bottom,
        }}
      >
        <PrayerGroupHeader prayerGroupDetails={prayerGroupDetails} />

        <View className="pt-4 px-4 flex-row items-center justify-between">
          <View className="flex-row w-2/3 items-center">
            <View className="mr-4">
              <ProfilePicture
                width={52}
                height={52}
                url={prayerGroupDetails?.bannerImageFile?.url}
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

          <Button
            className="justify-self-end"
            mode={prayerGroupDetails?.isUserJoined ? "outlined" : "contained"}
          >
            {prayerGroupDetails?.isUserJoined
              ? translate("prayerGroup.actions.joined")
              : translate("prayerGroup.actions.join")}
          </Button>
        </View>
      </View>

      <View className="pt-2 px-4">
        <Text variant="bodyMedium" numberOfLines={2}>
          {prayerGroupDetails?.description ?? ""}
        </Text>
      </View>

      {/** Note: Add spinner instead of skeleton */}
    </>
  );
};
