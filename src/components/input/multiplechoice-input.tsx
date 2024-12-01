"use client"

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

interface MultipleChoiceInputProps {
    labelText: string;
    inputId: string;
    inputWidth?: string;
    plusPX?: string,
    className?: string;
    options?: string[];
}

export function MultipleChoiceInput({
    labelText,
    inputId,
    inputWidth = "w-full",
    plusPX,
    className,
    options = [],
}: MultipleChoiceInputProps) {

    const [tags, setTags] = useState<string[]>([]);

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="grid max-w-max items-center gap-1.5">
            <Label className="text-[14px] w-fit font-Averta-Semibold text-[#9FA7B0]" htmlFor={inputId}>
                {labelText}
            </Label>
            <div className="w-fit">
                <div className={cn(`flex flex-wrap items-center border-2 gap-2 border-gray-300 
                                    p-2 rounded-lg font-Averta-Regular min-h-[50px] max-h-[100px] 
                                    overflow-auto text-[16px] text-[#88939D]`, className)}
                    style={plusPX ? { width: `calc(${inputWidth} + ${plusPX})` } : { width: `${inputWidth}` }}
                >
                    {tags.map((tag, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center border-2 font-Averta-Semibold 
                            text-[16px] bg-white text-[#88939D] pl-3 pr-1 py-[2px] rounded-lg border-gray-300
                            "
                        >
                            <span>{tag}</span>
                            <Image
                                className="cursor-pointer ml-1 hover:scale-110"
                                width={24}
                                height={24}
                                alt="x"
                                src="/images/x-button1.png"
                                onClick={() => removeTag(index)} />
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap md:flex-row md:w-fit gap-2 mt-3 w-[290px]">
                    {options.map((service, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (tags.includes(service)) {
                                    setTags(tags.filter(tag => tag !== service));
                                } else {
                                    setTags([...tags, service]);
                                }
                            }}
                            className={`w-[9vw] px-2 py-[2px] min-w-[120px] border-2 rounded-lg hover:bg-gray-100 font-Averta-Semibold text-[16px] ${tags.includes(service) ? 'border-[#1A78F2] text-[#1A78F2]' : 'text-[#88939D] border-gray-300' // Optional: Change background if selected
                                }`}
                        >
                            {service}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}