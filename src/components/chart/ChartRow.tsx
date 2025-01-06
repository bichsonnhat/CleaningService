import React from 'react'

interface ChartRowProps {
    service_name: string;
    location: string;
    date_time: string;
    service_fee: number;
    status: string;
}

export const ChartRow: React.FC<ChartRowProps> = ({service_name, location, date_time, service_fee, status}) => {
    const bgColor = status === 'completed' ? 'bg-[#00B69B]' : 
                    status === 'cancelled' ? 'bg-[#EF3826]' : 
                    status === 'pending' ? 'bg-[#FFD154]' : 
                    status === 'inprogress' ? 'bg-[#1A78F2]' : 
                    status === 'requested' ? 'bg-[#F87171]' : 
                    status === 'refunded' ? 'bg-[#60A5FA]' : 
                    status === 'declined' ? 'bg-[#F97316]' : '';

    const textColor = status === 'completed' ? 'text-[#00B69B]' : 
                    status === 'cancelled' ? 'text-[#EF3826]' : 
                    status === 'pending' ? 'text-[#FF9500]' : 
                    status === 'inprogress' ? 'text-[#1A78F2]' : 
                    status === 'requested' ? 'text-[#B91C1C]' : 
                    status === 'refunded' ? 'text-[#1D4ED8]' : 
                    status === 'declined' ? 'text-[#C2410C]' : '';
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
                    <span className='md:hidden font-bold uppercase text-[#202224]'>status: </span>
                    <div className={`${bgColor} bg-opacity-20 h-[30px] rounded-lg w-[90px] px-3`}>
                        <div className={`${textColor} text-xs font-bold flex items-center justify-center h-full`}>{status.charAt(0).toUpperCase() + status.slice(1)}</div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
