import { RenderResult } from "@testing-library/react-native";

import { mountComponent } from "../../../tests/utils/test-utils";
import { PrayerGroupSearch } from "../prayer-group-search";

let component: RenderResult;

const mockGetPrayerGroupsByName = jest.fn();

jest.mock("../../../api/get-prayer-groups-by-search", () => ({
  useGetPrayerGroupsBySearch: () => (query: string, maxResults: number) =>
    mockGetPrayerGroupsByName(query, maxResults),
}));

jest.mock("expo-router", () => ({
  usePathname: () => "/",
  router: {
    push: jest.fn(),
  },
}));

describe(PrayerGroupSearch, () => {
  afterEach(() => {
    component?.unmount();
  });

  test("Mount test", () => {
    component = mountComponent(<PrayerGroupSearch />);
    expect(component).toBeTruthy();
  });
});
