import { clerkClient, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { bookingStore } from "./utils/store/booking.store";

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

// New booking step routes
const isBookingStep1Route = createRouteMatcher(["/booking/step-1"]);
const isBookingStep2Route = createRouteMatcher(["/booking/step-2"]);
const isBookingStep3Route = createRouteMatcher(["/booking/step-3"]);
const isBookingStep4Route = createRouteMatcher(["/booking/step-4"]);
const isBookingStep5Route = createRouteMatcher(["/booking/step-5"]);

const roles = ["admin", "customer", "helper"];

const resetBookingData = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-info?isSelectService=${false}&isStep1Completed=${false}&isStep2Completed=${false}&isStep3Completed=${false}&isStep4Completed=${false}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default clerkMiddleware(async (auth, request) => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId && isPublicRoute(request)) {
    return redirectToSignIn();
  }

  const role = (await auth()).sessionClaims?.metadata?.role;
  const bookingData = (await auth()).sessionClaims?.metadata?.BookingStatus;
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
    isAdminRoute(request) && role !== "admin"
  ) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  if (
    isCustomerRoute(request) && role !== "customer"
  ) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  if (
    isHelperRoute(request) && role !== "helper"
  ) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  if (
    isSharedRoute(request) && role !== "customer" && role !== "helper"
  ) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  // Booking step protection logic
  const BookingStatus = (await auth()).sessionClaims?.metadata?.BookingStatus;

  // Protect booking step routes based on previous steps' completion
  if (isBookingStep1Route(request) && !BookingStatus?.isSelectService) {
    const url = new URL("/select", request.url);
    return NextResponse.redirect(url);
  }

  if (isBookingStep2Route(request) && !BookingStatus?.isStep1Completed) {
    const url = new URL("/booking/step-1", request.url);
    resetBookingData();
    return NextResponse.redirect(url);
  }

  if (isBookingStep3Route(request) && !BookingStatus?.isStep2Completed) {
    const url = new URL("/booking/step-2", request.url);
    resetBookingData();
    return NextResponse.redirect(url);
  }

  if (isBookingStep4Route(request) && !BookingStatus?.isStep3Completed) {
    const url = new URL("/booking/step-3", request.url);
    resetBookingData();
    return NextResponse.redirect(url);
  }

  if (isBookingStep5Route(request) && !BookingStatus?.isStep4Completed) {
    const url = new URL("/booking/step-4", request.url);
    resetBookingData();
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
