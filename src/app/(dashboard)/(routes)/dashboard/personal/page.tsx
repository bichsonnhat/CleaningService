import CustomerInfo from '@/components/customer/CustomerInfo';
import EmployeeInfo from '@/components/employee/EmployeeInfo';
import React, { useEffect, useState } from 'react'

const PersonalPage = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");

  const fetchUserInfo = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-info`);
    const data = await response.json();
    setUserId(data.userId);
    setRole(data.role);
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

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