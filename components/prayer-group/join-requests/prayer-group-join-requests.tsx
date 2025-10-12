import * as React from "react";
import { FlatList, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { formatDate } from "../../../helpers/formatting-helpers";
import { useI18N } from "../../../hooks/use-i18n";
import i18n from "../../../i18n/i18n";
import { LoadStatus } from "../../../types/api-response-types";
import { CultureCode } from "../../../types/languages";
import { ErrorScreen } from "../../layouts/error-screen";
import { ProfilePicture } from "../../layouts/profile-picture";
import { SpinnerScreen } from "../../layouts/spinner-screen";
import { PrayerGroupSectionHeader } from "../section-header/prayer-group-section-header";
import { JoinRequestActions } from "./join-request-actions";
import { usePrayerGroupJoinRequests } from "./use-prayer-group-join-requests";

type Props = {
  prayerGroupId: number;
};

export const PrayerGroupJoinRequests: React.FC<Props> = ({ prayerGroupId }) => {
  const { translate } = useI18N();
  const theme = useTheme();

  const {
    joinRequestLoadStatus,
    loadJoinRequests,
    searchJoinRequests,
    joinRequestQuery,
    filteredJoinRequests,
  } = usePrayerGroupJoinRequests(prayerGroupId);

  return (
    <SafeAreaView className="flex-1">
      <PrayerGroupSectionHeader
        title={translate("prayerGroup.joinRequest.manage")}
      />

      {joinRequestLoadStatus === LoadStatus.Loading && (
        <SpinnerScreen
          loadingLabel={translate(
            "prayerGroup.joinRequest.loadingJoinRequests"
          )}
          showSafeArea={false}
        />
      )}

      {joinRequestLoadStatus === LoadStatus.Error && (
        <ErrorScreen
          errorLabel={translate("prayerGroup.joinRequest.unableToLoad")}
          onRetry={loadJoinRequests}
        />
      )}

      {joinRequestLoadStatus === LoadStatus.Success && (
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
              value={joinRequestQuery}
              left={<TextInput.Icon icon="magnify" size={24} />}
              label={translate("prayerGroup.manageUsers.searchForUsers")}
              placeholder={translate(
                "prayerGroup.manageUsers.searchPlaceholder"
              )}
              onChangeText={searchJoinRequests}
            />
          </View>

          {filteredJoinRequests.length > 0 && (
            <FlatList
              data={filteredJoinRequests}
              className="flex-1"
              renderItem={({ item }) => {
                return (
                  <View
                    className="p-4 border-b flex-row justify-between"
                    style={{ borderBottomColor: theme.colors.outline }}
                  >
                    <View className="flex-row items-center w-1/2">
                      <ProfilePicture
                        url={item.user?.image?.fileUrl}
                        width={40}
                        height={40}
                      />
                      <View className="flex flex-col ml-4">
                        <Text
                          variant="bodyLarge"
                          ellipsizeMode="tail"
                          numberOfLines={1}
                        >
                          {item.user?.fullName}
                        </Text>
                        <Text
                          variant="bodySmall"
                          ellipsizeMode="tail"
                          numberOfLines={1}
                        >
                          @ {item.user?.username}
                        </Text>

                        {item.submittedDate && (
                          <Text
                            variant="bodySmall"
                            className="text-gray-500 mt-1"
                          >
                            {formatDate(
                              item.submittedDate,
                              i18n.language as CultureCode
                            )}
                          </Text>
                        )}
                      </View>
                    </View>

                    <JoinRequestActions />
                  </View>
                );
              }}
            />
          )}

          {filteredJoinRequests.length === 0 && (
            <View
              className="p-4 border-b flex-row justify-center mt-16 flex-1"
              style={{ borderBottomColor: theme.colors.outline }}
            >
              <View>
                <Text variant="titleMedium">
                  {translate("prayerGroup.joinRequest.noActiveJoinRequests")}
                </Text>
              </View>
            </View>
          )}

          <View
            className="p-4 border-t"
            style={{ borderTopColor: theme.colors.outline }}
          >
            <Button mode="contained">{translate("common.actions.save")}</Button>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
