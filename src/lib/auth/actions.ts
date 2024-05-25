"use server";
import { ROUTE_PATH } from "@/constants";
import { AuthFormInputs, ServerResponse } from "@/lib/types";
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { encryptJwt, sessionExpireTime } from "./session";

export async function login(values: AuthFormInputs): Promise<ServerResponse> {
  const { username, password } = values;

  if (username !== process.env.AUTH_USER) {
    return {
      message: "Invalid Username!",
      ok: false,
    };
  }

  const encryptPass = crypto
    .createHash("SHA256")
    .update(password)
    .digest("hex");

  if (encryptPass !== process.env.AUTH_PASS) {
    return {
      message: "Invalid Password!",
      ok: false,
    };
  }

  // Create the session
  const user = { username };
  const expires = sessionExpireTime;
  const session = await encryptJwt({ user, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });

  redirect(ROUTE_PATH.DASHBOARD);
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  redirect(ROUTE_PATH.AUTH);
}
