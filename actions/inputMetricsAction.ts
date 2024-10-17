"use server"
import { z } from "zod"
import prisma from "@/lib/db"
import { inputMetricSchema } from "@/config/inputMetricSchema"

export async function saveHealthMetric(
  data: z.infer<typeof inputMetricSchema>,
  userId: string,
) {
  try {
    const result = inputMetricSchema.safeParse(data)
    if (!result.success) {
      return { error: "Please enter valid value." }
    }
    const weight = result?.data?.weight
    const height = result?.data?.height
    const bloodGlucoseLevel = result?.data?.bloodGlucoseLevel

    const inputMetrics = await prisma.inputMetrics.create({
      data: {
        height: result?.data?.height,
        weight: result?.data?.weight,
        bloodGlucoseLevel: result.data?.bloodGlucoseLevel,
        user: {
          connect: { id: userId },
        },
      },
    })
    return { success: "Data added Successfully.", data: inputMetrics }
  } catch (error) {
    console.error("Failed to save health metric:", error)
    return { error: "Failed to save health metric" }
  }
}
