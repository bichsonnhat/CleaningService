import React, { Suspense } from 'react';

type Props = {
  children: React.ReactNode;
};

const PaymentLayout = ({ children }: Props) => {
  return (
    <Suspense>
      <div className="flex items-center justify-center h-screen">
        {children}
      </div>
    </Suspense>
  );
};

export default PaymentLayout;
