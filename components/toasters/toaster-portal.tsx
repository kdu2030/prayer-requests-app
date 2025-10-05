import * as React from "react";
import { useToasterContext } from "./toaster-context";
import { Portal } from "react-native-paper";
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
