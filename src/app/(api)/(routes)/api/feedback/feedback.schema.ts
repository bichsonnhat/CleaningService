import z from "zod";

const createFeedbackSchema = z.object({
  booking_id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  helperRating: z.number(),
  reportedBy: z.boolean(),
});

export default createFeedbackSchema;
export type CreateFeedbackDto = z.infer<typeof createFeedbackSchema>;
