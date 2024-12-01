import { InputWithLabel } from '@/components/input/inputwithlabel'
import Image from "next/image";
import React from 'react';
import { Button } from '@/components/ui/button';
import { ComboboxInput } from '@/components/input/combobox-input';

const genderOptions = ["Female", "Male", "Other"]

const UpdateCustomerInfo = () => {
  return (
    <div className="flex flex-col md:flex-row h-full relative min-h-screen">
      {/* Section-Left */}
      <div className="md:w-2/3 pb-10 bg-white min-h-screen">
        <Image
          src="/images/x-button.png"
          alt="X-button"
          width={70}
          height={70}
        />
        <div className="justify-center h-max">
          <p className="text-4xl text-center font-Averta-Bold mb-2  mx-auto md:w-[41.53vw]">
            Update Your Info to Continue
          </p>
          <p className="text-[20px] text-center text-[#88939D] font-Averta-Semibold mx-auto leading-[25px] md:w-[41.53vw]">
            With your latest details, we can serve you better and ensure
            everything runs smoothly
          </p>
        </div>
        <div className="grid mt-[80px] gap-4">
          <div className="flex justify-center flex-wrap md:flex-row gap-2 w-full">
            <InputWithLabel
              className="min-w-[290px]"
              labelText="FULL NAME" inputType="text"
              inputPlaceholder="Enter Full Name" inputId="name"
              inputWidth="25vw" />
            <div className="flex md:mt-0 gap-2">
              <InputWithLabel
                className="min-w-[170px]"
                labelText="DATE OF BIRTH" inputType="date"
                inputPlaceholder="" inputId="date"
                inputWidth="11.25vw" />
              <ComboboxInput
                className="min-w-[112px]"
                labelText="GENDER" 
                inputId="gender" defaultValue={genderOptions.at(0)}
                inputWidth="6.875vw" options={genderOptions} />
            </div>
          </div>

          <div className="flex justify-center flex-wrap md:flex-row gap-2">
            <InputWithLabel
              className="min-w-[290px]"
              labelText="PHONE NUMBER" inputType="text"
              inputPlaceholder="Enter a Phone number" inputId="phoneNum"
              inputWidth="25vw" />
            <div className="md:mt-0">
              <InputWithLabel
                className="min-w-[290px]"
                labelText="EMAIL ADDRESS" inputType="email"
                inputPlaceholder="Enter your email address" inputId="contactEmail"
                inputWidth="18.125vw" plusPX='8px' />
            </div>
          </div>

          <div className="flex justify-center flex-wrap md:flex-row gap-2">
            <InputWithLabel
              className="min-w-[290px]"
              labelText="CITY/PROVINCE" inputType="text"
              inputPlaceholder="Enter your city/province" inputId="city"
              inputWidth="43.125vw" plusPX="16px" />
          </div>

          <div className="flex justify-center flex-wrap md:flex-row gap-2">
            <InputWithLabel
              className="min-w-[290px]"
              labelText="WARD" inputType="text"
              inputPlaceholder="Enter ward" inputId="ward"
              inputWidth="25vw" />
            <div className=" md:mt-0">
              <InputWithLabel
                className="min-w-[290px]"
                labelText="POSTAL CODE" inputType="text"
                inputPlaceholder="Enter Postal Code" inputId="postal"
                inputWidth="18.125vw" plusPX='8px' />
            </div>
          </div>

          <div className="flex justify-center flex-wrap md:flex-row gap-2">
            <InputWithLabel
              className="min-w-[290px]"
              labelText="HOUSE NUMBER" inputType="text"
              inputPlaceholder="Enter your House Number" inputId="houseNum"
              inputWidth="18.75vw" />
            <div className=" md:mt-0">
              <InputWithLabel
                className="min-w-[290px]"
                labelText="STREET NAME" inputType="text"
                inputPlaceholder="Enter your Street Name" inputId="streetName"
                inputWidth="24.375vw" plusPX='8px' />
            </div>
          </div>

        </div>
      </div>
      {/* Section Right */}
      <div className="md:w-1/3 bg-gray-100 min-h-screen">
        <p className="text-3xl mx-auto font-Averta-Bold mb-4 mt-[4.7vw] ml-[2.2vw]">Avatar</p>

        <div className="mb-6">
          <Image
            src="/images/Dashboard/Personal/camera.svg"
            alt="camera"
            width={160}
            height={160}
            className="cursor-pointer flex items-center justify-center mx-auto transition-transform duration-300 hover:scale-110"
          />
          <Button variant="link" className="flex text-[18px] items-center justify-center mx-auto font-Averta-Semibold text-[#1A78F2]">Upload Your Avatar</Button>
        </div>

        <p className="text-3xl font-Averta-Bold mb-4 ml-[2.2vw] mt-[1vw]">ID Card</p>
        <div className="border-2 bg-white mx-[2.08vw] border-dashed border-gray-300 rounded-lg px-4 py-8 text-center">
          <Image
            src="/images/Dashboard/Personal/upload.svg"
            alt="upload"
            width={40}
            height={40}
            className="mb-6 mx-auto"
          />
          <p className="text-[14px] text-gray-600 font-Averta-Semibold mb-3">Select a file or drag and drop here</p>
          <p className="text-[12px] text-gray-500 mb-6">JPG, PNG or PDF, file size no more than 10MB</p>
          <button className="bg-white font-Averta-Semibold text-[#1A78F2] border-2 border-[#1A78F2] px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
            Select File
          </button>
        </div>

        <div className="flex justify-center items-center mt-[2vw] pb-[2vw]">
          <Button className="md:w-1/3 min-w-[150px] h-[60px] bg-[#1A78F2] font-Averta-Semibold text-[16px]">Verify</Button>
        </div>
      </div>
    </div>

  )
}

export default UpdateCustomerInfo
