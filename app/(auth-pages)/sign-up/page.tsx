import UserSignUpForm from "@/components/form/userSignUpForm"
import Link from "next/link"
import { FormMessage, Message } from "@/components/form-message"
import { redirect } from "next/navigation"
import { getUserAndSession } from "@/utils/auth/getUserSession"

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Message
}) {
  const { session } = await getUserAndSession()
  if (session) {
    redirect("/dashboard")
  }
  return (
    <div className="justify-content flex w-full flex-col items-center">
      <h1 className="mt-20 text-3xl">Sign Up</h1>
      <p className="text my-8 text-sm text-foreground">
        Already have an account?{" "}
        <Link className="font-medium text-primary underline" href="/sign-in">
          Sign in
        </Link>
      </p>
      <UserSignUpForm />
      <FormMessage message={searchParams} />
    </div>
  )
}
