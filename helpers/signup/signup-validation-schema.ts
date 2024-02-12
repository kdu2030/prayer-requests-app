import * as Yup from "yup";

import { SignupForm } from "../../types/forms/signup-form";
import { TranslationKey } from "../../types/languages";

export const signupValidationSchema = (
  translate: (key: TranslationKey, options?: any) => string
) => {
  const usernameRequiredError = translate("form.validation.isRequired.error", {
    field: translate("signup.username.label"),
  });

  const emailRequiredError = translate("form.validation.isRequired.error", {
    field: translate("signup.email.label"),
  });

  const emailInvalidError = translate("form.validation.isInvalid.error", {
    field: translate("signup.email.label"),
  });

  const passwordRequiredError = translate("form.validation.isRequired.error", {
    field: translate("signup.password.label"),
  });

  const confirmPasswordRequiredError = translate(
    "form.validation.confirmPasswordRequired.error"
  );

  const confirmPasswordMismatchError = translate(
    "form.validation.passwordsMismatch.error"
  );

  return Yup.object().shape({
    username: Yup.string().required(usernameRequiredError),
    email: Yup.string().required(emailRequiredError).email(emailInvalidError),
    password: Yup.string().required(passwordRequiredError),
    confirmPassword: Yup.string()
      .required(confirmPasswordRequiredError)
      .test(
        "passwordsMatch",
        confirmPasswordMismatchError,
        (confirmPasswordValue: string, context: Yup.TestContext) => {
          const formValues = context.options.context as SignupForm;
          const passwordValue = formValues.password;

          if (
            !passwordValue ||
            !confirmPasswordValue ||
            passwordValue === confirmPasswordValue
          ) {
            return true;
          }

          const passwordError = context.createError({
            path: context.path.replace("confirmPassword", "password"),
            message: confirmPasswordMismatchError,
          });

          const confirmPasswordError = context.createError({
            path: context.path,
            message: confirmPasswordMismatchError,
          });

          return new Yup.ValidationError([passwordError, confirmPasswordError]);
        }
      ),
  });
};
