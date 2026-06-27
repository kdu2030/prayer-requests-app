import * as React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, TextInput, useTheme } from "react-native-paper";

import { useI18N } from "../../../hooks/use-i18n";
import { DismissButton } from "../../inputs/dismiss-button";
import { useBlurOnHide } from "../../inputs/use-blur-on-hide";
import { ErrorScreen } from "../../layouts/error-screen";
import { ProfilePicture } from "../../layouts/profile-picture";
import { SpinnerScreen } from "../../layouts/spinner-screen";
import { PrayerGroupContentContainer } from "../section-header/prayer-group-content-container";
import { DeleteUserConfirmationModal } from "./delete-user-confirmation-modal";
import { PrayerGroupUsersTestIds } from "./tests/test-ids";
import { usePrayerGroupUsers } from "./use-prayer-group-users";
import { UserActions } from "./user-actions";

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
    onSavePrayerGroupUsers,
  } = usePrayerGroupUsers(prayerGroupId);

  const { inputRef } = useBlurOnHide();

  return (
    <PrayerGroupContentContainer
      title={translate("prayerGroup.manageUsers.label")}
    >
      {isLoading && (
        <SpinnerScreen
          loadingLabel={translate("prayerGroup.manageUsers.loading")}
          showSafeArea={false}
        />
      )}

      {isError && (
        <ErrorScreen
          errorLabel={translate("prayerGroup.manageUsers.unableToLoad")}
          onRetry={loadPrayerGroupUsers}
          showSafeArea={false}
        />
      )}

      {!isLoading && !isError && (
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
                "prayerGroup.manageUsers.searchPlaceholder",
              )}
              ref={inputRef}
              testID={PrayerGroupUsersTestIds.searchBar}
            />
          </View>

          {filteredUsers.length > 0 && (
            <FlatList
              data={filteredUsers}
              className="flex-1"
              renderItem={({ item, index }) => {
                return (
                  <View
                    className="p-4 border-b flex-row justify-between"
                    style={{ borderBottomColor: theme.colors.outline }}
                  >
                    <View className="flex-row items-center w-3/5">
                      <ProfilePicture
                        url={item.image?.fileUrl}
                        width={40}
                        height={40}
                      />
                      <View className="ml-4">
                        <Text
                          variant="bodyLarge"
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          testID={`${PrayerGroupUsersTestIds.userDisplayName}[${index}]`}
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

                    <View className="flex-1">
                      <UserActions
                        role={item.prayerGroupRole}
                        index={index}
                        onDeletePress={onDeletePress}
                        onRoleChange={onRoleChange}
                        roleChangeTestID={`${PrayerGroupUsersTestIds.roleChangeButton}[${index}]`}
                        deleteUserTestID={`${PrayerGroupUsersTestIds.deleteUserButton}[${index}]`}
                      />
                    </View>
                  </View>
                );
              }}
            />
          )}

          {filteredUsers.length === 0 && (
            <View
              className="p-4 border-b flex-row justify-center mt-16 flex-1"
              style={{ borderBottomColor: theme.colors.outline }}
            >
              <View>
                <Text variant="titleMedium">
                  {translate("prayerGroup.manageUsers.noUsersFound")}
                </Text>
              </View>
            </View>
          )}

          <View
            className="p-4 border-t"
            style={{ borderTopColor: theme.colors.outline }}
          >
            <DismissButton
              mode="contained"
              loading={isSaveLoading}
              onPress={onSavePrayerGroupUsers}
              testID={PrayerGroupUsersTestIds.saveButton}
            >
              {translate("common.actions.save")}
            </DismissButton>
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
    </PrayerGroupContentContainer>
  );
};
