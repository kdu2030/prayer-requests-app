import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
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
  const bottomSheetRef = React.useRef<BottomSheetMethods>(null);

  React.useEffect(() => {
    if (!bottomSheetRef.current) {
      return;
    }

    if (isOpen) {
      bottomSheetRef.current.snapToIndex(0);
    } else {
      bottomSheetRef.current.close();
    }
  }, [isOpen]);

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => {
      return (
        <BottomSheetBackdrop
          {...props}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 49,
          }}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      );
    },
    [],
  );

  return (
    <BottomSheet
      enableDynamicSizing
      index={-1}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: theme.colors.background }}
      onClose={onClose}
      ref={bottomSheetRef}
    >
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheet>
  );
};
