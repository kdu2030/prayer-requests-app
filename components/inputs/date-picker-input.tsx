import * as React from "react";
import { DatePickerInput as PaperDatePickerInput } from "react-native-paper-dates";
import { SupportedLanguages } from "../../types/languages";
import { useField } from "formik";
import { View } from "react-native";
import { HelperText } from "react-native-paper";

interface Props {
  name: string;
  locale: SupportedLanguages;
  label: string;
  mode: "flat" | "outlined";
  onChange?: (value?: Date) => void;
  containerClassName?: string;
  required?: boolean;
}

export const DatePickerInput: React.FC<Props> = ({
  name,
  locale,
  label,
  mode,
  onChange,
  containerClassName,
  required,
}) => {
  // Datepicker requires a fixed width style to display properly
  const [field, meta, helpers] = useField<Date | undefined>(name);
  const isError = !!(meta.error && meta.touched);
  const inputLabel = required ? `${label} *` : label;

  return (
    <View className={containerClassName}>
      <PaperDatePickerInput
        locale={locale}
        label={inputLabel}
        inputMode="end"
        mode={mode}
        value={field.value}
        hasError={isError}
        onChange={(value) => {
          helpers.setValue(value);
          helpers.setTouched(true, true);

          onChange?.(value);
        }}
        onChangeText={(value) => {
          // TODO: Add handling for when user inputs invalid date
        }}
      />
      {isError && <HelperText type="error">{meta.error}</HelperText>}
    </View>
  );
};
