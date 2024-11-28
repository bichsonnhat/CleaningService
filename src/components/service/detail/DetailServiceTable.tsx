"use client";
import React, { useState } from "react";
import Pagination from "./Pagination";
import SearchBarAndFilter from "./SearchBarAndFilter";
import DetailServiceRow from "./DetailServiceRow";
type DetailService = {
  id: string;
  category: string;
  value: number;
  description?: string;
  basePrice: number;
};

const columns = [
  { header: "CATEGORY", className: "w-[210px] hidden md:table-cell" },
  { header: "VALUE", className: "w-[160px] hidden md:table-cell" },
  { header: "DESCRIPTION", className: "w-[640px] hidden md:table-cell" },
  { header: "BASE PRICE", className: "w-[150px] hidden md:table-cell" },
];

const DetailServicesData: DetailService[] = [
  {
    id: "1",
    category: "Number of Bedroom",
    value: 1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam leo sapien, eleifend a orci posuere, ti",
    basePrice: 40,
  },
  {
    id: "2",
    category: "Number of Bedroom",
    value: 2,
    description:
      "In finibus ullamcorper ultricies. Nam scelerisque tellus in quam dictum sollicitudin. Etiam scelerisque",
    basePrice: 55,
  },
  {
    id: "3",
    category: "Number of Bedroom",
    value: 3,
    description:
      "Interdum et malesuada fames ac ante ipsum primis in faucibus. In pulvinar maximus urna, non eleme",
    basePrice: 45,
  },
  {
    id: "4",
    category: "Number of Bedroom",
    value: 4,
    description:
      "Vivamus nec nisl vitae erat sollicitudin porta vitae ut purus. Pellentesque habitant morbi tristique sen",
    basePrice: 50,
  },
  {
    id: "5",
    category: "Number of Bedroom",
    value: 5,
    description:
      "In finibus ullamcorper ultricies. Nam scelerisque tellus in quam dictum sollicitudin. Etiam scelerisque",
    basePrice: 50,
  },
];

const DetailServiceTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Category");

  // Filter
  const applyFilter = (data: DetailService[]) => {
    if (filter === "Price: Low to High") {
      return [...data].sort((a, b) => a.basePrice - b.basePrice);
    }
    if (filter === "Price: High to Low") {
      return [...data].sort((a, b) => b.basePrice - a.basePrice);
    }

    return data;
  };

  // Search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredData = DetailServicesData.filter((category) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "Category")
      return category.category.toLowerCase().includes(term);
    if (searchBy === "Description")
      return category.description?.toLowerCase().includes(term);
    if (searchBy === "Value") return category.value.toString().includes(term);
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
      <div className="xl:flex gap-3 w-full hidden bg-[#f5f5f5] h-[48px] items-center mt-4 p-2.5">
        {columns.map((col, index) => (
          <div
            key={index}
            className={`${col.className} text-left text-[#202224] text-sm font-Averta-Bold`}
          >
            {col.header}
          </div>
        ))}
      </div>
      <div className="flex overflow-hidden flex-col max-xl:mt-4 rounded-lg justify-center w-full max-md:max-w-full">
        {currentData.map((category: DetailService, index: any) => (
          <DetailServiceRow key={category.id} {...category} />
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
export default DetailServiceTable;
