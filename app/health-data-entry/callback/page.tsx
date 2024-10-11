import Link from "next/link"
import { InitialInputMetricsForm } from "@/components/form/initialInputMetricsForm"

export default function InitialInputMetrics() {
  return (
    <div className="justify-content flex w-full flex-col items-center">
      <h1 className="my-20 text-3xl">Enter some data to get started</h1>
      <InitialInputMetricsForm />
    </div>
  )
}
