import { min } from "lodash";
import * as React from "react";
import { FlatList, Pressable, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useI18N } from "../../hooks/use-i18n";
import { LoadStatus } from "../../types/api-response-types";
import { ErrorScreen } from "../layouts/error-screen";
import { SpinnerScreen } from "../layouts/spinner-screen";
import { PrayerRequestActions } from "../prayer-request/prayer-request-actions";
import { usePrayerRequestContext } from "../prayer-request/prayer-request-context";
import { PrayerRequestListCard } from "../prayer-request/prayer-request-list-card";
import { PrayerRequestSkeletonList } from "../prayer-request/prayer-request-skeleton-list";
import { PrayerGroupHeader } from "./header/prayer-group-header";
import { LeavePrayerGroupModal } from "./leave-prayer-group/leave-prayer-group-modal";
import { PrayerGroupOptions } from "./options/prayer-group-options";
import { usePrayerGroupContext } from "./prayer-group-context";
import { PrayerRequestPlaceholderBody } from "./prayer-request-placeholder/prayer-request-placeholder-body";
import { usePrayerGroup } from "./use-prayer-group";
import { usePrayerGroupRequests } from "./use-prayer-group-requests";

type Props = {
  prayerGroupId: number;
};

export const PrayerGroup: React.FC<Props> = ({ prayerGroupId }) => {
  const { left, right, bottom } = useSafeAreaInsets();
  const { translate } = useI18N();
  const theme = useTheme();

  const { prayerGroupDetails } = usePrayerGroupContext();

  const { prayerRequestIds } = usePrayerRequestContext();

  const {
    prayerGroupLoadStatus,
    isRemoveUserLoading,
    onRemoveUser,
    onAddUser,
    isAddUserLoading,
    onRetry,
    prayerGroupOptionsRef,
    onOpenOptions,
    prayerRequestLoadStatus,
    onEndReached,
    loadNextPrayerRequestsForGroup,
    showPrayerRequestList,
    showLeavePrayerGroupModal,
    setShowLeavePrayerGroupModal,
    setUserJoinStatus,
    numNotLoadedRequests,
    prayerRequestFilters,
    nextPrayerRequestsLoadStatus,
    navigateToPrayerRequestPage,
  } = usePrayerGroup(prayerGroupId);

  const {
    selectedPrayerRequest,
    openPrayerRequestActions,
    showExtendedActions,
    isPrayerRequestActionsOpen,
    closePrayerRequestActions,
  } = usePrayerGroupRequests();

  const prayerGroupHeader = React.useMemo(
    () => (
      <PrayerGroupHeader
        prayerGroupDetails={prayerGroupDetails}
        isAddUserLoading={isAddUserLoading}
        onAddUser={onAddUser}
        onOpenOptions={onOpenOptions}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAddUserLoading, isRemoveUserLoading, prayerGroupDetails],
  );

  if (
    prayerGroupLoadStatus === LoadStatus.NotStarted ||
    prayerGroupLoadStatus === LoadStatus.Loading
  ) {
    return (
      <SpinnerScreen loadingLabel={translate("loading.prayerGroup.text")} />
    );
  }

  if (prayerGroupLoadStatus === LoadStatus.Error) {
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
          prayerRequestIds.length > 0 && (
            <FlatList
              ListHeaderComponent={prayerGroupHeader}
              data={prayerRequestIds}
              renderItem={({ item }) => (
                <Pressable onPress={() => navigateToPrayerRequestPage(item)}>
                  <PrayerRequestListCard
                    prayerRequestId={item}
                    openPrayerRequestActions={openPrayerRequestActions}
                    key={item}
                  />
                </Pressable>
              )}
              ListFooterComponent={
                nextPrayerRequestsLoadStatus === LoadStatus.Loading ? (
                  <PrayerRequestSkeletonList
                    numCards={min([
                      numNotLoadedRequests,
                      prayerRequestFilters.pageSize ?? 0,
                    ])}
                  />
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

        <PrayerRequestActions
          isOpen={isPrayerRequestActionsOpen}
          showExtendedActions={showExtendedActions}
          selectedPrayerRequest={selectedPrayerRequest}
          onClose={closePrayerRequestActions}
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
