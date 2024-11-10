import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/dashboard(.*)"]);

const isAdminRoute = createRouteMatcher(["/dashboard/chart"]);

export default clerkMiddleware(async (auth, request) => {
  // if (isPublicRoute(request)) {
  //   auth.protect();
  // }
  // // Demo check admin
  // if (
  //   isAdminRoute(request) &&
  //   (await auth()).sessionClaims?.metadata?.role !== "admin"
  // ) {
  //   const url = new URL("/", request.url);
  //   return NextResponse.redirect(url);
  // }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
