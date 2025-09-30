import * as React from "react";
import { LoadStatus } from "../../../types/api-response-types";
import { View } from "react-native";
import { PrayerRequestSpinner } from "../spinners/prayer-request-spinner";
import { ErrorScreen } from "../../layouts/error-screen";
import { PrayerRequestPlaceholder } from "../prayer-request-placeholder";
import { useI18N } from "../../../hooks/use-i18n";
import {
  JoinStatus,
  VisibilityLevel,
} from "../../../constants/prayer-group-constants";
import { PrivatePrayerGroupPlaceholder } from "./private-prayer-group-placeholder";

type Props = {
  prayerGroupId: number;
  prayerGroupHeader: React.ReactNode;
  prayerRequestLoadStatus: LoadStatus;
  loadNextPrayerRequestsForGroup: (
    prayerGroupId: number,
    showCompleteSpinner: boolean
  ) => void;
  visibilityLevel?: VisibilityLevel;
  joinStatus?: JoinStatus;
};

export const PrayerRequestPlaceholderBody: React.FC<Props> = ({
  prayerGroupId,
  prayerGroupHeader,
  prayerRequestLoadStatus,
  loadNextPrayerRequestsForGroup,
  visibilityLevel,
  joinStatus,
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
          <PrayerRequestSpinner
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

        {isLoadingSuccessful && (
          <>
            {showPrivatePrayerGroupPlaceholder ? (
              <PrivatePrayerGroupPlaceholder />
            ) : (
              <PrayerRequestPlaceholder />
            )}
          </>
        )}
      </View>
    </>
  );
};
