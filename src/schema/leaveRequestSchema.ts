import z from "zod";

const leaveRequestSchema = z.object({
  start_datetime: z.coerce.date(),
  end_datetime: z.coerce.date(),
  request_reason: z.string().min(1, "Reason cannot be empty"),
  availability_type: z.string().min(1, "Availability type must be selected"),
});

export type createLeaveRequestData = z.infer<typeof leaveRequestSchema>;

export { leaveRequestSchema };
