import { useField, useFormikContext } from "formik";
import * as React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import ColorPicker, { HueSlider, Panel1 } from "reanimated-color-picker";

import { useI18N } from "../../hooks/use-i18n";
import { RoundedModal } from "../modals/rounded-modal";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";

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
      <ColorPicker
        value={color}
        sliderThickness={25}
        thumbSize={24}
        thumbShape="circle"
        onChange={(color) => {
          setColor(color.hex);
        }}
        boundedThumb
      >
        <Panel1 style={{ borderRadius: 16, shadowColor: "#000" }} />
        <HueSlider />
      </ColorPicker>
    </RoundedModal>
  );
};
