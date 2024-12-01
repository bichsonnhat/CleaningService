import { InputWithLabel } from "@/components/input/inputwithlabel";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import FileDownloadCard from "@/components/card/FileDownloadCard";
import { ComboboxInput } from "@/components/input/combobox-input";
import { MultipleChoiceInput } from "@/components/input/multiplechoice-input";

const genderOptions = ["Female", "Male", "Other"];

const EmployeeInfo = () => {
  const handleDownload = () => {};

  const handleUpdate = () => {};

  return (
    <div className="bg-white h-full w-full flex flex-col md:flex-row">
      {/* Section-Left */}
      <div className="md:w-2/3 pb-10 bg-white min-h-screen">
        <div className="flex flex-row">
          <Image
            src="/images/Dashboard/Personal/exit-button.png"
            alt="X-button"
            width={70}
            height={70}
            className='cursor-pointer hover:bg-[#ededed]'
          />
          <p className="font-Averta-Bold text-4xl text-center my-auto ml-[10px]">
            User Info
          </p>
        </div>

        <div className="grid justify-center mt-[50px]">
          <div className="flex flex-col md:flex-row">
            <InputWithLabel
              labelText="FULL NAME"
              inputType="text"
              inputPlaceholder="Enter Full Name"
              inputId="name"
              inputWidth="25vw"
            />
            <div className="md:ml-2 md:mt-0">
              <InputWithLabel
                labelText="DATE OF BIRTH"
                inputType="date"
                inputPlaceholder=""
                inputId="date"
                inputWidth="11.25vw"
              />
            </div>
            <div className="md:ml-2 md:mt-0">
              <ComboboxInput
                labelText="GENDER"
                inputId="gender"
                defaultValue={genderOptions.at(0)}
                inputWidth="6.875vw"
                options={genderOptions}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-[30px]">
            <InputWithLabel
              labelText="PHONE NUMBER"
              inputType="text"
              inputPlaceholder="Enter a Phone number"
              inputId="phoneNum"
              inputWidth="25vw"
            />
            <div className="md:ml-2 md:mt-0">
              <InputWithLabel
                labelText="EMAIL ADDRESS"
                inputType="email"
                inputPlaceholder="Enter your email address"
                inputId="contactEmail"
                inputWidth="18.125vw"
                plusPX="8px"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-[30px]">
            <InputWithLabel
              labelText="SALARY EXPECTATION"
              inputType="text"
              inputPlaceholder="100000$"
              inputId="salary"
              inputWidth="18.125vw"
              plusPX="8px"
            />
            <div className="md:ml-2 md:mt-0">
              <InputWithLabel
                labelText="CITY/PROVINCE"
                inputType="text"
                inputPlaceholder="Enter your city/province"
                inputId="city"
                inputWidth="25vw"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-[30px]">
            <InputWithLabel
              labelText="WARD"
              inputType="text"
              inputPlaceholder="Enter ward"
              inputId="ward"
              inputWidth="27.5vw"
            />
            <div className="md:ml-2 md:mt-0">
              <InputWithLabel
                labelText="POSTAL CODE"
                inputType="text"
                inputPlaceholder="Enter Postal Code"
                inputId="postal"
                inputWidth="15.625vw"
                plusPX="8px"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-[30px]">
            <InputWithLabel
              labelText="HOUSE NUMBER"
              inputType="text"
              inputPlaceholder="Enter your House Number"
              inputId="houseNum"
              inputWidth="18.75vw"
            />
            <div className="md:ml-2 md:mt-0">
              <InputWithLabel
                labelText="STREET NAME"
                inputType="text"
                inputPlaceholder="Enter your Street Name"
                inputId="streetName"
                inputWidth="24.375vw"
                plusPX="8px"
              />
            </div>
          </div>

          <div className="mt-[30px]">
            <MultipleChoiceInput
              labelText="OFFERED SERVICES"
              inputId="houseNum"
              inputWidth="43.125vw"
              plusPX="16px"
            />
          </div>

          <div className="flex justify-center items-center mt-[4.5vw] pb-[2vw]">
            <Button className="md:w-1/3 h-[60px] bg-[#1A78F2] font-Averta-Semibold text-[16px]">
              Save
            </Button>
          </div>
        </div>
      </div>
      {/* Section Right */}
      <div className="md:w-1/3 min-h-screen">
        <p className="font-Averta-Bold text-3xl my-[12.8875px]">Avatar</p>

        <div className="mb-6">
          <Image
            src="/images/camera.svg"
            alt="camera"
            width={160}
            height={160}
            className="cursor-pointer flex items-center justify-center mx-auto transition-transform duration-300 hover:scale-110"
          />
          <Button
            variant="link"
            className="flex text-[18px] items-center justify-center mx-auto font-Averta-Semibold text-[#1A78F2]"
          >
            Upload Avatar
          </Button>
        </div>

        <p className="text-3xl font-Averta-Bold mb-3 mt-[1vw]">Identify Card</p>
        <div className="px-3 py-5 text-center">
          <Image
            src="/images/identity.png"
            alt="identity"
            width={400}
            height={200}
          />
        </div>
        <div className="flex flex-row justify-center mb-6">
          <Button
            className="w-[170px] h-[40px] 
        bg-[#1A78F2] font-Averta-Semibold text-[16px]"
          >
            Download
          </Button>
          <Button
            className="ml-[10px] w-[170px] h-[40px]
         bg-white font-Averta-Semibold text-[#1A78F2] hover:bg-gray-100
         text-[16px] border-2 border-[#1A78F2]"
          >
            Upload IDCard
          </Button>
        </div>

        <p className="text-3xl font-Averta-Bold mb-3 mt-[1vw]">Résumé</p>
        <FileDownloadCard />
      </div>
    </div>
  );
};

export default EmployeeInfo;
