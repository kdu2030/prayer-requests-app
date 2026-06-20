import { Formik } from "formik";
import * as React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";

import { useI18N } from "../../../hooks/use-i18n";
import { PrayerGroupContentContainer } from "../section-header/prayer-group-content-container";
import { useCreatePrayerRequestWizard } from "./use-create-prayer-request-wizard";

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
      <PrayerGroupContentContainer
        title={translate("prayerGroup.actions.addPrayerRequest")}
      >
        <ScrollView
          contentContainerStyle={{
            display: "flex",
            flexGrow: 1,
            backgroundColor: theme.colors.background,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex flex-col p-4">
            <>{getPrayerRequestWizardContent()}</>
          </View>
        </ScrollView>
      </PrayerGroupContentContainer>
    </Formik>
  );
};
