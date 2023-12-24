import * as React from "react";
import DropDown from "react-native-paper-dropdown";
import { DropdownOption } from "../../types/inputs/dropdown";

type Props = {
  value: any;
  label: string;
  setValue: (value: any) => void;
  mode?: "outlined" | "flat";
  options: DropdownOption<any>[];
};

export function Select({ label, mode, value, setValue, options }: Props) {
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
  return (
    <DropDown
      label={label}
      value={value}
      setValue={setValue}
      mode={mode ?? "outlined"}
      visible={showDropdown}
      showDropDown={() => setShowDropdown(true)}
      onDismiss={() => setShowDropdown(false)}
      list={options}
    />
  );
}
