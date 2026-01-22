import * as React from "react";
import { FlatList } from "react-native";

import { PrayerRequestSkeleton } from "./prayer-request-skeleton";

type Props = {
  numCards: number;
};

export const PrayerRequestSkeletonList: React.FC<Props> = ({ numCards }) => {
  return (
    <FlatList
      data={Array(numCards)}
      renderItem={() => <PrayerRequestSkeleton />}
    />
  );
};
