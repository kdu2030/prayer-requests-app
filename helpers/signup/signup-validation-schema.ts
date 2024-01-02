import * as Yup from "yup";
import { TranslationKey } from "../../types/languages";

export const signupValidationSchema = (
  translate: (key: TranslationKey, options?: any) => string
) => {
  const usernameRequiredError = translate("form.validation.isRequired.error", {
    field: translate("signup.username.label"),
  });

  return Yup.object().shape({
    username: Yup.string().required(usernameRequiredError),
  });
};
