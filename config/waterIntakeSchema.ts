import { z } from "zod"

export const waterIntakeSchema = z.object({
  amount: z
    .number({
      required_error: "Please enter an amount",
    })
    .min(1, "Amount must be at least 1 ml")
    .max(2000, "Amount cannot exceed 2000 ml"),
})
