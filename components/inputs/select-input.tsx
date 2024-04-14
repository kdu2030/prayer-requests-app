import * as React from "react";
import { Select, SelectProps } from "./select";
import { useField } from "formik";
import { HelperText, useTheme } from "react-native-paper";
import { View } from "react-native";

interface Props extends SelectProps {
  name: string;
  containerClassNames?: string;
}

export const SelectInput: React.FC<Props> = ({
  name,
  containerClassNames,
  ...props
}) => {
  const theme = useTheme();
  const [field, meta, helpers] = useField(name);
  const isError = meta.touched && meta.error;

  return (
    <View className={containerClassNames}>
      <Select
        {...props}
        value={field.value}
        setValue={(value) => helpers.setValue(value)}
        onDismiss={() => helpers.setTouched(true, true)}
        inputProps={{ error: !!isError }}
        dropDownItemSelectedTextStyle={{ color: theme.colors.error }}
      />
      {isError && <HelperText type="error">{meta.error}</HelperText>}
    </View>
  );
};
