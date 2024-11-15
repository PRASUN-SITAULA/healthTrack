"use server"

import prisma from "@/lib/db"
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache"

export const getWaterIntake = unstable_cache(
  async (userId: string) => {
    try {
      const waterIntakeAmount = await prisma.waterIntake.findUnique({
        where: {
          userId: userId,
        },
        select: {
          amount: true,
          createdAt: true,
          updatedAt: true,
        },
      })
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (!waterIntakeAmount || waterIntakeAmount?.updatedAt < today) {
        await prisma.waterIntake.upsert({
          where: {
            userId: userId,
          },
          update: {
            amount: 0,
          },
          create: {
            userId: userId,
            amount: 0,
          },
        })
        return {
          success: "New day started, water intake reset",
          waterIntake: 0,
        }
      }

      return {
        success: "Data retrieved successfully",
        waterIntake: waterIntakeAmount ? waterIntakeAmount.amount : 0,
      }
    } catch (error) {
      console.error("Failed to get water intake", error)
      return { error: "Failed to get water intake" }
    }
  },
  ["water-intake"],
  {
    tags: ["water-intake"],
    revalidate: false,
  },
)

export const updateWaterIntake = async (amount: number, userId: string) => {
  const today = new Date()
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
    revalidateTag("water-intake")
    return { success: "Data updated successfully" }
  } catch (error) {
    console.error("Failed to update water intake", error)
    return { error: "Failed to update water intake" }
  }
}
