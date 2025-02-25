import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../../hooks/use-i18n";
import { SpinnerScreen } from "../../layouts/spinner-screen";
import { PrayerGroupSectionHeader } from "../section-header/prayer-group-section-header";
import { PrayerGroupUsersSpinner } from "./prayer-group-users-spinner";
import { usePrayerGroupUsers } from "./use-prayer-group-users";

type Props = {
  prayerGroupId: number;
};

export const PrayerGroupUsers: React.FC<Props> = ({ prayerGroupId }) => {
  const { translate } = useI18N();
  const { isLoading, isError } = usePrayerGroupUsers(prayerGroupId);

  if (isLoading) {
    return <PrayerGroupUsersSpinner />;
  }

  return (
    <SafeAreaView className="flex-1">
      <PrayerGroupSectionHeader
        title={translate("prayerGroup.manageUsers.label")}
      />
    </SafeAreaView>
  );
};
