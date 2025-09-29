import * as React from "react";
import { LoadStatus } from "../../../types/api-response-types";
import { View } from "react-native";
import { PrayerRequestSpinner } from "../spinners/prayer-request-spinner";
import { ErrorScreen } from "../../layouts/error-screen";
import { PrayerRequestPlaceholder } from "../prayer-request-placeholder";
import { useI18N } from "../../../hooks/use-i18n";

type Props = {
  prayerGroupId: number;
  prayerGroupHeader: React.ReactNode;
  prayerRequestLoadStatus: LoadStatus;
  loadNextPrayerRequestsForGroup: (
    prayerGroupId: number,
    showCompleteSpinner: boolean
  ) => void;
};

export const PrayerRequestPlaceholderBody: React.FC<Props> = ({
  prayerGroupId,
  prayerGroupHeader,
  prayerRequestLoadStatus,
  loadNextPrayerRequestsForGroup,
}) => {
  const { translate } = useI18N();

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

        {prayerRequestLoadStatus === LoadStatus.Success && (
          <PrayerRequestPlaceholder />
        )}
      </View>
    </>
  );
};
