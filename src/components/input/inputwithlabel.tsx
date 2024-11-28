"use client";

import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InputWithLabelProps {
  labelText: string;
  inputType: string;
  inputPlaceholder: string;
  inputId: string;
  inputWidth?: string;
  options?: string[];
  defaultValue?: string;
  plusPX?: string;
}

export function InputWithLabel({
  labelText,
  inputType,
  inputPlaceholder,
  inputId,
  inputWidth = "w-full",
  options = [],
  defaultValue,
  plusPX,
}: InputWithLabelProps) {
  const services = [
    { id: 1, contentText: "Home Cleaning" },
    { id: 2, contentText: "Baby-Sitting" },
    { id: 3, contentText: "Caretaking" },
    { id: 4, contentText: "House Keeping" },
  ];

  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="grid max-w-max items-center gap-1.5">
      <Label
        className="text-[14px] font-Averta-Semibold text-[#9FA7B0]"
        htmlFor={inputId}
      >
        {labelText}
      </Label>
      {inputType === "combobox" ? (
        <Select defaultValue={defaultValue}>
          <SelectTrigger
            className={`${inputWidth} font-Averta-Regular h-[50px] text-[16px] text-[#88939D] border-2`}
            style={{ width: `${inputWidth}` }}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : inputType === "multipleChoice" ? (
        <div>
          <div
            className="flex flex-wrap items-center border-2 gap-2 border-gray-300 p-2 rounded-lg
                        font-Averta-Regular min-h-[50px] max-h-[100px] overflow-auto text-[16px] text-[#88939D]"
            style={
              plusPX
                ? { width: `calc(${inputWidth} + ${plusPX})` }
                : { width: `${inputWidth}` }
            }
          >
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center justify-center border-2 font-Averta-Semibold text-[16px] bg-white text-[#88939D] px-3 py-[2px] rounded-lg border-gray-300"
              >
                <span>{tag}</span>
                <Image
                  className="cursor-pointer ml-1"
                  width={24}
                  height={24}
                  alt="x"
                  src="/images/x-button1.png"
                  onClick={() => removeTag(index)}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            {services.map((service) => (
              <button
                key={service.contentText}
                onClick={() => {
                  if (tags.includes(service.contentText)) {
                    setTags(tags.filter((tag) => tag !== service.contentText));
                  } else {
                    setTags([...tags, service.contentText]);
                  }
                }}
                className={`w-[9vw] px-2 py-[2px] border-2 rounded-lg hover:bg-gray-100 font-Averta-Semibold text-[16px] ${
                  tags.includes(service.contentText)
                    ? "border-[#1A78F2] text-[#1A78F2]"
                    : "text-[#88939D] border-gray-300" // Optional: Change background if selected
                }`}
              >
                {service.contentText}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <Input
          className={`font-Averta-Regular h-[50px] text-[16px] text-[#88939D] border-2`}
          type={inputType}
          id={inputId}
          placeholder={inputPlaceholder}
          style={
            plusPX
              ? { width: `calc(${inputWidth} + ${plusPX})` }
              : { width: `${inputWidth}` }
          }
        />
      )}
    </div>
  );
}
