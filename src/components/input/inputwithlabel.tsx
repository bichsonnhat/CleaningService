"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputWithLabelProps {
  labelText: string;
  inputType: string;
  inputPlaceholder: string;
  inputId: string;
  inputWidth?: string;
  plusPX?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

export function InputWithLabel({
  labelText,
  inputType,
  inputPlaceholder,
  inputId,
  inputWidth = "w-full",
  plusPX,
  className,
  onChange,
}: InputWithLabelProps) {
  return (
    <div className="grid max-w-max items-center gap-1.5">
      <Label
        className="text-[14px] w-fit font-Averta-Semibold text-[#9FA7B0]"
        htmlFor={inputId}
      >
        {labelText}
      </Label>

      <Input
        className={cn(
          "font-Averta-Regular h-[50px] text-[16px] text-[#88939D] border-2",
          className
        )}
        type={inputType}
        id={inputId}
        placeholder={inputPlaceholder}
        style={
          plusPX
            ? { width: `calc(${inputWidth} + ${plusPX})` }
            : { width: `${inputWidth}` }
        }
        onChange={onChange}
      />
    </div>
  );
}
