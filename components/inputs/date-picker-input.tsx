import * as React from "react";
import classnames from "classnames";
import { DatePickerInput as PaperDatePickerInput } from "react-native-paper-dates";
import { SupportedLanguages } from "../../types/languages";
import { useField, useFormikContext } from "formik";
import { View } from "react-native";
import { HelperText, useTheme } from "react-native-paper";
import { DatePickerValidRange } from "../../types/inputs/select";
import _, { isDate } from "lodash";
import { formatDate } from "../../helpers/common/format-helpers";
import { DATE_INPUT_FORMAT_OPTIONS } from "../../constants/common/input-constants";
import { isDateStringValid } from "../../helpers/common/validation-helpers";

interface Props {
  name: string;
  locale: SupportedLanguages;
  label: string;
  mode: "flat" | "outlined";
  onChange?: (value?: Date) => void;
  containerClassName?: string;
  required?: boolean;
  validRange?: DatePickerValidRange;
  invalidDateError: string;
}

export const DatePickerInput: React.FC<Props> = ({
  name,
  locale,
  label,
  mode,
  onChange,
  containerClassName,
  required,
  invalidDateError,
}) => {
  const [field, meta, helpers] = useField<Date | undefined>(name);
  const theme = useTheme();

  const getDateFormatValue = (value?: Date) => {
    return value
      ? formatDate(value, locale, DATE_INPUT_FORMAT_OPTIONS)
      : undefined;
  };

  const [textFieldStr, setTextFieldStr] = React.useState<string | undefined>(
    getDateFormatValue(field.value)
  );
  const [dateStrValid, setDateStrValid] = React.useState<boolean>(true);

  const isError = !!((meta.error || !dateStrValid) && meta.touched);
  const inputLabel = required ? `${label} *` : label;

  const handleBlur = () => {
    helpers.setTouched(true, true);
    setDateStrValid(isDateStringValid(locale, textFieldStr));
  };

  return (
    <View className={containerClassName}>
      <PaperDatePickerInput
        className={classnames({ "bg-red-200": isError })}
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
          setTextFieldStr(getDateFormatValue(value));
          setDateStrValid(true);
        }}
        onChangeText={(value) => {
          setTextFieldStr(value);
        }}
        onBlur={handleBlur}
        textColor={isError ? theme.colors.error : undefined}
      />
      {isError && <HelperText type="error">{meta.error}</HelperText>}
    </View>
  );
};
