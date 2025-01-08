"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

function PaymentCancelled() {
  const router = useRouter();
  const navigateToHome = () => router.replace("/");
  const navigateToOrder = () => router.push("/booking/select");

  const params = useSearchParams();
  const cancel = params.get("cancel");
  const orderCode = params.get("orderCode");

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/payos/cancel-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderCode }),
      });
      return res.json();
    },
  });

  useEffect(() => {
    if (cancel === null) {
      router.replace("/");
    }
  }, [orderCode]);

  return (
    <div className="m-auto flex flex-col items-center justify-center gap-5">
      <Image
        src="/images/Header/Logo.svg"
        alt="logo"
        width={100}
        height={100}
      />

      {orderCode != null ? (
        <>
          <div className="text-center">
            <h4 className="text-3xl font-semibold text-red-950">
              Your booking has been cancelled!
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={navigateToHome}
              variant="outline"
              className="min-w-40 border-blue-600 bg-white text-blue-600 hover:bg-blue-100 hover:text-blue-600"
            >
              Back To Homepage
            </Button>
            <Button
              onClick={navigateToOrder}
              className="min-w-40 bg-blue-600 text-white hover:bg-blue-700"
            >
              Create New Booking
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="text-center">
            <h4 className="text-3xl font-semibold text-red-950">
              Invalid order code or
              <br />
              you cannot access this order!
            </h4>
          </div>

          <Button
            onClick={navigateToHome}
            variant="outline"
            className="min-w-40 border-blue-600 bg-white text-blue-600 hover:bg-blue-100 hover:text-blue-600"
          >
            Back To Homepage
          </Button>
        </>
      )}

      {orderCode === null && cancel === null && (
        <FaSpinner className="size-10 animate-spin" />
      )}
    </div>
  );
}

export default PaymentCancelled;
