"use client";
import React, { useState } from "react";
import RefundRow from "./RefundRow";
import Pagination from "../employee/Pagination";
import SearchBarAndFilter from "./SearchBarAndFilter";
import Image from "next/image";
import { useEffect } from "react";
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
import { Role } from "../feedback/FeedbackTable";
import QuickPopupReturn from "../quickpopup/QuickPopupReturn";

export type Refund = {
  id: string;
  booking_id: string;
  requested_by: boolean;
  reason: string;
  status: string;
  created_at: string;
  resolved_at: string;
  booking: {
    customer: {
      fullName: string;
    };
  };
};

export default function RefundTable() {
  const role = Role.Admin;
  const userId = "799a5f8f-1f54-4a15-b0c1-9099469f1128";
  const { toast } = useToast();

  const [refunds, setRefunds] = useState<Refund[] | null>(null);
  const fetchRefund = async () => {
    const response = await fetch(`/api/refunds?role=${role}&userId=${userId}`);
    const data = await response.json();
    console.log("Refunds: ", data);
    setRefunds(data);
  };
  useEffect(() => {
    fetchRefund();
  }, []);

  const [toggleRefund, setToggleRefund] = useState(false);
  const toggleRefundPopup = () => {
    setToggleRefund(!toggleRefund);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Name");
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);
  // filter
  const applyFilter = (data: any) => {
    switch (filter) {
      case "Newest":
        return [...data].sort((a, b) => {
          const dateA = new Date(a.createAt);
          const dateB = new Date(b.createAt);
          return dateB.getTime() - dateA.getTime();
        });
      case "Oldest":
        return [...data].sort((a, b) => {
          const dateA = new Date(a.createAt);
          const dateB = new Date(b.createAt);
          return dateA.getTime() - dateB.getTime();
        });
      default:
        return data;
    }
  };
  // search by
  const filteredData =
    refunds && Array.isArray(refunds)
      ? refunds.filter((Refund) => {
          switch (searchBy) {
            case "Customer":
              return Refund.booking.customer.fullName
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            case "Status":
              return Refund.status
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            // case "Reason":
            //     return Refund.reason.toLowerCase().includes(searchTerm.toLowerCase());
            default:
              return Refund.booking.customer.fullName
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
          }
        })
      : [];
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
  const handleDeleteRefund = async () => {
    if (checkedRows.length === 0) {
      toast({
        variant: "destructive",
        title: "Please select refund to delete",
      });
      //console.log("Please select feedback to delete");
    } else {
      try {
        setDeleting(true);
        await Promise.all(
          checkedRows.map((id) => {
            return fetch(`/api/refunds/${id}`, {
              method: "DELETE",
            });
          })
        );
        toast({ title: "Delete refund successfully!" });
        setRefunds((prev) =>
          (prev || []).filter((refund) => !checkedRows.includes(refund.id))
        );
        setCheckedRows([]);
        console.log("Delete refund successfully!");
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to delete some refund",
        });
        console.error(error);
      } finally {
        setDeleting(false);
      }
    }
  };

  const handleCheckboxToggle = (id: string, isChecked: boolean) => {
    setCheckedRows((prevCheckedRows) =>
      isChecked
        ? [...prevCheckedRows, id]
        : prevCheckedRows.filter((rowId) => rowId !== id)
    );
  };

  if (!refunds)
    return (
      <div className="flex justify-center items-center w-full h-[500px]">
        <ClipLoader color="#2A88F5" loading={true} size={30} />
      </div>
    );
  return (
    <>
      <div className="flex flex-col gap-2 xl:flex-row justify-start xl:justify-between items-center">
        <SearchBarAndFilter
          setSearchTerm={setSearchTerm}
          setSearchBy={setSearchBy}
          onFilterChange={setFilter}
        />
        <div className="flex flex-row justify-start items-start gap-4 max-xl:w-full">
          <button
            onClick={toggleRefundPopup}
            className="flex flex-row gap-2 items-center justify-center px-8 h-[38px] bg-[#1b78f2] hover:bg-opacity-90 rounded-[8px] text-xs font-Averta-Bold tracking-normal leading-loose whitespace-nowrap text-center text-white"
          >
            <Image
              src="/images/icons/outline_plus.svg"
              alt=""
              width={18}
              height={18}
            />
            Create Refund
          </button>
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
                  refund request.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <button
                    onClick={() => handleDeleteRefund()}
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
      <div className="flex flex-col justify-center mt-3.5 w-full bg-white rounded max-md:max-w-full">
        <div className="flex flex-col w-full rounded max-md:max-w-full">
          <div className="flex overflow-hidden flex-col justify-center w-full rounded bg-neutral-700 max-md:max-w-full">
            {Array.isArray(refunds) && refunds.length > 0 ? (
              currentData.map((refund: Refund) => (
                <RefundRow
                  key={refund.id}
                  refund={refund}
                  onCheckboxToggle={handleCheckboxToggle}
                />
              ))
            ) : (
              <div className="flex justify-center items-center w-full bg-white">
                <p className="text-lg font-Averta-Semibold text-neutral-900">
                  {role == Role.Admin
                    ? "We have no refund request"
                    : "There are no refund request"}
                </p>
              </div>
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
      {toggleRefund && (
        <QuickPopupReturn
          toggle={toggleRefundPopup}
          mutate={fetchRefund}
          defaultBookingId={null}
        />
      )}
    </>
  );
}
