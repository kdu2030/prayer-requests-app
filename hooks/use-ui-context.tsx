import * as React from "react";

import { StatusBarStyles, UIContextType } from "../types/ui-context-types";
const defaultUIContext: UIContextType = {
  statusBarStyles: {
    isHidden: false,
  },
  setStatusBarStyles: () => {},
};

const UIContext = React.createContext<UIContextType>(defaultUIContext);

type Props = {
  children: React.ReactNode;
};

export const UIContextProvider: React.FC<Props> = ({ children }) => {
  const [statusBarStyles, setStatusBarStyles] = React.useState<StatusBarStyles>(
    { isHidden: false }
  );

  return (
    <UIContext.Provider value={{ statusBarStyles, setStatusBarStyles }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => React.useContext(UIContext);
