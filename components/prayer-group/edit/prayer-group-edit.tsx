import { Formik } from "formik";
import * as React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../../hooks/use-i18n";
import { GroupPreview } from "../../layouts/group-preview";
import { usePrayerGroupContext } from "../prayer-group-context";
import { PrayerGroupSectionHeader } from "../section-header/prayer-group-section-header";

export const PrayerGroupEdit: React.FC = () => {
  const theme = useTheme();
  const { translate } = useI18N();
  const { prayerGroupDetails } = usePrayerGroupContext();

  return (
    <SafeAreaView
      className="flex flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      <PrayerGroupSectionHeader
        title={translate("prayerGroup.edit.header", {
          groupName: prayerGroupDetails?.groupName,
        })}
      />

      <ScrollView automaticallyAdjustKeyboardInsets className="p-4">
        <Formik
          initialValues={prayerGroupDetails ?? {}}
          onSubmit={() => {}}
          validateOnBlur
          validateOnChange={false}
        >
          {({ values }) => (
            <>
              <GroupPreview
                profilePictureUri={values?.imageFile?.url}
                bannerUri={values?.bannerImageFile?.url}
                groupName={values?.groupName ?? ""}
                description={values?.description ?? ""}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};
