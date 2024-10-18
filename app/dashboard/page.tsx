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
} from "lucide-react"
import { EditHealthMetricDialog } from "@/components/edit-dialog"
import { getUserAndSession } from "@/utils/auth/getUserSession"
import { redirect } from "next/navigation"
import { getHealthMetric } from "@/actions/inputMetricsAction"
import { ErrorHandler } from "@/components/error-handler"

export default async function Dashboard() {
  const { user } = await getUserAndSession()
  if (!user) {
    return redirect("/sign-in")
  }
  const healthMetricsData = await getHealthMetric(user.id)

  const healthTip = healthTips[Math.floor(Math.random() * healthTips.length)]
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 py-8">
      {healthMetricsData.error && (
        <ErrorHandler error={healthMetricsData.error} />
      )}
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Health Tip of the day</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{healthTip.tip}</p>
            <CardDescription>{healthTip.description}</CardDescription>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">78 bpm</div>
              <p className="text-xs text-muted-foreground">Average for today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Blood Pressure
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">120/80 mmHg</div>
              <p className="text-xs text-muted-foreground">Average for today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Steps</CardTitle>
              <Footprints className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">8,234</div>
              <p className="text-xs text-muted-foreground">Total for today</p>
            </CardContent>
          </Card>
          <Card>
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
            {healthMetricsData.data?.createdAt.toLocaleDateString()}
          </p>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Weight</CardTitle>
              <Scale className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-row justify-between pr-3">
              <div>
                <div className="text-4xl font-bold">
                  {healthMetricsData.data?.weight} kgs
                </div>
                <p className="text-sm text-muted-foreground">Current weight</p>
              </div>
              <EditHealthMetricDialog metric="weight" userId={user.id} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Height</CardTitle>
              <PersonStanding className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-row justify-between pr-3">
              <div>
                <div className="text-4xl font-bold">
                  {healthMetricsData.data?.height} cm
                </div>
                <p className="text-sm text-muted-foreground">Current Height</p>
              </div>
              <EditHealthMetricDialog metric="height" userId={user.id} />
            </CardContent>
          </Card>
          <Card>
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
        </div>

        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Health Log</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bottom-4 right-4 z-50 h-7 gap-1 text-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Health Data</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Health Data</DialogTitle>
                  <DialogDescription>
                    Enter your latest health metrics to track your progress.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="heartRate" className="text-right">
                      Heart Rate
                    </Label>
                    <Input
                      id="heartRate"
                      type="number"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bloodPressure" className="text-right">
                      Blood Pressure
                    </Label>
                    <div className="col-span-3 flex gap-2">
                      <Input
                        id="bloodPressureSystolic"
                        type="number"
                        placeholder="Systolic"
                      />
                      <Input
                        id="bloodPressureDiastolic"
                        type="number"
                        placeholder="Diastolic"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="steps" className="text-right">
                      Steps
                    </Label>
                    <Input id="steps" type="number" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sleep" className="text-right">
                      Sleep
                    </Label>
                    <div className="col-span-3 flex gap-2">
                      <Input
                        id="sleepHours"
                        type="number"
                        placeholder="Hours"
                      />
                      <Input
                        id="sleepMinutes"
                        type="number"
                        placeholder="Minutes"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Data</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Blood Pressure</TableHead>
                  <TableHead>Steps</TableHead>
                  <TableHead>Sleep</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2023-04-15</TableCell>
                  <TableCell>122/78 mmHg</TableCell>
                  <TableCell>9,234</TableCell>
                  <TableCell>8h 2m</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoveVertical className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-04-14</TableCell>
                  <TableCell>118/76 mmHg</TableCell>
                  <TableCell>8,765</TableCell>
                  <TableCell>7h 45m</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoveVertical className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-04-13</TableCell>
                  <TableCell>120/80 mmHg</TableCell>
                  <TableCell>7,890</TableCell>
                  <TableCell>6h 58m</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoveVertical className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
