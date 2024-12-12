"use client";
import React, { useEffect, useState } from "react";
import { ChartTable } from "@/components/chart/ChartTable";
import Dropdown from "@/components/chart/DropDown";
import { InfoCard } from "@/components/chart/InfoCard";
import { Chart } from "@/components/chart/Chart";
import Pagination from "@/components/chart/Pagination";
import { IBookingResponse, IUserResponse } from "@/utils/interfaces";

const ChartPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("None");
  const itemsPerPage = 5;

  const [totalIncome, setTotalIncome] = useState(Array(12).fill(0));
  const [totalPeding, setTotalPending] = useState(0);
  const [user, setUser] = useState<IUserResponse[]>([]);
  const [chartTableData, setChartTableData] = useState<
    {
      service_name: string;
      location: string;
      date_time: string;
      service_fee: number;
      status: string;
    }[]
  >([]);
  const [chartCardData] = useState<
    {
      titleInfo: string;
      dataInfo: string;
      urliconInfo: string;
      percentageChangeInfo: string;
      trend: string;
    }[]
  >([
    {
      titleInfo: "Total User",
      dataInfo: "",
      urliconInfo: "/images/Chart/totalUser.svg",
      percentageChangeInfo: "",
      trend: "",
    },
    {
      titleInfo: "Total Order",
      dataInfo: "",
      urliconInfo: "/images/Chart/totalOrder.svg",
      percentageChangeInfo: "",
      trend: "",
    },
    {
      titleInfo: "Total Income",
      dataInfo: "",
      urliconInfo: "/images/Chart/totalIncome.svg",
      percentageChangeInfo: "",
      trend: "",
    },
    {
      titleInfo: "Total Pending",
      dataInfo: "",
      urliconInfo: "/images/Chart/totalPending.svg",
      percentageChangeInfo: "",
      trend: "",
    },
  ]);

  const mappingChartData = (responseDatas: IBookingResponse[]) => {
    const chartData = responseDatas.map((data) => {
      const formattedDateTime = new Date(
        data.scheduledStartTime
      ).toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return {
        service_name: data.serviceType.name,
        location: data.location,
        date_time: formattedDateTime,
        service_fee: data.totalPrice,
        status: data.status,
      };
    });
    setChartTableData(chartData);
  };

  const totalPages = Math.ceil(chartTableData.length / itemsPerPage);
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

  useEffect(() => {
    const fetchBookingData = async (url: string) => {
      const res = await fetch(url, {
        cache: "force-cache",
      });
      const data = await res.json();
      mappingChartData(data);
    };
    const fetchUserData = async (url: string) => {
      const res = await fetch(url, {
        cache: "force-cache",
      });
      const data = await res.json();
      setUser(data);
    };
    fetchBookingData("/api/bookings");
    fetchUserData("/api/users");
  }, []);

  useEffect(() => {
    const newTotalIncome = Array(12).fill(0);
    chartTableData.forEach((data) => {
      if (data.status === "Completed") {
        const month = new Date(data.date_time).getMonth();
        newTotalIncome[month] += Number(data.service_fee);
      }
      if (data.status === "Pending") {
        setTotalPending((prev) => prev + 1);
      }
    });
    setTotalIncome(newTotalIncome);
  }, [chartTableData]);

  useEffect(() => {
    const totalUserToday = user.filter((data) => {
      const today = new Date();
      const createdAt = new Date(data.createdAt);
      return today.getDate() === createdAt.getDate();
    }).length;

    const totalUserYesterday = user.filter((data) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const createdAt = new Date(data.createdAt);
      return yesterday.getDate() === createdAt.getDate();
    }).length;

    const totalOrderToday = chartTableData.filter((data) => {
      const today = new Date();
      const date = new Date(data.date_time);
      return today.getDate() === date.getDate();
    }).length;

    const totalOrderYesterday = chartTableData.filter((data) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const date = new Date(data.date_time);
      return yesterday.getDate() === date.getDate();
    }).length;

    const totalIncomeToday = chartTableData.filter((data) => {
      const today = new Date();
      const date = new Date(data.date_time);
      return today.getDate() === date.getDate();
    }).length;

    const totalIncomeYesterday = chartTableData.filter((data) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const date = new Date(data.date_time);
      return yesterday.getDate() === date.getDate();
    }).length;

    const totalPendingToday = chartTableData.filter((data) => {
      const today = new Date();
      const date = new Date(data.date_time);
      return today.getDate() === date.getDate();
    }).length;

    const totalPendingYesterday = chartTableData.filter((data) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const date = new Date(data.date_time);
      return yesterday.getDate() === date.getDate();
    }).length;

    const percentageUserChange =
      ((totalUserToday - totalUserYesterday) / totalUserYesterday) * 100;
    const percentageOrderChange =
      ((totalOrderToday - totalOrderYesterday) / totalOrderYesterday) * 100;
    const percentageIncomeChange =
      ((totalIncomeToday - totalIncomeYesterday) / totalIncomeYesterday) * 100;
    const percentagePendingChange =
      ((totalPendingToday - totalPendingYesterday) / totalPendingYesterday) *
      100;

    chartCardData[0].dataInfo = user.length.toString();
    chartCardData[0].percentageChangeInfo = `${percentageUserChange.toFixed(
      2
    )}%`;
    chartCardData[0].trend = percentageUserChange > 1 ? "up" : "down";
    chartCardData[1].dataInfo = chartTableData.length.toString();
    chartCardData[1].percentageChangeInfo = `${percentageOrderChange.toFixed(
      2
    )}%`;
    chartCardData[1].trend = percentageOrderChange > 1 ? "up" : "down";
    chartCardData[2].dataInfo = `$${totalIncome.reduce((a, b) => a + b, 0)}`;
    chartCardData[2].percentageChangeInfo = `${percentageIncomeChange.toFixed(
      2
    )}%`;
    chartCardData[2].trend = percentageIncomeChange > 1 ? "up" : "down";
    chartCardData[3].dataInfo = totalPeding.toString();
    chartCardData[3].percentageChangeInfo = `${percentagePendingChange.toFixed(
      2
    )}%`;
    chartCardData[3].trend = percentagePendingChange > 1 ? "up" : "down";
  }, [user, chartTableData]);
  return (
    <>
      <div className="flex flex-col gap-[30px] h-full w-full">
        <div className="grid grid-cols-2 sm:flex sm:flex-row justify-between h-fit max-sm:gap-4">
          {chartCardData.map((chart) => (
            <InfoCard key={chart.titleInfo} {...chart} />
          ))}
        </div>
        <div className="bg-white rounded-xl h-[500px]">
          <div className="w-[95%] m-auto mt-[30px] flex flex-row justify-between h-[10%]">
            <div className="text-[#202224] text-2xl font-bold leading-tight text-left">
              Total Income Details
            </div>
          </div>
          <div className="w-[95%] m-auto my-[25px] h-[90%]">
            <Chart totalIncome={totalIncome} />
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
