"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomInput from "../input/CustomInput";
import CustomSelect from "../select/CustomSelect";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipLoader } from "react-spinners";
import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import {
  serviceTypeSchema,
  updateServiceTypeData,
} from "@/schema/serviceTypeSchema";

export function UpdateServiceTypePopup({
  id,
  open,
  onClose,
}: {
  id: string | null;
  open: boolean;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const fetchServiceCategoryUrl =
    "http://localhost:3000/api/service-categories";
  const serviceTypelUrl = id
    ? `http://localhost:3000/api/service-types/${id}`
    : null;

  const form = useForm<updateServiceTypeData>({
    mode: "onSubmit",
    resolver: zodResolver(serviceTypeSchema),
  });

  const fetchServiceType = async (): Promise<ServiceType> => {
    try {
      if (!serviceTypelUrl) {
        throw new Error("Service detail URL is null");
      }
      const response = await fetch(serviceTypelUrl);
      if (!response.ok) {
        throw new Error("Error fetching service detail");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching service detail:", error);
      throw new Error("Error fetching service detail");
    }
  };
  const fetchServiceCategories = async (): Promise<ServiceType[]> => {
    try {
      const response = await fetch(fetchServiceCategoryUrl);
      if (!response.ok) {
        throw new Error("Error fetching service types");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching service types:", error);
      return [];
    }
  };

  const { data: typeData, isPending: isFetchTypePending } = useQuery({
    queryKey: ["serviceType", id],
    queryFn: fetchServiceType,
  });

  const {
    data: serviceCategoriesData,
    isPending: isFetchServiceCategoriesPending,
  } = useQuery({
    queryKey: ["serviceCategories"],
    queryFn: fetchServiceCategories,
  });

  const updateServiceDetail = async (data: updateServiceTypeData) => {
    try {
      if (!serviceTypelUrl) {
        throw new Error("Service detail URL is null");
      }
      const response = await fetch(serviceTypelUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error updating service detail");
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error updating service detail:", error);
    }
  };

  const options = serviceCategoriesData
    ? serviceCategoriesData.map((serviceType) => ({
        id: serviceType.id.toString(),
        name: serviceType.name.toString(),
      }))
    : [];

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!id) {
      reset();
      return;
    }
    if (typeData) {
      reset({
        categoryId: typeData.categoryId?.toString(),
        name: typeData.name,
        description: typeData.description,
        basePrice: typeData.basePrice,
      });
    }
  }, [id, typeData, reset]);

  useEffect(() => {
    if (!open) {
      reset({});
    }
  }, [open, reset]);

  const onSubmitHandle = async (data: updateServiceTypeData) => {
    try {
      console.log("Submitting data:", data);
      await updateServiceDetail(data);
      console.log("Service detail update successfully.");
      queryClient.invalidateQueries({ queryKey: ["serviceTypes"] });
      onClose();
    } catch (error) {
      console.error("Error while updating service detail:", error);
      alert("Failed to update service detail. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Service Detail</DialogTitle>
        </DialogHeader>
        {!id || !typeData || isFetchTypePending ? (
          <div className="w-full h-full flex justify-center items-center">
            <ClipLoader
              color="#000000"
              loading={isFetchTypePending}
              size={80}
            ></ClipLoader>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmitHandle)}>
            <div className="flex flex-col justify-center items-center gap-6 py-4">
              {isFetchServiceCategoriesPending ? (
                <div>Loading...</div>
              ) : (
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
                      onChange={() => field.onChange(field.value)}
                      error={errors.categoryId?.message}
                      ref={field.ref}
                    ></CustomSelect>
                  )}
                />
              )}

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
                Update
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
