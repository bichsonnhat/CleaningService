"use client";

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
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export function CreateServiceDetailPopup() {
  const queryClient = useQueryClient();

  const fetchServiceTypesUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/service-types`;

  const createServiceDetailUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/service-detail`;

  const { toast } = useToast();

  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<createServiceDetailData>({
    mode: "onSubmit",
    resolver: zodResolver(serviceDetailSchema),
  });

  const fetchServiceTypes = async () => {
    try {
      const response = await fetch(fetchServiceTypesUrl);
      if (!response.ok) {
        throw new Error("Error fetching service types");
      }
      const data = await response.json();
      setServiceTypes(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fetching service types failed!",
      });
      console.error("Error fetching service types:", error);
    }
  };
  const createServiceDetail = async (data: createServiceDetailData) => {
    try {
      const response = await fetch(createServiceDetailUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error creating service detail");
      }
      const result = await response.json();
      toast({
        variant: "default",
        title: "Creating service detail successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Creating service detail failed!",
      });
      console.error("Error creating service detail:", error);
    }
  };

  useEffect(() => {
    fetchServiceTypes();
  }, []);

  const options = serviceTypes.map((serviceType) => ({
    id: serviceType.id,
    name: serviceType.name,
  }));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmitHandle = async (data: createServiceDetailData) => {
    try {
      console.log("Submitting data:", data);
      await createServiceDetail(data);
      console.log("Service detail created successfully.");
      queryClient.invalidateQueries({ queryKey: ["serviceDetails"] });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error while creating service detail:", error);
      alert("Failed to create service detail. Please try again.");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="px-7 h-[38px] bg-[#1b78f2] hover:bg-opacity-90 rounded-[8px] font-Averta-Bold tracking-normal leading-loose text-center text-white"
          variant="default"
          onClick={() => setIsDialogOpen(true)}
        >
          Create Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Service Detail</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          <div className="flex flex-col justify-center items-center gap-6 py-4">
            <Controller
              name="serviceTypeId"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  label="SERVICE TYPE"
                  id="service-type"
                  options={options}
                  placeholder="Select Service Type"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.serviceTypeId?.message}
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
                name="multiplyPrice"
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
                    error={errors.multiplyPrice?.message}
                  />
                )}
              />

              <Controller
                name="additionalPrice"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Additional Price (USD)"
                    placeholder="Enter + Price"
                    id="additionalPrice"
                    className="w-full"
                    type="number"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={errors.additionalPrice?.message}
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
