import * as React from "react";

import { useI18N } from "../../hooks/use-i18n";
import { PrayerGroupContentContainer } from "../prayer-group/section-header/prayer-group-content-container";

type PrayerRequestEditPageProps = {
  prayerRequestId: number;
};

export function PrayerRequestEditPage({
  prayerRequestId,
}: PrayerRequestEditPageProps) {
  const { translate } = useI18N();

  return (
    <PrayerGroupContentContainer title={translate("prayerRequest.edit.label")}>
      Edit Page
    </PrayerGroupContentContainer>
  );
}
