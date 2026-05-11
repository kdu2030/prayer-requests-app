import * as React from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { RoundedModal } from "../modals/rounded-modal";
import { PrayerRequestPageTestIds } from "./tests/test-ids";

type Props = {
  isDeleteLoading: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
};

export const DeletePrayerRequestCommentModal: React.FC<Props> = ({
  onClose,
  isDeleteLoading,
  onConfirmDelete,
}) => {
  const theme = useTheme();
  const { translate } = useI18N();

  return (
    <RoundedModal
      isOpen
      onClose={onClose}
      title={translate("prayerRequest.comment.deleteComment")}
    >
      <Text variant="bodyLarge">
        {translate("prayerRequest.comment.deleteConfirmation")}
      </Text>

      <View className="flex flex-row self-end mt-6 gap-x-2">
        <Button
          mode="outlined"
          onPress={onClose}
          testID={PrayerRequestPageTestIds.cancelDeleteCommentButton}
        >
          {translate("common.actions.cancel")}
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.error}
          loading={isDeleteLoading}
          onPress={onConfirmDelete}
          testID={PrayerRequestPageTestIds.deleteCommentConfirmButton}
        >
          {translate("common.actions.delete")}
        </Button>
      </View>
    </RoundedModal>
  );
};
