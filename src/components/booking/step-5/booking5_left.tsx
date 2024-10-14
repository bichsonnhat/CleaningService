import { InputWithLabel } from '@/components/input/inputwithlabel';
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckboxWithText } from '@/components/checkbox/checkboxwithtext';
import React from 'react'

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

      <div className="grid justify-center mt-[50px]">
        <div className="flex flex-col md:flex-row">
          <InputWithLabel
            labelText="FULL NAME" inputType="text"
            inputPlaceholder="Enter Full Name" inputId="name"
            inputWidth="w-full md:w-[340px]" />
          <div className="md:ml-2 mt-2 md:mt-0">
            <InputWithLabel
              labelText="EMAIL ADDRESS" inputType="email"
              inputPlaceholder="Enter your email address" inputId="email"
              inputWidth="w-full md:w-[340px]" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-[30px]">
          <InputWithLabel
            labelText="PHONE NUMBER" inputType="text"
            inputPlaceholder="Enter a Phone number" inputId="phoneNum"
            inputWidth="w-full md:w-[340px]" />
          <div className="md:ml-2 mt-2 md:mt-0">
            <InputWithLabel
              labelText="HOW DO WE CONTACT YOU" inputType="email"
              inputPlaceholder="" inputId="contactEmail"
              inputWidth="w-full md:w-[340px]" />
          </div>
        </div>

        <div className='mt-[30px]'>
          <ScrollArea className="h-[170px] font-Averta-Regular w-full md:w-[688px] rounded-md border p-3">
            Jokester began sneaking into the castle in the middle of the night and leaving
            jokes all over the place: under the king's pillow, in his soup, even in the
            royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
            then, one day, the people of the kingdom discovered that the jokes left by
            Jokester were so funny that they couldn't help but laugh. And once they
            started laughing, they couldn't stop. Jokester began sneaking into the castle in the middle of the night and leaving
            jokes all over the place: under the king's pillow, in his soup, even in the
            royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
            then, one day, the people of the kingdom discovered that the jokes left by
            Jokester were so funny that they couldn't help but laugh. And once they
            started laughing, they couldn't stop.
          </ScrollArea>
          <CheckboxWithText />
        </div>
      </div>
    </div>
  )
}

export default Booking5Left
