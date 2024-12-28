"use client";
import CustomerInfo from '@/components/customer/CustomerInfo';
import EmployeeInfo from '@/components/employee/EmployeeInfo';
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';

const PersonalPage = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserInfo = async () => {
    setIsLoading(true); // Bắt đầu quá trình tải dữ liệu

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-info`);

      if (!response.ok) {
        throw new Error(`Failed to fetch user info: ${response.statusText}`);
      }

      const data = await response.json();

      setUserId(data.userId);
      setRole(data.role);

    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <ClipLoader color="#2A88F5" loading={true} size={30} />
      </div>
    );
  }

  return (
    <div>
      {role === "helper"
        ? <EmployeeInfo role={role} helperId={userId} />
        : role === "customer"
          ? <CustomerInfo role={role} customerId={userId} />
          : <div>Personal Page</div>}
    </div>
  )
}

export default PersonalPage