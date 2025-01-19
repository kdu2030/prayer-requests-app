import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useField } from "formik";
import * as React from "react";

import { useI18N } from "../../hooks/use-i18n";
import { RoundedModal } from "../modals/rounded-modal";
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
      <FontAwesome
        name="circle"
        size={44}
        color={AVAILABLE_PRAYER_GROUP_COLORS[0]}
      />
    </RoundedModal>
  );
};
