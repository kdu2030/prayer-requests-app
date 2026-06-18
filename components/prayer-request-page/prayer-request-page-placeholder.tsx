import * as React from "react";
import { View } from "react-native";

import { useI18N } from "../../hooks/use-i18n";
import { LoadStatus } from "../../types/api-response-types";
import { ErrorScreen } from "../layouts/error-screen";
import { SpinnerScreen } from "../layouts/spinner-screen";
import { PrayerGroupContentContainer } from "../prayer-group/section-header/prayer-group-content-container";

type Props = {
  prayerRequestLoadStatus: LoadStatus;
  loadPrayerRequest: () => void;
};

export const PrayerRequestPagePlaceholder: React.FC<Props> = ({
  prayerRequestLoadStatus,
  loadPrayerRequest,
}) => {
  const { translate } = useI18N();

  return (
    <PrayerGroupContentContainer>
      <View className="flex flex-1">
        {prayerRequestLoadStatus === LoadStatus.Loading && (
          <SpinnerScreen
            loadingLabel={translate("prayerRequestPage.loading")}
            showSafeArea={false}
          />
        )}

        {prayerRequestLoadStatus === LoadStatus.Error && (
          <ErrorScreen
            errorLabel={translate("prayerRequestPage.failedToLoad")}
            onRetry={loadPrayerRequest}
            showSafeArea={false}
          />
        )}
      </View>
    </PrayerGroupContentContainer>
  );
};
