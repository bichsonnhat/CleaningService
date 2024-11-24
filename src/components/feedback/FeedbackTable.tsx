import React, { useState } from "react";
import FeedbackRow from "./FeedbackRow";
import Pagination from "../employee/Pagination";
import SearchBarAndFilter from "./SearchBarAndFilter";

export type Feedback = {
  id: number;
  name: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  message: string;
  date: string;
};

const feedbackData: Feedback[] = [
  {
    id: 1,
    name: "Jullu Jalal",
    sentiment: "Positive" as "Positive",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 2,
    name: "Jullu Jalal",
    sentiment: "Positive" as "Positive",
    message: "Free Classifieds Using Them To Promote Your Stuff Online",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 3,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Vacation Home Rental Success",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 4,
    name: "Jullu Jalal",
    sentiment: "Neutral" as "Neutral",
    message: "Enhance Your Brand Potential With Giant Advertising Blimps",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 5,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Always Look On The Bright Side Of Life",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 6,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 7,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 8,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 9,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 10,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 11,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 12,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 13,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 14,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 15,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 16,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 17,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 18,
    name: "Jullu Jalal",
    sentiment: "Positive" as "Positive",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 19,
    name: "Jullu Jalal",
    sentiment: "Positive" as "Positive",
    message: "Free Classifieds Using Them To Promote Your Stuff Online",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 20,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Vacation Home Rental Success",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 21,
    name: "Jullu Jalal",
    sentiment: "Neutral" as "Neutral",
    message: "Enhance Your Brand Potential With Giant Advertising Blimps",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 22,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Always Look On The Bright Side Of Life",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 23,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 24,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 25,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 26,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
  {
    id: 27,
    name: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    date: "OCT 15 - 8:13 AM",
  },
];

export default function FeedbackTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Name");

  // filter
  const applyFilter = (data: any) => {
    switch (filter) {
      case "Name":
        return [...data].sort(
          (a, b) =>
            b.completedJobs / b.totalJobs - a.completedJobs / a.totalJobs
        );
      case "Status":
        return [...data].sort(
          (a, b) =>
            a.completedJobs / a.totalJobs - b.completedJobs / b.totalJobs
        );
      case "Date":
        return [...data].sort(
          (a, b) =>
            a.completedJobs / a.totalJobs - b.completedJobs / b.totalJobs
        );
      default:
        return data;
    }
  };

  // search by
  const filteredData = feedbackData.filter((Feedback) => {
    switch (searchBy) {
      case "Name":
        return Feedback.name.toLowerCase().includes(searchTerm.toLowerCase());
      case "Sentiment":
        const check = Feedback.sentiment
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        console.log(check);
        return Feedback.sentiment
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      case "Message":
        return Feedback.message
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      case "Date":
        return Feedback.date.toLowerCase().includes(searchTerm.toLowerCase());
      default:
        return Feedback.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  const finalData = applyFilter(filteredData);

  // pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
        setSearchTerm={setSearchTerm}
        setSearchBy={setSearchBy}
        onFilterChange={setFilter}
      />

      <div className="flex flex-col justify-center mt-3.5 w-full bg-white rounded max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col w-full rounded max-md:max-w-full">
          <div className="flex overflow-hidden flex-col justify-center w-full rounded bg-neutral-700 max-md:max-w-full">
            {currentData.map((feedback: Feedback, index: any) => (
              <FeedbackRow key={feedback.id} {...feedback} />
            ))}
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
