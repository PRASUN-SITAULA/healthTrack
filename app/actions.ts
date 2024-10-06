"use server"

import { encodedRedirect } from "@/utils/utils"
import { createClient } from "@/utils/supabase/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"
import { signUpUserSchema } from "@/config/signUpUserSchema"
import prisma from "@/lib/db"

export const signUpAction = async (data: z.infer<typeof signUpUserSchema>) => {
  const result = signUpUserSchema.safeParse(data)

  const email = result.data?.email as string
  const password = result.data?.password as string
  const supabase = createClient()
  // const origin = headers().get("origin")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const { data: signUpData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: result.data?.name,
      },
    },
  })

  if (error) {
    console.error(error.code + " " + error.message)
    return encodedRedirect("error", "/sign-up", error.message)
  }
  if (signUpData.user) {
    try {
      await prisma.user.create({
        data: {
          email: result.data?.email,
          name: result.data?.name,
          dob: result.data?.dob,
          height: result.data?.height,
          weight: result.data?.weight,
        },
      })
      return encodedRedirect("success", "/sign-up", "Thanks for signing up! ")
      // return redirect("/")
    } catch (dbError) {
      console.log(dbError)
      // Optionally, you might want to delete the Supabase user if DB storage fails
      await supabase.auth.admin.deleteUser(signUpData.user.id)
      return encodedRedirect(
        "error",
        "/sign-up",
        "Error creating user account. Please try again.",
      )
    }
  }
}

export const signInAction = async (data: z.infer<typeof signUpUserSchema>) => {
  const result = signUpUserSchema.safeParse(data)

  const email = result.data?.email as string
  const password = result.data?.password as string
  const supabase = createClient()

  // const { error } = await supabase.auth.signInWithOAuth({
  //   provider: "google",
  //   options: {
  //     redirectTo: `${origin}/auth/callback`,
  //   },
  // })
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    return encodedRedirect("error", "/sign-in", error.message)
  }

  return redirect("/")
}

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString()
  const supabase = createClient()
  const origin = headers().get("origin")
  const callbackUrl = formData.get("callbackUrl")?.toString()

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required")
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  })

  if (error) {
    console.error(error.message)
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    )
  }

  if (callbackUrl) {
    return redirect(callbackUrl)
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  )
}

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient()

  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    )
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    )
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    )
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated")
}

export const signOutAction = async () => {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect("/sign-in")
}
