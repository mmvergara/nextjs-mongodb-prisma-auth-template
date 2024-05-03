import { auth } from "./auth";
import {
  DEFAULT_LOGGED_IN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRotue = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    // if user is logged in, redirect to default logged in route
    if (isLoggedIn) {
      console.log(
        "REDIRECTING TO DEFAULT LOGGED IN ROUTE",
        DEFAULT_LOGGED_IN_REDIRECT,
        nextUrl
      );
      return Response.redirect(new URL(DEFAULT_LOGGED_IN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRotue) {
    return Response.redirect(new URL("/sign-in", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
