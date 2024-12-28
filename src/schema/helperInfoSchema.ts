import z from "zod";

const helperInfoSchema = z.object({
    fullName: z.string({required_error: 'Full Name is required'}).min(1, 'Full Name is required'),
    dateOfBirth: z.string().refine(
      (val) => {
        const dateOfBirth = new Date(val);
        return !isNaN(dateOfBirth.getTime());
      },
      { message: "Invalid date" }
    ),
    gender: z.preprocess(
      (val) => (val === "" || val === undefined ? undefined : val),
      z.enum(["Female", "Male", "Other"], {
        invalid_type_error: "Gender is required'.",
        required_error: "Gender is required",
      })
    ),
    phoneNumber: z
      .string({required_error: 'Phone number is required'})
      .regex(/^[0-9]{10}$/, 'Phone number must be number and 10 digits')
      .min(1, 'Phone number is required'),
    email: z.string({required_error: 'Email is required'})
    .email('Invalid email')
    .min(1, 'Email is required'),
    salaryExpectation: z.coerce
    .number({required_error: 'Salary expectation is required'})
    .nonnegative("Salary expectation must be non-negative").min(1, 'Salary expectation is required'),
    city: z.string({required_error: 'City is required'}).min(1, 'City is required'),
    ward: z.string({ required_error: 'Ward is required'}).min(1, 'Ward is required'),
    postalCode: z.string({ required_error: 'Postal Code is required'})
    .regex(/^\d+$/, 'Postal Code must contain only numbers')
    .min(1, 'Postal Code is required'),
    houseNumber: z.string({ required_error: 'House Number is required'})
    .regex(/^\d+$/, 'House Number must contain only numbers')
    .min(1, 'House Number is required'),
    streetName: z.string({ required_error: 'Street Name is required'}).min(1, 'Street Name is required'),
    servicesOffered: z
      .array(z.string())
      .min(1, 'At least one service must be selected'),
    // avatar: z.string().url({ message: "Invalid avatar URL" }),
    // idCard: z.string().url({ message: "Invalid ID Card URL" }),
    // resume: z.string().url({ message: "Invalid resume URL" }),
});

  const partialHelperInfoSchema = helperInfoSchema.partial();

export type createHelperInfoData = z.infer<typeof helperInfoSchema>;
export type updateHelperInfoData = z.infer<
  typeof partialHelperInfoSchema
>;

export { helperInfoSchema, partialHelperInfoSchema };