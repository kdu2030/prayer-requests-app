import * as React from "react";
import { FlatList, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useI18N } from "../../hooks/use-i18n";
import { LoadStatus } from "../../types/api-response-types";
import { ErrorScreen } from "../layouts/error-screen";
import { ErrorSnackbar } from "../layouts/error-snackbar";
import { SpinnerScreen } from "../layouts/spinner-screen";
import { PrayerRequestCard } from "../prayer-request/prayer-request-card";
import { PrayerGroupHeader } from "./header/prayer-group-header";
import { PrayerGroupOptions } from "./options/prayer-group-options";
import { usePrayerGroupContext } from "./prayer-group-context";

import { PrayerRequestSpinner } from "./spinners/prayer-request-spinner";
import { usePrayerGroup } from "./use-prayer-group";
import { PrayerRequestPlaceholderBody } from "./prayer-request-placeholder/prayer-request-placeholder-body";
import { LeavePrayerGroupModal } from "./leave-prayer-group/leave-prayer-group-modal";

import { SuccessSnackbar } from "../layouts/success-snackbar";

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
    isRemoveUserLoading,
    onRemoveUser,
    onAddUser,
    isAddUserLoading,
    showErrorScreen,
    onRetry,
    prayerGroupOptionsRef,
    onOpenOptions,
    nextPrayerRequestLoadStatus,
    prayerRequestLoadStatus,
    prayerRequests,
    onEndReached,
    setPrayerRequests,
    loadNextPrayerRequestsForGroup,
    showPrayerRequestList,
    showLeavePrayerGroupModal,
    setShowLeavePrayerGroupModal,
    setUserJoinStatus,
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
        {!showPrayerRequestList && (
          <PrayerRequestPlaceholderBody
            prayerGroupId={prayerGroupId}
            prayerGroupHeader={prayerGroupHeader}
            prayerRequestLoadStatus={prayerRequestLoadStatus}
            loadNextPrayerRequestsForGroup={loadNextPrayerRequestsForGroup}
            visibilityLevel={prayerGroupDetails?.visibilityLevel}
            joinStatus={prayerGroupDetails?.userJoinStatus}
            setUserJoinStatus={setUserJoinStatus}
          />
        )}

        {prayerRequestLoadStatus === LoadStatus.Success &&
          prayerRequests.length > 0 && (
            <FlatList
              ListHeaderComponent={prayerGroupHeader}
              data={prayerRequests}
              renderItem={({ item }) => (
                <PrayerRequestCard
                  prayerRequest={item}
                  prayerRequests={prayerRequests}
                  setPrayerRequests={setPrayerRequests}
                  key={item.prayerRequestId}
                />
              )}
              ListFooterComponent={
                nextPrayerRequestLoadStatus === LoadStatus.Loading ? (
                  <View className="py-6">
                    <PrayerRequestSpinner
                      size={48}
                      textClassName="mt-3"
                      labelVariant="titleSmall"
                    />
                  </View>
                ) : undefined
              }
              onEndReachedThreshold={0.8}
              onEndReached={onEndReached}
            />
          )}

        <PrayerGroupOptions
          prayerGroupDetails={prayerGroupDetails}
          setShowLeavePrayerGroupModal={setShowLeavePrayerGroupModal}
          bottomSheetRef={prayerGroupOptionsRef}
        />

        {showLeavePrayerGroupModal && (
          <LeavePrayerGroupModal
            isRemoveUserLoading={isRemoveUserLoading}
            onRemoveUser={onRemoveUser}
            onCancel={() => setShowLeavePrayerGroupModal(false)}
          />
        )}
      </View>
    </>
  );
};
