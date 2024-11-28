import z from "zod";

const serviceTypeSchema = z.object({
  service_category_id: z.string(),
  name: z.string().min(1, "Name cannot be empty"),
  description: z.string().min(1, "Description cannot be empty"),
  base_price: z.coerce.number().nonnegative("Base price must be non-negative"),
});

const partialServiceTypeSchema = serviceTypeSchema.partial();

export type createServiceTypeData = z.infer<typeof serviceTypeSchema>;
export type updateServiceTypeData = z.infer<typeof partialServiceTypeSchema>;

export { serviceTypeSchema, partialServiceTypeSchema };
