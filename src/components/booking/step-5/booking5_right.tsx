import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { bookingStore } from "@/utils/store/booking.store";
import { useRouter } from "next/navigation";

const Booking5Right = () => {
  const bookingData = bookingStore((state: any) => state.bookingData);
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handlePayment = async () => {
    try {
      setLoading(true);
      const unitAmount = 12_00; 
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe?unit_amount=${unitAmount}`);
      const data = await response.json();
      router.push(data.url);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    handleDiscount() && setDiscount(8.1);
    setSubTotalPrice(bookingData.totalPrice - discount);
    setTax(bookingData.totalPrice * 0.05);
    setTotalPrice(subTotalPrice + tax);
  }, [bookingData.totalPrice, discount, subTotalPrice, tax, totalPrice]);
  return (
    <div className="w-full min-w-[365px] md:w-1/3 p-4 bg-gray-100 min-h-screen">
      <p className="text-4xl mx-auto font-Averta-Bold mb-4 mt-[50px]">
        Billing
      </p>
      <div className="my-4 border-gray-300 rounded-lg">
        <div className="p-6 bg-white rounded-lg">
          <div className="flex justify-between ">
            <div className="text-gray-600 font-Averta-Regular">Studio</div>
            <Separator
              orientation="vertical"
              className="border-gray-300 mx-4 h-9"
            />
            <div className="text-gray-600 font-Averta-Regular">3 Bathrooms</div>
            <Separator
              orientation="vertical"
              className="border-gray-300 mx-4 h-9"
            />
            <div className="text-gray-600 font-Averta-Regular">Standard</div>
          </div>
          <div className="mb-4 border-t pt-4 flex">
            <p className="text-gray-600 font-Averta-Semibold">
              {bookingData.bookingDate || "-"} at{" "}
              {bookingData.bookingTiming || "-"}
            </p>
          </div>
          <div className="mb-4 border-t pt-4">
            <p className=" text-gray-600 font-Averta-Semibold">
              {bookingData.bookingAddress || "-"}
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
                : "-"}
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
            <p className="text-gray-600 font-Averta-Semibold ">-$ {discount}</p>
          </div>
          <div className="mb-4 border-t pt-4 flex justify-between items-center">
            <p className=" text-gray-600 font-Averta-Semibold">Subtotal</p>
            <p className="text-gray-600 font-Averta-Semibold ">
              $ {subTotalPrice}
            </p>
          </div>
          <div className="mb-4 border-t pt-4 flex justify-between items-center">
            <p className=" text-gray-600 font-Averta-Semibold">Tax</p>
            <p className="text-gray-600 font-Averta-Semibold">+$ {tax}</p>
          </div>
          <div className="border-t pt-4 justify-between items-center flex">
            <p className=" text-gray-600 text-[18px] font-Averta-Bold">Total</p>
            <p className=" text-gray-600 text-[18px] font-Averta-Bold">
              $ {totalPrice}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center ">
        <Button onClick={handlePayment} className="md:w-1/3 h-[60px] bg-[#1A78F2] font-Averta-Semibold text-[16px]">
          Place order
        </Button>
      </div>
    </div>
  );
};

export default Booking5Right;
