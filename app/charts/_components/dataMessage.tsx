import { Card, CardContent } from "@/components/ui/card"
import { InfoIcon, AlertCircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChartMessageProps {
  message: string
  type?: "info" | "error"
  className?: string
}

export default function DataMessage({
  message,
  type,
  className,
}: ChartMessageProps) {
  const Icon = type === "info" ? InfoIcon : AlertCircleIcon

  return (
    <Card className={cn("mx-auto w-full max-w-md", className)}>
      <CardContent className="flex items-center space-x-4 p-6">
        <Icon
          className={cn(
            "h-6 w-6 flex-shrink-0",
            type === "info" ? "text-blue-500" : "text-red-500",
          )}
        />
        <p
          className={cn(
            "text-sm",
            type === "info" ? "text-muted-foreground" : "text-red-600",
          )}
        >
          {message}
        </p>
      </CardContent>
    </Card>
  )
}
