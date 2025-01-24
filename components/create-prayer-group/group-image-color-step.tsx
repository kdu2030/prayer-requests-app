import { EvilIcons } from "@expo/vector-icons";
import { useFormikContext } from "formik";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { ProfilePicture } from "../layouts/profile-picture";
import { ColorPickerModal } from "./color-picker-modal";
import {
  CreatePrayerGroupWizardStep,
  NUM_CREATE_PRAYER_GROUP_STEPS,
} from "./create-prayer-group-constants";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";
import { CreatePrayerGroupWizardHeader } from "./create-prayer-group-wizard-header";
import { GroupImageColorStepTestIds } from "./tests/test-ids";
import { useGroupImageColorStep } from "./use-group-image-color-step";

type Props = {
  setWizardStep: React.Dispatch<
    React.SetStateAction<CreatePrayerGroupWizardStep>
  >;
};

export const GroupImageColorStep: React.FC<Props> = ({ setWizardStep }) => {
  const { translate } = useI18N();
  const theme = useTheme();
  const { values, setFieldValue, setFieldTouched } =
    useFormikContext<CreatePrayerGroupForm>();
  const { isColorPickerModalOpen, setIsColorPickerOpen, selectImage } =
    useGroupImageColorStep();

  return (
    <>
      <CreatePrayerGroupWizardHeader
        stepNumber={3}
        totalNumberOfSteps={NUM_CREATE_PRAYER_GROUP_STEPS}
        onBack={() => setWizardStep(CreatePrayerGroupWizardStep.RulesStep)}
      />

      <View className="mt-4">
        <Text className="mb-2 font-bold" variant="titleLarge">
          {translate("createPrayerGroup.groupImageColorStep.title")}
        </Text>

        <Text variant="bodyLarge" className="mb-5">
          {translate("createPrayerGroup.groupImageColorStep.description")}
        </Text>

        <Text variant="bodyLarge" className="font-bold mb-2">
          {translate("common.preview")}
        </Text>

        <View className="rounded-lg border border-gray-400 flex flex-grow-0">
          <View
            className="h-16 rounded-t-lg"
            style={{ backgroundColor: values.color ?? theme.colors.primary }}
            testID={GroupImageColorStepTestIds.backgroundColorPreview}
          />
          <View
            className="p-4"
            style={{ backgroundColor: theme.colors.background }}
          >
            <View className="flex flex-row items-center">
              <ProfilePicture url={values.image?.url} width={48} height={48} />
              <Text
                variant="titleMedium"
                className="ml-4 font-bold w-4/5"
                numberOfLines={1}
                ellipsizeMode="tail"
                testID={GroupImageColorStepTestIds.groupNamePreview}
              >
                {values.groupName}
              </Text>
            </View>
            <Text
              className="mt-3"
              variant="bodyLarge"
              testID={GroupImageColorStepTestIds.descriptionPreview}
            >
              {values.description}
            </Text>
          </View>
        </View>
        <View className="mt-4 flex flex-row items-center">
          <Text variant="bodyLarge" className="w-1/2">
            {translate("createPrayerGroup.groupImageColorStep.color")}
          </Text>
          <Button
            mode="outlined"
            className="w-1/2"
            onPress={() => setIsColorPickerOpen(true)}
            testID={GroupImageColorStepTestIds.selectColorButton}
          >
            {translate("createPrayerGroup.groupImageColorStep.selectColor")}
          </Button>
        </View>

        <View className="mt-4 flex flex-row items-center">
          <Text variant="bodyLarge" className="w-1/2">
            {translate("createPrayerGroup.groupImageColorStep.image")}
          </Text>
          <Button mode="outlined" className="w-1/2" onPress={selectImage}>
            {translate("createPrayerGroup.groupImageColorStep.selectImage")}
          </Button>
        </View>

        {values.image && (
          <View className="rounded-lg border border-gray-400 p-4 mt-4">
            <View className="flex flex-row items-center gap-x-4">
              <Text numberOfLines={1} ellipsizeMode="tail">
                {values.image.fileName}
              </Text>
              <TouchableOpacity>
                <EvilIcons name="trash" size={28} color={theme.colors.error} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <ColorPickerModal
        isOpen={isColorPickerModalOpen}
        onCancel={() => setIsColorPickerOpen(false)}
        onSave={(color) => {
          setFieldValue("color", color);
          setFieldTouched("color", true);
          setIsColorPickerOpen(false);
        }}
        initialColor={values.color}
      />
    </>
  );
};
