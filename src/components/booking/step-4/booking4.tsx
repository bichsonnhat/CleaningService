import { ToggleButton } from "@/components/button/togglebutton";
import { ToggleButtonGroup } from "@/components/button/togglebuttongroup";
import { InputWithLabel } from "@/components/input/inputwithlabel";
import { MultiLineInput } from "@/components/input/multipleline-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const getInOpitonsButtons = [
  { id: 1, contentText: "Someone in Home" },
  { id: 2, contentText: "Doorman" },
  { id: 3, contentText: "Hidden Key" },
  { id: 4, contentText: "Others" },
];

const deepCleanOptionsButtons = [
  {
    contentText: "Inside fridge",
    price: "35",
    imageSrc: "/images/BookingPage/step-4/Fridge.svg",
    imageSrc2: "/images/BookingPage/step-4/FridgeBlue.svg",
  },
  {
    contentText: "Inside oven",
    price: "35",
    imageSrc: "/images/BookingPage/step-4/Oven.svg",
    imageSrc2: "/images/BookingPage/step-4/OvenBlue.svg",
  },
  {
    contentText: "Inside cabinets",
    price: "35",
    imageSrc: "/images/BookingPage/step-4/Cabinets.svg",
    imageSrc2: "/images/BookingPage/step-4/CabinetsBlue.svg",
  },
];

const yesNoOptionsButtons = [
  { id: 5, contentText: "Yes" },
  { id: 6, contentText: "No" },
];

const Booking4 = () => {
  return (
    <div>
      <div className="min-h-screen w-full">
        <div className="w-1/2 m-auto p-4">
          <div className="justify-center h-max">
            <p className="text-4xl text-center font-Averta-Bold mb-2 mt-[50px] ">
              Add Your Address & Details
            </p>
            <p className="text-[20px] text-center text-[#88939D] font-Averta-Regular leading-[25px]">
              Be specific of any additional details we might need from you
            </p>
          </div>
        </div>

        <div className="mt-[50px]">
          <div className="flex justify-center">
            <div className="flex flex-col md:flex-row">
              <InputWithLabel
                className="min-w-[250px]"
                labelText="ADDRESS"
                inputType="text"
                inputPlaceholder="Enter a Location"
                inputId="location"
                inputWidth="40vw"
              />
              <div className="md:ml-2 mt-2 md:mt-0">
                <InputWithLabel
                  className="min-w-[100px]"
                  labelText="APT.NUMBER"
                  inputType="text"
                  inputPlaceholder=""
                  inputId="aptNum"
                  inputWidth="13.125vw"
                />
              </div>
            </div>
          </div>

          <div className="grid justify-center items-center mt-[45px]">
            <p className="text-[14px] text-center text-[#88939D] font-Averta-Semibold leading-[25px]">
              HOW DO WE GET IN?
            </p>
            <div className="mt-[14px]">
              <ToggleButtonGroup
                buttons={getInOpitonsButtons}
                classNameCommon="bg-white h-[55px] md:w-[16.67vw] md:min-w-fit rounded-[10px]
                font-Averta-Semibold text-lg leading-[23px] tracking-tight
                text-[#4f6071] border-2 border-[#d3d8dd] hover:bg-accent"
              />
            </div>
          </div>

          <div className="grid justify-center items-center mt-[45px]">
            <p className="text-[14px] text-center text-[#88939D] font-Averta-Semibold leading-[25px] ">
              WANT TO GIVE ANY SPECIFIC SPOTS A DEEP CLEAN?
            </p>
            <div className="flex md:flex-row mt-[14px]">
              <div className="flex flex-wrap gap-3 justify-center">
                {deepCleanOptionsButtons.map((button, index) => (
                  <ToggleButton
                    key={index}
                    contentText={button.contentText}
                    price={button.price}
                    imageSrc={button.imageSrc}
                    imageSrc2={button.imageSrc2}
                    className="bg-white md:h-[15vw] max-h-[180px] min-h-[135px] md:w-[17vw] 
                    rounded-[10px] max-w-[240px] min-w-[159px]
                    font-Averta-Semibold text-base leading-[23px] tracking-tight
                  text-[#4f6071] border-2 border-[#d3d8dd] hover:bg-accent"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid justify-center items-center mt-[45px]">
            <p className="text-[14px] text-center text-[#88939D] font-Averta-Semibold leading-[25px] ">
              ANY PET?
            </p>
            <div className="flex md:flex-row mt-[14px]">
              <div className="space-x-2">
                <ToggleButtonGroup
                  buttons={yesNoOptionsButtons}
                  classNameCommon="bg-white h-[55px] md:w-[16.67vw] min-w-[100px] rounded-[10px]
                font-Averta-Semibold text-lg leading-[23px] tracking-tight
                text-[#4f6071] border-2 border-[#d3d8dd] hover:bg-accent"
                />
              </div>
            </div>
          </div>

          <div className="grid justify-center items-center mt-[45px]">
            {/* <Input type="text" placeholder="What types of pets? Some of our cleaners have pet allergies."
              className="w-full md:w-[56.25vw] min-w-[325px] h-[55px] text-base font-Averta-Regular" /> */}
            <MultiLineInput
              hasLabel={false}
              inputPlaceholder="What types of pets? Some of our cleaners have pet allergies."
              inputId="notesPet"
              inputHeight="h-[55px]"
              inputWidth="w-full md:w-[56.25vw] min-w-[325px]"
            />
            <div className="mt-[30px]">
              <MultiLineInput
                hasLabel={true}
                labelText="ADDITIONAL NOTES"
                inputPlaceholder="I would like Sophie to be my cleaner. Please change my sheets 
                (fresh bedding is on the bed) and empty the dishwasher."
                inputId="notes"
                inputHeight="h-[100px]"
                inputWidth="w-full md:w-[56.25vw] min-w-[325px]"
              />
            </div>

            <div className="flex justify-center items-center mt-[55px] pb-[50px]">
              <Button className="md:w-[12.5vw] h-[60px] bg-[#1A78F2] font-Averta-Semibold text-[16px]">
                Place order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking4;
