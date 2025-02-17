import * as React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  loadingLabel: string;
};

export const SpinnerScreen: React.FC<Props> = ({ loadingLabel }) => {
  const theme = useTheme();

  return (
    <>
      <StatusBar backgroundColor={theme.colors.background} />
      <SafeAreaView>
        <View
          className="flex items-center justify-center flex-1"
          style={{ backgroundColor: theme.colors.background }}
        >
          <ActivityIndicator animating={true} size={70} />
          <Text className="mt-5" variant="titleMedium">
            {loadingLabel}
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};
