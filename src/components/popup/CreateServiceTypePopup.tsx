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
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function CreateServiceTypePopup() {
  const queryClient = useQueryClient();

  const fetchServiceCategorysUrl =
    "http://localhost:3000/api/service-categories";

  const createServiceTypeUrl = "http://localhost:3000/api/service-types";

  const [ServiceCategories, setServiceCategories] = useState<ServiceCategory[]>(
    []
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchServiceCategories = async () => {
    try {
      const response = await fetch(fetchServiceCategorysUrl);
      if (!response.ok) {
        throw new Error("Error fetching service categories");
      }
      const data = await response.json();
      setServiceCategories(data);
    } catch (error) {
      console.error("Error fetching service categories:", error);
    }
  };
  const createServiceType = async (data: createServiceTypeData) => {
    try {
      const response = await fetch(createServiceTypeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error creating service type");
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error creating service type:", error);
    }
  };

  useEffect(() => {
    fetchServiceCategories();
  }, []);

  const form = useForm<createServiceTypeData>({
    mode: "onSubmit",
    resolver: zodResolver(serviceTypeSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmitHandle = async (data: createServiceTypeData) => {
    try {
      console.log("Submitting data:", data);
      await createServiceType(data);
      console.log("Service type created successfully.");
      queryClient.invalidateQueries({ queryKey: ["serviceTypes"] });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error while creating service type:", error);
      alert("Failed to create service type. Please try again.");
    }
  };

  const options = ServiceCategories.map((ServiceCategory) => ({
    id: ServiceCategory.id,
    name: ServiceCategory.name,
  }));

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="px-7 h-[38px] bg-[#1b78f2] hover:bg-opacity-90 rounded-[8px] text-xs font-Averta-Bold tracking-normal leading-loose text-center text-white"
          variant="default"
          onClick={() => setIsDialogOpen(true)}
        >
          Create Type
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Service Type</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          <div className="flex flex-col justify-center items-center gap-6 py-4">
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  label="SERVICE CATEGORY"
                  id="service-category"
                  options={options}
                  placeholder="Select Service Category"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.categoryId?.message}
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
                  placeholder="Enter Type Name"
                  id="name"
                  className="w-full"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.name?.message}
                ></CustomInput>
              )}
            />

            <Controller
              name="basePrice"
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
                  error={errors.basePrice?.message}
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
