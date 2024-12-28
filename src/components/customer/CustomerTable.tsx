"use client";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import SearhBar from "./SearchBar";
import CustomerRow from "./CustomerRow";
import ClipLoader from "react-spinners/ClipLoader";

type Customer = {
  id: string;
  name: string;
  gender: string;
  address: string;
  phone: string;
  email?: string;
  status: string;
};

export enum UserStatus {
  Active = "active",
  In_Active = "in_active",
  Blocked = "blocked",
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

const columns = [
  { header: "ID", className: "w-[80px] flex-[2] hidden md:table-cell" },
  { header: "NAME", className: "w-[230px] flex-[3] hidden md:table-cell" },
  {
    header: "GENDER",
    className: "w-[160px] flex-[3] hidden md:table-cell mr-2 text-center",
  },
  { header: "ADDRESS", className: "w-[270px] flex-[5] hidden md:table-cell" },
  { header: "PHONE", className: "w-[170px] flex-[4] hidden md:table-cell" },
  { header: "EMAIL", className: "w-[220px] flex-[4] hidden md:table-cell" },
  {
    header: "STATUS",
    className: "w-[130px] flex-[3] hidden md:table-cell text-center",
  },
];

const CustomerTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("Name");

  const [customersData, setCustomersData] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users`
        );

        // const response = await fetch(
        //   `/api/users`
        // );

        if (response.ok) {
          const users = await response.json();

          const customers = users
            .filter((user: any) => !user.helper)
            .map((user: any) => ({
              id: user.id,
              name: user.fullName || "-",
              gender: user.gender || "-",
              address: user.address || "-",
              phone: user.phoneNumber || "-",
              email: user.email || "-",
              status: user.status || "-",
            }));

          setCustomersData(customers);
        } else {
          console.error("Failed to fetch data: ", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, []);

  // Search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredData = customersData.filter((customer) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "Id") return customer.id.toLowerCase().includes(term);
    if (searchBy === "Name") return customer.name.toLowerCase().includes(term);
    if (searchBy === "Address")
      return customer.address.toLowerCase().includes(term);
    if (searchBy === "Phone")
      return customer.phone.toLowerCase().includes(term);
    if (searchBy === "Email")
      return customer.email?.toLowerCase().includes(term);
    return customer.name.toLowerCase().includes(term);
  });

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

  return (
    <>
      <SearhBar setSearchTerm={handleSearch} setSearchBy={setSearchBy} />

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

      {/* table */}

      <div className="flex overflow-hidden flex-col justify-center w-full max-md:max-w-full mt-4">
        {customersData.length === 0 ? (
          <div className="flex justify-center items-center w-full h-[500px]">
            <ClipLoader color="#2A88F5" loading={true} size={30} />
          </div>
        ) : (
          currentData.map((customer: Customer, index) => (
            <CustomerRow key={customer.id} index={index + 1} {...customer} />
          ))
        )}
      </div>

      {/* pagination */}

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default CustomerTable;
