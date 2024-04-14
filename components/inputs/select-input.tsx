import * as React from "react";
import { Select } from "./select";
import { useField } from "formik";
import { HelperText, TextInputProps } from "react-native-paper";
import { View } from "react-native";
import { DropdownOption } from "../../types/inputs/dropdown";
import { useTheme } from "react-native-paper";

interface Props {
  name: string;
  label: string;
  mode?: "flat" | "outlined";
  containerClassNames?: string;
  options: DropdownOption[];
  required?: boolean;
}

export const SelectInput: React.FC<Props> = ({
  name,
  containerClassNames,
  options,
  label,
  mode,
  required,
}) => {
  const theme = useTheme();
  const [field, meta, helpers] = useField(name);
  const isError = meta.touched && meta.error;
  const errorStyles: TextInputProps = {
    error: true,
    textColor: theme.colors.error,
    style: {
      backgroundColor: "rgb(254, 202, 202)",
    },
  };

  return (
    <View className={containerClassNames}>
      <Select
        value={field.value}
        label={required ? `${label} *` : label}
        setValue={(value) => helpers.setValue(value)}
        onDismiss={() => helpers.setTouched(true, true)}
        inputProps={!!isError ? errorStyles : undefined}
        options={options}
        mode={mode}
      />
      {isError && <HelperText type="error">{meta.error}</HelperText>}
    </View>
  );
};
