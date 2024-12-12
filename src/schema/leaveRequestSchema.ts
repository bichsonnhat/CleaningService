import z from "zod";

const leaveRequestSchema = z
  .object({
    startDatetime: z.string().refine(
      (val) => {
        const startDate = new Date(val);
        return !isNaN(startDate.getTime());
      },
      { message: "Invalid start date" }
    ),
    endDatetime: z.string().refine(
      (val) => {
        const endDate = new Date(val);
        return !isNaN(endDate.getTime());
      },
      { message: "Invalid end date" }
    ),
    requestReason: z.string().min(1, "Reason cannot be empty"),
    availabilityType: z.string().min(1, "Availability type must be selected"),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startDatetime);
      const endDate = new Date(data.endDatetime);
      return startDate <= endDate;
    },
    {
      message: "Start date must be before or equal to end date",
      path: ["startDatetime"],
    }
  );
export type createLeaveRequestData = z.infer<typeof leaveRequestSchema>;

export { leaveRequestSchema };
