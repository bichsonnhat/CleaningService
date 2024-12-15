import z from "zod";

const customerInfoSchema = z.object({
    fullName: z.string({required_error: 'Full Name is required'}).min(1, 'Full Name is required'),
    dateOfBirth: z.string().refine(
      (val) => {
        const dateOfBirth = new Date(val);
        return !isNaN(dateOfBirth.getTime());
      },
      { message: "Invalid date" }
    ),
    gender: z.enum(["Female", "Male", "Other"], { required_error: 'Gender is required' }),
    phoneNumber: z
      .string({required_error: 'Phone number is required'})
      .regex(/^[0-9]{10}$/, 'Phone number must be number and 10 digits')
      .min(1, 'Phone number is required'),
    email: z.string({required_error: 'Email is required'})
    .email('Invalid email')
    .min(1, 'Email is required'),
    city: z.string({required_error: 'City is required'}).min(1, 'City is required'),
    ward: z.string({ required_error: 'Ward is required'}).min(1, 'Ward is required'),
    postalCode: z.string({ required_error: 'Postal Code is required'})
    .regex(/^\d+$/, 'Postal Code must contain only numbers')
    .min(1, 'Postal Code is required'),
    houseNumber: z.string({ required_error: 'House Number is required'})
    .regex(/^\d+$/, 'House Number must contain only numbers')
    .min(1, 'House Number is required'),
    streetName: z.string({ required_error: 'Street Name is required'}).min(1, 'Street Name is required'),
  });

  const partialCustomerInfoSchema = customerInfoSchema.partial();

export type createCustomerInfoData = z.infer<typeof customerInfoSchema>;
export type updateCustomerInfoData = z.infer<
  typeof partialCustomerInfoSchema
>;

export { customerInfoSchema, partialCustomerInfoSchema };