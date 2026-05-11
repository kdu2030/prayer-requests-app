import * as React from "react";
import { View } from "react-native";

import {
  JoinStatus,
  VisibilityLevel,
} from "../../../constants/prayer-group-constants";
import { useI18N } from "../../../hooks/use-i18n";
import { LoadStatus } from "../../../types/api-response-types";
import { ErrorScreen } from "../../layouts/error-screen";
import { PrayerRequestPlaceholder } from "../prayer-request-placeholder";
import { PrayerRequestListSpinner } from "../spinners/prayer-request-list-spinner";
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
};

export const PrayerRequestPlaceholderBody: React.FC<Props> = ({
  prayerGroupId,
  prayerGroupHeader,
  prayerRequestLoadStatus,
  loadNextPrayerRequestsForGroup,
  visibilityLevel,
  joinStatus,
  setUserJoinStatus,
}) => {
  const { translate } = useI18N();

  const isLoadingSuccessful = prayerRequestLoadStatus === LoadStatus.Success;
  const showPrivatePrayerGroupPlaceholder =
    visibilityLevel === VisibilityLevel.Private &&
    joinStatus !== JoinStatus.Joined;

  return (
    <>
      {prayerGroupHeader}
      <View className="mt-32">
        {prayerRequestLoadStatus === LoadStatus.Loading && (
          <PrayerRequestListSpinner
            textClassName="mt-5"
            labelVariant={"titleMedium"}
          />
        )}

        {prayerRequestLoadStatus === LoadStatus.Error && (
          <ErrorScreen
            errorLabel={translate("prayerRequest.loading.failure")}
            showSafeArea={false}
            fillContainer={false}
            onRetry={() => loadNextPrayerRequestsForGroup(prayerGroupId, true)}
          />
        )}

        {isLoadingSuccessful && !showPrivatePrayerGroupPlaceholder && (
          <PrayerRequestPlaceholder />
        )}

        {showPrivatePrayerGroupPlaceholder && (
          <PrivatePrayerGroupPlaceholder
            prayerGroupId={prayerGroupId}
            joinStatus={joinStatus ?? JoinStatus.NotJoined}
            setUserJoinStatus={setUserJoinStatus}
          />
        )}
      </View>
    </>
  );
};
