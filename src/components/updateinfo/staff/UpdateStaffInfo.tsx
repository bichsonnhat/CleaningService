"use client";
import { InputWithLabel } from "@/components/input/inputwithlabel";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { addHelper } from "@/actions/actions";

const genderOptions = ["Female", "Male", "Other"];

const UpdateStaffInfo = () => {
  const [formData, setFormData] = useState({
    fullName: "aaa",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    salaryExpectation: "",
    cityOrProvince: "",
    ward: "",
    postalCode: "",
    houseNumber: "",
    streetName: "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
    }));
  };

  const handleSubmit = () => {
    addHelper(
      formData.fullName,
      new Date(formData.dateOfBirth),
      formData.gender,
      formData.phoneNumber,
      formData.email,
      parseFloat(formData.salaryExpectation),
      "",
      "",
      [],
      `${formData.houseNumber} ${formData.streetName}, ${formData.ward}, ${formData.cityOrProvince}, ${formData.postalCode}`
    );
  };

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
        <div className="grid justify-center mt-[100px]">
          <div className="flex flex-col md:flex-row">
            <InputWithLabel
              labelText="FULL NAME"
              inputType="text"
              inputPlaceholder="Enter Full Name"
              inputId="name"
              inputWidth="25vw"
              defaultValue={formData.fullName}
            />
            <div className="md:ml-2 md:mt-0">
              <InputWithLabel
                labelText="DATE OF BIRTH"
                inputType="date"
                inputPlaceholder=""
                inputId="gender"
                defaultValue={genderOptions.at(0)}
                inputWidth="11.25vw"
              />
            </div>
            <div className="md:ml-2 md:mt-0">
              <InputWithLabel
                labelText="GENDER"
                inputType="combobox"
                inputPlaceholder=""
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
            <InputWithLabel
              labelText="OFFERED SERVICES"
              inputType="multipleChoice"
              inputPlaceholder="Add new service"
              inputId="houseNum"
              inputWidth="43.125vw"
              plusPX="16px"
            />
          </div>
        </div>
      </div>
      {/* Section-Right */}
      <div className="md:w-1/3 bg-gray-100 min-h-screen">
        <p className="text-3xl font-Averta-Bold mb-4 mt-[4.7vw] ml-[2.2vw]">
          Avatar
        </p>

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
            Upload Your Avatar
          </Button>
        </div>

        <p className="text-3xl font-Averta-Bold mb-4 ml-[2.2vw] mt-[1vw]">
          Identify Card
        </p>
        <div className="border-2 bg-white mx-[2.08vw] border-dashed border-gray-300 rounded-lg px-4 py-8 text-center">
          <Image
            src="/images/upload.svg"
            alt="upload"
            width={40}
            height={40}
            className="mb-6 mx-auto"
          />
          <p className="text-[14px] text-gray-600 font-Averta-Semibold mb-3">
            Select a file or drag and drop here
          </p>
          <p className="text-[12px] text-gray-500 mb-6">
            JPG, PNG or PDF, file size no more than 10MB
          </p>
          <button className="bg-white font-Averta-Semibold text-[#1A78F2] border-2 border-[#1A78F2] px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
            Select File
          </button>
        </div>

        <p className="text-3xl font-Averta-Bold mb-4 ml-[2.2vw] mt-[1vw]">
          Résumé
        </p>
        <div className="border-2 bg-white h-auto mx-[2.08vw] border-dashed border-gray-300 rounded-lg px-4 py-4 flex">
          <Image src="/images/upload.svg" alt="upload" width={40} height={40} />
          <div className="py-2 px-4 text-center mx-auto">
            <p className="text-[14px] text-gray-600 font-Averta-Semibold">
              Select your CV or drag and drop here
            </p>
            <p className="text-[12px] text-gray-500 mt-[12px]">
              JPG, PNG or PDF, file size no more than 10MB
            </p>
          </div>
          <button
            className="bg-white font-Averta-Semibold text-[#1A78F2] 
                  border-2 border-[#1A78F2] px-4 py-2 rounded-md hover:bg-blue-50 
                  transition-colors h-fit ml-auto my-auto w-auto"
          >
            Select File
          </button>
        </div>

        <div className="flex justify-center items-center mt-[2vw] pb-[2vw]">
          <Button className="md:w-1/3 h-[60px] bg-[#1A78F2] font-Averta-Semibold text-[16px]" 
            onClick={handleSubmit}>
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStaffInfo;
