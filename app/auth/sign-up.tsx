import * as React from "react";
import { Text, useTheme, Button } from "react-native-paper";
import { useI18N } from "../../hooks/use-i18n";
import { View, ScrollView } from "react-native";
import { Formik } from "formik";
import { TextInput } from "../../components/inputs/text-input";
import { signupValidationSchema } from "../../helpers/signup/signup-validation-schema";

const Signup: React.FC = () => {
  const { translate } = useI18N();
  const theme = useTheme();

  return (
    <ScrollView
      className="flex flex-1"
      contentContainerStyle={{ alignItems: "center" }}
    >
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

              <TextInput
                name="username"
                label={translate("signup.username.label")}
                mode={"flat"}
                containerClassNames="mb-5"
                required
              />

              <TextInput
                name="email"
                label={translate("signup.email.label")}
                containerClassNames="mb-5"
                mode={"flat"}
                required
              />

              <TextInput
                name="password"
                label={translate("signup.password.label")}
                containerClassNames="mb-5"
                mode={"flat"}
                secureTextEntry={true}
                required
              />

              <TextInput
                name="confirmPassword"
                label={translate("signup.confirmPassword.label")}
                containerClassNames="mb-5"
                mode={"flat"}
                secureTextEntry={true}
                required
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
    </ScrollView>
  );
};

export default Signup;
