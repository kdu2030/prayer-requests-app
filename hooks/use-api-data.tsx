import * as React from "react";
import {
  UserData,
  APIDataContextType,
  UserTokenPair,
} from "../types/context/api-data-context-type";

const defaultAPIData: APIDataContextType = {
  // TODO: Change this to point to production
  baseURL: "http://localhost:5000",
  setUserData: () => {},
  setUserTokens: () => {},
};

const APIDataContext = React.createContext(defaultAPIData);

type Props = {
  children: React.ReactNode;
};

export const APIDataContextProvider: React.FC<Props> = ({ children }) => {
  const baseURL = process.env.EXPO_PUBLIC_API_URL ?? "";
  const [userData, setUserData] = React.useState<UserData>({});
  const [userTokens, setUserTokens] = React.useState<
    UserTokenPair | undefined
  >();

  return (
    <APIDataContext.Provider
      value={{ baseURL, userData, setUserData, userTokens, setUserTokens }}
    >
      {children}
    </APIDataContext.Provider>
  );
};

export const useAPIDataContext = () => React.useContext(APIDataContext);
