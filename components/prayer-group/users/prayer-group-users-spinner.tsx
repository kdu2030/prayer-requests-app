import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../../hooks/use-i18n";
import { SpinnerScreen } from "../../layouts/spinner-screen";
import { PrayerGroupSectionHeader } from "../section-header/prayer-group-section-header";

export const PrayerGroupUsersSpinner: React.FC = () => {
  const { translate } = useI18N();

  return (
    <SafeAreaView className="flex-1">
      <PrayerGroupSectionHeader
        title={translate("prayerGroup.manageUsers.label")}
      />
      <SpinnerScreen
        loadingLabel={translate("prayerGroup.manageUsers.loading")}
        showSafeArea={false}
      />
    </SafeAreaView>
  );
};
