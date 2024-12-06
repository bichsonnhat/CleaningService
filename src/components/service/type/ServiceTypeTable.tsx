"use client";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import SearchBarAndFilter from "./SearchBarAndFilter";
import { useQuery } from "@tanstack/react-query";
import { UpdateServiceTypePopup } from "@/components/popup/UpdateServiceTypePopup";
import ServiceTypeRow from "./ServiceTypeRow";

const columns = [
  { header: "NAME", className: "w-[210px] hidden xl:table-cell" },
  { header: "DESCRIPTION", className: "w-[600px] hidden xl:table-cell" },
  { header: "SERVICE CATEGORY", className: "w-[210px] hidden xl:table-cell" },
  { header: "BASE PRICE", className: "w-[150px] hidden xl:table-cell" },
];

const CategoryServicesData: ServiceType[] = [
  {
    id: "1",
    name: "Number of Bedroom",
    categoryId: "1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam leo sapien, eleifend a orci.",
    basePrice: 50,
    category: {
      name: "Home Cleaning",
    },
  },
  {
    id: "2",
    categoryId: "1",
    name: "Number of Bathroom",
    description:
      "Interdum et malesuada fames ac ante ipsum primis in faucibus. In pulvinar maximus urna.",
    basePrice: 50,
    category: {
      name: "Home Cleaning",
    },
  },
  {
    id: "3",
    categoryId: "1",
    name: "Clean Type",
    description:
      "In finibus ullamcorper ultricies. Nam scelerisque tellus in quam dictum sollicitudin.",
    basePrice: 50,
    category: {
      name: "Home Cleaning",
    },
  },
  {
    id: "4",
    categoryId: "1",
    name: "Service Details",
    description:
      "In finibus ullamcorper ultricies. Nam scelerisque tellus in quam dictum sollicitudin.",
    basePrice: 50,
    category: {
      name: "Home Cleaning",
    },
  },
  {
    id: "5",
    categoryId: "1",
    name: "For How Long",
    description:
      "Vivamus nec nisl vitae erat sollicitudin porta vitae ut purus. Pellentesque habitant morbi tristique.",
    basePrice: 50,
    category: {
      name: "Home Cleaning",
    },
  },
];

const ServiceTypeTable = () => {
  const url = "http://localhost:3000/api/service-types";

  const fetchData = async (): Promise<ServiceType[]> => {
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

  const [selectedServiceTypeId, setSelectedServiceTypeId] = useState<
    string | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Name");

  const { data, isLoading, error } = useQuery({
    queryKey: ["serviceTypes"],
    queryFn: fetchData,
  });

  const applyFilter = (data: ServiceType[]) => {
    if (filter === "Home Cleaning" || filter === "Other Services") {
      return data.filter((detail) => detail.category?.name === filter);
    }
    return data;
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredData = (data ?? []).filter((detail) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "Name") return detail.name.toLowerCase().includes(term);
    if (searchBy === "Description")
      return detail.description?.toLowerCase().includes(term);
    if (searchBy === "Price") return detail.basePrice.toString().includes(term);
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
    setSelectedServiceTypeId(id);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <>
      <SearchBarAndFilter
        setSearchTerm={handleSearch}
        setSearchBy={setSearchBy}
        onFilterChange={setFilter}
      />

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
        {currentData.map((detail: ServiceType, index: any) => (
          <ServiceTypeRow
            key={detail.id}
            {...detail}
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
      <UpdateServiceTypePopup
        id={selectedServiceTypeId}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};
export default ServiceTypeTable;
