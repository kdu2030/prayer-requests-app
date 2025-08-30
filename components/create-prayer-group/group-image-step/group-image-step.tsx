import { useFormikContext } from "formik";
import { get } from "lodash";
import * as React from "react";
import { View } from "react-native";
import { Button, HelperText, Text } from "react-native-paper";

import { useI18N } from "../../../hooks/use-i18n";
import { ErrorSnackbar } from "../../layouts/error-snackbar";
import { GroupPreview } from "../../layouts/group-preview";
import { SelectedImageCard } from "../../layouts/selected-image-card";
import { WizardHeader } from "../../layouts/wizard-header";
import {
  CreatePrayerGroupWizardStep,
  NUM_CREATE_PRAYER_GROUP_STEPS,
  WIZARD_TEST_IDS_CONFIG,
} from "../create-prayer-group-constants";
import { CreatePrayerGroupForm } from "../create-prayer-group-types";
import { GroupImageColorStepTestIds } from "../tests/test-ids";
import { useGroupImageColorStep } from "./use-group-image-color-step";

type Props = {
  setWizardStep: React.Dispatch<
    React.SetStateAction<CreatePrayerGroupWizardStep>
  >;
};

export const GroupImageStep: React.FC<Props> = ({ setWizardStep }) => {
  const { translate } = useI18N();
  const { values, errors } = useFormikContext<CreatePrayerGroupForm>();
  const {
    selectImage,
    onRemoveSelectedImage,
    savePrayerGroup,
    snackbarError,
    setSnackbarError,
    isLoading,
  } = useGroupImageColorStep();

  const imageError = get(errors, "image.filePath");
  const bannerImageError = get(errors, "bannerImage.filePath");

  return (
    <>
      <WizardHeader
        stepNumber={3}
        totalNumberOfSteps={NUM_CREATE_PRAYER_GROUP_STEPS}
        onBack={() => setWizardStep(CreatePrayerGroupWizardStep.RulesStep)}
        onSave={savePrayerGroup}
        showNextButton={false}
        showSaveButton
        isLoading={isLoading}
        testIDs={WIZARD_TEST_IDS_CONFIG}
      />

      <View className="mt-4">
        <Text className="mb-2 font-bold" variant="titleLarge">
          {translate("createPrayerGroup.groupImageColorStep.title")}
        </Text>

        <Text variant="bodyLarge" className="mb-5">
          {translate("createPrayerGroup.groupImageColorStep.description")}
        </Text>

        <Text variant="bodyLarge" className="font-bold mb-2">
          {translate("common.actions.preview")}
        </Text>

        <GroupPreview
          groupName={values.groupName ?? ""}
          description={values.description ?? ""}
          profilePictureUri={values.avatarFile?.url}
          bannerUri={values?.bannerFile?.url}
          bannerTestID={GroupImageColorStepTestIds.backgroundColorPreview}
          groupNameTestID={GroupImageColorStepTestIds.groupNamePreview}
          descriptionTestID={GroupImageColorStepTestIds.descriptionPreview}
        />

        <View className="mt-4 flex flex-row items-center">
          <Text variant="bodyLarge" className="w-1/2">
            {translate("createPrayerGroup.groupImageColorStep.image")}
          </Text>
          <Button
            mode="outlined"
            className="w-1/2"
            onPress={() => selectImage("image", [1, 1])}
            testID={GroupImageColorStepTestIds.selectImageButton}
          >
            {translate("createPrayerGroup.groupImageColorStep.selectImage")}
          </Button>
        </View>

        {values.avatarFile && (
          <>
            <SelectedImageCard
              onRemoveImage={() => onRemoveSelectedImage("image")}
              fileName={values.avatarFile.fileName ?? ""}
            />
            {imageError && <HelperText type="error">{imageError}</HelperText>}
          </>
        )}
      </View>

      <View className="mt-4 flex flex-row items-center">
        <Text variant="bodyLarge" className="w-1/2">
          {translate("createPrayerGroup.groupImageColorStep.banner")}
        </Text>
        <Button
          mode="outlined"
          className="w-1/2"
          onPress={() => selectImage("bannerImage", [10, 3])}
          testID={GroupImageColorStepTestIds.selectImageButton}
        >
          {translate("createPrayerGroup.groupImageColorStep.selectImage")}
        </Button>
      </View>

      {values.bannerFile && (
        <>
          <SelectedImageCard
            onRemoveImage={() => onRemoveSelectedImage("bannerImage")}
            fileName={values.bannerFile.fileName ?? ""}
          />
          {bannerImageError && (
            <HelperText type="error">{bannerImageError}</HelperText>
          )}
        </>
      )}

      <ErrorSnackbar
        snackbarError={snackbarError}
        setSnackbarError={setSnackbarError}
      />
    </>
  );
};
