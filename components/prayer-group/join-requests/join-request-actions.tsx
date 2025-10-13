import color from "color";
import * as React from "react";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";

import { useI18N } from "../../../hooks/use-i18n";
import { JoinRequestForm } from "../../../types/join-request-types";

type JoinRequestActionsProps = {
  joinRequestId: number;
  joinRequestForm: JoinRequestForm;
  approveJoinRequest: (joinRequestId: number) => void;
  rejectJoinRequest: (joinRequestId: number) => void;
};

export const JoinRequestActions: React.FC<JoinRequestActionsProps> = ({
  joinRequestId,
  joinRequestForm,
  approveJoinRequest,
  rejectJoinRequest,
}) => {
  const { translate } = useI18N();
  const theme = useTheme();

  const selectedColor = React.useMemo(
    () => color(theme.colors.primary).alpha(0.12).rgb().toString(),
    [theme.colors.primary]
  );

  const isSelected = React.useMemo(() => {
    return joinRequestForm.approvedJoinRequestIds.includes(joinRequestId);
  }, [joinRequestForm.approvedJoinRequestIds, joinRequestId]);

  const isRejected = React.useMemo(() => {
    return joinRequestForm.rejectedJoinRequestIds.includes(joinRequestId);
  }, [joinRequestForm.rejectedJoinRequestIds, joinRequestId]);

  return (
    <View className="flex flex-row items-center gap-x-1 flex-1">
      <View className="flex-1">
        <Button
          mode="text"
          icon={"check"}
          buttonColor={isSelected ? selectedColor : undefined}
          onPress={() => approveJoinRequest(joinRequestId)}
        >
          {translate("common.actions.approve")}
        </Button>
      </View>

      <View className="flex-1">
        <Button
          mode="text"
          icon={"close"}
          textColor={theme.colors.error}
          rippleColor={theme.colors.errorContainer}
          buttonColor={isRejected ? theme.colors.errorContainer : undefined}
          onPress={() => rejectJoinRequest(joinRequestId)}
        >
          {translate("common.actions.reject")}
        </Button>
      </View>
    </View>
  );
};
