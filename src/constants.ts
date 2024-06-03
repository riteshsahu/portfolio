export const ROUTE_PATH = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  AUTH: "/auth",

  SNIPPETS: "/dashboard/snippets",
  ADD_SNIPPET: "/dashboard/snippets/add",
  VIEW_SNIPPET: "/dashboard/snippets/[slug]",
  UPDATE_SNIPPET: "/dashboard/snippets/[slug]/update",

  RESOURCES: "/dashboard/resources",
  ADD_RESOURCE: "/dashboard/resources/add",
  VIEW_RESOURCE: "/dashboard/resources/[slug]",
  UPDATE_RESOURCE: "/dashboard/resources/[slug]/update",

  RESOURCES_CATEGORIES: "/dashboard/resources/categories",
  ADD_RESOURCE_CATEGORY: "/dashboard/resources/categories/add",
  VIEW_RESOURCE_CATEGORY: "/dashboard/resources/categories/[slug]",
  UPDATE_RESOURCE_CATEGORY: "/dashboard/resources/categories/[slug]/update",
} as const;

export const PUBLIC_ROUTES = [ROUTE_PATH.HOME, ROUTE_PATH.AUTH];

export const SNIPPET_EDITOR_THEME = "one-dark-pro";
