import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomInput from "../input/CustomInput";
import Image from "next/image";
import CustomSelect from "../select/CustomSelect";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  leaveRequestSchema,
  createLeaveRequestData,
} from "@/schema/leaveRequestSchema";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function CreateLeaveRequestPopup() {
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createLeaveRequest = async (data: createLeaveRequestData) => {
    try {
      const response = await fetch("/api/helper_availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error creating leave request");
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error creating leave request:", error);
    }
  };

  const form = useForm<createLeaveRequestData>({
    mode: "onSubmit",
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: {
      availabilityType: "",
      startDatetime: new Date().toISOString().split("T")[0],
      endDatetime: new Date().toISOString().split("T")[0],
      requestReason: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const onSubmitHandle = async (data: createLeaveRequestData) => {
    try {
      console.log("Submitting data:", data);
      await createLeaveRequest(data);
      queryClient.invalidateQueries({ queryKey: ["leaveRequests"] });
      setIsDialogOpen(false);
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error while creating leave request:", error);
      alert("Failed to create leave request. Please try again.");
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      // Reset form when dialog is closed
      reset();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          className="flex flex-row gap-2 items-center justify-center px-8 h-[38px] bg-[#1b78f2] 
          hover:bg-opacity-90 rounded-[8px] text-xs font-Averta-Bold tracking-normal leading-loose 
          whitespace-nowrap text-center text-white"
          onClick={() => setIsDialogOpen(true)}
        >
          <Image
            src="/images/icons/outline_plus.svg"
            alt=""
            width={18}
            height={18}
          />
          Create LeaveRequest
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Leave Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          <div className="flex flex-col justify-center items-center gap-6 py-4">
            <Controller
              name="availabilityType"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  label="Availability Type"
                  id="availabilityType"
                  options={[
                    { id: "vacation", name: "Vacation" },
                    { id: "sick_leave", name: "Sick Leave" },
                    { id: "personal_leave", name: "Personal Leave" },
                    { id: "unavailable", name: "Unavailable" },
                  ]}
                  placeholder="Select Service Category"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.availabilityType?.message}
                  ref={field.ref}
                ></CustomSelect>
              )}
            />

            <div className="flex gap-4 w-full">
              <Controller
                name="startDatetime"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="start date"
                    id="startDatetime"
                    className="w-full"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.startDatetime?.message}
                    type="date"
                  ></CustomInput>
                )}
              />

              <Controller
                name="endDatetime"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="end date"
                    id="endDatetime"
                    className="w-full"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.endDatetime?.message}
                    type="date"
                  ></CustomInput>
                )}
              />
            </div>

            <Controller
              name="requestReason"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Reason"
                  placeholder="Enter Reason"
                  id="requestReason"
                  className="w-full"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.requestReason?.message}
                ></CustomInput>
              )}
            />
          </div>
          <DialogFooter>
            <Button
              className="px-[23px] py-[9px] text-[16px]"
              variant={"default"}
              type="submit"
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
