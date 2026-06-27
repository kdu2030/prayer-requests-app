import * as React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { DismissButton } from "../inputs/dismiss-button";
import { RoundedModal } from "../modals/rounded-modal";

type DeletePrayerRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function DeletePrayerRequestModal({
  isOpen,
  onClose,
}: DeletePrayerRequestModalProps) {
  const { translate } = useI18N();
  const theme = useTheme();

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
            onPress={() => {}}
            buttonColor={theme.colors.error}
          >
            {translate("common.actions.delete")}
          </DismissButton>
        </View>
      </View>
    </RoundedModal>
  );
}
