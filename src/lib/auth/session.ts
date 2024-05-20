import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { add } from "date-fns";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
export const sessionExpireTime = add(new Date(), { months: 2 });

type JwtPayload = {
  user: {
    username: string;
  };
  expires: Date;
};

export async function encryptJwt(payload: JwtPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(sessionExpireTime)
    .sign(secretKey);
}

export async function decryptJwt(input: string): Promise<JwtPayload> {
  const { payload }: { payload: JwtPayload } = await jwtVerify(input, secretKey, {
    algorithms: ["HS256"],
  });
  return payload;
}
