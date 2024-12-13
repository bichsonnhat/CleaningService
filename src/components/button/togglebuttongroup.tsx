"use client";

import { bookingStore } from "@/utils/store/booking.store";
import { Button } from "../ui/button";
import { useState } from "react";

interface ToggleButtonProps {
  id: number;
  contentText: string;
  className: string;
  isToggled: boolean;
  onToggle: (id: number) => void;
}

export function ToggleButton({
  id,
  contentText,
  className,
  isToggled,
  onToggle,
}: ToggleButtonProps) {
  const bookingUpdate = bookingStore((state: any) => state.updateBookingData);
  return (
    <Button
      className={`${className} ${
        isToggled
          ? "border-[#1A78F2] text-[#1A78F2]"
          : "border-[#d3d8dd] text-[#4f6071]"
      }`}
      onClick={() => {
        if (contentText === "Yes") {
          bookingUpdate({ anyPet: true });
        }
        if (contentText === "No") {
          bookingUpdate({ anyPet: false });
        }
        if (contentText === "Someone in Home") {
          bookingUpdate({ howToGetIn: "Someone in Home" });
        }
        if (contentText === "Doorman") {
          bookingUpdate({ howToGetIn: "Doorman" });
        }
        if (contentText === "Hidden Key") {
          bookingUpdate({ howToGetIn: "Hidden Key" });
        }
        if (contentText === "Others") {
          bookingUpdate({ howToGetIn: "Others" });
        }
        onToggle(id);
      }}
    >
      {contentText}
    </Button>
  );
}

interface ToggleButtonGroupProps {
  buttons: { id: number; contentText: string }[];
  classNameCommon: string;
}

export function ToggleButtonGroup({
  buttons,
  classNameCommon,
}: ToggleButtonGroupProps) {
  const [activeButtonId, setActiveButtonId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setActiveButtonId(id);
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {buttons.map((button) => (
        <ToggleButton
          key={button.id}
          id={button.id}
          contentText={button.contentText}
          className={classNameCommon}
          isToggled={activeButtonId === button.id}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
