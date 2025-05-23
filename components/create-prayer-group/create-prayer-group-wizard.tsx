import { Formik } from "formik";
import * as React from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DEFAULT_COLOR } from "./create-prayer-group-constants";
import { useCreatePrayerGroupWizard } from "./use-create-prayer-group-wizard";

export const CreatePrayerGroupWizard: React.FC = () => {
  const theme = useTheme();
  const { getWizardContent, getValidationSchema, formikRef } =
    useCreatePrayerGroupWizard();
  const insets = useSafeAreaInsets();

  return (
    <Formik
      initialValues={{ color: DEFAULT_COLOR }}
      onSubmit={() => {}}
      validationSchema={getValidationSchema()}
      innerRef={formikRef}
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
