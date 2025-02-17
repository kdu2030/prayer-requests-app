import { FontAwesome } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Text } from "react-native-paper";
import { Drawer } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import { ProfilePicture } from "../layouts/profile-picture";
import { PrefixDrawerItem } from "./prefix-drawer-item";

export const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { userData } = useApiDataContext();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const drawerStatus = useDrawerStatus();
  const { translate } = useI18N();
  const [showPrayerGroups, setShowPrayerGroups] =
    React.useState<boolean>(false);

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
          className="flex flex-col items-center justify-center py-2"
          style={{ backgroundColor: theme.colors.primary }}
        >
          <ProfilePicture url={userData?.image?.url} width={52} height={52} />
          <Text className="mt-2 text-white">{userData?.fullName}</Text>
          <Text className="text-white">{`@ ${userData?.username}`}</Text>
        </View>

        <View className="mt-2">
          <Drawer.Item
            label={translate("navigation.drawer.screen.home")}
            icon="home"
            onPress={() => router.push("/home")}
          />
          <Drawer.Item
            label={translate("navigation.drawer.screen.createPrayerGroup")}
            icon="plus"
            onPress={() => router.push("/create-prayer-group")}
          />
          {userData?.prayerGroups && (
            <>
              <Drawer.Item
                icon="account-multiple"
                label={translate("navigation.drawer.screen.yourPrayerGroups")}
                right={({ color }) => (
                  <FontAwesome
                    name={showPrayerGroups ? "angle-down" : "angle-right"}
                    size={24}
                    color={color}
                  />
                )}
                onPress={() => setShowPrayerGroups(!showPrayerGroups)}
              />
              {showPrayerGroups &&
                userData.prayerGroups.map((group) => {
                  return (
                    <PrefixDrawerItem
                      left={
                        <ProfilePicture
                          url={group.imageFile?.url}
                          width={24}
                          height={24}
                        />
                      }
                      label={group.groupName ?? ""}
                    />
                  );
                })}
            </>
          )}
        </View>
      </DrawerContentScrollView>
    </>
  );
};
