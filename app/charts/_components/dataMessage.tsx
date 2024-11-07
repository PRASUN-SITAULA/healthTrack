import { Card, CardContent } from "@/components/ui/card"
import { InfoIcon } from "lucide-react"

export default function DataMessage({
  message = "Insert data to see the charts",
}: {
  message?: string
}) {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardContent className="flex items-center space-x-4 p-6">
        <InfoIcon className="h-6 w-6 flex-shrink-0 text-blue-500" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  )
}
