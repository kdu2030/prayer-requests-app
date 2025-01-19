import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useField } from "formik";
import * as React from "react";
import { View } from "react-native";

import { useI18N } from "../../hooks/use-i18n";
import { RoundedModal } from "../modals/rounded-modal";
import { ColorButton } from "./color-button";
import { AVAILABLE_PRAYER_GROUP_COLORS } from "./create-prayer-group-constants";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ColorPickerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { translate } = useI18N();
  const [field, meta, helpers] = useField<string>("color");
  const [color, setColor] = React.useState<string>("#ff0000");

  return (
    <RoundedModal
      isOpen={isOpen}
      onClose={onClose}
      title={translate("createPrayerGroup.groupImageColorStep.selectColor")}
    >
      <>
        <View className="flex flex-row flex-wrap">
          {AVAILABLE_PRAYER_GROUP_COLORS.map((color) => (
            <View className="mr-4 mb-4">
              <ColorButton
                color={color}
                isChecked={color === field?.value}
                onPress={() => {
                  helpers.setValue(color);
                  helpers.setTouched(true);
                }}
              />
            </View>
          ))}
        </View>
      </>
    </RoundedModal>
  );
};
