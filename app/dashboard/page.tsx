import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { healthTips } from "@/utils/healthTips"
import {
  Scale,
  MoveVertical,
  Moon,
  Heart,
  Activity,
  Footprints,
  Plus,
  PersonStanding,
  Gauge,
} from "lucide-react"
import { EditHealthMetricDialog } from "@/components/edit-dialog"
import { getUserAndSession } from "@/utils/auth/getUserSession"
import { redirect } from "next/navigation"
import { getHealthMetric } from "@/actions/inputMetricsAction"
import { ErrorHandler } from "@/components/error-handler"
import WaterIntakeTracker from "@/components/form/waterIntakeForm"
import { getWaterIntake } from "@/actions/waterIntakeAction"
import { calculateBMI } from "@/utils/healthCalculations"
import SleepDurationTracker from "@/components/form/sleepDurationForm"
import WalkingStepsTracker from "@/components/form/walkingStepsForm"
import { DataTable } from "./_components/data-table"
import { Suspense } from "react"
import SkeletonLoader from "@/components/loader"

export default async function Dashboard() {
  const { user } = await getUserAndSession()
  if (!user) {
    return redirect("/sign-in")
  }
  const healthMetricsData = await getHealthMetric(user.id)
  const waterIntake = await getWaterIntake(user.id)
  if (!waterIntake.success) {
    return
  }
  let bmi = 0
  if (healthMetricsData.data?.height && healthMetricsData.data?.weight) {
    bmi = calculateBMI(
      healthMetricsData.data?.height,
      healthMetricsData.data?.weight,
    )
  }
  const healthTip = healthTips[Math.floor(Math.random() * healthTips.length)]
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 py-8">
      {healthMetricsData.error && (
        <ErrorHandler error={healthMetricsData.error} />
      )}
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Card className="col-span-full border-2 border-blue-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Health Tip of the day</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{healthTip.tip}</p>
            <CardDescription>{healthTip.description}</CardDescription>
          </CardContent>
        </Card>
        <Suspense fallback={<SkeletonLoader />}>
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            <WaterIntakeTracker
              userId={user.id}
              waterIntakeAmount={waterIntake.waterIntake}
            />
            <div className="flex flex-col gap-4">
              <Card className="flex h-fit flex-col justify-center border-2 border-blue-200 dark:border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl font-bold">
                    Add Sleep Duration
                  </CardTitle>
                  <SleepDurationTracker userId={user.id} />
                </CardHeader>
              </Card>
              <Card className="flex h-fit flex-col justify-center border-2 border-blue-200 dark:border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl font-bold">
                    Add Walking Steps
                  </CardTitle>
                  <WalkingStepsTracker userId={user.id} />
                </CardHeader>
              </Card>
            </div>
          </section>
          <div className="col-span-full h-px bg-border" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card className="border-2 border-blue-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Heart Rate
                </CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">78 bpm</div>
                <p className="text-xs text-muted-foreground">
                  Average for today
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Blood Pressure
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">120/80 mmHg</div>
                <p className="text-xs text-muted-foreground">
                  Average for today
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Steps</CardTitle>
                <Footprints className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">8,234</div>
                <p className="text-xs text-muted-foreground">Total for today</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Sleep</CardTitle>
                <Moon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">7h 15m</div>
                <p className="text-xs text-muted-foreground">
                  Total for last night
                </p>
              </CardContent>
            </Card>
            <div className="col-span-full h-px bg-border" />
            <p className="text-md col-span-full mb-2 mt-2 text-muted-foreground">
              Latest Data as of{" "}
              {healthMetricsData.data?.updatedAt.toDateString()}
            </p>
            <Card className="border-2 border-blue-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">Weight</CardTitle>
                <Scale className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex flex-row justify-between pr-3">
                <div>
                  <div className="text-4xl font-bold">
                    {healthMetricsData.data?.weight} kgs
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Current weight
                  </p>
                </div>
                <EditHealthMetricDialog metric="weight" userId={user.id} />
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">Height</CardTitle>
                <PersonStanding className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex flex-row justify-between pr-3">
                <div>
                  <div className="text-4xl font-bold">
                    {healthMetricsData.data?.height} cm
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Current Height
                  </p>
                </div>
                <EditHealthMetricDialog metric="height" userId={user.id} />
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  Blood Glucose
                </CardTitle>
                <MoveVertical className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex flex-row justify-between pr-3">
                <div>
                  <div className="text-4xl font-bold">
                    {healthMetricsData.data?.bloodGlucoseLevel} mg/dL
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Last Measured Blood Glucose
                  </p>
                </div>
                <EditHealthMetricDialog
                  metric="bloodGlucoseLevel"
                  userId={user.id}
                />
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">BMI</CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex flex-row justify-between pr-3">
                <div>
                  <div className="text-4xl font-bold">{bmi}</div>
                  <p className="text-sm text-muted-foreground">
                    Body Mass Index
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="w-full border-2 border-blue-200 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-medium">Health Log</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable userId={user.id} />
            </CardContent>
          </Card>
        </Suspense>
      </main>
    </div>
  )
}
