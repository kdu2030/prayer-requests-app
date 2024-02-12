import * as React from "react";
import {
  UserData,
  ApiDataContextType,
  UserTokenPair,
} from "../types/context/api-data-context-type";

const defaultApiData: ApiDataContextType = {
  baseUrl: "https://prayer-app-api.onrender.com",
  setUserData: () => {},
  setUserTokens: () => {},
};

const ApiDataContext = React.createContext(defaultApiData);

type Props = {
  children: React.ReactNode;
};

export const ApiDataContextProvider: React.FC<Props> = ({ children }) => {
  const baseURL = process.env.EXPO_PUBLIC_API_URL ?? "";
  const [userData, setUserData] = React.useState<UserData>({});
  const [userTokens, setUserTokens] = React.useState<
    UserTokenPair | undefined
  >();

  return (
    <ApiDataContext.Provider
      value={{
        baseUrl: baseURL,
        userData,
        setUserData,
        userTokens,
        setUserTokens,
      }}
    >
      {children}
    </ApiDataContext.Provider>
  );
};

export const useApiDataContext = () => React.useContext(ApiDataContext);
