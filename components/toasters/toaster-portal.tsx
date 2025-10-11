import * as React from "react";
import { Portal } from "react-native-paper";

import { useToasterContext } from "./toaster-context";
import { ToasterSnackbar } from "./toaster-snackbar";

export const ToasterPortal: React.FC = () => {
  const { toasters } = useToasterContext();

  return (
    <Portal>
      {toasters.map((toaster) => {
        return <ToasterSnackbar toaster={toaster} key={toaster.toasterId} />;
      })}
    </Portal>
  );
};
