"use client";

import React from 'react';
import { Label } from '../ui/label';

interface MultiLineInputProps {
    labelText?: string;
    inputPlaceholder: string;
    inputId: string;
    inputWidth?: string;
    inputHeight?: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function MultiLineInput({
    labelText,
    inputPlaceholder,
    inputId,
    inputWidth = "w-full",
    inputHeight = "h-full",
    disabled,
    onChange,
}: MultiLineInputProps) {
  return (
    <div className="grid max-w-max items-center gap-1.5">
      <Label
        className="text-[14px] font-Averta-Semibold text-[#9FA7B0]"
        htmlFor={inputId}
      >
        {labelText}
      </Label>
      <textarea
        disabled={disabled}
        id={inputId}
        className={`${inputWidth} ${inputHeight} font-Averta-Regular text-base text-[#5f6367]
                "flex rounded-md border border-[#D3D8DD] bg-transparent px-3 py-1 shadow-sm
                transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground
                placeholder:text-[#88939D] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                disabled:cursor-not-allowed disabled:opacity-50"`}
        onChange={onChange}
        placeholder={inputPlaceholder}
      />
    </div>
  );
}
