import * as React from "react";
import { ScrollView, View } from "react-native";
import {
  Button,
  ProgressBar,
  Snackbar,
  Text,
  useTheme,
} from "react-native-paper";
import { TextInput } from "../../components/inputs/text-input";
import { isLoading } from "expo-font";
import { Formik } from "formik";
import { isEmpty } from "lodash";
import { SignupTestIds } from "../../constants/auth/auth-constants";
import { useI18N } from "../../hooks/use-i18n";
import { router } from "expo-router";
import { signinValidationSchema } from "../../helpers/auth/signin-validation-schema";

const Signin: React.FC = () => {
  const theme = useTheme();
  const { translate } = useI18N();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <ScrollView
      contentContainerStyle={{
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View className="flex flex-col" style={{ minWidth: "80%" }}>
        <Formik
          validationSchema={signinValidationSchema(translate)}
          initialValues={{}}
          onSubmit={() => {}}
          validateOnBlur
          validateOnChange={false}
        >
          {(props) => (
            <>
              <Text
                variant="displaySmall"
                className="font-bold"
                style={{ color: theme.colors.primary }}
              >
                {translate("common.appName")}
              </Text>

              {isLoading && <ProgressBar className="mt-5" indeterminate />}

              <Text className="text-lg font-bold mt-5 mb-5">
                {translate("signin.signinToAccount.label")}
              </Text>

              <TextInput
                name="email"
                label={translate("signup.email.label")}
                containerClassNames="mb-5"
                mode={"flat"}
                testID={SignupTestIds.emailInput}
                required
              />

              <TextInput
                name="password"
                label={translate("signup.password.label")}
                containerClassNames="mb-5"
                mode={"flat"}
                secureTextEntry={true}
                testID={SignupTestIds.passwordInput}
                required
              />

              <Button
                mode="contained"
                className="mt-3 mb-10"
                onPress={() => {}}
                disabled={
                  isLoading || (!isEmpty(props.touched) && !props.isValid)
                }
                testID={SignupTestIds.submitButton}
              >
                {translate("authScreen.signin.action")}
              </Button>
            </>
          )}
        </Formik>

        <View className="flex flex-row mx-auto">
          <Text className="mr-3">
            {translate("signin.missingAccount.text")}
          </Text>
          <Text
            className="font-bold"
            style={{ color: theme.colors.primary }}
            onPress={() => {
              router.push("/auth/sign-up");
            }}
          >
            {translate("authScreen.signup.action")}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signin;
