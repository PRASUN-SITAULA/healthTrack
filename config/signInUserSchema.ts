import { z } from "zod"

export const signInUserSchema = z.object({
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
})
