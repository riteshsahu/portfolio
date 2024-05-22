export const wait = async (milliseconds: number = 1000) => {
  await new Promise((res) => setTimeout(res, milliseconds));
};

export const getFormData = (formData: FormData) => {
  return Array.from(formData.entries()).reduce((av, [key, value]) => {
    av[key] = value;
    return av;
  }, {} as any);
};
