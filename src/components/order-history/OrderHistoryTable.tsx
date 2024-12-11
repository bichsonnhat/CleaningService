"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import OrderHistoryRow from "./OrderHistoryRow";
import Pagination from "./Pagination";
import { Booking } from "../order/OrderTable";
import { Role } from "../feedback/FeedbackTable";
import ClipLoader from "react-spinners/ClipLoader";

type OrderHistory = {
  id: string;
  helperName: string;
  location: string;
  scheduledStartTime: Date;
  scheduledEndTime: Date;
  helperRating?: number | null;
  totalPrice: number;
  status: "Pending" | "In Progress" | "Cancelled" | "Completed";
};

const columns = [
  { header: "HELPER", className: "w-[210px] hidden md:table-cell" },
  { header: "ADDRESS", className: "w-[340px] hidden md:table-cell" },
  { header: "TIME", className: "w-[200px] hidden md:table-cell" },
  { header: "RATING", className: "w-[110px] hidden md:table-cell mr-10" },
  { header: "PRICE", className: "w-[120px] hidden md:table-cell " },
  { header: "STATUS", className: "w-[120px] hidden md:table-cell" },
];

const OrderHistoryTable = () => {
  const role = Role.Customer;
  const userId = "799a5f8f-1f54-4a15-b0c1-9099469f1128";

  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const fetchData = async () => {
    const response = await fetch(`/api/bookings?role=${role}&userId=${userId}`);
    const data = await response.json();
    setBookings(data);
    console.log("Booking history response: ", data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("Helper");

  // Search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredData = bookings
    ? bookings.filter((order) => {
        const term = searchTerm.toLowerCase();

        if (searchBy === "Helper")
          return order.helper.user.fullName.toLowerCase().includes(term);
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

  if (!bookings)
    return (
      <div className="flex justify-center items-center w-full h-[500px]">
        <ClipLoader color="#2A88F5" loading={true} size={30} />
      </div>
    );

  return (
    <>
      <SearchBar setSearchTerm={handleSearch} setSearchBy={setSearchBy} />

      {/* title column */}
      <div className="flex flex-wrap gap-3 w-full bg-[#f5f5f5] h-[48px] items-center mt-4 p-2.5">
        {columns.map((col, index) => (
          <div
            key={index}
            className={`${col.className} text-left text-[#202224] text-sm font-Averta-Bold`}
          >
            {col.header}
          </div>
        ))}
      </div>

      <div className="flex overflow-hidden flex-col justify-center w-full mt-4">
        {bookings == null || bookings.length === 0 ? (
          <div className="flex justify-center items-center w-full py-8 bg-white">
            <p className="text-lg font-Averta-Semibold text-neutral-900">
              You have no booking
            </p>
          </div>
        ) : (
          currentData.map((booking: Booking, index: any) => (
            <OrderHistoryRow key={booking.id} booking={booking} />
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

export default OrderHistoryTable;
