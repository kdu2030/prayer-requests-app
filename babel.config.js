/* eslint-disable */

process.env.EXPO_ROUTER_APP_ROOT = "./app";
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      "nativewind/babel",
      "react-native-reanimated/plugin",
    ],
  };
};
