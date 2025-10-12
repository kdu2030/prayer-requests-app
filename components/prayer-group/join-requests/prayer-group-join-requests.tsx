import * as React from "react";
import { View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../../hooks/use-i18n";
import { LoadStatus } from "../../../types/api-response-types";
import { ErrorScreen } from "../../layouts/error-screen";
import { SpinnerScreen } from "../../layouts/spinner-screen";
import { PrayerGroupSectionHeader } from "../section-header/prayer-group-section-header";
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
        </View>
      )}
    </SafeAreaView>
  );
};
