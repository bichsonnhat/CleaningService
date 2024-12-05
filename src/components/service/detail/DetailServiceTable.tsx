"use client";

import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import SearchBarAndFilter from "./SearchBarAndFilter";
import DetailServiceRow from "./DetailServiceRow";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { UpdateServiceDetailPopup } from "@/components/popup/UpdateServiceDetailPopup";
import { set } from "zod";

const columns = [
  { header: "TYPE", className: "w-[210px] hidden md:table-cell" },
  { header: "TITLE", className: "w-[350px] hidden md:table-cell" },
  { header: "ADDITIONAL PRICE", className: "w-[300px] hidden md:table-cell" },
  { header: "MULTIPLY PRICE", className: "w-[300px] hidden md:table-cell" },
];

const DetailServicesData: ServiceDetail[] = [
  {
    id: "1",
    serviceTypeId: "Number of Bedroom",
    title: 1,
    additionalPrice: 0,
    multiplyPrice: 1,
    serviceType: {
      name: "Cleaning",
    },
  },
  {
    id: "2",
    serviceTypeId: "Number of Bedroom",
    title: 1,
    additionalPrice: 0,
    multiplyPrice: 1,
    serviceType: {
      name: "Cleaning",
    },
  },
  {
    id: "3",
    serviceTypeId: "Number of Bedroom",
    title: 1,
    additionalPrice: 0,
    multiplyPrice: 1,
    serviceType: {
      name: "Cleaning",
    },
  },
  {
    id: "4",
    serviceTypeId: "Number of Bedroom",
    title: 1,
    additionalPrice: 0,
    multiplyPrice: 1,
    serviceType: {
      name: "Cleaning",
    },
  },
  {
    id: "5",
    serviceTypeId: "Number of Bedroom",
    title: 1,
    additionalPrice: 0,
    multiplyPrice: 1,
    serviceType: {
      name: "Cleaning",
    },
  },
];

const DetailServiceTable = () => {
  const [selectedServiceDetailId, setSelectedServiceDetailId] = useState<
    string | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const url = "http://localhost:3000/api/service-detail";

  const fetchData = async (): Promise<ServiceDetail[]> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["serviceDetails"],
    queryFn: fetchData,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Category");

  const applyFilter = (data: ServiceDetail[]) => {
    if (filter === "+ Price: Low to High") {
      return [...data].sort((a, b) => a.additionalPrice - b.additionalPrice);
    }
    if (filter === "+ Price: High to Low") {
      return [...data].sort((a, b) => b.additionalPrice - a.additionalPrice);
    }
    if (filter === "+ Price: Low to High") {
      return [...data].sort((a, b) => a.multiplyPrice - b.multiplyPrice);
    }
    if (filter === "x Price: High to Low") {
      return [...data].sort((a, b) => b.multiplyPrice - a.multiplyPrice);
    }
    return data;
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredData = (data ?? []).filter((category) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "Type")
      return category.serviceType?.name.toLowerCase().includes(term);
    if (searchBy === "Multiply Price")
      return category.multiplyPrice.toString().includes(term);
    if (searchBy === "Additional Price")
      return category.additionalPrice.toString().includes(term);
    return true;
  });

  const finalData = applyFilter(filteredData);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(finalData.length / itemsPerPage);

  const currentData = finalData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  const handleRowClick = (id: string) => {
    setSelectedServiceDetailId(id);
    setIsDialogOpen(true);
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
        {currentData.map((category: ServiceDetail, index: any) => (
          <DetailServiceRow
            key={category.id}
            {...category}
            onRowClick={handleRowClick}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <UpdateServiceDetailPopup
        id={selectedServiceDetailId}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default DetailServiceTable;
