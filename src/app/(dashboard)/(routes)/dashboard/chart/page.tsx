"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "@/components/chart/DropDown";
import { InfoCard } from "@/components/chart/InfoCard";
import { Chart } from "@/components/chart/Chart";
import Pagination from "@/components/chart/Pagination";
import { IBookingResponse, IUserResponse } from "@/utils/interfaces";
import { ChartRow } from "@/components/chart/ChartRow";
import ClipLoader from "react-spinners/ClipLoader";
import { Skeleton } from "@/components/ui/skeleton"

const ChartPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("None");
  const itemsPerPage = 5;

  const [totalIncome, setTotalIncome] = useState<number[]>(Array(12).fill(0));
  const [totalPending, setTotalPending] = useState(0);
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
  const [chartCardData, setChartCardData] = useState([
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
        service_name: data.serviceCategory.name,
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
    filter.toLowerCase() !== "none"
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

  // Fetch data
  useEffect(() => {
    const fetchBookingData = async (url: string) => {
      const res = await fetch(url);
      const data = await res.json();
      mappingChartData(data);
    };
    const fetchUserData = async (url: string) => {
      const res = await fetch(url);
      const data = await res.json();
      setUser(data);
    };
    fetchBookingData(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings?role=admin&userId=adminID`);
    fetchUserData(`${process.env.NEXT_PUBLIC_API_URL}/api/users?role=admin`);
  }, []);

  // Calculate income and pending
  useEffect(() => {
    const calculateIncomeAndPending = () => {
      const newTotalIncome = Array(12).fill(0);
      let pendingCount = 0;

      chartTableData.forEach((data) => {
        const date = new Date(data.date_time);
        const month = date.getMonth();

        if (data.status === "completed") {
          newTotalIncome[month] += Number(data.service_fee);
        }
        if (data.status === "pending") {
          pendingCount++;
        }
      });

      setTotalIncome(newTotalIncome);
      setTotalPending(pendingCount);
    };

    calculateIncomeAndPending();
  }, [chartTableData]);

  // Update card data
  useEffect(() => {
    const updateCardData = () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const totalUserToday = user.filter(
        (data) => new Date(data.createdAt).getDate() === today.getDate()
      ).length;

      const totalUserYesterday = user.filter(
        (data) => new Date(data.createdAt).getDate() === yesterday.getDate()
      ).length;

      const totalOrderToday = chartTableData.filter(
        (data) => new Date(data.date_time).getDate() === today.getDate()
      ).length;

      const totalOrderYesterday = chartTableData.filter(
        (data) => new Date(data.date_time).getDate() === yesterday.getDate()
      ).length;

      const todayIncome = chartTableData
        .filter((data) => {
          const date = new Date(data.date_time);
          return date.getDate() === today.getDate() && data.status === "completed";
        })
        .reduce((sum, data) => sum + data.service_fee, 0);

      const yesterdayIncome = chartTableData
        .filter((data) => {
          const date = new Date(data.date_time);
          return date.getDate() === yesterday.getDate() && data.status === "completed";
        })
        .reduce((sum, data) => sum + data.service_fee, 0);

      const calculatePercentageChange = (today: number, yesterday: number) =>
        yesterday !== 0 ? ((today - yesterday) / yesterday) * 100 : 0;

      const newChartCardData = [
        {
          ...chartCardData[0],
          dataInfo: user.length.toString(),
          percentageChangeInfo: `${calculatePercentageChange(
            totalUserToday,
            totalUserYesterday
          ).toFixed(1)}%`,
          trend:
            calculatePercentageChange(totalUserToday, totalUserYesterday) > 0
              ? "up"
              : "down",
        },
        {
          ...chartCardData[1],
          dataInfo: chartTableData.length.toString(),
          percentageChangeInfo: `${calculatePercentageChange(
            totalOrderToday,
            totalOrderYesterday
          ).toFixed(1)}%`,
          trend:
            calculatePercentageChange(totalOrderToday, totalOrderYesterday) > 0
              ? "up"
              : "down",
        },
        {
          ...chartCardData[2],
          dataInfo: `$${totalIncome.reduce((a, b) => a + b, 0)}`,
          percentageChangeInfo: `${calculatePercentageChange(
            todayIncome,
            yesterdayIncome
          ).toFixed(1)}%`,
          trend:
            calculatePercentageChange(todayIncome, yesterdayIncome) > 0
              ? "up"
              : "down",
        },
        {
          ...chartCardData[3],
          dataInfo: totalPending.toString(),
          percentageChangeInfo: `${calculatePercentageChange(
            chartTableData.filter(
              (data) =>
                new Date(data.date_time).getDate() === today.getDate() &&
                data.status === "pending"
            ).length,
            chartTableData.filter(
              (data) =>
                new Date(data.date_time).getDate() === yesterday.getDate() &&
                data.status === "pending"
            ).length
          ).toFixed(1)}%`,
          trend: totalPending > 0 ? "up" : "down",
        },
      ];

      setChartCardData(newChartCardData);
    };

    updateCardData();
  }, [user, chartTableData, totalIncome, totalPending]);

  return (
    <>
      <div className="flex flex-col gap-[30px] h-full w-full">
        <div className="grid grid-cols-2 sm:flex sm:flex-row justify-between h-fit max-sm:gap-4">
            {chartTableData.length === 0 ? (
            <div className="flex justify-between w-full bg-slate-100 rounded-lg">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="w-[22%] h-[200px] bg-slate-200 rounded-lg" />
              ))}
            </div>
            ) : (
            chartCardData.map((chart) => (
              <InfoCard key={chart.titleInfo} {...chart} />
            ))
            )}
        </div>
        <div className="bg-white rounded-xl h-[500px]">
          <div className="w-[95%] m-auto mt-[30px] flex flex-row justify-between h-[10%]">
            <div className="text-[#202224] text-2xl font-bold leading-tight text-left">
              Total Income Details
            </div>
          </div>
            <div className="w-[95%] m-auto my-[25px] h-[90%]">
            {chartTableData.length === 0 ? (
              <div className='flex justify-center items-center h-full'>
                <ClipLoader color='#3B82F6' loading={true} size={50} />
              </div>
            ) : (
              <Chart totalIncome={totalIncome} />
            )}
            </div>
        </div>
        <div className="bg-white rounded-xl h">
          <div className="w-[95%] m-auto mt-[30px] flex flex-row justify-between">
            <div className="text-[#202224] text-2xl font-bold leading-tight text-left">
              Deals Details
            </div>
            <Dropdown setFilter={setFilter} />
          </div>
          <div className='w-[95%] m-auto my-[25px]'>
              <div className='max-sm:hidden flex flex-row bg-[#F1F4F9] h-[48px] p-[10px] gap-[10px] rounded-t-xl'>
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
                {chartTableData.length === 0 ? (
                  <div className='flex justify-center items-center h-[300px]'>
                    <ClipLoader color='#3B82F6' loading={true} size={50} />
                  </div>
                ) : ( finalData.length === 0 ? (
                  <div className='flex justify-center items-center h-[300px]'>
                    <p className='text-[#202224] text-lg font-bold'>No data found</p>
                  </div>
                ) : (
                  finalData.map((chart) => (
                    <ChartRow key={chart.date_time} {...chart} />
                )))
                )}
              </div>
          </div>
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