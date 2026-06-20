import { Formik } from "formik";
import * as React from "react";
import { ScrollView } from "react-native";
import { useTheme } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { TextInput } from "../inputs/text-input";
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
  const { initialValues, requestDescriptionRef } =
    usePrayerRequestEditPage(prayerRequestId);

  return (
    <PrayerGroupContentContainer title={translate("prayerRequest.edit.label")}>
      <Formik initialValues={initialValues ?? {}} onSubmit={() => {}}>
        <ScrollView
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={{
            display: "flex",
            flexGrow: 1,
            backgroundColor: theme.colors.background,
          }}
        >
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
            style={{ height: 200 }}
          />
        </ScrollView>
      </Formik>
    </PrayerGroupContentContainer>
  );
}
