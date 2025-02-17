import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type RouteParams = {
  id: string;
};

const PrayerGroupContainer: React.FC = () => {
  const { id } = useLocalSearchParams<RouteParams>();
  return (
    <SafeAreaView>
      <StatusBar translucent />
      <Text>Prayer Group ID: {id}</Text>
    </SafeAreaView>
  );
};

export default PrayerGroupContainer;
