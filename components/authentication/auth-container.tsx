import * as React from "react";
import { ImageBackground, View } from "react-native";

type Props = {
  children: React.ReactNode;
};

export function AuthContainer({ children }: Props) {
  const backgroundImageSrc = {
    uri: "https://cdn.pixabay.com/photo/2020/03/03/20/31/boat-4899802_1280.jpg",
  };

  return (
    <ImageBackground source={backgroundImageSrc} className="flex flex-1">
      <View className="flex bg-white mt-auto h-1/2 rounded-xl items-center">
        <View className="h-full">{children}</View>
      </View>
    </ImageBackground>
  );
}
