export const sleep = async (timeout: number) => {
  await new Promise((resolve) => setTimeout(resolve, timeout));
};
