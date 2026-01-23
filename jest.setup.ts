import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("expo-router", () => ({
  usePathname: () => "/",
  router: {
    push: jest.fn(),
  },
}));

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "",
  MaterialCommunityIcons: "",
  MaterialIcons: "",
  EvilIcons: "",
}));

jest.mock("expo-font");
jest.mock("expo-asset");
