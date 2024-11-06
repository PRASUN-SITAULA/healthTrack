import { getStepsAndSleep } from "@/actions/inputMetricsAction"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"

// Helper function to format date
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString()
}

// Helper function to format sleep duration
const formatSleep = (hours: number) => {
  const wholePart = Math.floor(hours)
  const minutes = Math.round((hours - wholePart) * 60)
  return `${wholePart}h ${minutes}m`
}

export const DataTable = async ({ userId }: { userId: string }) => {
  const { data, error } = await getStepsAndSleep(userId)
  if (error) {
    return (
      <div className="text-muted-foreground">
        Error loading data. Please try again.
      </div>
    )
  }
  if (!data) {
    return (
      <div className="text-muted-foreground">
        No data available. Please add some data.
      </div>
    )
  }

  const allDates = new Set<string>()

  // Assuming steps and sleep data have date fields
  data.steps?.forEach((step) => {
    allDates.add(formatDate(step.createdAt))
  })

  data.sleep?.forEach((sleep) => {
    allDates.add(formatDate(sleep.createdAt))
  })

  // Convert to array and sort in descending order
  const sortedDates = Array.from(allDates).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  )
  console.log(data)
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Steps</TableHead>
            <TableHead>Sleep</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedDates.map((date) => {
            // Find corresponding steps and sleep data for this date
            const stepsData = data.steps?.find(
              (step) => formatDate(step.createdAt) === date,
            )
            const sleepData = data.sleep?.find(
              (sleep) => formatDate(sleep.createdAt) === date,
            )

            return (
              <TableRow key={date}>
                <TableCell>{date}</TableCell>
                <TableCell>
                  {stepsData ? (
                    stepsData.steps.toLocaleString()
                  ) : (
                    <span className="text-muted-foreground">
                      No steps recorded
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {sleepData ? (
                    formatSleep(sleepData.duration)
                  ) : (
                    <span className="text-muted-foreground">
                      No sleep recorded
                    </span>
                  )}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
