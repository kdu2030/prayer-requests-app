import * as React from "react";

import { PrayerGroupDetails } from "../../types/prayer-group-types";
import { PrayerRequestModel } from "../../types/prayer-request-types";
import { DeletePrayerRequestModal } from "../prayer-request/delete-prayer-request-modal";
import { EditExpirationDateModal } from "../prayer-request/edit-expiration-date-modal";
import { PrayerRequestActions } from "../prayer-request/prayer-request-actions";
import { LeavePrayerGroupModal } from "./leave-prayer-group/leave-prayer-group-modal";
import { PrayerGroupOptions } from "./options/prayer-group-options";

export type PrayerGroupActionsContainerProps = {
  prayerGroupDetails: PrayerGroupDetails | undefined;
  setShowLeavePrayerGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
  isPrayerGroupOptionsOpen: boolean;
  setIsPrayerGroupOptionsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPrayerRequestActionsOpen: boolean;
  showExtendedActions: boolean;
  selectedPrayerRequest: PrayerRequestModel | undefined;
  closePrayerRequestActions: () => void;
  onExpirationDateModalOpen: () => void;
  onDeleteConfirmationModalOpen: () => void;
  showLeavePrayerGroupModal: boolean;
  isRemoveUserLoading: boolean;
  onRemoveUser: () => void;
  expirationModalPrayerRequest: PrayerRequestModel | undefined;
  isExpirationModalOpen: boolean;
  onExpirationDateModalClose: () => void;
  prayerRequestIdToDelete: number | undefined;
  isDeleteConfirmationModalOpen: boolean;
  onDeleteConfirmationModalClose: () => void;
};

export const PrayerGroupActionsContainer: React.FC<
  PrayerGroupActionsContainerProps
> = ({
  prayerGroupDetails,
  setShowLeavePrayerGroupModal,
  isPrayerGroupOptionsOpen,
  isPrayerRequestActionsOpen,
  setIsPrayerGroupOptionsOpen,
  selectedPrayerRequest,
  showExtendedActions,
  closePrayerRequestActions,
  onExpirationDateModalOpen,
  onDeleteConfirmationModalOpen,
  showLeavePrayerGroupModal,
  isRemoveUserLoading,
  onRemoveUser,
  expirationModalPrayerRequest,
  isExpirationModalOpen,
  onExpirationDateModalClose,
  prayerRequestIdToDelete,
  isDeleteConfirmationModalOpen,
  onDeleteConfirmationModalClose,
}) => {
  return (
    <>
      <PrayerGroupOptions
        prayerGroupDetails={prayerGroupDetails}
        setShowLeavePrayerGroupModal={setShowLeavePrayerGroupModal}
        isOpen={isPrayerGroupOptionsOpen}
        onClose={() => setIsPrayerGroupOptionsOpen(false)}
      />

      <PrayerRequestActions
        isOpen={isPrayerRequestActionsOpen}
        showExtendedActions={showExtendedActions}
        selectedPrayerRequest={selectedPrayerRequest}
        onClose={closePrayerRequestActions}
        openEditExpirationModal={onExpirationDateModalOpen}
        openDeletePrayerRequestModal={onDeleteConfirmationModalOpen}
      />

      {showLeavePrayerGroupModal && (
        <LeavePrayerGroupModal
          isRemoveUserLoading={isRemoveUserLoading}
          onRemoveUser={onRemoveUser}
          onCancel={() => setShowLeavePrayerGroupModal(false)}
        />
      )}

      <EditExpirationDateModal
        prayerRequest={expirationModalPrayerRequest}
        isOpen={isExpirationModalOpen}
        onClose={onExpirationDateModalClose}
      />

      <DeletePrayerRequestModal
        prayerRequestIdToDelete={prayerRequestIdToDelete}
        isOpen={isDeleteConfirmationModalOpen}
        onClose={onDeleteConfirmationModalClose}
      />
    </>
  );
};
