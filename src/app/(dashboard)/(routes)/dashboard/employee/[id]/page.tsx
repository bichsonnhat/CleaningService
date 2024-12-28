import React from 'react';
import EmployeeInfo from '@/components/employee/EmployeeInfo';

const EmployeeDetail = ({ params }: { params: { id: string } }) => {
  return (
    <EmployeeInfo role="admin" helperId={params.id}/>
  )
}

export default EmployeeDetail