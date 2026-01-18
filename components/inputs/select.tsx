import * as React from "react";
import { Dropdown } from "react-native-paper-dropdown";

import { DropdownOption } from "../../types/inputs/dropdown";

type Props = {
  value: any;
  label: string;
  setValue: (value: any) => void;
  mode?: "outlined" | "flat";
  options: DropdownOption<any>[];
  error?: boolean;
};

export function Select({
  label,
  mode,
  value,
  setValue,
  options,
  error,
}: Props) {
  return (
    <Dropdown
      label={label}
      value={value}
      onSelect={setValue}
      mode={mode ?? "outlined"}
      options={options}
      error={error}
    />
  );
}
