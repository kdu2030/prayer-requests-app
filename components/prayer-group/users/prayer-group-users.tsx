import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  Button,
  Text,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../../hooks/use-i18n";
import { ProfilePicture } from "../../layouts/profile-picture";
import { PrayerGroupSectionHeader } from "../section-header/prayer-group-section-header";
import { PrayerGroupUsersError } from "./prayer-group-users-error";
import { PrayerGroupUsersSpinner } from "./prayer-group-users-spinner";
import { usePrayerGroupUsers } from "./use-prayer-group-users";

type Props = {
  prayerGroupId: number;
};

export const PrayerGroupUsers: React.FC<Props> = ({ prayerGroupId }) => {
  const { translate } = useI18N();
  const theme = useTheme();
  const { isLoading, isError, userQuery, setUserQuery, prayerGroupUsers } =
    usePrayerGroupUsers(prayerGroupId);

  if (isLoading) {
    return <PrayerGroupUsersSpinner />;
  }

  if (isError) {
    return <PrayerGroupUsersError onRetry={() => {}} />;
  }

  return (
    <SafeAreaView className="flex-1">
      <PrayerGroupSectionHeader
        title={translate("prayerGroup.manageUsers.label")}
      />

      <View
        className="flex-1"
        style={{ backgroundColor: theme.colors.background }}
      >
        <View
          className="p-4 border-b"
          style={{ borderBottomColor: theme.colors.outline }}
        >
          <TextInput
            mode="outlined"
            value={userQuery}
            onChangeText={setUserQuery}
            left={<TextInput.Icon icon="magnify" size={24} />}
            label={translate("prayerGroup.manageUsers.searchForUsers")}
            placeholder={translate("prayerGroup.manageUsers.searchPlaceholder")}
          />
        </View>

        <FlatList
          data={prayerGroupUsers}
          className="flex-1"
          renderItem={({ item }) => (
            <View
              className="p-4 border-b flex-row justify-between"
              style={{ borderBottomColor: theme.colors.outline }}
            >
              <View className="flex-row items-center w-1/2">
                <ProfilePicture url={item.image?.url} width={40} height={40} />
                <View className="ml-4">
                  <Text
                    variant="bodyLarge"
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    {item.fullName}
                  </Text>
                  <Text
                    variant="bodySmall"
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    @ {item.username}
                  </Text>
                </View>
              </View>

              <View className="flex flex-row items-center gap-x-2">
                <Button
                  mode="text"
                  icon={"crown"}
                  onPress={() => console.log("Admin")}
                >
                  {translate("prayerGroup.manageUsers.admin")}
                </Button>
                <TouchableRipple
                  style={{ borderRadius: 9999 }}
                  borderless
                  onPress={() => console.log("remove")}
                  rippleColor={theme.colors.errorContainer}
                >
                  <MaterialCommunityIcons
                    name="minus"
                    size={36}
                    color={theme.colors.error}
                  />
                </TouchableRipple>
              </View>
            </View>
          )}
        />

        <View
          className="p-4 border-t"
          style={{ borderTopColor: theme.colors.outline }}
        >
          <Button mode="contained">{translate("common.actions.save")}</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
