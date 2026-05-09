import * as React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../hooks/use-i18n";
import { LoadStatus } from "../../types/api-response-types";
import { ErrorScreen } from "../layouts/error-screen";
import { SpinnerScreen } from "../layouts/spinner-screen";
import { PrayerGroupSectionHeader } from "../prayer-group/section-header/prayer-group-section-header";

type Props = {
  prayerRequestLoadStatus: LoadStatus;
  loadPrayerRequest: () => void;
};

export const PrayerRequestPagePlaceholder: React.FC<Props> = ({
  prayerRequestLoadStatus,
  loadPrayerRequest,
}) => {
  const theme = useTheme();
  const { translate } = useI18N();

  return (
    <SafeAreaView
      className="flex flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      <View className="flex flex-1">
        <PrayerGroupSectionHeader />

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
    </SafeAreaView>
  );
};
