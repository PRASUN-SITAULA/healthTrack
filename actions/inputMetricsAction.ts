"use server"
import { z } from "zod"
import prisma from "@/lib/db"
import { inputMetricSchema } from "@/config/inputMetricSchema"
import {
  heightSchema,
  weightSchema,
  bloodGlucoseSchema,
} from "@/config/inputMetricSchema"
import { cache } from "react"
import { revalidatePath } from "next/cache"
import { sleepDurationSchema } from "@/config/sleepDurationSchema"

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
        createdAt: true,
        updatedAt: true,
      },
    })
    return { sucess: "Data fetched", data: data }
  } catch (error) {
    console.error("Failed to get data", error)
    return { error: "Something wrong happened. Please try again." }
  }
})

// updating metrics through single function
// same function will be used for all metrics
const metricSchema = z.union([heightSchema, weightSchema, bloodGlucoseSchema])
type MetricType = "height" | "weight" | "bloodGlucoseLevel"
export const updateHealthMetric = async (
  metric: MetricType,
  data: z.infer<typeof metricSchema>,
  userId: string,
) => {
  try {
    const result = metricSchema.safeParse(data)
    if (!result.success) {
      return { error: "Something wrong happened. Please try again." }
    }
    switch (metric) {
      case "height":
        await prisma.inputMetrics.update({
          where: {
            userId: userId,
          },
          data: {
            height: (result.data as { height: number }).height,
          },
        })
        break
      case "weight":
        await prisma.inputMetrics.update({
          where: {
            userId: userId,
          },
          data: {
            weight: (result.data as { weight: number }).weight,
          },
        })
        break
      case "bloodGlucoseLevel":
        await prisma.inputMetrics.update({
          where: {
            userId: userId,
          },
          data: {
            bloodGlucoseLevel: (result.data as { bloodGlucoseLevel: number })
              .bloodGlucoseLevel,
          },
        })
        break
    }
    revalidatePath("/dashboard")
    return { success: "Data updated successfully" }
  } catch (error) {
    console.error("Failed to update health metric", error)
    return { error: "Failed to update health metric" }
  }
}

export const saveSleepDuration = async (duration: number, userId: string) => {
  try {
    const sleepData = await prisma.sleepDuration.create({
      data: {
        duration: duration,
        user: {
          connect: { id: userId },
        },
      },
    })
    return { success: "Sleep duration added Successfully.", data: sleepData }
  } catch (error) {
    console.error("Failed to save sleep duration:", error)
    return { error: "Failed to save sleep duration" }
  }
}

export const saveWalkingSteps = async (steps: number, userId: string) => {
  try {
    const walkingData = await prisma.walkingSteps.create({
      data: {
        steps,
        user: {
          connect: { id: userId },
        },
      },
    })
    return { success: "Walking steps added Successfully.", data: walkingData }
  } catch (error) {
    console.error("Failed to save walking steps:", error)
    return { error: "Failed to save walking steps" }
  }
}

export const getStepsAndSleep = async (userId: string) => {
  try {
    const steps = await prisma.walkingSteps.findMany({
      where: {
        userId: userId,
      },
    })
    const sleep = await prisma.sleepDuration.findMany({
      where: {
        userId: userId,
      },
    })
    return { success: "Data fetched successfully", data: { steps, sleep } }
  } catch (error) {
    console.error("Failed to get data", error)
    return { error: "Something wrong happened. Please try again." }
  }
}
