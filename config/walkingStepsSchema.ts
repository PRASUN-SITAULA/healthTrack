import * as z from "zod"

export const walkingStepsSchema = z.object({
  steps: z.number().min(0).max(50000),
})
