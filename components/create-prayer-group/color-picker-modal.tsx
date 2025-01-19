import * as React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { RoundedModal } from "../modals/rounded-modal";
import { ColorButton } from "./color-button";
import { AVAILABLE_PRAYER_GROUP_COLORS } from "./create-prayer-group-constants";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onSave: (selectedColor?: string) => void;
  initialColor?: string;
};

export const ColorPickerModal: React.FC<Props> = ({
  isOpen,
  onCancel,
  initialColor,
  onSave,
}) => {
  const { translate } = useI18N();
  const [color, setColor] = React.useState<string | undefined>(initialColor);

  return (
    <RoundedModal
      isOpen={isOpen}
      onClose={onCancel}
      title={translate("createPrayerGroup.groupImageColorStep.selectColor")}
    >
      <>
        <View className="flex flex-row flex-wrap self-center">
          {AVAILABLE_PRAYER_GROUP_COLORS.map((colorOption) => (
            <View className="mr-4 mb-4">
              <ColorButton
                color={colorOption}
                isChecked={colorOption === color}
                onPress={() => {
                  setColor(colorOption);
                }}
              />
            </View>
          ))}
        </View>

        <View className="flex flex-row mt-4 justify-between gap-4">
          <Button className="flex-1" mode="outlined" onPress={onCancel}>
            {translate("common.actions.cancel")}
          </Button>
          <Button
            className="flex-1"
            mode="contained"
            onPress={() => onSave(color)}
          >
            {translate("common.actions.save")}
          </Button>
        </View>
      </>
    </RoundedModal>
  );
};
