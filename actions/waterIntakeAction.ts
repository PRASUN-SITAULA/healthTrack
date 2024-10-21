"use server"

import prisma from "@/lib/db"

export const updateWaterIntake = async (amount: number, userId: string) => {
  try {
    await prisma.waterintake.update({
      where: {
        userId: userId,
      },
      data: {
        amount: amount,
      },
    })
    return { success: "Data updated successfully" }
  } catch (error) {
    console.error("Failed to update water intake", error)
    return { error: "Failed to update water intake" }
  }
}
