"use client"

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

const getWeekday = (dateString: string) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const date = new Date(dateString)
  return days[date.getDay()]
}

const formatSleepDuration = (hours: number) => {
  const wholePart = Math.floor(hours)
  const minutes = Math.round((hours - wholePart) * 60)
  return `${wholePart}h ${minutes}m`
}

interface ChartData {
  date: string
  duration?: number
  steps?: number
}

export default function SleepStepsChart({ data }: { data: ChartData[] }) {
  const chartData = data.map((item) => ({
    ...item,
    weekday: getWeekday(item.date),
    formattedDuration: item.duration
      ? formatSleepDuration(item.duration)
      : null,
  }))

  const CustomTooltip = ({ active, payload, label, metric }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Weekday
              </span>
              <span className="font-bold text-muted-foreground">
                {payload[0].payload.weekday}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Date
              </span>
              <span className="font-bold text-muted-foreground">
                {new Date(payload[0].payload.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                {metric}
              </span>
              <span className="font-bold">
                {metric === "Sleep Duration"
                  ? payload[0].payload.formattedDuration
                  : payload[0].payload.steps?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      {/* Sleep Duration Chart */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sleep Duration by Weekday</CardTitle>
          <CardDescription>
            Chart showing sleep duration values for different weekdays
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              duration: {
                label: "Duration (hours)",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="weekday" />
                <YAxis />
                <Tooltip
                  content={(props) =>
                    CustomTooltip({ ...props, metric: "Sleep Duration" })
                  }
                />
                <Line
                  type="monotone"
                  dataKey="duration"
                  stroke="var(--color-duration)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Steps Chart */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Steps by Weekday</CardTitle>
          <CardDescription>
            Chart showing step count for different weekdays
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              steps: {
                label: "Steps",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="weekday" />
                <YAxis />
                <Tooltip
                  content={(props) =>
                    CustomTooltip({ ...props, metric: "Steps" })
                  }
                />
                <Bar dataKey="steps" fill="var(--color-steps)" opacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
