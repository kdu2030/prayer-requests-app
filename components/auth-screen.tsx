import * as React from "react";
import { Text, Button } from "react-native-paper"
import { View } from "react-native";
import { StyleSheet, ImageBackground } from "react-native";


export function AuthScreen() {
    const backgroundImageSrc = {
        uri: "https://cdn.pixabay.com/photo/2020/03/03/20/31/boat-4899802_1280.jpg"
    }


    return (
        <ImageBackground source={backgroundImageSrc} className="flex flex-1">
            <View className="flex bg-white mt-auto h-1/2 rounded-xl items-center">
                <View className="h-full">
                    <Text variant="displaySmall" className="font-bold mt-5">Welcome to</Text>
                    <Text variant="displaySmall" className="font-bold">Prayer Requests App</Text>
                    <Text variant="bodyLarge" className="text-gray-500 mt-3">The easier way to manage your prayer life</Text>
                    <View className="flex flex-row w-full mt-auto mb-10">
                        <Button mode="contained" className="w-2/5 mr-3">Sign up</Button>
                        <Button mode="outlined" className="w-2/5">Sign in</Button>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    signUpButton: {
        marginTop: "10%"
    },
})