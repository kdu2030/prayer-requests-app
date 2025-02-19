import * as React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useI18N } from "../../hooks/use-i18n";
import { ErrorScreen } from "../layouts/error-screen";
import { ErrorSnackbar } from "../layouts/error-snackbar";
import { ProfilePicture } from "../layouts/profile-picture";
import { SpinnerScreen } from "../layouts/spinner-screen";
import { PrayerGroupBanner } from "./header/prayer-group-banner";
import { usePrayerGroup } from "./use-prayer-group";

type Props = {
  prayerGroupId: number;
};

export const PrayerGroup: React.FC<Props> = ({ prayerGroupId }) => {
  const { left, right, bottom } = useSafeAreaInsets();
  const { translate } = useI18N();

  const {
    isLoading,
    prayerGroupDetails,
    snackbarError,
    setSnackbarError,
    isRemoveUserLoading,
    onRemoveUser,
    onAddUser,
    isAddUserLoading,
    showErrorScreen,
    onRetry,
  } = usePrayerGroup(prayerGroupId);

  if (isLoading) {
    return (
      <SpinnerScreen loadingLabel={translate("loading.prayerGroup.text")} />
    );
  }

  if (showErrorScreen) {
    return (
      <ErrorScreen
        errorLabel={translate("loading.prayerGroup.error")}
        onRetry={onRetry}
      />
    );
  }

  return (
    <>
      <View
        style={{
          paddingLeft: left,
          paddingRight: right,
          paddingBottom: bottom,
        }}
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

        <ErrorSnackbar
          snackbarError={snackbarError}
          setSnackbarError={setSnackbarError}
        />
      </View>

      {/** Note: Add spinner instead of skeleton */}
    </>
  );
};
