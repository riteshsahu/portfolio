import { useAuth as useClerkAuth, useUser as useClerkUser } from "@clerk/nextjs";
import { isAdmin } from "./auth.helpers";

export function useAuth() {
  const auth = useClerkAuth();

  return {
    ...auth,
    isAdmin: isAdmin(auth),
  };
}

export function useUser() {
  const user = useClerkUser();

  return user;
}
