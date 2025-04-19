import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../../hooks/use-i18n";
import { PrayerGroupSectionHeader } from "../section-header/prayer-group-section-header";

export const CreatePrayerRequestWizard: React.FC = () => {
  const { translate } = useI18N();

  return (
    <SafeAreaView>
      <PrayerGroupSectionHeader
        title={translate("prayerGroup.actions.addPrayerRequest")}
      />
    </SafeAreaView>
  );
};
