import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  Button,
  Text,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrayerGroupRole } from "../../../constants/prayer-group-constants";
import { useI18N } from "../../../hooks/use-i18n";
import { ErrorScreen } from "../../layouts/error-screen";
import { ErrorSnackbar } from "../../layouts/error-snackbar";
import { ProfilePicture } from "../../layouts/profile-picture";
import { SpinnerScreen } from "../../layouts/spinner-screen";
import { PrayerGroupSectionHeader } from "../section-header/prayer-group-section-header";
import { DeleteUserConfirmationModal } from "./delete-user-confirmation-modal";
import { usePrayerGroupUsers } from "./use-prayer-group-users";

type Props = {
  prayerGroupId: number;
};

export const PrayerGroupUsers: React.FC<Props> = ({ prayerGroupId }) => {
  const { translate } = useI18N();
  const theme = useTheme();

  const {
    isLoading,
    isError,
    userQuery,
    filteredUsers,
    onQueryChange,
    onDeletePress,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    userToDeleteIndex,
    onDelete,
    onRoleChange,
    loadPrayerGroupUsers,
    isSaveLoading,
    setSaveError,
    saveError,
    onSavePrayerGroupUsers,
  } = usePrayerGroupUsers(prayerGroupId);

  return (
    <SafeAreaView className="flex-1">
      <PrayerGroupSectionHeader
        title={translate("prayerGroup.manageUsers.label")}
      />

      {isLoading && (
        <SpinnerScreen
          loadingLabel={translate("prayerGroup.manageUsers.loading")}
        />
      )}

      {isError && (
        <ErrorScreen
          errorLabel={translate("prayerGroup.manageUsers.unableToLoad")}
          onRetry={loadPrayerGroupUsers}
        />
      )}

      {!isLoading && (
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
              onChangeText={onQueryChange}
              left={<TextInput.Icon icon="magnify" size={24} />}
              label={translate("prayerGroup.manageUsers.searchForUsers")}
              placeholder={translate(
                "prayerGroup.manageUsers.searchPlaceholder"
              )}
            />
          </View>

          <FlatList
            data={filteredUsers}
            className="flex-1"
            renderItem={({ item, index }) => {
              if (item.isDeleted) {
                return null;
              }

              return (
                <View
                  className="p-4 border-b flex-row justify-between"
                  style={{ borderBottomColor: theme.colors.outline }}
                >
                  <View className="flex-row items-center w-3/5">
                    <ProfilePicture
                      url={item.image?.url}
                      width={40}
                      height={40}
                    />
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

                  <View className="flex flex-row items-center justify-between gap-x-2 grow">
                    {item.role === PrayerGroupRole.Admin ? (
                      <View className="justify-self-start">
                        <Button
                          mode="text"
                          icon={"crown"}
                          onPress={() =>
                            onRoleChange(index, PrayerGroupRole.Member)
                          }
                        >
                          {translate("prayerGroup.manageUsers.admin")}
                        </Button>
                      </View>
                    ) : (
                      <Button
                        mode="text"
                        icon={"account"}
                        onPress={() =>
                          onRoleChange(index, PrayerGroupRole.Admin)
                        }
                      >
                        {translate("prayerGroup.manageUsers.member")}
                      </Button>
                    )}

                    <TouchableRipple
                      style={{
                        borderRadius: 9999,
                      }}
                      borderless
                      onPress={() => onDeletePress(index)}
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
              );
            }}
          />

          <View
            className="p-4 border-t"
            style={{ borderTopColor: theme.colors.outline }}
          >
            <Button
              mode="contained"
              loading={isSaveLoading}
              onPress={onSavePrayerGroupUsers}
            >
              {translate("common.actions.save")}
            </Button>
          </View>
        </View>
      )}

      {isDeleteModalOpen && (
        <DeleteUserConfirmationModal
          onCancel={() => setIsDeleteModalOpen(false)}
          onDelete={onDelete}
          userToDeleteName={
            userToDeleteIndex != null
              ? filteredUsers[userToDeleteIndex]?.fullName
              : undefined
          }
        />
      )}

      {!!saveError && (
        <ErrorSnackbar
          snackbarError={saveError}
          setSnackbarError={setSaveError}
        />
      )}
    </SafeAreaView>
  );
};
