import * as React from "react";
import classnames from "classnames";
import { DatePickerInput as PaperDatePickerInput } from "react-native-paper-dates";
import { SupportedLanguages } from "../../types/languages";
import { useField, useFormikContext } from "formik";
import { View } from "react-native";
import { HelperText, useTheme } from "react-native-paper";
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
  const [_textField, textFieldMeta, textFieldHelpers] =
    useField<string>(textInputName);
  const theme = useTheme();

  const { setFieldValue, values } = useFormikContext();
  const [textFieldStr, setTextFieldStr] = React.useState<string | undefined>(
    _.get(values, textInputName)
  );

  const isError = !!(meta.error && meta.touched);
  const isTextFieldError = !!(textFieldMeta.error && textFieldMeta.touched);
  const isFieldError = isError || isTextFieldError;

  const inputLabel = required ? `${label} *` : label;

  const handleBlur = () => {
    setFieldValue(textInputName, textFieldStr);
    textFieldHelpers.setTouched(true, true);
  };

  const getError = () => {
    return isError ? meta.error : textFieldMeta.error;
  };

  return (
    <View className={containerClassName}>
      <PaperDatePickerInput
        className={classnames({ "bg-red-200": isFieldError })}
        locale={locale}
        label={inputLabel}
        inputMode="start"
        mode={mode}
        value={field.value}
        hasError={isFieldError}
        onChange={(value) => {
          helpers.setValue(value);
          helpers.setTouched(true, true);

          onChange?.(value);
        }}
        onChangeText={(value) => {
          setTextFieldStr(value);
        }}
        onBlur={handleBlur}
        textColor={isFieldError ? theme.colors.error : undefined}
      />
      {isFieldError && <HelperText type="error">{getError()}</HelperText>}
    </View>
  );
};
