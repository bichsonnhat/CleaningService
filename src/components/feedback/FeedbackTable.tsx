"use client";
import React, { useEffect, useState } from "react";
import FeedbackRow from "./FeedbackRow";
import Pagination from "../employee/Pagination";
import SearchBarAndFilter from "./SearchBarAndFilter";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ClipLoader from "react-spinners/ClipLoader";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import QuickPopupFeedback from "../quickpopup/QuickPopupFeedback";

export type Feedback2 = {
  id: string;
  bookingId: string;
  reportedBy: boolean;
  helperRating: number;
  title: string;
  description?: string;
  created_at: string;
  updated_at: string;
  booking: {
    customer: {
      fullName: string;
    };
    helper: {
      user: {
        fullName: string;
      };
    };
  };
};

export enum Role {
  Admin = "Admin",
  Customer = "Customer",
  Helper = "Helper",
}

export default function FeedbackTable() {
  const { toast } = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Name");
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");

  const [toggleFeedback, setToggleFeedback] = useState(false);
  const toggleFeedbackPopup = () => {
    setToggleFeedback(!toggleFeedback);
  };

  const [feedbacks, setFeedbacks] = useState<Feedback2[] | null>(null);

  const fetchData = async (id: string, role: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/feedback?role=${role}&userId=${id}`
    );
    const data = await response.json();
    setFeedbacks(data);
    console.log("Feedback response: ", data);
  };

  const fetchUserInfo = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-info`);
    const data = await response.json();
    setUserId(data.userId);
    setRole(data.role);
  }

  useEffect(() => {
    fetchUserInfo();
    fetchData(userId, role);
  }, []);

  const columns = [
    {
      header: "",
      className: "w-[50px] flex-[1] hidden md:table-cell",
    },
    {
      header: "CUSTOMER",
      className: "w-[130px] flex-[3] hidden md:table-cell ",
    }, // Ít thông tin, không cần rộng
    {
      header: "SENTIMENT",
      className: "w-[250px] flex-[3] hidden md:table-cell text-center",
    }, // Thông tin thường dài, cần rộng hơn
    {
      header: "TITLE",
      className: "w-[130px] flex-[10] hidden md:table-cell ",
    }, // Số liệu ngắn, đủ hẹp
    {
      header: "DATE",
      className: "w-[120px] flex-[3] hidden md:table-cell text-center",
    },
  ];

  // filter
  const applyFilter = (data: any) => {
    switch (filter) {
      case "Newest":
        return [...data].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
      case "Oldest":
        return [...data].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateA - dateB;
        });
      default:
        return data;
    }
  };

  // search by
  const filteredData = !feedbacks
    ? []
    : feedbacks.filter((Feedback) => {
        switch (searchBy) {
          case "Customer":
            return Feedback.booking.customer.fullName
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          case "Message":
            return Feedback.title
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          case "Date":
            return Feedback.created_at
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          default:
            return Feedback.booking.customer.fullName
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
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

  const handleCheckboxToggle = (id: string, isChecked: boolean) => {
    setCheckedRows((prevCheckedRows) =>
      isChecked
        ? [...prevCheckedRows, id]
        : prevCheckedRows.filter((rowId) => rowId !== id)
    );
  };

  const handleDeleteFeedback = async () => {
    if (checkedRows.length === 0) {
      toast({
        variant: "destructive",
        title: "Please select feedback to delete",
      });
      //console.log("Please select feedback to delete");
    } else {
      try {
        setDeleting(true);
        await Promise.all(
          checkedRows.map((id) => {
            return fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/feedback/${id}`,
              {
                method: "DELETE",
              }
            );
          })
        );
        toast({ title: "Delete feedback successfully!" });
        setFeedbacks((prev) =>
          (prev || []).filter((feedback) => !checkedRows.includes(feedback.id))
        );
        setCheckedRows([]);
        console.log("Delete feedback successfully!");
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to delete some feedback",
        });
        console.error(error);
      } finally {
        setDeleting(false);
      }
    }
  };

  if (!feedbacks)
    return (
      <div className="flex justify-center items-center w-full h-[500px]">
        <ClipLoader color="#2A88F5" loading={true} size={30} />
      </div>
    );

  return (
    <>
      <div className="flex flex-wrap flex-row gap-2 justify-between items-center">
        <SearchBarAndFilter
          setSearchTerm={setSearchTerm}
          setSearchBy={setSearchBy}
          onFilterChange={setFilter}
        />
        <div className="flex flex-row justify-start items-start gap-4 max-xl:w-full">
          {role === "customer" ? (
            <Button
              onClick={toggleFeedbackPopup}
              className="flex flex-row gap-2 items-center justify-center px-4 h-[38px] bg-[#1b78f2] hover:bg-opacity-90 rounded-[8px] text-xs font-Averta-Bold tracking-normal leading-loose whitespace-nowrap text-center text-white"
            >
              <Image
                src="/images/Dashboard/Feedback/Trash.svg"
                alt=""
                width={18}
                height={18}
              />
              Create feedback
            </Button>
          ) : (
            <></>
          )}

          <AlertDialog>
            <AlertDialogTrigger>
              {deleting ? (
                <div className="flex flex-row gap-2 items-center justify-center px-4 lg:px-10 h-[38px] bg-[#E11B1B] hover:bg-opacity-90 rounded-[8px] text-xs font-Averta-Bold tracking-normal leading-loose whitespace-nowrap text-center text-white">
                  <ClipLoader color="#fff" loading={true} size={30} />
                </div>
              ) : (
                <div className="flex flex-row gap-2 items-center justify-center px-4 lg:px-10 h-[38px] bg-[#E11B1B] hover:bg-opacity-90 rounded-[8px] text-xs font-Averta-Bold tracking-normal leading-loose whitespace-nowrap text-center text-white">
                  <Image
                    src="/images/Dashboard/Feedback/Trash.svg"
                    alt=""
                    width={18}
                    height={18}
                  />
                  Delete
                </div>
              )}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This action will delete the
                  feedback permanently.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <button
                    onClick={() => handleDeleteFeedback()}
                    className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="flex flex-col justify-center mt-3.5 w-full bg-white rounded ">
        <div className="lg:flex hidden gap-3 w-full bg-[#f5f5f5] h-[48px] items-center p-2.5 ">
          {columns.map((col, index) => (
            <div
              key={index}
              className={`${col.className} text-left text-[#202224] text-sm font-Averta-Bold`}
            >
              {col.header}
            </div>
          ))}
        </div>
        <div className="flex flex-col w-full rounded ">
          <div className="flex overflow-hidden flex-col justify-center w-full rounded bg-neutral-700 ">
            {feedbacks == null || feedbacks.length === 0 ? (
              <div className="flex justify-center items-center w-full bg-white">
                {role == "admin"
                  ? "We have no feedback"
                  : "This customer has no feedback"}
              </div>
            ) : (
              currentData.map((feedback: Feedback2, index: any) => (
                <FeedbackRow
                  key={feedback.id}
                  feedback={feedback}
                  onCheckboxToggle={handleCheckboxToggle}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {toggleFeedback && (
        <QuickPopupFeedback
          toggle={toggleFeedbackPopup}
          mutate={fetchData}
          defaultBookingId={null}
        />
      )}
    </>
  );
}
