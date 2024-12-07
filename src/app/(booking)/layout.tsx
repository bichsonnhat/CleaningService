import React from "react";
import ProgressBar from "@/components/progressbar/ProgressBar";
const BookingLayout = (props: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col">
            <div className="max-sm:hidden sticky top-0">
                <ProgressBar />
            </div>
            <div>{props.children}</div>
            <div className="sm:hidden fixed bottom-0 w-full">
                <ProgressBar />
            </div>
        </div>
    );
};

export default BookingLayout;
