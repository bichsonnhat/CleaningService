"use client";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  totalPages,
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * 5 + 1;
  const endItem = Math.min(currentPage * 5, totalItems);

  return (
    <div className="flex flex-wrap gap-10 justify-between items-center mt-3.5 w-full max-md:max-w-full">
      <div className="self-stretch my-auto text-sm font-Averta-Regular text-[#202224] opacity-60">
        {totalItems === 0
          ? "Showing 0 items"
          : startItem === endItem
          ? `Showing ${startItem} of ${totalItems} items`
          : `Showing ${startItem} - ${endItem} of ${totalItems} items`}
      </div>
      <div className="flex justify-center items-center self-stretch my-auto min-h-[38px]">
        <div className="flex border border-[#D5D5D5] rounded-lg">
          <button
            className="w-[38px] h-[38px] flex items-center justify-center"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 text-[#202224] ${
                currentPage === 1
                  ? "opacity-60"
                  : "opacity-90 hover:text-[#1b78f2]"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="w-[0.5px] h-[24px] bg-[#979797] self-center"></div>

          <button
            className="w-[38px] h-[38px] flex items-center justify-center"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 text-[#202224]  ${
                currentPage === totalPages
                  ? "opacity-60"
                  : "opacity-90 hover:text-[#1b78f2]"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
