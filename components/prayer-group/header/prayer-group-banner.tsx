import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { Image, View } from "react-native";
import { Text } from "react-native-paper";

import { useI18N } from "../../../hooks/use-i18n";
import { PrayerGroupHeaderTestIds } from "./tests/test-ids";

type Props = {
  uri: string | undefined;
};

export const PrayerGroupBanner: React.FC<Props> = ({ uri }) => {
  const { translate } = useI18N();

  return (
    <View className="bg-gray-300">
      {uri ? (
        <Image
          className="w-full h-20"
          source={{ uri }}
          style={{
            resizeMode: "cover",
          }}
          testID={PrayerGroupHeaderTestIds.imageBanner}
        />
      ) : (
        <View
          className="w-full h-20 justify-center items-center"
          testID={PrayerGroupHeaderTestIds.bannerPlaceholder}
        >
          <MaterialIcons name="image" size={36} color="#1f2937" />
          <Text variant="bodyMedium" className="text-gray-800 mt-1">
            {translate("image.missing.label")}
          </Text>
        </View>
      )}
    </View>
  );
};
