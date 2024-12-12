import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/select",
  "/select-role",
  "/booking(.*)",
]);

const isVerfiedRoute = createRouteMatcher(["/select-role"]);

const isAdminRoute = createRouteMatcher([
  "/dashboard/chart",
  "/dashboard/order",
  "/dashboard/customer",
  "/dashboard/employee",
  "/dashboard/service",
  "/dashboard/service/category",
  "/dashboard/service/detail",
  "/dashboard/feedback",
  "/dashboard/issue",
  "/dashboard/refund",
  // "/api(.*)"
]);

const isCustomerRoute = createRouteMatcher([
  "/dashboard/order-history",
  "/dashboard/feedback",
  "/dashboard/refund",
]);

const isHelperRoute = createRouteMatcher([
  "/dashboard/issue",
  "/dashboard/job-history",
  "/dashboard/leave-request",
]);

const isSharedRoute = createRouteMatcher([
  "/dashboard/personal",
  "/dashboard/calendar",
]);

const roles = ["admin", "customer", "helper"];

export default clerkMiddleware(async (auth, request) => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId && isPublicRoute(request)) {
    return redirectToSignIn();
  }

  const role = (await auth()).sessionClaims?.metadata?.role;
  if (!role) {
    // If trying to access any public route except /select-role, redirect to /select-role
    if (isPublicRoute(request) && request.nextUrl.pathname !== "/select-role") {
      const url = new URL("/select-role", request.url);
      return NextResponse.redirect(url);
    }

    // If trying to access routes that require a role, redirect to /select-role
    if (
      isAdminRoute(request) ||
      isCustomerRoute(request) ||
      isHelperRoute(request) ||
      isSharedRoute(request)
    ) {
      const url = new URL("/select-role", request.url);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (isVerfiedRoute(request)) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  if (
    isAdminRoute(request) &&
    (await auth()).sessionClaims?.metadata?.role !== "admin"
  ) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  if (
    isCustomerRoute(request) &&
    (await auth()).sessionClaims?.metadata?.role !== "customer"
  ) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  if (
    isHelperRoute(request) &&
    (await auth()).sessionClaims?.metadata?.role !== "helper"
  ) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  if (
    isSharedRoute(request) &&
    (await auth()).sessionClaims?.metadata?.role !== "customer" &&
    (await auth()).sessionClaims?.metadata?.role !== "helper"
  ) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
