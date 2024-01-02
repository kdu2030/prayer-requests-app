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
}

export const TextInput: React.FC<Props> = ({
  name,
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
        value={field.value}
        className={`${classNames} ${isError ? "bg-red-200" : ""}`}
        onChangeText={(text: string) => {
          helpers.setValue(text);
        }}
        onBlur={() => {
          onBlur();
          helpers.setTouched(true);
        }}
        error={!!isError}
        textColor={isError ? theme.colors.error : undefined}
        {...props}
      />
      {isError && <HelperText type="error">{meta.error}</HelperText>}
    </View>
  );
};
