import React from 'react';
import { Checkbox } from "@material-tailwind/react";

interface FeedbackRowProps {
  name: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  message: string;
  date: string;
  isEven: boolean;
}

const FeedbackRow: React.FC<FeedbackRowProps> = ({ name, sentiment, message, date, isEven }) => {
  const bgColor = isEven ? 'bg-white' : 'bg-[#f5f7ff]';
  const sentimentColor = sentiment === 'Positive' ? 'bg-[#ccf0eb] text-[#00b69b]' :
    sentiment === 'Negative' ? 'bg-[#fcd7d4] text-[#ef3826]' :
      'bg-[#ccd0d9] text-[#2b3641]';

  return (
    <div className={`flex overflow-hidden flex-wrap w-full ${bgColor} bg-opacity-0 min-h-[63px] max-md:max-w-full`}>
      <div className={`flex flex-col grow shrink justify-center pl-6 ${bgColor} border-b border-zinc-600 border-opacity-20 w-[66px]`}>
        <div className="flex overflow-hidden items-center pl-px w-full min-h-[48px]">
          <Checkbox onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
        </div>
      </div>
      <div className={`flex flex-col grow shrink justify-center pl-2.5 text-sm font-bold ${bgColor} border-b border-zinc-600 border-opacity-20 text-neutral-800 w-[103px]`}>
        <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] font-Averta-Bold text-[15px]">{name}</div>
      </div>
      <div className={`flex flex-col grow shrink justify-center pl-6 text-xs font-bold text-center whitespace-nowrap ${bgColor} border-b border-zinc-600 border-opacity-20 w-[125px]`}>
        <div className="flex overflow-hidden flex-1 items-center size-full">
          <div className="flex flex-col self-stretch my-auto w-[93px]">
            <div className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-h-[27px] ${sentimentColor} rounded-md`}>
              <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px]">{sentiment}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={`flex flex-col grow shrink justify-center pl-2.5 text-sm font-semibold ${bgColor} border-b border-zinc-600 border-opacity-20 min-w-[240px] text-neutral-800 w-[566px] max-md:max-w-full`}>
        <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] max-md:max-w-full font-Averta-Bold text-[15px]">{message}</div>
      </div>
      <div className={`flex flex-col grow shrink justify-center pl-2.5 text-sm font-semibold ${bgColor} border-b border-zinc-600 border-opacity-20 text-neutral-800 w-[136px]`}>
        <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] font-Averta-Bold text-[14px]">{date}</div>
      </div>
    </div>
  );
};

export default FeedbackRow;