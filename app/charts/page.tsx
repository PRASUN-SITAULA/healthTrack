import { getStepsAndSleep } from "@/actions/inputMetricsAction"
import SleepChart from "./_components/sleepStepsCharts"
import { getUserAndSession } from "@/utils/auth/getUserSession"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import SkeletonLoader from "@/components/loader"

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
    return <div>No data</div>
  }
  // Transform data server-side
  const sleepData =
    data.sleep
      ?.map((sleepEntry) => ({
        date: new Date(sleepEntry.createdAt).toISOString().split("T")[0],
        duration: sleepEntry.duration,
      }))
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ) || []

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-4 text-3xl font-bold">Charts</h1>
        <Suspense fallback={<SkeletonLoader />}>
          <SleepChart data={sleepData} />
        </Suspense>
      </div>
    </main>
  )
}
