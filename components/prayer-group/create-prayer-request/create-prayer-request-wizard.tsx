import * as React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../../hooks/use-i18n";
import { PrayerGroupSectionHeader } from "../section-header/prayer-group-section-header";
import { useCreatePrayerRequestWizard } from "./use-create-prayer-request-wizard";

export const CreatePrayerRequestWizard: React.FC = () => {
  const theme = useTheme();

  const { translate } = useI18N();
  const { getPrayerRequestWizardContent } = useCreatePrayerRequestWizard();

  return (
    <SafeAreaView>
      <View
        className="w-full h-full"
        style={{ backgroundColor: theme.colors.background }}
      >
        <PrayerGroupSectionHeader
          title={translate("prayerGroup.actions.addPrayerRequest")}
        />
        <View className="flex flex-col w-full p-4">
          <>{getPrayerRequestWizardContent()}</>
        </View>
      </View>
    </SafeAreaView>
  );
};
