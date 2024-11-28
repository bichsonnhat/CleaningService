import React, { forwardRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface CustomInputProps {
  label: string;
  placeholder?: string;
  id: string;
  className?: string;
  type?: string;
  error?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      label,
      placeholder,
      id,
      className,
      type = "text",
      error,
      value,
      onChange,
    },
    ref
  ) => {
    return (
      <div className="flex flex-col w-full gap-[11px]">
        <Label
          className="text-[14px] font-Averta-Semibold text-[#9FA7B0]"
          htmlFor={id}
        >
          {label.toUpperCase()}
        </Label>
        <Input
          ref={ref}
          className={cn(
            `font-Averta-Regular h-[50px] text-[16px] text-[#4F6071] border-2`,
            error ? "border-red-500 focus:ring-red-500" : "border-[#E5E7EB]",
            className
          )}
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && (
          <p className="text-[14px] text-red-500 font-Averta-Regular">
            {error}
          </p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
