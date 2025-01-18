import { useFormikContext } from "formik";
import * as React from "react";
import { View } from "react-native";
import { Button, Modal, Portal, Text, useTheme } from "react-native-paper";
import { isColor } from "react-native-reanimated";

import { useI18N } from "../../hooks/use-i18n";
import { ProfilePicture } from "../layouts/profile-picture";
import {
  CreatePrayerGroupWizardStep,
  NUM_CREATE_PRAYER_GROUP_STEPS,
} from "./create-prayer-group-constants";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";
import { CreatePrayerGroupWizardHeader } from "./create-prayer-group-wizard-header";
import { useGroupImageColorStep } from "./use-group-image-color-step";

type Props = {
  setWizardStep: React.Dispatch<
    React.SetStateAction<CreatePrayerGroupWizardStep>
  >;
};

export const GroupImageColorStep: React.FC<Props> = ({ setWizardStep }) => {
  const { translate } = useI18N();
  const theme = useTheme();
  const { values } = useFormikContext<CreatePrayerGroupForm>();
  const { isColorPickerModalOpen, setIsColorPickerOpen } =
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

        <View className="rounded-lg border border-gray-200 flex flex-grow-0">
          <View
            className="h-16 rounded-t-lg"
            style={{ backgroundColor: values.color ?? theme.colors.primary }}
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
              >
                {values.groupName}
              </Text>
            </View>
            <Text className="mt-3" variant="bodyLarge">
              {values.description}
            </Text>
          </View>
        </View>
        <View className="mt-4 flex flex-row items-center">
          <Text variant="bodyMedium" className="w-1/2">
            {translate("createPrayerGroup.groupImageColorStep.color")}
          </Text>
          <Button
            mode="outlined"
            className="w-1/2"
            onPress={() => setIsColorPickerOpen(true)}
          >
            {translate("createPrayerGroup.groupImageColorStep.selectColor")}
          </Button>
        </View>
      </View>

      <Portal>
        <Modal
          visible={isColorPickerModalOpen}
          onDismiss={() => setIsColorPickerOpen(false)}
          style={{ padding: 8 }}
          contentContainerStyle={{
            backgroundColor: theme.colors.background,
            padding: 20,
            borderRadius: 8,
          }}
        >
          <Text>{"Test"}</Text>
        </Modal>
      </Portal>
    </>
  );
};
