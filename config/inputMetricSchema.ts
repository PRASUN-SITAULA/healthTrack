import { z } from "zod"

export const inputMetricSchema = z.object({
  height: z
    .number({
      invalid_type_error: "Height must be a positive number.",
    })
    .nonnegative(),
  weight: z
    .number({
      invalid_type_error: "Weight must be a positive number.",
    })
    .nonnegative(),
  bloodGlucose: z
    .number({
      invalid_type_error: "Blood Glucose must be a positive number.",
    })
    .nonnegative(),
})
