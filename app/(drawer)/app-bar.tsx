import * as React from "react";
import { Appbar, Drawer } from "react-native-paper";
import { useI18N } from "../../hooks/use-i18n";

const CustomAppBar: React.FC = () => {
  const { translate } = useI18N();

  return (
    <>
      <Appbar.Header style={{ backgroundColor: "rgb(16, 109, 32)" }} dark>
        <Appbar.Action icon="menu" onPress={() => {}} />
        <Appbar.Content
          title={translate("common.appName")}
          titleStyle={{ fontWeight: "700" }}
        />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        {/* TODO: Placeholder, replace with account photo */}
        <Appbar.Action icon="account" onPress={() => {}} />
      </Appbar.Header>
    </>
  );
};

export default CustomAppBar;
