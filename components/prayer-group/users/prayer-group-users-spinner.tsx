import * as React from "react";

import { useI18N } from "../../../hooks/use-i18n";
import { SpinnerScreen } from "../../layouts/spinner-screen";
import { PrayerGroupContentContainer } from "../section-header/prayer-group-content-container";

export const PrayerGroupUsersSpinner: React.FC = () => {
  const { translate } = useI18N();

  return (
    <PrayerGroupContentContainer
      title={translate("prayerGroup.manageUsers.label")}
    >
      <SpinnerScreen
        loadingLabel={translate("prayerGroup.manageUsers.loading")}
        showSafeArea={false}
      />
    </PrayerGroupContentContainer>
  );
};
