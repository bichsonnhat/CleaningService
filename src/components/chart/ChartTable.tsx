import React from 'react'
import { ChartRow } from './ChartRow';

const chartkData = [
    { service_name: "Gardening", location: "6096 hahaha", date_time: "21.10.2024 - 15:16 PM", service_fee: "$100.00", status: "Completed" as "Completed" },
    { service_name: "Gardening", location: "6096 hahaha", date_time: "21.10.2024 - 15:17 PM", service_fee: "$100.00", status: "Processing" as "Processing" },
    { service_name: "Gardening", location: "6096 hahaha", date_time: "21.10.2024 - 15:18 PM", service_fee: "$100.00", status: "Completed" as "Completed" },
    { service_name: "Gardening", location: "6096 hahaha", date_time: "21.10.2024 - 15:19 PM", service_fee: "$100.00", status: "Processing" as "Processing" },
    { service_name: "Gardening", location: "6096 hahaha", date_time: "21.10.2024 - 15:20 PM", service_fee: "$100.00", status: "Completed" as "Completed" },
    { service_name: "Gardening", location: "6096 hahaha", date_time: "21.10.2024 - 15:21 PM", service_fee: "$100.00", status: "Processing" as "Processing" },
    { service_name: "Gardening", location: "6096 hahaha", date_time: "21.10.2024 - 15:22 PM", service_fee: "$100.00", status: "Completed" as "Completed" },
    { service_name: "Gardening", location: "6096 hahaha", date_time: "21.10.2024 - 15:23 PM", service_fee: "$100.00", status: "Processing" as "Processing" },
    { service_name: "Gardening", location: "6096 hahaha", date_time: "21.10.2024 - 15:24 PM", service_fee: "$100.00", status: "Completed" as "Completed" },
    { service_name: "Gardening", location: "6096 hahaha", date_time: "21.10.2024 - 15:25 PM", service_fee: "$100.00", status: "Processing" as "Processing" },
];

export const ChartTable = () => {
  return (
    <div className='w-[95%] m-auto mt-[25px]'>
        <div className='flex flex-row bg-[#F1F4F9] h-[48px] p-[10px] gap-[10px] rounded-t-2xl'>
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
            {chartkData.map((chart) => (
                <ChartRow key={chart.date_time} {...chart} />
            ))}
        </div>
    </div>
  )
}
