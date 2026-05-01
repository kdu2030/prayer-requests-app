import * as React from "react";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../hooks/use-i18n";
import { LoadStatus } from "../../types/api-response-types";
import { ErrorScreen } from "../layouts/error-screen";
import { SpinnerScreen } from "../layouts/spinner-screen";
import { PrayerGroupSectionHeader } from "../prayer-group/section-header/prayer-group-section-header";
import { PrayerRequestCard } from "./prayer-request-card";
import { usePrayerRequestPage } from "./use-prayer-request-page";

type Props = {
  prayerRequestId: number;
};

export const PrayerRequestPage: React.FC<Props> = ({ prayerRequestId }) => {
  const theme = useTheme();
  const { translate } = useI18N();

  const {
    prayerRequest,
    prayerRequestLoadStatus,
    loadPrayerRequest,
    onLikePress,
    isLikeLoading,
  } = usePrayerRequestPage(prayerRequestId);

  return (
    <SafeAreaView
      className="flex flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      <PrayerGroupSectionHeader
        title={prayerRequest?.prayerGroup?.groupName ?? ""}
      />

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

      {prayerRequestLoadStatus === LoadStatus.Success && prayerRequest && (
        <PrayerRequestCard
          prayerRequest={prayerRequest}
          onOpenMenu={() => {}}
          isLikeLoading={isLikeLoading}
          onLikePress={onLikePress}
          onPrayPress={() => {}}
          showCreatedUser
        />
      )}
    </SafeAreaView>
  );
};
