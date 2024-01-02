import * as React from "react";
import {
  TextInput as PaperTextInput,
  TextInputProps,
  HelperText,
} from "react-native-paper";
import { useField } from "formik";
import { useTheme } from "react-native-paper";
import { View } from "react-native";

interface Props extends TextInputProps {
  name: string;
  classNames?: string;
  containerClassNames?: string;
  onBlur?: () => void;
  required?: boolean;
}

export const TextInput: React.FC<Props> = ({
  name,
  label,
  required,
  classNames = "",
  containerClassNames = "",
  onBlur = () => {},
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const isError = meta.touched && meta.error;
  const theme = useTheme();

  return (
    <View className={containerClassNames}>
      <PaperTextInput
        label={required ? `${label} *` : label}
        value={field.value}
        className={`${classNames} ${isError ? "bg-red-200" : ""}`}
        onChangeText={(text: string) => {
          helpers.setValue(text);
        }}
        onBlur={() => {
          onBlur();
          if (!meta.touched) {
            helpers.setTouched(true);
          }
        }}
        error={!!isError}
        textColor={isError ? theme.colors.error : undefined}
        {...props}
      />
      {isError && <HelperText type="error">{meta.error}</HelperText>}
    </View>
  );
};
