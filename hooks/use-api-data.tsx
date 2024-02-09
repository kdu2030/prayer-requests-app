import * as React from "react";
import {
  UserData,
  ApiDataContextType,
  UserTokenPair,
} from "../types/context/api-data-context-type";

const defaultAPIData: ApiDataContextType = {
  baseUrl: "https://prayer-app-api.onrender.com",
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
      value={{
        baseUrl: baseURL,
        userData,
        setUserData,
        userTokens,
        setUserTokens,
      }}
    >
      {children}
    </APIDataContext.Provider>
  );
};

export const useAPIDataContext = () => React.useContext(APIDataContext);
