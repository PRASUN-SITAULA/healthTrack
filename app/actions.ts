"use server"

import { encodedRedirect } from "@/utils/utils"
import { createClient } from "@/utils/supabase/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"
import { zodUserSchema } from "@/config/zodUserSchema"

export const signUpAction = async (data: z.infer<typeof zodUserSchema>) => {
  const result = zodUserSchema.safeParse(data)

  const email = result.data?.email as string
  const password = result.data?.password as string
  const supabase = createClient()
  const origin = headers().get("origin")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error(error.code + " " + error.message)
    return encodedRedirect("error", "/sign-up", error.message)
  } else {
    return encodedRedirect("success", "/sign-up", "Thanks for signing up! ")
  }
}

export const signInAction = async (data: z.infer<typeof zodUserSchema>) => {
  const result = zodUserSchema.safeParse(data)

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

export const dummySignInAction = async (
  data: z.infer<typeof zodUserSchema>,
) => {
  const result = zodUserSchema.safeParse(data)
  console.log("Form data received:", result.success)
  console.log("Form data parsed:", result.data)
  // const email = formData.get("email") as string
  // const password = formData.get("password") as string
  // const supabase = createClient()

  // // const { error } = await supabase.auth.signInWithOAuth({
  // //   provider: "google",
  // //   options: {
  // //     redirectTo: `${origin}/auth/callback`,
  // //   },
  // // })
  // const { error } = await supabase.auth.signInWithPassword({
  //   email,
  //   password,
  // })
  // if (error) {
  //   return encodedRedirect("error", "/sign-in", error.message)
  // }
  // setTimeout(() => {
  //   console.log("dummy")
  // }, 2000)
  // return redirect("/")
  return "hello"
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
