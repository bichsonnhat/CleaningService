import React from 'react'
import { ChartRow } from './ChartRow';

type ChartTableProps = {
    chartTableData: {
        service_name: string;
        location: string;
        date_time: string;
        service_fee: number;
        status: string;
    }[];
}

export const ChartTable: React.FC<ChartTableProps> = ({chartTableData}) => {

  return (
    <div className='w-[95%] m-auto mt-[25px]'>
        <div className='max-sm:hidden flex flex-row bg-[#F1F4F9] h-[48px] p-[10px] gap-[10px] rounded-t-2xl'>
            <div className='w-[20.5%] pl-[12px] m-auto'>
                <div className='text-[#202224] text-sm font-bold'>Service Name</div>
            </div>
            <div className='w-[22.5%] pl-[12px] m-auto'>
                <div className='text-[#202224] text-sm font-bold'>Location</div>
            </div>
            <div className='w-[25.8%] pl-[12px] m-auto'>
                <div className='text-[#202224] text-sm font-bold'>Date - Time</div>
            </div>
            <div className='w-[16%] pl-[12px] m-auto'>
                <div className='text-[#202224] text-sm font-bold'>Service Fee</div>
            </div>
            <div className='w-[15.2%] pl-[12px] m-auto'>
                <div className='text-[#202224] text-sm font-bold'>Status</div>
            </div>
        </div>
        <div className='divide-y'>
            {chartTableData.map((chart) => (
                <ChartRow key={chart.date_time} {...chart} />
            ))}
        </div>
    </div>
  )
}
