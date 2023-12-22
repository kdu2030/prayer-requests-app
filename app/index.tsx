import * as React from "react";
import { PaperProvider } from "react-native-paper";
import { Text } from "react-native-paper";
import { AuthScreen } from "../components/auth-screen";
import { registerRootComponent } from "expo";

const AppContainer: React.FC = () => {
    return (
        <PaperProvider>
            <AuthScreen />
        </PaperProvider>
    )
}

registerRootComponent(AppContainer)

export default AppContainer;