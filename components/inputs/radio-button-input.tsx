import * as React from "react";
import { useField } from "formik";
import { HelperText, RadioButton } from "react-native-paper";
import { View } from "react-native";
import { SelectOption } from "../../types/inputs/select";
import { Text } from "react-native-paper";

interface Props {
  name: string;
  label: string;
  options: SelectOption<number>[];
  onChange?: (value: number) => void;
  containerClassNames?: string;
}

export const RadioButtonInput: React.FC<Props> = ({
  name,
  label,
  onChange,
  options,
  containerClassNames,
}) => {
  const [field, meta, helpers] = useField(name);
  const isError = meta.touched && meta.error;

  const handleChange = (valueStr: string) => {
    const value = Number.parseInt(valueStr);
    helpers.setValue(value);
    helpers.setTouched(true, true);
    onChange?.(value);
  };

  return (
    <View className={containerClassNames}>
      <Text>{label}</Text>
      <RadioButton.Group
        value={field.value.toString()}
        onValueChange={handleChange}
      >
        {options.map((option) => {
          return (
            <View className="flex flex-row items-center" key={option.value}>
              <RadioButton value={option.value.toString()} />
              <Text>{option.label}</Text>
            </View>
          );
        })}
      </RadioButton.Group>
      {isError && <HelperText type="error">{meta.error}</HelperText>}
    </View>
  );
};
