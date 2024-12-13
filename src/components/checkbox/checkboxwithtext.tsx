"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { bookingStore } from "@/utils/store/booking.store";
import { useState } from "react";

export function CheckboxWithText() {
  const bookingUpdate = bookingStore((state: any) => state.updateBookingData);
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    bookingUpdate({ checked: checked });
  };

  return (
    <div className="items-top flex space-x-2 mt-[30px]">
      <Checkbox
        checked={checked || false}
        onCheckedChange={handleCheckboxChange}
        id="terms1"
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-Averta-Semibold 
                    leading-none peer-disabled:cursor-not-allowed 
                    peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <p className="text-sm font-Averta-Regular text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
