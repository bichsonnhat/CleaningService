"use client";
import React, { useState } from "react";
import Pagination from "./Pagination";
import SearchBarAndFilter from "./SearchBarAndFilter";
import CategoryServiceRow from "./CategoryServiceRow";
type CategoryService = {
  id: string;
  name: string;
  description?: string;
  serviceType: "Home Cleaning" | "Other Services";
  basePrice: number;
};
const columns = [
  { header: "NAME", className: "w-[210px] hidden xl:table-cell" },
  { header: "DESCRIPTION", className: "w-[600px] hidden xl:table-cell" },
  { header: "SERVICE TYPE", className: "w-[210px] hidden xl:table-cell" },
  { header: "BASE PRICE", className: "w-[150px] hidden xl:table-cell" },
];
const CategoryServicesData: CategoryService[] = [
  {
    id: "1",
    name: "Number of Bedroom",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam leo sapien, eleifend a orci.",
    serviceType: "Home Cleaning",
    basePrice: 50,
  },
  {
    id: "2",
    name: "Number of Bathroom",
    description:
      "Interdum et malesuada fames ac ante ipsum primis in faucibus. In pulvinar maximus urna.",
    serviceType: "Home Cleaning",
    basePrice: 50,
  },
  {
    id: "3",
    name: "Clean Type",
    description:
      "In finibus ullamcorper ultricies. Nam scelerisque tellus in quam dictum sollicitudin.",
    serviceType: "Home Cleaning",
    basePrice: 50,
  },
  {
    id: "4",
    name: "Service Details",
    description:
      "In finibus ullamcorper ultricies. Nam scelerisque tellus in quam dictum sollicitudin.",
    serviceType: "Other Services",
    basePrice: 50,
  },
  {
    id: "5",
    name: "For How Long",
    description:
      "Vivamus nec nisl vitae erat sollicitudin porta vitae ut purus. Pellentesque habitant morbi tristique.",
    serviceType: "Other Services",
    basePrice: 50,
  },
];
const CategoryServiceTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Name");
  // Filter
  const applyFilter = (data: CategoryService[]) => {
    if (filter === "Home Cleaning" || filter === "Other Services") {
      return data.filter((detail) => detail.serviceType === filter);
    }
    return data;
  };
  // Search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  const filteredData = CategoryServicesData.filter((detail) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "Name") return detail.name.toLowerCase().includes(term);
    if (searchBy === "Description")
      return detail.description?.toLowerCase().includes(term);
    if (searchBy === "Price") return detail.basePrice.toString().includes(term);
    return true;
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
      <SearchBarAndFilter
        setSearchTerm={handleSearch}
        setSearchBy={setSearchBy}
        onFilterChange={setFilter}
      />
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
      <div className="flex overflow-hidden flex-col justify-center w-full max-md:max-w-full">
        {currentData.map((detail: CategoryService, index: any) => (
          <CategoryServiceRow key={detail.id} {...detail} />
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
export default CategoryServiceTable;
