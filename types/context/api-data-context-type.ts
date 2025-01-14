import * as React from "react";

export type UserData = {
  userId?: number;
  username?: string;
  email?: string;
  fullName?: string;
};

export type UserTokenPair = {
  accessToken?: string;
  accessTokenExpiryDate?: Date;
  refreshToken?: string;
  refreshTokenExpiryDate?: Date;
};

export type ApiDataContextType = {
  baseUrl: string;
  userTokens?: UserTokenPair;
  setUserTokens: React.Dispatch<
    React.SetStateAction<UserTokenPair | undefined>
  >;
  userData?: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
};
