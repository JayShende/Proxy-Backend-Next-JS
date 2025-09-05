// import { auth } from "@/auth"

import NextAuth from "next-auth";

import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  publicRoutesPrefix,
} from "./route";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  //   const isLoggedIn= !!req.auth // adding !! makes it an boolean variable
  //   console.log("ROUTE- ",req.nextUrl.pathname);
  //   console.log("Is Logged in ",isLoggedIn)

  const { nextUrl } = req;
  const isLoggedin = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname); // checking weather the url is among the publicRoutes we will always allow this public routes
  const ispublicRoutesPrefix = nextUrl.pathname.startsWith(publicRoutesPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return undefined;
    // auth - next auth routes always allow them
  }

  if (isAuthRoute) {
    if (isLoggedin) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return undefined;
  }

  if (!isLoggedin && !isPublicRoute) {
    // not logged in and not on a public route we will redirect the person to login
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
//   if (ispublicRoutesPrefix) {
//     return undefined;
//   }
  return undefined;
});

//  we will be using the route path + isLoggedin Paramater to determine what has to be done with
// the Current Route on which the user in RN

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
