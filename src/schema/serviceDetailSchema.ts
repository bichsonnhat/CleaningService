import z from "zod";

const serviceDetailSchema = z.object({
  serviceTypeId: z.string().min(1, "Service type must be selected"),
  title: z.string().min(1, "Title cannot be empty"),
  multiplyPrice: z.coerce
    .number()
    .nonnegative("Multiply price must be non-negative"),
  additionalPrice: z.coerce
    .number()
    .nonnegative("Additional price must be non-negative"),
});

const partialServiceDetailSchema = serviceDetailSchema.partial();

export type createServiceDetailData = z.infer<typeof serviceDetailSchema>;
export type updateServiceDetailData = z.infer<
  typeof partialServiceDetailSchema
>;

export { serviceDetailSchema, partialServiceDetailSchema };
