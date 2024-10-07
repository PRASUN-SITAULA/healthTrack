"use server"
import { lucia } from "@/lib/auth"
import { hash } from "@node-rs/argon2"
import { signUpUserSchema } from "@/config/signUpUserSchema"
import { z } from "zod"
import prisma from "@/lib/db"
import { cookies } from "next/headers"
import { isValidEmail } from "@/utils/auth/validateEmail"
import { getUserAndSession } from "@/utils/auth/getUserSession"
import { redirect } from "next/navigation"
import { signInUserSchema } from "@/config/signInUserSchema"
import { verify } from "@node-rs/argon2"

export async function signup(data: z.infer<typeof signUpUserSchema>) {
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
    return { success: "User created successfully" }
  } catch (error) {
    console.log(error)
    return { error: "Error creating user account. Please try again." }
  }
}

export async function signin(data: z.infer<typeof signInUserSchema>) {
  console.log("I am here.")
  const result = signInUserSchema.safeParse(data)
  const email = result.data?.email as string
  const password = result.data?.password as string
  console.log(email, password)
  if (!isValidEmail(email)) {
    return { error: "Invalid email" }
  }
  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })
  if (!user) {
    return { error: "User not found" }
  }

  const validPassword = await verify(user.password, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    }
  }

  const session = await lucia.createSession(user.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )
  return { success: "User signed in successfully" }
}

export async function signout() {
  const { session } = await getUserAndSession()
  if (!session) {
    return { error: "You are not logged in." }
  }
  await lucia.invalidateSession(session.id)
  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )
  return redirect("/sign-in")
}
