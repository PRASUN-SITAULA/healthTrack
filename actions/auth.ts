"use server"
import { lucia } from "@/lib/auth"
import { hash } from "@node-rs/argon2"
import { signUpUserSchema } from "@/config/signUpUserSchema"
import { z } from "zod"
import prisma from "@/lib/db"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { isValidEmail } from "@/utils/verifyEmail"

export async function signup(_: any, data: z.infer<typeof signUpUserSchema>) {
  const result = signUpUserSchema.safeParse(data)
  const email = result.data?.email as string
  const password = result.data?.password as string

  if (!isValidEmail(email)) {
    return { error: "Invalid email" }
  }
  if (!email || !password) {
    return { error: "Email and password are required" }
  }
  const hashedPassword = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  })
  if (existingUser) {
    return { error: "User already exists" }
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: result.data?.email as string,
        password: hashedPassword as string,
        name: result.data?.name as string,
        dob: result.data?.dob as Date,
        height: result.data?.height as number,
        weight: result.data?.weight as number,
      },
    })
    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )
  } catch (error) {
    console.log(error)
  }
  return redirect("/")
}
