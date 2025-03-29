import { Formik } from "formik";
import * as React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, HelperText, useTheme } from "react-native-paper";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { TEXT_INPUT_MAX_LENGTH } from "../../../constants/input-constants";
import { PrayerGroupRole } from "../../../constants/prayer-group-constants";
import { useI18N } from "../../../hooks/use-i18n";
import { SupportedLanguages } from "../../../types/languages";
import { TextInput } from "../../inputs/text-input";
import { ErrorSnackbar } from "../../layouts/error-snackbar";
import { GroupPreview } from "../../layouts/group-preview";
import { SelectedImageCard } from "../../layouts/selected-image-card";
import { PrayerGroupPermissionError } from "../error-screens/user-permission-error";
import { usePrayerGroupContext } from "../prayer-group-context";
import { PrayerGroupSectionHeader } from "../section-header/prayer-group-section-header";
import { prayerGroupDetailsValidationSchema } from "./prayer-group-details-validation-schema";
import { PrayerGroupEditTestIds } from "./tests/test-ids";
import { usePrayerGroupEdit } from "./use-prayer-group-edit";

export const PrayerGroupEdit: React.FC = () => {
  const theme = useTheme();
  const { translate, i18n } = useI18N();
  const { prayerGroupDetails } = usePrayerGroupContext();

  const {
    formikRef,
    snackbarError,
    setSnackbarError,
    selectImage,
    clearField,
    isLoading,
    savePrayerGroupEdit,
  } = usePrayerGroupEdit();

  if (prayerGroupDetails?.userRole !== PrayerGroupRole.Admin) {
    return <PrayerGroupPermissionError />;
  }

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
            validationSchema={prayerGroupDetailsValidationSchema(
              translate,
              i18n.language as SupportedLanguages
            )}
            onSubmit={savePrayerGroupEdit}
            validateOnBlur
            validateOnChange={false}
            innerRef={formikRef}
          >
            {({ values, errors, submitForm }) => (
              <>
                <Button
                  mode="contained"
                  className="self-end"
                  loading={isLoading}
                  onPress={submitForm}
                >
                  {translate("common.actions.save")}
                </Button>

                <Text className="font-bold mb-3" variant="bodyLarge">
                  {translate("common.actions.preview")}
                </Text>

                <GroupPreview
                  profilePictureUri={values?.imageFile?.url}
                  bannerUri={values?.bannerImageFile?.url}
                  groupName={values?.groupName ?? ""}
                  description={values?.description ?? ""}
                  bannerTestID={PrayerGroupEditTestIds.groupPreviewBanner}
                  groupNameTestID={PrayerGroupEditTestIds.groupPreviewName}
                  descriptionTestID={
                    PrayerGroupEditTestIds.groupPreviewDescription
                  }
                />

                <Text className="font-bold mt-5" variant="bodyLarge">
                  {translate("prayerGroup.options.about")}
                </Text>

                <TextInput
                  name="groupName"
                  className="mt-3"
                  label={translate(
                    "createPrayerGroup.groupNameDescription.groupName"
                  )}
                  maxLength={TEXT_INPUT_MAX_LENGTH}
                  required
                  testID={PrayerGroupEditTestIds.groupNameInput}
                />

                <TextInput
                  name="description"
                  className="mt-5"
                  label={translate(
                    "createPrayerGroup.groupNameDescription.description"
                  )}
                  multiline
                  numberOfLines={5}
                  required
                  testID={PrayerGroupEditTestIds.descriptionInput}
                />

                <TextInput
                  name="rules"
                  className="mt-5"
                  label={translate("createPrayerGroup.rules.label")}
                  multiline
                  numberOfLines={5}
                />

                <Text variant="bodyLarge" className="font-bold mt-5">
                  {translate("prayerGroup.edit.images")}
                </Text>

                <View className="mt-5 flex flex-row items-center">
                  <Text variant="bodyLarge" className="w-1/2">
                    {translate("createPrayerGroup.groupImageColorStep.image")}
                  </Text>
                  <Button
                    mode="outlined"
                    className="w-1/2"
                    onPress={() => selectImage("imageFile", [1, 1])}
                  >
                    {translate(
                      "createPrayerGroup.groupImageColorStep.selectImage"
                    )}
                  </Button>
                </View>

                {values.imageFile && (
                  <>
                    <SelectedImageCard
                      onRemoveImage={() => clearField("imageFile")}
                      fileName={values.imageFile.fileName ?? ""}
                    />
                    {errors.imageFile && (
                      <HelperText type="error">{errors.imageFile}</HelperText>
                    )}
                  </>
                )}

                <View className="mt-6 flex flex-row items-center">
                  <Text variant="bodyLarge" className="w-1/2">
                    {translate("createPrayerGroup.groupImageColorStep.banner")}
                  </Text>
                  <Button
                    mode="outlined"
                    className="w-1/2"
                    onPress={() => selectImage("bannerImageFile", [10, 3])}
                  >
                    {translate(
                      "createPrayerGroup.groupImageColorStep.selectImage"
                    )}
                  </Button>
                </View>

                {values.bannerImageFile && (
                  <>
                    <SelectedImageCard
                      onRemoveImage={() => clearField("bannerImageFile")}
                      fileName={values.bannerImageFile.fileName ?? ""}
                    />
                    {errors.bannerImageFile && (
                      <HelperText type="error">
                        {errors.bannerImageFile}
                      </HelperText>
                    )}
                  </>
                )}
              </>
            )}
          </Formik>

          <ErrorSnackbar
            snackbarError={snackbarError}
            setSnackbarError={setSnackbarError}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
