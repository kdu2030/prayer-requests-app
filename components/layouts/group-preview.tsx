import * as React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Text } from "react-native-paper";

import { ProfilePicture } from "./profile-picture";

type Props = {
  groupName: string;
  description: string;
  profilePictureUri?: string;
  backgroundColor?: string;
  bannerTestID?: string;
  groupNameTestID?: string;
  descriptionTestID?: string;
};

export const GroupPreview: React.FC<Props> = ({
  groupName,
  description,
  profilePictureUri,
  bannerTestID,
  groupNameTestID,
  descriptionTestID,
  backgroundColor,
}) => {
  const theme = useTheme();

  return (
    <View
      className="rounded-lg border  flex flex-grow-0 overflow-hidden"
      style={{ borderColor: theme.colors.outline }}
    >
      <View
        className="h-16"
        style={{ backgroundColor }}
        testID={bannerTestID}
      />
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
