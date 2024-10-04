import { UserForm } from "@/components/form/userForm"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="justify-content flex w-full flex-col items-center">
      <h1 className="mt-20 text-3xl">Sign Up</h1>
      <p className="text my-8 text-sm text-foreground">
        Already have an account?{" "}
        <Link className="font-medium text-primary underline" href="/sign-in">
          Sign in
        </Link>
      </p>
      <UserForm />
    </div>
  )
}
