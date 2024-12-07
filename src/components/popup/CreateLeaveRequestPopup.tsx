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
import CustomSelect from "../select/CustomSelect";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  leaveRequestSchema,
  createLeaveRequestData,
} from "@/schema/leaveRequestSchema";

export function CreateLeaveRequestPopup() {
  const form = useForm<createLeaveRequestData>({
    mode: "onSubmit",
    resolver: zodResolver(leaveRequestSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmitHandle = (data: createLeaveRequestData) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Leave Request</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Leave Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          <div className="flex flex-col justify-center items-center gap-6 py-4">
            <Controller
              name="availability_type"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  label="Availability Type"
                  id="availability_type"
                  options={[
                    { id: "vacation", name: "Vacation" },
                    { id: "sick_leave", name: "Sick Leave" },
                    { id: "personal_leave", name: "Personal Leave" },
                    { id: "unavailable", name: "Unavailable" },
                  ]}
                  placeholder="Select Service Category"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.availability_type?.message}
                  ref={field.ref}
                ></CustomSelect>
              )}
            />

            <div className="flex gap-4 w-full">
              <Controller
                name="start_datetime"
                control={control}
                defaultValue={new Date()}
                render={({ field }) => (
                  <CustomInput
                    label="start date"
                    id="start_datetime"
                    className="w-full"
                    value={field.value.toISOString().split("T")[0]}
                    onChange={field.onChange}
                    error={errors.start_datetime?.message}
                    type="date"
                  ></CustomInput>
                )}
              />

              <Controller
                name="end_datetime"
                control={control}
                defaultValue={new Date()}
                render={({ field }) => (
                  <CustomInput
                    label="end date"
                    id="end_datetime"
                    className="w-full"
                    value={field.value.toISOString().split("T")[0]}
                    onChange={field.onChange}
                    error={errors.end_datetime?.message}
                    type="date"
                  ></CustomInput>
                )}
              />
            </div>

            <Controller
              name="request_reason"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Reason"
                  placeholder="Enter Reason"
                  id="request_reason"
                  className="w-full"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.request_reason?.message}
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
