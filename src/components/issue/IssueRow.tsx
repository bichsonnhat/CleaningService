import React from 'react';
import { Checkbox } from "@material-tailwind/react";
import { useRouter } from 'next/navigation';

interface IssueRowProps {
  name: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  message: string;
  createAt: string;
}

const IssueRow: React.FC<IssueRowProps> = ({ name, sentiment, message, createAt }) => {
  const router = useRouter();
  
  const sentimentColor = sentiment === 'Positive' ? 'bg-[#ccf0eb] text-[#00b69b]' :
    sentiment === 'Negative' ? 'bg-[#fcd7d4] text-[#ef3826]' :
      'bg-[#ccd0d9] text-[#2b3641]';

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const hour = date.getUTCHours().toString().padStart(2, '0');
    const minute = date.getUTCMinutes().toString().padStart(2, '0');

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${hour}:${minute} - ${day}/${month}/${year}`;
  }


  return (
    <div 
    onClick={() => router.push(`issue/${name}`)}
    className={`flex overflow-hidden flex-wrap w-full border-b border-gray-200 max-md:max-w-full md:h-[80px] cursor-pointer bg-white hover:bg-[#f4f7ff]`}>
      <div className={`flex flex-col flex-1 grow shrink justify-center pl-6 w-[66px]`}>
        <div className="flex overflow-hidden items-center ml-4 pl-px w-full min-h-[48px]">
          <Checkbox color='gray' icon={null} ripple={false} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
        </div>
      </div>
      <div className={`flex flex-col flex-2 grow shrink justify-center pl-2.5 text-sm font-bold text-neutral-800 w-[70px]`}>
        <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] font-Averta-Bold text-[15px]">{name}</div>
      </div>
      <div className={`flex flex-col flex-5 grow shrink justify-center pl-2.5 text-sm font-semibold min-w-[240px] text-neutral-800 w-[566px] max-md:max-w-full`}>
        <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] max-md:max-w-full font-Averta-Bold text-[15px]">{message}</div>
      </div>
      <div className={`flex flex-col grow shrink justify-center pl-2.5 text-sm text-neutral-800 w-[136px]`}>
        <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] font-Averta-SemiBold text-[14px]">{formatDate(createAt)}</div>
      </div>
    </div>
  );
};

export default IssueRow;