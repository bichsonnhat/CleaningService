import { InputWithLabel } from "@/components/input/inputwithlabel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckboxWithText } from "@/components/checkbox/checkboxwithtext";
import React from "react";

const Booking5Left = () => {
  return (
    <div className="w-full md:w-2/3 p-4 bg-white min-h-screen">
      <div className="justify-center h-max">
        <p className="text-4xl text-center font-Averta-Bold mb-2 mt-[50px] ">
          Payment Details
        </p>
        <p className="text-[20px] text-center text-[#88939D] font-Averta-Semibold leading-[25px]">
          Add in your payment details through our secure gateway
        </p>
      </div>

      <div className="grid justify-center mt-[50px] gap-3">
        <div className="flex">
          <div className="flex flex-wrap md:flex-row justify-center gap-3">
            <InputWithLabel
              className="min-w-[360px]"
              labelText="FULL NAME"
              inputType="text"
              inputPlaceholder="Enter Full Name"
              inputId="name"
              inputWidth="25vw"
            />
            <div className="mt-2 md:mt-0">
              <InputWithLabel
                className="min-w-[360px]"
                labelText="EMAIL ADDRESS"
                inputType="email"
                inputPlaceholder="Enter your email address"
                inputId="email"
                inputWidth="25vw"
              />
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-wrap md:flex-row justify-center gap-3">
            <InputWithLabel
              className="min-w-[360px]"
              labelText="PHONE NUMBER"
              inputType="text"
              inputPlaceholder="Enter a Phone number"
              inputId="phoneNum"
              inputWidth="25vw"
            />
            <div className="mt-2 md:mt-0">
              <InputWithLabel
                className="min-w-[360px]"
                labelText="HOW DO WE CONTACT YOU"
                inputType="email"
                inputPlaceholder=""
                inputId="contactEmail"
                inputWidth="25vw"
              />
            </div>
          </div>
        </div>

        <div className="mt-[30px] grid justify-center ">
          <ScrollArea
            style={{ width: `calc(50vw + 8px)` }}
            className="h-[170px] min-w-[360px] w-full font-Averta-Regular rounded-md border p-3"
          >
            Jokester began sneaking into the castle in the middle of the night
            and leaving jokes all over the place: under the king's pillow, in
            his soup, even in the royal toilet. The king was furious, but he
            couldn't seem to stop Jokester. And then, one day, the people of the
            kingdom discovered that the jokes left by Jokester were so funny
            that they couldn't help but laugh. And once they started laughing,
            they couldn't stop. Jokester began sneaking into the castle in the
            middle of the night and leaving jokes all over the place: under the
            king's pillow, in his soup, even in the royal toilet. The king was
            furious, but he couldn't seem to stop Jokester. And then, one day,
            the people of the kingdom discovered that the jokes left by Jokester
            were so funny that they couldn't help but laugh. And once they
            started laughing, they couldn't stop.
          </ScrollArea>
          <CheckboxWithText />
        </div>
      </div>
    </div>
  );
};

export default Booking5Left;
