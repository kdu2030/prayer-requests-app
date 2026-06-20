import * as React from "react";
import { LayoutChangeEvent } from "react-native";

import { usePrayerRequestDetailContext } from "../prayer-request/prayer-request-detail-context";

export function usePrayerRequestEditPage(prayerRequestId: number) {
  const { getPrayerRequestFromStore } = usePrayerRequestDetailContext();

  const [scrollViewHeight, setScrollViewHeight] = React.useState<number>();
  const [requestTitleHeight, setRequestTitleHeight] = React.useState<number>();

  const initialValues = React.useMemo(() => {
    return getPrayerRequestFromStore(prayerRequestId);
  }, [getPrayerRequestFromStore, prayerRequestId]);

  function onScrollViewLayout(event: LayoutChangeEvent) {
    setScrollViewHeight(event.nativeEvent.layout.height);
  }

  function onRequestTitleLayout(event: LayoutChangeEvent) {
    setRequestTitleHeight(event.nativeEvent.layout.height);
  }

  const requestDescriptionHeight = React.useMemo(() => {
    if (scrollViewHeight == null || requestTitleHeight == null) {
      return null;
    }

    return scrollViewHeight - requestTitleHeight - 28;
  }, [requestTitleHeight, scrollViewHeight]);

  return {
    initialValues,
    onScrollViewLayout,
    onRequestTitleLayout,
    requestDescriptionHeight,
  };
}
