"use client";
import React from 'react'
import { ChartTable } from '@/components/chart/ChartTable'
import Dropdown from '@/components/chart/DropDown'
import { InfoCard } from '@/components/chart/InfoCard';
import { Chart } from '@/components/chart/Chart';

const chartkData = [
  { titleInfo: "Total User", dataInfo: "40,689", urliconInfo: '/images/Chart/totalUser.svg', changeInfo: "Up from yesterday", percentageChangeInfo: "8.5%", trend: "up" as "up" },
  { titleInfo: "Total Order", dataInfo: "89", urliconInfo: '/images/Chart/totalOrder.svg', changeInfo: "Down from yesterday", percentageChangeInfo: "22.5%", trend: "down" as "down" },
  { titleInfo: "Total Income", dataInfo: "$22,689", urliconInfo: '/images/Chart/totalIncome.svg', changeInfo: "Up from yesterday", percentageChangeInfo: "8.5%", trend: "up" as "up" },
  { titleInfo: "Total Pending", dataInfo: "19", urliconInfo: '/images/Chart/totalPending.svg', changeInfo: "Down from yesterday", percentageChangeInfo: "18.5%", trend: "down" as "down" },
];

const ChartPage = () => {
  return (
    <div className='flex flex-col gap-[30px] h-full w-full'>
      <div className='flex justify-between h-fit'>
        {chartkData.map((chart) => (
          <InfoCard key={chart.titleInfo} {...chart} />
        ))}
      </div>
      <div className='bg-white rounded-xl h-[500px]'>
        <div className='w-[95%] m-auto mt-[30px] flex flex-row justify-between h-[10%]'>
          <div className='text-[#202224] text-2xl font-bold leading-tight text-left'>Total Income Details</div>
          <Dropdown />
        </div>
        <div className='w-[95%] m-auto my-[25px] h-[90%]'>
          <Chart />
        </div>
      </div>
      <div className='bg-white rounded-xl h'>
        <div className='w-[95%] m-auto mt-[30px] flex flex-row justify-between'>
          <div className='text-[#202224] text-2xl font-bold leading-tight text-left'>Deals Details</div>
          <Dropdown />
        </div>
        <ChartTable />
      </div>
    </div>
  )
}

export default ChartPage