import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface QuickPopupAdminProps {
  toggle: () => void;
  mutate: (id: string, role: string) => void;
}
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { CreateFeedbackDto } from "@/app/(api)/(routes)/api/feedback/feedback.schema";
import { Feedback2 } from "../feedback/FeedbackTable";
import { useRouter } from "next/navigation";

const QuickPopupFeedback: React.FC<QuickPopupAdminProps> = ({
  toggle,
  mutate,
}) => {
  const role = "Customer"; // sau này sẽ thay bằng role của user
  const userId = "ee6efe69-71ca-4e3d-bc07-ba6e5c3e061e";
  const router = useRouter();
  const { toast } = useToast();

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [creating, setCreating] = useState(false);

  const handleRating = (star: number) => {
    setRating(star);
  };

  const formatSchedule = (startTime: string, endTime: string): JSX.Element => {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const timeFormatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const start = timeFormatter.format(startDate);
    const end = timeFormatter.format(endDate);

    const day = startDate.getDate().toString().padStart(2, "0");
    const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
    const year = startDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return (
      <div className="flex flex-col divide-y-2 h-full">
        <p className="text-[#1d2c4c] opacity-50 text-sm leading-[19px] tracking-tight font-Averta-Semibold">
          <span className="text-[#677482]">{start}</span> -{" "}
          <span className="text-[#677482]">{end}</span>
        </p>
        <p className="text-[#1d2c4c] opacity-50 text-sm leading-[19px] tracking-tight font-Averta-Semibold text-center">
          {formattedDate}
        </p>
      </div>
    );
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        variant: "destructive",
        description: "Please provide a rating.",
      });
      return;
    }
    if (title === "") {
      toast({
        variant: "destructive",
        description: "Please provide a title.",
      });
      return;
    }

    const feedbackData: CreateFeedbackDto = {
      title,
      helperRating: rating,
      description,
      booking_id: "5d8b0ceb-d7dd-4a41-8d62-ffb9d8c7f143",
      reportedBy: false,
    };

    setCreating(true);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST", // Sử dụng phương thức POST
        headers: {
          "Content-Type": "application/json", // Đảm bảo nội dung là JSON
        },
        body: JSON.stringify(feedbackData), // Chuyển đổi feedbackData thành chuỗi JSON
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      toast({
        description: "Feedback submitted successfully!",
      });
      //closeParentPopup();
      //router.refresh();
      mutate(userId, role);

      setTitle("");
      setRating(0);
      setDescription("");
      toggle();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to submit feedback",
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={toggle}
    >
      <div
        className="relative flex flex-col bg-white rounded-lg shadow-lg p-[20px] md:px-[50px] md:py-[30px] w-fit xl:w-[50%] h-fit max-h-[95%] gap-[20px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-8 right-8 p-2 flex items-center justify-center rounded-full hover:bg-gray-200 hover:shadow-md transition duration-200 ease-in-out">
          <button onClick={toggle}>
            <Image
              src="/images/ProgressBar/Group.svg"
              alt="exitButton"
              width={20}
              height={20}
            />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center text-[28px] md:text-[32px] max-md:p-2">
          <p className="text-[#1a78f2] font-Averta-Bold leading-[62px] self-start">
            - Rate our Services
          </p>
          <p className="text-[#170f49] font-Averta-Bold leading-[62px]">
            Fill the form to submit your feedback
          </p>
        </div>
        <div className="flex flex-col w-[90%] justify-center items-center mx-auto">
          <div className="flex flex-col w-full h-fit gap-[11px] px-[16px] py-[13px]">
            <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
              order selection
            </p>
            <div className="flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg">
              <div className="flex flex-row gap-[10px] items-center justify-center">
                <Image
                  src="/images/About/Google.png"
                  alt="avatar"
                  width={20}
                  height={20}
                  className="max-lg:hidden"
                />
                <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                  Long Nhat dep trai
                </p>
              </div>
              <div className="flex flex-col divide-y-2 h-full">
                <p className="text-[#1d2c4c] opacity-50 text-sm leading-[19px] tracking-tight font-Averta-Semibold">
                  <span className="text-[#677482]">8 AM</span> -{" "}
                  <span className="text-[#677482]">6 PM</span>
                </p>
                <p className="text-[#1d2c4c] opacity-50 text-sm leading-[19px] tracking-tight font-Averta-Semibold text-center">
                  10/29/2024
                </p>
              </div>
              <div className="bg-[#1a78f2] bg-opacity-20 py-2 px-3 rounded-md flex justify-center items-center">
                <p className="text-[#1a78f2] text-xs font-bold">
                  Home Cleaning
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full h-fit gap-[11px] p-[16px]">
            <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
              title
            </p>
            <input
              className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight border-[2px] p-[15px] rounded-lg border-[#d3d8dd]"
              placeholder="Type your feedback title"
              onChange={(e) => {
                setTitle(e.target.value);
                console.log("Title: ", e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col w-full h-fit gap-[11px] p-[16px]">
            <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
              your service rating
            </p>
            <div className="flex flex-row h-fit py-[13px]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  key={star}
                  src={
                    rating >= star
                      ? "/images/QuickPopUp/StarRating.svg"
                      : "/images/QuickPopUp/UnRating.svg"
                  }
                  alt="star"
                  width={35}
                  height={35}
                  onClick={() => handleRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full h-fit gap-[11px] p-[16px]">
            <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
              Feedback content (Optional)
            </p>
            <textarea
              placeholder="Type your feedback content"
              className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight border-[#d3d8dd] border-2 rounded-lg min-h-[130px] px-[10px] py-[16px] resize-none"
              onChange={(e) => {
                setDescription(e.target.value);
                console.log("Description: ", e.target.value);
              }}
            />
          </div>
          <Button
            onClick={handleSubmit}
            className="w-[30%] h-[55px] bg-[#1A78F2] text-lg text-white font-Averta-Semibold my-3"
          >
            {creating ? (
              <ClipLoader color="#ffffff" loading={creating} size={30} />
            ) : (
              "Confirm"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickPopupFeedback;
