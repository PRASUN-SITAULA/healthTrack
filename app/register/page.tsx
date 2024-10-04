import { UserForm } from "@/components/form/userForm"

export default function RegisterPage() {
  return (
    <div className="justify-content flex w-full flex-col items-center">
      <h1 className="mt-20 text-3xl">Register</h1>
      <UserForm />
    </div>
  )
}
