"use client";
import React, { useState } from "react";
import { ChartTable } from "@/components/chart/ChartTable";
import Dropdown from "@/components/chart/DropDown";
import { InfoCard } from "@/components/chart/InfoCard";
import { Chart } from "@/components/chart/Chart";
import Pagination from "@/components/chart/Pagination";

const chartData = [
  {
    titleInfo: "Total User",
    dataInfo: "40,689",
    urliconInfo: "/images/Chart/totalUser.svg",
    changeInfo: "Up from yesterday",
    percentageChangeInfo: "8.5%",
    trend: "up" as "up",
  },
  {
    titleInfo: "Total Order",
    dataInfo: "89",
    urliconInfo: "/images/Chart/totalOrder.svg",
    changeInfo: "Down from yesterday",
    percentageChangeInfo: "22.5%",
    trend: "down" as "down",
  },
  {
    titleInfo: "Total Income",
    dataInfo: "$22,689",
    urliconInfo: "/images/Chart/totalIncome.svg",
    changeInfo: "Up from yesterday",
    percentageChangeInfo: "8.5%",
    trend: "up" as "up",
  },
  {
    titleInfo: "Total Pending",
    dataInfo: "19",
    urliconInfo: "/images/Chart/totalPending.svg",
    changeInfo: "Down from yesterday",
    percentageChangeInfo: "18.5%",
    trend: "down" as "down",
  },
];

const chartTableData = [
  {
    service_name: "Gardening",
    location: "6096 hahaha",
    date_time: "21.10.2024 - 15:16 PM",
    service_fee: "$100.00",
    status: "Completed" as "Completed",
  },
  {
    service_name: "Gardening",
    location: "6096 hahaha",
    date_time: "21.10.2024 - 15:17 PM",
    service_fee: "$100.00",
    status: "Processing" as "Processing",
  },
  {
    service_name: "Gardening",
    location: "6096 hahaha",
    date_time: "21.10.2024 - 15:18 PM",
    service_fee: "$100.00",
    status: "Completed" as "Completed",
  },
  {
    service_name: "Gardening",
    location: "6096 hahaha",
    date_time: "21.10.2024 - 15:19 PM",
    service_fee: "$100.00",
    status: "Processing" as "Processing",
  },
  {
    service_name: "Gardening",
    location: "6096 hahaha",
    date_time: "21.10.2024 - 15:20 PM",
    service_fee: "$100.00",
    status: "Completed" as "Completed",
  },
  {
    service_name: "Gardening",
    location: "6096 hahaha",
    date_time: "21.10.2024 - 15:21 PM",
    service_fee: "$100.00",
    status: "Processing" as "Processing",
  },
  {
    service_name: "Gardening",
    location: "6096 hahaha",
    date_time: "21.10.2024 - 15:22 PM",
    service_fee: "$100.00",
    status: "Completed" as "Completed",
  },
  {
    service_name: "Gardening",
    location: "6096 hahaha",
    date_time: "21.10.2024 - 15:23 PM",
    service_fee: "$100.00",
    status: "Processing" as "Processing",
  },
  {
    service_name: "Gardening",
    location: "6096 hahaha",
    date_time: "21.10.2024 - 15:24 PM",
    service_fee: "$100.00",
    status: "Completed" as "Completed",
  },
  {
    service_name: "Gardening",
    location: "6096 hahaha",
    date_time: "21.10.2024 - 15:25 PM",
    service_fee: "$100.00",
    status: "Processing" as "Processing",
  },
  {
    service_name: "Gardening",
    location: "6096 hahaha",
    date_time: "21.10.2024 - 15:26 PM",
    service_fee: "$100.00",
    status: "Processing" as "Processing",
  },
];
const ChartPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(chartTableData.length / itemsPerPage);
  const [filter, setFilter] = useState("None");
  const currentData = [...chartTableData];

  const finalData =
    filter !== "none"
      ? currentData
          .sort((a, b) => {
            if (filter === "Ascending")
              return a.date_time.localeCompare(b.date_time);
            if (filter === "Descending")
              return b.date_time.localeCompare(a.date_time);
            return 0;
          })
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      : chartTableData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };
  return (
    <>
      <div className="flex flex-col gap-[30px] h-full w-full">
        <div className="grid grid-cols-2 sm:flex sm:flex-row justify-between h-fit max-sm:gap-4">
          {chartData.map((chart) => (
            <InfoCard key={chart.titleInfo} {...chart} />
          ))}
        </div>
        <div className="bg-white rounded-xl h-[500px]">
          <div className="w-[95%] m-auto mt-[30px] flex flex-row justify-between h-[10%]">
            <div className="text-[#202224] text-2xl font-bold leading-tight text-left">
              Total Income Details
            </div>
            {/* <Dropdown/> */}
          </div>
          <div className="w-[95%] m-auto my-[25px] h-[90%]">
            <Chart />
          </div>
        </div>
        <div className="bg-white rounded-xl h">
          <div className="w-[95%] m-auto mt-[30px] flex flex-row justify-between">
            <div className="text-[#202224] text-2xl font-bold leading-tight text-left">
              Deals Details
            </div>
            <Dropdown setFilter={setFilter} />
          </div>
          <ChartTable chartTableData={finalData} />
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={chartTableData.length}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ChartPage;
