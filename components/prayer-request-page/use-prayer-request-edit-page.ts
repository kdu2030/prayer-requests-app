import * as React from "react";
import { TextInput } from "react-native";

import { usePrayerRequestDetailContext } from "../prayer-request/prayer-request-detail-context";

export function usePrayerRequestEditPage(prayerRequestId: number) {
  const { getPrayerRequestFromStore } = usePrayerRequestDetailContext();

  const requestDescriptionRef = React.useRef<TextInput>(null);

  const [isInitialFocusComplete, setIsInitialFocusComplete] =
    React.useState<boolean>(false);

  const initialValues = React.useMemo(() => {
    return getPrayerRequestFromStore(prayerRequestId);
  }, [getPrayerRequestFromStore, prayerRequestId]);

  React.useEffect(() => {
    if (!requestDescriptionRef.current) {
      return;
    }

    requestDescriptionRef.current.focus();
    setIsInitialFocusComplete(true);
  }, [isInitialFocusComplete]);

  return {
    initialValues,
    requestDescriptionRef,
  };
}
