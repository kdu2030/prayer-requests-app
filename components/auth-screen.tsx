import * as React from "react";
import { Text, Button } from "react-native-paper"
import { View } from "react-native";
import { StyleSheet } from "react-native";


export function AuthScreen() {
    return (
        <View>
            <Text variant="headlineMedium">Prayer Requests App</Text>
            <View className="w-9/12 mt-3">
                <Button mode="contained">Sign up</Button>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    signUpButton: {
        marginTop: "10%"
    },
})