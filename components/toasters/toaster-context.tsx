import * as React from "react";
import { ToasterConfig } from "./toaster-type";
import { uniqueId } from "lodash";

export type ToasterContextType = {
  toasters: ToasterConfig[];
  openToaster: (toaster: Omit<ToasterConfig, "toasterId">) => void;
  removeToaster: (toasterId: string) => void;
};

const ToasterContext = React.createContext<ToasterContextType>({
  toasters: [],
  openToaster: () => {},
  removeToaster: () => {},
});

export const ToasterContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [toasters, setToasters] = React.useState<ToasterConfig[]>([]);

  const openToaster = (toaster: Omit<ToasterConfig, "toasterId">) => {
    const toasterWithId: ToasterConfig = {
      ...toaster,
      toasterId: uniqueId(),
    };

    setToasters((existingToasters) => [...existingToasters, toasterWithId]);
  };

  const removeToaster = (toasterId: string) => {
    setToasters((existingToasters) => {
      return existingToasters.filter(
        (toaster) => toaster.toasterId !== toasterId
      );
    });
  };

  return (
    <ToasterContext.Provider value={{ toasters, openToaster, removeToaster }}>
      {children}
    </ToasterContext.Provider>
  );
};

export const useToasterContext = () => React.useContext(ToasterContext);
