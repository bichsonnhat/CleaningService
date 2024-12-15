"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import OrderRow from "./OrderRow";
import Pagination from "./Pagination";
import ClipLoader from "react-spinners/ClipLoader";
import { Role } from "../feedback/FeedbackTable";

export type Booking = {
  id: string;
  customerId: string;
  helperId: string;
  serviceTypeId: string;
  location: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  status: string;
  cancellationReason?: string;
  totalPrice: number;
  paymentStatus: string;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
  customer: {
    fullName: string;
  };
  helper: {
    user: {
      fullName: string;
    };
  };
  feedbacks: {
    id: string;
    helperRating?: number;
    reportedBy: boolean;
  }[];
};

const columns = [
  { header: "CUSTOMER", className: "w-[130px] flex-[3] hidden md:table-cell " }, // Ít thông tin, không cần rộng
  { header: "HELPER", className: "w-[130px] flex-[3] hidden md:table-cell " }, // Tương tự CUSTOMER
  { header: "ADDRESS", className: "w-[250px] flex-[5] hidden md:table-cell " }, // Thông tin thường dài, cần rộng hơn
  {
    header: "TIME",
    className: "w-[130px] flex-[3] hidden md:table-cell text-center",
  }, // Số liệu ngắn, đủ hẹp
  {
    header: "RATING",
    className: "w-[120px] flex-[3] hidden md:table-cell text-center",
  }, // Nội dung ngắn
  {
    header: "PRICE",
    className: "w-[120px] flex-[2] hidden md:table-cell text-center",
  }, // Số liệu ngắn
  {
    header: "STATUS",
    className: "w-[120px] flex-[3] hidden md:table-cell text-center",
  }, // Có thể cần rộng hơn chút
];

const OrderTable = () => {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string>("");
  useEffect(() => {
    fetchUserInfo();
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings?role=${role}&userId=${userId}`
      );
      const data = await response.json();
      setBookings(data);
      console.log("Booking response: ", data);
    };

    fetchData();
  }, []);

  const fetchUserInfo = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-info`);
    const data = await response.json();
    setRole(data.role);
    setUserId(data.userId);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("Customer");

  // Search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredData = Array.isArray(bookings)
    ? bookings.filter((order) => {
        const term = searchTerm.toLowerCase();

        if (searchBy === "Customer")
          return order.customer.fullName.toLowerCase().includes(term);
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

      <div className="flex overflow-hidden flex-col justify-center w-full max-md:max-w-full">
        {bookings == null || bookings.length === 0 ? (
          <div className="flex justify-center items-center w-full py-8 bg-white">
            <p className="text-lg font-Averta-Semibold text-neutral-900">
              We have no booking
            </p>
          </div>
        ) : (
          currentData.map((booking: Booking, index: any) => (
            <OrderRow key={booking.id} booking={booking} />
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

export default OrderTable;
