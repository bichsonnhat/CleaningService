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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-info`);
    const data = await response.json();
    setUserId(data.userId);
    setRole(data.role);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (isLoading){
    return (
      <div className="flex justify-center items-center w-full h-[500px]">
        <ClipLoader color="#2A88F5" loading={true} size={30} />
      </div>
    );
  }

  return (
    <div>
      {role === "helper"
        ? <EmployeeInfo helperId={userId} />
        : role === "customer" 
          ? <CustomerInfo customerId={userId} />
          : <div>Personal Page</div>}
    </div>
  )
}

export default PersonalPage