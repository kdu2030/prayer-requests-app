import * as React from "react";
import DropDown, { DropDownPropsInterface } from "react-native-paper-dropdown";

import { DropdownOption } from "../../types/inputs/dropdown";

export interface SelectProps extends Omit<DropDownPropsInterface, "onDismiss"> {
  value: any;
  label: string;
  setValue: (value: any) => void;
  mode?: "outlined" | "flat";
  onDismiss?: () => void;
  options: DropdownOption<any>[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  mode,
  value,
  setValue,
  options,
  onDismiss,
  ...props
}) => {
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
  return (
    <DropDown
      {...props}
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
    />
  );
};
