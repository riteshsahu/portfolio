import { PUBLIC_ROUTES, ROUTE_PATH } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "./lib/auth";

export default async function middleware(req: NextRequest) {
  const auth = await getAuth();
  const path: any = req.nextUrl.pathname;
  // TODO: use route matcher
  const isPublicRoute = PUBLIC_ROUTES.includes(path);

  if (!isPublicRoute && !auth?.user) {
    return NextResponse.redirect(new URL(ROUTE_PATH.HOME, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
