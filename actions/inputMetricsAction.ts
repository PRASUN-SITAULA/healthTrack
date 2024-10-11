"use server"
import { z } from "zod"
import prisma from "@/lib/db"
import { inputMetricSchema } from "@/config/inputMetricSchema"

export async function saveHealthMetric(
  metric: "height" | "weight" | "bloodGlucose",
  data: z.infer<typeof inputMetricSchema>,
  userId: string,
) {
  try {
    const result = inputMetricSchema.safeParse(data)
    const weight = result?.data?.weight as number
    const height = result?.data?.height as number
    const bloodGlucose = result?.data?.bloodGlucose as number

    if (!weight || !height || !bloodGlucose) {
      return { error: "Please enter a value for each metric." }
    }
    const inputMetrics = await prisma.inputMetrics.create({
      data: {
        height: result?.data?.height,
        weight: result?.data?.weight,
        bloodGlucose: result.data?.bloodGlucose,
      },
    })
    return { success: "Updated Successfully", data: inputMetrics }
  } catch (error) {
    console.error("Failed to save health metric:", error)
    return { error: "Failed to save health metric" }
  }
}
