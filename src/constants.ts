export const ROUTE_PATH = {
  HOME: "/",
  AUTH: "/auth",
  SNIPPETS: "/snippets",
  ADD_SNIPPET: "/snippets/add",
  UPDATE_SNIPPET: "/snippets/[slug]/update",
} as const;

export const PUBLIC_ROUTES = [ROUTE_PATH.HOME, ROUTE_PATH.AUTH, ROUTE_PATH.SNIPPETS];
