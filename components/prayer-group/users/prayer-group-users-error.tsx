import * as React from "react";

import { useI18N } from "../../../hooks/use-i18n";
import { ErrorScreen } from "../../layouts/error-screen";
import { PrayerGroupContentContainer } from "../section-header/prayer-group-content-container";

type Props = {
  onRetry: () => void;
};

export const PrayerGroupUsersError: React.FC<Props> = ({ onRetry }) => {
  const { translate } = useI18N();

  return (
    <PrayerGroupContentContainer
      title={translate("prayerGroup.manageUsers.label")}
    >
      <ErrorScreen
        errorLabel={translate("prayerGroup.manageUsers.unableToLoad")}
        onRetry={onRetry}
        showSafeArea={false}
      />
    </PrayerGroupContentContainer>
  );
};
