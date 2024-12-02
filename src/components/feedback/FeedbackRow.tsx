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
    className={`flex overflow-hidden flex-col xl:flex-row flex-wrap w-full border-b px-4 border-gray-200 xl:h-[80px] cursor-pointer bg-white hover:bg-[#f4f7ff]`}>
      <div onClick={(e) => e.stopPropagation()} className={`relative flex flex-[1] flex-col xl:justify-center `}>
        <div className="max-xl:absolute flex overflow-hidden items-center justify-end xl:justify-center max-xl:mt-2 pl-px w-full min-h-[48px]">
          <Checkbox onClick={(e) => e.stopPropagation()}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
        </div>
      </div>

      <div className={`flex flex-[3] flex-col justify-center text-sm  text-neutral-800 `}>

        <div className="overflow-hidden px-3 py-4 w-full min-h-[48px] font-Averta-Regular xl:font-Averta-Semibold text-[15px]">
        <span className="xl:hidden font-mono font-bold">Customer: </span>
          {customerName}</div>
      </div>

      <div className={`flex flex-[3] flex-col px-3 py-4 xl:justify-center font-bold text-center whitespace-nowrap `}>
        <div className="flex overflow-hidden flex-1 items-center xl:justify-center size-full">
          <div className="flex flex-row items-center gap-2 self-stretch my-auto w-[93px]">
          <span className="xl:hidden font-mono font-semibold text-[15px]">Sentiment: </span>
            <div className={`flex relative gap-4 justify-between text-xs items-start px-4 py-1.5 min-h-[27px] min-w-24 ${sentimentColor} rounded-md`}>
              <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px]">
                {sentiment}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex flex-[10] flex-col  justify-center  text-sm  min-w-[240px] text-neutral-800 `}>
        <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] max-md:max-w-full font-Averta-Regular xl:font-Averta-Semibold text-[15px]">
        <span className="xl:hidden font-mono font-semibold text-[15px]">Title: </span>
          {message}</div>
      </div>

      <div className={`flex flex-[3] flex-col  justify-center text-sm  text-neutral-800 `}>
        <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] font-Averta-Regular xl:font-Averta-Semibold text-[14px]">
        <span className="xl:hidden font-mono font-semibold">Date: </span>
          {formatDate(createdAt)}</div>
      </div>
    </div>


  );
};

export default FeedbackRow;