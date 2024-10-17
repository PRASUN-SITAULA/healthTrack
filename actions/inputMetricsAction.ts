"use server"
import { z } from "zod"
import prisma from "@/lib/db"
import { inputMetricSchema } from "@/config/inputMetricSchema"
import { cache } from "react"

export async function saveHealthMetric(
  data: z.infer<typeof inputMetricSchema>,
  userId: string,
) {
  try {
    const result = inputMetricSchema.safeParse(data)
    if (!result.success) {
      return { error: "Please enter valid value." }
    }
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

export const getHealthMetric = cache(async (userId: string) => {
  try {
    const data = await prisma.inputMetrics.findUnique({
      where: {
        userId: userId,
      },
      select: {
        weight: true,
        height: true,
        bloodGlucoseLevel: true,
      },
    })
    return { sucess: "Data fetched", data: data }
  } catch (error) {
    console.error("Failed to get data", error)
    return { error: "Something wrong happened. Please try again." }
  }
})
