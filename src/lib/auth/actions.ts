"use server";
import { ROUTE_PATH } from "@/constants";
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { encryptJwt, sessionExpireTime } from "./session";

export async function login(prevState: any, formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password") as string;
  const encryptPass = crypto
    .createHash("SHA256")
    .update(password)
    .digest("hex");

  if (username !== process.env.AUTH_USER) {
    return {
      message: "Invalid Username!",
      status: "failure",
    };
  }

  if (encryptPass !== process.env.AUTH_PASS) {
    return {
      message: "Invalid Password!",
      status: "failure",
    };
  }

  // Create the session
  const user = { username };
  const expires = sessionExpireTime;
  const session = await encryptJwt({ user, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });

  redirect(ROUTE_PATH.HOME);
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  redirect(ROUTE_PATH.HOME);
}
