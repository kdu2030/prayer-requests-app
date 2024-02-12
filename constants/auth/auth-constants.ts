export enum JwtTokenFields {
  Username = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
  EmailAddress = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
  UserId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
  ExpiryDateSecs = "exp",
}

export const USER_TOKEN_STORAGE_KEY = "prayerRequestsApp.userToken";
export const REFRESH_TOKEN_STORAGE_KEY = "prayerRequestsApp.refreshToken";

export const SignupTestIds = {
  usernameInput: "signup-username-input",
  emailInput: "signup-email-input",
  passwordInput: "signup-password-input",
  confirmPasswordInput: "signup-confirm-password-input",
  submitButton: "signup-submit-button",
};
