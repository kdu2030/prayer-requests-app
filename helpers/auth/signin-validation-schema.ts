import { TranslationKey } from "../../types/languages";
import { signupValidationSchema } from "./signup-validation-schema";

export const signinValidationSchema = (
  translate: (key: TranslationKey, options?: any) => string
) => {
  return signupValidationSchema(translate).omit([
    "username",
    "confirmPassword",
  ]);
};
