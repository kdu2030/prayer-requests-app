import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../../hooks/use-i18n";
import { ErrorScreen } from "../../layouts/error-screen";
import { PrayerGroupSectionHeader } from "../section-header/prayer-group-section-header";

type Props = {
  onRetry: () => void;
};

export const PrayerGroupUsersError: React.FC<Props> = ({ onRetry }) => {
  const { translate } = useI18N();

  return (
    <SafeAreaView className="flex-1">
      <PrayerGroupSectionHeader
        title={translate("prayerGroup.manageUsers.label")}
      />
      <ErrorScreen
        errorLabel={translate("prayerGroup.manageUsers.unableToLoad")}
        onRetry={onRetry}
      />
    </SafeAreaView>
  );
};
