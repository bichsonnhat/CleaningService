"use client"

import UpdateCustomerInfo from "@/components/updateinfo/customer/UpdateCustomerInfo";
import UpdateStaffInfo from "@/components/updateinfo/staff/UpdateStaffInfo";
import React from "react";
import { userStore } from "@/utils/store/role.store";

const page = () => {
  const role = userStore((state) => state.role);
  const userId = userStore((state) => state.id);

  return (
    <div>
      {role === 'Helper' && <UpdateStaffInfo userId={userId}/>}
      {role === 'Customer' && <UpdateCustomerInfo userId={userId}/>}
    </div>
  )
};

export default page;
