import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Image } from "react-native";
import { useTheme } from "react-native-paper";
import { Text } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { ProfilePicture } from "./profile-picture";

type Props = {
  groupName: string;
  description: string;
  profilePictureUri?: string;
  bannerUri?: string;
  bannerTestID?: string;
  groupNameTestID?: string;
  descriptionTestID?: string;
};

export const GroupPreview: React.FC<Props> = ({
  groupName,
  description,
  profilePictureUri,
  bannerUri,
  bannerTestID,
  groupNameTestID,
  descriptionTestID,
}) => {
  const theme = useTheme();
  const { translate } = useI18N();

  return (
    <View
      className="rounded-lg border  flex flex-grow-0 overflow-hidden"
      style={{ borderColor: theme.colors.outline }}
    >
      <View className="h-20 bg-gray-300" testID={bannerTestID}>
        {bannerUri ? (
          <Image source={{ uri: bannerUri }} className="h-full" />
        ) : (
          <View className="w-full h-20 justify-center items-center">
            <MaterialIcons name="image" size={28} color="#1f2937" />
            <Text variant="bodySmall" className="text-gray-800 mt-1">
              {translate("image.missing.label")}
            </Text>
          </View>
        )}
      </View>
      <View
        className="p-4"
        style={{ backgroundColor: theme.colors.background }}
      >
        <View className="flex flex-row items-center">
          <ProfilePicture url={profilePictureUri} width={48} height={48} />
          <Text
            variant="titleMedium"
            className="ml-4 font-bold w-4/5"
            numberOfLines={1}
            ellipsizeMode="tail"
            testID={groupNameTestID}
          >
            {groupName}
          </Text>
        </View>
        <Text className="mt-3" variant="bodyLarge" testID={descriptionTestID}>
          {description}
        </Text>
      </View>
    </View>
  );
};
