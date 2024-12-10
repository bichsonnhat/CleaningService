import z from "zod";

const helperAvailabilitySchema = z
  .object({
    availabilityType: z.string(),
    startDatetime: z.coerce.date(),
    endDatetime: z.coerce.date(),
    requestReason: z.string(),
  })
  .strict();

const partialhelperAvailabilitySchema = helperAvailabilitySchema.partial().strict();

export type LeaveRequest = z.infer<typeof helperAvailabilitySchema>;

export { helperAvailabilitySchema, partialhelperAvailabilitySchema };
