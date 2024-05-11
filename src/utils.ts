export const wait = async (milliseconds: number = 1000) => {
  await new Promise((res) => setTimeout(res, milliseconds));
};
