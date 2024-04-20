import * as React from "react";
import { DatePickerInput as PaperDatePickerInput } from "react-native-paper-dates";
import { SupportedLanguages } from "../../types/languages";
import { useField, useFormikContext } from "formik";
import { View } from "react-native";
import { HelperText } from "react-native-paper";
import { DatePickerValidRange } from "../../types/inputs/select";
import _ from "lodash";

interface Props {
  name: string;
  textInputName: string;
  locale: SupportedLanguages;
  label: string;
  mode: "flat" | "outlined";
  onChange?: (value?: Date) => void;
  containerClassName?: string;
  required?: boolean;
  validRange?: DatePickerValidRange;
}

export const DatePickerInput: React.FC<Props> = ({
  name,
  locale,
  label,
  mode,
  onChange,
  containerClassName,
  required,
  textInputName,
}) => {
  // Datepicker requires a fixed width style to display properly
  const [field, meta, helpers] = useField<Date | undefined>(name);
  const { setFieldValue, values } = useFormikContext();
  const [textFieldStr, setTextFieldStr] = React.useState<string | undefined>(
    _.get(values, textInputName)
  );

  const isError = !!(meta.error && meta.touched);
  const inputLabel = required ? `${label} *` : label;

  const handleBlur = () => {
    setFieldValue(textInputName, textFieldStr);
  };

  return (
    <View className={containerClassName}>
      <PaperDatePickerInput
        locale={locale}
        label={inputLabel}
        inputMode="start"
        mode={mode}
        value={field.value}
        hasError={isError}
        onChange={(value) => {
          helpers.setValue(value);
          helpers.setTouched(true, true);

          onChange?.(value);
        }}
        onChangeText={(value) => {
          setTextFieldStr(value);
        }}
        onBlur={handleBlur}
      />
      {isError && <HelperText type="error">{meta.error}</HelperText>}
    </View>
  );
};
