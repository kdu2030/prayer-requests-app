import * as React from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CustomAppBar } from "../../components/navigation/app-bar";

const DrawerLayout: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          header: ({ navigation }) => <CustomAppBar navigation={navigation} />,
        }}
      ></Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
