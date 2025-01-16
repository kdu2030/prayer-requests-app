import classnames from "classnames";
import * as React from "react";
import { Image } from "react-native";

type Props = {
  className?: string;
  url: string | undefined;
  width: number;
  height: number;
};

export const ProfilePicture: React.FC<Props> = ({
  url,
  className,
  width,
  height,
}) => {
  const defaultProfilePicture =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  return (
    <Image
      className={classnames("rounded-full", className)}
      source={{ uri: url ?? defaultProfilePicture }}
      style={{ width, height }}
    />
  );
};
