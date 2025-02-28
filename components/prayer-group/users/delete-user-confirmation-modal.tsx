import * as React from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { useI18N } from "../../../hooks/use-i18n";
import { RoundedModal } from "../../modals/rounded-modal";

type Props = {
  userToDeleteName: string | undefined;
  onDelete: () => void;
  onCancel: () => void;
};

export const DeleteUserConfirmationModal: React.FC<Props> = ({
  userToDeleteName,
  onDelete,
  onCancel,
}) => {
  const { translate } = useI18N();
  const theme = useTheme();

  return (
    <RoundedModal
      isOpen
      onClose={onCancel}
      title={translate("prayerGroup.kickUser.header")}
    >
      <Text variant="bodyLarge">
        {translate("prayerGroup.kickUser.warning", {
          fullName: userToDeleteName,
        })}
      </Text>

      <View className="self-end gap-x-4 mt-6 flex-row">
        <Button mode="outlined" onPress={onCancel}>
          {translate("common.actions.cancel")}
        </Button>

        <Button
          mode="contained"
          onPress={onDelete}
          buttonColor={theme.colors.error}
        >
          {translate("prayerGroup.kickUser.label")}
        </Button>
      </View>
    </RoundedModal>
  );
};
