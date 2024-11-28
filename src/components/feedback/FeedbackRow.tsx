import React from 'react';
import { Checkbox } from "@material-tailwind/react";
import { useRouter } from 'next/navigation';

interface FeedbackRowProps {
  customerName: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  message: string;
  createdAt: string;
}

const FeedbackRow: React.FC<FeedbackRowProps> = ({ customerName, sentiment, message, createdAt }) => {
  const router = useRouter();

  const sentimentColor = sentiment === 'Positive' ? 'bg-[#ccf0eb] text-[#00b69b]' :
    sentiment === 'Negative' ? 'bg-[#fcd7d4] text-[#ef3826]' :
      'bg-[#ccd0d9] text-[#2b3641]';

      const formatDate = (date: string) => {
        const newDate = new Date(date);

        const hours = newDate.getHours().toString().padStart(2, '0');
        const minutes = newDate.getMinutes().toString().padStart(2, '0');

        const day = newDate.getDate().toString().padStart(2, '0');
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const year = newDate.getFullYear();

        return `${hours}:${minutes} - ${day}/${month}/${year}`;
    }

  return (

    <div 
    onClick={() => router.push(`feedback/${customerName}`)}
    className={`flex overflow-hidden flex-wrap w-full border-b border-gray-200 max-md:max-w-full md:h-[80px] cursor-pointer bg-white hover:bg-[#f4f7ff]`}>
      <div onClick={(e) => e.stopPropagation()} className={`flex flex-col grow shrink justify-center pl-6 w-[66px]`}>
        <div className="flex overflow-hidden items-center pl-px w-full min-h-[48px]">
          <Checkbox onClick={(e) => e.stopPropagation()}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
        </div>
      </div>
      <div className={`flex flex-col grow shrink justify-center pl-2.5 text-sm font-bold text-neutral-800 w-[103px]`}>
        <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] font-Averta-Bold text-[15px]">{customerName}</div>
      </div>
      <div className={`flex flex-col grow shrink justify-center pl-6 text-xs font-bold text-center whitespace-nowrap w-[125px]`}>
        <div className="flex overflow-hidden flex-1 items-center size-full">
          <div className="flex flex-col self-stretch my-auto w-[93px]">
            <div className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-h-[27px] ${sentimentColor} rounded-md`}>
              <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px]">{sentiment}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={`flex flex-col grow shrink justify-center pl-2.5 text-sm font-semibold min-w-[240px] text-neutral-800 w-[566px] max-md:max-w-full`}>
        <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] max-md:max-w-full font-Averta-Bold text-[15px]">{message}</div>
      </div>
      <div className={`flex flex-col grow shrink justify-center pl-2.5 text-sm font-semibold text-neutral-800 w-[136px]`}>
        <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] font-Averta-Bold text-[14px]">{formatDate(createdAt)}</div>
      </div>
    </div>


  );
};

export default FeedbackRow;