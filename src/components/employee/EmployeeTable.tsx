"use client";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import SearhBarAndFilter from "./SearchBarAndFilter";
import EmployeeRow from "./EmployeeRow";

type Employee = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  averageRating: string;
  completedJobs: number;
  totalJobs: number;
};

const columns = [
  { header: "ID", className: "w-[130px] hidden md:table-cell" },
  { header: "NAME", className: "w-[170px] hidden md:table-cell" },
  { header: "ADDRESS", className: "w-[300px] hidden md:table-cell" },
  { header: "EVALUATE", className: "w-[182px] hidden md:table-cell " },
  { header: "PHONE", className: "w-[130px] hidden md:table-cell" },
  { header: "EMAIL", className: "w-[220px] hidden md:table-cell" },
];

const EmployeeTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Name");

  const [employeesData, setEmployeesData] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/helpers");
        if (response.ok) {
          const helpers = await response.json();
          console.log("HELPERS RESPONSE: ", helpers);
          const employees = helpers.map((helper: any) => {
            if (!helper || !helper.user) {
              console.error("Invalid helper data: ", helper);
              return null; // hoặc xử lý giá trị mặc định
            }

            return {
              id: helper.id,
              name: helper.user.fullName || "Unknown",
              address: helper.user.address || "Unknown",
              phone: helper.user.phoneNumber || "Unknown",
              email: helper.user.email || undefined,
              averageRating: helper.averageRating || "0",
              completedJobs: helper.completedJobs || 0,
              totalJobs:
                (helper.completedJobs || 0) + (helper.cancelledJobs || 0),
            };
          });

          setEmployeesData(employees);

          console.log("EMPLOYEE RESPONSE: ", employees);
        } else {
          console.error("Failed to fetch data: ", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEmployees();
  }, []);

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
      <div className="flex flex-wrap w-full bg-[#f5f5f5] h-[48px] items-center mt-4 gap-3 p-2.5">
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
      <div className="mt-4 flex overflow-hidden flex-col justify-center w-full max-md:max-w-full">
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
