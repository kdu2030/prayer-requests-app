import * as React from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  JoinStatus,
  VisibilityLevel,
} from "../../../constants/prayer-group-constants";
import { useI18N } from "../../../hooks/use-i18n";
import { LoadStatus } from "../../../types/api-response-types";
import { ErrorScreen } from "../../layouts/error-screen";
import { PrayerRequestSkeletonList } from "../../prayer-request/prayer-request-skeleton-list";
import {
  PrayerGroupActionsContainer,
  PrayerGroupActionsContainerProps,
} from "../prayer-group-actions-container";
import { PrayerRequestPlaceholder } from "../prayer-request-placeholder";
import { PrivatePrayerGroupPlaceholder } from "./private-prayer-group-placeholder";

type Props = {
  prayerGroupId: number;
  prayerGroupHeader: React.ReactNode;
  prayerRequestLoadStatus: LoadStatus;
  loadNextPrayerRequestsForGroup: (
    prayerGroupId: number,
    showCompleteSpinner: boolean,
  ) => void;
  visibilityLevel?: VisibilityLevel;
  joinStatus?: JoinStatus;
  setUserJoinStatus: (joinStatus: JoinStatus) => void;
  prayerGroupActionsProps: PrayerGroupActionsContainerProps;
  isPrayerGroupRefreshing: boolean;
  refreshPrayerGroup: () => void;
};

export const PrayerRequestPlaceholderBody: React.FC<Props> = ({
  prayerGroupId,
  prayerGroupHeader,
  prayerRequestLoadStatus,
  loadNextPrayerRequestsForGroup,
  visibilityLevel,
  joinStatus,
  setUserJoinStatus,
  prayerGroupActionsProps,
  isPrayerGroupRefreshing,
  refreshPrayerGroup,
}) => {
  const { translate } = useI18N();
  const theme = useTheme();

  const isLoadingSuccessful = prayerRequestLoadStatus === LoadStatus.Success;
  const showPrivatePrayerGroupPlaceholder =
    visibilityLevel === VisibilityLevel.Private &&
    joinStatus !== JoinStatus.Joined;

  return (
    <SafeAreaView
      className="flex-1"
      edges={["left", "right", "bottom"]}
      style={{ backgroundColor: theme.colors.background }}
    >
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
            refreshing={isPrayerGroupRefreshing}
            onRefresh={refreshPrayerGroup}
          />
        }
      >
        {prayerGroupHeader}

        {prayerRequestLoadStatus === LoadStatus.Loading && (
          <PrayerRequestSkeletonList numCards={5} />
        )}

        {prayerRequestLoadStatus === LoadStatus.Error && (
          <View className="mt-32">
            <ErrorScreen
              errorLabel={translate("prayerRequest.loading.failure")}
              showSafeArea={false}
              fillContainer={false}
              onRetry={() =>
                loadNextPrayerRequestsForGroup(prayerGroupId, true)
              }
            />
          </View>
        )}

        {isLoadingSuccessful && !showPrivatePrayerGroupPlaceholder && (
          <View className="mt-32">
            <PrayerRequestPlaceholder />
          </View>
        )}

        {showPrivatePrayerGroupPlaceholder && (
          <View className="mt-32">
            <PrivatePrayerGroupPlaceholder
              prayerGroupId={prayerGroupId}
              joinStatus={joinStatus ?? JoinStatus.NotJoined}
              setUserJoinStatus={setUserJoinStatus}
            />
          </View>
        )}

        <PrayerGroupActionsContainer {...prayerGroupActionsProps} />
      </ScrollView>
    </SafeAreaView>
  );
};
