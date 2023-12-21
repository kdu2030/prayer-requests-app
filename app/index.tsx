import * as React from "react";
import { PaperProvider } from "react-native-paper";
import { Text } from "react-native-paper";

const Main: React.FC = () => {
    return (
        <PaperProvider>
            <Text>Test</Text>
        </PaperProvider>
    )
}

export default Main;