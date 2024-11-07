import * as z from "zod"

export const sleepDurationSchema = z.object({
  duration: z
    .number({ invalid_type_error: "Please enter a valid number" })
    .min(1)
    .max(100),
})
