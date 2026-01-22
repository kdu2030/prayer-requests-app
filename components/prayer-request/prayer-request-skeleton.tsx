import { Skeleton } from "moti/skeleton";
import * as React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

export const PrayerRequestSkeleton: React.FC = () => {
  const theme = useTheme();

  return (
    <View
      className="p-5 border-b"
      style={{
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.outline,
      }}
    >
      <View className="flex flex-row items-center">
        <View className="flex flex-row items-center">
          <Skeleton width={24} height={24} radius={"round"} colorMode="light" />
          <View className="ml-2">
            <Skeleton width={164} height={20} colorMode="light" />
          </View>
        </View>
      </View>
    </View>
  );
};
