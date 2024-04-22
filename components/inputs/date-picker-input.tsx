import * as React from "react";
import classnames from "classnames";
import { DatePickerInput as PaperDatePickerInput } from "react-native-paper-dates";
import { SupportedLanguages } from "../../types/languages";
import { useField, useFormikContext } from "formik";
import { View } from "react-native";
import { HelperText, useTheme } from "react-native-paper";
import { DatePickerValidRange } from "../../types/inputs/select";
import _ from "lodash";
import { formatDate } from "../../helpers/common/format-helpers";
import { DATE_INPUT_FORMAT_OPTIONS } from "../../constants/common/input-constants";

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
  const [field, meta, helpers] = useField<Date | undefined>(name);
  const [_textField, textFieldMeta, textFieldHelpers] = useField<
    string | undefined
  >(textInputName);

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
    setFieldValue(textInputName, textFieldStr, true);
    textFieldHelpers.setTouched(true, false);
  };

  const setDateStrValueFromDate = (value?: Date) => {
    const dateStrValue = value
      ? formatDate(value, locale, DATE_INPUT_FORMAT_OPTIONS)
      : undefined;

    textFieldHelpers.setValue(dateStrValue, true);
    setTextFieldStr(dateStrValue);
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

          setDateStrValueFromDate(value);
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
