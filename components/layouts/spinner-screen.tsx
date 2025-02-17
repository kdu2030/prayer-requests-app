import * as React from "react";
import { ActivityIndicator, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  loadingLabel: string;
};

export const SpinnerScreen: React.FC<Props> = ({ loadingLabel }) => {
  const theme = useTheme();
  const { left, right, bottom } = useSafeAreaInsets();

  return (
    <>
      <View
        className="flex items-center justify-center flex-1"
        style={{
          backgroundColor: theme.colors.background,
          paddingLeft: left,
          paddingRight: right,
          paddingBottom: bottom,
        }}
      >
        <ActivityIndicator
          animating={true}
          size={70}
          color={theme.colors.primary}
        />
        <Text className="mt-5" variant="titleMedium">
          {loadingLabel}
        </Text>
      </View>
    </>
  );
};
