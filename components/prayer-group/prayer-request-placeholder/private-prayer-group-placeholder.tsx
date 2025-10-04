import * as React from "react";
import { useI18N } from "../../../hooks/use-i18n";
import { View } from "react-native";
import { Foundation } from "@expo/vector-icons";
import { Button, Text } from "react-native-paper";
import { JoinStatus } from "../../../constants/prayer-group-constants";

type Props = {
  prayerGroupId: number;
  joinStatus: JoinStatus;
  setUserJoinStatus: (joinStatus: JoinStatus) => void;
};

export const PrivatePrayerGroupPlaceholder: React.FC<Props> = ({
  joinStatus,
}) => {
  const { translate } = useI18N();

  return (
    <View className="items-center mx-4">
      <Foundation name="lock" size={64} />
      <Text className="mt-5" variant="titleMedium">
        {translate("prayerGroup.joinRequest.label")}
      </Text>

      <View className="mt-5">
        {joinStatus === JoinStatus.NotJoined ? (
          <Button mode="contained">
            {translate("prayerGroup.joinRequest.submitJoinRequest")}
          </Button>
        ) : (
          <Button mode="contained" disabled={true}>
            {translate("prayerGroup.joinRequest.joinRequestSubmitted")}
          </Button>
        )}
      </View>
    </View>
  );
};
