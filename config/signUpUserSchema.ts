import { z } from "zod"

export const signUpUserSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string.",
      required_error: "Email is required.",
    })
    .email(),
  password: z
    .string({
      invalid_type_error: "Password must be at least 8 characters.",
      required_error: "Password is required.",
    })
    .min(8),
  name: z.string({
    invalid_type_error: "Name must be a string.",
    required_error: "Name is required.",
  }),

  dob: z
    .date({
      invalid_type_error: "You must be at least 18 years old.",
    })
    .min(new Date("2006-11-04")),
  gender: z.enum(["male", "female", "other"], {
    invalid_type_error: "Gender must be one of male, female, or other.",
    required_error: "One option must be selected.",
  }),
  height: z
    .number({
      invalid_type_error: "Height must be a positive number.",
      required_error: "Height is required.",
    })
    .nonnegative(),
  weight: z
    .number({
      invalid_type_error: "Weight must be a positive number.",
      required_error: "Weight is required.",
    })
    .nonnegative(),
})
