import * as React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { DismissButton } from "../inputs/dismiss-button";
import { RoundedModal } from "../modals/rounded-modal";
import { PrayerRequestPageTestIds } from "./tests/test-ids";

type Props = {
  isOpen: boolean;
  isDeleteLoading: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
};

export const DeletePrayerRequestCommentModal: React.FC<Props> = ({
  isOpen,
  onClose,
  isDeleteLoading,
  onConfirmDelete,
}) => {
  const theme = useTheme();
  const { translate } = useI18N();

  return (
    <RoundedModal
      isOpen={isOpen}
      onClose={onClose}
      title={translate("prayerRequest.comment.deleteComment")}
    >
      <Text variant="bodyLarge">
        {translate("prayerRequest.comment.deleteConfirmation")}
      </Text>

      <View className="flex flex-row self-end mt-6 gap-x-2">
        <DismissButton
          mode="outlined"
          onPress={onClose}
          testID={PrayerRequestPageTestIds.cancelDeleteCommentButton}
        >
          {translate("common.actions.cancel")}
        </DismissButton>
        <DismissButton
          mode="contained"
          buttonColor={theme.colors.error}
          loading={isDeleteLoading}
          onPress={onConfirmDelete}
          testID={PrayerRequestPageTestIds.deleteCommentConfirmButton}
        >
          {translate("common.actions.delete")}
        </DismissButton>
      </View>
    </RoundedModal>
  );
};
