import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { bookingStore } from "@/utils/store/booking.store";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Booking5Right = () => {
  const bookingData = bookingStore((state: any) => state.bookingData);
  const bookingUpdate = bookingStore((state: any) => state.updateBookingData);

  const [paymentMethod, setPaymentMethod] = useState<string>("Stripe");
  const [discount, setDiscount] = useState<number>(0);
  const [subTotalPrice, setSubTotalPrice] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const handleDiscount = () => {
    if (bookingData.bookingTiming === 1) {
      return true;
    }
    return false;
  };

  const paymentMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/payos", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
    onSuccess: (data: { paymentLink: string }) => {
      window.location.href = data?.paymentLink;
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handlePayment = async () => {
    if (paymentMethod === "Stripe") {
      try {
        setLoading(true);
        const unitAmount = 12_00;
        const response = await fetch(`/api/stripe?unit_amount=${unitAmount}`);
        const data = await response.json();
        router.push(data.url);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      paymentMutation.mutate({ paymentLink: "https://payos.com" });
    }
  };
  const mappingValue = (value: number) => {
    switch (value) {
      case 1:
        return "Flexible";
      case 8:
        return "08:00am";
      case 8.5:
        return "08:30am";
      case 9:
        return "09:00am";
      case 9.5:
        return "09:30am";
      case 10:
        return "10:00am";
      default:
        break;
    }
  };

  useEffect(() => {
    handleDiscount() && setDiscount(8.1);
    setSubTotalPrice(bookingData.totalPrice - discount);
    setTax(bookingData.totalPrice * 0.05);
    setTotalPrice(subTotalPrice + tax);
    bookingUpdate({ finalPrice: subTotalPrice + tax });
  }, [bookingData.totalPrice, discount, subTotalPrice, tax, totalPrice]);

  return (
    <div className="w-full min-w-[365px] md:w-1/3 p-4 bg-gray-100 min-h-screen">
      <p className="text-4xl mx-auto font-Averta-Bold mb-4 mt-[50px]">
        Billing
      </p>
      <div className="my-4 border-gray-300 rounded-lg">
        <div className="p-6 bg-white rounded-lg">
          <div className="flex justify-between ">
            <div className="text-gray-600 font-Averta-Regular">
              {bookingData.bookingInfomation?.[0]?.value}
            </div>
            <Separator
              orientation="vertical"
              className="border-gray-300 mx-4 h-9"
            />
            <div className="text-gray-600 font-Averta-Regular">
              {bookingData.bookingInfomation?.[1]?.value}
            </div>

            {bookingData.serviceCategory?.name === "Home Cleaning" && (
              <>
                <Separator
                  orientation="vertical"
                  className="border-gray-300 mx-4 h-9"
                />
                <div className="text-gray-600 font-Averta-Regular">
                  {bookingData.bookingInfomation?.[2]?.value}
                </div>
              </>
            )}
          </div>
          <div className="mb-4 border-t pt-4 flex">
            <p className="text-gray-600 font-Averta-Semibold">
              {bookingData.bookingDate || "Date Booking"} at{" "}
              {mappingValue(bookingData.bookingTiming) || "Time Booking"}
            </p>
          </div>
          <div className="mb-4 border-t pt-4">
            <p className=" text-gray-600 font-Averta-Semibold">
              {bookingData.APT + ", " + bookingData.bookingAddress ||
                "Your Address"}
            </p>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <p className=" text-gray-600 font-Averta-Semibold">
              Add-on:{" "}
              {Array.isArray(bookingData.anySpecificSpot) &&
              bookingData.anySpecificSpot.length > 0
                ? bookingData.anySpecificSpot
                    .map((spot: string) => spot)
                    .join(", ")
                : "Nothing added"}
            </p>
          </div>
        </div>
      </div>

      <div className=" my-[40px] border-gray-300 rounded-lg">
        <div className="p-6 bg-white rounded-lg">
          <div className="mb-4 flex justify-between items-center">
            <div className="flex">
              <p className="text-gray-600 font-Averta-Semibold">
                Appointment Value
              </p>
            </div>
            <p className="text-gray-600 font-Averta-Semibold ">
              $ {bookingData.totalPrice || 0}
            </p>
          </div>
          <div className="mb-4 flex justify-between items-center">
            <div className="flex">
              <p className=" text-gray-600 font-Averta-Semibold">Discounts</p>
            </div>
            <p className="text-gray-600 font-Averta-Semibold ">
              -$ {discount || 0}
            </p>
          </div>
          <div className="mb-4 border-t pt-4 flex justify-between items-center">
            <p className=" text-gray-600 font-Averta-Semibold">Subtotal</p>
            <p className="text-gray-600 font-Averta-Semibold ">
              $ {subTotalPrice || 0}
            </p>
          </div>
          <div className="mb-4 border-t pt-4 flex justify-between items-center">
            <p className=" text-gray-600 font-Averta-Semibold">Tax</p>
            <p className="text-gray-600 font-Averta-Semibold">+$ {tax || 0}</p>
          </div>
          <div className="border-t pt-4 justify-between items-center flex">
            <p className=" text-gray-600 text-[18px] font-Averta-Bold">Total</p>
            <p className=" text-gray-600 text-[18px] font-Averta-Bold">
              $ {totalPrice || 0}
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full bg-white  border-gray-300 rounded-lg cursor-pointer">
        <div
          onClick={() => setPaymentMethod("Stripe")}
          className={cn(
            "transition-colors  rounded-l-lg flex py-[10px] h-full flex-1 items-center gap-1 border-r-[1px] hover:border-r-2 border-2 justify-center font-Averta-Semibold hover:border-[#1A78F2]",
            paymentMethod === "Stripe"
              ? "border-[#1A78F2] border-r-2"
              : "border-gray-300 border-r-0"
          )}
        >
          <Image
            src="/images/Payment/id1fBQ5zQQ_1735322002277.jpeg"
            width={30}
            height={30}
            alt="Picture of the author"
            className=" rounded-full"
          />
          <div>Stripe</div>
        </div>

        <div
          onClick={() => setPaymentMethod("Payos")}
          className={cn(
            `transition-colors rounded-r-lg flex flex-1 py-[10px] items-center gap-1 border-2 justify-center border-l-[1px] hover:border-l-2 font-Averta-Semibold hover:border-[#1A78F2]`,
            paymentMethod === "Payos"
              ? "border-[#1A78F2] border-l-2"
              : "border-gray-300 border-l-0"
          )}
        >
          <Image
            src="/images/Payment/payos.svg"
            width={30}
            height={30}
            alt="Picture of the author"
            className=" rounded-full"
          />
          <div>Payos</div>
        </div>
      </div>

      <div className="flex justify-center items-center ">
        <Button
          className="md:w-1/3 h-[60px] bg-[#1A78F2] font-Averta-Semibold text-[16px]"
          disabled={bookingData.checked === undefined || bookingData.checked}
          onClick={handlePayment}
        >
          Place order
        </Button>
      </div>
    </div>
  );
};

export default Booking5Right;
