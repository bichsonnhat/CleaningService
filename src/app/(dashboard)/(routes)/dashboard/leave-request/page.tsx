"use client";
import LeaveRequestTable from "@/components/leave-request/LeaveRequestTable";
import { userStore } from "@/utils/store/role.store";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const LeaveRequestPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const setRole = userStore((state) => state.setRole);
  const setUserId = userStore((state) => state.setId);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-info`);
      const data = await response.json();

      const userRole = data.role ?? "helper";
      const userId = data.userId ?? "0066dc01-cdd4-4243-9f4e-778bcfa4458f";
      setRole(userRole);
      setUserId(userId);
    
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      // Handle error state if needed
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[500px]">
        <ClipLoader color="#2A88F5" loading={true} size={30} />
      </div>
    );
  }

  return (
    <LeaveRequestTable/>
  );
};

export default LeaveRequestPage;
