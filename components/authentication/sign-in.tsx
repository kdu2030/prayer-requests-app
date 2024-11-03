import { router } from "expo-router";
import { Formik, FormikProps, setNestedObjectValues } from "formik";
import { isEmpty } from "lodash";
import * as React from "react";
import { ScrollView, View } from "react-native";
import {
  Button,
  ProgressBar,
  Snackbar,
  Text,
  useTheme,
} from "react-native-paper";

import { postSignin } from "../../api/post-signin";
import { TextInput } from "../../components/inputs/text-input";
import { SigninErrors, SigninTestIds } from "./auth-constants";
import { handleSuccessfulAuthentication } from "./auth-helpers";
import { signinValidationSchema } from "./signin-validation-schema";
import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import { SigninForm } from "../../types/forms/auth-forms";

export const Signin: React.FC = () => {
  const theme = useTheme();
  const { translate } = useI18N();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isErrorVisible, setIsErrorVisible] = React.useState<boolean>(false);
  const { baseUrl, setUserData, setUserTokens } = useApiDataContext();

  const handleSubmit = async (formProps: FormikProps<SigninForm>) => {
    const errors = await formProps.validateForm(formProps.values);

    if (!isEmpty(errors)) {
      formProps.setErrors(errors);
      formProps.setTouched(
        setNestedObjectValues({ ...formProps.touched, ...errors }, true)
      );
      return;
    }

    setIsLoading(true);

    const signinResponse = await postSignin(baseUrl, formProps.values);
    setIsLoading(false);

    if (
      errorsArrayIncludes(signinResponse, "email", SigninErrors.EmailNotFound)
    ) {
      formProps.setFieldError(
        "email",
        translate("form.validation.emailNotFound.error")
      );
      return;
    } else if (
      errorsArrayIncludes(
        signinResponse,
        "password",
        SigninErrors.IncorrectPassword
      )
    ) {
      formProps.setFieldError(
        "password",
        translate("form.validation.incorrectPassword.error")
      );
      return;
    } else if (
      signinResponse.isError ||
      !signinResponse.value?.token ||
      !signinResponse.value?.refreshToken
    ) {
      setIsErrorVisible(true);
      return;
    }

    handleSuccessfulAuthentication(
      signinResponse.value.token,
      signinResponse.value.refreshToken,
      setUserData,
      setUserTokens
    );
  };

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
                testID={SigninTestIds.emailInput}
                required
              />

              <TextInput
                name="password"
                label={translate("signup.password.label")}
                containerClassNames="mb-5"
                mode={"flat"}
                secureTextEntry={true}
                testID={SigninTestIds.passwordInput}
                required
              />

              <Button
                mode="contained"
                className="mt-3 mb-10"
                onPress={() => {
                  handleSubmit(props);
                }}
                disabled={
                  isLoading || (!isEmpty(props.touched) && !props.isValid)
                }
                testID={SigninTestIds.submitButton}
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

      <Snackbar
        className="bg-red-700"
        duration={3000}
        visible={isErrorVisible}
        onDismiss={() => {
          setIsErrorVisible(false);
        }}
        onIconPress={() => setIsErrorVisible(false)}
      >
        {translate("toaster.failed.genericFailure", {
          item: translate("authScreen.signin.action"),
        })}
      </Snackbar>
    </ScrollView>
  );
};
