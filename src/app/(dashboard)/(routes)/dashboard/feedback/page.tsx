//"use client";
import FeedbackTable from "@/components/feedback/FeedbackTable";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";

export default async function FeedbackPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await currentUser();
  //console.log("User", user);
  return (
    <div>
      <FeedbackTable />
    </div>
  );
}
