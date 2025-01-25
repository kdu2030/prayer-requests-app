import * as React from "react";
import { Snackbar } from "react-native-paper";

type Props = {
  snackbarError: string | undefined;
  setSnackbarError: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const ErrorSnackbar: React.FC<Props> = ({
  snackbarError,
  setSnackbarError,
}) => {
  return (
    <Snackbar
      className="bg-red-700"
      duration={3000}
      visible={!!snackbarError}
      onDismiss={() => {
        setSnackbarError(undefined);
      }}
      onIconPress={() => setSnackbarError(undefined)}
    >
      {snackbarError}
    </Snackbar>
  );
};
