import { Formik } from "formik";
import * as React from "react";
import { ScrollView, View } from "react-native";
import { Button, useTheme } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { TextInput } from "../inputs/text-input";
import { useRequestBodyValidationSchema } from "../prayer-group/create-prayer-request/request-body-step/use-request-body-validation-schema";
import { PrayerGroupContentContainer } from "../prayer-group/section-header/prayer-group-content-container";
import { usePrayerRequestEditPage } from "./use-prayer-request-edit-page";

type PrayerRequestEditPageProps = {
  prayerRequestId: number;
};

export function PrayerRequestEditPage({
  prayerRequestId,
}: PrayerRequestEditPageProps) {
  const { translate } = useI18N();
  const theme = useTheme();

  const {
    initialValues,
    requestDescriptionRef,
    isEditLoading,
    saveEditPrayerRequest,
  } = usePrayerRequestEditPage(prayerRequestId);

  const validationSchema = useRequestBodyValidationSchema();

  return (
    <PrayerGroupContentContainer title={translate("prayerRequest.edit.label")}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues ?? {}}
        onSubmit={saveEditPrayerRequest}
      >
        {({ submitForm }) => (
          <ScrollView
            automaticallyAdjustKeyboardInsets
            contentContainerStyle={{
              display: "flex",
              flexGrow: 1,
              backgroundColor: theme.colors.background,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="p-4">
              <View className="flex flex-row w-full mb-2 justify-end">
                <DismissButton
                  mode="contained"
                  onPress={submitForm}
                  loading={isEditLoading}
                >
                  {translate("common.actions.save")}
                </DismissButton>
              </View>

              <TextInput
                mode="outlined"
                name="requestTitle"
                placeholder={translate("prayerGroup.request.title")}
                contentStyle={{ fontWeight: "bold", fontSize: 20 }}
                outlineStyle={{ borderColor: theme.colors.background }}
                errorClassNames="mb-3"
              />

              <TextInput
                mode="outlined"
                name="requestDescription"
                placeholder={translate(
                  "createPrayerGroup.groupNameDescription.description",
                )}
                outlineStyle={{ borderColor: theme.colors.background }}
                multiline
                contentStyle={{ paddingTop: 16 }}
                customRef={requestDescriptionRef}
                style={{ minHeight: 200 }}
              />
            </View>
          </ScrollView>
        )}
      </Formik>
    </PrayerGroupContentContainer>
  );
}
