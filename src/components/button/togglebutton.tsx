"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";

interface ToggleButtonProps {
  contentText: string;
  price: string;
  imageSrc: string;
  imageSrc2: string;
  className: string;
}

export function ToggleButton({
  contentText,
  price,
  imageSrc,
  imageSrc2,
  className,
}: ToggleButtonProps) {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <Button
      onClick={handleToggle}
      className={`${className} p-4 inline-grid items-center justify-center
             ${
               isToggled
                 ? "border-[#1A78F2] text-[#1A78F2]"
                 : "border-[#d3d8dd] text-[#4f6071]"
             }`}
    >
      <Image
        src={isToggled ? imageSrc2 : imageSrc}
        alt={contentText}
        width={32}
        height={32}
        className="mb-2 m-auto md:h-[3.89vw] md:w-[3.89vw]"
      />
      <span className={`text-lg`}>{contentText}</span>
      <span className="text-base font-Averta-Semibold text-[#9FA7B0] mt-1">
        ${price}
      </span>
    </Button>
  );
}
