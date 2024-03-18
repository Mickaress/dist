export const sleep = (time: number) => {
  return new Promise((res) => setTimeout(res, time));
};

export const delayRes = async <T>(data: T, delay: number): Promise<T> => {
  await sleep(delay);
  return data;
};
