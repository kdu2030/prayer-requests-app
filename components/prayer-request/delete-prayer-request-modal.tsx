import * as React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { DismissButton } from "../inputs/dismiss-button";
import { RoundedModal } from "../modals/rounded-modal";
import { useDeletePrayerRequestModal } from "./use-delete-prayer-request-modal";

type DeletePrayerRequestModalProps = {
  isOpen: boolean;
  prayerRequestIdToDelete: number | undefined;
  onClose: () => void;
  onDeleteSuccess?: (deletedPrayerRequestId: number) => void;
};

export function DeletePrayerRequestModal({
  isOpen,
  prayerRequestIdToDelete,
  onClose,
  onDeleteSuccess,
}: DeletePrayerRequestModalProps) {
  const { translate } = useI18N();
  const theme = useTheme();

  const { isDeleteLoading, onDeletePrayerRequest } =
    useDeletePrayerRequestModal(
      prayerRequestIdToDelete,
      onClose,
      onDeleteSuccess,
    );

  return (
    <RoundedModal
      isOpen={isOpen}
      title={translate("prayerRequest.deletePrayerRequest.label")}
      onClose={onClose}
    >
      <View>
        <Text variant="bodyLarge" className="mb-6">
          {translate("prayerRequest.deletePrayerRequest.warning")}
        </Text>

        <View className="flex flex-row gap-2 self-end">
          <DismissButton mode="outlined" onPress={onClose}>
            {translate("common.actions.cancel")}
          </DismissButton>

          <DismissButton
            mode="contained"
            onPress={onDeletePrayerRequest}
            buttonColor={theme.colors.error}
            loading={isDeleteLoading}
          >
            {translate("common.actions.delete")}
          </DismissButton>
        </View>
      </View>
    </RoundedModal>
  );
}
