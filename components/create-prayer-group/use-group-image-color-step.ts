import * as React from "react";

export const useGroupImageColorStep = () => {
  const [isColorPickerModalOpen, setIsColorPickerOpen] =
    React.useState<boolean>(false);

  return {
    isColorPickerModalOpen,
    setIsColorPickerOpen,
  };
};
