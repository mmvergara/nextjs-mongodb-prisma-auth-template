import { NextResponse } from "next/server";
import { auth } from "./auth";
import { apiAuthPrefix, authRoutes, publicRoutes } from "./routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRotue = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // if it is an API Next Auth route, we don't want to redirect
  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      // if the user is already logged in and is in sign-in or sign-up page
      // redirect to the default logged in page (which is dashboard in this case)
      console.log("redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    // if the user is not logged in and is in sign-in or sign-up page, let them be
    return;
  }

  if (!isLoggedIn && !isPublicRotue) {
    // if the user is not logged in and is not in a public route, redirect to sign-in page
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
