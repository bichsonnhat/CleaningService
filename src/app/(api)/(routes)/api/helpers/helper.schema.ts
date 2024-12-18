import z from "zod";

const helperSchema = z
  .object({
    fullName: z.string(),
    dateOfBirth: z.coerce.date(),
    gender: z.string(),
    phoneNumber: z.string(),
    salaryExpectation: z.number().nonnegative(),
    email: z.string(),
    city: z.string(),
    ward: z.string(),
    postalCode: z.string(),
    houseNumber: z.string(),
    streetName: z.string(),
    avatar: z.string(),
    idCard: z.string(),
    resume: z.string(),
    servicesOffered: z
      .array(z.string()) 
  })
  .strict();

const partialhelperSchema = helperSchema.partial().strict();

export type Customer = z.infer<typeof helperSchema>;
export type helperUpdateSchema = z.infer<
  typeof partialhelperSchema
>;

export { helperSchema, partialhelperSchema };
