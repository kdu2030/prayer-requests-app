import { setNestedObjectValues, useFormikContext } from "formik";
import { isEmpty } from "lodash";
import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { VisibilityLevel } from "../../constants/prayer-group-constants";
import { useI18N } from "../../hooks/use-i18n";
import { FormikSelect } from "../inputs/formik-select";
import { TextInput } from "../inputs/text-input";
import { WizardHeader } from "../layouts/wizard-header";
import {
  CreatePrayerGroupWizardStep,
  NUM_CREATE_PRAYER_GROUP_STEPS,
  WIZARD_TEST_IDS_CONFIG,
} from "./create-prayer-group-constants";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";

type Props = {
  setWizardStep: React.Dispatch<
    React.SetStateAction<CreatePrayerGroupWizardStep>
  >;
};

export const PrayerGroupRulesStep: React.FC<Props> = ({ setWizardStep }) => {
  const { translate } = useI18N();
  const { validateForm, setTouched, touched, setErrors, values } =
    useFormikContext<CreatePrayerGroupForm>();

  const visibilityLevelOptions = React.useMemo(() => {
    return [
      {
        label: translate("createPrayerGroup.visibilityLevel.public"),
        value: VisibilityLevel.Public,
      },
      {
        label: translate("createPrayerGroup.visibilityLevel.private"),
        value: VisibilityLevel.Private,
      },
    ];
  }, []);

  const publicDescription = React.useMemo(
    () => translate("createPrayerGroup.visibilityLevel.public.description"),
    []
  );

  const privateDescription = React.useMemo(
    () => translate("createPrayerGroup.visibilityLevel.private.description"),
    []
  );

  return (
    <>
      <WizardHeader
        stepNumber={2}
        totalNumberOfSteps={NUM_CREATE_PRAYER_GROUP_STEPS}
        onBack={() =>
          setWizardStep(CreatePrayerGroupWizardStep.NameDescriptionStep)
        }
        onNext={async () => {
          const errors = await validateForm();

          if (!isEmpty(errors)) {
            setTouched(setNestedObjectValues({ ...errors, ...touched }, true));
            setErrors(errors);
            return;
          }

          setWizardStep(CreatePrayerGroupWizardStep.ImageStep);
        }}
        testIDs={WIZARD_TEST_IDS_CONFIG}
      />

      <View className="mt-4">
        <Text className="mb-5 font-bold" variant="titleLarge">
          {translate("createPrayerGroup.rules.title")}
        </Text>

        <TextInput
          name="rules"
          containerClassNames="mb-5"
          label={translate("createPrayerGroup.rules.label")}
          numberOfLines={5}
          multiline
        />

        <FormikSelect
          name="visibilityLevel"
          mode="flat"
          label={translate("createPrayerGroup.visibilityLevel.label")}
          options={visibilityLevelOptions}
          required
        />

        {values.visibilityLevel === VisibilityLevel.Public && (
          <Text className="mt-2 text-gray-600" variant="labelLarge">
            {publicDescription}
          </Text>
        )}

        {values.visibilityLevel === VisibilityLevel.Private && (
          <Text className="mt-2 text-gray-600" variant="labelLarge">
            {privateDescription}
          </Text>
        )}
      </View>
    </>
  );
};
