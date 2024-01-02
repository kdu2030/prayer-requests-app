import * as React from "react";
import { Text, useTheme, TextInput, Button } from "react-native-paper";
import { useI18N } from "../../hooks/use-i18n";
import { View } from "react-native";
import { Formik } from "formik";
import { TextInput as FormikTextInput } from "../../components/inputs/text-input";
import { signupValidationSchema } from "../../helpers/signup/signup-validation-schema";

const Signup: React.FC = () => {
  const { translate } = useI18N();
  const theme = useTheme();

  return (
    <View className="flex flex-1 items-center">
      <View className="flex flex-col">
        <Formik
          initialValues={{}}
          onSubmit={() => {}}
          validationSchema={signupValidationSchema(translate)}
          validateOnBlur
        >
          {(props) => (
            <>
              <Text
                variant="displaySmall"
                className="font-bold mt-20"
                style={{ color: theme.colors.primary }}
              >
                {translate("common.appName")}
              </Text>

              <Text className="text-lg font-bold mt-10 mb-5">
                {translate("signup.createAccount.label")}
              </Text>

              <FormikTextInput
                label={translate("signup.username.label")}
                name={"username"}
                mode={"flat"}
                containerClassNames="mb-5"
              />

              <TextInput
                label={translate("signup.email.label")}
                className="mb-5"
                mode={"flat"}
              />

              <TextInput
                label={translate("signup.password.label")}
                className="mb-5"
                mode={"flat"}
                secureTextEntry={true}
              />

              <TextInput
                label={translate("signup.confirmPassword.label")}
                className="mb-5"
                mode={"flat"}
                secureTextEntry={true}
              />

              <Button mode="contained" className="mt-3 mb-10">
                {translate("authScreen.signup.action")}
              </Button>
            </>
          )}
        </Formik>

        <View className="flex flex-row w-full items-center">
          <Text className="mr-3">{translate("signup.haveAccount.text")}</Text>
          <Text className="font-bold" style={{ color: theme.colors.primary }}>
            {translate("authScreen.signin.action")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Signup;
