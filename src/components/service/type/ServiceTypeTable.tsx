"use client";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Pagination from "./Pagination";
import SearchBarAndFilter from "./SearchBarAndFilter";
import { UpdateServiceTypePopup } from "@/components/popup/UpdateServiceTypePopup";
import ServiceTypeRow from "./ServiceTypeRow";
import { CreateServiceTypePopup } from "@/components/popup/CreateServiceTypePopup";
import { Button } from "@/components/ui/button";

const columns = [
  { header: "", className: "w-[48px] hidden xl:table-cell" },
  { header: "NAME", className: "w-[210px] hidden xl:table-cell" },
  { header: "DESCRIPTION", className: "w-[552px] hidden xl:table-cell" },
  { header: "SERVICE CATEGORY", className: "w-[210px] hidden xl:table-cell" },
  { header: "BASE PRICE", className: "w-[150px] hidden xl:table-cell" },
];

const ServiceTypesData: ServiceType[] = [
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
  const queryClient = useQueryClient();

  const url = "http://localhost:3000/api/service-types";
  const deleteServiceTypesUrl = "http://localhost:3000/api/service-detail";

  const [selectedServiceTypeId, setSelectedServiceTypeId] = useState<
    string | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Name");

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
  const { data, isLoading } = useQuery({
    queryKey: ["serviceTypes"],
    queryFn: fetchData,
  });

  const deleteServiceTypes = async (id: string) => {
    try {
      const response = await fetch(`${deleteServiceTypesUrl}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error deleting data:", error);
      return [];
    }
  };
  const deteleMutation = useMutation({
    mutationFn: (id: string) => deleteServiceTypes(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceTypes"] });
    },
  });

  const applyFilter = (data: ServiceType[]) => {
    if (filter === "Base Price ↑") {
      return [...data].sort((a, b) => a.basePrice - b.basePrice);
    }
    if (filter === "Base Price ↓") {
      return [...data].sort((a, b) => b.basePrice - a.basePrice);
    }
    return data;
  };
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };
  const handleCheckboxToggle = (id: string, isChecked: boolean) => {
    setCheckedRows((prevCheckedRows) =>
      isChecked
        ? [...prevCheckedRows, id]
        : prevCheckedRows.filter((rowId) => rowId !== id)
    );
    console.log(checkedRows);
  };
  const handleRowClick = (id: string) => {
    setSelectedServiceTypeId(id);
    setIsDialogOpen(true);
  };
  const handleDeleteButtonClick = async () => {
    try {
      for (const id of checkedRows) {
        await deteleMutation.mutateAsync(id);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const itemsPerPage = 10;

  const filteredData = (data ?? ServiceTypesData).filter((detail) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "Name") return detail.name.toLowerCase().includes(term);
    if (searchBy === "Description")
      return detail.description?.toLowerCase().includes(term);
    if (searchBy === "Category")
      return detail.category?.name.toLowerCase().includes(term);
    return true;
  });
  const finalData = applyFilter(filteredData);
  const currentData = finalData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(finalData.length / itemsPerPage);

  return (
    <>
      <div className="flex flex-wrap w-full justify-between">
        <SearchBarAndFilter
          setSearchTerm={handleSearch}
          setSearchBy={setSearchBy}
          onFilterChange={setFilter}
        />
        <div className="flex justify-center items-center gap-1 mt-1 lg:mt-0">
          <CreateServiceTypePopup></CreateServiceTypePopup>
          <Button
            className="px-7 h-[38px] hover:bg-opacity-90 rounded-[8px] font-Averta-Bold tracking-normal leading-loose text-center text-white"
            variant={"destructive"}
            disabled={checkedRows.length === 0}
            onClick={handleDeleteButtonClick}
          >
            Delete
          </Button>
        </div>
      </div>
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
            onCheckboxToggle={handleCheckboxToggle}
            isLoading={isLoading}
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
