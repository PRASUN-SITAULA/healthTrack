import { getStepsAndSleep } from "@/actions/inputMetricsAction"
import SleepChart from "./_components/sleepStepsCharts"
import { getUserAndSession } from "@/utils/auth/getUserSession"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import SkeletonLoader from "@/components/loader"
import DataMessage from "./_components/dataMessage"

export default async function ChartsPage() {
  const { user } = await getUserAndSession()
  if (!user) {
    redirect("/sign-in")
  }
  const { data, error } = await getStepsAndSleep(user.id)

  if (error) {
    return <div>Error: {error}</div>
  }
  if (!data) {
    return <DataMessage />
  }
  // Create a map of all dates with their respective data
  const dateMap = new Map()

  // Add sleep data
  data.sleep?.forEach((sleepEntry) => {
    const date = new Date(sleepEntry.createdAt).toISOString().split("T")[0]
    dateMap.set(date, {
      date,
      duration: sleepEntry.duration,
    })
  })

  // Add steps data
  data.steps?.forEach((stepsEntry) => {
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
