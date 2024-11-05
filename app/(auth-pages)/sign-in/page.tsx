import Link from "next/link"
import UserSignInForm from "@/components/form/userSignInForm"

export default function Login() {
  return (
    <div className="justify-content flex w-full flex-col items-center">
      <h1 className="mt-20 text-3xl">Sign In</h1>
      <p className="text my-8 text-sm text-foreground">
        Don&apos;t have an account?{" "}
        <Link className="font-medium text-primary underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <UserSignInForm />
    </div>
  )
}
