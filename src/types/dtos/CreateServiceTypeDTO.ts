import z from 'zod'

export const CreateServiceTypeSchema = z.object({
    categoryId: z.string().uuid(),
    name: z.string().min(3),
    description: z.string().optional(),
    basePrice: z.number().positive(),
})

export type CreateServiceTypeDTO = z.infer<typeof CreateServiceTypeSchema>