import React from 'react'

interface ChartRowProps {
    service_name: string;
    location: string;
    date_time: string;
    service_fee: string;
    status: 'Completed' | 'Processing';
}

export const ChartRow: React.FC<ChartRowProps> = ({service_name, location, date_time, service_fee, status}) => {
    const bgColor = status === 'Completed' ? 'bg-[#b3fcf1]' : 
                    status === 'Processing'? 'bg-[#cab5fc]' : '';
    const textColor = status === 'Completed' ? 'text-[#00B69B]' : 
                    status === 'Processing'? 'text-[#6226EF]' : '';
  return (
    <>
        <div className='flex flex-row h-[80px] p-[10px] gap-[10px]'>
            <div className='w-[20.5%] pl-[12px] m-auto'>
                <div className='text-[#202224] opacity-80 text-sm font-semibold'>{service_name}</div>
            </div>
            <div className='w-[22.5%] pl-[12px] m-auto'>
                <div className='text-[#202224] opacity-80 text-sm font-semibold'>{location}</div>
            </div>
            <div className='w-[25.8%] pl-[12px] m-auto'>
                <div className='text-[#202224] opacity-80 text-sm font-semibold'>{date_time}</div>
            </div>
            <div className='w-[16%] pl-[12px] m-auto'>
                <div className='text-[#202224] opacity-80 text-sm font-semibold'>{service_fee}</div>
            </div>
            <div className='w-[15.2%] pl-[12px] m-auto py-[26.5] pr-[50px]'>
                <div className={`${bgColor} h-[30px] rounded-lg w-fit px-3`}>
                    <div className={`${textColor} text-xs font-bold flex items-center justify-center h-full`}>{status}</div>
                </div>
            </div>
        </div>
    </>
  )
}
