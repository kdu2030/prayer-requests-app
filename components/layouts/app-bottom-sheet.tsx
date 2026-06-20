import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as React from "react";
import { useTheme } from "react-native-paper";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const AppBottomSheet: React.FC<Props> = ({
  isOpen,
  onClose,
  children,
}) => {
  const theme = useTheme();
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);

  React.useEffect(() => {
    if (!bottomSheetRef.current) {
      return;
    }

    if (isOpen) {
      bottomSheetRef.current.present();
    } else {
      bottomSheetRef.current.close();
    }
  }, [isOpen]);

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => {
      return (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      );
    },
    [],
  );

  return (
    <BottomSheetModal
      enableDynamicSizing
      // index={-1}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: theme.colors.background }}
      onDismiss={onClose}
      ref={bottomSheetRef}
    >
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheetModal>
  );
};
