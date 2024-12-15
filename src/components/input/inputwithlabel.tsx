"use client"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputWithLabelProps {
    labelText: string;
    inputType: string;
    inputPlaceholder: string;
    inputId: string;
    inputWidth?: string;
    plusPX?: string,
    className?: string;
    error?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputWithLabel({
    labelText,
    inputType,
    inputPlaceholder,
    inputId,
    inputWidth = "w-full",
    plusPX,
    className,
    error,
    value,
    onChange,
}: InputWithLabelProps) {

    return (
        <div className="grid max-w-max items-center gap-1.5">
            <Label className="text-[14px] w-fit font-Averta-Semibold text-[#9FA7B0]" htmlFor={inputId}>
                {labelText}
            </Label>

            <div className="relative">
                <Input
                    className={cn("font-Averta-Regular h-[50px] text-[16px] placeholder:text-[#88939D] text-[#47494b] border-2",
                        error ? "border-red-500 focus:ring-red-500" : "border-[#E5E7EB]", className)}
                    type={inputType}
                    
                    id={inputId}
                    placeholder={inputPlaceholder}
                    style={plusPX ? { width: `calc(${inputWidth} + ${plusPX})` } : { width: `${inputWidth}` }}
                    value={value}
                    onChange={onChange}
                />
                {error && (
                    <p className="lg:absolute text-[14px] text-red-500 font-Averta-Regular top-full mt-[2px]">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}