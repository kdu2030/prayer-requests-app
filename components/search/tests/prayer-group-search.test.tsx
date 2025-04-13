import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import {
  act,
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";
import { Href } from "expo-router";

import { mountComponent } from "../../../tests/utils/test-utils";
import { PrayerGroupSearch } from "../prayer-group-search";
import { mockPrayerGroupSearchResults } from "./mock-data";
import { PrayerGroupSearchTestIds } from "./test-ids";

let component: RenderResult;

const mockGetPrayerGroupsBySearch = jest.fn();
const mockRouterPush = jest.fn();

jest.mock("../../../api/get-prayer-groups-by-search", () => ({
  useGetPrayerGroupsBySearch: () => (query: string, maxResults: number) =>
    mockGetPrayerGroupsBySearch(query, maxResults),
}));

jest.mock("expo-router", () => ({
  usePathname: () => "/",
  router: {
    push: (route: Href<any> | string) => mockRouterPush(route),
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

  test("Prayer group search results display", async () => {
    mockGetPrayerGroupsBySearch.mockReturnValue({
      isError: false,
      value: mockPrayerGroupSearchResults,
    });

    component = mountComponent(<PrayerGroupSearch />);

    const searchInput = component.getByTestId(
      PrayerGroupSearchTestIds.searchInput
    );
    act(() => fireEvent.changeText(searchInput, "Prayer Group"));

    const prayerGroupResultsList = await component.findByTestId(
      PrayerGroupSearchTestIds.prayerGroupResultsList
    );

    mockPrayerGroupSearchResults.forEach((prayerGroup) => {
      expect(prayerGroupResultsList).toHaveTextContent(
        prayerGroup.groupName ?? ""
      );
    });
  });

  test("Clicking on a prayer group search result navigates to the prayer group", async () => {
    mockGetPrayerGroupsBySearch.mockReturnValue({
      isError: false,
      value: mockPrayerGroupSearchResults,
    });

    component = mountComponent(<PrayerGroupSearch />);

    const searchInput = component.getByTestId(
      PrayerGroupSearchTestIds.searchInput
    );

    fireEvent.changeText(searchInput, "Prayer Group");

    const prayerGroupResult = await component.findByTestId(
      `${PrayerGroupSearchTestIds.prayerGroupResult}[0]`
    );
    fireEvent.press(prayerGroupResult);

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname: "/prayergroup/[id]",
        params: { id: mockPrayerGroupSearchResults[0].id },
      });
    });
  });
});
