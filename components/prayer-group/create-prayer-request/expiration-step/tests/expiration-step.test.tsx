import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import {
  fireEvent,
  renderHook,
  RenderResult,
} from "@testing-library/react-native";
import { Formik } from "formik";

import { mountComponent } from "../../../../../tests/utils/test-utils";
import { mockPrayerGroupDetails, mockUserData } from "../../../tests/mock-data";
import {
  CreatePrayerRequestForm,
  RawCreatePrayerRequestForm,
  TimeToLiveOption,
} from "../../create-prayer-request-types";
import { ExpirationStep } from "../expiration-step";
import { useExpirationStepValidationSchema } from "../use-expiration-step-validation-schema";
import { ExpirationStepTestIds } from "./test-ids";

const mockPostPrayerRequest = jest.fn();

jest.mock("../../../../../api/post-prayer-request", () => ({
  usePostPrayerRequest:
    () =>
    (
      prayerGroupId: number,
      createPrayerRequestForm: RawCreatePrayerRequestForm
    ) =>
      mockPostPrayerRequest(prayerGroupId, createPrayerRequestForm),
}));

jest.mock("../../../../../hooks/use-api-data", () => ({
  ...jest.requireActual("../../../../../hooks/use-api-data"),
  useApiDataContext: () => ({
    userData: mockUserData,
  }),
}));

jest.mock("../../../prayer-group-context", () => ({
  ...jest.requireActual("../../../prayer-group-context"),
  usePrayerGroupContext: () => ({
    prayerGroupDetails: mockPrayerGroupDetails,
  }),
}));

let component: RenderResult;

const mountExpirationStep = (
  createPrayerRequestForm: CreatePrayerRequestForm
) => {
  const { result: expirationStepValidationRef } = renderHook(() =>
    useExpirationStepValidationSchema()
  );

  return mountComponent(
    <Formik
      initialValues={createPrayerRequestForm}
      validationSchema={expirationStepValidationRef.current}
      onSubmit={() => {}}
    >
      <ExpirationStep setWizardStep={() => {}} />
    </Formik>
  );
};

describe(ExpirationStep, () => {
  afterEach(() => {
    component?.unmount();
    jest.resetAllMocks();
  });

  test("Mount test", () => {
    component = mountExpirationStep({
      requestTitle: "Request title",
      requestDescription: "Request description",
    });

    expect(component).toBeTruthy();
  });

  test("Save gets blocked when the user does not choose an expiration date.", async () => {
    component = mountExpirationStep({
      requestTitle: "Request title",
      requestDescription: "Request description",
    });

    const saveButton = component.getByTestId(ExpirationStepTestIds.saveButton);
    fireEvent.press(saveButton);

    const timeToLiveDropdown = await component.findByTestId(
      ExpirationStepTestIds.timeToLiveDropdown
    );
    expect(timeToLiveDropdown).toHaveTextContent("required");
    expect(mockPostPrayerRequest).not.toHaveBeenCalled();
  });

  test("Post prayer request gets called with the correct expiration date", async () => {
    jest.setSystemTime(new Date("2016-05-04"));

    mockPostPrayerRequest.mockReturnValue({ isError: false });

    component = mountExpirationStep({
      requestTitle: "Request Title",
      requestDescription: "Request description",
      timeToLive: TimeToLiveOption.TwoWeeks,
    });

    const expectedPrayerRequest: RawCreatePrayerRequestForm = {
      userId: 1,
      requestTitle: "Request Title",
      requestDescription: "Request description",
      expirationDate: new Date("2016-05-18").toISOString(),
    };

    const saveButton = component.findByTestId(ExpirationStepTestIds.saveButton);
    fireEvent.press(saveButton);

    expect(mockPostPrayerRequest).toHaveBeenCalledWith(
      2,
      expectedPrayerRequest
    );
  });
});
