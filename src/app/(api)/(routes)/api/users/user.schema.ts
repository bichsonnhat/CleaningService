import z from "zod";

const userSchema = z
  .object({
    fullName: z.string(),
    dateOfBirth: z.coerce.date(),
    gender: z.string(),
    phoneNumber: z.string(),
    email: z.string(),
    city: z.string(),
    ward: z.string(),
    postalCode: z.string(),
    houseNumber: z.string(),
    streetName: z.string(),
    avatar: z.string(),
    idCard: z.string(),
  })
  .strict();

const partialuserSchema = userSchema.partial().strict();

export type User = z.infer<typeof userSchema>;
export type userUpdateSchema = z.infer<
  typeof partialuserSchema
>;

export { userSchema, partialuserSchema };
