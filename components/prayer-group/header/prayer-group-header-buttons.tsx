import classNames from "classnames";
import * as React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  className?: string;
  onPress: () => void;
  children: React.ReactNode;
};

export const PrayerGroupHeaderButtons: React.FC<Props> = ({
  className,
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity
      className={classNames("rounded-full p-1 self-start", className)}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};
