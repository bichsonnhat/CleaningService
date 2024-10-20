"use client";
import React, { useState } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import Top from "./Top"; // Import Top component

type Customer = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
};

const columns = [
  {
    header: "ID",
    accessor: "id",
    className: "p-4 hidden md:table-cell w-[80px]",
  },
  {
    header: "NAME",
    accessor: "name",
    className: "hidden md:table-cell w-[177px]",
  },
  {
    header: "ADDRESS",
    accessor: "address",
    className: "hidden md:table-cell w-[342px]",
  },
  {
    header: "PHONE NUMBER",
    accessor: "phone",
    className: "hidden md:table-cell w-[170px]",
  },
  {
    header: "EMAIL",
    accessor: "email",
    className: "hidden lg:table-cell w-[180px]",
  },
  {
    header: "",
    accessor: "",
    className: "hidden lg:table-cell w-[100px]",
  },
];

const customersData: Customer[] = [
  {
    id: "00001",
    name: "Christine Brooks",
    address: "123 Maple Street Apt. 101",
    phone: "09123456789",
    email: "christine.brooks@example.com",
  },
  {
    id: "00002",
    name: "Rosie Pearson",
    address: "456 Oak Avenue Suite 202",
    phone: "09234567890",
    email: "rosie.pearson@example.com",
  },
  {
    id: "00003",
    name: "Michael Johnson",
    address: "789 Pine Lane Apt. 303",
    phone: "09345678901",
    email: "michael.johnson@example.com",
  },
  {
    id: "00004",
    name: "Samantha Lee",
    address: "159 Cedar Road Suite 404",
    phone: "09456789012",
    email: "samantha.lee@example.com",
  },
  {
    id: "00005",
    name: "David Smith",
    address: "357 Birch Drive Apt. 505",
    phone: "09567890123",
    email: "david.smith@example.com",
  },
  {
    id: "00006",
    name: "Emily Davis",
    address: "753 Elm Street Suite 606",
    phone: "09678901234",
    email: "emily.davis@example.com",
  },
  {
    id: "00007",
    name: "John Williams",
    address: "951 Spruce Boulevard Apt. 707",
    phone: "09789012345",
    email: "john.williams@example.com",
  },
  {
    id: "00008",
    name: "Laura Brown",
    address: "258 Ash Court Suite 808",
    phone: "09890123456",
    email: "laura.brown@example.com",
  },
];

const itemsPerPage = 5;

const CustomerTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const totalPages = Math.ceil(customersData.length / itemsPerPage);

  const filteredData = customersData.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  const renderRow = (item: Customer) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 bg-white text-sm h-[80px] "
    >
      <td className="p-4 text-[#202224] font-semibold mr-1">{item.id}</td>
      <td className="text-[#202224] font-semibold mr-1">{item.name}</td>
      <td className="text-[#202224] font-semibold mr-1">{item.address}</td>
      <td className="text-[#202224cc] mr-1 ">{item.phone}</td>
      <td className="text-[#202224cc] mr-1 ">{item.email}</td>
      <td>
        <button
          className="px-4 py-1.5 bg-[#6896d1] text-[#12153a] bg-opacity-20 text-xs rounded-[4.5px] font-semibold hover:bg-opacity-50"
          //   onClick
        >
          More Info
        </button>
      </td>
    </tr>
  );

  return (
    <>
      <Top setSearchTerm={setSearchTerm} />

      <Table columns={columns} renderRow={renderRow} data={currentData} />

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
