import * as React from "react";
import { useI18N } from "../../hooks/use-i18n";
import { ScrollView, View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { TextInput } from "../../components/inputs/text-input";
import { Formik, FormikProps } from "formik";
import { SelectInput } from "../../components/inputs/select-input";
import {
  getOptionsForExpireRadioButtons,
  getOptionsForVisibilityDropdown,
} from "../../helpers/prayer-request/prayer-request-helpers";
import { MULTILINE_INPUT_NUM_LINES } from "../../constants/common/input-constants";
import { RadioButtonInput } from "../../components/inputs/radio-button-input";
import { PrayerRequest } from "../../types/forms/create-prayer-request-form";
import { DatePickerInput } from "../../components/inputs/date-picker-input";
import { SupportedLanguages } from "../../types/languages";

const CreatePrayerRequest: React.FC = () => {
  const theme = useTheme();
  const { translate, i18n } = useI18N();

  return (
    <ScrollView
      contentContainerStyle={{
        display: "flex",
        flexGrow: 1,
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({ values }: FormikProps<PrayerRequest>) => {
          return (
            <View className="flex flex-col mt-5 w-4/5">
              <Text
                variant="headlineMedium"
                className="font-bold mb-5"
                style={{ color: theme.colors.primary }}
              >
                {translate("createPrayerRequest.action.header")}
              </Text>

              <TextInput
                name="title"
                label={translate("createPrayerRequest.title.label")}
                mode={"flat"}
                containerClassNames="mb-5"
                required
              />

              <SelectInput
                name="visibility"
                label={translate("createPrayerRequest.visibility.label")}
                options={getOptionsForVisibilityDropdown(translate)}
                mode="flat"
                containerClassNames="mb-5"
                required
              />

              <TextInput
                name="description"
                label={translate("createPrayerRequest.description.label")}
                mode={"flat"}
                containerClassNames="mb-5"
                multiline
                numberOfLines={MULTILINE_INPUT_NUM_LINES}
              />

              <RadioButtonInput
                name="canExpire"
                containerClassNames="mb-5"
                label={translate("createPrayerRequest.canExpire.label")}
                options={getOptionsForExpireRadioButtons(translate)}
                required
              />

              {values.canExpire === true && (
                <DatePickerInput
                  name="expiryDate"
                  label={"Test"}
                  locale={i18n.language as SupportedLanguages}
                  mode="flat"
                  required
                />
              )}
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

export default CreatePrayerRequest;
