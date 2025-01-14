import "expo-router/entry";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerRootComponent } from "expo";
import { router } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import * as React from "react";
import { View } from "react-native";
import { ActivityIndicator, Snackbar, Text } from "react-native-paper";

import { useApiDataContext } from "../hooks/use-api-data";
import { useI18N } from "../hooks/use-i18n";

const AppContainer: React.FC = () => {
  const { loadLanguage, translate } = useI18N();
  const [isErrorVisible, setIsErrorVisible] = React.useState<boolean>(false);
  const { initializeContextFromStorage } = useApiDataContext();

  const loadUserData = async () => {
    const response = await loadLanguage();
    if (response.isError) {
      setIsErrorVisible(true);
    }

    if (response.isError || response.value == null) {
      router.push("/language/language-picker");
      return;
    }

    await initializeContextFromStorage();
  };

  React.useEffect(() => {
    loadUserData();
  }, []);

  return (
    <>
      <View className="flex items-center justify-center flex-1">
        <ActivityIndicator animating={true} size={70} />
        <Text className="mt-5" variant="titleMedium">
          {translate("loading.userData.text")}
        </Text>
      </View>

      <Snackbar
        className="bg-red-700"
        duration={3000}
        visible={isErrorVisible}
        onDismiss={() => {
          setIsErrorVisible(false);
        }}
        onIconPress={() => setIsErrorVisible(false)}
      >
        {translate("toaster.failed.loadFailure", {
          item: translate("loading.userData.label").toLocaleLowerCase(),
        })}
      </Snackbar>
    </>
  );
};

NativeWindStyleSheet.setOutput({
  default: "native",
});

registerRootComponent(AppContainer);

export default AppContainer;
