export const ROUTE_PATH = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  AUTH: "/auth",
  SNIPPETS: "/dashboard/snippets",
  ADD_SNIPPET: "/dashboard/snippets/add",
  UPDATE_SNIPPET: "/dashboard/snippets/[slug]/update",

  TOOLS: "/dashboard/tools",
  ADD_TOOL: "/dashboard/tools/add",
  UPDATE_TOOL: "/dashboard/tools/[slug]/update",
} as const;

export const PUBLIC_ROUTES = [ROUTE_PATH.HOME, ROUTE_PATH.AUTH];

export const SNIPPET_EDITOR_THEME = "one-dark-pro";
