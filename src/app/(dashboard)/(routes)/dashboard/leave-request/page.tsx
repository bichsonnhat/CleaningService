"use client"
import LeaveRequestTable from "@/components/leave-request/LeaveRequestTable";
import React, { useEffect, useState } from "react";
import { currentUser } from "@clerk/nextjs/server";

const LeaveRequestPage = () => {
  const [curUserId, setCurUserId] = useState("");
  const [role, setRole] = useState("");

  const fetchUserInfo = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-info`);
    const data = await response.json();
    setCurUserId(data.userId);
    setRole(data.role);
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  let userRole = role ?? "helper";

  let tableProps;

  //Tam thoi xai User cung, sau nay get currentUser
  if (userRole === "helper") {
    tableProps = {
      canCreate: true,
      userId: curUserId ?? "0066dc01-cdd4-4243-9f4e-778bcfa4458f",
    };
  } else {
    tableProps = {
      canCreate: false,
      userId: curUserId ?? "ee6efe69-71ca-4e3d-bc07-ba6e5c3e061e",
    };
  }

  return (
    <>
      <LeaveRequestTable {...tableProps} />
    </>
  );
};

export default LeaveRequestPage;
