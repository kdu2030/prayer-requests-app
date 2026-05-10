import * as React from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { RoundedModal } from "../modals/rounded-modal";

type Props = {
  onClose: () => void;
};

export const DeletePrayerRequestCommentModal: React.FC<Props> = ({
  onClose,
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
        <Button mode="outlined" onPress={onClose}>
          {translate("common.actions.cancel")}
        </Button>
        <Button mode="contained" buttonColor={theme.colors.error}>
          {translate("common.actions.delete")}
        </Button>
      </View>
    </RoundedModal>
  );
};
