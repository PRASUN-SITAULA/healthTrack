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
  bloodGlucose: z
    .number({
      invalid_type_error: "Blood Glucose must be a positive number.",
    })
    .nonnegative(),
})

export const inputMetricSchema = z.intersection(
  heightSchema.required(),
  weightSchema.required(),
  bloodGlucoseSchema.required(),
)
