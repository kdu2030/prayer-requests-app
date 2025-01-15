import * as React from "react";

export type UserData = {
  userId?: number;
  username?: string;
  email?: string;
  fullName?: string;
};

export type Token = {
  token: string;
  expiryDate: Date;
};

export type UserTokenPair = {
  accessToken?: Token;
  refreshToken?: Token;
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
