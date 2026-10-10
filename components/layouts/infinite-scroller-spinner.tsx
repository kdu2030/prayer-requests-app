import * as React from "react";
import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

export const InfiniteScrollerSpinner: React.FC = () => {
  const theme = useTheme();

  return (
    <View
      className="rounded-full shadow-sm bg-white z-10"
      style={{ shadowColor: theme.colors.shadow }}
    >
      <ActivityIndicator
        animating={true}
        size={48}
        color={theme.colors.primary}
      />
    </View>
  );
};
