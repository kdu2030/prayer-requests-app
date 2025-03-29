import { useField } from "formik";
import * as React from "react";
import { View } from "react-native";
import {
  HelperText,
  TextInput as PaperTextInput,
  TextInputProps,
} from "react-native-paper";
import { useTheme } from "react-native-paper";

interface Props extends TextInputProps {
  name: string;
  inputClassNames?: string;
  containerClassNames?: string;
  onBlur?: () => void;
  required?: boolean;
}

export const TextInput: React.FC<Props> = ({
  name,
  label,
  required,
  inputClassNames = "",
  containerClassNames = "",
  onBlur = () => {},
  testID,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const isError = meta.touched && meta.error;
  const theme = useTheme();

  return (
    <View className={containerClassNames} testID={`${testID}-container`}>
      <PaperTextInput
        label={required ? `${label} *` : label}
        value={field.value ?? ""}
        className={`${inputClassNames} ${isError ? "bg-red-200" : ""}`}
        onChangeText={(text: string) => {
          helpers.setValue(text);
        }}
        onBlur={() => {
          onBlur();
          helpers.setTouched(true, true);
        }}
        error={!!isError}
        textColor={isError ? theme.colors.error : undefined}
        testID={testID}
        {...props}
      />
      {isError && <HelperText type="error">{meta.error}</HelperText>}
    </View>
  );
};
