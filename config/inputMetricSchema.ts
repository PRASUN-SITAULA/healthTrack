import { z } from "zod"

export const heightSchema = z.object({
  height: z
    .number({
      invalid_type_error: "Height must be a positive number.",
    })
    .nonnegative(),
})

export const weightSchema = z.object({
  weight: z
    .number({
      invalid_type_error: "Weight must be a positive number.",
    })
    .nonnegative(),
})

export const bloodGlucoseSchema = z.object({
  bloodGlucoseLevel: z
    .number({
      invalid_type_error: "Blood Glucose must be a positive number.",
    })
    .nonnegative(),
})

export const inputMetricSchema = z.object({
  weight: z
    .number({
      invalid_type_error: "Enter a valid value.",
      required_error: "A value is required.",
    })
    .nonnegative(),
  height: z
    .number({
      invalid_type_error: "Enter a valid value.",
      required_error: "A value is required.",
    })
    .nonnegative(),
  bloodGlucoseLevel: z
    .number({
      invalid_type_error: "Enter a valid value.",
      required_error: "A value is required.",
    })
    .nonnegative(),
})
