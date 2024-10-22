"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { cache } from "react"

export const getWaterIntake = cache(async (userId: string) => {
  try {
    const waterIntakeAmount = await prisma.waterIntake.findUnique({
      where: {
        userId: userId,
      },
      select: {
        amount: true,
        createdAt: true,
      },
    })
    return {
      success: "Data retrieved successfully",
      waterIntake: waterIntakeAmount ? waterIntakeAmount.amount : 0,
    }
  } catch (error) {
    console.error("Failed to get water intake", error)
    return { error: "Failed to get water intake" }
  }
})

export const updateWaterIntake = async (amount: number, userId: string) => {
  try {
    await prisma.waterIntake.upsert({
      where: {
        userId: userId,
      },
      update: {
        amount: amount,
      },
      create: {
        userId: userId,
        amount: amount,
      },
    })
    revalidatePath("/dashboard")
    return { success: "Data updated successfully" }
  } catch (error) {
    console.error("Failed to update water intake", error)
    return { error: "Failed to update water intake" }
  }
}
