import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import {
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";

import { mountComponent } from "../../../tests/utils/test-utils";
import { PrayerGroupSearch } from "../prayer-group-search";
import { mockPrayerGroupSearchResults } from "./mock-data";
import { PrayerGroupSearchTestIds } from "./test-ids";

let component: RenderResult;

const mockGetPrayerGroupsBySearch = jest.fn();

jest.mock("../../../api/get-prayer-groups-by-search", () => ({
  useGetPrayerGroupsBySearch: () => (query: string, maxResults: number) =>
    mockGetPrayerGroupsBySearch(query, maxResults),
}));

jest.mock("expo-router", () => ({
  usePathname: () => "/",
  router: {
    push: jest.fn(),
  },
}));

jest.mock("lodash/debounce", () => jest.fn((fn) => fn));

describe(PrayerGroupSearch, () => {
  afterEach(() => {
    component?.unmount();
  });

  test("Mount test", () => {
    component = mountComponent(<PrayerGroupSearch />);
    expect(component).toBeTruthy();
  });

  test("Prayer group search results display", async () => {
    mockGetPrayerGroupsBySearch.mockReturnValue({
      isError: false,
      value: mockPrayerGroupSearchResults,
    });

    component = mountComponent(<PrayerGroupSearch />);

    const searchInput = component.getByTestId(
      PrayerGroupSearchTestIds.searchInput
    );
    fireEvent.changeText(searchInput, "Prayer Group");

    await waitFor(() => {
      mockPrayerGroupSearchResults.forEach((prayerGroup) => {
        expect(component).toHaveTextContent(prayerGroup.groupName ?? "");
      });
    });
  });
});
