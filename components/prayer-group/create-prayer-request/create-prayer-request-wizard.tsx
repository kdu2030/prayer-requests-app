import { Formik } from "formik";
import * as React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../../hooks/use-i18n";
import { PrayerGroupSectionHeader } from "../section-header/prayer-group-section-header";
import { useCreatePrayerRequestWizard } from "./use-create-prayer-request-wizard";
import { VisibilityLevel } from "../../../constants/prayer-group-constants";

export const CreatePrayerRequestWizard: React.FC = () => {
  const theme = useTheme();

  const { translate } = useI18N();
  const {
    getPrayerRequestWizardContent,
    getPrayerRequestValidationSchema,
    formikRef,
  } = useCreatePrayerRequestWizard();

  return (
    <Formik
      initialValues={{}}
      validationSchema={getPrayerRequestValidationSchema()}
      onSubmit={() => {}}
      innerRef={formikRef}
    >
      <SafeAreaView style={{ display: "flex", flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            display: "flex",
            flexGrow: 1,
            backgroundColor: theme.colors.background,
          }}
        >
          <PrayerGroupSectionHeader
            title={translate("prayerGroup.actions.addPrayerRequest")}
          />
          <View className="flex flex-col p-4">
            <>{getPrayerRequestWizardContent()}</>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Formik>
  );
};
