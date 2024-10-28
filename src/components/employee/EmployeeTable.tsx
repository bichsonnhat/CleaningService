"use client";
import React, { useState } from "react";
import Pagination from "./Pagination";
import SearhBarAndFilter from "./SearchBarAndFilter";
import EmployeeRow from "./EmployeeRow";

type Employee = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  completedJobs: number;
  totalJobs: number;
};

const columns = [
  { header: "ID", className: "w-[8%] hidden md:table-cell" },
  { header: "NAME", className: "w-[12%] hidden md:table-cell" },
  { header: "ADDRESS", className: "w-[20%] hidden md:table-cell" },
  { header: "EVALUATE", className: "w-[15%] hidden md:table-cell " },
  { header: "PHONE", className: "w-[11%] hidden md:table-cell" },
  { header: "EMAIL", className: "w-[20%] hidden md:table-cell" },
  { header: "", className: "w-[8%] hidden md:table-cell" },
];

const employeesData: Employee[] = [
  {
    id: "00001",
    name: "Christine Brooks",
    address: "Apt. 448",
    phone: "09132465897",
    email: "sample@gmail.com",
    completedJobs: 12,
    totalJobs: 36,
  },
  {
    id: "00002",
    name: "Rosie Pearson",
    address: "456 Oak Avenue Suite 202 Avenue Suite 202",
    phone: "09234567890",
    email: "rosie.pearson@example.com",
    completedJobs: 25,
    totalJobs: 50,
  },
  {
    id: "00003",
    name: "Michael Johnson",
    address: "789 Pine Lane Apt. 303",
    phone: "09345678901",
    email: "michael.johnson@example.com",
    completedJobs: 10,
    totalJobs: 10,
  },
  {
    id: "00004",
    name: "Samantha Lee",
    address: "159 Cedar Road Suite 404",
    phone: "09456789012",
    email: "samantha.lee@example.com",
    completedJobs: 3,
    totalJobs: 13,
  },
  {
    id: "00005",
    name: "David Smith",
    address: "357 Birch Drive Apt. 505",
    phone: "09567890123",
    email: "david.smith@example.com",
    completedJobs: 25,
    totalJobs: 36,
  },
  {
    id: "00006",
    name: "Emily Davis",
    address: "753 Elm Street Suite 606",
    phone: "09678901234",
    email: "emily.davis@example.com",
    completedJobs: 1,
    totalJobs: 1,
  },
  {
    id: "00007",
    name: "John Williams",
    address: "951 Spruce Boulevard Apt. 707",
    phone: "09789012345",
    email: "john.williams@example.com",
    completedJobs: 0,
    totalJobs: 1,
  },
  {
    id: "00008",
    name: "Laura Brown",
    address: "258 Ash Court Suite 808",
    phone: "09890123456",
    email: "laura.brown@example.com",
    completedJobs: 25,
    totalJobs: 36,
  },
  {
    id: "00009",
    name: "George Miller",
    address: "101 Maple Boulevard Apt. 909",
    phone: "09901234567",
    email: "george.miller@example.com",
    completedJobs: 5,
    totalJobs: 7,
  },
  {
    id: "00010",
    name: "Alice Thompson",
    address: "202 Pine Street Suite 1010",
    phone: "09012345678",
    email: "alice.thompson@example.com",
    completedJobs: 25,
    totalJobs: 30,
  },
  {
    id: "00011",
    name: "Robert Johnson",
    address: "303 Birch Avenue Apt. 1111",
    phone: "09134567890",
    email: "robert.johnson@example.com",
    completedJobs: 2,
    totalJobs: 5,
  },
  {
    id: "00012",
    name: "Emma Roberts",
    address: "404 Oak Lane Suite 1212",
    phone: "09245678901",
    email: "emma.roberts@example.com",
    completedJobs: 2,
    totalJobs: 3,
  },
  {
    id: "00013",
    name: "Lucas Green",
    address: "505 Cedar Road Apt. 1313",
    phone: "09356789012",
    email: "lucas.green@example.com",
    completedJobs: 5,
    totalJobs: 5,
  },
  {
    id: "00014",
    name: "Lily Evans",
    address: "606 Maple Avenue Suite 1414",
    phone: "09467890123",
    email: "lily.evans@example.com",
    completedJobs: 1,
    totalJobs: 3,
  },
  {
    id: "00015",
    name: "James Carter",
    address: "707 Pine Boulevard Apt. 1515",
    phone: "09578901234",
    email: "james.carter@example.com",
    completedJobs: 25,
    totalJobs: 40,
  },
  {
    id: "00016",
    name: "Olivia Lewis",
    address: "808 Birch Street Suite 1616",
    phone: "09689012345",
    email: "olivia.lewis@example.com",
    completedJobs: 25,
    totalJobs: 36,
  },
  {
    id: "00017",
    name: "Henry Young",
    address: "909 Oak Avenue Apt. 1717",
    phone: "09790123456",
    email: "henry.young@example.com",
    completedJobs: 16,
    totalJobs: 42,
  },
  {
    id: "00018",
    name: "Isabella Wright",
    address: "1010 Cedar Lane Suite 1818",
    phone: "09801234567",
    email: "isabella.wright@example.com",
    completedJobs: 12,
    totalJobs: 17,
  },
  {
    id: "00019",
    name: "Alexander Hall",
    address: "111 Maple Street Apt. 1919",
    phone: "09912345678",
    email: "alexander.hall@example.com",
    completedJobs: 11,
    totalJobs: 16,
  },
  {
    id: "00020",
    name: "Sophia Adams",
    address: "222 Oak Boulevard Apt. 2020",
    phone: "09023456789",
    email: "sophia.adams@example.com",
    completedJobs: 3,
    totalJobs: 7,
  },
  {
    id: "00021",
    name: "Mason Harris",
    address: "333 Pine Avenue Suite 2121",
    phone: "09134567890",
    email: "mason.harris@example.com",
    completedJobs: 5,
    totalJobs: 6,
  },
  {
    id: "00022",
    name: "Charlotte King",
    address: "444 Birch Lane Apt. 2222",
    phone: "09245678901",
    email: "charlotte.king@example.com",
    completedJobs: 0,
    totalJobs: 1,
  },
  {
    id: "00023",
    name: "Benjamin Scott",
    address: "555 Maple Road Suite 2323",
    phone: "09356789012",
    email: "benjamin.scott@example.com",
    completedJobs: 2,
    totalJobs: 2,
  },
  {
    id: "00024",
    name: "Amelia Martin",
    address: "666 Oak Street Apt. 2424",
    phone: "09467890123",
    email: "amelia.martin@example.com",
    completedJobs: 5,
    totalJobs: 5,
  },
  {
    id: "00025",
    name: "Elijah Walker",
    address: "777 Pine Boulevard Suite 2525",
    phone: "09578901234",
    email: "elijah.walker@example.com",
    completedJobs: 12,
    totalJobs: 15,
  },
  {
    id: "00026",
    name: "Harper Robinson",
    address: "888 Birch Avenue Apt. 2626",
    phone: "09689012345",
    email: "harper.robinson@example.com",
    completedJobs: 25,
    totalJobs: 36,
  },
  {
    id: "00027",
    name: "Logan Perez",
    address: "999 Maple Lane Suite 2727",
    phone: "09790123456",
    email: "logan.perez@example.com",
    completedJobs: 0,
    totalJobs: 1,
  },
  {
    id: "00028",
    name: "Ava White",
    address: "1010 Oak Street Apt. 2828",
    phone: "09801234567",
    email: "ava.white@example.com",
    completedJobs: 5,
    totalJobs: 5,
  },
  {
    id: "00029",
    name: "Daniel Thompson",
    address: "1111 Cedar Road Suite 2929",
    phone: "09912345678",
    email: "daniel.thompson@example.com",
    completedJobs: 5,
    totalJobs: 9,
  },
  {
    id: "00030",
    name: "Mia Moore",
    address: "1234 Pine Lane Suite 3030",
    phone: "09023456789",
    email: "mia.moore@example.com",
    completedJobs: 25,
    totalJobs: 25,
  },
  {
    id: "00031",
    name: "Giang Phan",
    address: "1234 Pine Lane Suite 3030",
    phone: "09023456789",
    email: "mia.moore@example.com",
    completedJobs: 2,
    totalJobs: 2,
  },
];

const EmployeeTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Name");

  // Filter
  const applyFilter = (data: Employee[]) => {
    switch (filter) {
      case "Best Rating":
        return [...data].sort(
          (a, b) =>
            b.completedJobs / b.totalJobs - a.completedJobs / a.totalJobs
        );
      case "Worst Rating":
        return [...data].sort(
          (a, b) =>
            a.completedJobs / a.totalJobs - b.completedJobs / b.totalJobs
        );
      default:
        return data;
    }
  };

  // Search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredData = employeesData.filter((employee) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "Id") return employee.id.toLowerCase().includes(term);
    if (searchBy === "Name") return employee.name.toLowerCase().includes(term);
    if (searchBy === "Address")
      return employee.address.toLowerCase().includes(term);
    if (searchBy === "Phone")
      return employee.phone.toLowerCase().includes(term);
    if (searchBy === "Email")
      return employee.email?.toLowerCase().includes(term);
    return employee.name.toLowerCase().includes(term);
  });

  const finalData = applyFilter(filteredData);

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(finalData.length / itemsPerPage);
  const currentData = finalData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <>
      <SearhBarAndFilter
        setSearchTerm={handleSearch}
        setSearchBy={setSearchBy}
        onFilterChange={setFilter}
      />

      {/* title column */}
      <div className="flex w-full bg-[#f5f5f5] h-[48px] items-center mt-4 gap-3 p-2.5">
        {columns.map((col, index) => (
          <div
            key={index}
            className={`${col.className} text-left text-[#202224] text-sm font-Averta-Bold`}
          >
            {col.header}
          </div>
        ))}
      </div>

      {/* employee table */}
      <div className="flex overflow-hidden flex-col justify-center w-full max-md:max-w-full">
        {currentData.map((Employee: Employee, index: any) => (
          <EmployeeRow key={Employee.id} {...Employee} />
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

export default EmployeeTable;
