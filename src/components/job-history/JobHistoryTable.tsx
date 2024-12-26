"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import JobHistoryRow from "./JobHistoryRow";
import Pagination from "./Pagination";
import { Role } from "../feedback/FeedbackTable";
import { Booking } from "../order/OrderTable";
import ClipLoader from "react-spinners/ClipLoader";

type JobHistory = {
  id: string;
  customerName: string;
  location: string;
  scheduledStartTime: Date;
  scheduledEndTime: Date;
  helperRating?: number | null;
  totalPrice: number;
  status: "Pending" | "In Progress" | "Cancelled" | "Completed";
};
const columns = [
  { header: "CUSTOMER", className: " flex-[2] hidden md:table-cell" },
  {
    header: "ADDRESS",
    className: " flex-[5] hidden md:table-cell text-center",
  },
  { header: "TIME", className: " flex-[3]  hidden md:table-cell text-center" },
  {
    header: "RATING",
    className: " flex-[3]  hidden md:table-cell text-center",
  },
  { header: "PRICE", className: " flex-[2] hidden md:table-cell text-center" },
  { header: "STATUS", className: " flex-[3] hidden md:table-cell text-center" },
];

const JobHistoryTable = () => {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [role, setRole] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const fetchData = async () => {
    const userResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user-info`
    );
    const userInfo = await userResponse.json();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bookings?role=${userInfo.role}&userId=${userInfo.userId}`
    );
    const data = await response.json();
    setBookings(data);
    setRole(userInfo.role);
    setUserId(userInfo.userId);
    console.log("Role: ", userInfo.role);
    console.log("Job history response: ", data);
  };
  // const fetchUserInfo = async () => {
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-info`);
  //   const data = await response.json();
  //   setRole(data.role);
  //   setUserId(data.userId);
  // }
  useEffect(() => {
    //fetchUserInfo();
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("Customer");

  // Search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredData = bookings
    ? bookings.filter((order) => {
        const term = searchTerm.toLowerCase();

        if (searchBy === "Customer")
          return order.customer.fullName.toLowerCase().includes(term);
        if (searchBy === "Rating")
          return order.feedbacks[0].helperRating?.toString().includes(term);
        if (searchBy === "Price")
          return order.totalPrice.toString().includes(term);
        if (searchBy === "Status")
          return order.status.toLowerCase().includes(term);

        return order.customer.fullName.toLowerCase().includes(term);
      })
    : [];

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  if (!bookings || role == "" || userId == "")
    return (
      <div className="flex justify-center items-center w-full h-[500px]">
        <ClipLoader color="#2A88F5" loading={true} size={30} />
      </div>
    );

  return (
    <>
      <SearchBar setSearchTerm={handleSearch} setSearchBy={setSearchBy} />

      {/* title column */}
      <div className="lg:flex hidden gap-3 w-full bg-[#f5f5f5] h-[48px] items-center mt-4 p-2.5 ">
        {columns.map((col, index) => (
          <div
            key={index}
            className={`${col.className} text-left text-[#202224] text-sm font-Averta-Bold`}
          >
            {col.header}
          </div>
        ))}
      </div>

      <div className="flex overflow-hidden flex-col  justify-center w-full max-md:max-w-full">
        {bookings == null || bookings.length === 0 ? (
          <div className="flex justify-center items-center w-full py-8 bg-white">
            <p className="text-lg font-Averta-Semibold text-neutral-900">
              You have no job
            </p>
          </div>
        ) : (
          currentData.map((task: Booking) => (
            <JobHistoryRow
              key={task.id}
              booking={task}
              userId={userId}
              role={role}
            />
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default JobHistoryTable;
