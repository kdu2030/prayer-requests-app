import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

import { PrayerGroupRole } from "../../../constants/prayer-group-constants";
import { useI18N } from "../../../hooks/use-i18n";
import { DismissButton } from "../../inputs/dismiss-button";
import { DismissTouchableRipple } from "../../inputs/dismiss-touchable-ripple";

type Props = {
  role: PrayerGroupRole | undefined;
  index: number;
  onRoleChange: (index: number, role: PrayerGroupRole) => void;
  onDeletePress: (index: number) => void;
  roleChangeTestID?: string;
  deleteUserTestID?: string;
};

export const UserActions: React.FC<Props> = ({
  role,
  index,
  onRoleChange,
  onDeletePress,
  roleChangeTestID,
  deleteUserTestID,
}) => {
  const { translate } = useI18N();
  const theme = useTheme();

  return (
    <>
      <View className="flex flex-row items-center gap-x-2 flex-1">
        <View className="flex-1">
          {role === PrayerGroupRole.Admin ? (
            <DismissButton
              mode="text"
              icon={"crown"}
              onPress={() => onRoleChange(index, PrayerGroupRole.Member)}
              testID={roleChangeTestID}
            >
              {translate("prayerGroup.manageUsers.admin")}
            </DismissButton>
          ) : (
            <DismissButton
              mode="text"
              icon={"account"}
              onPress={() => onRoleChange(index, PrayerGroupRole.Admin)}
              testID={roleChangeTestID}
            >
              {translate("prayerGroup.manageUsers.member")}
            </DismissButton>
          )}
        </View>

        <View>
          <DismissTouchableRipple
            style={{
              borderRadius: 9999,
            }}
            borderless
            onPress={() => onDeletePress(index)}
            rippleColor={theme.colors.errorContainer}
            testID={deleteUserTestID}
          >
            <MaterialCommunityIcons
              name="minus"
              size={36}
              color={theme.colors.error}
            />
          </DismissTouchableRipple>
        </View>
      </View>
    </>
  );
};
