export const sleep = async (timeout: number) => {
  await new Promise((resolve) => setTimeout(resolve, timeout));
};

export const getArrayTestId = (baseTestId: string, key?: number) => {
  return `${baseTestId}-${key}`;
};
