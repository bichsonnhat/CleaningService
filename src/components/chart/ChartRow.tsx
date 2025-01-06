import React from 'react'

interface ChartRowProps {
    service_name: string;
    location: string;
    date_time: string;
    service_fee: number;
    status: string;
}

export const ChartRow: React.FC<ChartRowProps> = ({service_name, location, date_time, service_fee, status}) => {
  const statusStyle = status === 'completed' ? 'bg-[#2fb4a7] text-[#2fb4a7] bg-opacity-20' : 
                  status === 'cancelled' ? 'bg-[#ec4536] text-[#ec4536] bg-opacity-20' : 
                  status === 'pending' ? 'bg-[#ffb922] text-[#ffb922] bg-opacity-20' : 
                  status === 'inprogress' ? 'bg-[#4086db] text-[#4086db] bg-opacity-20' : 
                  status === 'requested' ? 'bg-[#ec4536] text-[#ec4536] bg-opacity-20' : 
                  status === 'refunded' ? 'bg-[#4086db] text-[#4086db] bg-opacity-20' : 
                  status === 'declined' ? 'bg-[#F97316] text-[#F97316] bg-opacity-20' : '';
  return (
    <>
        <div className='flex flex-col sm:flex-row h-fit sm:h-[80px] p-[10px] gap-[10px]'>
            <div className='w-full sm:w-[20.5%] pl-[12px] sm:m-auto'>
                <div className='text-[#202224] opacity-80 text-sm font-semibold'><span className='md:hidden text-base font-bold uppercase'>service name: </span>{service_name}</div>
            </div>
            <div className='w-full sm:w-[22.5%] pl-[12px] sm:m-auto'>
                <div className='text-[#202224] opacity-80 text-sm font-semibold'><span className='md:hidden text-base font-bold uppercase'>location: </span>{location}</div>
            </div>
            <div className='w-full sm:w-[25.8%] pl-[12px] sm:m-auto'>
                <div className='text-[#202224] opacity-80 text-sm font-semibold'><span className='md:hidden text-base font-bold uppercase'>date time: </span>{date_time}</div>
            </div>
            <div className='w-full sm:w-[16%] pl-[12px] sm:m-auto'>
                <div className='text-[#202224] opacity-80 text-sm font-semibold'><span className='md:hidden text-base font-bold uppercase'>service fee: </span>{service_fee}</div>
            </div>
            <div className='w-full sm:w-[15.2%] pl-[12px] sm:m-auto py-[26.5] pr-[50px]'>
                <div className='flex flex-row gap-4'>
                    <span className='md:hidden font-bold uppercase text-[#202224] opacity-80'>status: </span>
                    <div className={`h-[30px] w-[90px] px-3 ${statusStyle} rounded-lg text-xs font-bold flex items-center justify-center `}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
