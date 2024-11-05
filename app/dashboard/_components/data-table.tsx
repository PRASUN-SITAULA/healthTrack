import { getStepsAndSleep } from "@/actions/inputMetricsAction"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"

export const DataTable = async ({ userId }: { userId: string }) => {
  const { data } = await getStepsAndSleep(userId)
  const steps = data.steps
  const sleep = data.sleep
  return (
    <>
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
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}
