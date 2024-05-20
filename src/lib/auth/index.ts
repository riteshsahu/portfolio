import "server-only";
import { cookies } from "next/headers";
import { decryptJwt } from "./session";

// TODO: wrap this in React.cache()
export const getAuth = async () => {
  const sessionJwt = cookies().get("session")?.value;
  if (!sessionJwt) return {};
  const session = await decryptJwt(sessionJwt);

  return {
    user: session.user,
  };
};
