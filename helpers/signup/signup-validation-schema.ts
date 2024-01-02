import * as Yup from "yup";
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

  const passwordRequiredError = translate("form.validation.isRequired.error", {
    field: translate("signup.password.label"),
  });

  const confirmPasswordRequiredError = translate(
    "form.validation.confirmPasswordRequired.error"
  );

  return Yup.object().shape({
    username: Yup.string().required(usernameRequiredError),
    email: Yup.string().required(emailRequiredError),
    password: Yup.string().required(passwordRequiredError),
    confirmPassword: Yup.string().required(confirmPasswordRequiredError),
  });
};
