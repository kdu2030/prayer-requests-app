import classnames from "classnames";
import * as React from "react";
import { Image, View } from "react-native";

type Props = {
  className?: string;
  containerClassName?: string;
  url: string | undefined;
  width: number;
  height: number;
  testID?: string;
};

export const ProfilePicture: React.FC<Props> = ({
  url,
  containerClassName,
  className,
  width,
  height,
  testID,
}) => {
  const defaultProfilePicture =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  return (
    <View className={containerClassName}>
      <Image
        className={classnames("rounded-full", className)}
        source={{ uri: url ?? defaultProfilePicture }}
        style={{ width, height }}
        testID={testID}
      />
    </View>
  );
};
