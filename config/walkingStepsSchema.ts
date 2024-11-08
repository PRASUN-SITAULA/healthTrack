import * as z from "zod"

export const walkingStepsSchema = z.object({
  steps: z
    .number({ invalid_type_error: "Please enter a valid number" })
    .min(1)
    .max(50000),
})
