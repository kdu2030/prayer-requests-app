import { Formik } from "formik";
import * as React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, useTheme } from "react-native-paper";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../../hooks/use-i18n";
import { TextInput } from "../../inputs/text-input";
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

      <ScrollView automaticallyAdjustKeyboardInsets>
        <View className="p-4">
          <Formik
            initialValues={prayerGroupDetails ?? {}}
            onSubmit={() => {}}
            validateOnBlur
            validateOnChange={false}
          >
            {({ values }) => (
              <>
                <Button mode="contained" className="self-end">
                  {translate("common.actions.save")}
                </Button>

                <Text className="font-bold mb-2" variant="bodyLarge">
                  {translate("common.actions.preview")}
                </Text>

                <GroupPreview
                  profilePictureUri={values?.imageFile?.url}
                  bannerUri={values?.bannerImageFile?.url}
                  groupName={values?.groupName ?? ""}
                  description={values?.description ?? ""}
                />

                <Text className="font-bold mt-4" variant="bodyLarge">
                  {translate("prayerGroup.options.about")}
                </Text>

                <TextInput
                  name="groupName"
                  className="mt-2"
                  label={translate(
                    "createPrayerGroup.groupNameDescription.groupName"
                  )}
                  required
                />

                <TextInput
                  name="description"
                  className="mt-4"
                  label={translate(
                    "createPrayerGroup.groupNameDescription.description"
                  )}
                  multiline
                  numberOfLines={5}
                  required
                />

                <TextInput
                  name="rules"
                  className="mt-4"
                  label={translate("createPrayerGroup.rules.label")}
                  multiline
                  numberOfLines={5}
                  required
                />

                <Text variant="bodyLarge" className="font-bold mt-4">
                  {translate("prayerGroup.edit.images")}
                </Text>

                <View className="mt-4 flex flex-row items-center">
                  <Text variant="bodyLarge" className="w-1/2">
                    {translate("createPrayerGroup.groupImageColorStep.image")}
                  </Text>
                  <Button mode="outlined" className="w-1/2">
                    {translate(
                      "createPrayerGroup.groupImageColorStep.selectImage"
                    )}
                  </Button>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
