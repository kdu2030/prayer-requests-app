import { RenderResult } from "@testing-library/react-native";
import { Formik } from "formik";

import { mountComponent } from "../../../../../tests/utils/test-utils";
import { mockUserData } from "../../../tests/mock-data";
import { CreatePrayerRequestForm } from "../../create-prayer-request-types";
import { ExpirationStep } from "../expiration-step";

jest.mock("../../../../../hooks/use-api-data", () => ({
  ...jest.requireActual("../../../../../hooks/use-api-data"),
  useApiDataContext: () => ({
    userData: mockUserData,
  }),
}));

let component: RenderResult;

const mountExpirationStep = (
  createPrayerRequestForm: CreatePrayerRequestForm
) => {
  return mountComponent(
    <Formik initialValues={createPrayerRequestForm} onSubmit={() => {}}>
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
});
