"use client"
import { InputWithLabel } from '@/components/input/inputwithlabel'
import Image from "next/image";
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MultipleChoiceInput } from '@/components/input/multiplechoice-input';
import { ComboboxInput } from '@/components/input/combobox-input';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { createHelperInfoData, helperInfoSchema, updateHelperInfoData } from '@/schema/helperInfoSchema';
import FileDownloadCard from '@/components/card/FileDownloadCard';
import { useRouter } from 'next/navigation';
import { LuArrowLeft } from 'react-icons/lu';
import { currentUser } from '@clerk/nextjs/server';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';
import prisma from "@/lib/db";

const genderOptions = ["Female", "Male", "Other"]

interface UpdateStaffInfoProps {
  userId: string,
}


const UpdateStaffInfo: React.FC<UpdateStaffInfoProps> = ({ userId }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [serviceCategory, setServiceCategory] = useState<ServiceCategory[]>([]);
  const [idCard, setIdCard] = useState<File | null>(null);
  const [idCardUrl, setidCardUrl] = useState<string | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  let curUserId = userId;


  const form = useForm<updateHelperInfoData>({
    mode: "onSubmit",
    resolver: zodResolver(helperInfoSchema),
  });

  const fetchServiceCategory = async () => {
    try {
      const response = await fetch('/api/service-categories');
      if (!response.ok) {
        throw new Error("Error fetching service types");
      }
      const data = await response.json();
      setServiceCategory(data);
    } catch (error) {
      console.error("Error fetching service types:", error);
    }
  };

  const fetchCustomerInfo = async (): Promise<Customer> => {
    try {
      const response = await fetch(`/api/users/${curUserId}`);
      if (!response.ok) {
        throw new Error("Error fetching user info");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching user info", error);
      throw new Error("Error fetching user info");
    }
  };

  const { data: helperData, isPending: isFetchCustomerPending } = useQuery({
    queryKey: ["updateHelperInfo", curUserId],
    queryFn: fetchCustomerInfo,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    fetchServiceCategory();
    if (!curUserId) {
      reset();
      return;
    }
    if (helperData) {
      let addressParts;
      if (addressParts) {
        addressParts = helperData.address.split(' - ');
      }
      else {
        addressParts = "";
      }
      reset({
        ...helperData,
        houseNumber: addressParts[0],
        streetName: addressParts[1],
        ward: addressParts[2],
        city: addressParts[3],
        postalCode: addressParts[4],
        gender: helperData.gender ?? ""
      });

      let identifyCardUrl;
      if (helperData.identifyCard) {
        identifyCardUrl = helperData.identifyCard;
        setidCardUrl(identifyCardUrl);
      }
      const resumeUploadedUrl = null;
      setResumeUrl(resumeUploadedUrl);

      if (identifyCardUrl) {
        fetch(identifyCardUrl)
          .then((response) => response.blob())
          .then((blob) => {
            // Kiểm tra loại MIME của file để xác định tên và kiểu đúng
            const mimeType = blob.type;

            // Nếu là file PDF
            const file = new File([blob], 'identityCard', { type: mimeType });

            // Set file vào state (setIdCard sẽ nhận file)
            setIdCard(file);
          })
          .catch((error) => console.error('Error fetching the identity card:', error));
      }
      if (resumeUploadedUrl) {
        fetch(resumeUploadedUrl)
          .then((response) => response.blob())
          .then((blob) => {
            // Kiểm tra loại MIME của file để xác định tên và kiểu đúng
            const mimeType = blob.type;

            // Nếu là file PDF
            const file = new File([blob], 'resumeUploaded', { type: mimeType });

            // Set file vào state (setResume sẽ nhận file)
            setResume(file);
          })
          .catch((error) => console.error('Error fetching the resume:', error));
      }
    }
  }, [curUserId, helperData, reset]);

  const options = serviceCategory.map(serviceCategory => ({
    id: serviceCategory.id,
    name: serviceCategory.name,
  }));

  const handleIdCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const allowedFormats = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedFormats.includes(selectedFile.type)) {
        alert("Only JPG, PNG, or PDF files are allowed!");
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("File size should be less than 10MB!");
        return;
      }

      setIdCard(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(selectedFile);
        setidCardUrl(objectUrl);
      }
      else {
        setidCardUrl(null);
      }
    }
  };

  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const allowedFormats = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedFormats.includes(selectedFile.type)) {
        alert("Only JPG, PNG, or PDF files are allowed!");
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("File size should be less than 10MB!");
        return;
      }

      setResume(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(selectedFile);
        setResumeUrl(objectUrl);
      }
      else {
        setResumeUrl(null);
      }
    }
  };

  const handleIdCardDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      const allowedFormats = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedFormats.includes(droppedFile.type)) {
        alert("Only JPG, PNG, or PDF files are allowed!");
        return;
      }

      if (droppedFile.size > 10 * 1024 * 1024) {
        alert("File size should be less than 10MB!");
        return;
      }

      setIdCard(droppedFile);

      if (droppedFile.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(droppedFile);
        setidCardUrl(objectUrl);
      }
      else {
        setidCardUrl(null);
      }
    }
  };

  const handleResumeDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      const allowedFormats = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedFormats.includes(droppedFile.type)) {
        alert("Only JPG, PNG, or PDF files are allowed!");
        return;
      }

      if (droppedFile.size > 10 * 1024 * 1024) {
        alert("File size should be less than 10MB!");
        return;
      }

      setResume(droppedFile);

      if (droppedFile.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(droppedFile);
        setResumeUrl(objectUrl);
      }
      else {
        setResumeUrl(null);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDownload = (file: File | null) => {
    if (!file) {
      alert("No file selected to download.");
      return;
    }

    const fileUrl = URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = file.name;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(fileUrl);
  };

  const uploadFile = async (file: File | null): Promise<string | null> => {
    if (!file) {
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/test-cloudinary", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.url; // Trả về URL file đã upload
      } else {
        console.error("File upload failed:", await response.text());
        return null;
      }
    } catch (error) {
      console.error("File upload failed:", error);
      return null;
    }
  };

  async function createAndUpdateHelper(id: string, updateData: any) {
    try {
      const postResponse = await fetch("/api/helpers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
  
      if (!postResponse.ok) {
        throw new Error("POST API failed.");
      }
  
      const postResult = await postResponse.json();
      console.log("POST API result:", postResult);
  
      // Gọi PUT API sau khi POST thành công
      const putResponse = await fetch(`/api/helpers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
  
      if (!putResponse.ok) {
        throw new Error("PUT API failed.");
      }
  
      const putResult = await putResponse.json();
      console.log("PUT API result:", putResult);
  
      return { postResult, putResult };
    } catch (error) {
      console.error("Error in createAndUpdateHelper:", error);
    }
  }

  const onSubmitHandle = async (data: updateHelperInfoData) => {
    try {
      let idCardUrl_temp = null;
      let resumeUrl_temp = null;

      if (idCard) {
        idCardUrl_temp = await uploadFile(idCard);
      }
      else {
        idCardUrl_temp = helperData?.identifyCard;
      }

      if (resume) {
        resumeUrl_temp = await uploadFile(resume);
      }
      else {
        resumeUrl_temp = null;
      }

      if (!idCardUrl_temp || !resumeUrl_temp) {
        alert("Failed to upload 1 or mores file. Please try again.");
        return;
      }


      // Cập nhật URL vào form data
      const formData = {
        ...data,
        idCard: idCardUrl_temp,
        resume: resumeUrl_temp,
      };

      if (data.email === helperData?.email) {
        delete formData.email;
      }

      console.log("Final Form Data:", formData);

      // const postResponse = await fetch("/api/helpers", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ id: curUserId }),
      // });
  
      // if (!postResponse.ok) {
      //   throw new Error("POST API failed.");
      // }
  
      // const postResult = await postResponse.json();
      // console.log("POST API result:", postResult);

      createAndUpdateHelper(curUserId, formData);

      alert("Form submitted successfully!");
      router.push(`/dashboard/personal`)
      queryClient.invalidateQueries({ queryKey: ["helperInfo"] });
    } catch (error) {
      console.error("Failed to submit data:", error);
      alert("Something went wrong during form submission.");
    }
  };

  if (!helperData)
    return (
      <div className="flex w-full h-full items-center justify-center">
        <ClipLoader color="#2A88F5" loading={true} size={30} />
      </div>
    );

  return (
    <form
      className="flex flex-col md:flex-row h-full relative min-h-screen"
      onSubmit={handleSubmit(onSubmitHandle)}>
      {/* Section-Left */}
      <div className="md:w-2/3 pb-10 bg-white min-h-screen">
        <button
          type="button"
          onClick={() => router.back()}
          className='p-6 hover:bg-gray-100 border-r-[1px] '>
          <LuArrowLeft className='h-[19px] text-neutral-300 text-xl font-bold' />
        </button>
        <div className="justify-center h-max">
          <p className="text-4xl text-center font-Averta-Bold mb-2  mx-auto md:w-[41.53vw]">
            Update Your Info to Continue
          </p>
          <p className="text-[20px] text-center text-[#88939D] font-Averta-Semibold mx-auto leading-[25px] md:w-[41.53vw]">
            With your latest details, we can serve you better and ensure
            everything runs smoothly
          </p>
        </div>
        <div className="grid mt-[80px] gap-7">
          <div className="flex justify-center flex-wrap md:flex-row gap-2 w-full">
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <InputWithLabel
                  className="min-w-[290px]"
                  labelText="FULL NAME" inputType="text"
                  inputPlaceholder="Enter Full Name" inputId="fullName"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  inputWidth="25vw"
                  error={errors.fullName?.message}
                />
              )} />
            <div className="flex md:mt-0 gap-2">
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => {
                  console.log("field.value Date:", field.value);
                  const formattedDate = field.value ? field.value.split('T')[0] : "";

                  return (<InputWithLabel
                    className="min-w-[170px]"
                    labelText="DATE OF BIRTH" inputType="date"
                    inputPlaceholder="" inputId="dateOfBirth"
                    value={formattedDate}
                    onChange={field.onChange}
                    error={errors.dateOfBirth?.message}
                    inputWidth="11.25vw" />)
                }
                } />
              <Controller
                name="gender"
                control={control}
                render={({ field }) => {
                  // console.log("field.value Gender:", field.value);  
                  return (
                    <ComboboxInput
                      className="min-w-[112px]"
                      labelText="GENDER"
                      inputId="gender"
                      inputWidth="6.875vw"
                      options={genderOptions}
                      inputPlaceholder="Gender"
                      value={field.value ?? helperData.gender}
                      onChange={field.onChange}
                      error={errors.gender?.message}
                      ref={field.ref}
                    />
                  );
                }} />

            </div>
          </div>

          <div className="flex justify-center flex-wrap md:flex-row gap-2">
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <InputWithLabel
                  className="min-w-[290px]"
                  labelText="PHONE NUMBER" inputType="text"
                  inputPlaceholder="Enter a Phone number" inputId="phoneNumber"
                  inputWidth="25vw"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.phoneNumber?.message} />
              )} />

            <div className="md:mt-0">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <InputWithLabel
                    className="min-w-[290px]"
                    labelText="EMAIL ADDRESS" inputType="email"
                    inputPlaceholder="Enter your email address" inputId="email"
                    inputWidth="18.125vw" plusPX='8px'
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={errors.email?.message} />
                )} />
            </div>
          </div>

          <div className="flex justify-center flex-wrap md:flex-row gap-2">
            <Controller
              name="salaryExpectation"
              control={control}
              render={({ field }) => (
                <InputWithLabel
                  className="min-w-[290px] appearance-none"
                  labelText="SALARY EXPECTATION ($)" inputType="number"
                  inputPlaceholder="100000$" inputId="salaryExpectation"
                  inputWidth="18.125vw" plusPX='8px'
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.salaryExpectation?.message} />
              )} />

            <div className=" md:mt-0">
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <InputWithLabel
                    className="min-w-[290px]"
                    labelText="CITY/PROVINCE" inputType="text"
                    inputPlaceholder="Enter your city/province" inputId="city"
                    inputWidth="25vw"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={errors.city?.message} />
                )} />
            </div>
          </div>

          <div className="flex justify-center flex-wrap md:flex-row gap-2">
            <Controller
              name="ward"
              control={control}
              render={({ field }) => (
                <InputWithLabel
                  className="min-w-[290px]"
                  labelText="WARD" inputType="text"
                  inputPlaceholder="Enter ward" inputId="ward"
                  inputWidth="25vw"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.ward?.message} />
              )} />

            <div className=" md:mt-0">
              <Controller
                name="postalCode"
                control={control}
                render={({ field }) => (
                  <InputWithLabel
                    className="min-w-[290px]"
                    labelText="POSTAL CODE" inputType="text"
                    inputPlaceholder="Enter Postal Code" inputId="postalCode"
                    inputWidth="18.125vw" plusPX='8px'
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={errors.postalCode?.message} />
                )} />
            </div>
          </div>

          <div className="flex justify-center flex-wrap md:flex-row gap-2">
            <Controller
              name="houseNumber"
              control={control}
              render={({ field }) => (
                <InputWithLabel
                  className="min-w-[290px]"
                  labelText="HOUSE NUMBER" inputType="text"
                  inputPlaceholder="Enter your House Number" inputId="houseNumber"
                  inputWidth="18.75vw"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.houseNumber?.message} />
              )} />

            <div className=" md:mt-0">
              <Controller
                name="streetName"
                control={control}
                render={({ field }) => (
                  <InputWithLabel
                    className="min-w-[290px]"
                    labelText="STREET NAME" inputType="text"
                    inputPlaceholder="Enter your Street Name" inputId="streetName"
                    inputWidth="24.375vw" plusPX='8px'
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={errors.streetName?.message} />
                )} />

            </div>
          </div>

          <div className="flex justify-center flex-wrap md:flex-row gap-2">
            <Controller
              name="servicesOffered"
              control={control}
              render={({ field }) => (
                <MultipleChoiceInput
                  className="min-w-[290px]"
                  labelText="OFFERED SERVICES" inputId="servicesOffered"
                  inputWidth="43.125vw" plusPX='16px' options={options}
                  value={field.value ?? []}
                  onChange={field.onChange}
                  error={errors.servicesOffered?.message} />
              )} />
          </div>

        </div>
      </div>
      {/* Section-Right */}
      <div className="md:w-1/3 bg-gray-100 min-h-screen">

        {/* ID Card */}
        <div
        >
          <p className="text-3xl font-Averta-Bold mb-4 mt-[4.7vw] ml-[2.2vw]">ID Card</p>
          <input
            id="indentifyCard"
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleIdCardChange}
          />

          <div
            onDrop={handleIdCardDrop}
            onDragOver={handleDragOver}>
            {idCardUrl ? (
              <>
                <div className="text-center">
                  <div className="lg:w-[25vw] h-[250px] mx-auto border-2 border-gray-500 rounded-md overflow-hidden bg-white flex items-center justify-center">
                    <Image
                      src={idCardUrl}
                      alt="identity"
                      width={400}
                      height={200}
                      className='mx-auto'
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-[10px] mt-4">
                  <Button className="w-[170px] h-[40px] 
                    bg-[#1A78F2] font-Averta-Semibold text-[16px]"
                    type="button"
                    onClick={() => handleDownload(idCard)}>
                    Download
                  </Button>
                  <Button className="w-[170px] h-[40px]
                    bg-white font-Averta-Semibold text-[#1A78F2] hover:bg-gray-100
                      text-[16px] border-2 border-[#1A78F2]"
                    onClick={() => document.querySelector<HTMLInputElement>("#indentifyCard")?.click()}
                    type="button">Upload IDCard</Button>
                </div></>
            ) : idCard ? (
              <FileDownloadCard
                className='mx-[2.08vw]'
                fileName={idCard.name}
                fileSize={idCard.size}
                onUpdate={() => document.querySelector<HTMLInputElement>("#indentifyCard")?.click()}
                onDownload={() => handleDownload(idCard)} />
            ) : (
              <div
                className="border-2 bg-white mx-[2.08vw] border-dashed border-gray-300 rounded-lg px-4 py-8 text-center"
              >
                <Image
                  src="/images/Dashboard/Personal/upload.svg"
                  alt="upload"
                  width={40}
                  height={40}
                  className="mb-6 mx-auto"
                />
                <>
                  <p className="text-[14px] text-gray-600 font-Averta-Semibold mb-3">
                    Select a file or drag and drop here
                  </p>
                  <p className="text-[12px] text-gray-500 mb-6">
                    JPG, PNG or PDF, file size no more than 10MB
                  </p>
                </>
                <button
                  type="button"
                  className="bg-white font-Averta-Semibold text-[#1A78F2] border-2 border-[#1A78F2] px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
                  onClick={() => document.querySelector<HTMLInputElement>("#indentifyCard")?.click()}
                >
                  Select File
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Resume */}
        <div>
          <p className="text-3xl font-Averta-Bold mb-4 ml-[2.2vw] mt-[1vw]">Résumé</p>
          <input
            id="resumeUploaded"
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleResumeChange}
          />
          <div
            onDrop={handleResumeDrop}
            onDragOver={handleDragOver}
          >
            {resumeUrl ? (
              <>
                <div className='text-center'>
                  <div className="max-w-[26.5vw] h-[250px] mx-auto border-2 border-gray-500 bg-white rounded-md overflow-hidden flex items-center justify-center">
                    <Image
                      src={resumeUrl}
                      alt="resume"
                      width={400}
                      height={200}
                      className='mx-auto' />
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-[10px] mt-4">
                  <Button className="w-[170px] h-[40px] 
                    bg-[#1A78F2] font-Averta-Semibold text-[16px]"
                    type="button"
                    onClick={() => handleDownload(resume)}>
                    Download
                  </Button>
                  <Button className="w-[170px] h-[40px]
                    bg-white font-Averta-Semibold text-[#1A78F2] hover:bg-gray-100
                      text-[16px] border-2 border-[#1A78F2]"
                    onClick={() => document.querySelector<HTMLInputElement>("#resumeUploaded")?.click()}
                    type="button">Upload IDCard</Button>
                </div>
              </>
            ) : resume ? (
              <FileDownloadCard
                className='mx-[2.08vw]'
                fileName={resume.name}
                fileSize={resume.size}
                onUpdate={() => document.querySelector<HTMLInputElement>("#resumeUploaded")?.click()}
                onDownload={() => handleDownload(resume)} />
            ) : (
              <div
                className="border-2 bg-white h-auto mx-[2.08vw] border-dashed
             border-gray-300 rounded-lg px-4 py-4 flex"

              >
                <Image
                  src="/images/Dashboard/Personal/upload.svg"
                  alt="upload"
                  width={40}
                  height={40}
                />
                <div className="py-2 px-4 text-center mx-auto">
                  <p className="text-[14px] text-gray-600 font-Averta-Semibold">
                    Select your CV or drag and drop here
                  </p>
                  <p className="text-[12px] text-gray-500 mt-[12px]">
                    JPG, PNG or PDF, file size no more than 10MB
                  </p>
                </div>
                <button
                  type="button"
                  className="bg-white font-Averta-Semibold text-[#1A78F2] 
                  border-2 border-[#1A78F2] px-4 py-2 rounded-md hover:bg-blue-50 
                  transition-colors h-fit ml-auto my-auto w-auto"
                  onClick={() => document.querySelector<HTMLInputElement>("#resumeUploaded")?.click()}
                >
                  Select File
                </button>
              </div>
            )}
          </div>

        </div>

        <div className="flex justify-center items-center mt-[2vw] pb-[2vw]">
          <Button type="submit" className="md:w-1/3 min-w-[150px] h-[60px] bg-[#1A78F2] font-Averta-Semibold text-[16px]">Verify</Button>
        </div>
      </div>
    </form>

  )
}

export default UpdateStaffInfo
