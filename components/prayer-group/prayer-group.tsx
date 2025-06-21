import * as React from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useI18N } from "../../hooks/use-i18n";
import { ErrorScreen } from "../layouts/error-screen";
import { ErrorSnackbar } from "../layouts/error-snackbar";
import { SpinnerScreen } from "../layouts/spinner-screen";
import { PrayerGroupHeader } from "./header/prayer-group-header";
import { PrayerGroupOptions } from "./options/prayer-group-options";
import { usePrayerGroupContext } from "./prayer-group-context";
import { usePrayerGroup } from "./use-prayer-group";

type Props = {
  prayerGroupId: number;
};

export const PrayerGroup: React.FC<Props> = ({ prayerGroupId }) => {
  const { left, right, bottom } = useSafeAreaInsets();
  const { translate } = useI18N();
  const theme = useTheme();

  const { prayerGroupDetails } = usePrayerGroupContext();

  const {
    isLoading,
    snackbarError,
    setSnackbarError,
    isRemoveUserLoading,
    onRemoveUser,
    onAddUser,
    isAddUserLoading,
    showErrorScreen,
    onRetry,
    prayerGroupOptionsRef,
    onOpenOptions,
    areRequestsLoading,
    prayerRequests,
  } = usePrayerGroup(prayerGroupId);

  const prayerGroupHeader = React.useMemo(
    () => (
      <PrayerGroupHeader
        prayerGroupDetails={prayerGroupDetails}
        isAddUserLoading={isAddUserLoading}
        isRemoveUserLoading={isRemoveUserLoading}
        onAddUser={onAddUser}
        onRemoveUser={onRemoveUser}
        onOpenOptions={onOpenOptions}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAddUserLoading, isRemoveUserLoading, prayerGroupDetails]
  );

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
        className="flex-1"
        style={{
          paddingLeft: left,
          paddingRight: right,
          paddingBottom: bottom,
          backgroundColor: theme.colors.background,
        }}
      >
        {areRequestsLoading ? (
          <>
            {prayerGroupHeader}
            <View className="flex mt-32 items-center">
              <ActivityIndicator
                animating={true}
                size={64}
                color={theme.colors.primary}
              />
              <Text variant="titleMedium" className="mt-5">
                {translate("prayerRequest.loading")}
              </Text>
            </View>
          </>
        ) : (
          <FlatList
            ListHeaderComponent={prayerGroupHeader}
            data={prayerRequests}
            renderItem={() => <></>}
          />
        )}

        <PrayerGroupOptions
          prayerGroupDetails={prayerGroupDetails}
          bottomSheetRef={prayerGroupOptionsRef}
        />

        <ErrorSnackbar
          snackbarError={snackbarError}
          setSnackbarError={setSnackbarError}
        />
      </View>
    </>
  );
};
