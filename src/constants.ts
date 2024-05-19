export enum ROUTE_PATH {
  HOME = "/",
  SNIPPETS = "/snippets",
  ADD_SNIPPET = "/snippets/add",
  UPDATE_SNIPPET = "/snippets/[slug]/update",
}

export const PUBLIC_ROUTES = [ROUTE_PATH.HOME, ROUTE_PATH.SNIPPETS];
