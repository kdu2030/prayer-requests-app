import * as React from "react";
import { View } from "react-native";

import { PrayerRequestSkeleton } from "./prayer-request-skeleton";

type Props = {
  numCards: number;
};

export const PrayerRequestSkeletonList: React.FC<Props> = ({ numCards }) => {
  return (
    <View className="flex flex-1 ">
      {[...Array(numCards)].map((_value, index) => (
        <PrayerRequestSkeleton key={index} />
      ))}
    </View>
  );
};
