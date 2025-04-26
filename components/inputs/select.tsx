import * as React from "react";
import { ViewStyle } from "react-native";
import DropDown from "react-native-paper-dropdown";

import { DropdownOption } from "../../types/inputs/dropdown";

type Props = {
  value: any;
  label: string;
  setValue: (value: any) => void;
  mode?: "outlined" | "flat";
  options: DropdownOption<any>[];
  onShow?: () => void;
  onDismiss?: () => void;
  dropdownStyle?: ViewStyle;
  error?: boolean;
};

export function Select({
  label,
  mode,
  value,
  setValue,
  options,
  onShow,
  onDismiss,
  dropdownStyle,
  error,
}: Props) {
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
  return (
    <DropDown
      label={label}
      value={value}
      setValue={setValue}
      mode={mode ?? "outlined"}
      visible={showDropdown}
      showDropDown={() => {
        setShowDropdown(true);
        onShow?.();
      }}
      onDismiss={() => {
        setShowDropdown(false);
        onDismiss?.();
      }}
      list={options}
      dropDownStyle={dropdownStyle}
      inputProps={
        error
          ? { error: true, style: { backgroundColor: "#fecaca" } }
          : undefined
      }
    />
  );
}
