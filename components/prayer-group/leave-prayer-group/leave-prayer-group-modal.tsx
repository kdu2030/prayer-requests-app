import * as React from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { useI18N } from "../../../hooks/use-i18n";
import { RoundedModal } from "../../modals/rounded-modal";
import { View } from "react-native";

type Props = {
  isRemoveUserLoading: boolean;
  onRemoveUser: () => void;
  onCancel: () => void;
};

export const LeavePrayerGroupModal: React.FC<Props> = ({
  isRemoveUserLoading,
  onRemoveUser,
  onCancel,
}) => {
  const { translate } = useI18N();
  const theme = useTheme();

  return (
    <RoundedModal
      isOpen
      onClose={onCancel}
      title={translate("prayerGroup.actions.leavePrayerGroup")}
    >
      <Text variant="bodyLarge">
        {translate("prayerGroup.actions.leavePrayerGroup.confirmation")}
      </Text>

      <View className="self-end gap-x-2 mt-6 flex-row">
        <Button mode="outlined" onPress={onCancel}>
          {translate("common.actions.cancel")}
        </Button>

        <Button
          mode="contained"
          buttonColor={theme.colors.error}
          onPress={onRemoveUser}
          loading={isRemoveUserLoading}
        >
          {translate("common.actions.leave")}
        </Button>
      </View>
    </RoundedModal>
  );
};
