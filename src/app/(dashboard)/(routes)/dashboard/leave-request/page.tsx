import LeaveRequestTable from "@/components/leave-request/LeaveRequestTable";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";

const LeaveRequestPage = async () => {
  let userRole = "helper";

  let tableProps;

  //Tam thoi xai User cung, sau nay get currentUser
  if (userRole === "helper") {
    tableProps = {
      canCreate: true,
      userId: "0066dc01-cdd4-4243-9f4e-778bcfa4458f",
    };
  } else {
    tableProps = {
      canCreate: false,
      userId: "ee6efe69-71ca-4e3d-bc07-ba6e5c3e061e",
    };
  }

  return (
    <>
      <LeaveRequestTable {...tableProps} />
    </>
  );
};

export default LeaveRequestPage;
