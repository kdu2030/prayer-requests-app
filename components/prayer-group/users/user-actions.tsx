import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Button, TouchableRipple, useTheme } from "react-native-paper";

import { PrayerGroupRole } from "../../../constants/prayer-group-constants";
import { useI18N } from "../../../hooks/use-i18n";

type Props = {
  role: PrayerGroupRole | undefined;
  index: number;
  onRoleChange: (index: number, role: PrayerGroupRole) => void;
  onDeletePress: (index: number) => void;
};

export const UserActions: React.FC<Props> = ({
  role,
  index,
  onRoleChange,
  onDeletePress,
}) => {
  const { translate } = useI18N();
  const theme = useTheme();

  return (
    <>
      <View className="flex flex-row items-center justify-between gap-x-2 grow">
        {role === PrayerGroupRole.Admin ? (
          <View className="justify-self-start">
            <Button
              mode="text"
              icon={"crown"}
              onPress={() => onRoleChange(index, PrayerGroupRole.Member)}
            >
              {translate("prayerGroup.manageUsers.admin")}
            </Button>
          </View>
        ) : (
          <Button
            mode="text"
            icon={"account"}
            onPress={() => onRoleChange(index, PrayerGroupRole.Admin)}
          >
            {translate("prayerGroup.manageUsers.member")}
          </Button>
        )}

        <TouchableRipple
          style={{
            borderRadius: 9999,
          }}
          borderless
          onPress={() => onDeletePress(index)}
          rippleColor={theme.colors.errorContainer}
        >
          <MaterialCommunityIcons
            name="minus"
            size={36}
            color={theme.colors.error}
          />
        </TouchableRipple>
      </View>
    </>
  );
};
