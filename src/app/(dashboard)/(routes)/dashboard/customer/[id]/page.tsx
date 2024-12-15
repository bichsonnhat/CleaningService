import React from 'react';
import CustomerInfo from '@/components/customer/CustomerInfo';

const CustomerDetail = ({ params }: { params: { id: string } }) => {
  return (
    <CustomerInfo userId={params.id}/>
  )
}

export default CustomerDetail