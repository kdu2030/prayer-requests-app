import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as React from "react";
import { useTheme } from "react-native-paper";

type Props = {
  isOpen: boolean;
  snapPoints: (number | string)[];
  children: React.ReactNode;
};

export const AppBottomSheet: React.FC<Props> = ({
  isOpen,
  snapPoints,
  children,
}) => {
  const theme = useTheme();
  const bottomSheetRef = React.useRef<BottomSheetProps & BottomSheetMethods>(
    null
  );

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  React.useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.snapToIndex(0);
      return;
    }

    bottomSheetRef.current?.close();
  }, [isOpen]);

  return (
    <BottomSheet
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose
      ref={bottomSheetRef}
      backgroundStyle={{ backgroundColor: theme.colors.background }}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheet>
  );
};
