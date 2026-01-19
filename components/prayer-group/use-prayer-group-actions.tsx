import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as React from "react";

import { PrayerRequestModel } from "../../types/prayer-request-types";

export const usePrayerGroupActions = () => {
  const prayerRequestActionsRef = React.useRef<BottomSheetMethods>(null);
  const [selectedPrayerRequest, setSelectedPrayerRequest] = React.useState<
    PrayerRequestModel | undefined
  >();

  const openPrayerRequestActions = (prayerRequest: PrayerRequestModel) => {
    if (!prayerRequestActionsRef.current) {
      return;
    }

    prayerRequestActionsRef.current.snapToIndex(0);
    setSelectedPrayerRequest(prayerRequest);
  };

  const closePrayerRequestActions = () => {
    prayerRequestActionsRef.current?.close();
    setSelectedPrayerRequest(undefined);
  };

  return {
    selectedPrayerRequest,
    openPrayerRequestActions,
    closePrayerRequestActions,
    prayerRequestActionsRef,
  };
};
