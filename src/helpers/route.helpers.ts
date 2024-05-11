import { ROUTE_PATH } from "@/constants";

type Params = {
  [key: string]: string | number;
};

export const getRoutePath = (path: ROUTE_PATH, params: Params = {}): string => {
  const pathRegex = /\[(\w+)\]/g;

  return path.replace(pathRegex, (match, paramKey) => {
    const paramValue = params[paramKey];
    return (paramValue !== undefined ? paramValue : match) as string;
  });
};
