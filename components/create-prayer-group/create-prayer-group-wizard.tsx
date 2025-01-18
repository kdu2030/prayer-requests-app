import { Formik } from "formik";
import * as React from "react";
import { ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Button } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { useCreatePrayerGroupWizard } from "./use-create-prayer-group-wizard";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const CreatePrayerGroupWizard: React.FC = () => {
  const theme = useTheme();
  const { translate } = useI18N();
  const { getWizardContent, getValidationSchema } =
    useCreatePrayerGroupWizard();
  const insets = useSafeAreaInsets();

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
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        <View className="flex flex-col w-full p-4">
          <View>{getWizardContent()}</View>
        </View>
      </ScrollView>
    </Formik>
  );
};
