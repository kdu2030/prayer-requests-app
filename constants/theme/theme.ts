import { MD3LightTheme, MD3Theme } from "react-native-paper";

export const LIGHT_THEME: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#259409",
    primaryContainer: "#007e20",
    onPrimaryContainer: "007e20",
    secondary: "#47a01d",
    secondaryContainer: "#308c12",
    onSecondaryContainer: "#308c12",
    tertiary: "#1da077",
    tertiaryContainer: "#13835c",
    onTertiaryContainer: "#13835c",
    outline: "#167705",
    elevation: {
      ...MD3LightTheme.colors.elevation,
      level2: "#bedfb5",
    },
  },
};
