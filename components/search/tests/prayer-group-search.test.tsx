import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import {
  act,
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";

import { mountComponent } from "../../../tests/utils/test-utils";
import { PrayerGroupSearch } from "../prayer-group-search";
import {
  mockPrayerGroupSearchResponse,
  mockPrayerGroupSearchResults,
} from "./mock-data";
import { PrayerGroupSearchTestIds } from "./test-ids";

let component: RenderResult;

const mockPostPrayerGroupSearch = jest.fn();
const mockRouterPush = jest.fn();

jest.mock("../../../api/post-prayer-group-search", () => ({
  usePostPrayerGroupSearch:
    () => (groupNameQuery: string, maxNumResults?: number) =>
      mockPostPrayerGroupSearch(groupNameQuery, maxNumResults),
}));

jest.mock("expo-router", () => ({
  usePathname: () => "/",
  router: {
    push: (route: string) => mockRouterPush(route),
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
    mockPostPrayerGroupSearch.mockReturnValue({
      isError: false,
      value: mockPrayerGroupSearchResponse,
    });

    component = mountComponent(<PrayerGroupSearch />);

    const searchInput = component.getByTestId(
      PrayerGroupSearchTestIds.searchInput,
    );
    act(() => fireEvent.changeText(searchInput, "Prayer Group"));

    const prayerGroupResultsList = await component.findByTestId(
      PrayerGroupSearchTestIds.prayerGroupResultsList,
    );

    mockPrayerGroupSearchResults.forEach((prayerGroup) => {
      expect(prayerGroupResultsList).toHaveTextContent(
        prayerGroup.groupName ?? "",
      );
    });
  });

  test("Clicking on a prayer group search result navigates to the prayer group", async () => {
    mockPostPrayerGroupSearch.mockReturnValue({
      isError: false,
      value: mockPrayerGroupSearchResponse,
    });

    component = mountComponent(<PrayerGroupSearch />);

    const searchInput = component.getByTestId(
      PrayerGroupSearchTestIds.searchInput,
    );

    fireEvent.changeText(searchInput, "Prayer Group");

    const prayerGroupResult = await component.findByTestId(
      `${PrayerGroupSearchTestIds.prayerGroupResult}[0]`,
    );
    fireEvent.press(prayerGroupResult);

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname: "/prayergroup/[id]",
        params: { id: mockPrayerGroupSearchResults[0].prayerGroupId },
      });
    });
  });
});
