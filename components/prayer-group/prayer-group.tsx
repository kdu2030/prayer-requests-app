import * as React from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
        className="flex-1"
        style={{
          paddingLeft: left,
          paddingRight: right,
          paddingBottom: bottom,
        }}
      >
        <PrayerGroupHeader
          prayerGroupDetails={prayerGroupDetails}
          isAddUserLoading={isAddUserLoading}
          isRemoveUserLoading={isRemoveUserLoading}
          onAddUser={onAddUser}
          onRemoveUser={onRemoveUser}
          onOpenOptions={onOpenOptions}
        />

        <PrayerGroupOptions bottomSheetRef={prayerGroupOptionsRef} />

        <ErrorSnackbar
          snackbarError={snackbarError}
          setSnackbarError={setSnackbarError}
        />
      </View>
    </>
  );
};
