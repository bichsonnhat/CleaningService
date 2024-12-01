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
  createServiceTypeData,
  serviceTypeSchema,
} from "@/schema/serviceTypeSchema";

export function CreateServiceTypePopup() {
  const form = useForm<createServiceTypeData>({
    mode: "onSubmit",
    resolver: zodResolver(serviceTypeSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmitHandle = (data: createServiceTypeData) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Type</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Service Type</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          <div className="flex flex-col justify-center items-center gap-6 py-4">
            <Controller
              name="service_category_id"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  label="SERVICE CATEGORY"
                  id="service-category"
                  options={["Home Cleaning", "Other Services"]}
                  placeholder="Select Service Category"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.service_category_id?.message}
                  ref={field.ref}
                ></CustomSelect>
              )}
            />

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Name"
                  placeholder="Enter Category Name"
                  id="name"
                  className="w-full"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.name?.message}
                ></CustomInput>
              )}
            />

            <Controller
              name="base_price"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Base Price (USD)"
                  placeholder="Base Price"
                  id="base-price"
                  className="w-full"
                  type="number"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.base_price?.message}
                ></CustomInput>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Description"
                  placeholder="Enter Description"
                  id="description"
                  className="w-full"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.description?.message}
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
