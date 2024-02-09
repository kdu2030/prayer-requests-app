import * as React from "react";

export type UserData = {
  userId?: string;
  username?: string;
  email?: string;
};

export type UserTokenPair = {
  token: string;
  tokenExpiryDate: Date;
  refreshToken: string;
  refreshTokenExpiryDate: Date;
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
