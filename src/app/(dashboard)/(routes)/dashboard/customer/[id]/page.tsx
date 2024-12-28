import React from 'react';
import CustomerInfo from '@/components/customer/CustomerInfo';

const CustomerDetail = ({ params }: { params: { id: string } }) => {
  return (
    <CustomerInfo role="admin" customerId={params.id}/>
  )
}

export default CustomerDetail