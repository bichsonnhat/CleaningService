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
  createServiceDetailData,
  serviceDetailSchema,
} from "@/schema/serviceDetailSchema";

export function CreateServiceDetailPopup() {
  const form = useForm<createServiceDetailData>({
    mode: "onSubmit",
    resolver: zodResolver(serviceDetailSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmitHandle = (data: createServiceDetailData) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Detail</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Service Detail</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          <div className="flex flex-col justify-center items-center gap-6 py-4">
            <Controller
              name="service_type_id"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  label="SERVICE TYPE"
                  id="service-type"
                  options={[
                    "Home Cleaning",
                    "Baby-Sitting",
                    "Caretaking",
                    "House Keeping",
                  ]}
                  placeholder="Select Service Type"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.service_type_id?.message}
                  ref={field.ref}
                />
              )}
            />

            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Title"
                  placeholder="Enter Title"
                  id="title"
                  className="w-full"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.title?.message}
                />
              )}
            />

            <div className="flex gap-4 w-full">
              <Controller
                name="multiply_price"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Multiply Price (times)"
                    placeholder="Enter x Price"
                    id="multiply_price"
                    className="w-full"
                    type="number"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={errors.multiply_price?.message}
                  />
                )}
              />

              <Controller
                name="additional_price"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Additional Price (USD)"
                    placeholder="Enter + Price"
                    id="additional_price"
                    className="w-full"
                    type="number"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={errors.additional_price?.message}
                  />
                )}
              />
            </div>
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
