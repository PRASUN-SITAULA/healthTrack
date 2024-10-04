"use client"
import { z } from "zod"

export const zodUserSchema = z.object({
  name: z.string({
    invalid_type_error: "Name must be a string.",
    required_error: "Name is required.",
  }),

  dateOfBirth: z
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
