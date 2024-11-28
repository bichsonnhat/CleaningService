import z from "zod";

const serviceDetailSchema = z
  .object({
    serviceTypeId: z.string(),
    additionalPrice: z.number().nonnegative(),
    multiplyPrice: z.number().min(1),
    title: z.string(),
  })
  .strict();

const partialServiceDetailSchema = serviceDetailSchema.partial().strict();

export type ServiceDetail = z.infer<typeof serviceDetailSchema>;
export type serviceDetailUpdateSchema = z.infer<
  typeof partialServiceDetailSchema
>;

export { serviceDetailSchema, partialServiceDetailSchema };
