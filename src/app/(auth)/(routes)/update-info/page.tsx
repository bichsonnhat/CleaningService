"use client"

import UpdateCustomerInfo from "@/components/updateinfo/customer/UpdateCustomerInfo";
import UpdateStaffInfo from "@/components/updateinfo/staff/UpdateStaffInfo";
import React from "react";
import { userRoleStore } from "@/utils/store/role.store";

const page = () => {
  const role = userRoleStore((state) => state.role);

  return (
    <div>
      {role === 'Helper' && <UpdateStaffInfo/>}
      {role === 'Customer' && <UpdateCustomerInfo/>}
    </div>
  )
};

export default page;
