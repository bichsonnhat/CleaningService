"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex m-auto flex-col gap-5 items-center justify-center">
      <Image
        src="/images/Header/Logo.svg"
        alt="logo"
        width={100}
        height={100}
      />

      <div className="text-center space-y-3">
        <h4 className="text-3xl font-semibold">Thank you!</h4>
        <div className="space-y-1">
          <p className="text-lg">
            Your payment has been successfully processed.
          </p>
          <p className="text-lg">
            If you have any questions or need assistance, feel free to contact
            us.
          </p>
          <p className="text-lg">We look forward to serving you!</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm">
            You'll be automatically redirected to the homepage shortly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
