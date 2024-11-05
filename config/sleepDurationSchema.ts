import * as z from "zod"

export const sleepDurationSchema = z.object({
  duration: z.number().min(1).max(24),
})
