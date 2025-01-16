import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Formik, FormikProps, setNestedObjectValues } from "formik";
import { isEmpty } from "lodash";
import * as React from "react";
import { ScrollView, View } from "react-native";
import { Button, Snackbar, Text, useTheme } from "react-native-paper";

import { postSignup } from "../../api/post-signup";
import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import { SignupForm } from "../../types/forms/auth-forms";
import { TextInput } from "../inputs/text-input";
import { SignupTestIds } from "./auth-constants";
import { handleSuccessfulAuthentication } from "./auth-helpers";
import { AuthApiErrors } from "./auth-types";
import { signupValidationSchema } from "./signup-validation-schema";

const Signup: React.FC = () => {
  const { translate } = useI18N();
  const theme = useTheme();
  const { baseUrl, setUserData, setUserTokens } = useApiDataContext();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isErrorVisible, setIsErrorVisible] = React.useState<boolean>(false);

  const onSubmit = async (formProps: FormikProps<SignupForm>) => {
    if (isLoading) {
      return;
    }

    const errors = await formProps.validateForm();

    if (!isEmpty(errors)) {
      formProps.setErrors(errors);
      formProps.setTouched(
        setNestedObjectValues({ ...errors, ...formProps.touched }, true)
      );
      return;
    }

    setIsLoading(true);
    const response = await postSignup(baseUrl, formProps.values);
    setIsLoading(false);

    if (
      response.isError &&
      response.errors.includes(AuthApiErrors.UniqueEmail)
    ) {
      formProps.setFieldError(
        "email",
        translate("form.validation.unique.error", {
          field: translate("signup.email.label").toLocaleLowerCase(),
        })
      );
      return;
    } else if (
      response.isError &&
      response.errors.includes(AuthApiErrors.UniqueUsername)
    ) {
      formProps.setFieldError(
        "username",
        translate("form.validation.unique.error", {
          field: translate("signup.username.label").toLocaleLowerCase(),
        })
      );
      return;
    } else if (response.isError) {
      setIsErrorVisible(true);
      return;
    }

    handleSuccessfulAuthentication(response.value, setUserData, setUserTokens);
    router.push("/home");
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <StatusBar backgroundColor={theme.colors.background} />
        <View className="flex flex-col" style={{ minWidth: "80%" }}>
          <Formik
            initialValues={{}}
            onSubmit={() => {}}
            validationSchema={signupValidationSchema(translate)}
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

                <Text className="mt-5 mb-5 text-lg font-bold">
                  {translate("signup.createAccount.label")}
                </Text>

                <TextInput
                  name="username"
                  label={translate("signup.username.label")}
                  mode={"flat"}
                  containerClassNames="mb-5"
                  testID={SignupTestIds.usernameInput}
                  required
                />

                <TextInput
                  name="fullName"
                  label={translate("signup.displayName.label")}
                  mode={"flat"}
                  containerClassNames="mb-5"
                  testID={SignupTestIds.displayNameInput}
                  required
                />

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

                <TextInput
                  name="confirmPassword"
                  label={translate("signup.confirmPassword.label")}
                  containerClassNames="mb-5"
                  mode={"flat"}
                  secureTextEntry={true}
                  testID={SignupTestIds.confirmPasswordInput}
                  required
                />

                <Button
                  mode="contained"
                  className="mt-3 mb-10"
                  onPress={() => onSubmit(props)}
                  disabled={isEmpty(props.touched) && !props.isValid}
                  loading={isLoading}
                  testID={SignupTestIds.submitButton}
                >
                  {translate("authScreen.signup.action")}
                </Button>
              </>
            )}
          </Formik>

          <View className="flex flex-row mx-auto">
            <Text className="mr-3">{translate("signup.haveAccount.text")}</Text>
            <Text
              className="font-bold"
              style={{ color: theme.colors.primary }}
              onPress={() => {
                router.push("/auth/sign-in");
              }}
            >
              {translate("authScreen.signin.action")}
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
            item: translate("authScreen.signup.action"),
          })}
        </Snackbar>
      </ScrollView>
    </>
  );
};

export default Signup;
