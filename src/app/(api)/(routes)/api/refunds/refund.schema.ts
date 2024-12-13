import { resolve } from "path";
import z from "zod";

const createRefundSchema = z.object({
  booking_id: z.string(),
  reason: z.string(),
  requested_by: z.boolean(),
  resolved_at: z.date(),
});

export default createRefundSchema;
export type CreateRefundDto = z.infer<typeof createRefundSchema>;
