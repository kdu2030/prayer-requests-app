import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useApiDataContext } from "../../hooks/use-api-data";
import { ProfilePicture } from "../layouts/profile-picture";

export const DrawerContent: React.FC<DrawerContentComponentProps> = ({
  ...props
}) => {
  const { userData } = useApiDataContext();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const drawerStatus = useDrawerStatus();

  return (
    <>
      {drawerStatus === "open" && (
        <StatusBar backgroundColor={theme.colors.primary} />
      )}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: insets.top }}
      >
        <View
          className="flex flex-col items-center justify-center m-0"
          style={{ backgroundColor: theme.colors.primary }}
        >
          <ProfilePicture url={userData?.image?.url} width={48} height={48} />
          <Text className="mt-2 text-white">{userData?.fullName}</Text>
        </View>
      </DrawerContentScrollView>
    </>
  );
};
