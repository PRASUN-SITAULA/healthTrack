"use client"

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

// Helper functions
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

interface SleepData {
  date: string
  duration: number
}

export default function SleepChart({ data }: { data: SleepData[] }) {
  // Transform data with weekday and formatted duration
  const chartData = data.map((item) => ({
    ...item,
    weekday: getWeekday(item.date),
    formattedDuration: formatSleepDuration(item.duration),
  }))

  return (
    <Card className="w-full max-w-3xl">
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
              label: "Duration (minutes)",
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
              <ChartTooltip
                content={({ active, payload }) => {
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
                              {new Date(
                                payload[0].payload.date,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Duration
                            </span>
                            <span className="font-bold">
                              {payload[0].payload.formattedDuration}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
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
  )
}
