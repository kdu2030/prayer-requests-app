import * as React from "react";
import DropDown, { DropDownPropsInterface } from "react-native-paper-dropdown";

import { DropdownOption } from "../../types/inputs/dropdown";
import { TextInputProps } from "react-native-paper";

export interface SelectProps {
  value: any;
  label: string;
  setValue: (value: any) => void;
  mode?: "outlined" | "flat";
  onDismiss?: () => void;
  options: DropdownOption<any>[];
  inputProps?: TextInputProps;
}

export const Select: React.FC<SelectProps> = ({
  label,
  mode,
  value,
  setValue,
  options,
  onDismiss,
  inputProps,
}) => {
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
  return (
    <DropDown
      label={label}
      value={value}
      setValue={setValue}
      mode={mode ?? "outlined"}
      visible={showDropdown}
      showDropDown={() => setShowDropdown(true)}
      onDismiss={() => {
        setShowDropdown(false);
        onDismiss?.();
      }}
      list={options}
      inputProps={{ ...inputProps }}
    />
  );
};
