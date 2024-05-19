import "server-only";
import { auth as clerkAuth, currentUser } from "@clerk/nextjs/server";
import { isAdmin } from "../auth.helpers";

export async function getSesstion() {
  return await currentUser();
}

export function getAuth() {
  const auth = clerkAuth();
  return {
    ...auth,
    isAdmin: isAdmin(auth),
  };
}
