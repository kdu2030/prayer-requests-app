import { Formik } from "formik";
import * as React from "react";
import { ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Button } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { useCreatePrayerGroupWizard } from "./use-create-prayer-group-wizard";

export const CreatePrayerGroupWizard: React.FC = () => {
  const theme = useTheme();
  const { translate } = useI18N();
  const { getWizardContent, getValidationSchema } =
    useCreatePrayerGroupWizard();

  return (
    <Formik
      initialValues={() => {}}
      onSubmit={() => {}}
      validationSchema={getValidationSchema()}
    >
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <View className="flex flex-col w-full p-4">
          <View className="flex flex-row justify-between">
            <View
              className="flex items-center justify-center px-4 rounded-full"
              style={{
                backgroundColor: theme.colors.primary,
              }}
            >
              <Text className="text-white">
                {translate("wizard.stepCount", {
                  step: "1",
                  total: "2",
                })}
              </Text>
            </View>

            <Button mode="outlined">{translate("wizard.next")}</Button>
          </View>

          <View className="mt-6">{getWizardContent()}</View>
        </View>
      </ScrollView>
    </Formik>
  );
};
