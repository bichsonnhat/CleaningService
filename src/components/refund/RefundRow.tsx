import React from 'react';
import { Checkbox } from "@material-tailwind/react";
import { useRouter } from 'next/navigation';
interface RefundRowProps {
    customerName: string;
    status: 'Refunded' | 'Declined' | 'Pending';
    reason: string;
    createAt: string;
}
const RefundRow: React.FC<RefundRowProps> = ({ customerName, status, reason, createAt }) => {
    const router = useRouter();
    //const bgColor = isEven ? 'bg-white' : 'bg-[#f5f7ff]';
    const statusColor = status === 'Refunded' ? 'bg-[#ccf0eb] text-[#00b69b]' :
        status === 'Declined' ? 'bg-[#fcd7d4] text-[#ef3826]' :
            'bg-[#fce7af] text-[#FF9500]';

            const formatDate = (dateString: string): string => {
                const date = new Date(dateString);
              
                const day = date.getDate().toString().padStart(2, "0"); 
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear();
              
                const hours = date.getUTCHours().toString().padStart(2, "0"); 
                const minutes = date.getUTCMinutes().toString().padStart(2, "0"); 
              
                return `${hours}:${minutes} - ${day}/${month}/${year}`;
              };

    return (
        <div 
        onClick={() => router.push(`refund/${customerName}`)}
        className={`flex overflow-hidden flex-wrap w-full border-b border-gray-200 max-md:max-w-full md:h-[80px] cursor-pointer bg-white hover:bg-[#f4f7ff]`}>
            <div className={`flex flex-col shrink justify-center pl-6 mr-6 w-[66px]`}>
                <div className="flex overflow-hidden items-center pl-px w-full min-h-[48px]">
                    <Checkbox onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                </div>
            </div>
            <div className={`flex flex-col shrink justify-center text-sm font-bold text-neutral-800 w-[103px]`}>
                <div className="overflow-hidden self-stretch py-4 w-full min-h-[48px] font-Averta-Bold text-[15px]">{customerName}</div>
            </div>
            <div className={`flex flex-col shrink justify-center pl-6 mr-2 text-xs font-bold text-center whitespace-nowrap w-[125px]`}>
                <div className="flex overflow-hidden flex-1 items-center size-full">
                    <div className="flex flex-col self-stretch my-auto w-[93px]">
                        <div className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-h-[27px] ${statusColor} rounded-md`}>
                            <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px]">{status}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`flex flex-col grow shrink justify-center pl-2.5 text-sm font-semibold min-w-[200px] text-neutral-800 w-[500px] max-md:max-w-full`}>
                <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] max-md:max-w-full font-Averta-Bold text-[15px]">{reason}</div>
            </div>
            <div className={`flex flex-col grow shrink justify-center pl-2.5 text-sm text-neutral-600 w-[136px]`}>
                <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] font-Averta-SemiBold text-[14px] text-center">{formatDate(createAt)}</div>
            </div>
            <div className="w-full md:w-[8%] flex grow justify-center items-center md:py-6">
                <button 
                className=" min-w-[90px] px-4 py-1.5 bg-[#6896d1] text-[#12153a] bg-opacity-20 text-xs rounded-[4.5px] font-semibold hover:bg-opacity-50    ">
                    {status == 'Pending' ? 'Handle' : 'More Info'}
                </button>
            </div>
        </div>
    );
};
export default RefundRow;