import { useField } from "formik";
import * as React from "react";
import { View } from "react-native";
import { HelperText } from "react-native-paper";

import { DropdownOption } from "../../types/inputs/dropdown";
import { Select } from "./select";

type Props<TValue> = {
  name: string;
  label: string;
  options: DropdownOption<TValue>[];
  onBlur?: () => void;
  required?: boolean;
  mode?: "outlined" | "flat";
  containerClassName?: string;
};

export const FormikSelect = <TValue,>({
  name,
  label,
  options,
  required,
  mode,
  containerClassName,
}: Props<TValue>) => {
  const [field, meta, helpers] = useField<TValue | undefined>(name);
  const isError = !!(meta.touched && meta.error);

  return (
    <View className={containerClassName}>
      <Select
        mode={mode}
        label={required ? `${label}*` : label}
        options={options}
        value={field.value}
        setValue={(value) => helpers.setValue(value)}
        onDismiss={() => setTimeout(() => helpers.setTouched(true, true), 0)}
        error={isError}
      />

      {isError && <HelperText type="error">{meta.error}</HelperText>}
    </View>
  );
};
