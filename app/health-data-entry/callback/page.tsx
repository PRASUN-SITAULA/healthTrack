import Link from "next/link"
import { InitialInputMetricsForm } from "@/components/form/initialInputMetricsForm"
import { getUserAndSession } from "@/utils/auth/getUserSession"

export default async function InitialInputMetrics() {
  const { user } = await getUserAndSession()
  return (
    <div className="justify-content flex w-full flex-col items-center">
      <h1 className="my-20 text-3xl">Enter some data to get started</h1>
      <InitialInputMetricsForm userId={user?.id as string} />
    </div>
  )
}
