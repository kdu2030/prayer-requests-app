import { useLocalSearchParams } from "expo-router";
import * as React from "react";
import { Text } from "react-native-paper";

type RouteParams = {
  id: string;
};

const PrayerGroupContainer: React.FC = () => {
  const { id } = useLocalSearchParams<RouteParams>();
  return <Text>Prayer Group ID: {id}</Text>;
};

export default PrayerGroupContainer;
