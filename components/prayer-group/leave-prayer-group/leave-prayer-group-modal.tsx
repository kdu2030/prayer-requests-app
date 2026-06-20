import * as React from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { useI18N } from "../../../hooks/use-i18n";
import { RoundedModal } from "../../modals/rounded-modal";

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
        <DismissButton mode="outlined" onPress={onCancel}>
          {translate("common.actions.cancel")}
        </DismissButton>

        <DismissButton
          mode="contained"
          buttonColor={theme.colors.error}
          onPress={onRemoveUser}
          loading={isRemoveUserLoading}
        >
          {translate("common.actions.leave")}
        </DismissButton>
      </View>
    </RoundedModal>
  );
};
