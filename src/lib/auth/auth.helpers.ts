export function isAdmin(auth: any): Boolean {
  // https://clerk.com/docs/organizations/verify-user-permissions
  return auth && auth.has({ role: "org:admin" });
}
