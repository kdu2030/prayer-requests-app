import * as React from "react";
import { useI18N } from "../../hooks/use-i18n";
import { ScrollView, View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { TextInput } from "../../components/inputs/text-input";
import { Formik } from "formik";
import { SelectInput } from "../../components/inputs/select-input";
import {
  getOptionsForExpireRadioButtons,
  getOptionsForVisibilityDropdown,
} from "../../helpers/prayer-request/prayer-request-helpers";
import { MULTILINE_INPUT_NUM_LINES } from "../../constants/common/input-constants";
import { RadioButtonInput } from "../../components/inputs/radio-button-input";

const CreatePrayerRequest: React.FC = () => {
  const theme = useTheme();
  const { translate } = useI18N();

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
        {() => {
          return (
            <View className="flex flex-col mt-5" style={{ minWidth: "80%" }}>
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
                label={translate("createPrayerRequest.canExpire.label")}
                options={getOptionsForExpireRadioButtons(translate)}
              />
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

export default CreatePrayerRequest;
