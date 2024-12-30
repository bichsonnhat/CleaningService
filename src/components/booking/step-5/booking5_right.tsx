import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { bookingStore } from "@/utils/store/booking.store";
import { useRouter } from "next/navigation";
import { createScheduleDates } from "@/utils/dateUtils";
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
    if (bookingData.bookingTiming === 10.01) {
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

  const formatBookingDate = (scheduledStartTime: Date): string => {
    const startDate = scheduledStartTime.getDate().toString().padStart(2, "0");
    const startMonth = (scheduledStartTime.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const startYear = scheduledStartTime.getFullYear();
    return `${startDate}-${startMonth}-${startYear}`;
  };

  //console.log("Info: ", bookingData.bookingInfomation);
  const handlePayment = async () => {
    try {
      setLoading(true);

      //   JSON.stringify({
      //     status: "Success",
      //     bookingDate: new Date(bookingData.bookingDate || ""),
      //     bookingTime: bookingData.bookingTiming,
      //     serviceType: bookingData.serviceCategory?.name,
      //     serviceCategoryId: bookingData.serviceCategory?.id,
      //     location: bookingData.bookingAddress,
      //     apt: bookingData.APT,
      //     accessInstructions: bookingData.howToGetIn,
      //     specificInstructions: bookingData.anySpecificSpot,
      //     hasPets: bookingData.anyPet,
      //     petNotes: bookingData.petNote,
      //     additionalNotes: bookingData.additionalNote,
      //     customerName: bookingData.fullName,
      //     customerEmail: bookingData.emailAddress,
      //     customerPhone: bookingData.phoneNumber,
      //     customerNotes: bookingData.contactNote,
      //     termsAccepted: bookingData.checked,
      //     totalAmount: totalPrice,
      //     bookingNotes: bookingData.bookingNote,
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   })
      // );
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user-info`
      );
      const userInfo = await userResponse.json();
      const cleanType = bookingData.bookingInfomation.find(
        (item: any) =>
          item.name === "Clean type" || item.name === "For how long?"
      );
      const scheduleDates = createScheduleDates(
        bookingData.bookingDate,
        bookingData.bookingTiming,
        cleanType.value
      );

      const bookingPayload = {
        customerId: userInfo.userId,
        serviceCategoryId: bookingData.serviceCategory?.id,
        location: bookingData.bookingAddress,
        scheduledStartTime: scheduleDates.scheduleDateStart,
        scheduledEndTime: scheduleDates.scheduleDateEnd,
        bookingNote: bookingData.bookingNote,
        totalPrice: totalPrice,
      };
      //console.log("Booking Payload: ", bookingPayload);
      if (paymentMethod === "Stripe") {
        const bookingResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingPayload),
          }
        );

        if (!bookingResponse.ok) {
          throw new Error("Failed to create booking");
        }

        // Gọi Stripe payment
        const stripeResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/stripe?unit_amount=${
            totalPrice * 100
          }`
        );

        const data = await stripeResponse.json();
        router.push(data.url);
      } else {
        await paymentMutation.mutateAsync(bookingPayload);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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
            <div className="text-gray-600 font-Averta-Regular">
              {bookingData.bookingInfomation?.[0].value}
            </div>
            <Separator
              orientation="vertical"
              className="border-gray-300 mx-4 h-9"
            />
            <div className="text-gray-600 font-Averta-Regular">
              {/* {bookingData.serviceCategory?.name === "Home Cleaning"
                ? bookingData.bookingInfomation?.[1].name
                : bookingData.bookingInfomation?.[].name} */}
              {bookingData.bookingInfomation?.[1].value}
            </div>
            {bookingData.serviceCategory?.name === "Home Cleaning" && (
              <>
                <Separator
                  orientation="vertical"
                  className="border-gray-300 mx-4 h-9"
                />
                <div className="text-gray-600 font-Averta-Regular">
                  {bookingData.bookingInfomation?.[2].value}
                </div>
              </>
            )}
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

      <div className="mb-[40px] flex w-full bg-white  border-gray-300 rounded-lg cursor-pointer">
        <div
          onClick={() => setPaymentMethod("Stripe")}
          className={cn(
            "transition-colors rounded-l-lg flex py-[10px] h-full flex-1 items-center gap-1 border-r-[1px] hover:border-r-2 border-2 justify-center font-Averta-Semibold hover:border-[#1A78F2]",
            paymentMethod === "Stripe"
              ? "border-[#1A78F2] border-r-2"
              : "border-gray-300 border-r-0"
          )}
        >
          <Image
            src="/images/Payment/visa-seeklogo.png"
            width={30}
            height={30}
            alt="Picture of the author"
            className=" h-full "
          />
          <div>Visa</div>
        </div>

        <div
          onClick={() => setPaymentMethod("Payos")}
          className={cn(
            `transition-colors rounded-r-lg flex flex-1 h-full py-[10px] items-center gap-1 border-2 justify-center border-l-[1px] hover:border-l-2 font-Averta-Semibold hover:border-[#1A78F2]`,
            paymentMethod === "Payos"
              ? "border-[#1A78F2] border-l-2"
              : "border-gray-300 border-l-0"
          )}
        >
          <Image
            src="/images/Payment/payos.png"
            width={18.75}
            height={18.75}
            alt="Picture of the author"
            className=" rounded-full aspect-square"
          />
          <div>Ngân hàng</div>
        </div>
      </div>

      <div className="flex justify-center items-center ">
        <Button
          id="place-order-step5"
          onClick={handlePayment}
          className="md:w-1/3 max-sm:hidden h-[60px] bg-[#1A78F2] font-Averta-Semibold text-[16px]"
        >
          Place order
        </Button>
      </div>
    </div>
  );
};

export default Booking5Right;
