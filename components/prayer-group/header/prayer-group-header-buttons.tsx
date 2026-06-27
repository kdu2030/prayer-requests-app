import classNames from "classnames";
import * as React from "react";

import { DismissTouchableOpacity } from "../../inputs/dismiss-touchable-opacity";

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
    <DismissTouchableOpacity
      className={classNames("rounded-full p-1 self-start", className)}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onPress={onPress}
    >
      {children}
    </DismissTouchableOpacity>
  );
};
