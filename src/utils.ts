import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const wait = async (milliseconds: number = 1000) => {
  await new Promise((res) => setTimeout(res, milliseconds));
};

export const getFormData = (formData: FormData) => {
  return Array.from(formData.entries()).reduce((av, [key, value]) => {
    av[key] = value;
    return av;
  }, {} as any);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
