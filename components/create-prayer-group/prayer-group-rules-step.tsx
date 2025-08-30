import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { TextInput } from "../inputs/text-input";
import { WizardHeader } from "../layouts/wizard-header";
import {
  CreatePrayerGroupWizardStep,
  NUM_CREATE_PRAYER_GROUP_STEPS,
  WIZARD_TEST_IDS_CONFIG,
} from "./create-prayer-group-constants";
import { FormikSelect } from "../inputs/formik-select";
import { VisibilityLevel } from "../../constants/prayer-group-constants";
import { setNestedObjectValues, useFormikContext } from "formik";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";
import { isEmpty } from "lodash";

type Props = {
  setWizardStep: React.Dispatch<
    React.SetStateAction<CreatePrayerGroupWizardStep>
  >;
};

export const PrayerGroupRulesStep: React.FC<Props> = ({ setWizardStep }) => {
  const { translate } = useI18N();
  const { validateForm, setTouched, touched, setErrors } =
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
      </View>
    </>
  );
};
