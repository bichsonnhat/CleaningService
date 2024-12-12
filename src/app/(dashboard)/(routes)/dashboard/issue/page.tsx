"use client";
import React from "react";
import IssueTable from "@/components/issue/IssueTable";

export default function IssuePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <IssueTable />
    </div>
  );
}
