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
import {
  serviceDetailSchema,
  updateServiceDetailData,
} from "@/schema/serviceDetailSchema";
import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

export function UpdateServiceDetailPopup({
  id,
  open,
  onClose,
}: {
  id: string | null;
  open: boolean;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const fetchServiceTypesUrl = "http://localhost:3000/api/service-types";
  const serviceDetailUrl = id
    ? `http://localhost:3000/api/service-detail/${id}`
    : null;

  const form = useForm<updateServiceDetailData>({
    mode: "onSubmit",
    resolver: zodResolver(serviceDetailSchema),
  });

  const fetchServiceDetail = async (): Promise<ServiceDetail> => {
    try {
      if (!serviceDetailUrl) {
        throw new Error("Service detail URL is null");
      }
      const response = await fetch(serviceDetailUrl);
      if (!response.ok) {
        throw new Error("Error fetching service detail");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching service detail:", error);
      throw new Error("Error fetching service detail");
    }
  };
  const fetchServiceTypes = async (): Promise<ServiceType[]> => {
    try {
      const response = await fetch(fetchServiceTypesUrl);
      if (!response.ok) {
        throw new Error("Error fetching service types");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching service types:", error);
      return [];
    }
  };

  const { data: detailData, isPending: isFetchDetailPending } = useQuery({
    queryKey: ["serviceDetail", id],
    queryFn: fetchServiceDetail,
  });

  const { data: serviceTypesData, isPending: isFetchServiceTypePending } =
    useQuery({
      queryKey: ["serviceTypes"],
      queryFn: fetchServiceTypes,
    });

  const updateServiceDetail = async (data: updateServiceDetailData) => {
    try {
      if (!serviceDetailUrl) {
        throw new Error("Service detail URL is null");
      }
      const response = await fetch(serviceDetailUrl, {
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

  const options = serviceTypesData
    ? serviceTypesData.map((serviceType) => ({
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
    if (detailData) {
      reset({
        ...detailData,
        serviceTypeId: detailData?.serviceTypeId?.toString(),
        title: detailData.title.toString(),
      });
    }
  }, [id, detailData, reset]);

  useEffect(() => {
    if (!open) {
      reset({
        serviceTypeId: detailData?.serviceTypeId.toString(),
      });
    }
  }, [open, reset]);

  const onSubmitHandle = async (data: updateServiceDetailData) => {
    try {
      console.log("Submitting data:", data);
      await updateServiceDetail(data);
      console.log("Service detail update successfully.");
      queryClient.invalidateQueries({ queryKey: ["serviceDetails"] });
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
        {!id || !detailData || isFetchDetailPending ? (
          <div className="w-full h-full flex justify-center items-center">
            <ClipLoader
              color="#000000"
              loading={isFetchDetailPending}
              size={80}
            ></ClipLoader>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmitHandle)}>
            <div className="flex flex-col justify-center items-center gap-6 py-4">
              {isFetchServiceTypePending ? (
                <div>Loading...</div>
              ) : (
                <Controller
                  name="serviceTypeId"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      label="SERVICE TYPE"
                      id="service-type"
                      options={options}
                      placeholder="Select Service Type"
                      value={field.value ?? "Standard"}
                      onChange={() => field.onChange(field.value)}
                      error={errors.serviceTypeId?.message}
                      ref={field.ref}
                    />
                  )}
                />
              )}

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
                Update
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
