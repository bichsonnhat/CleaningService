import React from "react";
import ProgressBar from "@/components/progressbar/ProgressBar";
const BookingLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className="overflow-x-hidden">
      <ProgressBar />
      {props.children}
    </div>
  );
};

export default BookingLayout;
