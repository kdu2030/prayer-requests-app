import * as React from "react";
import { FlatList } from "react-native";

import { useI18N } from "../../hooks/use-i18n";
import { LoadStatus } from "../../types/api-response-types";
import { ErrorScreen } from "../layouts/error-screen";
import { usePrayerRequestActionsContainer } from "../prayer-group/use-prayer-request-actions-container";
import { DeletePrayerRequestModal } from "../prayer-request/delete-prayer-request-modal";
import { EditExpirationDateModal } from "../prayer-request/edit-expiration-date-modal";
import { PrayerRequestActions } from "../prayer-request/prayer-request-actions";
import { PrayerRequestListCard } from "../prayer-request/prayer-request-list-card";
import { PrayerRequestSkeletonList } from "../prayer-request/prayer-request-skeleton-list";
import { NoGroupsPlaceholder } from "./no-groups-placeholder";
import { NoRecentPostsPlaceholder } from "./no-recent-posts-placeholder";
import { useUserHomePageBody } from "./use-user-home-page-body";

export const UserHomePageBody: React.FC = () => {
  const { translate } = useI18N()!;

  const {
    joinedNoPrayerGroups,
    loadedPrayerRequests,
    homePageLoadStatus,
    initializePrayerRequests,
    prayerRequestIds,
  } = useUserHomePageBody();

  const {
    isPrayerRequestActionsOpen,
    openPrayerRequestActions,
    showExtendedActions,
    selectedPrayerRequest,
    closePrayerRequestActions,
    onExpirationDateModalOpen,
    onDeleteConfirmationModalOpen,
    expirationModalPrayerRequest,
    isExpirationModalOpen,
    onExpirationDateModalClose,
    isDeleteConfirmationModalOpen,
    prayerRequestIdToDelete,
    onDeleteConfirmationModalClose,
  } = usePrayerRequestActionsContainer();

  if (
    homePageLoadStatus === LoadStatus.Loading ||
    homePageLoadStatus === LoadStatus.NotStarted
  ) {
    return <PrayerRequestSkeletonList numCards={5} />;
  }

  if (homePageLoadStatus === LoadStatus.Error) {
    return (
      <ErrorScreen
        errorLabel={translate("prayerRequest.loading.failure")}
        showSafeArea={false}
        onRetry={initializePrayerRequests}
      />
    );
  }

  return (
    <>
      {joinedNoPrayerGroups && <NoGroupsPlaceholder />}
      {loadedPrayerRequests.length === 0 ? (
        <NoRecentPostsPlaceholder />
      ) : (
        <FlatList
          data={prayerRequestIds}
          renderItem={({ item }) => (
            <PrayerRequestListCard
              prayerRequestId={item}
              openPrayerRequestActions={openPrayerRequestActions}
              showCreatedUser={false}
            />
          )}
        />
      )}

      <PrayerRequestActions
        selectedPrayerRequest={selectedPrayerRequest}
        isOpen={isPrayerRequestActionsOpen}
        showExtendedActions={showExtendedActions}
        onClose={closePrayerRequestActions}
        openDeletePrayerRequestModal={onDeleteConfirmationModalOpen}
        openEditExpirationModal={onExpirationDateModalOpen}
      />

      <EditExpirationDateModal
        prayerRequest={expirationModalPrayerRequest}
        isOpen={isExpirationModalOpen}
        onClose={onExpirationDateModalClose}
      />

      <DeletePrayerRequestModal
        isOpen={isDeleteConfirmationModalOpen}
        prayerRequestIdToDelete={prayerRequestIdToDelete}
        onClose={onDeleteConfirmationModalClose}
      />
    </>
  );
};
