import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { PUBLIC_ROUTES } from "@/constants";
import { isAdmin } from "@/lib/auth/auth.helpers";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(PUBLIC_ROUTES);

export default clerkMiddleware((getAuth, req) => {
  const auth = getAuth();

  if (!isPublicRoute(req)) {
    if (auth.userId && !isAdmin(auth)) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    } else {
      auth.protect();
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
