import z from 'zod';

export const ServiceTypeSchema = z.object({
    categoryId: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  basePrice: z.number().positive(),
  isActive: z.boolean().optional(),
});

export type CreateServiceType = z.infer<typeof ServiceTypeSchema>;

export const UpdateServiceTypeSchema = ServiceTypeSchema.partial();

export type UpdateServiceType = z.infer<typeof UpdateServiceTypeSchema>;