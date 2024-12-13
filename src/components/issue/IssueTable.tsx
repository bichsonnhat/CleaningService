import React, { useEffect, useState } from "react";
import Pagination from "../employee/Pagination";
import SearchBarAndFilter from "./SearchBarAndFilter";
import IssueRow from "./IssueRow";
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
import { Feedback2 } from "../feedback/FeedbackTable";
import ClipLoader from "react-spinners/ClipLoader";
import { useToast } from "@/hooks/use-toast";

export default function IssueTable() {
  const role = "Admin";
  const userId = "0066dc01-cdd4-4243-9f4e-778bcfa4458f";
  const { toast } = useToast();

  const [issueData2, setIssueData2] = useState<Feedback2[] | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/feedback?role=${role}&userId=${userId}&reportedBy=true`
      );
      const data = await response.json();
      console.log("Issue: ", data);
      setIssueData2(data);
    };

    fetchFeedback();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Helper");

  const [deleting, setDeleting] = useState(false);
  const [checkedRows, setCheckedRows] = useState<string[]>([]);

  const columns = [
    {
      header: "",
      className: "w-[50px] flex-[1] hidden md:table-cell",
    },
    {
      header: "HELPER",
      className: "w-[130px] flex-[3] hidden md:table-cell ",
    }, // Thông tin thường dài, cần rộng hơn
    {
      header: "TITLE",
      className: "w-[130px] flex-[10] hidden md:table-cell ",
    }, // Số liệu ngắn, đủ hẹp
    {
      header: "DATE",
      className: "w-[120px] flex-[3] hidden md:table-cell text-start",
    },
  ];

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
  const filteredData = issueData2
    ? issueData2.filter((Issue) => {
        switch (searchBy) {
          case "Helper":
            return Issue.booking.helper.user.fullName
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          default:
            return Issue.booking.helper.user.fullName
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

  const handleCheckboxToggle = (id: string, isChecked: boolean) => {
    setCheckedRows((prevCheckedRows) =>
      isChecked
        ? [...prevCheckedRows, id]
        : prevCheckedRows.filter((rowId) => rowId !== id)
    );
  };

  const handleDeleteIssue = async () => {
    if (checkedRows.length === 0) {
      toast({
        variant: "destructive",
        title: "Please select issue to delete",
      });
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
        toast({ title: "Delete issue successfully!" });
        setIssueData2((prev) =>
          (prev || []).filter((issue) => !checkedRows.includes(issue.id))
        );
        setCheckedRows([]);
        console.log("Delete issue successfully!");
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to delete some issue",
        });
        console.error(error);
      } finally {
        setDeleting(false);
      }
    }
  };

  if (!issueData2)
    return (
      <div className="flex justify-center items-center w-full h-[500px]">
        <ClipLoader color="#2A88F5" loading={true} size={30} />
      </div>
    );

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-4">
        <SearchBarAndFilter
          setSearchTerm={setSearchTerm}
          setSearchBy={setSearchBy}
          onFilterChange={setFilter}
        />
        <div className="flex gap-2">
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
                    onClick={() => handleDeleteIssue()}
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
        <div className="flex flex-col w-full rounded max-md:max-w-full">
          <div className="flex overflow-hidden flex-col justify-center w-full rounded bg-neutral-700 max-md:max-w-full">
            {issueData2.length === 0 ? (
              <div className="flex justify-center items-center w-full bg-white">
                <p className="text-lg font-Averta-Semibold text-neutral-900">
                  We have no issue
                </p>
              </div>
            ) : (
              currentData.map((issue: Feedback2) => (
                <IssueRow
                  key={issue.id}
                  issueData={issue}
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
    </>
  );
}
