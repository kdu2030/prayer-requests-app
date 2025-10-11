import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../../hooks/use-i18n";
import { LoadStatus } from "../../../types/api-response-types";
import { SpinnerScreen } from "../../layouts/spinner-screen";
import { PrayerGroupSectionHeader } from "../section-header/prayer-group-section-header";
import { usePrayerGroupJoinRequests } from "./use-prayer-group-join-requests";

type Props = {
  prayerGroupId: number;
};

export const PrayerGroupJoinRequests: React.FC<Props> = ({ prayerGroupId }) => {
  const { translate } = useI18N();

  const { joinRequestLoadStatus } = usePrayerGroupJoinRequests(prayerGroupId);

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
    </SafeAreaView>
  );
};
