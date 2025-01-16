import * as React from "react";

export type StatusBarStyles = {
  isHidden?: boolean;
  backgroundColor?: string;
};

export type UIContextType = {
  statusBarStyles: StatusBarStyles;
  setStatusBarStyles: React.Dispatch<React.SetStateAction<StatusBarStyles>>;
};
