export enum JwtTokenFields {
  Username = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
  EmailAddress = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
  UserId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
  ExpiryDateSecs = "exp",
}

export const USER_TOKEN_STORAGE_KEY = "prayerRequestsApp.userToken";
export const REFRESH_TOKEN_STORAGE_KEY = "prayerRequestsApp.refreshToken";
