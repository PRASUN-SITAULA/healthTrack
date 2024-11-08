import { getStepsAndSleep } from "@/actions/inputMetricsAction"
import SleepChart from "./_components/sleepStepsCharts"
import { getUserAndSession } from "@/utils/auth/getUserSession"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import SkeletonLoader from "@/components/loader"
import DataMessage from "./_components/dataMessage"
import { isActionError } from "@/utils/error"

export default async function ChartsPage() {
  const { user } = await getUserAndSession()
  if (!user) {
    redirect("/sign-in")
  }
  const res = await getStepsAndSleep(user.id)

  if (isActionError(res)) {
    return (
      <DataMessage
        message="Some error occurred. Please try again."
        type={"error"}
      />
    )
  }
  console.log(res.data)
  if (!res.data || res.data.steps.length === 0 || res.data.sleep.length === 0) {
    return (
      <DataMessage
        message="Please enter some data to view charts."
        type={"info"}
      />
    )
  }
  // Create a map of all dates with their respective data
  const dateMap = new Map()

  // Add sleep data
  res.data.sleep?.forEach((sleepEntry) => {
    const date = new Date(sleepEntry.createdAt).toISOString().split("T")[0]
    dateMap.set(date, {
      date,
      duration: sleepEntry.duration,
    })
  })

  // Add steps data
  res.data.steps?.forEach((stepsEntry) => {
    const date = new Date(stepsEntry.createdAt).toISOString().split("T")[0]
    const existing = dateMap.get(date) || { date }
    dateMap.set(date, {
      ...existing,
      steps: stepsEntry.steps,
    })
  })

  // Convert map to array and sort by date
  const combinedData = Array.from(dateMap.values()).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-4 text-3xl font-bold">Charts</h1>
        <Suspense fallback={<SkeletonLoader />}>
          <SleepChart data={combinedData} />
        </Suspense>
      </div>
    </main>
  )
}
