import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { ImageBackground, View } from "react-native";

type Props = {
  children: React.ReactNode;
  containerClassNames?: string;
  classNames?: string;
};

export const AuthContainer: React.FC<Props> = ({
  children,
  classNames,
  containerClassNames = "h-3/4",
}) => {
  const backgroundImageSrc = {
    uri: "https://cdn.pixabay.com/photo/2020/03/03/20/31/boat-4899802_1280.jpg",
  };

  return (
    <>
      {/* <StatusBar hidden /> */}
      <ImageBackground source={backgroundImageSrc} className="flex flex-1">
        <View
          className={`flex bg-white mt-auto rounded-xl items-center ${containerClassNames}`}
        >
          <View className={`h-full ${classNames ?? ""}`}>{children}</View>
        </View>
      </ImageBackground>
    </>
  );
};
