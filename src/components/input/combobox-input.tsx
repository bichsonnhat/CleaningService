"use client"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import {
    Select, SelectContent, SelectGroup, SelectItem,
    SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select"



interface ComboboxInputlProps {
    labelText: string;
    inputId: string;
    inputWidth?: string;
    options?: string[];
    defaultValue?: string;
    className?: string;
}

export function ComboboxInput({
    labelText,
    inputId,
    inputWidth = "w-full",
    options = [],
    defaultValue,
    className,
}: ComboboxInputlProps) {

    return (
        <div className="grid max-w-max items-center gap-1.5">
            <Label className="text-[14px] w-fit font-Averta-Semibold text-[#9FA7B0]" htmlFor={inputId}>
                {labelText}
            </Label>
            <Select defaultValue={defaultValue}>
                <SelectTrigger
                    className={cn("font-Averta-Regular h-[50px] text-[16px] text-[#88939D] border-2", className)}
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
        </div>
    );
}