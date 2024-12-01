import React, { forwardRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface CustomSelectProps {
  label: string;
  id: string;
  options: string[];
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  className?: string;
}

const CustomSelect = forwardRef<HTMLButtonElement, CustomSelectProps>(
  (
    { label, id, options, placeholder, value, onChange, error, className },
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
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            className={cn(
              `font-Averta-Regular h-[50px] text-[16px] text-[#88939D] border-2`,
              error ? "border-red-500 focus:ring-red-500" : "border-[#E5E7EB]",
              className
            )}
            ref={ref}
            id={id}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <p className="text-[14px] text-red-500 font-Averta-Regular">
            {error}
          </p>
        )}
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
