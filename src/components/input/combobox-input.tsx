"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
    Select, SelectContent, SelectGroup, SelectItem,
    SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select";

interface ComboboxInputProps {
    labelText: string;
    inputId: string;
    inputWidth?: string;
    inputPlaceholder?: string;
    options?: string[];
    defaultValue?: string;
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
}

// Sử dụng forwardRef để truyền ref vào component
export const ComboboxInput = forwardRef<HTMLButtonElement, ComboboxInputProps>((
    {
        labelText,
        inputId,
        inputWidth = "w-full",
        inputPlaceholder,
        options = [],
        defaultValue,
        className,
        value,
        onChange,
        error
    },
    ref
) => {

    return (
        <div className="grid max-w-max items-center gap-1.5">
            <Label className="text-[14px] w-fit font-Averta-Semibold text-[#9FA7B0]" htmlFor={inputId}>
                {labelText}
            </Label>
            <div className="relative">
                <Select defaultValue={defaultValue} value={value ?? defaultValue} onValueChange={(val) => onChange?.(val)}>
                    <SelectTrigger
                        className={cn("font-Averta-Regular h-[50px] text-[16px] placeholder:text-[#88939D] text-[#47494b] border-2", 
                            error ? "border-red-500 focus:ring-red-500" : "border-[#E5E7EB]",
                            className)}
                        style={{ width: `${inputWidth}` }}
                        id={inputId}
                        ref={ref}
                    >
                        <SelectValue placeholder={inputPlaceholder} />
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
                {error && (
                    <p className="lg:absolute text-[14px] text-red-500 font-Averta-Regular top-full mt-[2px]">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
});

// Đảm bảo rằng ref được chuyển qua khi sử dụng component
ComboboxInput.displayName = "ComboboxInput";  // Optional: Để dễ dàng debug trong React DevTools
