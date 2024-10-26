"use client";
import React, { useState } from "react";
import Pagination from "./Pagination";
import SearhBar from "./SearchBar";
import CustomerRow from "./CustomerRow";

type Customer = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
};

const columns = [
  { header: "ID", className: "w-[8%] hidden md:table-cell" },
  { header: "NAME", className: "w-[20%] hidden md:table-cell" },
  { header: "ADDRESS", className: "w-[26%] hidden md:table-cell" },
  { header: "PHONE", className: "w-[11%] hidden md:table-cell" },
  { header: "EMAIL", className: "w-[20%] hidden md:table-cell" },
  { header: "", className: "w-[10%] hidden md:table-cell" },
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
  {
    id: "00009",
    name: "George Miller",
    address: "101 Maple Boulevard Apt. 909",
    phone: "09901234567",
    email: "george.miller@example.com",
  },
  {
    id: "00010",
    name: "Alice Thompson",
    address: "202 Pine Street Suite 1010",
    phone: "09012345678",
    email: "alice.thompson@example.com",
  },
  {
    id: "00011",
    name: "Robert Johnson",
    address: "303 Birch Avenue Apt. 1111",
    phone: "09134567890",
    email: "robert.johnson@example.com",
  },
  {
    id: "00012",
    name: "Emma Roberts",
    address: "404 Oak Lane Suite 1212",
    phone: "09245678901",
    email: "emma.roberts@example.com",
  },
  {
    id: "00013",
    name: "Lucas Green",
    address: "505 Cedar Road Apt. 1313",
    phone: "09356789012",
    email: "lucas.green@example.com",
  },
  {
    id: "00014",
    name: "Lily Evans",
    address: "606 Maple Avenue Suite 1414",
    phone: "09467890123",
    email: "lily.evans@example.com",
  },
  {
    id: "00015",
    name: "James Carter",
    address: "707 Pine Boulevard Apt. 1515",
    phone: "09578901234",
    email: "james.carter@example.com",
  },
  {
    id: "00016",
    name: "Olivia Lewis",
    address: "808 Birch Street Suite 1616",
    phone: "09689012345",
    email: "olivia.lewis@example.com",
  },
  {
    id: "00017",
    name: "Henry Young",
    address: "909 Oak Avenue Apt. 1717",
    phone: "09790123456",
    email: "henry.young@example.com",
  },
  {
    id: "00018",
    name: "Isabella Wright",
    address: "1010 Cedar Lane Suite 1818",
    phone: "09801234567",
    email: "isabella.wright@example.com",
  },
  {
    id: "00019",
    name: "Alexander Hall",
    address: "111 Maple Street Apt. 1919",
    phone: "09912345678",
    email: "alexander.hall@example.com",
  },
  {
    id: "00020",
    name: "Sophia Adams",
    address: "222 Oak Boulevard Apt. 2020",
    phone: "09023456789",
    email: "sophia.adams@example.com",
  },
  {
    id: "00021",
    name: "Mason Harris",
    address: "333 Pine Avenue Suite 2121",
    phone: "09134567890",
    email: "mason.harris@example.com",
  },
  {
    id: "00022",
    name: "Charlotte King",
    address: "444 Birch Lane Apt. 2222",
    phone: "09245678901",
    email: "charlotte.king@example.com",
  },
  {
    id: "00023",
    name: "Benjamin Scott",
    address: "555 Maple Road Suite 2323",
    phone: "09356789012",
    email: "benjamin.scott@example.com",
  },
  {
    id: "00024",
    name: "Amelia Martin",
    address: "666 Oak Street Apt. 2424",
    phone: "09467890123",
    email: "amelia.martin@example.com",
  },
  {
    id: "00025",
    name: "Elijah Walker",
    address: "777 Pine Boulevard Suite 2525",
    phone: "09578901234",
    email: "elijah.walker@example.com",
  },
  {
    id: "00026",
    name: "Harper Robinson",
    address: "888 Birch Avenue Apt. 2626",
    phone: "09689012345",
    email: "harper.robinson@example.com",
  },
  {
    id: "00027",
    name: "Logan Perez",
    address: "999 Maple Lane Suite 2727",
    phone: "09790123456",
    email: "logan.perez@example.com",
  },
  {
    id: "00028",
    name: "Ava White",
    address: "1010 Oak Street Apt. 2828",
    phone: "09801234567",
    email: "ava.white@example.com",
  },
  {
    id: "00029",
    name: "Daniel Thompson",
    address: "1111 Cedar Road Suite 2929",
    phone: "09912345678",
    email: "daniel.thompson@example.com",
  },
  {
    id: "00030",
    name: "Mia Moore",
    address: "1234 Pine Lane Suite 3030",
    phone: "09023456789",
    email: "mia.moore@example.com",
  },
  {
    id: "00031",
    name: "Giang Phan",
    address: "1234 Pine Lane Suite 3030",
    phone: "09023456789",
    email: "mia.moore@example.com",
  },
];

const CustomerTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("Name");

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
      <div className="flex gap-3 w-full bg-[#f5f5f5] h-[48px] items-center mt-4 p-2.5">
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
      <div className="flex overflow-hidden flex-col justify-center w-full max-md:max-w-full">
        {currentData.map((customer: Customer, index: any) => (
          <CustomerRow key={customer.id} {...customer} />
        ))}
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

export default CustomerTable;
